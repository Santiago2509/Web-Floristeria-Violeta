export interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  category: string // categoría principal (base en lib/catalog.ts; desde el panel se pueden crear más)
  extraCategories: string[] // categorías adicionales: el producto también aparece en ellas
  ocasionSugerida?: string // Ej: "Ideal para cumpleaños" (Fase 3)
  isFeatured: boolean
  createdAt: string
}

export interface GalleryImage {
  id: string
  title: string
  imageUrl: string
  category: string
  createdAt: string
}
