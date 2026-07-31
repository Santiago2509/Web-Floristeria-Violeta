'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { useEffect, useState } from 'react'

function CursorFollower({ mouseX, mouseY, isVisible }: { mouseX: any, mouseY: any, isVisible: boolean }) {
  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 28 })
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 28 })

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        opacity: isVisible ? 1 : 0,
      }}
      className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center mix-blend-difference hidden lg:flex"
      transition={{ opacity: { duration: 0.2 } }}
    >
      <span className="bg-white text-black font-inter text-[11px] uppercase tracking-widest px-4 py-2 rounded-full whitespace-nowrap">
        Ver detalles
      </span>
    </motion.div>
  )
}

function ProductCard({ product, isLarge = false }: { product: Product, isLarge?: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    // Offset slightly so cursor is at the center of the badge
    mouseX.set(e.clientX - 45)
    mouseY.set(e.clientY - 15)
  }

  return (
    <>
      {isHovered && <CursorFollower mouseX={mouseX} mouseY={mouseY} isVisible={isHovered} />}
      
      <Link 
        href={`/catalogo/${product.id}`} 
        className={`group block relative overflow-hidden rounded-[2px] bg-black/5 ${isLarge ? 'md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-[4/5]' : 'col-span-1 row-span-1 aspect-[4/5]'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-[0.6s] ease-out group-hover:scale-[1.05]"
          sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        
        {/* Scrim permanente para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        
        {/* Categoría limpia arriba */}
        <div className="absolute top-5 left-5 z-10">
          <span className="text-white text-[11px] uppercase tracking-[0.15em] font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            {product.category}
          </span>
        </div>

        {/* Info animada abajo */}
        <div className="absolute bottom-5 left-5 right-5 z-10">
          <div className="overflow-hidden mb-1">
            <h3 className="font-playfair text-xl md:text-2xl text-white transform translate-y-4 opacity-0 transition-all duration-[0.35s] ease-out group-hover:translate-y-0 group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 [.group:active_&]:translate-y-0 [.group:active_&]:opacity-100">
              {product.title}
            </h3>
          </div>
          
          {/* Underline animado */}
          <div className="w-full max-w-[80%] h-[1px] bg-white/20 relative mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="absolute top-0 left-0 h-full bg-white w-0 group-hover:w-full transition-all duration-[0.4s] ease-out delay-[0.1s]" />
          </div>

          <p className="font-inter text-white/90 text-sm md:text-base font-light transform translate-y-4 opacity-0 transition-all duration-[0.35s] ease-out group-hover:translate-y-0 group-hover:opacity-100 delay-[0.05s] lg:group-hover:translate-y-0 lg:group-hover:opacity-100 [.group:active_&]:translate-y-0 [.group:active_&]:opacity-100">
            ${product.price.toLocaleString('es-CO')}
          </p>
        </div>
      </Link>
    </>
  )
}

export function AnimatedFeaturedGrid({ products }: { products: Product[] }) {
  // Configuración del grid: el primero es grande, el resto normales
  // En mobile todos apilados normal.
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 relative z-10">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          className={index === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1"}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProductCard product={product} isLarge={index === 0} />
        </motion.div>
      ))}
    </div>
  )
}
