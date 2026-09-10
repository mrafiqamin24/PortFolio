/* Lembar sampul: server produksi yang sungguhan, hidup di atas kertas.
 *
 * Modelnya tower ATX yang benar-benar dirakit pemilik (server-rig.js),
 * dirender "shaded with edges": material disinari studio, bayangan kontak di
 * kertas, garis rusuk tipis di atasnya. Satu momen yang disusun: mesin
 * tampil terpasang persis seperti gambar diamnya, lalu membuka (panel kaca,
 * pendingin, RAM, NVMe, HDD, dan panel casing bergeser keluar) dan merapat
 * lagi dengan pegas (Motion, penerus Framer Motion, kalau termuat; pegas
 * kecil sendiri kalau tidak). Sesudah itu mesinnya bergoyang pelan, menoleh
 * ke kursor, dan bisa diseret. Saat pembaca menggulir meninggalkan sampul,
 * casingnya membuka sedikit lagi.
 *
 * Gambar diam di markup adalah render yang sama (WebP), jadi frame pertama
 * kanvas jatuh persis di atasnya. Tanpa WebGL, atau kalau konteksnya hilang,
 * gambar diam itulah yang tampil.
 */
const V = new URL(import.meta.url).search;

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch (e) {
    return false;
  }
}

const stage = document.querySelector(".cover-stage");
if (stage && webglOK()) {
  Promise.all([
    import("./vendor/three-r180/three.module.min.js"),
    import("./server-model.js" + V),
    import("./server-rig.js" + V)
  ])
    .then(([THREE, M, RIG]) => boot(THREE, M, RIG))
    .catch(() => { /* gambar diam tetap; tidak ada yang hilang */ });
}

function boot(THREE, M, RIG) {
  const still = stage.querySelector(".cover-static");
  const snap = stage.dataset.snap === "1";      // mode tangkap: pose diam, buffer disimpan
  const canvas = document.createElement("canvas");
  canvas.className = "cover-canvas";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", still && still.getAttribute("alt") ? still.getAttribute("alt") : "Model tiga dimensi server produksi");
  canvas.setAttribute("aria-describedby", "coverHelp");
  stage.appendChild(canvas);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: snap
    });
  } catch (e) {
    canvas.remove();
    return;
  }
  M.setupRenderer(THREE, renderer);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const narrow = window.matchMedia("(max-width: 760px)");

  const palette = M.PALETTES.paper;
  const scene = new THREE.Scene();
  scene.environment = M.makeStudioEnv(THREE, renderer, palette.studio);
  const target = new THREE.Vector3(0, 0, 0);
  const camera = new THREE.PerspectiveCamera(22, 1, 1, 200);
  const edgeMat = new THREE.LineBasicMaterial({ color: palette.edge, transparent: true, opacity: 0.55 });
  const { group, parts } = RIG.buildRig(THREE, M.slabGeometry, edgeMat, palette.envIntensity);
  scene.add(group);
  M.addLights(THREE, scene, palette, target, { shadowSize: narrow.matches ? 1024 : 2048, extent: 8 });
  // pengisi dari sisi kaca, dengan bayangan lembutnya sendiri: pendingin, RAM,
  // dan cakram punya kontak dengan tray dan lantai, bukan melayang di kotak
  const inner = new THREE.DirectionalLight(0xffffff, 1.1);
  inner.position.set(-14, 4, -3);
  inner.target.position.set(0, 0, 0);
  inner.castShadow = true;
  inner.shadow.mapSize.set(1024, 1024);
  const isc = inner.shadow.camera;
  isc.left = -6; isc.right = 6; isc.top = 6; isc.bottom = -6; isc.near = 1; isc.far = 40;
  inner.shadow.radius = 5;
  inner.shadow.blurSamples = 8;
  inner.shadow.bias = -0.0005;
  inner.shadow.normalBias = 0.03;
  scene.add(inner, inner.target);
  const ground = M.addGround(THREE, scene, palette.shadow);

  // ------------------------------------------------------------ keadaan
  const AZ0 = -2.32, EL0 = 0.30, R = 30;
  const orbit = M.makeOrbit(canvas, { az: AZ0, el: EL0, elMin: 0.06, elMax: 1.0, onChange: kick });
  let still3d = reduced.matches || snap;
  let explodeIntro = 0, introDone = still3d;     // mulai terpasang, sama dengan gambar diam
  let explodeScroll = 0, scrollLift = 0;        // casing membuka saat digulir pergi
  let azP = 0, elP = 0, azPS = 0, elPS = 0;     // menoleh ke kursor
  let sway = 0, clock = 0;                      // goyangan pelan, sisi kaca tetap terlihat
  let visible = true, running = false, shown = false, last = 0, lastPose = -1;

  function frame(now) {
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
    last = now;
    const moving = orbit.step(dt);
    if (!orbit.state.dragging && !still3d) {
      clock += dt;
      sway = Math.sin(clock * 0.35) * 0.24;
    }
    const k = M.easeK(0.06, dt);
    azPS += (azP - azPS) * k;
    elPS += (elP - elPS) * k;

    // pose dan peta bayangan hanya dihitung ulang saat bagian-bagiannya bergerak
    const explode = Math.max(explodeIntro, explodeScroll);
    if (Math.abs(explode - lastPose) > 1e-4) {
      const floor = RIG.poseRig(parts, explode);
      ground.position.y = floor - 0.02;
      renderer.shadowMap.needsUpdate = true;
      lastPose = explode;
    }
    target.y = explode * 0.3;

    const az = orbit.state.az + sway + azPS;
    const el = M.clamp(orbit.state.el + elPS + scrollLift, 0.06, 1.05);
    M.placeCamera(camera, target, az, el, R);
    renderer.render(scene, camera);

    if (!shown) {
      shown = true;
      stage.classList.add("is-3d");
      canvas.setAttribute("tabindex", "0");
      if (still) still.setAttribute("aria-hidden", "true");
    }
    const idle = still3d && !moving && introDone &&
      Math.abs(azP - azPS) < 1e-3 && Math.abs(elP - elPS) < 1e-3;
    if (!visible || idle) {
      running = false;
      last = 0;
    } else {
      requestAnimationFrame(frame);
    }
  }

  function kick() {
    if (running || !visible) return;
    running = true;
    requestAnimationFrame(frame);
  }

  /* Momen pembuka, dua fase: membuka (0 ke 1, ease-out 550 ms) lalu merapat
     dengan pegas (1 ke 0). Motion memberi pegas sungguhan; tanpa Motion, atau
     kalau Motion diam, integrator kecil dengan angka yang sama. Satu pegangan
     animasi disimpan supaya tidak pernah ada dua pegas berjalan bersamaan. */
  function intro() {
    if (still3d) return;
    const spring = { stiffness: 42, damping: 12.5, mass: 1.1 };
    const Mo = window.Motion;
    const hasMotion = !!(Mo && typeof Mo.animate === "function");
    let handle = null, ticks = 0;
    const stopHandle = () => { if (handle && typeof handle.stop === "function") handle.stop(); handle = null; };
    const settle = () => { stopHandle(); introDone = true; explodeIntro = 0; kick(); };

    const closeOwn = () => {
      let x = 1, vel = 0, prev = 0;
      const step = (t) => {
        if (introDone) return;
        const dt = Math.min(0.033, prev ? (t - prev) / 1000 : 0.016);
        prev = t;
        const a = (-spring.stiffness * x - spring.damping * vel) / spring.mass;
        vel += a * dt;
        x += vel * dt;
        explodeIntro = Math.max(0, x);
        kick();
        if (Math.abs(x) > 0.002 || Math.abs(vel) > 0.01) requestAnimationFrame(step);
        else settle();
      };
      requestAnimationFrame(step);
    };
    const close = () => {
      if (introDone) return;
      if (hasMotion) {
        try {
          handle = Mo.animate(1, 0, {
            type: "spring", ...spring,
            onUpdate: (v) => { ticks++; explodeIntro = Math.max(0, v); kick(); },
            onComplete: settle
          });
          return;
        } catch (e) { /* jatuh ke pegas sendiri */ }
      }
      closeOwn();
    };
    const openOwn = () => {
      let t0 = 0;
      const step = (t) => {
        if (introDone) return;
        if (!t0) t0 = t;
        const u = Math.min(1, (t - t0) / 550);
        explodeIntro = 1 - Math.pow(1 - u, 3);
        kick();
        if (u < 1) requestAnimationFrame(step);
        else close();
      };
      requestAnimationFrame(step);
    };
    const open = () => {
      if (hasMotion) {
        try {
          handle = Mo.animate(0, 1, {
            duration: 0.55, ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => { ticks++; explodeIntro = v; kick(); },
            onComplete: close
          });
          return;
        } catch (e) { /* jatuh ke tween sendiri */ }
      }
      openOwn();
    };

    setTimeout(open, 650);
    // Motion diam (tab di latar, gangguan): ambil alih dengan satu jalur saja
    setTimeout(() => { if (!introDone && ticks === 0) { stopHandle(); openOwn(); } }, 1600);
    // apa pun yang terjadi, tujuh detik kemudian mesin terpasang
    setTimeout(() => { if (!introDone) settle(); }, 7000);
  }

  // -------------------------------------------------------------- ukuran
  function resize() {
    const W = Math.max(200, Math.round(stage.clientWidth));
    const H = Math.max(200, Math.round(stage.clientHeight));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, narrow.matches && !snap ? 1.5 : 2));
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.shadowMap.needsUpdate = true;
    kick();
  }

  // ------------------------------------------------------------ interaksi
  window.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || still3d) return;
    const w = window.innerWidth || 1, h = window.innerHeight || 1;
    azP = (e.clientX / w - 0.5) * 0.22;
    elP = -(e.clientY / h - 0.5) * 0.12;
    kick();
  }, { passive: true });

  const cover = stage.closest(".sheet") || stage;
  function onScroll() {
    const r = cover.getBoundingClientRect();
    if (r.bottom < -40) return;
    const p = M.clamp(-r.top / Math.max(1, r.height * 0.85), 0, 1);
    explodeScroll = still3d ? 0 : M.smoothstep(0.04, 0.8, p) * 0.55;
    scrollLift = still3d ? 0 : p * 0.2;
    kick();
  }
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; onScroll(); });
  }, { passive: true });

  new IntersectionObserver((es) => {
    visible = es.some((e) => e.isIntersecting);
    if (visible) kick();
  }, { rootMargin: "80px 0px" }).observe(stage);

  window.addEventListener("resize", resize, { passive: true });
  if (window.ResizeObserver) new ResizeObserver(() => resize()).observe(stage);
  (narrow.addEventListener ? narrow.addEventListener("change", resize) : narrow.addListener(resize));

  // preferensi gerak berubah di tengah jalan: kembali ke pose diam, bukan membeku setengah terbuka
  const onReduced = () => {
    still3d = reduced.matches || snap;
    if (still3d) { explodeScroll = 0; scrollLift = 0; explodeIntro = 0; introDone = true; sway = 0; azP = elP = 0; }
    kick();
  };
  (reduced.addEventListener ? reduced.addEventListener("change", onReduced) : reduced.addListener(onReduced));

  /* Konteks WebGL bisa hilang (tab lama di latar, driver reset, terlalu
     banyak kanvas). Gambar diam dikembalikan, bukan dibiarkan kosong. */
  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    running = false;
    visible = false;
    stage.classList.remove("is-3d");
    if (still) still.removeAttribute("aria-hidden");
    canvas.remove();
  });

  resize();
  onScroll();
  intro();
  kick();
}
