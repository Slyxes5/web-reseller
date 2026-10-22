const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = __dirname;
const apiBaseUrl = "https://waroengkuy.com/api/reseller/v1";
loadLocalEnvironment();

const cacheSeconds = Math.min(300, Math.max(60, Number(process.env.WRK_CATALOG_CACHE_SECONDS) || 120));
const cacheDuration = cacheSeconds * 1000;
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
};

let cachedCatalog = null;
let catalogExpiresAt = 0;
let catalogRequest = null;

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, "http://127.0.0.1");
  setSecurityHeaders(response);

  if (request.method !== "GET") {
    sendJson(response, 405, { ok: false, code: "method_not_allowed", error: "Metode tidak didukung." });
    return;
  }

  if (requestUrl.pathname === "/api/catalog") {
    try {
      const catalog = await getCatalog();
      response.setHeader("Cache-Control", `private, max-age=${cacheSeconds}`);
      sendJson(response, 200, { ok: true, ...catalog });
    } catch (error) {
      const statusCode = error.code === "api_not_configured" ? 503 : 502;
      sendJson(response, statusCode, { ok: false, code: error.code || "upstream_error", error: error.publicMessage });
    }
    return;
  }

  serveStaticFile(requestUrl.pathname, response);
});

function loadLocalEnvironment() {
  const envPath = path.join(projectRoot, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || Object.hasOwn(process.env, match[1])) continue;
    const value = match[2].replace(/\s+#.*$/, "").trim().replace(/^(?:"(.*)"|'(.*)')$/, (_, doubleQuoted, singleQuoted) => doubleQuoted ?? singleQuoted);
    process.env[match[1]] = value;
  }
}

function setSecurityHeaders(response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("X-Frame-Options", "DENY");
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

async function getCatalog() {
  if (cachedCatalog && Date.now() < catalogExpiresAt) return cachedCatalog;
  if (catalogRequest) return catalogRequest;

  catalogRequest = fetchCatalogFromVendor();
  try {
    cachedCatalog = await catalogRequest;
    catalogExpiresAt = Date.now() + cacheDuration;
    return cachedCatalog;
  } finally {
    catalogRequest = null;
  }
}

async function fetchCatalogFromVendor() {
  loadLocalEnvironment();
  const apiKey = process.env.WRK_KEY;
  if (!apiKey) {
    const error = new Error("API key belum diatur.");
    error.code = "api_not_configured";
    error.publicMessage = "Katalog API belum terhubung. Atur WRK_KEY di file .env setelah akses reseller aktif.";
    throw error;
  }

  let upstreamResponse;
  try {
    upstreamResponse = await fetch(`${apiBaseUrl}/products`, {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    const error = new Error("Koneksi API vendor gagal.");
    error.code = "upstream_unavailable";
    error.publicMessage = "Katalog API sementara tidak dapat diakses. Data demo tetap ditampilkan.";
    throw error;
  }

  let payload;
  try {
    payload = await upstreamResponse.json();
  } catch {
    payload = null;
  }

  if (!upstreamResponse.ok || !payload?.ok || !Array.isArray(payload.items)) {
    const error = new Error("Respons API tidak berhasil.");
    error.code = upstreamResponse.status === 401 ? "unauthorized" : "upstream_error";
    error.publicMessage = upstreamResponse.status === 401
      ? "API menolak key. Periksa status akses reseller dan WRK_KEY di .env."
      : "Respons katalog API tidak valid atau gagal. Data demo tetap ditampilkan.";
    throw error;
  }

  return {
    source: "waroengkuy",
    fetchedAt: new Date().toISOString(),
    items: payload.items.map(toPublicCatalogItem),
  };
}

function toPublicCatalogItem(item) {
  return {
    variantId: String(item.variant_id ?? ""),
    productId: String(item.product_id ?? ""),
    product: cleanText(item.product),
    variant: cleanText(item.variant),
    category: cleanText(item.category),
    referencePrice: asNonNegativeInteger(item.normal_price),
    stock: asNonNegativeInteger(item.stock),
    type: item.type === "manual" ? "manual" : "auto",
    requiredFields: Array.isArray(item.required_fields) ? item.required_fields.map(cleanText).filter(Boolean) : [],
    image: safeVendorImageUrl(item.image),
    description: cleanText(item.description),
    variantDescription: cleanText(item.variant_description),
    warrantyDays: asNonNegativeInteger(item.warranty_days),
    noWarranty: item.no_warranty === true,
  };
}

function cleanText(value) {
  return typeof value === "string" ? value.slice(0, 12000) : "";
}

function asNonNegativeInteger(value) {
  return Number.isSafeInteger(value) && value >= 0 ? value : null;
}

function safeVendorImageUrl(value) {
  if (typeof value !== "string") return null;
  try {
    const imageUrl = new URL(value);
    return imageUrl.protocol === "https:" && imageUrl.hostname === "waroengkuy.com" ? imageUrl.href : null;
  } catch {
    return null;
  }
}

function serveStaticFile(requestPath, response) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(requestPath);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  const relativePath = decodedPath === "/" ? "index.html" : decodedPath.replace(/^\/+/, "");
  if (relativePath.split(/[\\/]/).some((segment) => segment.startsWith("."))) {
    response.writeHead(404).end("Not found");
    return;
  }
  const filePath = path.resolve(projectRoot, relativePath);
  if (filePath !== projectRoot && !filePath.startsWith(`${projectRoot}${path.sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  fs.stat(filePath, (statError, fileStat) => {
    if (statError || !fileStat.isFile()) {
      response.writeHead(404).end("Not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    fs.createReadStream(filePath).pipe(response);
  });
}

const port = Number(process.env.PORT) || 3000;
server.listen(port, "127.0.0.1", () => {
  console.log(`TStore preview running at http://127.0.0.1:${port}`);
});
