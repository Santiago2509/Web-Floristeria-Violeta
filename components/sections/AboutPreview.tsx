'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Fotos de respaldo (propias) por si la galería todavía está vacía
const FALLBACK_PHOTOS = [
  '/assets/servicio_eventos.webp',
  '/assets/servicio_regalos.webp',
  '/assets/servicio_delivery.webp',
  '/assets/about_story_img.webp',
  '/assets/services_hero_bg.webp',
  '/assets/about_hero_bg_colombia_v2.webp',
]

// Reparte las fotos entre los 3 recuadros (1,4,7… / 2,5,8… / 3,6,9…)
function distribute(photos: string[]): [string[], string[], string[]] {
  const source = photos.length >= 3 ? photos : FALLBACK_PHOTOS
  const slots: [string[], string[], string[]] = [[], [], []]
  source.forEach((url, i) => slots[i % 3].push(url))
  return slots
}

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
      className={`relative aspect-square rounded-2xl overflow-hidden bg-[var(--theme-bg-section)] border-[6px] border-white dark:border-[var(--theme-bg-card)] shadow-[0_25px_50px_-15px_rgba(59,7,100,0.45)] cursor-pointer ${rotation} ${className}`}
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
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export function AboutPreview({ photos = [] }: { photos?: string[] }) {
  const [slot1, slot2, slot3] = distribute(photos)

  return (
    <section className="w-full py-20 lg:py-28 relative z-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-16">
          
          {/* Columna Izquierda: Collage de 3 Fotos Cuadradas en Desorden Artístico */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-7/12 relative z-30 flex justify-center"
          >
            {/* Contenedor relativo del collage */}
            <div className="relative w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] h-[380px] sm:h-[440px] lg:h-[480px]">
              
              {/* Foto 1: Superior Izquierda (Principal) */}
              <div className="absolute top-0 left-2 sm:left-4 w-[56%] sm:w-[58%] z-10">
                <RotatingSquareCard
                  images={slot1}
                  interval={4800}
                  initialDelay={0}
                  rotation="-rotate-3"
                  alt="Arreglos florales exclusivos"
                />
              </div>

              {/* Foto 2: Superior Derecha (Inclinada a la derecha) */}
              <div className="absolute top-4 sm:top-6 right-2 sm:right-4 w-[48%] sm:w-[50%] z-20">
                <RotatingSquareCard
                  images={slot2}
                  interval={4800}
                  initialDelay={1600}
                  rotation="rotate-6"
                  alt="Diseño floral artesanal"
                />
              </div>

              {/* Foto 3: Inferior Centro-Izquierda (Al frente, superpuesta) */}
              <div className="absolute bottom-2 sm:bottom-4 left-[20%] sm:left-[24%] w-[52%] sm:w-[54%] z-30">
                <RotatingSquareCard
                  images={slot3}
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
            <span className="inline-flex items-center gap-3 font-inter text-[11px] uppercase tracking-[0.35em] text-[var(--theme-primary)] font-semibold mb-5">
              <span className="w-8 h-px bg-[var(--theme-primary)]" />
              Nuestra historia
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[var(--theme-text)] mb-6 leading-[1.1]">
              El arte de dar vida a <br className="hidden lg:block"/>
              tus emociones
            </h2>
            <p className="font-inter text-[var(--theme-text-muted)] text-base lg:text-lg leading-relaxed mb-10 max-w-lg">
              En Floristería Violeta llevamos años cultivando no solo las flores más hermosas, sino también los momentos más especiales de nuestros clientes. Cada pétalo que seleccionamos y cada ramo que diseñamos lleva impregnado nuestro compromiso con la excelencia, el arte floral y el amor por los detalles. 
              <br/><br/>
              Creemos que las flores son el lenguaje universal del alma.
            </p>
            
            <Link 
              href="/nosotros"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-plum-gradient text-[var(--theme-on-plum)] font-inter text-sm font-medium tracking-wide hover:-translate-y-0.5 transition-transform"
            >
              Conocer nuestra historia
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
