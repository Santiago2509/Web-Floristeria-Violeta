'use client'
import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useHydrated } from '@/components/ui/useHydrated'

interface LightboxProps {
  images: { id: string; imagen_url?: string; imageUrl?: string; title?: string }[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (newIndex: number) => void
}

const roundBtn = 'flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 border border-white/25 text-white backdrop-blur-md transition-colors'

export function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
  const hydrated = useHydrated()
  const total = images.length
  const prev = useCallback(() => onNavigate((currentIndex - 1 + total) % total), [currentIndex, total, onNavigate])
  const next = useCallback(() => onNavigate((currentIndex + 1) % total), [currentIndex, total, onNavigate])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }, [isOpen, onClose, prev, next])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleKeyDown])

  // En celular: deslizar a los lados cambia de foto, deslizar hacia abajo cierra
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120) onClose()
    else if (info.offset.x < -60) next()
    else if (info.offset.x > 60) prev()
  }

  if (!hydrated) return null
  const current = images[currentIndex]

  // Portal al <body>: así el visor queda por encima del menú superior y del botón de WhatsApp
  return createPortal(
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
        >
          {/* Barra superior: contador y botón cerrar */}
          <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 md:px-8 pt-[max(1rem,env(safe-area-inset-top))] pb-3 bg-gradient-to-b from-black/70 to-transparent">
            <span className="font-inter text-sm tracking-widest text-white/80">{currentIndex + 1} / {total}</span>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); onClose() }}
              aria-label="Cerrar"
              className={`${roundBtn} gap-2 h-11 px-4 font-inter text-sm`}
            >
              <X className="w-5 h-5" />
              <span>Cerrar</span>
            </button>
          </div>

          {/* Navegación (en celular van abajo, más fáciles de tocar) */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={e => { e.stopPropagation(); prev() }}
                aria-label="Foto anterior"
                className={`${roundBtn} absolute z-10 w-12 h-12 md:w-14 md:h-14 left-4 md:left-8 bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2`}
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                type="button"
                onClick={e => { e.stopPropagation(); next() }}
                aria-label="Foto siguiente"
                className={`${roundBtn} absolute z-10 w-12 h-12 md:w-14 md:h-14 right-4 md:right-8 bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2`}
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}

          {/* Imagen actual */}
          <div className="relative w-full h-full max-w-5xl mx-4 md:mx-32 pt-20 pb-24 md:py-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full touch-none"
                onClick={e => e.stopPropagation()}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.5}
                onDragEnd={handleDragEnd}
              >
                <Image
                  src={current.imageUrl || current.imagen_url || ''}
                  alt={current.title || 'Foto de la galería'}
                  fill
                  draggable={false}
                  className="object-contain pointer-events-none"
                  sizes="100vw"
                  quality={90}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {current.title && (
            <p className="absolute bottom-8 md:bottom-6 left-20 right-20 text-center font-playfair text-lg text-white/90 truncate">{current.title}</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
