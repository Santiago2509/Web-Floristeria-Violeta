'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function ServicesHero() {
  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/services_hero_bg.png"
          alt="Flores hermosas de fondo"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay dark/light depending on theme to make text readable */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-16 h-[1px] bg-white/60 mb-6"
        />
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-lg"
        >
          Experiencias Inolvidables
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-inter text-lg md:text-xl text-white/90 max-w-2xl font-light drop-shadow-md"
        >
          Más que flores, entregamos emociones. Descubre nuestros servicios exclusivos diseñados para hacer de cada ocasión un momento mágico.
        </motion.p>
      </div>
    </section>
  )
}
