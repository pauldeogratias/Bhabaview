// src/utils/api.ts
// const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";
 const API_BASE = "https://bhabaapi.onrender.com";
//   const isBrowser = typeof window !== 'undefined';
// const isLocalhost = isBrowser && window.location.hostname === 'localhost';

//   const API_BASE = (
//   isLocalhost
//     ? 'http://localhost:5000'
//     : 'http://192.168.1.165:5000'
// )

export interface Product {
  id: string;
  productId: string;
  product_name: string;
  price: number;
  description: string;
  discount: number;
  details: string;
  tier_pricing: string[];
  product_images: string[];
  mobile_number: string;
  isAvailable: boolean;
  moq: number;
  added_at: string;
  vendorId: string;
  vendorName: string;
  categoryId: string;
  categoryName: string;
}

export interface Vendor {
  id: string;
  store_name: string;
  store_logo: string;
}

export interface Category {
  id: string;
  category_name: string;
}

export interface SearchParams {
  q?: string;
  limit?: number;
  offset?: number;
  category?: string;
  vendor?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'discount';
}

export interface SearchResult {
  hits: Product[];
  totalHits: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  // Add any other known properties here with their proper types
  // If you need to allow additional dynamic properties, use a more specific type than 'any'
  [x: string]: unknown; // Changed from 'any' to 'unknown'
}

/**
 * Handles API responses with proper error handling
 */
const handleResponse = async <T = unknown>(response: Response): Promise<T> => {
  try {
    if (!response.ok) {
      const text = await response.text()
      try {
        const error = JSON.parse(text)
        throw new Error(error.message || `Request failed with status ${response.status}`)
      } catch {
        throw new Error(text || `Request failed with status ${response.status}`)
      }
    }

    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      return response.json()
    }
    
    return response.text() as unknown as T
  } catch (error) {
    console.error('Error handling response:', error)
    throw error
  }
}

/**
 * Fetches a single product by ID
 */
export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_BASE}/products/${id}`);
  return handleResponse<Product>(response);
};

/**
 * Fetches all products with pagination
 */
export const fetchAllProducts = async (
  // limit = 20,
  limit = 10000,
  offset = 0
): Promise<PaginatedResponse<Product>> => {
  const response = await fetch(
    `${API_BASE}/products?limit=${limit}&offset=${offset}`
  );
  return handleResponse<PaginatedResponse<Product>>(response);
};

/**
 * Fetches all vendors
 */
export const fetchVendors = async (): Promise<Vendor[]> => {
  const response = await fetch(`${API_BASE}/vendors`);
  return handleResponse<Vendor[]>(response);
};

/**
 * Fetches a single vendor by ID
 */
export const fetchVendorById = async (vendorId: string): Promise<Vendor> => {
  const response = await fetch(`${API_BASE}/vendors/${vendorId}`);
  return handleResponse<Vendor>(response);
};

/**
 * Fetches categories for a specific vendor
 */
export const fetchVendorCategories = async (
  vendorId: string
): Promise<Category[]> => {
  const response = await fetch(`${API_BASE}/vendors/${vendorId}/categories`);
  return handleResponse<Category[]>(response);
};

/**
 * Fetches products for a specific vendor
 */
export const fetchVendorProducts = async (
  vendorId: string,
  limit = 20,
  offset = 0
): Promise<PaginatedResponse<Product>> => {
  const response = await fetch(
    `${API_BASE}/vendors/${vendorId}/products?limit=${limit}&offset=${offset}`
  );
  return handleResponse<PaginatedResponse<Product>>(response);
};

/**
 * Fetches products by category
 */
export const fetchProductsByCategory = async (
  categoryId: string,
  limit = 20,
  offset = 0
): Promise<PaginatedResponse<Product>> => {
  const response = await fetch(
    `${API_BASE}/categories/${categoryId}/products?limit=${limit}&offset=${offset}`
  );
  return handleResponse<PaginatedResponse<Product>>(response);
};

/**
 * Fetches all categories
 */
export const fetchAllCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE}/categories`);
  return handleResponse<Category[]>(response);
};

/**
 * Searches products with advanced filters
 */
export const searchProducts = async (
  params: SearchParams
): Promise<SearchResult> => {
  const queryParams = new URLSearchParams();

  // Add all defined parameters to the query
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  const response = await fetch(`${API_BASE}/search?${queryParams.toString()}`);
  return handleResponse<SearchResult>(response);
};

/**
 * Client-side fetch with timeout
 */
export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout = 8000
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    // Fix the error message concatenation
    throw new Error(`Request timed out after ${timeout}ms: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Slugify a product name for URLs
 */
// export const slugify = (text: string): string => {
//   return text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/(^-|-$)/g, '');
// };


// export const slugify = (text: string, category?: string): string => {
//   const baseSlug = text
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/(^-|-$)/g, '');
  
//   if (category) {
//     const categorySlug = category
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/(^-|-$)/g, '');
//     return `${categorySlug}/${baseSlug}`;
//   }
  
//   return baseSlug;
// };


export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
}

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS'
  }).format(amount);
};

/**
 * Transform Firebase URL to ImageKit URL
 */
export const transformImageUrl = (firebaseUrl: string): string => {
  if (!firebaseUrl) return '';
  
  try {
    const urlObj = new URL(firebaseUrl);
    const encodedPath = urlObj.pathname.split('/o/')[1];
    if (!encodedPath) return firebaseUrl;

    const decodedPath = decodeURIComponent(encodedPath);
    return `https://ik.imagekit.io/3n0rrhtkz/firebase_files/${decodedPath}`;
  } catch (error) {
    console.error('Error transforming image URL:', error);
    return firebaseUrl;
  }
};



export async function fetchWithRetry<T>(url: string, retries = 3): Promise<T> {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json() as T
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return fetchWithRetry<T>(url, retries - 1)
    }
    console.error(`Failed to fetch ${url} after ${retries} retries`)
    throw error
  }
}
