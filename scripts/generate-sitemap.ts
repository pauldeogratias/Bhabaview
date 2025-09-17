import * as fs from 'fs';
import * as path from 'path';
import { fetchAllProducts, PaginatedResponse, Product } from '../src/utils/api.js';

const generateSitemap = async (): Promise<void> => {
  try {
    const baseUrl = 'https://yourstore.com'; // Change this to your actual domain

    // Fetch products with typing
    const productsResponse: PaginatedResponse<Product> = await fetchAllProducts();
    const products = productsResponse.data;

    // Build sitemap XML string
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${products
    .map((product: Product) => {
      const slug = `${product.product_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')}_${product.id}`;

      return `
  <url>
    <loc>${baseUrl}/product/${slug}</loc>
    <lastmod>${new Date(product.added_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

    // Ensure 'public' directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    // Write sitemap.xml to public folder
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
};

generateSitemap();
