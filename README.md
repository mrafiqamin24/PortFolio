# Portofolio — Muhammad Rafiq Amin

Halaman portofolio statis: HTML, CSS, dan JavaScript tanpa framework dan tanpa build step.
Live di https://portfolio.ownertech.id (GitHub Pages).

## Isi

| Berkas | Fungsi |
|---|---|
| `index.html` | Enam "lembar gambar teknik": umum, detail project, server, keahlian, prosedur, kontak |
| `cv.html` | CV versi cetak (Ctrl+P → simpan sebagai PDF) |
| `style.css` | Seluruh gaya; token warna dan garis ada di `:root` |
| `script.js` | Penanda lembar aktif di daftar gambar dan tahun di kolofon |
| `iso.js` | Model isometrik lembar 3: proyeksi 3D tiap frame, putar lewat gulir, seret, usap, atau tombol panah |
| `iso3d.js` | Versi WebGL model itu (Three.js): orbit dua sumbu, animasi rakit-urai saat digulir. Dimuat hanya saat lembar 3 mendekat; kalau gagal, `iso.js` tetap dipakai |
| `vendor/` | Three.js r180 di-host sendiri (module + core), bukan dari CDN |
| `img/` | Aset yang dipakai halaman (WebP, total di bawah 400 KB) |
| `PRODUCT.md` | Fakta produk untuk pekerjaan desain berikutnya |

## Mengubah isi

- Project: salin satu blok `<article class="detail">` di `index.html`, ganti gambar (`img/projects/`, 1280 px lebar, WebP), teks, dan label status (`stamp-live`, `stamp-demo`, `stamp-private`).
- Angka di lembar 1 (kuantitas, revisi) dan di title block (`Rev`, tanggal) diperbarui manual.
- CV di `cv.html` berdiri sendiri; ubah teks langsung.

## Penting saat deploy: naikkan penanda versi

Live disajikan lewat Cloudflare, yang menyimpan HTML **10 menit** tapi CSS dan JS
**4 jam**. Tanpa penanda versi, pengunjung lama akan mendapat HTML baru dengan CSS
lama, dan halaman tampil rusak sampai empat jam. Gejalanya persis: label melayang
terpisah dari gambar, teks yang harusnya tersembunyi ikut tampil, dan model 3D tidak
bisa diputar di HP karena `touch-action` belum ada.

Jadi **setiap kali mengubah `style.css`, `script.js`, `iso.js`, atau `iso3d.js`,
ganti semua `?v=...` di `index.html` dengan nilai baru** (pakai tanggal, mis.
`?v=20260911a`). URL yang berbeda memaksa unduh ulang, jadi tidak perlu menunggu
cache habis.

Berkas yang isinya tidak pernah berubah tidak perlu penanda: `fonts/`, `vendor/`
(Three.js dikunci versinya), dan `img/`.

## Menjalankan lokal

```powershell
python -m http.server 4173
```

Lalu buka `http://localhost:4173`.

## Lembar sampul dan render (Rev C, 10 Sep 2026)

Viewport pertama adalah lembar sampul: nama sebagai judul gambar, render
**server produksi yang sungguhan** (tower ATX bersisi kaca yang dirakit
pemilik) di kanan, daftar lembar di bawah. Render memakai bahasa "shaded with
edges" ala CAD: material disinari studio, bayangan kontak di kertas, rusuk
tipis di atasnya. Lembar 3 memakai bahasa yang sama untuk model arsitektur
terurai (tepi, container, host, penyimpanan) di atas cetak biru.

| Berkas | Isi |
|---|---|
| `server-model.js` | Helper bersama: geometri bevel, studio env (PMREM), cahaya + bayangan VSM (dihitung ulang hanya saat pose berubah), orbit; plus model arsitektur (SOLIDS, palet `paper` / `cyan`) untuk lembar 3 |
| `server-rig.js` | Model fisik tower untuk sampul: panel casing, tray, motherboard, pendingin menara + kipas, 2 RAM, 2 NVMe, 2 HDD, shroud PSU, kipas belakang, kaca; tiap bagian punya pergeseran terurai |
| `cover3d.js` | Sampul: perspektif, momen pembuka dua fase (membuka lalu merapat dengan pegas Motion), goyangan pelan, menoleh ke kursor, membuka saat digulir, pemulihan saat konteks WebGL hilang |
| `iso3d.js` | Lembar 3: ortografis, rakit-urai saat digulir, balon di semua lebar, daftar bernomor (SVG di desktop, `<ol>` di HP), dimuat lebih awal begitu sampul siap |
| `img/server-rig.webp` | Gambar diam sampul: render yang sama, ditangkap `tools/snap_cover.py`. Frame pertama, cadangan tanpa WebGL, dan gambar cetak |
| `vendor/three-r180/` | Three.js r180, dua berkas (`three.module` mengimpor `./three.core`). Folder berversi supaya keduanya tidak pernah beda versi di cache |
| `vendor/motion-13.2.0/` | Motion 13.2 (penerus Framer Motion), UMD global `Motion`; pegas 3D dan koreografi teks sampul |

Rantai cadangan: gambar diam WebP (tanpa JS/WebGL) → kanvas WebGL; lembar 3:
SVG statis → `iso.js` (SVG hidup) → WebGL. Konteks WebGL yang hilang
mengembalikan gambar diam / SVG, bukan kotak kosong. Cetak memakai gambar diam.
Tanpa Motion, teks sampul langsung tampil (pintu darurat `js-late` 2,6 detik
dipasang inline di `<head>`) dan pegas diganti integrator kecil.

Modul membaca `?v=` dari `import.meta.url` dan meneruskannya ke
`server-model.js` / `server-rig.js`, jadi cukup naikkan penanda di
`index.html` (termasuk `og:image` dan `img/server-rig.webp`) dan tautan balik
di `cv.html`. Pustaka di `vendor/` berversi lewat nama folder: ganti folder,
bukan isinya, saat memperbarui.
