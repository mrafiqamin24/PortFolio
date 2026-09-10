# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, confirmed equally important by the owner (2026-09-10):

- **HRD / rekruter perusahaan IT** — membuka link dari lamaran di laptop, menilai dalam 30 detik pertama apakah kandidat magang/junior ini layak dipanggil. Butuh: posisi yang jelas, bukti nyata, CV, kontak.
- **Klien freelance UMKM** (pemilik toko, hotel, sekolah) — membuka dari WhatsApp di HP. Butuh: produk yang sudah jalan, bisa dicoba, dan cara menghubungi.
- **Tech lead / tim engineering** — membuka di monitor lebar, melompat ke project, GitHub, dan detail infrastruktur. Butuh: cara kerja, kualitas kode, kedalaman teknis, kejujuran label (live vs demo statis vs kode privat).

## Product Purpose

Portofolio pribadi Muhammad Rafiq Amin, mahasiswa D3 Teknologi Informasi di Kalimantan Barat. Tujuan: mendapatkan pekerjaan (magang / junior / freelance) dan ajakan kolaborasi. Sukses = pengunjung menghubungi lewat WhatsApp atau email, atau membuka CV.

## Positioning

Satu orang yang membangun aplikasi bisnisnya (Laravel, Next.js, Flutter) **dan** menjalankannya di server yang ia rakit, isolasi, dan amankan sendiri (Proxmox, MikroTik, Cloudflare). Ujung ke ujung: PRD → API/UI → uji otomatis → deploy → backup. Portofolio developer pada umumnya hanya menunjukkan salah satu sisi.

## Operating Context

- Halaman statis (HTML/CSS/JS tanpa framework), di-host di GitHub Pages dan dipetakan ke `portfolio.ownertech.id`.
- Bahasa utama Indonesia; istilah teknis Inggris.
- Dibuka dari link WhatsApp/email; harus ringan (aset saat ini 348 KB total).
- Pemilik memperbarui sendiri lewat editor teks; tidak ada build step.

## Capabilities and Constraints

- Konten yang harus ada: hero/posisi, tentang, studi kasus project (masalah / yang dibangun / hasil), server & jaringan, keahlian dengan bukti, cara kerja, kontak, tautan CV (`cv.html`).
- Label kejujuran wajib pada tiap project: **Live**, **Demo statis**, **Kode privat**.
- Tidak boleh ada placeholder, "coming soon", atau link kosong.
- Nama kampus, tahun lulus, dan LinkedIn **belum diberikan** — jangan dikarang. Tulis "D3 Teknologi Informasi" dan "Kalimantan Barat" saja.
- Angka yang boleh dipakai (terverifikasi 2026-09-10 lewat `git rev-list --count HEAD`, hitung berkas uji, dan README tiap repo lokal): 8+ produk; 980+ commit di 7 repo; 692 tes lolos (Crypt-Man: 610 unit/integrasi + 82 E2E; README mencatat Lighthouse 94–95/100/100); 1 server produksi; MR Hotel ±9.900 baris, 105 commit; Ownertech 300 commit, 122 berkas uji; Restotech 120 commit; Homtech 220 commit; PlatformHQ 84 commit; Amin Cloud 126 commit, 146 berkas uji; Absensi GPS 4 suite uji (verify-local, verify-rules, verify-theme, verify-sheet-formulas).
- Nama klien yang boleh disebut karena tercantum di repo pemilik sendiri: **Toko Berkah Jaya** (project `Absensi_GPS_Toko_Berkah_Jaya`), **MI Al-Amin Tumbang Titi**, **MR Hotel**. Tidak ada klien lain.
- Kontak: WhatsApp +62 821-5240-0352, email rafiqamin085252@gmail.com, GitHub @mrafiqamin24, Instagram @m_rafiq_amin.

## Brand Commitments

Pemilik menyatakan **tidak ada** elemen visual lama yang wajib dipertahankan (foto, logo, warna, font boleh diganti). Aset yang tersedia dan boleh dipakai: foto cutout transparan (`img/profile-cutout.webp`), foto studio (`img/profile-studio.webp`), logo "RA" (`img/logo.webp`, opsional).

## Evidence on Hand

- Screenshot project: `img/projects/{mr-hotel,ownertech,secure-viewer,home-net,mi-al-amin}.webp`.
- Live: https://hotel.ownertech.id, https://ownertech.id, https://mrafiqamin24.github.io/MI-Al-Amin/.
- Demo statis: App-POS, Secure-Viewer, MikroTik-Login di GitHub Pages.
- Kode privat (lokal, tidak di GitHub): Restotech.id, Homtech.id, Amin Cloud, Crypt-Man, PlatformHQ, Absensi GPS, Catat Fiq, Foto-Kita-Blurrr.
- Tidak ada testimoni klien, tidak ada sertifikasi (mis. MTCNA) — jangan dikarang.

## Product Principles

1. Bukti sebelum klaim: setiap keahlian menunjuk ke project yang membuktikannya.
2. Jujur pada status: live, demo, atau privat ditulis terang.
3. Dua sisi dalam satu orang: aplikasi dan server selalu tampil berdampingan.
4. Cepat dinilai: HRD tahu posisi, bukti, dan kontak dalam satu layar.
5. Ringan dan bisa dirawat sendiri tanpa build step.
