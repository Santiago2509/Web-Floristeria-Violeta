import type { Product } from '@/types'

// Categorías base del catálogo. Desde el panel se pueden crear más:
// cualquier categoría usada por algún producto aparece automáticamente en la web.
export const DEFAULT_CATEGORIES = ['Ramos', 'Cajas', 'Eventos', 'Regalos']

export const MAX_CATEGORY_LENGTH = 40

/** "  rosas   PRESERVADAS " -> "Rosas preservadas" */
export function normalizeCategory(name: string): string {
  const clean = name.trim().replace(/\s+/g, ' ').slice(0, MAX_CATEGORY_LENGTH)
  if (!clean) return ''
  return clean.charAt(0).toLocaleUpperCase('es') + clean.slice(1).toLocaleLowerCase('es')
}

/** Categorías base + las que usan los productos (sin duplicados, base primero). */
export function getCategories(products: Pick<Product, 'category'>[]): string[] {
  const seen = new Map<string, string>()
  for (const name of [...DEFAULT_CATEGORIES, ...products.map(p => p.category)]) {
    const label = normalizeCategory(name ?? '')
    const key = label.toLocaleLowerCase('es')
    if (label && !seen.has(key)) seen.set(key, label)
  }
  return [...seen.values()]
}

/** Categorías que tienen al menos un producto, en el mismo orden que getCategories. */
export function getUsedCategories(products: Pick<Product, 'category'>[]): string[] {
  const used = new Set(products.map(p => normalizeCategory(p.category ?? '').toLocaleLowerCase('es')))
  return getCategories(products).filter(c => used.has(c.toLocaleLowerCase('es')))
}

export function sameCategory(a: string, b: string): boolean {
  return normalizeCategory(a).toLocaleLowerCase('es') === normalizeCategory(b).toLocaleLowerCase('es')
}

/** Ocasiones (etiquetas) de un producto como lista. */
export function getOccasions(product: Pick<Product, 'ocasionSugerida'>): string[] {
  return (product.ocasionSugerida ?? '').split(',').map(t => t.trim()).filter(Boolean)
}
