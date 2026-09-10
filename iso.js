/* Model isometrik lembar 3 yang bisa diputar.
 *
 * Geometrinya 3D sungguhan: sembilan balok bersudut dunia (x, y, z) yang
 * diproyeksikan ulang tiap frame, bukan gambar yang dimiringkan. Diputar
 * mengelilingi sumbu tegak, digerakkan oleh gulir halaman, seret tetikus,
 * usapan jari, dan tombol panah.
 *
 * Nol library. Markup diam di index.html adalah keadaan istirahat sekaligus
 * cadangan tanpa JavaScript; berkas ini menulis ulang atribut elemen yang
 * sama, jadi SOLIDS di sini wajib sama persis dengan yang di generator.
 */
(() => {
  "use strict";

  const svg = document.querySelector(".iso-wide");
  if (!svg) return;

  const sheet = svg.closest(".sheet");
  const NS = "http://www.w3.org/2000/svg";
  const C30 = Math.cos(Math.PI / 6);
  const SCALE = 24;
  const CX = 6, CY = 4;

  // name: [x0, x1, y0, y1, z0, z1, layer]  (layer dicat dari belakang ke depan)
  const SOLIDS = {
    tank:     [0.0, 12.0, 0.0, 8.0, -3.40, -2.90, 0],
    rpool:    [0.0, 12.0, 0.0, 8.0, -2.20, -1.70, 1],
    host:     [0.0, 12.0, 0.0, 8.0, -0.50,  0.00, 2],
    vmbr1:    [1.0,  9.6, 3.75, 4.15, 2.20, 2.35, 3],
    ct_web:   [0.8,  4.2, 0.8, 3.2,  2.35,  3.80, 3],
    ct_redis: [5.6,  9.0, 0.8, 3.2,  2.35,  3.80, 3],
    ct_db:    [2.6,  7.2, 4.8, 7.2,  2.35,  3.80, 3],
    cf:       [0.4,  5.2, 0.8, 3.2,  6.00,  6.30, 4],
    ts:       [6.4, 11.2, 0.8, 3.2,  6.00,  6.30, 4]
  };

  /* Offset dibaca balik dari markup diam, bukan disalin sebagai angka, supaya
     frame pertama JS jatuh persis di atas gambar yang sudah tercetak di HTML. */
  let OX = 0, OY = 0;
  (() => {
    const probe = svg.querySelector('[data-solid="host"] .face');
    if (!probe) return;
    const first = probe.getAttribute("d").slice(1).split(" L")[0].split(" ");
    const h = SOLIDS.host;                    // titik pertama heksagon = (x0, y0, z1)
    const p = rawProj(h[0], h[2], h[5], 0);
    OX = parseFloat(first[0]) - p[0];
    OY = parseFloat(first[1]) - p[1];
  })();

  function rawProj(x, y, z, th) {
    const dx = x - CX, dy = y - CY;
    const ct = Math.cos(th), st = Math.sin(th);
    const rx = dx * ct - dy * st + CX;
    const ry = dx * st + dy * ct + CY;
    return [(rx - ry) * C30 * SCALE, ((rx + ry) * 0.5 - z) * SCALE];
  }

  function P(x, y, z, th) {
    const p = rawProj(x, y, z, th);
    return [p[0] + OX, p[1] + OY];
  }

  const f = (v) => v.toFixed(1);

  function silhouette(name, th) {
    const [x0, x1, y0, y1, z0, z1] = SOLIDS[name];
    const hexa = [
      P(x0, y0, z1, th), P(x1, y0, z1, th), P(x1, y0, z0, th),
      P(x1, y1, z0, th), P(x0, y1, z0, th), P(x0, y1, z1, th)
    ];
    const near = P(x1, y1, z1, th);
    return {
      d: "M" + hexa.map((p) => `${f(p[0])} ${f(p[1])}`).join(" L") + " Z",
      edges: [[near, P(x1, y0, z1, th)], [near, P(x0, y1, z1, th)], [near, P(x1, y1, z0, th)]]
    };
  }

  /* Titik sangkut label: sudut paling kanan, yang atas kalau seri. Dihitung
     ulang tiap frame supaya leader selalu keluar dari sisi yang menghadap
     kolom keterangan, berapa pun putarannya. */
  function anchor(name, th) {
    const [x0, x1, y0, y1, z0, z1] = SOLIDS[name];
    let best = null;
    for (const x of [x0, x1]) for (const y of [y0, y1]) for (const z of [z0, z1]) {
      const p = P(x, y, z, th);
      if (!best || p[0] > best[0] + 1e-9 || (Math.abs(p[0] - best[0]) < 1e-9 && p[1] < best[1])) best = p;
    }
    return best;
  }

  // urutan cat: lapisan dulu, lalu kedalaman (rx + ry) di dalam lapisan
  function depthKey(name, th) {
    const [x0, x1, y0, y1] = SOLIDS[name];
    const dx = (x0 + x1) / 2 - CX, dy = (y0 + y1) / 2 - CY;
    const ct = Math.cos(th), st = Math.sin(th);
    return (dx * ct - dy * st) + (dx * st + dy * ct);
  }

  // -------------------------------------------------------------- elemen
  const stack = svg.querySelector(".iso-stack");
  const solidEls = [...svg.querySelectorAll("[data-solid]")].map((g) => ({
    name: g.dataset.solid,
    g,
    face: g.querySelector(".face"),
    edges: [...g.querySelectorAll(".thin")]
  }));
  const dropEls = [...svg.querySelectorAll("[data-drop]")].map((g) => {
    const [x, y, zf, zt] = g.dataset.drop.split(",").map(Number);
    return { x, y, zf, zt, line: g.querySelector("line"), head: g.querySelector(".fill") };
  });
  const layerEls = [...svg.querySelectorAll("[data-layer]")].map((g) => ({
    members: g.dataset.layer.split(","),
    chars: parseInt(g.dataset.cap, 10) || 4,
    text: g.querySelector("text"),
    rule: g.querySelector("line")
  }));
  const calloutEls = [...svg.querySelectorAll("[data-of]")].map((g) => ({
    of: g.dataset.of,
    ly: parseFloat(g.dataset.ly),
    knee: parseFloat(g.dataset.knee),
    lx: parseFloat(g.dataset.lx),
    leader: g.querySelector(".leader"),
    dot: g.querySelector("circle")
  }));

  /* Bayangan model yang sama, jauh lebih besar dan tipis, jadi latar belakang
     lembar. Dekoratif: tidak dibaca pembaca layar dan tidak menerima sentuhan. */
  let echoSolids = [];
  if (sheet && stack) {
    const echo = document.createElementNS(NS, "svg");
    echo.setAttribute("class", "iso-echo");
    echo.setAttribute("viewBox", svg.dataset.vbWide || svg.getAttribute("viewBox"));
    echo.setAttribute("preserveAspectRatio", "xMidYMid slice");
    echo.setAttribute("aria-hidden", "true");
    echo.setAttribute("focusable", "false");
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "plan-ink plan-ink-white iso");
    g.appendChild(stack.cloneNode(true));
    echo.appendChild(g);
    sheet.insertBefore(echo, sheet.firstChild);
    echoSolids = [...echo.querySelectorAll("[data-solid]")].map((el) => ({
      name: el.dataset.solid,
      g: el,
      face: el.querySelector(".face"),
      edges: [...el.querySelectorAll(".thin")]
    }));
  }

  // ------------------------------------------------------------- render
  const lastOrder = new WeakMap();   // tiap stack mengingat urutannya sendiri

  function paint(list, parent, th) {
    for (const s of list) {
      const { d, edges } = silhouette(s.name, th);
      s.face.setAttribute("d", d);
      edges.forEach(([a, b], i) => {
        const l = s.edges[i];
        if (!l) return;
        l.setAttribute("x1", f(a[0])); l.setAttribute("y1", f(a[1]));
        l.setAttribute("x2", f(b[0])); l.setAttribute("y2", f(b[1]));
      });
    }
    if (!parent) return;
    const sorted = [...list].sort((a, b) =>
      (SOLIDS[a.name][6] - SOLIDS[b.name][6]) || (depthKey(a.name, th) - depthKey(b.name, th))
    );
    const key = sorted.map((s) => s.name).join(",");
    if (lastOrder.get(parent) !== key) {
      sorted.forEach((s) => parent.appendChild(s.g));
      lastOrder.set(parent, key);
    }
  }

  function render(th) {
    paint(solidEls, stack, th);
    if (echoSolids.length) paint(echoSolids, echoSolids[0].g.parentNode, th + 0.55);

    for (const d of dropEls) {
      const a = P(d.x, d.y, d.zf, th), b = P(d.x, d.y, d.zt, th);
      d.line.setAttribute("x1", f(a[0])); d.line.setAttribute("y1", f(a[1]));
      d.line.setAttribute("x2", f(b[0])); d.line.setAttribute("y2", f(b[1]));
      d.head.setAttribute("d", `M${f(b[0])} ${f(b[1])} l-3.6 -7.2 l7.2 0 Z`);
    }

    /* Nama lapisan mengikuti lapisannya: memutar model menggeser (rx + ry),
       jadi ketinggian tiap lapisan di layar ikut berubah. */
    for (const L of layerEls) {
      let lo = Infinity, hi = -Infinity;
      for (const m of L.members) {
        const [x0, x1, y0, y1, z0, z1] = SOLIDS[m];
        for (const x of [x0, x1]) for (const y of [y0, y1]) for (const z of [z0, z1]) {
          const sy = P(x, y, z, th)[1];
          if (sy < lo) lo = sy;
          if (sy > hi) hi = sy;
        }
      }
      const cy = (lo + hi) / 2;
      L.text.setAttribute("y", f(cy + 4));
      L.rule.setAttribute("y1", f(cy + 12));
      L.rule.setAttribute("y2", f(cy + 12));
    }

    for (const c of calloutEls) {
      const a = anchor(c.of, th);
      c.leader.setAttribute("d", `M${f(a[0])} ${f(a[1])} L${f(c.knee)} ${f(c.ly)} L${f(c.lx)} ${f(c.ly)}`);
      c.dot.setAttribute("cx", f(a[0])); c.dot.setAttribute("cy", f(a[1]));
    }
  }

  // -------------------------------------------------------- interaksi
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const narrow = window.matchMedia("(max-width: 760px)");
  const SCROLL_SPAN = 0.62;          // radian yang ditempuh saat lembar dilewati
  const PER_PX = 0.006;              // radian per piksel seretan
  const KEY_STEP = 0.14;

  let dragTheta = 0;
  let scrollTheta = 0;
  let current = 0;
  let running = false;
  let dragging = false;
  let lastX = 0;
  let pointerId = null;

  const target = () => dragTheta + (reduced.matches ? 0 : scrollTheta);

  function loop() {
    const t = target();
    const diff = t - current;
    current += diff * (dragging ? 0.45 : 0.16);
    render(current);
    if (dragging || Math.abs(t - current) > 0.0006) {
      requestAnimationFrame(loop);
    } else {
      current = t;
      render(current);
      running = false;
    }
  }

  function kick() {
    if (running) return;
    running = true;
    requestAnimationFrame(loop);
  }

  function measureScroll() {
    if (!sheet || reduced.matches) return;
    const r = sheet.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    if (r.bottom < 0 || r.top > vh) return;
    const p = (vh - r.top) / (vh + r.height);
    scrollTheta = (Math.min(1, Math.max(0, p)) - 0.5) * SCROLL_SPAN;
    kick();
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; measureScroll(); });
  }, { passive: true });

  svg.addEventListener("pointerdown", (e) => {
    if (pointerId !== null) return;
    pointerId = e.pointerId;
    dragging = true;
    lastX = e.clientX;
    svg.classList.add("is-dragging");
    if (svg.setPointerCapture) svg.setPointerCapture(e.pointerId);
    kick();
  });

  svg.addEventListener("pointermove", (e) => {
    if (!dragging || e.pointerId !== pointerId) return;
    dragTheta += (e.clientX - lastX) * PER_PX;
    lastX = e.clientX;
    kick();
  });

  function endDrag(e) {
    if (e && e.pointerId !== pointerId) return;
    dragging = false;
    pointerId = null;
    svg.classList.remove("is-dragging");
    kick();
  }
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);
  svg.addEventListener("lostpointercapture", endDrag);

  svg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") dragTheta -= KEY_STEP;
    else if (e.key === "ArrowRight") dragTheta += KEY_STEP;
    else if (e.key === "Home") dragTheta = 0;
    else return;
    e.preventDefault();
    kick();
  });

  // ------------------------------------------------------- responsif
  function applyViewBox() {
    const vb = narrow.matches ? svg.dataset.vbNarrow : svg.dataset.vbWide;
    if (vb) svg.setAttribute("viewBox", vb);
    svg.classList.toggle("is-narrow", narrow.matches);
  }
  (narrow.addEventListener ? narrow.addEventListener("change", applyViewBox) : narrow.addListener(applyViewBox));
  (reduced.addEventListener ? reduced.addEventListener("change", kick) : reduced.addListener(kick));

  applyViewBox();
  document.documentElement.classList.add("iso-live");
  measureScroll();
  render(current);
})();
