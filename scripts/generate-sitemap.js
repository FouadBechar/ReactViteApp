const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.SITE_URL || 'https://react-app-eight.vercel.app';
const pagesPath = path.join(__dirname, '..', 'public', 'pages.json');
const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

function normalizeUrl(siteUrl, p) {
  const base = siteUrl.replace(/\/$/, '');
  const url = (p.url || '').startsWith('/') ? p.url : '/' + (p.url || '');
  return base + url;
}

function formatDate(d) {
  try {
    return new Date(d).toISOString().slice(0, 10);
  } catch (e) {
    return new Date().toISOString().slice(0, 10);
  }
}

function buildSitemap(pages) {
  const urls = pages.map((p) => {
    const loc = normalizeUrl(SITE_URL, p);
    const lastmod = p.lastmod ? formatDate(p.lastmod) : formatDate(new Date());
    const changefreq = p.changefreq || 'weekly';
    const priority = p.priority != null ? p.priority : 0.7;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
}

function main() {
  let pages = [];
  if (fs.existsSync(pagesPath)) {
    try {
      pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
      if (!Array.isArray(pages)) pages = [];
    } catch (e) {
      console.warn('Could not parse pages.json:', e.message);
      pages = [];
    }
  } else {
    console.warn('pages.json not found at', pagesPath, '- generating sitemap with no pages');
  }

  const xml = buildSitemap(pages);
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log('Sitemap written to', outPath);
}

main();
