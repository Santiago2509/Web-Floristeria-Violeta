import { Product, GalleryImage } from '@/types'
import { supabase } from './supabase'

// ============================================================================
// CAPA DE ACCESO A DATOS CONECTADA A SUPABASE
// ============================================================================

// --- PRODUCTOS ---

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  
  // Mapeamos los campos de la BD a nuestros tipos en TypeScript
  return data.map(row => ({
    id: row.id,
    title: row.title,
    description: row.description,
    price: row.price,
    imageUrl: row.image_url,
    category: row.category as any,
    isFeatured: row.is_featured,
    createdAt: row.created_at
  }))
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
  
  return data.map(row => ({
    id: row.id,
    title: row.title,
    description: row.description,
    price: row.price,
    imageUrl: row.image_url,
    category: row.category as any,
    isFeatured: row.is_featured,
    createdAt: row.created_at
  }))
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error || !data) return null
  
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    price: data.price,
    imageUrl: data.image_url,
    category: data.category as any,
    isFeatured: data.is_featured,
    createdAt: data.created_at
  }
}

export async function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image_url: product.imageUrl,
        is_featured: product.isFeatured
      }
    ])
    .select()
    .single()
    
  if (error) {
    console.error('Error adding product:', error)
    return null
  }
  
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    price: data.price,
    imageUrl: data.image_url,
    category: data.category as any,
    isFeatured: data.is_featured,
    createdAt: data.created_at
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    
  if (error) {
    console.error('Error deleting product:', error)
    return false
  }
  return true
}

export async function toggleProductFeatured(id: string): Promise<boolean> {
  // Primero obtenemos el estado actual
  const { data: current } = await supabase
    .from('products')
    .select('is_featured')
    .eq('id', id)
    .single()
    
  if (!current) return false
  
  // Luego lo invertimos
  const { error } = await supabase
    .from('products')
    .update({ is_featured: !current.is_featured })
    .eq('id', id)
    
  if (error) {
    console.error('Error toggling feature:', error)
    return false
  }
  
  return true
}


// --- GALERÍA ---

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })
    
  if (error) {
    console.error('Error fetching gallery:', error)
    return []
  }
  
  return data.map(row => ({
    id: row.id,
    title: row.title,
    category: row.category,
    imageUrl: row.image_url,
    createdAt: row.created_at
  }))
}

export async function addGalleryImage(image: Omit<GalleryImage, 'id' | 'createdAt'>): Promise<GalleryImage | null> {
  const { data, error } = await supabase
    .from('gallery')
    .insert([
      {
        title: image.title,
        category: image.category,
        image_url: image.imageUrl
      }
    ])
    .select()
    .single()
    
  if (error) {
    console.error('Error adding gallery image:', error)
    return null
  }
  
  return {
    id: data.id,
    title: data.title,
    category: data.category,
    imageUrl: data.image_url,
    createdAt: data.created_at
  }
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id)
    
  if (error) {
    console.error('Error deleting gallery image:', error)
    return false
  }
  return true
}
