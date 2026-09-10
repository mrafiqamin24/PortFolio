"""Generate the STATIC rest-state of the isometric exploded view (sheet 3).

This markup is the no-JavaScript fallback and the first frame. `iso.js` holds
the same model and re-projects it live, writing into these very elements, so
the two must agree at rotation 0. Keep SOLIDS/CALLOUTS identical in both files.

Projection (rotation about the vertical axis by theta, then 30-degree drafting):
    rx, ry = rotate(x, y) about the model centre
    sx = (rx - ry) * cos30
    sy = (rx + ry) * 0.5 - z          (screen y grows downward)
"""
import math

C30 = math.cos(math.radians(30))
SCALE = 24.0
CX, CY = 6.0, 4.0

def proj(x, y, z, th=0.0):
    dx, dy = x - CX, y - CY
    ct, st = math.cos(th), math.sin(th)
    rx = dx * ct - dy * st + CX
    ry = dx * st + dy * ct + CY
    return ((rx - ry) * C30 * SCALE, ((rx + ry) * 0.5 - z) * SCALE)

# name, x0, x1, y0, y1, z0, z1, layer  (layer paints back-to-front)
SOLIDS = [
    ("tank",     0.0, 12.0, 0.0, 8.0, -3.40, -2.90, 0),
    ("rpool",    0.0, 12.0, 0.0, 8.0, -2.20, -1.70, 1),
    ("host",     0.0, 12.0, 0.0, 8.0, -0.50,  0.00, 2),
    ("vmbr1",    1.0,  9.6, 3.75, 4.15, 2.20, 2.35, 3),
    ("ct_web",   0.8,  4.2, 0.8, 3.2,  2.35,  3.80, 3),
    ("ct_redis", 5.6,  9.0, 0.8, 3.2,  2.35,  3.80, 3),
    ("ct_db",    2.6,  7.2, 4.8, 7.2,  2.35,  3.80, 3),
    ("cf",       0.4,  5.2, 0.8, 3.2,  6.00,  6.30, 4),
    ("ts",       6.4, 11.2, 0.8, 3.2,  6.00,  6.30, 4),
]
DIM = {n: (x0, x1, y0, y1, z0, z1) for n, x0, x1, y0, y1, z0, z1, _ in SOLIDS}

LAYERS = [
    ("TEPI", ["cf", "ts"]),
    ("CONTAINER", ["ct_web", "ct_redis", "ct_db", "vmbr1"]),
    ("HOST", ["host"]),
    ("PENYIMPANAN", ["rpool", "tank"]),
]

CALLOUTS = [
    ("cf",       "Cloudflare Tunnel", "situs & aplikasi ke publik"),
    ("ts",       "Tailscale · SSH · 2FA", "jalur admin, bukan port terbuka"),
    ("ct_web",   "CT 100 web", "nginx + cloudflared"),
    ("ct_redis", "CT 102 redis", "cache & antrean"),
    ("ct_db",    "CT 120 db · MySQL 8.4", "hanya mendengar di 10.10.10.120"),
    ("vmbr1",    "vmbr1 · 10.10.10.0/24", "bridge internal tanpa port fisik"),
    ("host",     "Proxmox VE 9.2", "Ryzen 9 9900X · 32 GB"),
    ("rpool",    "rpool · 2× NVMe 2 TB", "mirror, root & container"),
    ("tank",     "tank · 2× HDD 4 TB", "mirror, backup & data"),
]

# explosion arrows: from world point down to world point
DROPS = [
    (2.8, 2.0, 6.00, 4.00),
    (8.6, 2.0, 6.00, 4.00),
    (2.5, 2.0, 2.30, 0.14),
    (7.3, 2.0, 2.30, 0.14),
    (4.9, 6.0, 2.30, 0.14),
]

def corners(name):
    x0, x1, y0, y1, z0, z1 = DIM[name]
    return [(x, y, z) for x in (x0, x1) for y in (y0, y1) for z in (z0, z1)]

def silhouette(name, th=0.0):
    x0, x1, y0, y1, z0, z1 = DIM[name]
    p = lambda x, y, z: proj(x, y, z, th)
    hexa = [p(x0, y0, z1), p(x1, y0, z1), p(x1, y0, z0),
            p(x1, y1, z0), p(x0, y1, z0), p(x0, y1, z1)]
    near = p(x1, y1, z1)
    edges = [(near, p(x1, y0, z1)), (near, p(x0, y1, z1)), (near, p(x1, y1, z0))]
    return hexa, edges

def anchor(name, th=0.0):
    """Rightmost corner, upper one on a tie - the leader always leaves toward
    the label column. iso.js re-picks this every frame as the model turns."""
    best = None
    for (x, y, z) in corners(name):
        s = proj(x, y, z, th)
        if best is None or s[0] > best[0][0] + 1e-9 or (abs(s[0] - best[0][0]) < 1e-9 and s[1] < best[0][1]):
            best = (s, (x, y, z))
    return best[0]

# ------------------------------------------------------------ extents
# the footprint is near rotation-invariant; sample a full turn to be sure
pts = []
for th in [math.radians(a) for a in range(0, 360, 5)]:
    for name in DIM:
        pts.extend(silhouette(name, th)[0])
minx = min(p[0] for p in pts); maxx = max(p[0] for p in pts)
miny = min(p[1] for p in pts); maxy = max(p[1] for p in pts)

PAD_L, PAD_T, PAD_B = 112, 32, 28
LABEL_COL = 250
OX = PAD_L - minx
OY = PAD_T - miny
VW = int(PAD_L + (maxx - minx) + LABEL_COL)
VH = int(PAD_T + (maxy - miny) + PAD_B)
# narrow screens crop to the solids alone: no label column, no layer margin
NX, NY = PAD_L - 10, PAD_T - 10
NW, NH = int(maxx - minx) + 20, int(maxy - miny) + 20

T = lambda p: (p[0] + OX, p[1] + OY)
world = lambda x, y, z, th=0.0: T(proj(x, y, z, th))
f = lambda v: f"{v:.1f}"

out = []
add = out.append

add(f'            <svg class="iso-wide" viewBox="0 0 {VW} {VH}" data-vb-wide="0 0 {VW} {VH}" data-vb-narrow="{NX:.0f} {NY:.0f} {NW} {NH}" role="img" aria-labelledby="isoTitle" aria-describedby="isoHint" tabindex="0" xmlns="http://www.w3.org/2000/svg">')
add('              <title id="isoTitle">Model isometrik terurai server yang bisa diputar: lapisan tepi berisi Cloudflare Tunnel dan Tailscale di atas, lalu tiga container web, redis, dan database yang duduk di bridge internal vmbr1, lalu host Proxmox, dan paling bawah dua lapis penyimpanan cermin ZFS rpool dan tank.</title>')
add('              <g class="plan-ink plan-ink-white iso">')

a = world(6, 4, 7.2); b = world(6, 4, -4.2)
add(f'                <line class="axis" x1="{f(a[0])}" y1="{f(a[1])}" x2="{f(b[0])}" y2="{f(b[1])}" />')

add('                <g class="iso-stack">')
for name, x0, x1, y0, y1, z0, z1, layer in SOLIDS:
    hexa, edges = silhouette(name)
    d = "M" + " L".join(f"{f(T(p)[0])} {f(T(p)[1])}" for p in hexa) + " Z"
    add(f'                  <g class="iso-solid" data-solid="{name}">')
    add(f'                    <path class="face" d="{d}" />')
    for p1, p2 in edges:
        q1, q2 = T(p1), T(p2)
        add(f'                    <line class="thin" x1="{f(q1[0])}" y1="{f(q1[1])}" x2="{f(q2[0])}" y2="{f(q2[1])}" />')
    add('                  </g>')
add('                </g>')

for (x, y, zf, zt) in DROPS:
    p1 = world(x, y, zf); p2 = world(x, y, zt)
    add(f'                <g class="iso-drop" data-drop="{x},{y},{zf},{zt}">')
    add(f'                  <line x1="{f(p1[0])}" y1="{f(p1[1])}" x2="{f(p2[0])}" y2="{f(p2[1])}" />')
    add(f'                  <path class="fill" d="M{f(p2[0])} {f(p2[1])} l-3.6 -7.2 l7.2 0 Z" />')
    add('                </g>')

for caption, members in LAYERS:
    ys = [T(p)[1] for m in members for p in silhouette(m)[0]]
    cy = (min(ys) + max(ys)) / 2
    add(f'                <g class="iso-layer" data-layer="{",".join(members)}" data-cap="{len(caption)}">')
    add(f'                  <text class="plan-label" x="18" y="{f(cy + 4)}">{caption}</text>')
    add(f'                  <line class="thin" x1="18" y1="{f(cy + 12)}" x2="{f(18 + 7.2 * len(caption))}" y2="{f(cy + 12)}" />')
    add('                </g>')

LX = VW - LABEL_COL + 30
GAP = 40
rows = sorted(CALLOUTS, key=lambda c: anchor(c[0])[1])
placed, ly = [], PAD_T + 12
for name, l1, l2 in rows:
    ax, ay = T(anchor(name))
    ly = max(ly, ay - 6)
    placed.append((name, ax, ay, ly, l1, l2))
    ly += GAP
overflow = placed[-1][3] + 18 - (VH - PAD_B)
if overflow > 0:
    placed = [(n, ax, ay, y - overflow, l1, l2) for n, ax, ay, y, l1, l2 in placed]

for name, ax, ay, ly, l1, l2 in placed:
    knee = LX - 26
    add(f'                <g class="iso-callout" data-of="{name}" data-ly="{f(ly)}" data-knee="{f(knee)}" data-lx="{f(LX - 8)}">')
    add(f'                  <path class="leader" d="M{f(ax)} {f(ay)} L{f(knee)} {f(ly)} L{f(LX - 8)} {f(ly)}" />')
    add(f'                  <circle class="fill" cx="{f(ax)}" cy="{f(ay)}" r="2.6" />')
    add(f'                  <text class="b" x="{f(LX)}" y="{f(ly + 4)}">{l1}</text>')
    add(f'                  <text class="s" x="{f(LX)}" y="{f(ly + 20)}">{l2}</text>')
    add('                </g>')

add('              </g>')
add('            </svg>')

print("\n".join(out))
