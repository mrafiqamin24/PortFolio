# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Urutan prioritas ditetapkan pemilik 2026-09-15 ("posisikan diri sebagai HRD, tim rekrutmen, dan IT senior"):

- **HRD / tim rekrutmen perusahaan IT** (utama) — membuka link dari lamaran di laptop, menilai dalam 30 detik pertama apakah kandidat magang/junior ini layak dipanggil. Butuh: posisi yang jelas, bukti nyata bertanggal, CV, LinkedIn, kontak.
- **Engineer senior / tech lead** (utama) — memverifikasi: membuka tautan live, GitHub, membaca detail server. Butuh: kedalaman teknis, kualitas kode, kejujuran label (live vs demo statis vs kode privat).
- **Klien freelance UMKM** (pemilik toko, hotel, sekolah) — membuka dari WhatsApp di HP; tetap terlayani lewat tautan live dan tombol WhatsApp, tanpa bagian khusus.

## Product Purpose

Portofolio pribadi Muhammad Rafiq Amin, mahasiswa D3 Teknologi Informasi di Kalimantan Barat. Tujuan: mendapatkan pekerjaan (magang / junior / freelance) dan ajakan kolaborasi. Sukses = pengunjung menghubungi lewat WhatsApp atau email, atau membuka CV.

## Positioning

Gelar di halaman: **Full-Stack Web Developer · DevOps Engineer** (pemilik 2026-09-16: "ubah jadi DevOps aja"; menggantikan "Network & Server Engineer").

Satu orang yang membangun aplikasi bisnisnya (Laravel, Next.js, Flutter) **dan** menjalankannya di server yang ia rakit, isolasi, dan amankan sendiri (Proxmox, MikroTik, Cloudflare). Ujung ke ujung: PRD → API/UI → uji otomatis → deploy → backup. Portofolio developer pada umumnya hanya menunjukkan salah satu sisi.

## Operating Context

- Halaman statis (HTML/CSS/JS tanpa framework), di-host di GitHub Pages dan dipetakan ke `mra1.my.id` (sejak 2026-09-15; `portfolio.ownertech.id` dialihkan 301).
- Bahasa utama Indonesia; istilah teknis Inggris.
- Dibuka dari link WhatsApp/email; harus ringan: Beranda di bawah 400 KB termasuk font dan gambar (terukur 190 KB pada 2026-09-15). Halaman Rilis memuat 13 gambar yang dimuat malas (lazy), terukur 350 KB total; screenshot dikodekan 1024 px lebar, WebP q72.
- Pemilik meminta isi yang **singkat, elegan, profesional** (2026-09-15 pagi): satu kalimat isi dan satu baris hasil per project. **Dibalik pada hari yang sama** dengan kata-kata pemilik "coba lengkap tapi dipisah per page biar ga panjang": isi lengkap kembali, dipecah jadi lima halaman. Tabel Masalah/Solusi/Hasil dipakai di `rilis.html` untuk tujuh entri utama (Crypt-Man, Server produksi, MR Hotel, Ownertech, Secure Viewer, MI Al-Amin, Home.Net); entri lain memakai satu kalimat isi dan satu baris hasil. Beranda tetap ringkas.
- Pemilik memperbarui sendiri lewat editor teks; tidak ada build step.

## Capabilities and Constraints

- Konten yang harus ada: posisi, daftar project bertanggal (isi, hasil, status, tautan), server & jaringan, keahlian dengan bukti, cara kerja, kontak, tautan CV (`cv.html`).
- Tanggal project diambil dari commit pertama tiap repo (lokal `C:/Users/mrafi/Projects`, publik di GitHub), diverifikasi 2026-09-15: Herbify Nov 2025, SIPPDAM Jan 2026, MikroTik-Login Mar 2026, Ownertech 9 Jun 2026, MI Al-Amin 16 Jun, Secure-Viewer 18 Jun, Restotech dan PlatformHQ 5 Jul, Homtech 30 Jul, handportal 9 Agu, Absensi GPS 20 Agu, MR Hotel 22 Agu–3 Sep, Amin Cloud 1–9 Sep, Catat Fiq 7–8 Sep, Crypt-Man live 13 Sep 2026.
- Label kejujuran wajib pada tiap project: **Live**, **Demo statis**, **Kode privat**.
- Tidak boleh ada placeholder, "coming soon", atau link kosong.
- Nama kampus dan tahun lulus **belum diberikan** — jangan dikarang. Tulis "D3 Teknologi Informasi" dan "Kalimantan Barat" saja. LinkedIn diberikan 2026-09-15: https://www.linkedin.com/in/muhammad-rafiq-amin-2524b4437.
- Angka yang boleh dipakai (terverifikasi 2026-09-10 lewat `git rev-list --count HEAD`, hitung berkas uji, dan README tiap repo lokal): 8+ produk; 980+ commit di 7 repo; 692 tes lolos (Crypt-Man: 610 unit/integrasi + 82 E2E; README mencatat Lighthouse 94–95/100/100); 1 server produksi; MR Hotel ±9.900 baris, 105 commit; Ownertech 300 commit, 122 berkas uji; Restotech 120 commit; Homtech 222 commit; PlatformHQ 113 commit; Amin Cloud 126 commit, 146 berkas uji; Crypt-Man 42 commit; Absensi GPS 15 commit, 4 suite uji (verify-local, verify-rules, verify-theme, verify-sheet-formulas); Catat Fiq 10 commit; handportal 28 commit. Hitungan commit dihitung ulang 2026-09-15 dengan `git rev-list --count HEAD` di tiap repo lokal; halaman dan CV harus memakai angka ini.
- Nama klien yang boleh disebut karena tercantum di repo pemilik sendiri: **Toko Berkah Jaya** (project `Absensi_GPS_Toko_Berkah_Jaya`), **MI Al-Amin Tumbang Titi**, **MR Hotel**. Tidak ada klien lain.
- Kontak: WhatsApp +62 821-5240-0352, email rafiqamin085252@gmail.com, LinkedIn muhammad-rafiq-amin-2524b4437, GitHub @mrafiqamin24, Instagram @m_rafiq_amin.

## Brand Commitments

- Pemilik meminta ikon/logo teknologi seperti di profil GitHub-nya (2026-09-16): dipakai sprite `img/tech.svg` yang di-host sendiri (devicon + simpleicons, asal-usul di sidecar), di halaman Keahlian dan ringkasan keahlian Beranda.

Pemilik menyatakan **tidak ada** elemen visual lama yang wajib dipertahankan. Dunia "lembar gambar teknik" (Rev A–C, Sep 2026) dicabut 2026-09-15 karena terasa seperti "anak teknik arsitek"; model 3D Three.js ikut dicabut agar halaman ringan. Aset foto: `img/avatar.webp` (potongan kepala-bahu dari foto studio di `_archive/img/profile-studio.webp`).

## Evidence on Hand

- Screenshot project: `img/projects/{crypt-man,mr-hotel,ownertech,secure-viewer,home-net,mi-al-amin}.webp`.
- Live (diverifikasi 200 pada 2026-09-15): https://crypt.amincloud.id (Crypt-Man, di server sendiri sejak 13 Sep 2026), https://hotel.ownertech.id, https://ownertech.id, https://mrafiqamin24.github.io/MI-Al-Amin/, SIPPDAM dan Herbify di GitHub Pages.
- Demo statis: Secure-Viewer, MikroTik-Login di GitHub Pages. **App-POS sudah 404** (2026-09-15), jangan ditautkan.
- Repo publik tanpa demo: handportal (kamera gestur, Python). Pemilik meminta gambarnya **ilustrasi, bukan foto asli** (2026-09-15): SVG inline kerangka 21 titik tangan, diberi keterangan "Ilustrasi, bukan tangkapan layar".
- Kode privat (lokal, tidak di GitHub): Restotech.id, Homtech.id, Amin Cloud, PlatformHQ, Absensi GPS, Catat Fiq, Ownertech.id.
- Tidak ada testimoni klien, tidak ada sertifikasi (mis. MTCNA) — jangan dikarang.
- Fakta yang dikoreksi 2026-09-15: server punya SATU port masuk ke internet, UDP 51820 (WireGuard hub untuk router cabang) — jadi jangan tulis "tidak ada port terbuka"; tulis "tidak ada port web atau database yang dibuka". Hotspot RT/RW MikroTik sudah TIDAK berjalan sejak 2026-09-14 — pakai bentuk lampau.

## Product Principles

1. Bukti sebelum klaim: setiap keahlian menunjuk ke project yang membuktikannya.
2. Jujur pada status: live, demo, atau privat ditulis terang.
3. Dua sisi dalam satu orang: aplikasi dan server selalu tampil berdampingan.
4. Cepat dinilai: HRD tahu posisi, bukti, dan kontak dalam satu layar.
5. Ringan dan bisa dirawat sendiri tanpa build step.
