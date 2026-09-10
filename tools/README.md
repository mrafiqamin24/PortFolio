# tools

Skrip bantu, dijalankan dengan `python`.

| Skrip | Keluaran | Kapan |
|---|---|---|
| `snap_cover.py` | `img/server-rig.webp` + sidecar asal-usul: gambar diam sampul dari render WebGL-nya | Tiap kali `server-rig.js`, palet, atau sudut kamera di `cover3d.js` berubah. Butuh `agent-browser`, Pillow, dan situs disajikan lokal (`python -m http.server 8123`) |
| `iso.py` | SVG isometrik hidden-line lembar 3 (keadaan istirahat), tempel ke `figure.plan` di `index.html` | Tiap kali SOLIDS di `iso.js` berubah; SOLIDS di keduanya harus sama supaya frame pertama JS jatuh persis di atas gambar statis |
