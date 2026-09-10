/* Model fisik server produksi untuk lembar sampul: tower ATX dengan sisi
 * kaca, seperti mesin yang benar-benar dirakit pemilik (Ryzen 9 9900X, 32 GB,
 * dua NVMe 2 TB sebagai mirror rpool, dua HDD 4 TB sebagai mirror tank).
 *
 * Satuan model kira-kira 5 cm: casing 4.2 x 9 x 9 (210 x 450 x 450 mm).
 * Yang tidak diketahui (merek casing, PSU, kipas) digambar generik dan tidak
 * diberi label. Tiap bagian punya pergeseran "terurai" supaya sampul bisa
 * merakit dirinya dari bagian-bagian yang terpisah.
 */

export const RIG_CENTER = [2.1, 4.4, 4.5];

/* name, x0, x1, y0, y1, z0, z1, bahan, geser saat terurai [dx, dy, dz]
   x: lebar (sisi kaca di x=0), y: tinggi, z: kedalaman (depan di z=0). */
export const PARTS = [
  ["base",    0.00, 4.20,  0.00, 0.18,  0.00, 9.00, "case",   [0, -0.6, 0]],
  ["top",     0.00, 4.20,  8.82, 9.00,  0.00, 9.00, "case",   [0, 1.2, 0]],
  ["rear",    0.00, 4.20,  0.18, 8.82,  8.82, 9.00, "case",   [0, 0, 1.0]],
  ["front",   0.00, 4.20,  0.18, 8.82,  0.00, 0.18, "case",   [0, 0, -1.2]],
  ["tray",    4.02, 4.20,  0.18, 8.82,  0.18, 8.82, "case",   [0.35, 0, 0]],
  ["shroud",  0.20, 4.02,  0.18, 1.70,  4.60, 8.82, "case2",  [-1.1, 0, 0]],
  ["hdd_a",   1.00, 3.00,  0.32, 0.84,  0.80, 3.70, "hdd",    [-1.5, 0, 0]],
  ["hdd_b",   1.00, 3.00,  1.08, 1.60,  0.80, 3.70, "hdd",    [-1.5, 0, 0]],
  ["mobo",    3.86, 4.02,  2.00, 8.10,  1.50, 7.60, "pcb",    [-0.5, 0, 0]],
  ["cooler",  0.90, 3.86,  4.20, 6.60,  4.40, 5.40, "fin",    [-1.6, 0, 0]],
  ["ram_a",   3.16, 3.86,  3.60, 6.30,  2.70, 2.82, "ram",    [-1.0, 0, 0]],
  ["ram_b",   3.16, 3.86,  3.60, 6.30,  3.00, 3.12, "ram",    [-1.0, 0, 0]],
  ["nvme_a",  3.70, 3.86,  2.30, 3.90,  5.90, 6.34, "sink",   [-0.8, 0, 0]],
  ["nvme_b",  3.70, 3.86,  2.30, 3.90,  4.90, 5.34, "sink",   [-0.8, 0, 0]],
  ["led",     1.90, 2.30,  8.30, 8.42, -0.04, 0.00, "accent", [0, 0, -1.2]],
  ["foot_fl", 0.30, 0.90, -0.22, 0.00,  0.60, 1.40, "case2",  [0, -0.6, 0]],
  ["foot_fr", 3.30, 3.90, -0.22, 0.00,  0.60, 1.40, "case2",  [0, -0.6, 0]],
  ["foot_bl", 0.30, 0.90, -0.22, 0.00,  7.60, 8.40, "case2",  [0, -0.6, 0]],
  ["foot_br", 3.30, 3.90, -0.22, 0.00,  7.60, 8.40, "case2",  [0, -0.6, 0]],
  ["glass",  -0.06, 0.00,  0.25, 8.75,  0.25, 8.75, "glass",  [-2.8, 0, 0]]
];

/* name, pusat x y z, jari-jari, tebal, geser saat terurai; sumbu kipas sejajar z */
export const FANS = [
  ["fan_cpu",  2.4, 5.4, 4.05, 1.15, 0.5, [-1.6, 0, 0]],
  ["fan_rear", 2.1, 6.9, 8.52, 1.15, 0.5, [0, 0, 1.0]]
];

export const RIG_MATS = {
  case:   { color: 0x333338, roughness: 0.50, metalness: 0.35 },
  case2:  { color: 0x2a2a2e, roughness: 0.55, metalness: 0.30 },
  hdd:    { color: 0x5a5b5f, roughness: 0.40, metalness: 0.60 },
  pcb:    { color: 0x16242c, roughness: 0.65, metalness: 0.10 },
  ram:    { color: 0x9a9ca1, roughness: 0.40, metalness: 0.65 },
  sink:   { color: 0x8f9194, roughness: 0.40, metalness: 0.70 },
  fin:    { color: 0xcbcbc6, roughness: 0.35, metalness: 0.85 },
  fan:    { color: 0x1a1a1c, roughness: 0.70, metalness: 0.10 },
  accent: { color: 0x0b57d0, emissive: 0x0b57d0, emissiveIntensity: 1.4, roughness: 0.40, metalness: 0.10 },
  glass:  { color: 0x9db4c9, roughness: 0.06, metalness: 0.00, transparent: true, opacity: 0.16, depthWrite: false }
};

/* Kipas: cincin, hub, dan tujuh bilah miring. Cukup untuk terbaca sebagai
   kipas dari jarak sampul, murah untuk digambar. */
function makeFan(THREE, r, t, mat) {
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.07, 10, 48), mat);
  g.add(ring);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.36, r * 0.36, t, 28), mat);
  hub.rotation.x = Math.PI / 2;
  g.add(hub);
  const blade = new THREE.BoxGeometry(r * 0.72, r * 0.34, 0.05);
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2;
    const b = new THREE.Mesh(blade, mat);
    b.position.set(Math.cos(a) * r * 0.62, Math.sin(a) * r * 0.62, 0);
    b.rotation.z = a;
    b.rotateX(0.6);
    g.add(b);
  }
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return g;
}

/* Membangun tower. slab(THREE, w, h, d) adalah geometri balok bertepi bulat
   dari server-model.js; edgeMat garis rusuknya. */
export function buildRig(THREE, slab, edgeMat, envIntensity) {
  const group = new THREE.Group();
  const mats = {};
  for (const k in RIG_MATS) {
    mats[k] = new THREE.MeshStandardMaterial({ ...RIG_MATS[k], envMapIntensity: envIntensity });
  }
  mats.glass.envMapIntensity = envIntensity * 1.6;
  const [ox, oy, oz] = RIG_CENTER;
  const parts = {};

  for (const [name, x0, x1, y0, y1, z0, z1, kind, ex] of PARTS) {
    const w = x1 - x0, h = y1 - y0, d = z1 - z0;
    const holder = new THREE.Group();
    const base = [(x0 + x1) / 2 - ox, (y0 + y1) / 2 - oy, (z0 + z1) / 2 - oz];
    holder.position.set(base[0], base[1], base[2]);
    const mesh = new THREE.Mesh(slab(THREE, w, h, d), mats[kind]);
    const solid = kind !== "glass";
    mesh.castShadow = solid;
    mesh.receiveShadow = solid;
    if (!solid) mesh.renderOrder = 10;
    holder.add(mesh);
    const lines = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), edgeMat);
    if (!solid) lines.renderOrder = 11;
    holder.add(lines);
    group.add(holder);
    parts[name] = { holder, base, ex, bottom: y0 - oy, half: [w / 2, h / 2, d / 2] };
  }

  for (const [name, cx, cy, cz, r, t, ex] of FANS) {
    const holder = makeFan(THREE, r, t, mats.fan);
    const base = [cx - ox, cy - oy, cz - oz];
    holder.position.set(base[0], base[1], base[2]);
    group.add(holder);
    parts[name] = { holder, base, ex, bottom: cy - r - oy, half: [r, r, t / 2] };
  }

  return { group, parts, mats };
}

/* Meletakkan tiap bagian di antara terpasang (0) dan terurai (1); mengembalikan
   dasar terendah supaya lantai bayangan bisa mengikutinya. */
export function poseRig(parts, t) {
  let floor = Infinity;
  for (const name in parts) {
    const p = parts[name];
    p.holder.position.set(p.base[0] + p.ex[0] * t, p.base[1] + p.ex[1] * t, p.base[2] + p.ex[2] * t);
    const b = p.bottom + p.ex[1] * t;
    if (b < floor) floor = b;
  }
  return floor;
}
