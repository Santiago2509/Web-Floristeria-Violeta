'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, Truck, Flower2, HandHeart } from 'lucide-react'

// Tiempo que se muestra cada categoría antes de deslizar a la siguiente
const AUTOPLAY_MS = 5000

// Variantes del deslizante (dirección según avance/retroceso)
const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as const } }),
}
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'

// Variante del contenedor padre para escalonar los hijos
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

// Variante para cada tarjeta (Entrada con scroll)
const cardVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } }
}

function ProductCard({ product, isHero = false }: { product: Product, isHero?: boolean }) {
  return (
    <Link
      href={`/catalogo/${product.id}`}
      className="group block relative overflow-hidden rounded-2xl bg-[var(--theme-bg-section)] h-full w-full"
    >
      <Image
        src={product.imageUrl}
        alt={product.title}
        fill
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        sizes={isHero ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
      />

      {/* Degradado inferior para legibilidad (siempre oscuro, independiente del tema) */}
      <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-[#1E0B3A]/90 via-[#1E0B3A]/40 to-transparent z-10 pointer-events-none" />

      {/* Categoría */}
      <span className="absolute top-4 left-4 z-20 bg-white/90 text-[#3B0764] uppercase tracking-[0.2em] text-[10px] font-semibold px-3 py-1 rounded-full">
        {product.category}
      </span>

      {/* Flecha que aparece al pasar el ratón */}
      <span className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white text-[#3B0764] flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <ArrowRight className="w-4 h-4 -rotate-45" />
      </span>

      {/* Información */}
      <div className={`absolute bottom-0 inset-x-0 z-20 ${isHero ? 'p-6 lg:p-8' : 'p-5'}`}>
        <h3 className={`font-playfair text-white leading-tight mb-2 line-clamp-2 ${isHero ? 'text-3xl lg:text-4xl' : 'text-xl'}`}>
          {product.title}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-inter font-semibold text-white text-sm">
            ${product.price.toLocaleString('es-CO')}
          </span>
          {isHero && product.ocasionSugerida && product.ocasionSugerida.split(',').slice(0, 3).map(tag => (
            <span key={tag.trim()} className="hidden sm:inline-block border border-white/40 text-white/90 px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

function CTACard() {
  return (
    <Link
      href="/catalogo"
      className="group h-full w-full rounded-2xl overflow-hidden relative flex flex-col justify-between p-6 bg-plum-gradient text-[var(--theme-on-plum)]"
    >
      {/* Arco decorativo */}
      <span className="absolute -right-10 -bottom-16 w-48 h-56 rounded-t-full border border-white/15 transition-transform duration-700 group-hover:-translate-y-2" />
      <span className="absolute -right-4 -bottom-16 w-36 h-44 rounded-t-full border border-white/10 transition-transform duration-700 delay-75 group-hover:-translate-y-3" />
      <span className="font-inter text-[10px] uppercase tracking-[0.3em] text-white/60">Catálogo completo</span>
      <div className="relative">
        <h3 className="font-playfair italic text-3xl leading-tight mb-3">Descubre más</h3>
        <span className="inline-flex items-center gap-2 font-inter text-sm font-medium">
          Ver catálogo
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  )
}

function BentoChunk({ products, showCTA, isFirstChunk }: { products: Product[], showCTA: boolean, isFirstChunk: boolean }) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-3 lg:gap-4 w-full ${!isFirstChunk ? 'mt-3 lg:mt-4' : ''}`}
    >
      {products.map((product, index) => {
        // Si no hay CTA, el último producto (índice 3) ocupa 2 columnas para mantener la simetría del Bento
        const isWide = !showCTA && index === 3
        
        return (
          <motion.div 
            key={product.id} 
            layout 
            variants={cardVariants} 
            className={`
              ${index === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2 h-[380px] lg:h-[520px]" : "h-[240px] lg:h-[252px]"}
              ${isWide ? "lg:col-span-2" : ""}
            `}
          >
            <ProductCard product={product} isHero={index === 0} />
          </motion.div>
        )
      })}
      
      {showCTA && (
        <motion.div layout variants={cardVariants} className="h-[200px] lg:h-[252px]">
          <CTACard />
        </motion.div>
      )}
    </motion.div>
  )
}

export function AnimatedFeaturedGrid({ products }: { products: Product[] }) {
  const categories = ['Todos', 'Ramos', 'Cajas', 'Eventos', 'Regalos']
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [direction, setDirection] = useState(1)

  // Autoplay: corre solo hasta que el cliente interactúe
  const [autoPlay, setAutoPlay] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { amount: 0.3 })

  // Solo rotamos por categorías que tengan productos (Todos siempre)
  const rotatingCategories = useMemo(
    () => categories.filter(c => c === 'Todos' || products.some(p => p.category?.toLowerCase() === c.toLowerCase())),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products]
  )

  // FASE 4: Estado para controlar cuántos chunks se muestran
  const [visibleCount, setVisibleCount] = useState(4)

  const isRunning = autoPlay && !isHovering && inView && rotatingCategories.length > 1

  useEffect(() => {
    if (!isRunning) return
    const t = setTimeout(() => {
      const idx = rotatingCategories.indexOf(activeCategory)
      const next = rotatingCategories[(idx + 1) % rotatingCategories.length]
      setDirection(1)
      setActiveCategory(next)
      setVisibleCount(4)
    }, AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [isRunning, activeCategory, rotatingCategories])
  

  // Filtrado de productos (tolerante a mayúsculas/minúsculas)
  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase())

  // Dividimos los productos visibles en chunks de 4
  const displayProducts = filteredProducts.slice(0, visibleCount)
  const chunks = []
  for (let i = 0; i < displayProducts.length; i += 4) {
    chunks.push(displayProducts.slice(i, i + 4))
  }

  // Hay más productos por mostrar?
  const hasMore = visibleCount < filteredProducts.length

  const handleToggleMore = () => {
    setAutoPlay(false)
    if (hasMore) {
      setVisibleCount(prev => prev + 4)
    } else {
      // Si ya no hay más, colapsamos de vuelta a 4
      setVisibleCount(4)
      // Opcional: hacer scroll suave hacia arriba
      const section = document.getElementById('nuestros-favoritos')
      if (section) section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCategoryChange = (cat: string) => {
    setAutoPlay(false) // El cliente eligió: detenemos la animación
    setDirection(categories.indexOf(cat) >= categories.indexOf(activeCategory) ? 1 : -1)
    setActiveCategory(cat)
    setVisibleCount(4) // Reset al cambiar filtro
  }

  return (
    <div
      ref={rootRef}
      className="flex flex-col relative z-10"
      id="nuestros-favoritos"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setAutoPlay(false)}
    >
      
      {/* Filtros + enlace al catálogo */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              id={`featured-filter-${cat.toLowerCase()}`}
              onClick={() => handleCategoryChange(cat)}
              className={`relative overflow-hidden px-5 py-2.5 rounded-full font-inter text-xs font-medium tracking-wide transition-all duration-300 border ${
                isActive
                  ? 'bg-plum-gradient border-transparent text-[var(--theme-on-plum)] shadow-md'
                  : 'bg-[var(--theme-bg-card)] border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)]'
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {/* Barra de progreso del autoplay */}
              {isActive && isRunning && (
                <motion.span
                  key={`progress-${cat}`}
                  className="absolute left-0 bottom-0 h-[2px] bg-white/80"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                />
              )}
            </button>
          )
        })}
      </div>
        <Link
          href="/catalogo"
          className="group inline-flex items-center gap-2 font-inter text-sm font-medium text-[var(--theme-primary)]"
        >
          Ver todo el catálogo
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Grid Animado con Layout */}
      <div className="w-full overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        {displayProducts.length > 0 ? (
          <motion.div 
            key={activeCategory} // Forzamos re-animación de todo el grid al cambiar filtro
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex flex-col"
          >
            {chunks.map((chunk, index) => (
              <BentoChunk 
                key={`${activeCategory}-chunk-${index}`} 
                products={chunk} 
                showCTA={index === 0} 
                isFirstChunk={index === 0} 
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center py-24 px-6 border border-[var(--theme-border)] rounded-2xl bg-[var(--theme-bg-section)] w-full"
          >
            <p className="font-playfair text-2xl text-[var(--theme-text)] italic mb-2">
              Pronto más opciones en esta categoría
            </p>
            <p className="font-inter text-sm text-[var(--theme-text-muted)]">
              Explora nuestras otras colecciones mientras tanto.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* Barra de confianza */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
        {[
          { icon: HandHeart, title: '+250.000 regalos', text: 'entregados en Cali' },
          { icon: Truck, title: 'Entrega el mismo día', text: 'a domicilio, con cuidado' },
          { icon: Flower2, title: 'Diseño 100% artesanal', text: 'hecho a mano para ti' },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-4 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg-card)] px-5 py-4">
            <span className="w-11 h-11 shrink-0 rounded-full bg-[var(--theme-blush)] text-[var(--theme-primary)] flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </span>
            <p className="font-inter text-sm leading-snug">
              <span className="block font-semibold text-[var(--theme-text)]">{title}</span>
              <span className="text-[var(--theme-text-muted)]">{text}</span>
            </p>
          </div>
        ))}
      </div>

      {/* FASE 4: Botón Cargar Más */}
      {filteredProducts.length > 4 && (
        <div className="mt-10 flex justify-center w-full">
          <button
            onClick={handleToggleMore}
            className="px-8 py-3 rounded-full bg-transparent border border-[var(--theme-border)] hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)] text-[var(--theme-text)] font-inter text-sm font-medium transition-all duration-300"
          >
            {hasMore ? 'Ver más favoritos' : 'Ver menos'}
          </button>
        </div>
      )}
    </div>
  )
}
