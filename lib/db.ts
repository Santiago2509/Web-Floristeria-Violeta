import { Product, GalleryImage } from '@/types'

// ============================================================================
// CAPA DE ACCESO A DATOS (Data Access Layer)
// Todo está envuelto en promesas (async) para simular la latencia de red.
// Cuando conectemos Supabase, solo cambiaremos la lógica interna de estas funciones,
// ¡y el resto de la web seguirá funcionando intacta!
// ============================================================================

// --- BASE DE DATOS EN MEMORIA (Simulación) ---
let mockProducts: Product[] = [
  {
    id: '1',
    title: 'Ramo Primaveral',
    description: 'Una explosión de colores con flores de temporada.',
    price: 120000,
    imageUrl: 'https://picsum.photos/seed/ramo1/600/800',
    category: 'Ramos',
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Caja Rosas Premium',
    description: 'Caja negra elegante con 24 rosas rojas seleccionadas.',
    price: 180000,
    imageUrl: 'https://picsum.photos/seed/caja1/600/800',
    category: 'Cajas',
    isFeatured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Arreglo Imperial',
    description: 'Majestuoso arreglo para centros de mesa o grandes eventos.',
    price: 250000,
    imageUrl: 'https://picsum.photos/seed/evento1/600/800',
    category: 'Eventos',
    isFeatured: false,
    createdAt: new Date().toISOString()
  }
]

let mockGallery: GalleryImage[] = [
  {
    id: '1',
    title: 'Boda de Ensueño',
    imageUrl: 'https://picsum.photos/seed/boda1/800/800',
    category: 'Bodas',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Aniversario Especial',
    imageUrl: 'https://picsum.photos/seed/aniv1/800/800',
    category: 'Aniversarios',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Detalle Corporativo',
    imageUrl: 'https://picsum.photos/seed/corp1/800/800',
    category: 'Corporativo',
    createdAt: new Date().toISOString()
  }
]

// --- PRODUCTOS ---

export async function getProducts(): Promise<Product[]> {
  // Simular latencia de red de Supabase
  await new Promise(resolve => setTimeout(resolve, 500))
  return [...mockProducts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 400))
  return mockProducts.filter(p => p.isFeatured)
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockProducts.find(p => p.id === id) || null
}

export async function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  await new Promise(resolve => setTimeout(resolve, 600))
  const newProduct: Product = {
    ...product,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString()
  }
  mockProducts.push(newProduct)
  return newProduct
}

export async function deleteProduct(id: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 400))
  const initialLength = mockProducts.length
  mockProducts = mockProducts.filter(p => p.id !== id)
  return mockProducts.length < initialLength
}

export async function toggleProductFeatured(id: string): Promise<Product | null> {
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = mockProducts.findIndex(p => p.id === id)
  if (index === -1) return null
  
  mockProducts[index].isFeatured = !mockProducts[index].isFeatured
  return mockProducts[index]
}


// --- GALERÍA ---

export async function getGalleryImages(): Promise<GalleryImage[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return [...mockGallery].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function addGalleryImage(image: Omit<GalleryImage, 'id' | 'createdAt'>): Promise<GalleryImage> {
  await new Promise(resolve => setTimeout(resolve, 600))
  const newImage: GalleryImage = {
    ...image,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString()
  }
  mockGallery.push(newImage)
  return newImage
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 400))
  const initialLength = mockGallery.length
  mockGallery = mockGallery.filter(img => img.id !== id)
  return mockGallery.length < initialLength
}
