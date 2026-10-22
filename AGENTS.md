# Panduan proyek toko reseller

Folder ini khusus untuk website toko reseller produk digital. Baca `README.md` dan `PRD.md` sebelum mengubah atau membangun fitur.

- Gunakan merek, domain, desain, copywriting, dan aset milik pengguna atau yang berlisensi. Situs Waroengkuy hanya referensi alur bisnis; jangan menyalin kode, merek, atau asetnya.
- Jangan melakukan scraping, menebak endpoint, atau melewati autentikasi. Gunakan API/dokumentasi dan akses reseller resmi yang diberikan vendor.
- Jangan anggap semua produk pihak ketiga boleh dijual ulang. Verifikasi ketentuan produk, kebijakan garansi, dan hak distribusinya sebelum ditampilkan.
- Jangan menaruh API key, token, kredensial produk, atau rahasia pesanan di source, log, dokumentasi publik, maupun Git. Gunakan environment lokal dan pastikan `.env` diabaikan Git.
- Jangan mengaktifkan pembayaran atau fulfillment nyata tanpa akun dan konfigurasi resmi. Verifikasi pembayaran lewat server/webhook terverifikasi; jangan mengandalkan status dari browser.
- Cek `git status --short` sebelum mengedit repo. Pertahankan perubahan pengguna dan lakukan perubahan sekecil yang diperlukan.
- Gunakan nama variabel dan komentar kode dalam bahasa Inggris. Jelaskan hasil pemeriksaan yang benar-benar dijalankan.
