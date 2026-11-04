'use server'

import { revalidatePath } from 'next/cache'
import * as db from './db'
import { requireAdmin } from './auth'
import { GALLERY_CATEGORIES } from './gallery'
import { inCategory, normalizeCategory, sameCategory } from './catalog'

// Todas las acciones verifican la sesión: las Server Actions son endpoints
// públicos y se pueden invocar aunque el usuario no vea el panel.

export type ProductFormState = { ok?: boolean; error?: string; message?: string }

// Lee y valida los campos del formulario de producto (crear y editar)
function parseProductForm(formData: FormData): { data?: db.ProductUpdate; error?: string } {
  const title = String(formData.get('title') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  const price = Number(formData.get('price'))
  const category = normalizeCategory(String(formData.get('category') ?? ''))
  const imageUrl = String(formData.get('imageUrl') ?? '')
  const extraCategories = String(formData.get('extraCategories') ?? '')
    .split(',')
    .map(normalizeCategory)
    .filter(c => c && c.toLocaleLowerCase('es') !== category.toLocaleLowerCase('es'))
    .filter((c, i, all) => all.findIndex(o => o.toLocaleLowerCase('es') === c.toLocaleLowerCase('es')) === i)
    .slice(0, 6)

  if (!title) return { error: 'Escribe el nombre del arreglo.' }
  if (!Number.isFinite(price) || price < 0) return { error: 'El precio no es válido.' }
  if (!category) return { error: 'Elige la categoría principal.' }
  if (!imageUrl) return { error: 'Sube la foto del producto.' }

  return {
    data: {
      title,
      description,
      price,
      category,
      extraCategories,
      imageUrl,
      ocasionSugerida: String(formData.get('ocasionSugerida') ?? '') || undefined,
      isFeatured: formData.get('isFeatured') === 'on',
    },
  }
}

const MISSING_COLUMN_HINT = 'Para guardar categorías adicionales falta crear la columna en Supabase (ver README: categorias_extra).'

function revalidateCatalog(id?: string) {
  revalidatePath('/catalogo')
  if (id) revalidatePath(`/catalogo/${id}`)
  revalidatePath('/admin/catalogo')
  revalidatePath('/')
}

export async function adminAddProduct(_prev: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdmin()
  const { data, error } = parseProductForm(formData)
  if (!data) return { error }

  const saved = await db.addProduct(data)
  if (!saved) {
    return { error: data.extraCategories.length ? MISSING_COLUMN_HINT : 'No se pudo guardar el producto en la base de datos. Inténtalo de nuevo.' }
  }

  revalidateCatalog()
  return { ok: true, message: `«${data.title}» se añadió al catálogo en ${[data.category, ...data.extraCategories].join(', ')}.` }
}

export async function adminUpdateProduct(id: string, _prev: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdmin()
  const { data, error } = parseProductForm(formData)
  if (!data) return { error }

  const current = await db.getProductById(id)
  if (!current) return { error: 'Ese producto ya no existe.' }

  const result = await db.updateProduct(id, data, current.extraCategories.length > 0)
  if (!result.ok) {
    return { error: /categorias_extra/.test(result.error ?? '') ? MISSING_COLUMN_HINT : 'No se pudieron guardar los cambios. Inténtalo de nuevo.' }
  }

  revalidateCatalog(id)
  return { ok: true, message: 'Cambios guardados.' }
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

// --- CATEGORÍAS (renombrar / eliminar) ---
// Las categorías viven en los productos: cambiar o quitar una categoría = actualizar esos productos.

export type CategoryActionState = { ok?: boolean; error?: string; message?: string }

// `to`: categoría que reemplaza a `from`. Con `keepWhereExtra` (renombrar) también sustituye donde era adicional;
// al eliminar solo se usa para los productos que la tenían como principal.
async function rewriteCategory(from: string, to: string | null, keepWhereExtra: boolean): Promise<{ changed: number; failed: number }> {
  const products = await db.getProducts()
  let changed = 0
  let failed = 0
  for (const p of products) {
    if (!inCategory(p, from)) continue
    const isPrimary = sameCategory(p.category, from)
    let extras = p.extraCategories.filter(c => !sameCategory(c, from))
    let primary = p.category
    if (to) {
      if (isPrimary) primary = to
      else if (keepWhereExtra && !sameCategory(p.category, to) && !extras.some(c => sameCategory(c, to))) extras = [...extras, to]
    } else if (isPrimary) {
      // eliminar: si era la principal, pasa a la primera adicional (o la de reemplazo se fija antes)
      primary = extras[0] ?? ''
      extras = extras.slice(1)
    }
    extras = extras.filter(c => !sameCategory(c, primary))
    if (!primary) { failed++; continue }
    const { id, createdAt, ...rest } = p
    void createdAt
    const result = await db.updateProduct(id, { ...rest, category: primary, extraCategories: extras }, p.extraCategories.length > 0)
    if (result.ok) changed++
    else failed++
  }
  return { changed, failed }
}

export async function adminRenameCategory(_prev: CategoryActionState, formData: FormData): Promise<CategoryActionState> {
  await requireAdmin()
  const from = normalizeCategory(String(formData.get('from') ?? ''))
  const to = normalizeCategory(String(formData.get('to') ?? ''))
  if (!from || !to) return { error: 'Escribe el nuevo nombre.' }
  if (from === to) return { error: 'El nombre es el mismo.' }
  const { changed, failed } = await rewriteCategory(from, to, true)
  revalidateCatalog()
  if (failed) return { error: `Se cambiaron ${changed} productos, pero ${failed} no se pudieron actualizar. Inténtalo de nuevo.` }
  return { ok: true, message: `«${from}» ahora se llama «${to}» (${changed} ${changed === 1 ? 'producto' : 'productos'}).` }
}

export async function adminDeleteCategory(_prev: CategoryActionState, formData: FormData): Promise<CategoryActionState> {
  await requireAdmin()
  const name = normalizeCategory(String(formData.get('name') ?? ''))
  const replacement = normalizeCategory(String(formData.get('replacement') ?? ''))
  if (!name) return { error: 'Categoría inválida.' }

  const products = await db.getProducts()
  const needsReplacement = products.some(p => sameCategory(p.category, name) && p.extraCategories.filter(c => !sameCategory(c, name)).length === 0)
  if (needsReplacement && !replacement) {
    return { error: 'Algunos productos solo tienen esta categoría: elige a cuál pasan.' }
  }
  if (replacement && sameCategory(replacement, name)) return { error: 'Elige una categoría distinta.' }

  const { changed, failed } = await rewriteCategory(name, replacement || null, false)
  revalidateCatalog()
  if (failed) return { error: `Se actualizaron ${changed} productos, pero ${failed} no se pudieron cambiar. Inténtalo de nuevo.` }
  return { ok: true, message: `Categoría «${name}» eliminada${changed ? ` (${changed} ${changed === 1 ? 'producto actualizado' : 'productos actualizados'})` : ''}.` }
}
