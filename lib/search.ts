import type { Product } from '@/types'
import { getOccasions } from './catalog'

// ============================================================================
// BÚSQUEDA INTELIGENTE DEL CATÁLOGO (en el navegador, sin servicios externos)
// - Ignora tildes, mayúsculas y signos ("tulipan" = "Tulipán")
// - Singular/plural ("rosa" = "rosas", "flor" = "flores")
// - Tolera errores de escritura ("girasoels" ≈ "girasoles")
// - Sinónimos de floristería ("cumple" → cumpleaños, "mamá" → madre…)
// - Puntúa por relevancia: nombre > categoría/ocasión > descripción
// ============================================================================

const STOPWORDS = new Set(['de', 'del', 'la', 'las', 'el', 'los', 'un', 'una', 'unos', 'unas', 'y', 'o', 'para', 'con', 'en', 'por', 'a', 'al', 'mi', 'su', 'que', 'quiero', 'busco'])

// Cada grupo: palabras que el cliente puede escribir y que significan lo mismo
const SYNONYM_GROUPS: string[][] = [
  ['cumpleanos', 'cumple', 'cumpleano', 'birthday'],
  ['madre', 'mama', 'mami', 'madres'],
  ['amor', 'novia', 'novio', 'enamorados', 'valentin', 'romantico', 'romantica', 'pareja', 'esposa', 'esposo'],
  ['aniversario', 'aniversarios'],
  ['boda', 'bodas', 'matrimonio', 'novias'],
  ['condolencia', 'condolencias', 'funeral', 'funebre', 'pesame', 'luto'],
  ['grado', 'grados', 'graduacion'],
  ['ramo', 'ramos', 'bouquet', 'buque'],
  ['caja', 'cajas', 'box'],
  ['regalo', 'regalos', 'detalle', 'sorpresa'],
  ['preservada', 'preservadas', 'eterna', 'eternas', 'cupula', 'cristal'],
  ['girasol', 'girasoles'],
  ['tulipan', 'tulipanes'],
  ['rosa', 'rosas'],
  ['globo', 'globos'],
  ['rojo', 'roja', 'rojos', 'rojas', 'rubi'],
  ['amarillo', 'amarilla', 'amarillos', 'amarillas', 'dorado', 'dorada'],
  ['rosado', 'rosada', 'rosados', 'rosadas', 'rosa palo'],
  ['blanco', 'blanca', 'blancos', 'blancas'],
  ['morado', 'morada', 'lila', 'violeta', 'lavanda'],
]

// Palabras genéricas: ayudan si aparecen, pero no descartan un producto si faltan
const SOFT_WORDS = new Set(['flor', 'flores', 'arreglo', 'arreglos', 'floral', 'florales', 'bonito', 'bonita', 'lindo', 'linda', 'hermoso', 'hermosa'])

const SYNONYMS = new Map<string, string[]>()
for (const group of SYNONYM_GROUPS) for (const word of group) SYNONYMS.set(word, group)

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9ñ\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Plural simple del español: "rosas" -> "rosa", "flores" -> "flor"
function stem(word: string): string {
  if (word.length > 4 && word.endsWith('es')) return word.slice(0, -2)
  if (word.length > 3 && word.endsWith('s')) return word.slice(0, -1)
  return word
}

function tokenize(text: string): string[] {
  return normalizeText(text).split(' ').filter(w => w && !STOPWORDS.has(w))
}

// Distancia de Levenshtein con corte temprano
function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const curr = [i]
    let rowMin = i
    for (let j = 1; j <= b.length; j++) {
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
      rowMin = Math.min(rowMin, curr[j])
    }
    if (rowMin > max) return max + 1
    prev = curr
  }
  return prev[b.length]
}

// ¿Qué tan bien coincide una palabra buscada con una palabra del producto? (0 = nada, 1 = exacta)
function wordMatch(query: string, word: string, fuzzy: boolean): number {
  if (query === word) return 1
  const qs = stem(query), ws = stem(word)
  if (qs === ws) return 0.95
  if (word.startsWith(query) && query.length >= 3) return 0.85 // búsqueda mientras se escribe
  if (fuzzy && query.length >= 5) {
    const allowed = query.length >= 7 ? 2 : 1
    if (editDistance(qs, ws, allowed) <= allowed) return 0.7
  }
  return 0
}

// Variantes de una palabra buscada: ella misma + sinónimos
function variants(token: string): string[] {
  return SYNONYMS.get(token) ?? SYNONYMS.get(stem(token)) ?? [token]
}

type Indexed = { product: Product; title: string[]; meta: string[]; body: string[] }

export function indexProducts(products: Product[]): Indexed[] {
  return products.map(product => ({
    product,
    title: tokenize(product.title),
    meta: tokenize([product.category, ...getOccasions(product)].join(' ')),
    body: tokenize(product.description ?? ''),
  }))
}

function bestIn(words: string[], options: string[]): number {
  let best = 0
  for (const option of options) {
    for (const w of words) {
      // Solo la palabra escrita admite errores; los sinónimos deben coincidir y pesan un poco menos
      const isTyped = option === options[0]
      const m = wordMatch(option, w, isTyped) * (isTyped ? 1 : 0.9)
      if (m > best) best = m
      if (best === 1) return 1
    }
  }
  return best
}

/**
 * Puntuación de relevancia (0 = no coincide).
 * En modo estricto todas las palabras importantes deben aparecer; si no, basta con alguna.
 */
export function scoreProduct(item: Indexed, queryTokens: string[], strict = true): number {
  let total = 0
  let matched = 0
  for (const token of queryTokens) {
    const options = [token, ...variants(token).filter(v => v !== token)]
    const score = Math.max(bestIn(item.title, options) * 3, bestIn(item.meta, options) * 2, bestIn(item.body, options))
    if (score > 0) {
      total += score
      matched++
    } else if (strict && !SOFT_WORDS.has(token)) {
      return 0
    }
  }
  return matched > 0 ? total : 0
}

export type SearchResult = { results: Product[]; partial: boolean }

/**
 * Busca en el índice. Si ningún producto coincide con todas las palabras,
 * devuelve los que coinciden con alguna (partial = true).
 */
export function searchProducts(index: Indexed[], query: string): SearchResult {
  const tokens = tokenize(query)
  if (tokens.length === 0) return { results: index.map(i => i.product), partial: false }

  const rank = (strict: boolean) => index
    .map(i => ({ product: i.product, score: scoreProduct(i, tokens, strict) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(r => r.product)

  const strict = rank(true)
  if (strict.length > 0 || tokens.length === 1) return { results: strict, partial: false }
  return { results: rank(false), partial: true }
}
