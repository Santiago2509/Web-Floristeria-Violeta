'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function AboutHero() {
  return (
    <section className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background Image con Zoom Infinito (Efecto Respiración) */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 25, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/assets/about_hero_bg.png"
            alt="Interior de Floristería Violeta"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
        {/* Overlay translúcido para asegurar legibilidad */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px] z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center mt-16 md:mt-20">

        
        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] tracking-wide"
        >
          Nuestra Historia
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="font-inter text-lg md:text-xl text-white/90 max-w-2xl font-light drop-shadow-md leading-relaxed"
        >
          Detrás de cada pétalo hay una profunda pasión por el diseño y el deseo de conectar corazones a través del lenguaje universal de las flores.
        </motion.p>
      </div>
      
      {/* Indicador de scroll */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-70"
      >
        <span className="text-white/60 font-inter text-xs tracking-[0.2em] uppercase">Descubrir</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
