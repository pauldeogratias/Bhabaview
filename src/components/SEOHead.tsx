// 3. SEO and Structured Data Component
// src/components/SEOHead.tsx
import Head from 'next/head'
import { useRouter } from 'next/router'

interface Product {
  id: string
  product_name: string
  price: number
  description: string
  product_images: string[]
  categoryName: string
  vendorName: string
  discount: number
  isAvailable: boolean
}

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  product?: Product
  canonical?: string
  noIndex?: boolean
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Bhaba Marketplace - Shop Online in Tanzania",
  description = "Discover the best products at affordable prices in Tanzania. Shop electronics, clothing, shoes and more from verified vendors.",
  keywords = ["Tanzania shopping", "online marketplace", "electronics", "clothing", "wholesale"],
  product,
  canonical,
  noIndex = false
}) => {
  const router = useRouter()
  const baseUrl = "https://yourstore.com" // Replace with your actual domain
  const currentUrl = canonical || `${baseUrl}${router.asPath}`

  // Generate product-specific SEO data
  const productSEO = product ? {
    title: `${product.product_name} - ${product.categoryName} | Bhaba Marketplace`,
    description: `Buy ${product.product_name} at ${formatPrice(product.price)} in Tanzania. ${product.description}`,
    keywords: [product.product_name, product.categoryName, product.vendorName, "Tanzania", "buy online"],
    price: product.discount > 0 ? 
      product.price * (1 - product.discount / 100) : 
      product.price
  } : null

  const finalTitle = productSEO?.title || title
  const finalDescription = productSEO?.description || description
  const finalKeywords = productSEO?.keywords || keywords

  // Structured data for products
  const productStructuredData = product ? {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.product_name,
    "description": product.description,
    "image": product.product_images,
    "category": product.categoryName,
    "brand": {
      "@type": "Brand",
      "name": product.vendorName
    },
    "offers": {
      "@type": "Offer",
      "price": productSEO?.price,
      "priceCurrency": "TZS",
      "availability": product.isAvailable ? 
        "https://schema.org/InStock" : 
        "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": product.vendorName
      }
    }
  } : null

  // Organization structured data
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bhaba Marketplace",
    "url": baseUrl,
    "logo": `${baseUrl}/Bhaba_logo.png`,
    "sameAs": [
      "https://www.facebook.com/bhabamarketplace",
      "https://www.instagram.com/bhabamarketplace"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+255-618-205-278",
      "contactType": "customer service",
      "availableLanguage": ["English", "Swahili"]
    }
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={product ? "product" : "website"} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Bhaba Marketplace" />
      <meta property="og:locale" content="en_TZ" />
      {product?.product_images?.[0] && (
        <meta property="og:image" content={product.product_images[0]} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {product?.product_images?.[0] && (
        <meta name="twitter:image" content={product.product_images[0]} />
      )}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData)
        }}
      />
      
      {productStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productStructuredData)
          }}
        />
      )}

      {/* Additional Meta Tags */}
      <meta name="author" content="Bhaba Limited" />
      <meta name="copyright" content="Bhaba Limited" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Geo Tags for Tanzania */}
      <meta name="geo.region" content="TZ" />
      <meta name="geo.country" content="Tanzania" />
      <meta name="geo.placename" content="Dar es Salaam" />
    </Head>
  )
}

// Helper function for price formatting
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 0,
  }).format(price)
}

export default SEOHead