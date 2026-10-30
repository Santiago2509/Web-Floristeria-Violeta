'use client'
import { useState } from 'react'
import { useTheme } from '@/components/ui/ThemeProvider'
import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedRose } from '@/components/ui/AnimatedRose'
import { useHydrated } from '@/components/ui/useHydrated'
import Link from 'next/link'
import { generarLinkWhatsApp } from '@/lib/whatsapp'

// Componente para los pétalos
function FloatingPetals() {
  const petals = [
    { left: '10%', delay: '0s', duration: '15s', size: 30, rotation: 15, opacity: 0.25 },
    { left: '35%', delay: '4s', duration: '18s', size: 25, rotation: 45, opacity: 0.22 },
    { left: '60%', delay: '2s', duration: '14s', size: 35, rotation: -20, opacity: 0.28 },
    { left: '85%', delay: '7s', duration: '20s', size: 28, rotation: 60, opacity: 0.24 },
    { left: '20%', delay: '11s', duration: '16s', size: 32, rotation: -40, opacity: 0.29 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {petals.map((petal, i) => (
        <div
          key={i}
          className="absolute top-[-100px]"
          style={{
            left: petal.left,
            animation: `float-petal ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
            opacity: petal.opacity,
          }}
        >
          <svg 
            width={petal.size} 
            height={petal.size * 1.2} 
            viewBox="0 0 24 30" 
            fill="white"
            style={{ transform: `rotate(${petal.rotation}deg)` }}
          >
            <path d="M12 0C12 0 24 10 24 20C24 26 18 30 12 30C6 30 0 26 0 20C0 10 12 0 12 0Z" />
          </svg>
        </div>
      ))}
    </div>
  )
}

export function Hero() {
  const { theme } = useTheme()
  const reduceMotion = useReducedMotion()
  const hydrated = useHydrated()
  // Si el splash ya se mostró en esta sesión, el título aparece de inmediato
  // (antes el Hero quedaba vacío 2,5 s en cada visita)
  const [introDelay] = useState(() =>
    typeof window !== 'undefined' && sessionStorage.getItem('splash_shown') ? 0.3 : 2.5
  )
  const isDark = theme === 'dark'

  const titleText = "VIOLETA"
  const titleLetters = titleText.split("")

  const containerVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: introDelay // Inicia justo al irse el splash screen
      }
    }
  }

  const letterVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      
      {/* Fondo de video — nítido, sin velos: solo una sombra suave detrás del texto
          y un fundido corto al final para enlazar con la siguiente sección */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/hero_poster.webp"
          aria-hidden="true"
          className="object-cover w-full h-full"
        >
          <source src="/assets/heroprincipal.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_52%,rgba(20,6,30,0.28)_0%,transparent_100%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_52%,rgba(10,4,16,0.55)_0%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--theme-bg)] to-transparent" />
      </div>

      {/* Tras hidratar, para que el HTML del servidor y el del cliente coincidan */}
      {!(hydrated && reduceMotion) && <FloatingPetals />}

      {/* Contenido Central */}
      <div className="container mx-auto z-10 relative flex flex-col items-center justify-center flex-grow">
        {/* Logo Flor Animada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 translate-y-[13rem] md:translate-y-[15.5rem]"
        >
          <AnimatedRose className="w-[95vw] md:w-[680px] opacity-40 md:opacity-60" />
        </motion.div>

        {/* Título Kinetic Reveal */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-playfair font-medium leading-none mb-4 tracking-widest uppercase z-10 drop-shadow-2xl flex"
          style={{ 
            fontSize: 'clamp(4rem, 15vw, 13rem)',
            backgroundImage: isDark 
              ? 'repeating-linear-gradient(to right, #FFFFFF 0%, #F0E2F5 20%, #C39BD3 40%, #A569BD 50%, #C39BD3 60%, #F0E2F5 80%, #FFFFFF 100%)'
              : 'repeating-linear-gradient(to right, #3B1254 0%, #5B2C6F 25%, #7D3C98 50%, #5B2C6F 75%, #3B1254 100%)',
            backgroundSize: '100vw auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
          onAnimationStart={() => {
            // Un pequeño truco para animar el gradiente sin interferir con el stagger
            const el = document.getElementById('hero-title');
            if(el && !reduceMotion) {
              el.animate([
                { backgroundPosition: '0vw center' },
                { backgroundPosition: '-100vw center' }
              ], {
                duration: 12000,
                iterations: Infinity,
                easing: 'linear'
              });
            }
          }}
          id="hero-title"
        >
          {titleLetters.map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: introDelay + 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-white font-inter tracking-[0.35em] uppercase text-sm lg:text-lg font-medium mt-2 mb-10 z-10 [text-shadow:0_2px_12px_rgba(20,6,30,0.65)]"
        >
          Floristería · Cali
        </motion.p>

        {/* Llamadas a la acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: introDelay + 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
        >
          <Link
            href="/catalogo"
            className="px-8 py-3.5 rounded-full bg-[var(--theme-plum)] text-[var(--theme-on-plum)] font-inter text-sm font-medium tracking-wide shadow-[0_10px_30px_-10px_rgba(42,15,61,0.8)] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_rgba(42,15,61,0.9)] transition-all"
          >
            Ver catálogo
          </Link>
          <a
            href={generarLinkWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/70 dark:border-white/25 text-[var(--theme-plum)] dark:text-white font-inter text-sm font-medium tracking-wide hover:bg-white dark:hover:bg-white/20 transition-colors"
          >
            Pedir por WhatsApp
          </a>
        </motion.div>
      </div>


    </section>
  )
}
