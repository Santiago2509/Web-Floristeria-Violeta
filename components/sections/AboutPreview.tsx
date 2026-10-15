'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────
// IMÁGENES ROTATIVAS PARA EL COLLAGE (4 fotos por recuadro)
// Puedes cambiar estos links por las fotos que tú quieras
// ─────────────────────────────────────────────────────────────
const SLOT_1_IMAGES = [
  'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop',
]

const SLOT_2_IMAGES = [
  'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
]

const SLOT_3_IMAGES = [
  'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800&auto=format&fit=crop',
]

// Componente para cada recuadro cuadrado rotativo
function RotatingSquareCard({
  images,
  interval = 4500,
  initialDelay = 0,
  className = "",
  rotation = "rotate-0",
  alt = "Floristería Violeta"
}: {
  images: string[]
  interval?: number
  initialDelay?: number
  className?: string
  rotation?: string
  alt?: string
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    const startTimeout = setTimeout(() => {
      timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length)
      }, interval)
    }, initialDelay)

    return () => {
      clearTimeout(startTimeout)
      if (timer) clearInterval(timer)
    }
  }, [images.length, interval, initialDelay])

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative aspect-square rounded-2xl overflow-hidden bg-black/20 backdrop-blur-md border-2 border-white/30 dark:border-white/15 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] cursor-pointer ${rotation} ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={images[index]}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src={images[index]}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 70vw, 35vw"
          />
          {/* Sutil viñeta para integrar el tono de la página */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export function AboutPreview() {
  return (
    <section className="w-full pb-24 lg:pb-32 pt-10 relative z-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-16">
          
          {/* Columna Izquierda: Collage de 3 Fotos Cuadradas en Desorden Artístico */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-7/12 relative z-30 flex justify-center -mt-16 lg:-mt-28"
          >
            {/* Contenedor relativo del collage */}
            <div className="relative w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] h-[380px] sm:h-[440px] lg:h-[480px]">
              
              {/* Foto 1: Superior Izquierda (Principal) */}
              <div className="absolute top-0 left-2 sm:left-4 w-[56%] sm:w-[58%] z-10">
                <RotatingSquareCard
                  images={SLOT_1_IMAGES}
                  interval={4800}
                  initialDelay={0}
                  rotation="-rotate-3"
                  alt="Arreglos florales exclusivos"
                />
              </div>

              {/* Foto 2: Superior Derecha (Inclinada a la derecha) */}
              <div className="absolute top-4 sm:top-6 right-2 sm:right-4 w-[48%] sm:w-[50%] z-20">
                <RotatingSquareCard
                  images={SLOT_2_IMAGES}
                  interval={4800}
                  initialDelay={1600}
                  rotation="rotate-6"
                  alt="Diseño floral artesanal"
                />
              </div>

              {/* Foto 3: Inferior Centro-Izquierda (Al frente, superpuesta) */}
              <div className="absolute bottom-2 sm:bottom-4 left-[20%] sm:left-[24%] w-[52%] sm:w-[54%] z-30">
                <RotatingSquareCard
                  images={SLOT_3_IMAGES}
                  interval={4800}
                  initialDelay={3200}
                  rotation="-rotate-2"
                  alt="Flores frescas en Cali"
                />
              </div>

            </div>
          </motion.div>

          {/* Columna Derecha: Texto */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0"
          >
            <span className="font-inter text-[10px] uppercase tracking-[0.4em] text-[var(--theme-primary)] mb-5 font-medium">
              Nuestra Historia
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[var(--theme-text)] mb-6 leading-[1.1]">
              El arte de dar vida a <br className="hidden lg:block"/>
              tus emociones
            </h2>
            <p className="font-inter text-[var(--theme-text-muted)] leading-relaxed mb-10 max-w-lg font-light">
              En Floristería Violeta llevamos años cultivando no solo las flores más hermosas, sino también los momentos más especiales de nuestros clientes. Cada pétalo que seleccionamos y cada ramo que diseñamos lleva impregnado nuestro compromiso con la excelencia, el arte floral y el amor por los detalles. 
              <br/><br/>
              Creemos que las flores son el lenguaje universal del alma.
            </p>
            
            <Link 
              href="/nosotros"
              className="inline-block px-10 py-3.5 rounded-[2px] border border-[var(--theme-primary)] text-[var(--theme-primary)] font-inter text-sm tracking-wide transition-all duration-300 hover:bg-[var(--theme-primary)] hover:text-white"
            >
              Conocer más
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
