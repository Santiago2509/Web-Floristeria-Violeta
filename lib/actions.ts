'use server'

import { revalidatePath } from 'next/cache'
import * as db from './db'
import { requireAdmin } from './auth'
import { GALLERY_CATEGORIES } from './gallery'
import type { Product } from '@/types'

const CATEGORIES: Product['category'][] = ['Ramos', 'Cajas', 'Eventos', 'Regalos']

// Todas las acciones verifican la sesión: las Server Actions son endpoints
// públicos y se pueden invocar aunque el usuario no vea el panel.

export async function adminAddProduct(formData: FormData) {
  await requireAdmin()
  const title = String(formData.get('title') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  const price = Number(formData.get('price'))
  const category = formData.get('category') as Product['category']
  if (!title || !Number.isFinite(price) || price < 0 || !CATEGORIES.includes(category)) {
    throw new Error('Datos del producto inválidos')
  }
  const imageUrl = formData.get('imageUrl') as string || `https://picsum.photos/seed/${Math.random()}/600/800`
  const isFeatured = formData.get('isFeatured') === 'on'
  const ocasionSugerida = formData.get('ocasionSugerida') as string || undefined

  await db.addProduct({
    title,
    description,
    price,
    category,
    imageUrl,
    ocasionSugerida,
    isFeatured
  })

  // Invalidar las páginas para que se actualicen al instante
  revalidatePath('/catalogo')
  revalidatePath('/admin/catalogo')
  revalidatePath('/')
}

export async function adminDeleteProduct(id: string) {
  await requireAdmin()
  await db.deleteProduct(id)
  revalidatePath('/catalogo')
  revalidatePath('/admin/catalogo')
  revalidatePath('/') // Por si era destacado
}

export async function adminToggleFeatured(id: string) {
  await requireAdmin()
  await db.toggleProductFeatured(id)
  revalidatePath('/catalogo')
  revalidatePath('/admin/catalogo')
  revalidatePath('/')
}

const MAX_BATCH = 50

// Subida múltiple: las fotos ya están en Cloudinary (subidas desde el navegador);
// aquí solo guardamos sus URLs en la galería.
export async function adminAddGalleryImages(
  items: { title: string; imageUrl: string }[],
  category: string
): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin()

  if (!GALLERY_CATEGORIES.includes(category)) return { ok: false, error: 'Categoría inválida.' }
  if (!Array.isArray(items) || items.length === 0) return { ok: false, error: 'No hay fotos para guardar.' }
  if (items.length > MAX_BATCH) return { ok: false, error: `Máximo ${MAX_BATCH} fotos por tanda.` }

  const images = items.map(item => ({
    title: String(item.title ?? '').trim().slice(0, 120),
    imageUrl: String(item.imageUrl ?? ''),
    category,
  }))
  if (images.some(img => !img.title)) return { ok: false, error: 'Todas las fotos necesitan un título.' }
  if (images.some(img => !img.imageUrl.startsWith('https://res.cloudinary.com/'))) {
    return { ok: false, error: 'Alguna foto no viene de Cloudinary.' }
  }

  const ok = await db.addGalleryImages(images)
  if (!ok) return { ok: false, error: 'No se pudieron guardar las fotos. Inténtalo de nuevo.' }

  revalidatePath('/galeria')
  revalidatePath('/admin/galeria')
  revalidatePath('/') // El Inicio muestra una selección de la galería
  return { ok: true }
}

export async function adminDeleteGalleryImage(id: string) {
  await requireAdmin()
  await db.deleteGalleryImage(id)
  revalidatePath('/galeria')
  revalidatePath('/admin/galeria')
  revalidatePath('/')
}

export async function adminSaveOccasion(nombre: string) {
  await requireAdmin()
  await db.addSavedOccasion(nombre)
  revalidatePath('/admin/catalogo')
}

export async function adminDeleteOccasion(nombre: string) {
  await requireAdmin()
  await db.deleteSavedOccasion(nombre)
  revalidatePath('/admin/catalogo')
}
