"""Tangkap ulang gambar diam sampul (img/server-rig.webp) dari render WebGL-nya.

Jalankan setiap kali server-rig.js, palet, atau sudut kamera sampul berubah,
supaya frame pertama kanvas tetap jatuh persis di atas gambar diamnya.

Butuh: agent-browser (CLI), Pillow, dan situs disajikan lokal, mis.
    python -m http.server 8123
    python tools/snap_cover.py http://127.0.0.1:8123
"""
import base64
import io
import json
import os
import subprocess
import sys
import time
import datetime

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8123"

def ab(*args):
    cmd = subprocess.list2cmdline(["agent-browser", "--session", "snapcover", *args])
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=120)
    return (r.stdout or "") + (r.stderr or "")

# salinan sementara index.html dengan mode tangkap: pose diam, buffer disimpan
src = io.open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
tmp = os.path.join(ROOT, "index.snap.html")
io.open(tmp, "w", encoding="utf-8", newline="\n").write(
    src.replace('<div class="cover-stage">', '<div class="cover-stage" data-snap="1">', 1))
try:
    ab("set", "viewport", "2880", "1800")          # panggung sekitar 1270 px pada DPR 1
    ab("open", BASE + "/index.snap.html")
    time.sleep(8)
    raw = ab("eval", 'document.querySelector(".cover-canvas").toDataURL("image/png")').strip().strip('"')
    ab("close")
finally:
    os.remove(tmp)

i = raw.find("base64,")
if i < 0:
    sys.exit("kanvas tidak terbaca: " + raw[:200])
im = Image.open(io.BytesIO(base64.b64decode(raw[i + 7:]))).convert("RGBA")
if im.size != (1200, 1200):
    im = im.resize((1200, 1200), Image.LANCZOS)
out = os.path.join(ROOT, "img", "server-rig.webp")
im.save(out, "WEBP", quality=88, method=6)
side = {
    "prompt": ("Origin: this site's own WebGL render (cover3d.js + server-rig.js, Three.js r180) of the owner's "
               "production server, captured with tools/snap_cover.py via canvas.toDataURL in headless Chromium, "
               "resized to 1200x1200 and saved as WebP quality 88 with alpha using Pillow. Serves as the no-WebGL "
               "fallback, the first frame, and the print image."),
    "createdAt": datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z"),
}
io.open(out + ".json", "w", encoding="utf-8", newline="\n").write(json.dumps(side, indent=2) + "\n")
print("ditulis", out, os.path.getsize(out), "byte")
