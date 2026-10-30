'use client'

import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ShoppingBag, SlidersHorizontal, MessageCircle } from 'lucide-react'
import type { Product } from '@/types'
import { getOccasions, getUsedCategories, sameCategory } from '@/lib/catalog'
import { indexProducts, normalizeText, searchProducts } from '@/lib/search'
import { generarLinkWhatsApp } from '@/lib/whatsapp'

type Sort = 'relevancia' | 'precio-asc' | 'precio-desc'

const QUICK_SEARCHES = ['Rosas', 'Girasoles', 'Cumpleaños', 'Amor', 'Aniversario', 'Tulipanes']

const chipBase = 'shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full font-inter text-sm border transition-colors whitespace-nowrap'
const chipOn = 'bg-plum-gradient border-transparent text-[var(--theme-on-plum)] shadow-md'
const chipOff = 'bg-[var(--theme-bg-card)] border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)]'

function ProductCard({ product }: { product: Product }) {
  const buyLink = generarLinkWhatsApp(`¡Hola! Me interesa comprar el producto: *${product.title}* que vi en el catálogo.`)
  const occasions = getOccasions(product)

  return (
    <article className="group relative flex flex-col h-full bg-[var(--theme-bg-card)] rounded-3xl overflow-hidden border border-[var(--theme-border)] shadow-[0_20px_40px_-30px_rgba(59,7,100,0.5)] hover:shadow-[0_30px_60px_-30px_rgba(59,7,100,0.6)] transition-shadow duration-500">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--theme-bg-section)]">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <span className="absolute top-4 left-4 bg-white/90 text-[#3B0764] px-3 py-1 rounded-full font-inter text-[11px] font-semibold uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-playfair text-2xl text-[var(--theme-text)] mb-2 group-hover:text-[var(--theme-primary)] transition-colors">
          {/* El enlace cubre toda la tarjeta */}
          <Link href={`/catalogo/${product.id}`} className="after:absolute after:inset-0">
            {product.title}
          </Link>
        </h3>
        <p className="font-inter text-[var(--theme-text-muted)] text-sm leading-relaxed mb-5 line-clamp-3">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="flex flex-col gap-2">
            <span className="font-inter text-xl font-semibold text-[var(--theme-text)]">
              ${product.price.toLocaleString('es-CO')}
            </span>
            {occasions.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {occasions.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider text-[var(--theme-primary)] bg-[var(--theme-blush)] px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <a
            href={buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 w-11 h-11 shrink-0 rounded-full bg-[var(--theme-blush)] flex items-center justify-center text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-white transition-colors"
            title="Comprar por WhatsApp"
            aria-label={`Comprar ${product.title} por WhatsApp`}
          >
            <ShoppingBag className="w-5 h-5" />
          </a>
        </div>
      </div>
    </article>
  )
}

// Tarjeta compacta para el mosaico de 2 columnas en móvil (alturas alternadas = efecto escalonado)
function MobileCard({ product, tall }: { product: Product; tall: boolean }) {
  return (
    <Link href={`/catalogo/${product.id}`} className="group block break-inside-avoid mb-3">
      <div className={`relative w-full overflow-hidden rounded-[1.4rem] bg-[var(--theme-bg-section)] ${tall ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
        <Image src={product.imageUrl} alt={product.title} fill sizes="50vw" className="object-cover" />
        <span className="absolute top-2 left-2 bg-white/90 text-[#3B0764] px-2 py-0.5 rounded-full font-inter text-[9px] font-semibold uppercase tracking-wider">
          {product.category}
        </span>
      </div>
      <div className="px-1 pt-2">
        <h3 className="font-playfair text-[17px] leading-tight text-[var(--theme-text)] line-clamp-2">{product.title}</h3>
        <p className="font-inter text-sm font-semibold text-[var(--theme-primary)] mt-0.5">${product.price.toLocaleString('es-CO')}</p>
      </div>
    </Link>
  )
}

export function CatalogBrowser({ products, initialQuery = '', initialCategory = '' }: { products: Product[]; initialQuery?: string; initialCategory?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory)
  const [occasion, setOccasion] = useState('')
  const [sort, setSort] = useState<Sort>('relevancia')
  const [sheetOpen, setSheetOpen] = useState(false)
  const deferredQuery = useDeferredValue(query)
  const inputRef = useRef<HTMLInputElement>(null)

  const index = useMemo(() => indexProducts(products), [products])
  const categories = useMemo(() => getUsedCategories(products), [products])

  // Ocasiones más usadas (para filtros rápidos)
  const occasions = useMemo(() => {
    const counts = new Map<string, { label: string; n: number }>()
    for (const p of products) for (const tag of getOccasions(p)) {
      const key = normalizeText(tag)
      const entry = counts.get(key) ?? { label: tag, n: 0 }
      entry.n++
      counts.set(key, entry)
    }
    return [...counts.values()].sort((a, b) => b.n - a.n).slice(0, 8).map(e => e.label)
  }, [products])

  const { results, partial } = useMemo(() => searchProducts(index, deferredQuery), [index, deferredQuery])

  const filtered = useMemo(() => {
    let list = results
    if (category) list = list.filter(p => sameCategory(p.category, category))
    if (occasion) list = list.filter(p => getOccasions(p).some(t => normalizeText(t) === normalizeText(occasion)))
    if (sort === 'precio-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'precio-desc') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [results, category, occasion, sort])

  // Conteo por categoría según la búsqueda actual
  const countFor = (cat: string) => results.filter(p => sameCategory(p.category, cat)).length

  // Mantiene la búsqueda en la URL (se puede compartir o volver atrás)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (query.trim()) params.set('q', query.trim()); else params.delete('q')
    if (category) params.set('categoria', category); else params.delete('categoria')
    const qs = params.toString()
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
  }, [query, category])

  // Tecla "/" para ir al buscador
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const hasFilters = Boolean(query.trim() || category || occasion)
  // Mientras el panel de filtros está abierto, ocultamos el botón flotante de WhatsApp
  useEffect(() => {
    document.body.classList.toggle('sheet-open', sheetOpen)
    return () => document.body.classList.remove('sheet-open')
  }, [sheetOpen])

  const activeFilterCount = [category, occasion, sort !== 'relevancia'].filter(Boolean).length
  const clearAll = () => { setQuery(''); setCategory(''); setOccasion(''); setSort('relevancia') }

  return (
    <div>
      {/* BUSCADOR (en móvil queda fijo arriba al bajar, junto al botón de filtros) */}
      <div className="max-w-3xl mx-auto mb-8 sticky md:static top-[68px] z-30 -mx-6 px-6 md:mx-auto md:px-0 py-3 md:py-0 bg-[var(--theme-bg)]/90 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none">
        <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--theme-primary)] pointer-events-none" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="¿Qué estás buscando?"
            aria-label="Buscar en el catálogo"
            className="w-full pl-14 pr-14 py-4 rounded-full bg-[var(--theme-bg-card)] border border-[var(--theme-border)] font-inter text-base text-[var(--theme-text)] placeholder:text-[var(--theme-text-muted)]/70 shadow-[0_20px_40px_-28px_rgba(59,7,100,0.55)] focus:outline-none focus:border-[var(--theme-primary)] focus:ring-4 focus:ring-[var(--theme-primary)]/10 transition [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); inputRef.current?.focus() }}
              aria-label="Borrar búsqueda"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-[var(--theme-text-muted)] hover:bg-[var(--theme-blush)] hover:text-[var(--theme-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="md:hidden relative shrink-0 w-14 rounded-full bg-plum-gradient text-[var(--theme-on-plum)] flex items-center justify-center shadow-md"
            aria-label="Filtrar y ordenar"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FACC15] text-[#3B0764] text-[11px] font-bold flex items-center justify-center">{activeFilterCount}</span>
            )}
          </button>
        </div>

        {/* Búsquedas rápidas */}
        {!query && (
          <div className="hidden md:flex flex-wrap items-center justify-center gap-2 mt-4 font-inter text-sm">
            <span className="text-[var(--theme-text-muted)]">Populares:</span>
            {QUICK_SEARCHES.map(term => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="px-3 py-1 rounded-full text-[var(--theme-primary)] bg-[var(--theme-blush)] hover:bg-[var(--theme-primary)] hover:text-white transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* CATEGORÍAS (deslizables en móvil) */}
      <div className="hidden md:flex flex-wrap justify-center gap-2 pb-2" role="tablist" aria-label="Categorías">
        <button role="tab" aria-selected={!category} onClick={() => setCategory('')} className={`${chipBase} ${!category ? chipOn : chipOff}`}>
          Todo <span className="opacity-70 text-xs">{results.length}</span>
        </button>
        {categories.map(cat => {
          const active = sameCategory(cat, category)
          const n = countFor(cat)
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(active ? '' : cat)}
              disabled={n === 0 && !active}
              className={`${chipBase} ${active ? chipOn : chipOff} disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {cat} <span className="opacity-70 text-xs">{n}</span>
            </button>
          )
        })}
      </div>

      {/* OCASIONES + ORDEN */}
      <div className="hidden md:flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-4 mb-8">
        {occasions.length > 0 ? (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            <span className="shrink-0 font-inter text-xs uppercase tracking-[0.2em] text-[var(--theme-text-muted)] mr-1">Para:</span>
            {occasions.map(tag => {
              const active = normalizeText(tag) === normalizeText(occasion)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setOccasion(active ? '' : tag)}
                  className={`shrink-0 px-3 py-1 rounded-full font-inter text-xs border transition-colors ${active ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] text-white' : 'border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)]'}`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        ) : <span />}

        <label className="shrink-0 inline-flex items-center gap-2 font-inter text-sm text-[var(--theme-text-muted)]">
          <SlidersHorizontal className="w-4 h-4" />
          Ordenar:
          <select
            value={sort}
            onChange={e => setSort(e.target.value as Sort)}
            className="px-3 py-2 rounded-full bg-[var(--theme-bg-card)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-primary)]"
          >
            <option value="relevancia">Relevancia</option>
            <option value="precio-asc">Menor precio</option>
            <option value="precio-desc">Mayor precio</option>
          </select>
        </label>
      </div>

      {/* ESTADO DE LA BÚSQUEDA */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 font-inter text-sm" aria-live="polite">
        <span className="text-[var(--theme-text)] font-medium">
          {filtered.length} {filtered.length === 1 ? 'arreglo' : 'arreglos'}
        </span>
        {partial && filtered.length > 0 && (
          <span className="text-[var(--theme-text-muted)]">
            No hay coincidencias exactas para «{deferredQuery.trim()}»; te mostramos opciones parecidas.
          </span>
        )}
        {hasFilters && (
          <button type="button" onClick={clearAll} className="text-[var(--theme-primary)] underline underline-offset-4">
            Limpiar filtros
          </button>
        )}
      </div>

      {/* RESULTADOS */}
      {filtered.length > 0 && (
        <div className="md:hidden columns-2 gap-3">
          {filtered.map((product, i) => (
            <MobileCard key={product.id} product={product} tall={i % 4 === 0 || i % 4 === 3} />
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <motion.div layout className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-16 px-6 rounded-3xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-bg-section)]">
          <p className="font-playfair text-3xl text-[var(--theme-text)] mb-3">
            {products.length === 0 ? 'Muy pronto, nuevas creaciones' : 'No encontramos ese arreglo… todavía'}
          </p>
          <p className="font-inter text-[var(--theme-text-muted)] max-w-md mx-auto mb-8">
            Cuéntanos qué tienes en mente y lo diseñamos para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={generarLinkWhatsApp(query.trim() ? `¡Hola! Estoy buscando: ${query.trim()}. ¿Me pueden ayudar?` : undefined)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-plum-gradient text-[var(--theme-on-plum)] font-inter text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir por WhatsApp
            </a>
            {hasFilters && (
              <button type="button" onClick={clearAll} className="px-7 py-3 rounded-full border border-[var(--theme-border)] font-inter text-sm text-[var(--theme-text)] hover:border-[var(--theme-primary)]">
                Ver todo el catálogo
              </button>
            )}
          </div>
        </div>
      )}

      {/* PANEL DE FILTROS (móvil): sube desde abajo */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              className="md:hidden fixed inset-0 z-[80] bg-[#1E0B3A]/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              data-lenis-prevent
              role="dialog"
              aria-label="Filtrar y ordenar"
              className="md:hidden fixed inset-x-0 bottom-0 z-[90] max-h-[82vh] overflow-y-auto rounded-t-[2rem] bg-[var(--theme-bg)] border-t border-[var(--theme-border)] px-6 pt-3 pb-8 shadow-2xl"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_, info) => { if (info.offset.y > 100) setSheetOpen(false) }}
            >
              <div className="w-12 h-1.5 rounded-full bg-[var(--theme-border)] mx-auto mb-5" />
              <div className="flex items-center justify-between mb-6">
                <p className="font-playfair text-2xl text-[var(--theme-text)]">Filtrar</p>
                {hasFilters && (
                  <button type="button" onClick={clearAll} className="font-inter text-sm text-[var(--theme-primary)] underline underline-offset-4">Limpiar</button>
                )}
              </div>

              <p className="font-inter text-xs uppercase tracking-[0.2em] text-[var(--theme-text-muted)] mb-3">Categoría</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <button type="button" onClick={() => setCategory('')} className={`${chipBase} ${!category ? chipOn : chipOff}`}>Todo</button>
                {categories.map(cat => {
                  const active = sameCategory(cat, category)
                  return (
                    <button key={cat} type="button" onClick={() => setCategory(active ? '' : cat)} className={`${chipBase} ${active ? chipOn : chipOff}`}>
                      {cat} <span className="opacity-70 text-xs">{countFor(cat)}</span>
                    </button>
                  )
                })}
              </div>

              {occasions.length > 0 && (
                <>
                  <p className="font-inter text-xs uppercase tracking-[0.2em] text-[var(--theme-text-muted)] mb-3">Para</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {occasions.map(tag => {
                      const active = normalizeText(tag) === normalizeText(occasion)
                      return (
                        <button key={tag} type="button" onClick={() => setOccasion(active ? '' : tag)} className={`${chipBase} ${active ? chipOn : chipOff}`}>{tag}</button>
                      )
                    })}
                  </div>
                </>
              )}

              <p className="font-inter text-xs uppercase tracking-[0.2em] text-[var(--theme-text-muted)] mb-3">Ordenar</p>
              <div className="grid grid-cols-3 gap-2 mb-8">
                {([['relevancia', 'Relevancia'], ['precio-asc', 'Menor precio'], ['precio-desc', 'Mayor precio']] as [Sort, string][]).map(([value, label]) => (
                  <button key={value} type="button" onClick={() => setSort(value)} className={`px-2 py-2.5 rounded-2xl font-inter text-xs border transition-colors ${sort === value ? chipOn : chipOff}`}>{label}</button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="w-full py-4 rounded-full bg-plum-gradient text-[var(--theme-on-plum)] font-inter font-semibold shadow-lg"
              >
                Ver {filtered.length} {filtered.length === 1 ? 'arreglo' : 'arreglos'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
