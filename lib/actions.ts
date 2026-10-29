'use server'

import { revalidatePath } from 'next/cache'
import * as db from './db'
import { requireAdmin } from './auth'
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

export async function adminAddGalleryImage(formData: FormData) {
  await requireAdmin()
  const title = String(formData.get('title') ?? '').trim()
  const category = String(formData.get('category') ?? '').trim()
  if (!title || !category) throw new Error('Datos de la imagen inválidos')
  const imageUrl = formData.get('imageUrl') as string || `https://picsum.photos/seed/${Math.random()}/800/800`

  await db.addGalleryImage({
    title,
    category,
    imageUrl
  })

  revalidatePath('/galeria')
  revalidatePath('/admin/galeria')
}

export async function adminDeleteGalleryImage(id: string) {
  await requireAdmin()
  await db.deleteGalleryImage(id)
  revalidatePath('/galeria')
  revalidatePath('/admin/galeria')
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
