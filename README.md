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

## Model 3D lembar 3 (Rev C, 10 Sep 2026)

Lembar 3 memakai render "shaded with edges" ala CAD di atas cetak biru:
material disinari studio, bayangan kontak, rusuk tipis; balon bernomor di
semua lebar dan daftar keterangan (`<ol>`) di HP. Lembar sampul dengan render
server fisik pernah ada dan dicabut atas permintaan pemilik pada hari yang
sama; halaman pertama kembali ke lembar profil.

| Berkas | Isi |
|---|---|
| `server-model.js` | Model arsitektur (SOLIDS, palet), geometri bevel, studio env (PMREM), cahaya + bayangan VSM (dihitung ulang hanya saat pose berubah), orbit |
| `iso3d.js` | Lembar 3: ortografis, rakit-urai saat digulir, balon + daftar bernomor, pemulihan saat konteks WebGL hilang, dimuat saat lembar mendekat |
| `iso.js` | Model SVG hidup, cadangan tanpa WebGL |
| `vendor/three-r180/` | Three.js r180, dua berkas (`three.module` mengimpor `./three.core`); folder berversi supaya keduanya tidak pernah beda versi di cache |

Modul membaca `?v=` dari `import.meta.url` dan meneruskannya ke
`server-model.js`, jadi cukup naikkan penanda di `index.html` (termasuk
`og:image`) dan tautan balik di `cv.html`. Pustaka di `vendor/` berversi lewat
nama folder: ganti folder, bukan isinya, saat memperbarui.
