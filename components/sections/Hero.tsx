'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'

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

export function Hero({ featuredProducts = [] }: { featuredProducts?: Product[] }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const marqueeProducts = featuredProducts

  useEffect(() => {
    // Iniciar video justo cuando desaparece el SplashScreen (2.5s)
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Auto-play prevented", e))
      }
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  const titleText = "VIOLETA"
  const titleLetters = titleText.split("")

  const containerVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 2.5 // Inicia justo al irse el splash screen
      }
    }
  }

  const letterVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      
      {/* Fondo de video */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)'
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full opacity-100"
        >
          <source src="/assets/heroprincipal.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--theme-bg)_100%)] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] via-transparent to-transparent opacity-60" />
      </div>

      <FloatingPetals />

      {/* Contenido Central */}
      <div className="container mx-auto px-6 lg:px-12 z-10 relative flex flex-col items-center justify-center flex-grow">
        
        {/* Título Kinetic Reveal */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-playfair font-medium leading-none mb-4 tracking-widest uppercase z-10 drop-shadow-2xl flex"
          style={{ 
            fontSize: 'clamp(4rem, 15vw, 13rem)',
            backgroundImage: 'repeating-linear-gradient(to right, #FFFFFF 0%, #D812A5 25%, #7D3C98 50%, #D812A5 75%, #FFFFFF 100%)',
            backgroundSize: '100vw auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
          onAnimationStart={(e) => {
            // Un pequeño truco para animar el gradiente sin interferir con el stagger
            const el = document.getElementById('hero-title');
            if(el) {
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
          // Tiempo total del stagger: 2.5 + (0.04 * 7) + 0.3 = 3.08s
          transition={{ duration: 0.8, delay: 3.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/90 font-playfair text-xl lg:text-3xl mb-12 max-w-2xl italic font-light z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]"
        >
          Flores que cuentan historias...
        </motion.p>
      </div>

      {/* Marquee en esquina inferior derecha */}
      {marqueeProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-10 right-0 w-[400px] sm:w-[500px] z-20 flex flex-col items-end pr-6 lg:pr-12"
        >
          <Link href="/catalogo" className="font-inter text-[10px] uppercase tracking-[0.2em] text-white/80 mb-3 hover:text-white transition-colors duration-300 drop-shadow-md">
            Explora el catálogo →
          </Link>
          
          <div 
            className="w-full overflow-hidden"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 100%)' }}
          >
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] justify-end">
              {[...marqueeProducts, ...marqueeProducts].map((producto: any, index: number) => (
                <Link 
                  key={`${producto.id}-${index}`} 
                  href={`/catalogo/${producto.id}`}
                  className="group relative flex-shrink-0 w-[110px] h-[140px] mx-2 rounded-[4px] overflow-hidden border border-white/20 shadow-lg"
                >
                  <Image
                    src={producto.imageUrl || producto.imagen_url}
                    alt={producto.nombre || producto.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="110px"
                  />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
