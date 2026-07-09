'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { generarLinkWhatsApp } from '@/lib/whatsapp'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      
      {/* Fondo de video proporcionado por el usuario */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
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

        {/* Botonera estilo píldora (inspirada en tu referencia) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.6, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center p-1.5 rounded-full backdrop-blur-xl bg-[var(--theme-bg-card)]/10 border border-[var(--theme-border)]/20 shadow-2xl z-10"
        >
          <Link
            href="#catalogo"
            className="px-8 py-3 rounded-full font-inter font-medium text-[var(--theme-bg)] transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          >
            Catálogo
          </Link>
          
          <Link
            href="#arma-tu-ramo"
            className="px-8 py-3 rounded-full font-inter font-medium text-[var(--theme-text)] transition-all duration-300 hover:bg-[var(--theme-primary)]/10"
          >
            Arma tu ramo
          </Link>

          <a
            href={generarLinkWhatsApp()}
            target="_blank"
            className="px-8 py-3 rounded-full font-inter font-medium text-[var(--theme-text)] transition-all duration-300 hover:bg-[var(--theme-primary)]/10"
          >
            Contacto
          </a>
        </motion.div>
      </div>
    </section>
  )
}
