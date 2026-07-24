'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function ContactHero() {
  return (
    <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/contact_hero_bg.png"
          alt="Hablemos de tus ideas"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center mt-12">
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
          className="font-playfair text-5xl md:text-6xl text-white mb-6 drop-shadow-lg"
        >
          Hablemos
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="font-inter text-lg md:text-xl text-white/90 max-w-xl font-light drop-shadow-md leading-relaxed"
        >
          Estamos listos para escuchar tus ideas y convertirlas en realidades florales espectaculares. Escríbenos y nuestro equipo te asesorará.
        </motion.p>
      </div>
    </section>
  )
}
