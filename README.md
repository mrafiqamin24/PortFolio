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
| `img/` | Aset yang dipakai halaman (WebP, total di bawah 400 KB) |
| `PRODUCT.md` | Fakta produk untuk pekerjaan desain berikutnya |

## Mengubah isi

- Project: salin satu blok `<article class="detail">` di `index.html`, ganti gambar (`img/projects/`, 1280 px lebar, WebP), teks, dan label status (`stamp-live`, `stamp-demo`, `stamp-private`).
- Angka di lembar 1 (kuantitas, revisi) dan di title block (`Rev`, tanggal) diperbarui manual.
- CV di `cv.html` berdiri sendiri; ubah teks langsung.

## Menjalankan lokal

```powershell
python -m http.server 4173
```

Lalu buka `http://localhost:4173`.
