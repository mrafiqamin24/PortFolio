/* Model server bersama untuk dua kanvas: lembar sampul (rakitan, di atas
 * kertas) dan lembar 3 (terurai, di atas cetak biru).
 *
 * Bahasa rendernya "shaded with edges", cara CAD menampilkan model: bidang
 * bermaterial yang disinari studio lembut, bayangan kontak di kertas, dan
 * garis rusuk tipis di atasnya supaya tetap terbaca sebagai gambar teknik.
 * Balok dibulatkan tepinya (bevel) karena tepi tajam tidak menangkap cahaya;
 * di situlah kesan benda sungguhan berasal.
 *
 * Semua yang dipakai ada di Three.js inti (r180), tanpa addons.
 */

export const CX = 6, CY = 4;

/* name, x0, x1, y0, y1, tebal, z terurai, z terpasang, bahan
   Penyimpanan dipecah jadi dua cakram per pool: "mirror" baru terbaca kalau
   keduanya benar-benar kelihatan. */
export const SOLIDS = [
  ["tank_a",   0.4,  5.6, 0.6, 7.4, 0.62, -3.30, -2.10, "hdd"],
  ["tank_b",   6.4, 11.6, 0.6, 7.4, 0.62, -3.30, -2.10, "hdd"],
  ["rpool_a",  0.4,  5.6, 1.2, 6.8, 0.36, -2.00, -1.30, "nvme"],
  ["rpool_b",  6.4, 11.6, 1.2, 6.8, 0.36, -2.00, -1.30, "nvme"],
  ["host",     0.0, 12.0, 0.0, 8.0, 0.50, -0.50, -0.50, "host"],
  ["vmbr1",    1.0,  9.6, 3.75, 4.15, 0.15, 2.20, 0.00, "accent"],
  ["ct_web",   0.8,  4.2, 0.8, 3.2, 1.45, 2.35, 0.15, "ct"],
  ["ct_redis", 5.6,  9.0, 0.8, 3.2, 1.45, 2.35, 0.15, "ct"],
  ["ct_db",    2.6,  7.2, 4.8, 7.2, 1.45, 2.35, 0.15, "ct"],
  ["cf",       0.4,  5.2, 0.8, 3.2, 0.30, 6.00, 1.60, "edge"],
  ["ts",       6.4, 11.2, 0.8, 3.2, 0.30, 6.00, 1.60, "edge"]
];

/* Balon bernomor menempel di bendanya, keterangannya di daftar bernomor yang
   sama: cara daftar material menautkan benda ke keterangan. */
export const ITEMS = [
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
export const LINKS = [
  ["cf", "ct_web"],
  ["ts", "host"],
  ["ct_web", "vmbr1"],
  ["ct_redis", "vmbr1"],
  ["ct_db", "vmbr1"]
];

export const LAYERS = [
  ["TEPI", ["cf", "ts"]],
  ["CONTAINER", ["ct_web", "ct_redis", "ct_db", "vmbr1"]],
  ["HOST", ["host"]],
  ["PENYIMPANAN", ["rpool_a", "rpool_b", "tank_a", "tank_b"]]
];

/* Dua palet, satu per kertas. Di kertas putih bendanya tanah liat putih
   dengan sasis grafit dan satu aksen biru dimensi (bridge internal, satu-
   satunya bagian yang "mengukur" lalu lintas). Di cetak biru semuanya nada
   biru dengan rusuk putih; aksennya putih, seperti tinta lembar itu. */
export const PALETTES = {
  paper: {
    edge: 0x111111, edgeOpacity: 0.5,
    shadow: 0.20,
    hemi: [0xffffff, 0xa9a69b, 0.8],
    key: [0xffffff, 3.0],
    fill: [0xffffff, 0.35],
    rim: [0xffffff, 1.0],
    studio: { ambient: 0.9, top: 4.5, side: 1.4 },
    envIntensity: 0.75,
    mats: {
      host:   { color: 0x2d2d30, roughness: 0.46, metalness: 0.42 },
      ct:     { color: 0xe9e8e1, roughness: 0.70, metalness: 0.03 },
      accent: { color: 0x0b57d0, roughness: 0.40, metalness: 0.28 },
      edge:   { color: 0xd6d4cb, roughness: 0.60, metalness: 0.08 },
      nvme:   { color: 0xaaaaa6, roughness: 0.30, metalness: 0.68 },
      hdd:    { color: 0x5b5b59, roughness: 0.44, metalness: 0.52 }
    }
  },
  cyan: {
    edge: 0xffffff, edgeOpacity: 0.95,
    shadow: 0.38,
    hemi: [0xe6eeff, 0x081a38, 1.05],
    key: [0xffffff, 2.2],
    fill: [0xbcd0ee, 0.55],
    rim: [0xdfe9ff, 0.9],
    studio: { ambient: 0.35, top: 4.0, side: 1.2 },
    envIntensity: 0.6,
    mats: {
      host:   { color: 0x0c2750, roughness: 0.50, metalness: 0.38 },
      ct:     { color: 0x3a6fc0, roughness: 0.62, metalness: 0.06 },
      accent: { color: 0xdfe9ff, roughness: 0.44, metalness: 0.22 },
      edge:   { color: 0x2e5fae, roughness: 0.56, metalness: 0.10 },
      nvme:   { color: 0x86a9de, roughness: 0.30, metalness: 0.62 },
      hdd:    { color: 0x1c4283, roughness: 0.46, metalness: 0.50 }
    }
  }
};

/* Studio kecil untuk peta lingkungan: satu softbox di atas, dua panel samping,
   dinding redup. Dari sinilah kilau lembut di bagian logam datang. */
export function makeStudioEnv(THREE, renderer, studio) {
  const scene = new THREE.Scene();
  const grey = (v) => new THREE.Color(v, v, v);
  const room = new THREE.Mesh(
    new THREE.SphereGeometry(40, 24, 12),
    new THREE.MeshBasicMaterial({ color: grey(studio.ambient), side: THREE.BackSide })
  );
  scene.add(room);
  const panel = (w, h, e, x, y, z) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: grey(e), side: THREE.DoubleSide })
    );
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    scene.add(m);
  };
  panel(16, 16, studio.top, 0, 22, 0);
  panel(10, 22, studio.side, -24, 8, 8);
  panel(8, 18, studio.side * 0.45, 20, 6, -16);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(scene, 0.06).texture;
  pmrem.dispose();
  // studio sementara tidak dibutuhkan lagi setelah peta lingkungannya jadi
  scene.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) o.material.dispose();
  });
  return tex;
}

/* Balok bertepi bulat: persegi diekstrusi dengan bevel di kedua ujung.
   Tepi tajam tidak pernah menangkap cahaya; yang bulat memberi garis kilau. */
export function slabGeometry(THREE, w, h, d) {
  const r = Math.min(0.1, h * 0.38, w * 0.2, d * 0.2);
  const iw = w - 2 * r, id = d - 2 * r, ih = Math.max(h - 2 * r, 0.002);
  const s = new THREE.Shape();
  s.moveTo(-iw / 2, -id / 2);
  s.lineTo(iw / 2, -id / 2);
  s.lineTo(iw / 2, id / 2);
  s.lineTo(-iw / 2, id / 2);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, {
    depth: ih, bevelEnabled: true, bevelThickness: r, bevelSize: r, bevelOffset: 0,
    bevelSegments: 3, curveSegments: 4
  });
  g.rotateX(-Math.PI / 2);
  g.center();
  return g;
}

/* Tumpukan lengkap. edgesOnly: hanya rusuk, untuk bayangan garis di latar. */
export function buildStack(THREE, palette, opts = {}) {
  const group = new THREE.Group();
  const edgeMat = new THREE.LineBasicMaterial({
    color: palette.edge, transparent: true,
    opacity: opts.edgeOpacity != null ? opts.edgeOpacity : palette.edgeOpacity,
    depthWrite: !opts.edgesOnly
  });
  const mats = {};
  if (!opts.edgesOnly) {
    for (const k in palette.mats) {
      mats[k] = new THREE.MeshStandardMaterial({
        ...palette.mats[k], envMapIntensity: palette.envIntensity
      });
    }
  }
  const parts = {};
  for (const [name, x0, x1, y0, y1, thick, zEx, zAs, kind] of SOLIDS) {
    const w = x1 - x0, d = y1 - y0;
    const cx = (x0 + x1) / 2 - CX, cz = (y0 + y1) / 2 - CY;
    const holder = new THREE.Group();
    holder.position.set(cx, 0, cz);
    let mesh = null;
    if (!opts.edgesOnly) {
      mesh = new THREE.Mesh(slabGeometry(THREE, w, thick, d), mats[kind]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      holder.add(mesh);
    }
    // rusuk dari balok tajam: di luar badan bulat, jadi tak pernah berkedip
    const box = new THREE.BoxGeometry(w, thick, d);
    const lines = new THREE.LineSegments(new THREE.EdgesGeometry(box), edgeMat);
    box.dispose();
    holder.add(lines);
    group.add(holder);
    parts[name] = {
      holder, mesh, kind,
      yEx: zEx + thick / 2,       // tinggi pusat saat terurai
      yAs: zAs + thick / 2,       // tinggi pusat saat terpasang
      half: [w / 2, thick / 2, d / 2],
      cx, cz
    };
  }
  return { group, parts, mats, edgeMat };
}

/* Meletakkan tiap bagian di antara terpasang (0) dan terurai (1); mengembalikan
   dasar bagian terendah supaya lantai bayangan bisa mengikutinya. */
export function poseStack(parts, t) {
  let floor = Infinity;
  for (const name in parts) {
    const p = parts[name];
    const y = p.yAs + (p.yEx - p.yAs) * t;
    p.holder.position.y = y;
    if (y - p.half[1] < floor) floor = y - p.half[1];
  }
  return floor;
}

/* Cahaya: langit-tanah untuk nada dasar, satu lampu kunci berbayangan lembut
   dari kiri-atas, satu pengisi redup dari belakang. */
export function addLights(THREE, scene, palette, target, opts = {}) {
  const hemi = new THREE.HemisphereLight(palette.hemi[0], palette.hemi[1], palette.hemi[2]);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(palette.key[0], palette.key[1]);
  key.position.set(target.x - 9, target.y + 15, target.z + 7);
  key.target.position.copy(target);
  key.castShadow = true;
  const size = opts.shadowSize || 2048;
  key.shadow.mapSize.set(size, size);
  const sc = key.shadow.camera;
  const ext = opts.extent || 9;   // jangkauan model tegak lurus cahaya; rapat = tajam
  sc.left = -ext; sc.right = ext; sc.top = ext; sc.bottom = -ext;
  sc.near = 1; sc.far = 70;
  key.shadow.radius = 7;
  key.shadow.blurSamples = 12;
  key.shadow.bias = -0.0006;
  key.shadow.normalBias = 0.035;
  scene.add(key, key.target);

  const fill = new THREE.DirectionalLight(palette.fill[0], palette.fill[1]);
  fill.position.set(target.x + 10, target.y + 5, target.z - 9);
  scene.add(fill);

  // lampu tepi dari belakang: garis kilau di rusuk jauh, supaya bentuk
  // terbaca dari cahaya, bukan dari garis
  const rim = new THREE.DirectionalLight(palette.rim[0], palette.rim[1]);
  rim.position.set(target.x + 4, target.y + 9, target.z - 16);
  scene.add(rim);
  return { hemi, key, fill, rim };
}

/* Lantai tak terlihat yang hanya menerima bayangan: kertasnya sendiri yang
   jadi meja studio. */
export function addGround(THREE, scene, opacity) {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(90, 90),
    new THREE.ShadowMaterial({ color: 0x000000, opacity, transparent: true })
  );
  ground.rotateX(-Math.PI / 2);
  ground.receiveShadow = true;
  scene.add(ground);
  return ground;
}

export function placeCamera(camera, target, az, el, r) {
  camera.position.set(
    target.x + r * Math.cos(el) * Math.cos(az),
    target.y + r * Math.sin(el),
    target.z + r * Math.cos(el) * Math.sin(az)
  );
  camera.lookAt(target);
  camera.updateMatrixWorld();
}

export function setupRenderer(THREE, renderer) {
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  // peta bayangan dihitung ulang hanya saat pose berubah, bukan tiap frame
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
}

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
/* faktor pelunakan per frame yang tidak bergantung frame rate */
export const easeK = (k, dt) => 1 - Math.pow(1 - k, (dt || 1 / 60) * 60);
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/* Orbit dua sumbu dengan kelembaman: seret/usap, tombol panah, Home untuk
   kembali. Usapan tegak dibiarkan menggulir halaman (touch-action di CSS). */
export function makeOrbit(canvas, o) {
  const elMin = o.elMin != null ? o.elMin : 0.2;
  const elMax = o.elMax != null ? o.elMax : 1.08;
  const s = { az: o.az, el: o.el, azV: 0, elV: 0, dragging: false, pointerId: null, lastX: 0, lastY: 0 };
  const wake = o.onChange || (() => {});

  canvas.addEventListener("pointerdown", (e) => {
    if (s.pointerId !== null) return;
    s.pointerId = e.pointerId;
    s.dragging = true;
    s.lastX = e.clientX; s.lastY = e.clientY;
    s.azV = s.elV = 0;
    canvas.classList.add("is-dragging");
    if (canvas.setPointerCapture) canvas.setPointerCapture(e.pointerId);
    wake();
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!s.dragging || e.pointerId !== s.pointerId) return;
    const dx = e.clientX - s.lastX, dy = e.clientY - s.lastY;
    s.lastX = e.clientX; s.lastY = e.clientY;
    s.az += dx * 0.008;
    s.el = clamp(s.el - dy * 0.0042, elMin, elMax);
    s.azV = dx * 0.0025; s.elV = -dy * 0.0011;
    wake();
  });
  const endDrag = (e) => {
    if (e && e.pointerId !== s.pointerId) return;
    s.dragging = false; s.pointerId = null;
    canvas.classList.remove("is-dragging");
    wake();
  };
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);
  canvas.addEventListener("lostpointercapture", endDrag);
  canvas.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") s.az -= 0.14;
    else if (e.key === "ArrowRight") s.az += 0.14;
    else if (e.key === "ArrowUp") s.el = clamp(s.el + 0.1, elMin, elMax);
    else if (e.key === "ArrowDown") s.el = clamp(s.el - 0.1, elMin, elMax);
    else if (e.key === "Home") { s.az = o.az; s.el = o.el; s.azV = s.elV = 0; }
    else return;
    e.preventDefault();
    wake();
  });

  return {
    state: s,
    /* satu langkah kelembaman; benar kalau masih bergerak. dt dalam detik
       supaya redamannya sama di 60 maupun 144 Hz. */
    step(dt) {
      if (s.dragging) return true;
      const k = Math.pow(0.92, (dt || 1 / 60) * 60);
      s.az += s.azV;
      s.el = clamp(s.el + s.elV, elMin, elMax);
      s.azV *= k; s.elV *= k;
      if (Math.abs(s.azV) < 1e-5) s.azV = 0;
      if (Math.abs(s.elV) < 1e-5) s.elV = 0;
      return s.azV !== 0 || s.elV !== 0;
    }
  };
}
