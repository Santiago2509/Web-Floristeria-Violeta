'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { generarLinkWhatsApp } from '@/lib/whatsapp'
import { mockProductos } from '@/lib/mock-data'
export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Retrasar el inicio del video hasta que desaparezca el SplashScreen (2.5s)
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Auto-play prevented", e))
      }
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      
      {/* Fondo de video proporcionado por el usuario */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="object-cover w-full h-full opacity-100"
        >
          <source src="/assets/heroprincipal.mp4.mov" type="video/mp4" />
        </video>
        {/* Overlays para suavizar los bordes y asegurar legibilidad del texto */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--theme-bg)_100%)] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] via-transparent to-transparent opacity-30" />
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-6 lg:px-12 z-10 relative flex flex-col items-center">
        
        {/* Título gigante estilo editorial */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 2.8, ease: 'easeOut' }}
          className="font-playfair font-medium text-[var(--theme-text)] leading-none mb-4 tracking-widest uppercase z-10"
          style={{ fontSize: 'clamp(4rem, 15vw, 13rem)' }}
        >
          Vio<span className="text-[#930C71] dark:text-[#D812A5]">le</span>ta
        </motion.h1>

        {/* Subtítulo elegante */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3.3, ease: 'easeOut' }}
          className="text-[var(--theme-text)]/80 font-playfair text-xl lg:text-3xl mb-12 max-w-2xl italic font-light z-10"
        >
          Flores que cuentan historias, arreglos que dejan huella.
        </motion.p>

        {/* Carrusel (Marquee) de Productos Destacados */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.6, ease: 'easeOut' }}
          className="w-full max-w-6xl mt-4 relative z-10 overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {/* Duplicamos la lista para crear el bucle infinito perfecto */}
            {[...mockProductos, ...mockProductos].map((producto, index) => (
              <Link 
                key={`${producto.id}-${index}`} 
                href={`/catalogo/${producto.id}`}
                className="group relative flex-shrink-0 w-28 h-40 mx-3 rounded-2xl overflow-hidden border border-white/20 shadow-xl"
              >
                <Image
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="112px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)]/90 via-[var(--theme-bg)]/20 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-left">
                  <p className="font-playfair text-[var(--theme-text)] text-[10px] font-medium leading-tight line-clamp-2">
                    {producto.nombre}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
