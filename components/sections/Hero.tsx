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
      
      {/* Fondo de video proporcionado por el usuario (con máscara de degradado para fundirse con la siguiente sección) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)'
        }}
      >
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
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--theme-bg)_100%)] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] via-transparent to-transparent opacity-60" />
      </div>

      {/* Contenido Central (Título y Subtítulo perfectamente centrados) */}
      <div className="container mx-auto px-6 lg:px-12 z-10 relative flex flex-col items-center justify-center flex-grow">
        
        {/* Título gigante estilo editorial con efecto Aurora Fluida */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px) drop-shadow(0 10px 10px rgba(0,0,0,0.5))', backgroundPosition: "0vw center" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              filter: 'blur(0px) drop-shadow(0 10px 10px rgba(0,0,0,0.5))',
              backgroundPosition: ["0vw center", "-100vw center"] 
            }}
            transition={{ 
              opacity: { duration: 1.5, delay: 2.8, ease: 'easeOut' },
              scale: { duration: 1.5, delay: 2.8, ease: 'easeOut' },
              filter: { duration: 1.5, delay: 2.8, ease: 'easeOut' },
              backgroundPosition: { duration: 12, repeat: Infinity, ease: "linear" }
            }}
            className="font-playfair font-medium leading-none mb-4 tracking-widest uppercase z-10"
            style={{ 
              fontSize: 'clamp(4rem, 15vw, 13rem)',
              backgroundImage: 'repeating-linear-gradient(to right, #FFFFFF 0%, #D812A5 25%, #7D3C98 50%, #D812A5 75%, #FFFFFF 100%)',
              backgroundSize: '100vw auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            VIOLETA
          </motion.h1>

          {/* Destellos mágicos alrededor del texto */}
          <motion.div 
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 90, 180] }} 
            transition={{ duration: 4, repeat: Infinity, delay: 3 }} 
            className="absolute -top-4 -left-8 w-4 h-4 rounded-full bg-white blur-[1px] shadow-[0_0_15px_5px_rgba(255,255,255,0.8)]" 
          />
          <motion.div 
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], rotate: [0, -90, -180] }} 
            transition={{ duration: 5, repeat: Infinity, delay: 4.5 }} 
            className="absolute bottom-4 -right-6 w-3 h-3 rounded-full bg-[#D812A5] blur-[1px] shadow-[0_0_15px_5px_rgba(216,18,165,0.8)]" 
          />
        </div>

        {/* Subtítulo elegante */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 3.3, ease: 'easeOut' }}
          className="text-white/90 font-playfair text-xl lg:text-3xl mb-12 max-w-2xl italic font-light z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]"
        >
          Flores que cuentan historias, arreglos que dejan huella.
        </motion.p>
      </div>

      {/* Carrusel (Marquee) de Productos Destacados posicionado abajo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.6, ease: 'easeOut' }}
        className="absolute bottom-8 w-full max-w-6xl z-10 overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {/* Duplicamos la lista para crear el bucle infinito perfecto */}
          {[...mockProductos, ...mockProductos].map((producto, index) => (
            <Link 
              key={`${producto.id}-${index}`} 
              href={`/catalogo/${producto.id}`}
              className="group relative flex-shrink-0 w-[105px] h-[150px] mx-3 rounded-2xl overflow-hidden border border-white/20 shadow-xl"
            >
              <Image
                src={producto.imagen_url}
                alt={producto.nombre}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="105px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)]/90 via-[var(--theme-bg)]/20 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-left">
                <p className="font-playfair text-[var(--theme-text)] text-[9px] font-medium leading-tight line-clamp-2">
                  {producto.nombre}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
