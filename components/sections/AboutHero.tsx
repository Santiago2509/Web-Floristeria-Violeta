'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function AboutHero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/about_hero_bg.png"
          alt="Interior de Floristería Violeta"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay dark/light depending on theme to make text readable */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center mt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-20 h-20 md:w-24 md:h-24 relative mb-6"
        >
           {/* Decoración sutil superior */}
           <Image src="/assets/esquina_de_flores.png" alt="Decor" fill className="object-contain drop-shadow-lg opacity-80" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-lg"
        >
          Nuestra Historia
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-inter text-lg md:text-xl text-white/90 max-w-2xl font-light drop-shadow-md leading-relaxed"
        >
          Detrás de cada pétalo hay una profunda pasión por el diseño y el deseo de conectar corazones a través del lenguaje universal de las flores.
        </motion.p>
      </div>
    </section>
  )
}
