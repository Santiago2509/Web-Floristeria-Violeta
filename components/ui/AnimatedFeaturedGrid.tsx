'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } }
}

function ProductCard({ product, isHero = false }: { product: Product, isHero?: boolean }) {
  // TODO FUTURO: Implementar un campo "orden" manual en la tabla productos desde el admin.
  // Por ahora el Hero se selecciona en base a la fecha de creación (más reciente).
  
  return (
    <Link 
      href={`/catalogo#product-${product.id}`} 
      className="group block relative overflow-hidden rounded-[4px] bg-black/5 h-full w-full"
    >
      <Image
        src={product.imageUrl}
        alt={product.title}
        fill
        className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        sizes={isHero ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
      />
      
      {/* Overlay inferior para legibilidad - No depende de ThemeProvider, siempre oscuro */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10 pointer-events-none" />
      
      {/* Etiqueta de Categoría */}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-black/50 text-white uppercase tracking-widest text-[10px] px-2 py-1 backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      {/* Info del producto animada al Hover */}
      <div className="absolute bottom-4 left-5 right-5 z-20 flex items-end justify-between">
        <div className={`transition-all duration-300 w-full ${!isHero ? 'opacity-90 transform translate-y-1 group-hover:translate-y-0 group-hover:opacity-100' : ''}`}>
          <h3 className={`font-playfair font-medium text-white italic leading-tight mb-2 drop-shadow-md line-clamp-2 ${isHero ? 'text-2xl' : 'text-lg'}`}>
            {product.title}
          </h3>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <p className="font-inter font-medium text-white/90 text-sm drop-shadow-md">
                ${product.price.toLocaleString('es-CO')}
              </p>
              {/* FASE 3: Tag de ocasión sugerida */}
              {product.ocasionSugerida && (
                <span className="bg-white/20 text-white border border-white/30 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider hidden sm:inline-block">
                  {product.ocasionSugerida}
                </span>
              )}
            </div>
            
            {/* Botón Ver Detalle SOLAMENTE en el Hero */}
            {isHero && (
              <div className="hidden lg:block opacity-0 transform translate-y-[6px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out delay-75">
                <span className="inline-block px-4 py-1.5 border border-white/40 text-white font-inter text-[11px] font-medium tracking-wider uppercase backdrop-blur-md bg-white/10 hover:bg-white hover:text-black transition-colors whitespace-nowrap">
                  Ver detalle
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

function CTACard({ bgImageUrl }: { bgImageUrl?: string }) {
  // Usamos una imagen genérica bonita en caso de que no haya productos de donde heredar
  const fallbackImage = 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=600&auto=format&fit=crop'
  
  return (
    <Link 
      href="/catalogo"
      className="group block h-full w-full rounded-[4px] overflow-hidden relative bg-black"
    >
      <Image
        src={bgImageUrl || fallbackImage}
        alt="Ver catálogo"
        fill
        className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] opacity-50 group-hover:opacity-40"
        sizes="(min-width: 1024px) 25vw, 100vw"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 relative z-10">
        <h3 className="font-playfair font-medium text-3xl text-white italic mb-3 drop-shadow-lg">
          Descubre más
        </h3>
        <span className="font-inter font-medium text-xs tracking-widest uppercase text-white/95 flex items-center drop-shadow-md">
          Ver catálogo 
          <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1.5">→</span>
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
      className={`grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr] gap-[6px] w-full ${!isFirstChunk ? 'mt-[6px]' : ''}`}
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
              ${index === 0 ? "lg:row-span-2 lg:h-[340px] xl:h-[380px] 2xl:h-[420px] h-[340px]" : "lg:h-[166px] xl:h-[186px] 2xl:h-[210px] h-[200px]"}
              ${isWide ? "lg:col-span-2" : ""}
            `}
          >
            <ProductCard product={product} isHero={index === 0} />
          </motion.div>
        )
      })}
      
      {showCTA && (
        <motion.div layout variants={cardVariants} className="lg:h-[166px] xl:h-[186px] 2xl:h-[210px] h-[166px]">
          <CTACard bgImageUrl={products[0]?.imageUrl} />
        </motion.div>
      )}
    </motion.div>
  )
}

export function AnimatedFeaturedGrid({ products }: { products: Product[] }) {
  const categories = ['Todos', 'Ramos', 'Cajas', 'Eventos', 'Regalos']
  const [activeCategory, setActiveCategory] = useState('Todos')
  
  // FASE 4: Estado para controlar cuántos chunks se muestran
  const [visibleCount, setVisibleCount] = useState(4)

  // Filtrado de productos
  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory)

  // Dividimos los productos visibles en chunks de 4
  const displayProducts = filteredProducts.slice(0, visibleCount)
  const chunks = []
  for (let i = 0; i < displayProducts.length; i += 4) {
    chunks.push(displayProducts.slice(i, i + 4))
  }

  // Hay más productos por mostrar?
  const hasMore = visibleCount < filteredProducts.length

  const handleToggleMore = () => {
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
    setActiveCategory(cat)
    setVisibleCount(4) // Reset al cambiar filtro
  }

  return (
    <div className="flex flex-col relative z-10" id="nuestros-favoritos">
      
      {/* FASE 1: Chips de Filtro */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full font-inter text-[10px] uppercase tracking-widest transition-all duration-300 border ${
              activeCategory === cat
                ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] text-white shadow-md'
                : 'bg-transparent border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:border-[var(--theme-primary)]/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Animado con Layout */}
      <AnimatePresence mode="popLayout">
        {displayProducts.length > 0 ? (
          <motion.div 
            key={activeCategory} // Forzamos re-animación de todo el grid al cambiar filtro
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            className="flex flex-col items-center justify-center py-24 px-6 border border-[var(--theme-border)]/50 rounded-sm bg-[var(--theme-bg-section)]/30 w-full"
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

      {/* FASE 2: Barra de Confianza */}
      <div className="mt-12 w-full border-t border-[var(--theme-border)]/50 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 font-inter text-[10px] sm:text-xs uppercase tracking-widest text-[var(--theme-text-muted)] text-center">
          <span>+250.000 regalos entregados en Cali</span>
          <span className="hidden md:inline-block w-1 h-1 rounded-full bg-[var(--theme-text-muted)]/40" />
          <span>Entrega el mismo día</span>
          <span className="hidden md:inline-block w-1 h-1 rounded-full bg-[var(--theme-text-muted)]/40" />
          <span>Diseño 100% artesanal</span>
        </div>
      </div>

      {/* FASE 4: Botón Cargar Más */}
      {filteredProducts.length > 4 && (
        <div className="mt-10 flex justify-center w-full">
          <button
            onClick={handleToggleMore}
            className="px-8 py-3 bg-transparent border border-[var(--theme-border)] hover:border-[var(--theme-primary)] text-[var(--theme-text)] font-inter text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-lg rounded-sm"
          >
            {hasMore ? 'Ver más favoritos' : 'Ver menos'}
          </button>
        </div>
      )}
    </div>
  )
}
