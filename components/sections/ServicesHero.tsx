'use client'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
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
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  }

  const letterVars: Variants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section ref={ref} className="relative w-full md:h-[75vh] md:min-h-[600px] flex items-center overflow-hidden pt-28 pb-16 md:py-0">
      {/* Fondo con parallax: la misma foto difuminada como ambiente; la foto nítida va enmarcada */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
        <Image
          src="/assets/servicios_ramo.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover blur-2xl scale-110 saturate-125"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,8,40,0.35)_0%,rgba(20,8,40,0.55)_100%)] md:bg-[linear-gradient(90deg,rgba(20,8,40,0.7)_0%,rgba(20,8,40,0.45)_55%,rgba(20,8,40,0.25)_100%)]" />
      </motion.div>

      {/* Fusión con la siguiente sección */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 md:h-1/2 bg-gradient-to-t from-[var(--theme-bg)] via-[var(--theme-bg)]/40 to-transparent z-0 pointer-events-none" />

      <motion.div style={{ opacity }} className="relative z-10 container mx-auto grid md:grid-cols-[1.25fr_1fr] items-center gap-10 md:mt-16">
        {/* Texto */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-24 h-[1px] bg-white/60 mb-6 origin-left"
          />

          <motion.h1
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-2xl overflow-hidden flex flex-wrap justify-center md:justify-start gap-x-3 leading-[1.1]"
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
            className="font-inter text-base md:text-xl text-white/90 max-w-xl font-light drop-shadow-md px-4 md:px-0"
          >
            Más que flores, entregamos emociones. Descubre nuestros servicios exclusivos diseñados para hacer de cada ocasión un momento mágico.
          </motion.p>
        </div>

        {/* Foto nítida enmarcada (arriba en celular, a la derecha en computador) */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="order-first md:order-none justify-self-center lg:justify-self-end relative w-[62vw] max-w-[280px] md:max-w-none md:w-[min(30vw,360px)] aspect-[714/900]"
        >
          <span className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-white/30" aria-hidden="true" />
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-white/80 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
            <Image src="/assets/servicios_ramo.webp" alt="Ramo de rosas y gerberas rosadas entregado por Floristería Violeta" fill sizes="(min-width: 768px) 360px, 62vw" className="object-cover" priority />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
