# Catatan Panduan Reseller Waroengkuy

**Sumber:** [Panduan reseller resmi](https://waroengkuy.com/reseller/panduan)  
**Dipelajari:** 23 Oktober 2026  
**Status TStore:** pengajuan reseller masih menunggu persetujuan; belum ada kredensial aktif.

Catatan ini merangkum alur yang dijelaskan di panduan publik untuk membantu pembahasan dan perencanaan TStore. Ketentuan dan tampilan dashboard vendor dapat berubah; cek ulang panduan atau konfirmasi ke Waroengkuy sebelum implementasi transaksi.

## Gambaran layanan

Panduan menjelaskan fitur **toko bawaan Waroengkuy** yang dapat memakai nama, logo, warna aksen, banner, domain, WhatsApp CS, katalog, dan harga jual sendiri. Stok akun disediakan oleh Waroengkuy. Fitur toko bawaan ini jangan langsung dianggap sama dengan website TStore buatan sendiri atau dengan reseller API yang didokumentasikan terpisah.

Sebelum toko dapat dibuka, panduan mensyaratkan akun reseller aktif/disetujui dan akun WaroengPay disetujui. Domain diperlukan untuk alamat toko; saldo deposit diperlukan bila memakai mode deposit. Toko dapat ditutup sementara tanpa menghapus katalognya.

## Dua mode modal produk

| Mode | Cara kerja menurut panduan | Catatan untuk TStore |
|---|---|---|
| Deposit | Modal produk ditahan dari saldo saat checkout dan dikembalikan otomatis jika pesanan batal/kedaluwarsa. Margin adalah harga jual dikurangi modal. | Ketersediaan pada toko bawaan juga bergantung pada stok pusat dan saldo yang cukup untuk setidaknya satu unit. |
| Tanpa deposit | Modal dan biaya proses sebesar 10% dari harga jual dipotong otomatis dari WaroengPay. Sistem menaikkan batas harga jual minimum agar reseller tidak rugi. | Panduan menyebut WaroengPay live diperlukan. Harga minimum dapat membatasi harga yang kita pasang. |

Pembeli membayar harga jual yang ditetapkan. Harga modal, markup, dan estimasi profit terlihat di dashboard saat mengatur harga. Harga tetap per varian tidak boleh di bawah modal; pada mode tanpa deposit juga tidak boleh di bawah harga minimum. QRIS memiliki minimum transaksi Rp1.000.

## Pengaturan produk dan tampilan

- Produk dapat diaktifkan/disembunyikan per item; harga dapat diatur dengan markup global persentase atau nominal, pembulatan opsional, dan override per produk/varian.
- Nama, deskripsi, dan foto produk dapat disesuaikan. Perubahan berlaku setelah disimpan; foto disebut diperbarui langsung.
- Banner promosi maksimal 5; rekomendasi ukuran 1200×375, format PNG/JPG/WebP, maksimal 800 KB.
- Informasi branding yang dijelaskan: nama toko 2–40 karakter, slogan maksimal 80 karakter, WhatsApp CS, logo PNG/JPG/WebP maksimal 300 KB (disarankan persegi), dan warna aksen.
- Pengiriman akun melalui WhatsApp pusat dapat diaktifkan atas nama toko. Jika dimatikan, akun tetap ditampilkan pada halaman pembayaran pesanan dan reseller dapat mengirimkannya manual dari halaman order.

## Pembayaran dan rahasia

Panduan toko bawaan menghubungkan pembayaran melalui WaroengPay. API key live berawalan `wp_live_…` dan webhook secret `whsec_…` dibuat dari dashboard WaroengPay setelah akun disetujui; panduan menyebut webhook dikonfigurasi otomatis oleh toko. Kunci digunakan untuk membuat dan memeriksa tagihan, disimpan terenkripsi menurut panduan, dan harus diperlakukan sebagai rahasia.

Kunci test berawalan `wp_test_…` mengaktifkan mode test. Panduan memperingatkan bahwa saldo deposit tetap dapat ditahan dan akun produk nyata bisa dikirim bila tagihan test disimulasikan lunas, jadi jangan gunakan test mode dengan produk/akun nyata.

Kredensial WaroengPay tersebut **berbeda** dari kunci API reseller Waroengkuy (`wrk_…`) yang dijelaskan dalam dokumentasi API yang sebelumnya diberikan pengguna. Jangan campur atau menaruh salah satunya di browser/source control. Belum ada kredensial yang dimasukkan ke proyek.

## Domain

Untuk domain root dan `www`, panduan meminta record DNS A menuju `43.173.11.90`, menghapus A/AAAA lain untuk host yang sama, serta mematikan proxy Cloudflare (DNS only) jika Cloudflare digunakan. SSL disebut terpasang otomatis setelah DNS mengarah benar. Subdomain didukung melalui record A sendiri. Ada tautan preview sebelum domain aktif.

## Pesanan dan dukungan

Dashboard pesanan menampilkan harga jual, modal, dan profit. Pembeli dapat melacak pesanan memakai ID transaksi berawalan `TRX…` atau WhatsApp. Untuk pesanan lunas, reseller dapat mengirim akun lewat WhatsApp atau menyalinnya. Panduan menyebut pembayaran biasanya tersinkron kurang dari satu menit; jika lewat 10 menit, hubungi dukungan dengan ID transaksi. Jika pembayaran terlambat masuk setelah pesanan dibatalkan, panduan menyebut modal dapat dipotong kembali dari deposit.

Nama merchant yang terlihat saat memindai QRIS tetap merchant WaroengPay; identitas TStore berada di halaman toko/pembayaran seperti nama, logo, banner, dan domain.

## Implikasi dan batas integrasi TStore

1. Fitur markup, deposit, tagihan QRIS, notifikasi, dan pengelolaan order yang dijelaskan di atas adalah alur **toko bawaan**. Belum ada dasar untuk menganggap seluruhnya tersedia melalui API reseller atau otomatis bekerja di website TStore.
2. API reseller yang pernah dibagikan pengguna adalah integrasi berbeda. Untuk prototipe lokal saat ini, server hanya membaca `GET /products`; ia tidak membuat pesanan, memproses pembayaran, atau mengirim produk.
3. Sebelum membangun checkout, perlu memutuskan apakah TStore akan memakai toko bawaan, website sendiri dengan jalur pembayaran resmi yang dikonfirmasi, atau pendekatan lain yang didukung vendor. Jangan membuat order/pembayaran nyata sebelum akses, hak jual ulang per SKU, biaya, sandbox, webhook/validasi status, refund, dan cara fulfillment dipastikan.
4. Jangan mengasumsikan saldo deposit WaroengPay, API reseller, atau pembayaran WaroengPay dapat dipakai silang tanpa konfirmasi dokumentasi.
5. Panduan menyatakan produk pada mode deposit dapat tidak tersedia bila stok pusat atau saldo tidak mencukupi. Tampilkan stok/harga hanya dari sumber resmi dan jangan menjanjikan produk yang belum terverifikasi boleh dijual ulang.

## Daftar cek setelah approval

- Konfirmasi status reseller dan akses dokumentasi/API serta cara memperoleh kunci secara aman.
- Minta kepastian SKU yang boleh dijual ulang, varian, stok, harga/modal, masa aktif, garansi, dan proses refund.
- Putuskan toko bawaan vs TStore custom; bila custom, konfirmasi API pembayaran/fulfillment yang benar-benar didukung.
- Pastikan mode deposit atau tanpa deposit, biaya, batas harga, dan rekonsiliasi pembayaran.
- Verifikasi mekanisme server-side untuk status pembayaran, webhook, idempotency, pembatalan, dan pesanan gagal.
- Masukkan secret hanya ke environment lokal/server yang aman; jangan commit `.env` atau tampilkan nilainya.
- Uji alur di sandbox dengan produk uji sebelum mempertimbangkan transaksi nyata.
