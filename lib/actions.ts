'use server'

import { revalidatePath } from 'next/cache'
import * as db from './db'

export async function adminAddProduct(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const price = Number(formData.get('price'))
  const category = formData.get('category') as any
  const imageUrl = formData.get('imageUrl') as string || `https://picsum.photos/seed/${Math.random()}/600/800`

  await db.addProduct({
    title,
    description,
    price,
    category,
    imageUrl,
    isFeatured: false
  })

  // Invalidar las páginas para que se actualicen al instante
  revalidatePath('/catalogo')
  revalidatePath('/admin/catalogo')
}

export async function adminDeleteProduct(id: string) {
  await db.deleteProduct(id)
  revalidatePath('/catalogo')
  revalidatePath('/admin/catalogo')
  revalidatePath('/') // Por si era destacado
}

export async function adminToggleFeatured(id: string) {
  await db.toggleProductFeatured(id)
  revalidatePath('/catalogo')
  revalidatePath('/admin/catalogo')
  revalidatePath('/')
}

export async function adminAddGalleryImage(formData: FormData) {
  const title = formData.get('title') as string
  const category = formData.get('category') as string
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
  await db.deleteGalleryImage(id)
  revalidatePath('/galeria')
  revalidatePath('/admin/galeria')
}
