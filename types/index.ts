export interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  category: string // categorías base en lib/catalog.ts; desde el panel se pueden crear más
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
