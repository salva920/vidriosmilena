export interface Product {
  id: string
  name: string
  slug: string
  category: string
  categorySlug: string
  price: number
  originalPrice?: number
  discount?: number
  sku: string
  images: string[]
  description: string
  specifications?: ProductSpecification[]
  technicalSpecs?: TechnicalSpec[]
  installation?: string
  regulations?: string
  dataSheet?: string
  stock: 'available' | 'limited' | 'out-of-stock'
  tags?: string[]
  measurements?: ProductMeasurement[]
  accessories?: ProductAccessory[]
  featured?: boolean
  exclusiveDiscount?: boolean
}

export interface ProductSpecification {
  label: string
  value: string
}

export interface TechnicalSpec {
  name: string
  value: string
}

export interface ProductMeasurement {
  id: string
  label: string
  value: string
  price?: number
}

export interface ProductAccessory {
  id: string
  name: string
  originalPrice: number
  price: number
  sku: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedMeasurement?: string
  selectedAccessories?: string[]
}

export interface FilterOptions {
  priceRange: [number, number]
  typology?: string[]
  hardwareFinish?: string[]
  glassFinish?: string[]
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest'
}

