'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useInView, type PanInfo } from 'framer-motion'
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react'
import { Lightbox } from '@/components/ui/Lightbox'
import { GalleryImage } from '@/types'

const AUTOPLAY_MS = 4500
const VISIBLE_SIDE = 2 // fotos visibles a cada lado de la central

// Distancia circular con signo entre `index` y `active` (ej. -1 = justo a la izquierda)
function circularOffset(index: number, active: number, total: number) {
  let offset = index - active
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

export function GalleryPreview({ galleryImages = [] }: { galleryImages?: GalleryImage[] }) {
  const images = galleryImages
  const total = images.length
  const [active, setActive] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { amount: 0.4 })

  const go = (step: number) => setActive(prev => (prev + step + total) % total)

  // Avance automático (se pausa con el ratón encima, fuera de pantalla o con el visor abierto)
  useEffect(() => {
    if (total < 2 || isHovering || !inView || lightboxOpen) return
    const timer = setTimeout(() => setActive(prev => (prev + 1) % total), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [active, total, isHovering, inView, lightboxOpen])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1)
    else if (info.offset.x > 60) go(-1)
  }

  if (total === 0) return null
  const current = images[active]

  return (
    <section className="w-full py-20 lg:py-28 relative z-20 overflow-hidden">
      {/* Banda de color suave detrás del carrusel */}
      <div
        className="absolute inset-x-0 top-[34%] bottom-[14%] bg-[var(--theme-bg-section)] pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0, #000 90px, #000 calc(100% - 90px), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 90px, #000 calc(100% - 90px), transparent 100%)',
        }}
      />

      <div className="container mx-auto relative">

        {/* ENCABEZADO */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <span className="inline-flex items-center gap-3 font-inter text-[11px] uppercase tracking-[0.35em] text-[var(--theme-primary)] font-semibold mb-4">
            <span className="w-8 h-px bg-[var(--theme-primary)]" />
            Inspiración floral
            <span className="w-8 h-px bg-[var(--theme-primary)]" />
          </span>
          <h2 className="font-playfair text-5xl md:text-6xl text-[var(--theme-text)] leading-[1.05] mb-5">
            Nuestros <span className="italic text-gradient-violet">trabajos</span>
          </h2>
          <p className="font-inter text-[var(--theme-text-muted)] text-base lg:text-lg leading-relaxed">
            Un vistazo a los arreglos y detalles que hemos tenido el honor de crear para nuestros clientes.
          </p>
        </div>

        {/* ESCENARIO — abanico de fotos en arco */}
        <motion.div
          ref={stageRef}
          className="relative h-[420px] sm:h-[480px] lg:h-[560px] select-none touch-pan-y cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          drag={total > 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          aria-roledescription="carrusel"
          aria-label="Galería de trabajos"
        >
          {images.map((img, i) => {
            const offset = circularOffset(i, active, total)
            const distance = Math.abs(offset)
            if (distance > VISIBLE_SIDE + 1) return null
            const isCenter = offset === 0

            return (
              <motion.button
                key={img.id}
                type="button"
                onClick={() => (isCenter ? setLightboxOpen(true) : setActive(i))}
                aria-label={isCenter ? `Ampliar: ${img.title}` : `Ver: ${img.title}`}
                className="absolute left-1/2 top-0 h-full w-[64vw] max-w-[300px] sm:max-w-[340px] lg:max-w-[380px] -ml-[min(32vw,150px)] sm:-ml-[170px] lg:-ml-[190px] outline-none"
                initial={false}
                animate={{
                  x: `${offset * 64}%`,
                  scale: 1 - Math.min(distance, 3) * 0.13,
                  rotate: offset * 5,
                  opacity: distance > VISIBLE_SIDE ? 0 : 1,
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ zIndex: 10 - distance }}
              >
                <div className={`relative w-full h-full rounded-t-full rounded-b-[2rem] overflow-hidden bg-[var(--theme-bg-section)] border-[6px] border-white dark:border-[var(--theme-bg-card)] transition-shadow duration-700 ${isCenter ? 'shadow-[0_40px_80px_-30px_rgba(59,7,100,0.65)]' : 'shadow-[0_20px_40px_-25px_rgba(59,7,100,0.5)]'}`}>
                  <Image
                    src={img.imageUrl}
                    alt={img.title}
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 380px, 64vw"
                    className="object-cover pointer-events-none"
                  />
                  {/* Las fotos laterales se tiñen un poco para dar profundidad */}
                  <div
                    className="absolute inset-0 bg-[var(--theme-plum)] transition-opacity duration-700 pointer-events-none"
                    style={{ opacity: Math.min(distance * 0.22, 0.55) }}
                  />
                  {isCenter && (
                    <span className="absolute top-[18%] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/90 text-[#3B0764] flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* PIE — título de la foto, contador y controles */}
        <div className="mt-8 lg:mt-10 flex flex-col items-center text-center">
          <div className="h-[64px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-inter text-[11px] uppercase tracking-[0.3em] text-[var(--theme-primary)] font-semibold mb-1">
                  {current.category}
                </p>
                <p className="font-playfair text-2xl lg:text-3xl text-[var(--theme-text)]">{current.title}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-5 mt-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="w-12 h-12 rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg-card)] text-[var(--theme-text)] flex items-center justify-center hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-playfair text-lg text-[var(--theme-text-muted)] tabular-nums min-w-[72px]">
              <span className="text-[var(--theme-text)]">{String(active + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Foto siguiente"
              className="w-12 h-12 rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg-card)] text-[var(--theme-text)] flex items-center justify-center hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)] transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <Link
            href="/galeria"
            className="mt-10 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-plum-gradient text-[var(--theme-on-plum)] font-inter text-sm font-medium tracking-wide hover:-translate-y-0.5 transition-transform"
          >
            Ver galería completa
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Lightbox
        images={images}
        currentIndex={active}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setActive}
      />
    </section>
  )
}
