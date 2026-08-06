export interface Product {
  id: string
  title: string
  description: string
  price: number
  imageUrl: string
  category: 'Ramos' | 'Cajas' | 'Eventos' | 'Regalos'
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
