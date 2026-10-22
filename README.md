# Toko reseller produk digital

Folder ini menampung website TStore, toko digital milik reseller yang dirancang untuk memakai jalur resmi Waroengkuy.

- `PRD.md` — tujuan produk, pengguna, alur, kebutuhan MVP, kriteria penerimaan, dan hal yang harus dipastikan sebelum implementasi.
- `AGENTS.md` — batas kerja dan aturan keamanan proyek.

TStore saat ini berupa prototipe dengan katalog snapshot dan pratinjau katalog API baca-saja di server lokal. Akses reseller pengguna masih menunggu persetujuan; belum ada pemesanan, pembayaran, atau fulfillment. Pastikan hak jual ulang tiap SKU, aturan garansi, dan konfigurasi pembayaran resmi tersedia sebelum fitur transaksi dibuat. Website menggunakan identitas visual sendiri dan tidak menyalin kode, teks, atau aset Waroengkuy.

## Local catalog API preview

A local, read-only Node.js server is available in `server.js`. It keeps the Waroengkuy key on the server, requests only `GET /products`, caches responses, and exposes only product metadata, stock, the `normal_price` reference price, and approved image URLs to the local page. The reseller cost field is deliberately removed. The local preview does not create orders or payments.

1. Copy `.env.example` to `.env`.
2. After reseller API access is active, put the key in `WRK_KEY` in `.env` on your own machine. Do not send the key in chat or place it in HTML/JavaScript.
3. Run `node server.js` with Node.js 22 or newer, then open `http://127.0.0.1:3000`.
4. Until the API key is active, the page keeps showing the existing demo snapshot. The API preview does not mean a SKU is approved for resale; verify product rights and terms first.

The server binds to `127.0.0.1` only. It is a local development preview, not a deployment-ready production server.
