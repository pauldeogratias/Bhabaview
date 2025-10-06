import * as fs from 'fs';
import * as path from 'path';
import { fetchAllProducts, fetchAllCategories, Product, Category } from '../src/utils/api';
import { SEO_CONFIG } from '../src/utils/seo';

interface SitemapPage {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  image?: string | null;
}

interface CategorySitemap {
  slug: string;
  sitemap: string;
}

const generateSitemap = async (): Promise<void> => {
  try {
    const baseUrl = SEO_CONFIG.baseUrl;

    // Fetch all data
    console.log('📡 Fetching products and categories...');
    const [productsResponse, categoriesData] = await Promise.all([
      fetchAllProducts(),
      fetchAllCategories()
    ]);

    // Debug logging
    console.log('Products response:', typeof productsResponse);
    console.log('Products response keys:', productsResponse ? Object.keys(productsResponse) : 'null');
    console.log('Categories data:', typeof categoriesData);
    console.log('Categories length:', Array.isArray(categoriesData) ? categoriesData.length : 'not array');

    // Handle different response structures
    const products = Array.isArray(productsResponse) 
      ? productsResponse 
      : productsResponse?.data || [];
    
    const categories = Array.isArray(categoriesData) 
      ? categoriesData 
      : [];

    console.log(`✅ Found ${products.length} products and ${categories.length} categories`);

    if (products.length === 0) {
      console.warn('⚠️ No products found! Check your API connection.');
    }

    if (categories.length === 0) {
      console.warn('⚠️ No categories found! Check your API connection.');
    }

    // Static pages with priority and change frequency
    const staticPages: SitemapPage[] = [
      {
        url: '',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: '1.0'
      },
      {
        url: '/account',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.6'
      },
      {
        url: '/privacy-policy',
        lastmod: new Date().toISOString(),
        changefreq: 'yearly',
        priority: '0.3'
      },
      {
        url: '/terms-of-service',
        lastmod: new Date().toISOString(),
        changefreq: 'yearly',
        priority: '0.3'
      },
      {
        url: '/privacy-policy-full',
        lastmod: new Date().toISOString(),
        changefreq: 'yearly',
        priority: '0.3'
      },
      {
        url: '/terms-of-service-full',
        lastmod: new Date().toISOString(),
        changefreq: 'yearly',
        priority: '0.3'
      }
    ];

    // Category pages
    const categoryPages: SitemapPage[] = categories
      .filter((category: Category) => category?.category_name)
      .map((category: Category) => {
        const slug = category.category_name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        return {
          url: `/category/${slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: '0.8'
        };
      });

    // Product pages
    const productPages: SitemapPage[] = products
      .filter((product: Product) => product?.product_name && product?.id)
      .map((product: Product) => {
        const categorySlug = product.categoryName
          ? product.categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          : 'uncategorized';
        
        const productSlug = `${product.product_name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')}_${product.id}`;

        return {
          url: `/product/${categorySlug}/${productSlug}`,
          lastmod: new Date(product.added_at || new Date()).toISOString(),
          changefreq: 'weekly',
          priority: '0.7',
          image: product.product_images?.[0] || null
        };
      });

    // Combine all pages
    const allPages = [...staticPages, ...categoryPages, ...productPages];

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${allPages
  .map((page) => {
    const imageTag = page.image 
      ? `    <image:image>
      <image:loc>${page.image}</image:loc>
      <image:title>${products.find(p => page.url.includes(p.id))?.product_name || 'Product Image'}</image:title>
    </image:image>`
      : '';

    return `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${imageTag ? '\n' + imageTag : ''}
  </url>`;
  })
  .join('\n')}
</urlset>`;

    // Generate category-specific sitemaps for large sites
    const categorySitemaps: CategorySitemap[] = categories
      .filter((category: Category) => category?.category_name)
      .map((category: Category) => {
        const categoryProducts = products.filter(p => p.categoryName === category.category_name);

        if (categoryProducts.length === 0) return null;

        const categorySlug = category.category_name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        const categoryPages: SitemapPage[] = categoryProducts.map((product: Product) => {
          const productSlug = `${product.product_name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')}_${product.id}`;

          return {
            url: `/product/${categorySlug}/${productSlug}`,
            lastmod: new Date(product.added_at || new Date()).toISOString(),
            changefreq: 'weekly',
            priority: '0.7',
            image: product.product_images?.[0] || null
          };
        });

        const categorySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${categoryPages
  .map((page) => {
    const imageTag = page.image 
      ? `    <image:image>
      <image:loc>${page.image}</image:loc>
      <image:title>${categoryProducts.find(p => page.url.includes(p.id))?.product_name || 'Product Image'}</image:title>
    </image:image>`
      : '';

    return `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${imageTag ? '\n' + imageTag : ''}
  </url>`;
  })
  .join('\n')}
</urlset>`;

        return { slug: categorySlug, sitemap: categorySitemap };
      })
      .filter((item): item is CategorySitemap => item !== null);

    // Create public directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    // Write main sitemap
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Main sitemap written');

    // Write category sitemaps
    categorySitemaps.forEach((catSitemap: CategorySitemap) => {
      fs.writeFileSync(
        path.join(publicDir, `sitemap-${catSitemap.slug}.xml`),
        catSitemap.sitemap
      );
    });
    console.log(`✅ ${categorySitemaps.length} category sitemaps written`);

    // Generate sitemap index if we have category sitemaps
    if (categorySitemaps.length > 0) {
      const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
${categorySitemaps
  .map((catSitemap: CategorySitemap) => `  <sitemap>
    <loc>${baseUrl}/sitemap-${catSitemap.slug}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`)
  .join('\n')}
</sitemapindex>`;

      fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
      console.log('✅ Sitemap index written');
    }

    console.log('\n🎉 Sitemap generation complete!');
    console.log(`📄 Main sitemap: ${allPages.length} URLs`);
    console.log(`📁 Category sitemaps: ${categorySitemaps.length}`);
    console.log(`📊 Breakdown: ${staticPages.length} static + ${categoryPages.length} categories + ${productPages.length} products\n`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
};

generateSitemap();


