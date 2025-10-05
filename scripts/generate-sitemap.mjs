import fs from "fs";
import path from "path";
import { SitemapStream, streamToPromise } from "sitemap";
import { createGzip } from "zlib";

const SITE_URL = process.env.SITE_URL || "https://fouadbechar.vercel.app";
const __dirname = path.resolve();
const pagesPath = path.join(__dirname, "public", "pages.json");
const outXmlPath = path.join(__dirname, "public", "sitemap.xml");
const outGzipPath = path.join(__dirname, "public", "sitemap.xml.gz");

function formatDateFull(input) {
  try {
    const d = input ? new Date(input) : new Date();
    if (Number.isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString();
  } catch (e) {
    return new Date().toISOString();
  }
}

function normalizeUrl(u) {
  if (!u) return null;
  u = String(u).trim();
  try {
    if (/^https?:\/\//i.test(u)) {
      const urlObj = new URL(u);
      return urlObj.pathname + (urlObj.search || "");
    }
  } catch (e) {}
  if (!u.startsWith("/")) u = "/" + u;
  return u;
}

async function main() {
  let pages = [];
  try {
    if (fs.existsSync(pagesPath)) {
      const raw = fs.readFileSync(pagesPath, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) pages = parsed;
      else console.warn("⚠️ pages.json is not an array; ignoring.");
    } else {
      console.warn("⚠️ pages.json not found, generating empty sitemap.");
    }
  } catch (err) {
    console.error("❌ Error reading pages.json:", err.message);
  }

  const smStream = new SitemapStream({ hostname: SITE_URL });
  const seen = new Set();

  for (const p of pages) {
    try {
      if (!p || !p.url) continue;
      const normalized = normalizeUrl(p.url);
      if (!normalized) continue;

      const loc = SITE_URL.replace(/\/$/, "") + normalized;
      if (seen.has(loc)) continue;
      seen.add(loc);

      smStream.write({
        url: normalized,
        changefreq: p.changefreq || "weekly",
        priority:
          p.priority === 0 || typeof p.priority === "number" ? p.priority : 0.7,
        lastmod: p.lastmod ? formatDateFull(p.lastmod) : formatDateFull(),
      });
    } catch (e) {
      console.warn("⚠️ Skipping invalid page entry:", e);
    }
  }

  smStream.end();

  let sitemapBuffer;
  try {
    sitemapBuffer = await streamToPromise(smStream);
  } catch (err) {
    console.error("❌ Failed to generate sitemap XML:", err.message);
    process.exitCode = 1;
    return;
  }

  try {
    let xmlString = sitemapBuffer.toString();

    xmlString = xmlString.replace(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                           http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`
    );

    fs.writeFileSync(outXmlPath, xmlString, "utf8");
    console.log("✅ Sitemap written to", outXmlPath);

    sitemapBuffer = Buffer.from(xmlString, "utf8");
  } catch (err) {
    console.error("❌ Failed to write sitemap.xml:", err.message);
    process.exitCode = 1;
    return;
  }

  try {
    await new Promise((resolve, reject) => {
      const gzipped = createGzip();
      const input = fs.createReadStream(outXmlPath);
      const output = fs.createWriteStream(outGzipPath);

      input.on("error", (err) => reject(new Error("Read error: " + err.message)));
      gzipped.on("error", (err) => reject(new Error("Gzip error: " + err.message)));
      output.on("error", (err) => reject(new Error("Write error: " + err.message)));
      output.on("finish", () => resolve());

      input.pipe(gzipped).pipe(output);
    });
    console.log("✅ Gzipped sitemap written to", outGzipPath);
  } catch (err) {
    console.error("❌ Failed to generate gzipped sitemap:", err.message);
    process.exitCode = 1;
  }
}

main();

