'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

export function ServicesHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  // Efecto parallax para la imagen (se mueve más lento hacia abajo)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  // Efecto fade-out para el texto al bajar
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const titleText = "Experiencias Inolvidables"

  // Variantes para la animación letra por letra
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  }

  const letterVars = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section ref={ref} className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image con Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
        <Image
          src="/assets/services_hero_bg.png"
          alt="Flores hermosas de fondo"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Overlay premium: solo en la base para fusionarse con la siguiente sección */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[var(--theme-bg)] via-[var(--theme-bg)]/50 to-transparent z-0 pointer-events-none" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center mt-10">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-24 h-[1px] bg-white/60 mb-6"
        />
        
        <motion.h1 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-2xl overflow-hidden flex flex-wrap justify-center gap-x-3"
        >
          {titleText.split(" ").map((word, wordIndex) => (
            <div key={wordIndex} className="flex">
              {word.split("").map((letter, letterIndex) => (
                <motion.span key={letterIndex} variants={letterVars} className="inline-block">
                  {letter}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="font-inter text-base md:text-xl text-white/90 max-w-2xl font-light drop-shadow-md px-4"
        >
          Más que flores, entregamos emociones. Descubre nuestros servicios exclusivos diseñados para hacer de cada ocasión un momento mágico.
        </motion.p>
      </motion.div>
    </section>
  )
}
