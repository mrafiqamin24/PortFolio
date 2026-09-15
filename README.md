# Portofolio — Muhammad Rafiq Amin

Halaman portofolio statis: HTML, CSS, dan JavaScript tanpa framework dan tanpa build step.
Live di https://mra1.my.id (GitHub Pages di belakang Cloudflare). Alamat lama
`portfolio.ownertech.id` dialihkan 301 ke alamat baru.

## Bentuk halaman

Situs disusun seperti **changelog produk** dan dipecah jadi lima halaman pendek yang
memakai satu stylesheet dan satu skrip:

| Berkas | Fungsi |
|---|---|
| `index.html` | Beranda: nama, peran, satu kalimat, aksi; tiga rilis terbaru; ringkasan keahlian; kontak |
| `rilis.html` | Semua 16 rilis urut dari terbaru dengan rel tanggal, chip saringan status, dan per project: Masalah / Solusi / Hasil, stack, tautan, screenshot |
| `server.html` | Server produksi: diagram, spesifikasi, yang sudah diverifikasi, tiga pelajaran |
| `keahlian.html` | Tabel keahlian dengan kolom "Dipakai di" yang menunjuk ke rilis, plus cara kerja |
| `kontak.html` | Semua kontak dan tautan CV |
| `cv.html` | CV versi cetak (Ctrl+P → simpan sebagai PDF) |
| `style.css` | Seluruh gaya; token warna dan huruf ada di `:root` |
| `script.js` | Tahun di kolofon, chip saringan status, kemunculan entri saat digulir |
| `fonts/mona-sans.woff2` | Satu berkas huruf variabel (Mona Sans, OFL), di-host sendiri |
| `img/` | Avatar, screenshot project (WebP), gambar OG, dan `tech.svg` (sprite logo teknologi dari devicon + simpleicons, dibuat `build_icons.py`); tiap berkas punya sidecar `.json` asal-usul |
| `PRODUCT.md`, `DESIGN.md` | Fakta produk dan sistem desain untuk pekerjaan berikutnya |

## Mengubah isi

- Rilis baru: salin satu blok `<article class="release">` di `rilis.html` ke bulan yang
  sesuai (atau buat `<div class="month">` baru), isi `data-status` dengan `live`, `demo`,
  `private`, atau `public`, dan pakai label status yang sama di dalam `<h2>`. Kalau masuk
  tiga terbaru, perbarui juga blok di `index.html` (di sana judulnya `<h3>`).
- Navigasi atas (`header.topbar`) ada di tiap berkas HTML dengan markup yang sama; tandai halaman aktif dengan
  `aria-current="page"` (garis bawah tinta). Di bawah 900 px menu lipat lewat tombol hamburger; tanpa JS menu
  selalu terbuka. Bar jadi tembus pandang saat halaman digulir.
- Screenshot: `img/projects/`, lebar 1280 px, WebP, plus sidecar `.json` yang mencatat asalnya.
  Aplikasi privat dipotret dari aplikasi yang dijalankan lokal (Restotech, PlatformHQ, Amin
  Cloud, dan klien desktop Ownertech yang tersambung ke API lokalnya) atau dari screenshot dogfood di
  repo-nya (Homtech); Catat Fiq dari build Windows sementara; handportal memakai ilustrasi SVG inline atas
  permintaan pemilik, bukan foto.
- Keahlian dan kontak diedit langsung; CV di `cv.html` berdiri sendiri.
- Tautan yang mati harus dihapus, bukan dibiarkan (demo App-POS dihapus 2026-09-15 karena 404).

## Penting saat deploy: naikkan penanda versi

Cloudflare menyimpan HTML **10 menit** tapi CSS dan JS **4 jam**. Tanpa penanda versi,
pengunjung lama mendapat HTML baru dengan CSS lama dan halaman tampil rusak sampai empat jam.

**Setiap kali mengubah `style.css` atau `script.js`, ganti semua `?v=...` di kelima berkas HTML
(termasuk `og:image`) dan tautan balik di `cv.html` dengan nilai baru**, misalnya
`?v=20260916a`. Berkas yang tidak pernah berubah (`fonts/`, `img/`) tidak perlu penanda.

## Menjalankan lokal

```powershell
python -m http.server 4173
```

Lalu buka `http://localhost:4173`.
