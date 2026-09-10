/* Model server lembar 3 versi WebGL (Three.js r180, di-host sendiri).
 *
 * Bukan render mengilap: dunia lembar ini tinta putih di atas kertas biru,
 * jadi tiap balok dirender sebagai bidang datar sewarna kertas ditambah rusuk
 * putih. Hasilnya penghapusan garis tersembunyi, persis cara perangkat lunak
 * CAD menampilkan model, sehingga tiga dimensinya sungguhan tanpa keluar dari
 * bahasa gambar teknik.
 *
 * Tiga.js baru diunduh saat lembar 3 mendekat. Kalau WebGL tidak ada atau
 * modulnya gagal dimuat, halaman tetap memakai model SVG di iso.js.
 */
(() => {
  "use strict";

  const figure = document.querySelector(".sheet-3 .plan");
  const svgModel = document.querySelector(".iso-wide");
  if (!figure || !svgModel) return;

  // ------------------------------------------------------------- model
  const CX = 6, CY = 4;
  /* name: [x0, x1, y0, y1, tebal, z terurai, z terpasang]
     Penyimpanan sengaja dipecah jadi pelat pembawa + dua cakram: "mirror"
     baru terbaca kalau kedua cakramnya benar-benar kelihatan. */
  const SOLIDS = [
    ["tank_a",      0.4,  5.6, 0.6, 7.4, 0.62, -3.30, -2.10],
    ["tank_b",      6.4, 11.6, 0.6, 7.4, 0.62, -3.30, -2.10],
    ["rpool_a",     0.4,  5.6, 1.2, 6.8, 0.36, -2.00, -1.30],
    ["rpool_b",     6.4, 11.6, 1.2, 6.8, 0.36, -2.00, -1.30],
    ["host",        0.0, 12.0, 0.0, 8.0, 0.50, -0.50, -0.50],
    ["vmbr1",       1.0,  9.6, 3.75, 4.15, 0.15, 2.20, 0.00],
    ["ct_web",      0.8,  4.2, 0.8, 3.2, 1.45, 2.35, 0.15],
    ["ct_redis",    5.6,  9.0, 0.8, 3.2, 1.45, 2.35, 0.15],
    ["ct_db",       2.6,  7.2, 4.8, 7.2, 1.45, 2.35, 0.15],
    ["cf",          0.4,  5.2, 0.8, 3.2, 0.30, 6.00, 1.60],
    ["ts",          6.4, 11.2, 0.8, 3.2, 0.30, 6.00, 1.60]
  ];

  /* Balon bernomor menempel di bendanya, keterangannya di daftar bernomor
     yang sama. Itu cara gambar teknik menautkan benda ke daftar material,
     dan jauh lebih mudah diikuti daripada sembilan garis penunjuk. */
  const ITEMS = [
    [1, "cf",       "Cloudflare Tunnel", "situs & aplikasi ke publik"],
    [2, "ts",       "Tailscale · SSH · 2FA", "jalur admin, bukan port terbuka"],
    [3, "ct_web",   "CT 100 web", "nginx + cloudflared"],
    [4, "ct_redis", "CT 102 redis", "cache & antrean"],
    [5, "ct_db",    "CT 120 db · MySQL 8.4", "hanya mendengar di 10.10.10.120"],
    [6, "vmbr1",    "vmbr1 · 10.10.10.0/24", "bridge internal tanpa port fisik"],
    [7, "host",     "Proxmox VE 9.2", "Ryzen 9 9900X · 32 GB"],
    [8, "rpool_a",  "rpool · 2× NVMe 2 TB", "mirror ZFS: root & container"],
    [9, "tank_a",   "tank · 2× HDD 4 TB", "mirror ZFS: backup & data"]
  ];

  // jalur data yang benar-benar ada; ikut memanjang saat model terurai
  const LINKS = [
    ["cf", "ct_web"],
    ["ts", "host"],
    ["ct_web", "vmbr1"],
    ["ct_redis", "vmbr1"],
    ["ct_db", "vmbr1"]
  ];

  const LAYERS = [
    ["TEPI", ["cf", "ts"]],
    ["CONTAINER", ["ct_web", "ct_redis", "ct_db", "vmbr1"]],
    ["HOST", ["host"]],
    ["PENYIMPANAN", ["rpool_a", "rpool_b", "tank_a", "tank_b"]]
  ];

  const INK = 0xffffff;
  const PAPER = 0x0f2f5f;
  const NS = "http://www.w3.org/2000/svg";

  function webglOK() {
    try {
      const c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
    } catch (e) {
      return false;
    }
  }
  if (!webglOK()) return;

  // Three.js baru diambil saat lembar 3 mendekat layar.
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    io.disconnect();
    import("./vendor/three.module.min.js").then(boot).catch(() => {
      /* modul gagal: model SVG di iso.js tetap jalan, tidak ada yang hilang */
    });
  }, { rootMargin: "700px 0px" });
  io.observe(figure);

  // -------------------------------------------------------------- boot
  function boot(THREE) {
    const wrap = document.createElement("div");
    wrap.className = "iso3d";
    const canvas = document.createElement("canvas");
    canvas.className = "iso3d-canvas";
    canvas.setAttribute("role", "img");
    canvas.setAttribute("tabindex", "0");
    canvas.setAttribute("aria-label", svgModel.querySelector("title").textContent);
    canvas.setAttribute("aria-describedby", "isoHint isoHelp");
    const overlay = document.createElementNS(NS, "svg");
    overlay.setAttribute("class", "iso3d-labels plan-ink plan-ink-white iso");
    overlay.setAttribute("aria-hidden", "true");
    overlay.setAttribute("focusable", "false");
    wrap.appendChild(canvas);
    wrap.appendChild(overlay);
    svgModel.parentNode.insertBefore(wrap, svgModel);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
    } catch (e) {
      wrap.remove();
      return;
    }
    renderer.setClearAlpha(0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
    const target = new THREE.Vector3(0, 1.50, 0);

    const faceMat = new THREE.MeshBasicMaterial({
      color: PAPER, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1
    });
    const edgeMat = new THREE.LineBasicMaterial({ color: INK });
    const ghostFace = new THREE.MeshBasicMaterial({ color: PAPER, transparent: true, opacity: 0, depthWrite: false });
    const ghostEdge = new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.1, depthWrite: false });

    const group = new THREE.Group();
    scene.add(group);

    /* Bayangan model yang sama, jauh lebih besar dan hanya garis, jadi latar
       lembar. Diputar terpisah supaya terbaca sebagai lapisan lain. */
    const ghost = new THREE.Group();
    ghost.scale.setScalar(2.6);
    ghost.rotation.y = 0.55;
    ghost.renderOrder = -1;
    scene.add(ghost);

    const parts = {};
    for (const [name, x0, x1, y0, y1, thick, zEx, zAs] of SOLIDS) {
      const w = x1 - x0, d = y1 - y0;
      const cx = (x0 + x1) / 2 - CX, cz = (y0 + y1) / 2 - CY;
      const geo = new THREE.BoxGeometry(w, thick, d);
      const edges = new THREE.EdgesGeometry(geo);

      const holder = new THREE.Group();
      holder.position.set(cx, 0, cz);
      holder.add(new THREE.Mesh(geo, faceMat));
      holder.add(new THREE.LineSegments(edges, edgeMat));
      group.add(holder);

      const gh = new THREE.Group();
      gh.position.copy(holder.position);
      gh.add(new THREE.Mesh(geo, ghostFace));
      gh.add(new THREE.LineSegments(edges, ghostEdge));
      ghost.add(gh);

      parts[name] = {
        holder, gh,
        yEx: zEx + thick / 2,       // tinggi pusat saat terurai
        yAs: zAs + thick / 2,       // tinggi pusat saat terpasang
        half: [w / 2, thick / 2, d / 2],
        cx, cz
      };
    }

    // sumbu perakitan, garis putus tegak lewat pusat tumpukan
    const axisGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -4.4, 0), new THREE.Vector3(0, 7.4, 0)
    ]);
    const axis = new THREE.LineSegments(
      axisGeo,
      new THREE.LineDashedMaterial({ color: INK, dashSize: 0.28, gapSize: 0.34, transparent: true, opacity: 0.45 })
    );
    axis.computeLineDistances();
    scene.add(axis);

    /* Jalur data antar bagian. Titik sambungnya dihitung ulang tiap frame dari
       posisi bagian, jadi garisnya ikut memanjang saat model terurai dan
       memendek saat merapat. */
    const linkPos = new Float32Array(LINKS.length * 6);
    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute("position", new THREE.BufferAttribute(linkPos, 3));
    const links = new THREE.LineSegments(
      linkGeo,
      new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.72 })
    );
    scene.add(links);

    function updateLinks() {
      LINKS.forEach(([na, nb], i) => {
        const a = parts[na], b = parts[nb];
        const hi = a.holder.position.y >= b.holder.position.y ? a : b;
        const lo = hi === a ? b : a;
        const o = i * 6;
        linkPos[o] = hi.cx;
        linkPos[o + 1] = hi.holder.position.y - hi.half[1];
        linkPos[o + 2] = hi.cz;
        linkPos[o + 3] = lo.cx;
        linkPos[o + 4] = lo.holder.position.y + lo.half[1];
        linkPos[o + 5] = lo.cz;
      });
      linkGeo.attributes.position.needsUpdate = true;
    }

    // -------------------------------------------------------- keadaan
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 760px)");

    let az = Math.PI / 4, el = 0.56;        // sudut pandang isometrik
    let azV = 0, elV = 0;                   // kelembaman setelah dilepas
    let azScroll = 0, explode = 1, explodeShown = 1;
    let dragging = false, pointerId = null, lastX = 0, lastY = 0;
    let visible = true, running = false;

    const EL_MIN = 0.20, EL_MAX = 1.08;   // tetap pandangan gambar, bukan denah
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

    // --------------------------------------------------------- label
    const itemEls = ITEMS.map(([no, of, l1, l2]) => {
      // balon yang menempel di benda
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

      // barisnya di daftar keterangan
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

      return { of, bal, ring, num, ring2, num2, t1, t2, ly: 0, bx: 0, by: 0 };
    });

    const layerEls = LAYERS.map(([caption, members]) => {
      const g = document.createElementNS(NS, "g");
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
    let W = 0, H = 0, labelX = 0, shift = 0;

    function resize() {
      const rect = figure.getBoundingClientRect();
      const isNarrow = narrow.matches;
      W = Math.max(240, Math.round(rect.width));
      // lebar menyisakan kolom keterangan; sempit memakai bingkai lebih tegak
      H = Math.round(W * (isNarrow ? 1.05 : 524 / 785));

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(W, H, false);
      overlay.setAttribute("viewBox", `0 0 ${W} ${H}`);
      overlay.setAttribute("width", String(W));
      overlay.setAttribute("height", String(H));

      const halfH = 9.0;
      const halfW = halfH * (W / H);
      shift = isNarrow ? 0 : 0.16 * halfW * 2;
      camera.left = -halfW + shift;
      camera.right = halfW + shift;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();

      // daftar keterangan bernomor di kanan
      labelX = W - Math.min(258, W * 0.33) + 34;
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
      overlay.classList.toggle("is-narrow", isNarrow);
      kick();
    }

    // -------------------------------------------------- proyeksi ke layar
    const v = new THREE.Vector3();
    function toScreen(x, y, z) {
      v.set(x, y, z).project(camera);
      return [(v.x * 0.5 + 0.5) * W, (-v.y * 0.5 + 0.5) * H];
    }

    function paintLabels() {
      if (narrow.matches) return;

      /* Balon dipasang di sudut benda yang paling dekat ke kamera. Memakai
         pusat muka atas tidak cukup: muka atas lapisan penyimpanan selalu
         tertutup slab host di atasnya, jadi balonnya melayang di benda lain. */
      const dir = camera.position.clone().sub(target).normalize();
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
      // dorong yang bertumpuk, sedikit saja, supaya tetap menempel di bendanya
      for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < itemEls.length; i++) {
          for (let j = i + 1; j < itemEls.length; j++) {
            const a = itemEls[i], b = itemEls[j];
            let dx = b.bx - a.bx, dy = b.by - a.by;
            let d = Math.hypot(dx, dy);
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
      /* Nama lapisan mengikuti tinggi lapisannya di layar, tapi dijaga tidak
         saling menempel: dari pandangan hampir tegak lurus keempat lapisan
         jatuh di ketinggian yang nyaris sama. */
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
    function frame() {
      if (!dragging) {
        az += azV; el = clamp(el + elV, EL_MIN, EL_MAX);
        azV *= 0.92; elV *= 0.92;
        if (Math.abs(azV) < 1e-5) azV = 0;
        if (Math.abs(elV) < 1e-5) elV = 0;
      }
      explodeShown += (explode - explodeShown) * 0.09;

      for (const name in parts) {
        const p = parts[name];
        const y = p.yAs + (p.yEx - p.yAs) * explodeShown;
        p.holder.position.y = y;
        p.gh.position.y = y;
      }

      updateLinks();

      const a = az + (reduced.matches ? 0 : azScroll);
      const r = 40;
      camera.position.set(
        target.x + r * Math.cos(el) * Math.cos(a),
        target.y + r * Math.sin(el),
        target.z + r * Math.cos(el) * Math.sin(a)
      );
      camera.lookAt(target);
      camera.updateMatrixWorld();

      renderer.render(scene, camera);
      paintLabels();

      const settled = !dragging && azV === 0 && elV === 0 && Math.abs(explode - explodeShown) < 0.001;
      if (settled || !visible) {
        running = false;
      } else {
        requestAnimationFrame(frame);
      }
    }

    function kick() {
      if (running || !visible) return;
      running = true;
      requestAnimationFrame(frame);
    }

    // ------------------------------------------------------- interaksi
    canvas.addEventListener("pointerdown", (e) => {
      if (pointerId !== null) return;
      pointerId = e.pointerId;
      dragging = true;
      lastX = e.clientX; lastY = e.clientY;
      azV = elV = 0;
      canvas.classList.add("is-dragging");
      if (canvas.setPointerCapture) canvas.setPointerCapture(e.pointerId);
      kick();
    });

    canvas.addEventListener("pointermove", (e) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      az += dx * 0.008;
      el = clamp(el - dy * 0.0042, EL_MIN, EL_MAX);
      azV = dx * 0.0025; elV = -dy * 0.0011;
      kick();
    });

    function endDrag(e) {
      if (e && e.pointerId !== pointerId) return;
      dragging = false; pointerId = null;
      canvas.classList.remove("is-dragging");
      kick();
    }
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("lostpointercapture", endDrag);

    canvas.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") az -= 0.14;
      else if (e.key === "ArrowRight") az += 0.14;
      else if (e.key === "ArrowUp") el = clamp(el + 0.1, EL_MIN, EL_MAX);
      else if (e.key === "ArrowDown") el = clamp(el - 0.1, EL_MIN, EL_MAX);
      else if (e.key === "Home") { az = Math.PI / 4; el = 0.56; azV = elV = 0; }
      else return;
      e.preventDefault();
      kick();
    });

    /* Gulir memasang dan mengurai model: di tepi lembar ia utuh, di tengah
       ia terurai. Sekalian memutar pelan. */
    const smoothstep = (a, b, x) => {
      const t = clamp((x - a) / (b - a), 0, 1);
      return t * t * (3 - 2 * t);
    };

    let ticking = false;
    function onScroll() {
      if (reduced.matches) return;
      /* Acuannya kanvas, bukan lembar: kalau memakai lembar, seluruh gerakan
         rakit-urai jatuh saat gambarnya justru sedang di luar layar. */
      const r2 = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (r2.bottom < -80 || r2.top > vh + 80) return;
      const p = clamp((vh - r2.top) / (vh + r2.height), 0, 1);
      // terpasang saat masuk, terurai penuh selama tertatap, terpasang lagi saat lewat
      explode = smoothstep(0.10, 0.34, p) * (1 - smoothstep(0.66, 0.92, p));
      azScroll = (p - 0.5) * 0.5;
      kick();
    }
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; onScroll(); });
    }, { passive: true });

    // berhenti melukis saat lembar tidak terlihat
    new IntersectionObserver((es) => {
      visible = es.some((e) => e.isIntersecting);
      if (visible) kick();
    }, { rootMargin: "120px 0px" }).observe(figure);

    const onResize = () => { resize(); };
    window.addEventListener("resize", onResize, { passive: true });
    (narrow.addEventListener ? narrow.addEventListener("change", resize) : narrow.addListener(resize));
    (reduced.addEventListener ? reduced.addEventListener("change", kick) : reduced.addListener(kick));

    // ------------------------------------------------------- serah terima
    document.documentElement.classList.add("iso-3d");
    const echo = document.querySelector(".iso-echo");
    if (echo) echo.remove();
    svgModel.remove();

    if (reduced.matches) explode = 1;
    resize();
    onScroll();
    explodeShown = explode;
    kick();
  }
})();
