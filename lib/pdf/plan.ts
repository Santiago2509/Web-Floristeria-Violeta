import type { Product } from '@/types'
import { getUsedCategories, inCategory, sameCategory } from '@/lib/catalog'

// ============================================================================
// PLAN DEL CATÁLOGO PDF: qué categorías salen, en qué orden y cómo se reparten
// los productos en páginas de mosaico (sin "un producto por hoja").
// ============================================================================

export type Layout =
  | 'opener'   // apertura de categoría: panel con el título + hasta 2 productos
  | 'hero'     // 1 grande a la izquierda + 2 apilados a la derecha
  | 'hero-r'   // igual, en espejo
  | 'four'     // 4 columnas
  | 'two'      // 2 grandes lado a lado
  | 'one'      // 1 producto protagonista

export type PdfPage = { layout: Layout; category: string; products: Product[]; categoryCount: number }
export type PdfSection = { category: string; products: Product[]; firstPage: number }

export type CatalogPlan = {
  sections: PdfSection[]
  pages: PdfPage[]        // solo las páginas de productos (sin portada, índice ni contraportada)
  coverProduct?: Product
  totalProducts: number
}

// Páginas fijas antes de los productos: portada + índice
export const PAGES_BEFORE_PRODUCTS = 2

// Reparte los productos (después de la apertura) en páginas con distribuciones que se alternan
function chunk(products: Product[]): { layout: Layout; items: Product[] }[] {
  const out: { layout: Layout; items: Product[] }[] = []
  const rotation: Layout[] = ['hero', 'four', 'hero-r']
  let rest = [...products]
  let turn = 0
  while (rest.length > 0) {
    const n = rest.length
    let layout: Layout
    if (n === 1) layout = 'one'
    else if (n === 2) layout = 'two'
    else if (n === 3) layout = turn % 2 === 0 ? 'hero' : 'hero-r'
    else if (n === 4) layout = 'four'
    else if (n === 5) layout = 'hero' // deja 2 para un 'two' final
    else {
      layout = rotation[turn % rotation.length]
      if (layout === 'four' && n - 4 === 1) layout = 'hero' // evita dejar 1 suelto
    }
    const size = layout === 'four' ? 4 : layout === 'two' ? 2 : layout === 'one' ? 1 : 3
    out.push({ layout, items: rest.slice(0, size) })
    rest = rest.slice(size)
    turn++
  }
  return out
}

export function planCatalog(products: Product[], selected: string[]): CatalogPlan {
  const used = getUsedCategories(products)
  const categories = selected.length ? used.filter(c => selected.some(s => sameCategory(s, c))) : used

  const sections: PdfSection[] = []
  const pages: PdfPage[] = []

  for (const category of categories) {
    // Destacados primero; el resto conserva el orden (más recientes primero)
    const items = products
      .filter(p => inCategory(p, category))
      .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
    if (items.length === 0) continue

    sections.push({ category, products: items, firstPage: PAGES_BEFORE_PRODUCTS + pages.length + 1 })
    const openerCount = Math.min(2, items.length)
    pages.push({ layout: 'opener', category, products: items.slice(0, openerCount), categoryCount: items.length })
    for (const { layout, items: group } of chunk(items.slice(openerCount))) {
      pages.push({ layout, category, products: group, categoryCount: items.length })
    }
  }

  const all = sections.flatMap(s => s.products)
  const unique = all.filter((p, i) => all.findIndex(o => o.id === p.id) === i)

  return {
    sections,
    pages,
    coverProduct: unique.find(p => p.isFeatured) ?? unique[0],
    totalProducts: unique.length,
  }
}
