# PRD — Website Toko Reseller Produk Digital

**Status:** Draft untuk validasi  
**Tanggal:** 23 Oktober 2026  
**Workspace:** `C:\Projects\waroengkuy-reseller`

## 1. Ringkasan

Bangun website toko online milik satu reseller untuk menampilkan dan menjual produk digital yang pengadaannya bersumber dari Waroengkuy melalui program reseller resmi. Pembeli dapat mencari produk, memahami variasi dan ketentuannya, memesan, membayar melalui metode yang tersedia, lalu menerima produk atau petunjuk pemenuhan pesanan melalui halaman pesanan dan kanal kontak yang disetujui.

Website memakai nama, domain, identitas visual, dan konten toko milik pengguna sendiri. Waroengkuy menjadi referensi model bisnis dan kemungkinan penyedia stok/API, bukan identitas yang ditiru.

Halaman publik Waroengkuy saat ini menggambarkan program reseller yang mencakup harga reseller, pengaturan harga jual toko, toko beridentitas sendiri, pembayaran QRIS, notifikasi, dan API untuk cek stok serta membuat pesanan. Akses dan ketentuan tertentu bergantung pada persetujuan reseller. Detail tersebut harus dikonfirmasi langsung dengan vendor sebelum fitur terkait dijanjikan atau diimplementasikan. Referensi: [halaman reseller Waroengkuy](https://waroengkuy.com/reseller) dan [beranda Waroengkuy](https://waroengkuy.com/).

## 2. Asumsi kerja

Asumsi berikut dipakai agar rancangan awal dapat dibuat; semuanya masih perlu dikonfirmasi.

1. Produk pertama adalah toko B2C milik satu reseller, bukan platform SaaS yang menampung banyak reseller.
2. Target pembeli berada di Indonesia. Antarmuka berbahasa Indonesia dan harga ditampilkan dalam rupiah.
3. Katalog hanya memuat produk yang hak jual ulang, cara pemenuhan, dan ketentuan garansinya telah dikonfirmasi.
4. Katalog/stok/harga sumber hanya diambil lewat API atau proses resmi yang diizinkan vendor. Tidak ada scraping.
5. Pengguna bisa berbelanja tanpa membuat akun. Nomor WhatsApp atau email diminta hanya untuk kebutuhan pesanan dan dukungan.
6. Gateway pembayaran, domain, merek toko, kanal pengiriman, dan kebijakan operasional belum dipilih.
7. Jangan menjanjikan pembayaran QRIS, harga real-time, stok real-time, atau pengiriman otomatis sebelum integrasi resmi dan uji sandbox berhasil.

## 3. Masalah dan peluang

Calon pembeli perlu menemukan produk yang sesuai, membandingkan variasi, memahami apakah produk tersedia dan bagaimana produk dikirim, lalu membayar dengan yakin. Reseller perlu sebuah kanal jualan dengan merek sendiri tanpa mengelola setiap pesanan secara manual jika vendor mendukung otomasi resmi.

Peluangnya adalah pengalaman toko yang ringkas dan jelas: katalog yang mudah ditelusuri, harga dan ketentuan transparan, alur pesanan yang dapat dilacak, serta fulfillment yang aman sesuai kemampuan vendor.

## 4. Tujuan produk

- Menyediakan toko mobile-first yang dapat ditemukan dan digunakan tanpa akun pembeli.
- Menampilkan informasi produk, variasi, harga jual, stok/status, garansi, serta cara pemenuhan secara jelas.
- Menerima pesanan dengan harga yang terkunci pada saat checkout dan mencatat statusnya secara konsisten.
- Mendukung pembayaran dan fulfillment melalui integrasi resmi setelah akses dan ketentuannya dikonfirmasi.
- Memungkinkan pemilik toko mengelola katalog, markup, konten toko, dan pengecualian pesanan dengan audit yang memadai.

### Bukan tujuan MVP

- Menjadi marketplace multi-penjual atau membangun program reseller sendiri.
- Menyalin situs, merek, teks, foto, struktur visual, atau kode milik Waroengkuy.
- Menjual produk yang hak distribusi atau kepatuhannya belum jelas.
- Membuat sistem dompet/deposit sendiri, penarikan saldo, loyalty, aplikasi mobile, atau API publik untuk pihak lain.
- Menampilkan fitur otomatis yang belum didukung dan diuji melalui akses vendor resmi.

## 5. Pengguna utama

| Pengguna | Kebutuhan |
|---|---|
| Pembeli | Menemukan produk yang tepat, memahami harga dan syarat, membayar, lalu mengetahui status pesanan/pengiriman. |
| Pemilik toko/admin | Mengatur katalog yang berhak dijual, markup/harga jual, konten storefront, dan membantu pesanan bermasalah. |
| Sistem vendor/pembayaran | Menerima permintaan yang sah, memvalidasi status, dan mengirim hasil melalui API/webhook yang terdokumentasi. |

## 6. Ruang lingkup MVP

### P0 — wajib untuk rilis awal

- **Beranda:** identitas toko, pencarian, kategori utama, produk pilihan, promosi yang valid, dan tautan bantuan/kebijakan.
- **Katalog:** daftar dan detail produk dengan variasi/paket, harga final, status ketersediaan, cara pemenuhan, masa garansi, dan syarat yang relevan.
- **Pencarian dan filter:** cari nama produk; filter kategori dan status ketersediaan. Jangan tampilkan produk yang sudah dinonaktifkan vendor.
- **Checkout tamu:** ringkasan item, jumlah, harga final, informasi kontak minimum, konfirmasi syarat, dan pilihan metode pembayaran yang benar-benar aktif.
- **Pembuatan pesanan:** ID unik, snapshot nama/variasi/harga, waktu kedaluwarsa pembayaran, status, dan jejak peristiwa.
- **Pembayaran:** proses melalui penyedia resmi. Konfirmasi transaksi dilakukan di server melalui webhook bertanda tangan atau verifikasi server-ke-server.
- **Fulfillment:** buat pesanan ke vendor resmi setelah pembayaran terverifikasi. Gunakan idempotency atau mekanisme setara untuk mencegah produk terkirim dua kali.
- **Status pesanan:** halaman aman untuk melihat status, instruksi, dan hasil pengiriman. Pembeli dapat menghubungi dukungan dengan ID pesanan.
- **Admin dasar:** autentikasi admin, pengelolaan produk/kategori/konten, kontrol harga jual, pencarian pesanan, dan catatan tindakan admin.
- **Kegagalan yang tertangani:** pembayaran tertunda/gagal, stok berubah, API tidak tersedia, produk gagal dikirim, dan pengajuan refund/penanganan manual.

### P1 — setelah MVP stabil

- Kupon atau promosi dengan aturan tanggal dan batas penggunaan.
- Notifikasi otomatis melalui WhatsApp atau email setelah persetujuan kanal/API dan template yang sesuai.
- Ulasan pembeli terverifikasi, produk terkait, dan laporan ringkas penjualan.
- Pembaruan katalog/stok terjadwal jika didukung API.
- Dasbor margin yang hanya terlihat oleh pemilik toko.

## 7. Alur utama

### Pembeli

1. Pembeli membuka beranda, mencari atau memilih kategori.
2. Pembeli membuka detail, memilih variasi, memeriksa harga, ketersediaan, cara pengiriman, dan garansi.
3. Pembeli mengisi kontak minimum, meninjau ringkasan, lalu membuat pesanan.
4. Website membuat sesi/instruksi pembayaran melalui penyedia resmi dan menampilkan status menunggu pembayaran.
5. Server memverifikasi pembayaran. Status di browser saja tidak dapat mengubah pesanan menjadi lunas.
6. Setelah lunas, fulfillment dikirim lewat integrasi resmi. Halaman pesanan menunjukkan status dan hasil secara aman.
7. Jika tertunda atau gagal, halaman memberi penjelasan dan jalur dukungan; sistem tidak membuat pembelian kedua secara otomatis.

### Admin/reseller

1. Admin masuk melalui area yang dilindungi.
2. Admin mengaktifkan produk yang telah diverifikasi boleh dijual, memeriksa harga dan status sumber, lalu menentukan harga jual.
3. Admin memantau pesanan dan antrean pengecualian tanpa melihat data pembayaran yang tidak diperlukan.
4. Setiap perubahan penting, tindakan pemenuhan manual, dan keputusan refund tercatat dengan waktu dan pelaku.

## 8. Peta halaman

| Halaman | Tujuan |
|---|---|
| `/` | Menjelaskan toko dan mengarahkan ke katalog. |
| `/kategori/:slug` | Menjelajah produk dalam kategori. |
| `/produk/:slug` | Detail produk, variasi, harga, ketersediaan, garansi, dan cara pemenuhan. |
| `/checkout` | Kontak, ringkasan, persetujuan syarat, dan pembayaran. |
| `/pesanan/:id` | Status, instruksi, hasil fulfillment, dan bantuan dengan akses yang aman. |
| `/bantuan`, `/kebijakan`, `/syarat` | Dukungan, privasi, ketentuan pembelian, refund/garansi sesuai kebijakan yang disahkan pemilik. |
| `/admin/*` | Katalog, harga, storefront, pesanan, pengecualian, dan audit. |

Rute di atas bersifat usulan, bukan keputusan framework.

## 9. Kebutuhan fungsional dan penerimaan

| ID | Kebutuhan | Kriteria penerimaan |
|---|---|---|
| FR-01 | Menjelajahi katalog | Produk aktif dapat dicari dan difilter; produk nonaktif/kehabisan stok tidak dapat dibeli. |
| FR-02 | Informasi produk yang jelas | Setiap produk yang dapat dibeli menampilkan variasi, harga final, status, cara pemenuhan, garansi, dan syarat yang relevan. |
| FR-03 | Harga jual reseller | Admin dapat menetapkan harga jual sesuai aturan bisnis; harga modal dan kredensial vendor tidak pernah dikirim ke halaman publik. |
| FR-04 | Checkout tamu | Pembeli dapat menyelesaikan pesanan tanpa akun dan melihat ulang harga/variasi final sebelum membuat pesanan. |
| FR-05 | Konsistensi harga pesanan | Pesanan menyimpan snapshot harga dan variasi saat dibuat; perubahan katalog berikutnya tidak mengubah pesanan lama. |
| FR-06 | Verifikasi pembayaran | Hanya konfirmasi server yang terverifikasi yang mengubah status ke lunas; webhook duplikat tidak menggandakan aksi. |
| FR-07 | Fulfillment aman | Pesanan yang belum lunas tidak diteruskan; kegagalan vendor masuk status yang bisa ditindaklanjuti; retry tidak menggandakan pesanan. |
| FR-08 | Pelacakan pembeli | ID pesanan dan mekanisme verifikasi kontak membatasi akses ke hasil pengiriman dan data pribadi. |
| FR-09 | Penanganan pengecualian | Admin dapat melihat pesanan tertunda/gagal, menambahkan catatan, dan mengikuti kebijakan yang disetujui; tindakan terekam. |
| FR-10 | Audit dan privasi | Perubahan admin dan status penting tercatat; rahasia, nomor pembayaran sensitif, dan isi produk digital tidak muncul di log umum. |

## 10. Kebutuhan nonfungsional

- **Responsif dan aksesibel:** dapat digunakan di ponsel dan desktop, kontras memadai, label kontrol formulir jelas, navigasi keyboard dasar.
- **Keandalan transaksi:** perubahan status mengikuti transisi yang jelas; pembayaran, fulfillment, dan notifikasi dapat direkonsiliasi.
- **Keamanan:** autentikasi admin, otorisasi server, validasi input, rate limiting untuk pencarian pesanan, perlindungan webhook, dan penyimpanan secret di environment.
- **Privasi:** kumpulkan data minimum, jelaskan tujuan pemakaian dan retensi, batasi akses admin, dan sediakan jalur permintaan dukungan/data sesuai kebijakan yang ditinjau sebelum rilis.
- **Performa:** katalog dan halaman detail tetap ringan di koneksi seluler; gambar dioptimalkan; target teknis final ditetapkan setelah stack dan hosting dipilih.
- **Operasional:** pemantauan error dan status integrasi tanpa mencatat secret atau konten digital sensitif; ada prosedur manual ketika layanan vendor/pembayaran terganggu.

## 11. Model status minimal

Status pesanan yang disarankan: `pending_payment` → `paid` → `fulfillment_pending` → `fulfilled`. Jalur pengecualian yang diperlukan: `expired`, `payment_failed`, `fulfillment_failed`, `cancelled`, dan `refund_pending`/`refunded` sesuai kemampuan penyedia.

Status pembayaran dan fulfillment sebaiknya dilacak terpisah agar kegagalan vendor setelah pembayaran tidak disamarkan sebagai transaksi gagal bayar. Nama status teknis final boleh menyesuaikan API resmi.

## 12. Metrik keberhasilan

- Rasio pesanan berhasil dibayar dari checkout yang dimulai.
- Persentase fulfillment berhasil dan waktu dari pembayaran terverifikasi sampai produk/petunjuk diterima.
- Jumlah pesanan duplikat akibat retry/webhook.
- Tingkat pesanan tertunda/gagal dan waktu penyelesaiannya.
- Produk yang tampil tersedia tetapi ditolak vendor karena stok.
- Rasio kontak bantuan, pembatalan, dan refund.

Kumpulkan baseline saat pilot; tetapkan target angka setelah volume dan kemampuan penyedia diketahui.

## 13. Prasyarat dan risiko

1. **Akses vendor:** akun reseller aktif, hak jual ulang, dokumentasi API, sandbox, batas penggunaan, dan alur klaim/refund.
2. **Produk:** daftar SKU yang dapat dijual, variasi, masa berlaku, informasi pengiriman, stok, serta ketentuan penggunaan/garansi per SKU.
3. **Pembayaran:** pemilik akun penyedia, biaya, webhook, refund, dan pihak yang menerima dana harus jelas sebelum checkout nyata.
4. **Fulfillment:** tentukan apakah data dikirim melalui API, dashboard, atau proses manual resmi. Jangan menjanjikan otomatisasi sebelum jalur itu lulus uji.
5. **Keamanan produk:** sebagian layanan digital membatasi berbagi akun atau penjualan ulang. Jangan menawarkan SKU sebelum aturan vendor/pemilik layanan diperiksa.
6. **Privasi dan operasional:** pemilik toko harus menyetujui kebijakan privasi, syarat pembelian, masa retensi data, garansi, dan refund sebelum rilis.
7. **Ketergantungan pihak ketiga:** gangguan/stok/harga vendor dapat menghentikan penjualan; sediakan penonaktifan produk dan jalur dukungan.

## 14. Pertanyaan yang perlu dijawab sebelum coding

- Apa nama toko, domain, logo, warna, dan gaya visual yang diinginkan?
- Kategori dan SKU apa yang sudah pasti boleh dijual ulang? Apakah termasuk akun digital, top-up, atau jasa sosial media?
- Apakah akun reseller sudah aktif dan akses API/dokumentasi diberikan? Apa aturan teknis dan komersialnya?
- Pembayaran memakai akun/gateway milik siapa? Apakah QRIS ingin menjadi metode pertama?
- Pemenuhan pesanan akan otomatis melalui API atau manual pada tahap awal? Kanal pengiriman apa yang diperbolehkan?
- Apakah pembeli menerima hasil lewat halaman status, WhatsApp, email, atau gabungan?
- Bagaimana aturan pembatalan, stok habis, garansi, dan refund?
- Apakah MVP perlu dashboard admin lengkap atau cukup pengelolaan katalog/pesanan minimal?
- Apakah domain, hosting, dan teknologi tertentu sudah dipilih?

## 15. Tahapan implementasi yang disarankan

1. **Validasi:** selesaikan pertanyaan pada bagian 14 dan kumpulkan dokumentasi/izin dari penyedia.
2. **Fondasi:** pilih stack, lingkungan, deployment, skema status, dan desain visual toko sendiri.
3. **Storefront:** katalog, pencarian, detail produk, dan checkout tanpa akun menggunakan data uji.
4. **Integrasi sandbox:** payment webhook, katalog/stock API, fulfillment, retry/idempotency, dan penanganan error.
5. **Admin dan pilot:** kelola katalog/pesanan, uji dengan produk yang diizinkan, dokumentasikan refund/support, lalu ukur metrik awal.
6. **Rilis terbatas:** aktifkan transaksi nyata hanya setelah izin, kebijakan, keamanan, rekonsiliasi, dan tes end-to-end disetujui pemilik.
