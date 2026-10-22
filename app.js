const searchInput = document.querySelector("#catalog-search");
const categoryButtons = [...document.querySelectorAll(".category-tab")];
let productCards = [...document.querySelectorAll(".product-card")];
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const productGrid = document.querySelector("#product-grid");
const demoDialog = document.querySelector("#demo-dialog");
const detailTitle = document.querySelector("#detail-title");
const detailDescription = document.querySelector("#detail-description");
const detailList = document.querySelector("#detail-list");
const detailNote = document.querySelector("#detail-note");
const detailSource = document.querySelector("#detail-source");
const apiStatus = document.querySelector("#api-status");
const demoBannerCopy = document.querySelector("#demo-banner-copy");
let selectedCategory = "all";
const apiProductDetails = new WeakMap();

const categoryDetails = {
  aplikasi: {
    title: "Aplikasi Premium — snapshot publik",
    description: "Produk yang ditemukan di katalog publik. Saya catat hanya varian yang mengaktifkan akun milik pembeli; akun yang disediakan toko dikecualikan.",
    items: ["Canva Pro: 1 bulan Rp10.000 atau 1 tahun Rp50.000; akun Canva pembeli, diproses admin", "YouTube Premium: 1 bulan Rp10.000; pilih aktivasi ke akun pembeli, diproses admin", "Apple Music: 1 bulan Rp10.000; undangan ke Apple Account pembeli", "Publik mencantumkan ketiganya tersedia saat dicek", "Tidak dimasukkan: Spotify stok habis dan memakai akun toko; CapCut, Meitu, Wink, Alight Motion, Zoom, Scribd, dan paket lain yang memakai akun toko"],
    note: "Snapshot 23 Okt 2026. Harga publik bukan harga reseller atau harga TStore. Izin jual dan SKU reseller masih harus dikonfirmasi; katalog ini belum bisa dibeli.",
    source: "https://waroengkuy.com/beli/produk/canva",
  },
  ai: {
    title: "AI — snapshot publik",
    description: "Varian individual yang ditemukan adalah Google Gemini dengan link redeem ke akun Google pembeli.",
    items: ["Google Gemini 18 bulan (link redeem): Rp75.000; tercantum tersedia", "Gemini 1 tahun Rp50.000 memakai akun dari toko, jadi dikecualikan", "RunningHub tercantum Rp7.500 untuk 5.600 RH Coins, tetapi detail produk menyebut akun dari toko, jadi dikecualikan", "Paket ChatGPT, Claude, Perplexity, Grok, dan layanan patungan lain tidak dimasukkan"],
    note: "Snapshot 23 Okt 2026. Hak jual, ketersediaan terbaru, dan cara fulfillment perlu dikonfirmasi setelah akses reseller disetujui.",
    source: "https://waroengkuy.com/beli/produk/google-gemini",
  },
  vpn: {
    title: "VPN — perlu SKU personal",
    description: "Katalog publik menampilkan HMA VPN dan Surfshark VPN, tetapi instruksi produk meminta login memakai akun dari toko.",
    items: ["HMA VPN: harga publik mulai Rp10.000; tercantum 20 stok", "Surfshark VPN: harga publik mulai Rp10.000; tercantum 19 stok", "Kedua SKU dikecualikan dari katalog TStore karena memakai akun dari toko", "Aktifkan kategori ini hanya jika tersedia lisensi/redeem personal dan hak jualnya terverifikasi"],
    note: "Snapshot 23 Okt 2026. Jumlah stok/harga halaman publik bukan stok atau harga reseller TStore.",
    source: "https://waroengkuy.com/beli/produk/hma-vpn",
  },
  ewallet: {
    title: "E-wallet — produk yang tercantum publik",
    description: "Top up saldo diarahkan ke nomor tujuan. Contoh harga berikut adalah harga katalog publik paling rendah yang saya lihat.",
    items: ["GoPay mulai Rp1.975; OVO Rp9.825; ShopeePay Rp1.125; DANA Rp1.225", "GoPay Driver Rp10.905; GoPay Promo Rp80.905; GrabPay Rp19.915; GrabPay Driver Rp11.375", "Voucher GrabFood Rp9.475; i.saku Rp10.825; KasPro Rp10.825; LinkAja Rp10.375", "LinkAja Entitas Rp10.675; OVO termasuk admin Rp10.825; ShopeePay belum termasuk admin Rp4.125; AstraPay Rp10.825", "Setiap produk punya beberapa nominal; cek ulang nomor tujuan sebelum mengirim pesanan"],
    note: "Snapshot 23 Okt 2026. Harga/nominal dan status tiap varian berubah; ini bukan harga modal reseller atau ketersediaan TStore.",
    source: "https://waroengkuy.com/beli/produk/saldo-gopay",
  },
  pulsa: {
    title: "Pulsa — operator yang tercantum publik",
    description: "Katalog menampilkan pengisian ke nomor tujuan untuk operator berikut; harga termurah yang tampil berbeda per operator.",
    items: ["Telkomsel mulai Rp2.834; Indosat Rp6.638; Tri Rp5.203; By.U Rp3.810", "Axis mulai Rp5.884; Smartfren Rp5.079; XL Rp5.884", "Tersedia banyak pilihan nominal per operator; katalog publik menyebut pengiriman biasanya beberapa menit", "Nomor salah tidak bisa ditarik menurut keterangan halaman sumber"],
    note: "Snapshot 23 Okt 2026. Harga dan status bisa berubah sewaktu-waktu; belum ada koneksi stok atau harga reseller TStore.",
    source: "https://waroengkuy.com/beli/produk/pulsa-telkomsel",
  },
  game: {
    title: "Token & game — produk yang tercantum publik",
    description: "Produk yang ditemukan adalah token PLN dan top up Diamond Mobile Legends.",
    items: ["Token PLN: nominal publik mulai Rp5.000, harga Rp7.000; tercantum tersedia", "Mobile Legends: Diamond mulai Rp1.994 untuk paket 5 Diamond; tercantum tersedia", "Token PLN memakai ID pelanggan/nomor meter; Mobile Legends memakai User ID dan Zone ID", "Katalog sumber punya banyak pilihan nominal; data TStore belum tersambung"],
    note: "Snapshot 23 Okt 2026. Pastikan ID tujuan benar; harga/status di halaman publik bukan penawaran final TStore.",
    source: "https://waroengkuy.com/beli/produk/mobile-legends",
  },
  sosmed: {
    title: "Jasa sosial media — belum dirinci",
    description: "Program reseller menyebut layanan followers, likes, dan views, tetapi daftar SKU dan ketentuannya belum masuk dalam snapshot katalog ini.",
    items: ["Perlu daftar layanan per platform, jumlah minimum/maksimum, dan estimasi pengerjaan", "Perlu memeriksa ketentuan platform serta kebijakan refill/komplain", "Jangan meminta kata sandi akun pembeli", "Belum dimasukkan sebagai produk yang bisa dipesan"],
    note: "Tunggu katalog SKU dan ketentuan resmi sebelum menayangkan jasa ini.",
    source: "https://waroengkuy.com/reseller",
  },
};

const publicProductDetails = {
  "apple-music": {
    title: "Apple Music — referensi publik",
    description: "Halaman publik mencantumkan paket 1 bulan Rp10.000, tersedia, dan dikirim melalui undangan ke email Apple Account pembeli.",
    items: ["Varian yang dicatat: 1 bulan · Rp10.000", "Status halaman publik: tersedia · 12 terjual", "Pemenuhan disebut diproses admin lewat undangan email"],
    note: "Snapshot publik bukan harga reseller atau harga final TStore. Hak jual dan SKU reseller masih harus dikonfirmasi.",
    source: "https://waroengkuy.com/beli/produk/apple-music",
  },
  spotify: {
    title: "Spotify Premium — referensi publik",
    description: "Saat dicek pada 23 Okt 2026, halaman publik menyebut stok habis. Deskripsi paket menyebut login dengan akun dari toko, jadi tidak saya aktifkan untuk TStore.",
    items: ["Stok publik: habis", "Harga beli tidak ditampilkan saat stok habis", "TStore hanya akan mempertimbangkan paket akun pembeli sendiri, tanpa akun bersama"],
    note: "Snapshot publik bukan data reseller. Tunggu SKU personal dan izin jual yang sesuai preferensi TStore.",
    source: "https://waroengkuy.com/beli/produk/spotify-premium",
  },
  youtube: {
    title: "YouTube Premium — referensi publik",
    description: "Halaman publik mencantumkan paket 1 bulan Rp10.000, status tersedia, dan 189 terjual. Keterangan menyebut pembeli dapat memakai akun sendiri; hanya opsi itu yang cocok untuk ditinjau.",
    items: ["Varian yang dicatat: 1 bulan · Rp10.000", "Status di halaman publik: tersedia · 189 terjual", "Metode aktivasi dan pemenuhan masih perlu dikonfirmasi untuk SKU personal"],
    note: "Harga katalog publik bukan harga modal reseller atau harga TStore. Produk belum diaktifkan untuk dibeli.",
    source: "https://waroengkuy.com/beli/produk/youtube",
  },
  gemini: {
    title: "Google Gemini — referensi publik",
    description: "Halaman publik mencantumkan 18 bulan melalui link redeem seharga Rp75.000, yang dipakai pada akun Google pembeli. Varian 1 tahun yang memakai akun toko tidak saya masukkan.",
    items: ["Varian yang dicatat: 18 bulan · link redeem · Rp75.000", "Status halaman: tersedia · halaman utama mencatat 192 terjual", "Varian 1 tahun Rp50.000 dikecualikan karena memakai akun dari toko"],
    note: "Snapshot halaman publik bukan harga reseller. Hak jual, ketersediaan terbaru, dan cara fulfillment perlu dikonfirmasi.",
    source: "https://waroengkuy.com/beli/produk/google-gemini",
  },
  canva: {
    title: "Canva — referensi publik",
    description: "Halaman publik mencantumkan Canva pada akun milik pembeli melalui email, dengan dua masa aktif.",
    items: ["1 bulan · Rp10.000", "1 tahun · Rp50.000", "Status halaman: tersedia · 149 terjual", "Aktivasi disebut diproses admin ke akun pembeli"],
    note: "Snapshot katalog publik bukan harga reseller. SKU dan izin jual TStore tetap perlu dikonfirmasi.",
    source: "https://waroengkuy.com/beli/produk/canva",
  },
};

function showDetails(button) {
  const productCard = button.closest(".product-card");
  const detail = productCard ? categoryDetails[productCard.dataset.category] : null;
  const popularCard = button.closest(".popular-card");
  const publicProduct = popularCard ? publicProductDetails[popularCard.dataset.publicProduct] : null;
  const apiProduct = productCard ? apiProductDetails.get(productCard) : null;
  const activeDetail = publicProduct || (apiProduct ? createApiProductDetail(apiProduct) : detail);
  const title = activeDetail?.title || "Detail produk";
  const description = activeDetail?.description || "Produk ini belum memiliki data publik yang dicatat.";
  const items = activeDetail?.items || [];
  detailTitle.textContent = title;
  detailDescription.textContent = description;
  detailList.replaceChildren(...items.map((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    return listItem;
  }));
  detailNote.textContent = activeDetail?.note || "Produk, stok, harga, dan ketentuan akan diisi setelah data reseller/API resmi tersedia.";
  detailSource.href = activeDetail?.source || "#";
  detailSource.hidden = !activeDetail?.source;
  demoDialog.showModal();
}

function classifyApiProduct(product) {
  const value = `${product.category} ${product.product} ${product.variant}`.toLocaleLowerCase("id");
  if (/vpn|surfshark|hma/.test(value)) return "vpn";
  if (/e.?wallet|ewallet|saldo|gopay|dana|ovo|shopee.?pay|linkaja|grab.?pay|astrapay|kaspro/.test(value)) return "ewallet";
  if (/pulsa|telkomsel|indosat|\btri\b|\bxl\b|axis|by.?u|smartfren|operator/.test(value)) return "pulsa";
  if (/token|\bpln\b|diamond|mobile.?legends|free.?fire|game/.test(value)) return "game";
  if (/sosmed|social|follower|like|view|instagram|tiktok/.test(value)) return "sosmed";
  if (/\bai\b|artificial|gemini|chatgpt|claude|perplexity|grok|runninghub/.test(value)) return "ai";
  return "aplikasi";
}

function createApiProductCard(product) {
  const card = document.createElement("article");
  const category = classifyApiProduct(product);
  card.className = "product-card";
  card.dataset.category = category;
  card.dataset.search = [product.product, product.variant, product.category, product.description, product.variantDescription]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("id");

  const visual = document.createElement("div");
  visual.className = "product-visual api-product-visual";
  const label = document.createElement("span");
  label.className = "visual-label";
  label.textContent = product.category || "KATALOG API";
  visual.append(label);
  if (product.image) {
    const image = document.createElement("img");
    image.className = "api-product-image";
    image.src = product.image;
    image.alt = "";
    image.loading = "lazy";
    visual.append(image);
  } else {
    const mark = document.createElement("span");
    mark.className = "api-product-mark";
    mark.textContent = product.product.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join("").toLocaleUpperCase("id");
    visual.append(mark);
  }

  const info = document.createElement("div");
  info.className = "product-info";
  const meta = document.createElement("div");
  meta.className = "product-meta";
  const categoryLabel = document.createElement("span");
  categoryLabel.className = "product-category";
  categoryLabel.textContent = product.category || "KATALOG API";
  const status = document.createElement("span");
  status.className = "demo-status";
  const statusDot = document.createElement("i");
  status.append(statusDot, document.createTextNode(product.noWarranty ? "Tanpa garansi" : "Pratinjau API"));
  meta.append(categoryLabel, status);

  const title = document.createElement("h3");
  title.textContent = product.product || "Produk digital";
  const variant = document.createElement("p");
  variant.textContent = product.variant || product.variantDescription || "Varian belum dirinci";

  const bottom = document.createElement("div");
  bottom.className = "product-bottom";
  const price = document.createElement("span");
  price.className = "price-placeholder";
  price.textContent = product.referencePrice === null
    ? "Harga ritel belum diatur"
    : `Harga ritel acuan · ${formatRupiah(product.referencePrice)}`;
  const button = document.createElement("button");
  button.className = "detail-button";
  button.type = "button";
  button.setAttribute("aria-label", `Detail ${product.product || "produk"} ${product.variant || ""}`.trim());
  button.textContent = "↗";
  button.addEventListener("click", () => showDetails(button));
  bottom.append(price, button);

  info.append(meta, title, variant, bottom);
  card.append(visual, info);
  apiProductDetails.set(card, product);
  return card;
}

function createApiProductDetail(product) {
  const stockText = product.type === "manual"
    ? "Proses manual"
    : product.stock === null
      ? "Stok belum diinformasikan"
      : product.stock === 0
        ? "Stok habis"
        : `Stok ${product.stock}`;
  return {
    title: [product.product, product.variant].filter(Boolean).join(" — ") || "Detail produk API",
    description: [product.description, product.variantDescription].filter(Boolean).join("\n\n").replace(/^#{1,6}\s+/gm, "").replace(/^-\s+/gm, "• ") || "Vendor belum memberikan deskripsi produk.",
    items: [
      `Kategori: ${product.category || "Belum dikategorikan"}`,
      `Ketersediaan: ${stockText}`,
      product.referencePrice === null ? "Harga ritel acuan belum diatur" : `Harga ritel acuan: ${formatRupiah(product.referencePrice)}`,
      product.type === "manual" ? `Tipe: proses manual${product.requiredFields.length ? ` · data yang diminta: ${product.requiredFields.join(", ")}` : ""}` : "Tipe: otomatis",
      product.noWarranty ? "Tanpa garansi: wajib ditinjau sebelum dipertimbangkan untuk dijual" : `Garansi: ${product.warrantyDays === null ? "belum diinformasikan" : `${product.warrantyDays} hari`}`,
    ],
    note: "Pratinjau lokal dari API reseller. Produk belum dapat dibeli dari TStore; verifikasi hak jual dan ketentuan SKU dahulu.",
    source: null,
  };
}

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

async function loadApiCatalog() {
  try {
    const response = await fetch("/api/catalog", { headers: { Accept: "application/json" } });
    const payload = await response.json();
    if (!response.ok || !payload.ok || !Array.isArray(payload.items)) {
      apiStatus.hidden = false;
      apiStatus.textContent = payload.error || "Katalog API belum tersedia. Data snapshot tetap ditampilkan.";
      return;
    }

    productGrid.replaceChildren();
    const productFragment = document.createDocumentFragment();
    const categoryOrder = ["aplikasi", "ai", "vpn", "ewallet", "pulsa", "game", "sosmed"];
    const sortedProducts = [...payload.items].sort((first, second) =>
      categoryOrder.indexOf(classifyApiProduct(first)) - categoryOrder.indexOf(classifyApiProduct(second))
    );
    for (const product of sortedProducts) productFragment.append(createApiProductCard(product));
    productGrid.append(productFragment);
    productCards = [...productGrid.querySelectorAll(".product-card")];
    demoBannerCopy.textContent = "Pratinjau katalog API lokal · belum menerima pesanan atau pembayaran";
    apiStatus.hidden = false;
    const fetchedTime = new Date(payload.fetchedAt);
    const timeLabel = Number.isNaN(fetchedTime.getTime()) ? "" : ` · diperbarui ${fetchedTime.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;
    apiStatus.textContent = `Pratinjau katalog API lokal: ${payload.items.length} varian${timeLabel}. Harga yang tampil hanya harga ritel acuan, bukan harga modal. Belum ada fitur pembelian.`;
    filterProducts();
  } catch {
    apiStatus.hidden = false;
    apiStatus.textContent = "Server katalog lokal belum berjalan. Data snapshot tetap ditampilkan.";
  }
}

function filterProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("id");
  let visibleCount = 0;

  for (const card of productCards) {
    const matchesCategory = selectedCategory === "all" || card.dataset.category === selectedCategory;
    const matchesQuery = card.dataset.search.includes(query) || card.querySelector("h3").textContent.toLocaleLowerCase("id").includes(query);
    const isVisible = matchesCategory && matchesQuery;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  }

  resultCount.textContent = String(visibleCount);
  emptyState.hidden = visibleCount !== 0;
  productGrid.hidden = visibleCount === 0;
}

for (const button of categoryButtons) {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    for (const item of categoryButtons) {
      const isSelected = item === button;
      item.classList.toggle("selected", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    }
    filterProducts();
  });
}

searchInput.addEventListener("input", filterProducts);
loadApiCatalog();
document.querySelectorAll("[data-demo-detail]").forEach((button) => {
  button.addEventListener("click", () => showDetails(button));
});
document.querySelector(".dialog-close").addEventListener("click", () => demoDialog.close());
document.querySelector(".dialog-x").addEventListener("click", () => demoDialog.close());
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});
