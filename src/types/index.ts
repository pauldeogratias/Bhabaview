// src/types/index.ts
export interface Product {
  id: string
  productId: string
  product_name: string
  price: number
  description: string
  discount: number
  details: string
  tier_pricing: string[]
  product_images: string[]
  mobile_number: string
  isAvailable: boolean
  moq: number
  added_at: string
  vendorId: string
  vendorName: string
  categoryId: string
  categoryName: string
}

export interface Vendor {
  id: string
  store_name: string
  store_logo: string
}

export interface Category {
  id: string
  name: string
}
