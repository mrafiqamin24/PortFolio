/* Model server lembar 3 versi WebGL (Three.js r180, di-host sendiri).
 *
 * Render "shaded with edges" di atas cetak biru: bidang bermaterial nada
 * biru, disinari studio, bayangan lembut jatuh ke lapisan di bawahnya, dan
 * rusuk putih di atasnya supaya tetap gambar teknik. Model, material, dan
 * cahaya ada di server-model.js, dipakai bersama lembar sampul.
 *
 * Gulir memasang dan mengurai model; seret memutar; balon bernomor menempel
 * di tiap bagian dan daftar bernomor yang sama menjelaskannya.
 *
 * Three.js baru diunduh saat lembar 3 mendekat. Kalau WebGL tidak ada atau
 * modulnya gagal dimuat, halaman tetap memakai model SVG di iso.js.
 */
const V = new URL(import.meta.url).search;
const NS = "http://www.w3.org/2000/svg";

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch (e) {
    return false;
  }
}

(() => {
  const figure = document.querySelector(".sheet-3 .plan");
  const svgModel = document.querySelector(".iso-wide");
  if (!figure || !svgModel || !webglOK()) return;

  let started = false;
  const load = () => {
    if (started) return;
    started = true;
    io.disconnect();
    Promise.all([import("./vendor/three-r180/three.module.min.js"), import("./server-model.js" + V)])
      .then(([THREE, M]) => boot(THREE, M))
      .catch(() => { /* modul gagal: model SVG di iso.js tetap jalan */ });
  };
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) load();
  }, { rootMargin: "700px 0px" });
  io.observe(figure);

  /* Sampul sudah memuat Three.js. Lembar 3 disiapkan lebih awal saat browser
     senggang (setelah momen pembuka selesai) supaya halaman tidak pernah
     menampilkan dua bahasa gambar untuk benda yang sama. Gelung rendernya
     tetap berhenti selama lembar 3 di luar layar. */
  if (document.querySelector(".cover-stage")) {
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 2500));
    setTimeout(() => idle(load, { timeout: 5000 }), 2200);
  }

  function boot(THREE, M) {
    const wrap = document.createElement("div");
    wrap.className = "iso3d";
    const canvas = document.createElement("canvas");
    canvas.className = "iso3d-canvas";
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", svgModel.querySelector("title").textContent);
    canvas.setAttribute("aria-describedby", "isoHint isoHelp");
    const overlay = document.createElementNS(NS, "svg");
    overlay.setAttribute("class", "iso3d-labels plan-ink plan-ink-white iso");
    overlay.setAttribute("aria-hidden", "true");
    overlay.setAttribute("focusable", "false");
    wrap.appendChild(canvas);
    wrap.appendChild(overlay);
    svgModel.parentNode.insertBefore(wrap, svgModel);

    // di layar sempit daftar keterangan pindah ke bawah gambar sebagai HTML
    const legend = document.createElement("ol");
    legend.className = "iso3d-legend";
    legend.setAttribute("role", "list");
    legend.setAttribute("aria-label", "Keterangan balon bernomor");
    for (const [no, , l1, l2] of M.ITEMS) {
      const li = document.createElement("li");
      const n = document.createElement("span");
      n.className = "lg-no";
      n.textContent = String(no);
      const b = document.createElement("b");
      b.textContent = l1;
      const t = document.createElement("span");
      t.className = "lg-s";
      t.textContent = l2;
      li.append(n, b, t);
      legend.appendChild(li);
    }
    svgModel.parentNode.insertBefore(legend, svgModel);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch (e) {
      wrap.remove();
      legend.remove();
      return;
    }
    M.setupRenderer(THREE, renderer);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 760px)");

    const palette = M.PALETTES.cyan;
    const scene = new THREE.Scene();
    scene.environment = M.makeStudioEnv(THREE, renderer, palette.studio);
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
    const target = new THREE.Vector3(0, 1.5, 0);

    const { group, parts } = M.buildStack(THREE, palette);
    scene.add(group);

    /* Bayangan garis model yang sama, jauh lebih besar, jadi latar lembar.
       Diputar terpisah supaya terbaca sebagai lapisan lain. */
    const ghost = M.buildStack(THREE, palette, { edgesOnly: true, edgeOpacity: 0.1 });
    ghost.group.scale.setScalar(2.6);
    ghost.group.rotation.y = 0.55;
    ghost.group.renderOrder = -1;
    scene.add(ghost.group);

    M.addLights(THREE, scene, palette, target, { shadowSize: narrow.matches ? 1024 : 2048, extent: 9 });
    const ground = M.addGround(THREE, scene, palette.shadow);

    // sumbu perakitan: garis putus tegak lewat pusat tumpukan
    const axis = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -4.4, 0), new THREE.Vector3(0, 7.4, 0)]),
      new THREE.LineDashedMaterial({ color: palette.edge, dashSize: 0.28, gapSize: 0.34, transparent: true, opacity: 0.45 })
    );
    axis.computeLineDistances();
    scene.add(axis);

    /* Jalur data antar bagian; titik sambungnya dihitung ulang tiap frame
       jadi garisnya memanjang saat terurai dan memendek saat merapat. */
    const linkPos = new Float32Array(M.LINKS.length * 6);
    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute("position", new THREE.BufferAttribute(linkPos, 3));
    scene.add(new THREE.LineSegments(
      linkGeo, new THREE.LineBasicMaterial({ color: palette.edge, transparent: true, opacity: 0.72 })
    ));
    function updateLinks() {
      M.LINKS.forEach(([na, nb], i) => {
        const a = parts[na], b = parts[nb];
        const hi = a.holder.position.y >= b.holder.position.y ? a : b;
        const lo = hi === a ? b : a;
        const o = i * 6;
        linkPos[o] = hi.cx; linkPos[o + 1] = hi.holder.position.y - hi.half[1]; linkPos[o + 2] = hi.cz;
        linkPos[o + 3] = lo.cx; linkPos[o + 4] = lo.holder.position.y + lo.half[1]; linkPos[o + 5] = lo.cz;
      });
      linkGeo.attributes.position.needsUpdate = true;
    }

    // -------------------------------------------------------- keadaan
    const orbit = M.makeOrbit(canvas, { az: Math.PI / 4, el: 0.56, elMin: 0.20, elMax: 1.08, onChange: kick });
    let azScroll = 0, explode = 1, explodeShown = 1;
    let visible = true, running = false, shown = false;

    // --------------------------------------------------------- label
    const itemEls = M.ITEMS.map(([no, of, l1, l2]) => {
      const bal = document.createElementNS(NS, "g");
      bal.setAttribute("class", "iso3d-balloon");
      const ring = document.createElementNS(NS, "circle");
      ring.setAttribute("class", "bl");
      ring.setAttribute("r", "11");
      const num = document.createElementNS(NS, "text");
      num.setAttribute("class", "bl-no");
      num.setAttribute("text-anchor", "middle");
      num.textContent = String(no);
      bal.append(ring, num);
      overlay.appendChild(bal);

      const row = document.createElementNS(NS, "g");
      row.setAttribute("class", "iso3d-row");
      const ring2 = document.createElementNS(NS, "circle");
      ring2.setAttribute("class", "bl");
      ring2.setAttribute("r", "9");
      const num2 = document.createElementNS(NS, "text");
      num2.setAttribute("class", "bl-no");
      num2.setAttribute("text-anchor", "middle");
      num2.textContent = String(no);
      const t1 = document.createElementNS(NS, "text");
      t1.setAttribute("class", "b");
      t1.textContent = l1;
      const t2 = document.createElementNS(NS, "text");
      t2.setAttribute("class", "s");
      t2.textContent = l2;
      row.append(ring2, num2, t1, t2);
      overlay.appendChild(row);

      return { of, ring, num, ring2, num2, t1, t2, ly: 0, bx: 0, by: 0 };
    });

    const layerEls = M.LAYERS.map(([caption, members]) => {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "iso3d-layer");
      const t = document.createElementNS(NS, "text");
      t.setAttribute("class", "plan-label");
      t.setAttribute("x", "16");
      t.textContent = caption;
      const rule = document.createElementNS(NS, "line");
      rule.setAttribute("class", "thin");
      rule.setAttribute("x1", "16");
      rule.setAttribute("x2", String(16 + 7.2 * caption.length));
      g.append(t, rule);
      overlay.appendChild(g);
      return { members, t, rule };
    });

    // ------------------------------------------------------- ukuran
    let W = 0, H = 0;

    function resize() {
      const rect = figure.getBoundingClientRect();
      const isNarrow = narrow.matches;
      W = Math.max(240, Math.round(rect.width));
      H = Math.round(W * (isNarrow ? 1.05 : 524 / 785));

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isNarrow ? 1.5 : 2));
      renderer.setSize(W, H, false);
      overlay.setAttribute("viewBox", `0 0 ${W} ${H}`);
      overlay.setAttribute("width", String(W));
      overlay.setAttribute("height", String(H));

      const halfH = 9.0;
      const halfW = halfH * (W / H);
      const shift = isNarrow ? 0 : 0.16 * halfW * 2;
      camera.left = -halfW + shift;
      camera.right = halfW + shift;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();

      const labelX = W - Math.min(258, W * 0.33) + 34;
      const top = 34, step = (H - 80) / (itemEls.length - 1);
      itemEls.forEach((L, i) => {
        L.ly = top + i * step;
        L.ring2.setAttribute("cx", String(labelX - 20));
        L.ring2.setAttribute("cy", L.ly.toFixed(1));
        L.num2.setAttribute("x", String(labelX - 20));
        L.num2.setAttribute("y", (L.ly + 4).toFixed(1));
        L.t1.setAttribute("x", String(labelX));
        L.t1.setAttribute("y", (L.ly + 1).toFixed(1));
        L.t2.setAttribute("x", String(labelX));
        L.t2.setAttribute("y", (L.ly + 17).toFixed(1));
      });
      kick();
    }

    // -------------------------------------------------- proyeksi ke layar
    const v = new THREE.Vector3();
    const dir = new THREE.Vector3();
    function toScreen(x, y, z) {
      v.set(x, y, z).project(camera);
      return [(v.x * 0.5 + 0.5) * W, (-v.y * 0.5 + 0.5) * H];
    }

    function paintLabels() {
      /* Balon dipasang di sudut benda yang paling dekat ke kamera: muka atas
         lapisan penyimpanan selalu tertutup slab host, jadi pusat muka atas
         akan melayang ke benda lain. */
      dir.copy(camera.position).sub(target).normalize();
      for (const L of itemEls) {
        const p = parts[L.of];
        const [hx, hy, hz] = p.half;
        let best = null, bestDot = -Infinity;
        for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
          const wx = p.cx + sx * hx, wy = p.holder.position.y + sy * hy, wz = p.cz + sz * hz;
          const d = wx * dir.x + wy * dir.y + wz * dir.z;
          if (d > bestDot) { bestDot = d; best = [wx, wy, wz]; }
        }
        const c = toScreen(best[0], best[1], best[2]);
        L.bx = c[0]; L.by = c[1];
      }
      for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < itemEls.length; i++) {
          for (let j = i + 1; j < itemEls.length; j++) {
            const a = itemEls[i], b = itemEls[j];
            let dx = b.bx - a.bx, dy = b.by - a.by;
            const d = Math.hypot(dx, dy);
            if (d > 25 || d === 0) continue;
            const push = (25 - d) / 2;
            dx /= d; dy /= d;
            a.bx -= dx * push; a.by -= dy * push;
            b.bx += dx * push; b.by += dy * push;
          }
        }
      }
      for (const L of itemEls) {
        L.ring.setAttribute("cx", L.bx.toFixed(1));
        L.ring.setAttribute("cy", L.by.toFixed(1));
        L.num.setAttribute("x", L.bx.toFixed(1));
        L.num.setAttribute("y", (L.by + 5).toFixed(1));
      }
      /* Nama lapisan mengikuti tinggi lapisannya di layar, dijaga tidak
         saling menempel dari pandangan hampir tegak lurus. */
      const rows = layerEls.map((L) => {
        let lo = Infinity, hi = -Infinity;
        for (const m of L.members) {
          const p = parts[m];
          const [hx, hy, hz] = p.half;
          for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
            const s = toScreen(p.cx + sx * hx, p.holder.position.y + sy * hy, p.cz + sz * hz);
            if (s[1] < lo) lo = s[1];
            if (s[1] > hi) hi = s[1];
          }
        }
        return { L, cy: (lo + hi) / 2 };
      });
      const GAP = 30;
      for (let i = 1; i < rows.length; i++) {
        if (rows[i].cy - rows[i - 1].cy < GAP) rows[i].cy = rows[i - 1].cy + GAP;
      }
      const over = rows[rows.length - 1].cy - (H - 16);
      if (over > 0) for (const r of rows) r.cy -= over;
      for (const { L, cy } of rows) {
        L.t.setAttribute("y", (cy + 4).toFixed(1));
        L.rule.setAttribute("y1", (cy + 12).toFixed(1));
        L.rule.setAttribute("y2", (cy + 12).toFixed(1));
      }
    }

    // ------------------------------------------------------------ gelung
    let last = 0;
    function frame(now) {
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;
      const moving = orbit.step(dt);
      const before = explodeShown;
      explodeShown += (explode - explodeShown) * M.easeK(0.09, dt);
      if (Math.abs(explodeShown - before) > 1e-4) renderer.shadowMap.needsUpdate = true;

      const floor = M.poseStack(parts, explodeShown);
      M.poseStack(ghost.parts, explodeShown);
      ground.position.y = floor - 0.03;
      updateLinks();

      const a = orbit.state.az + (reduced.matches ? 0 : azScroll);
      M.placeCamera(camera, target, a, orbit.state.el, 40);
      renderer.render(scene, camera);
      paintLabels();

      if (!shown) {
        shown = true;
        canvas.setAttribute("tabindex", "0");
      }
      const settled = !moving && Math.abs(explode - explodeShown) < 0.001;
      if (settled || !visible) {
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

    /* Gulir memasang dan mengurai model: utuh di tepi lembar, terurai di
       tengah. Acuannya kanvas, bukan lembar, supaya gerakannya jatuh saat
       gambarnya benar-benar ditatap. */
    function onScroll() {
      if (reduced.matches) return;
      const r2 = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (r2.bottom < -80 || r2.top > vh + 80) return;
      const p = M.clamp((vh - r2.top) / (vh + r2.height), 0, 1);
      explode = M.smoothstep(0.10, 0.34, p) * (1 - M.smoothstep(0.66, 0.92, p));
      azScroll = (p - 0.5) * 0.5;
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
    }, { rootMargin: "120px 0px" }).observe(figure);

    window.addEventListener("resize", resize, { passive: true });
    if (window.ResizeObserver) new ResizeObserver(() => resize()).observe(figure);
    (narrow.addEventListener ? narrow.addEventListener("change", resize) : narrow.addListener(resize));
    const onReduced = () => { if (reduced.matches) { explode = 1; azScroll = 0; } kick(); };
    (reduced.addEventListener ? reduced.addEventListener("change", onReduced) : reduced.addListener(onReduced));

    /* Konteks WebGL bisa hilang (tab lama di latar, driver reset). Model SVG
       dikembalikan, bukan dibiarkan kosong. */
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      running = false;
      visible = false;
      wrap.remove();
      legend.remove();
      svgModel.hidden = false;
      document.documentElement.classList.remove("iso-3d");
      window.dispatchEvent(new Event("scroll"));
    });

    // ------------------------------------------------------- serah terima
    document.documentElement.classList.add("iso-3d");
    const echo = document.querySelector(".iso-echo");
    if (echo) echo.remove();
    svgModel.hidden = true;

    if (reduced.matches) explode = 1;
    resize();
    onScroll();
    explodeShown = explode;
    kick();
  }
})();
