import type { Product } from '@/types'

// Categorías base del catálogo. Desde el panel se pueden crear más:
// cualquier categoría usada por algún producto aparece automáticamente en la web.
export const DEFAULT_CATEGORIES = ['Ramos', 'Cajas', 'Regalos', 'Preservadas']

export const MAX_CATEGORY_LENGTH = 40

/** "  rosas   PRESERVADAS " -> "Rosas preservadas" */
export function normalizeCategory(name: string): string {
  const clean = name.trim().replace(/\s+/g, ' ').slice(0, MAX_CATEGORY_LENGTH)
  if (!clean) return ''
  return clean.charAt(0).toLocaleUpperCase('es') + clean.slice(1).toLocaleLowerCase('es')
}

type WithCategories = Pick<Product, 'category'> & Partial<Pick<Product, 'extraCategories'>>

/** Todas las categorías de un producto: la principal primero y luego las adicionales. */
export function productCategories(product: WithCategories): string[] {
  const all = [product.category, ...(product.extraCategories ?? [])].map(normalizeCategory).filter(Boolean)
  return all.filter((c, i) => all.findIndex(o => o.toLocaleLowerCase('es') === c.toLocaleLowerCase('es')) === i)
}

/** ¿El producto pertenece a esa categoría (principal o adicional)? */
export function inCategory(product: WithCategories, category: string): boolean {
  return productCategories(product).some(c => sameCategory(c, category))
}

/** Categorías base + las que usan los productos (sin duplicados, base primero). */
export function getCategories(products: WithCategories[]): string[] {
  const seen = new Map<string, string>()
  for (const name of [...DEFAULT_CATEGORIES, ...products.flatMap(productCategories)]) {
    const label = normalizeCategory(name ?? '')
    const key = label.toLocaleLowerCase('es')
    if (label && !seen.has(key)) seen.set(key, label)
  }
  return [...seen.values()]
}

/** Categorías que tienen al menos un producto, en el mismo orden que getCategories. */
export function getUsedCategories(products: WithCategories[]): string[] {
  const used = new Set(products.flatMap(productCategories).map(c => c.toLocaleLowerCase('es')))
  return getCategories(products).filter(c => used.has(c.toLocaleLowerCase('es')))
}

export function sameCategory(a: string, b: string): boolean {
  return normalizeCategory(a).toLocaleLowerCase('es') === normalizeCategory(b).toLocaleLowerCase('es')
}

/** Ocasiones (etiquetas) de un producto como lista. */
export function getOccasions(product: Pick<Product, 'ocasionSugerida'>): string[] {
  return (product.ocasionSugerida ?? '').split(',').map(t => t.trim()).filter(Boolean)
}
