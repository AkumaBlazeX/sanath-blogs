import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const BLOG_POSTS_JSON = path.join(__dirname, '../src/data/blogPosts.json');
const SITEMAP_FILE = path.join(__dirname, '../public/sitemap.xml');

function generateSitemap() {
  // Read blog posts
  const blogPosts = JSON.parse(fs.readFileSync(BLOG_POSTS_JSON, 'utf8'));
  const currentDate = new Date().toISOString().split('T')[0];

  // Start XML content
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Homepage -->
  <url>
    <loc>https://sanathblogs.site</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Main sections -->
  <url>
    <loc>https://sanathblogs.site/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Blog posts -->`;

  // Add blog posts
  blogPosts.forEach(post => {
    const postDate = new Date(post.date).toISOString().split('T')[0];
    sitemap += `
  <url>
    <loc>https://sanathblogs.site/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Add static pages
  sitemap += `
  <!-- Static pages -->
  <url>
    <loc>https://sanathblogs.site/privacy-policy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://sanathblogs.site/terms-of-service</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

  // Write sitemap
  fs.writeFileSync(SITEMAP_FILE, sitemap);
  console.log('✅ Sitemap updated successfully!');
}

// Run the update
generateSitemap();
