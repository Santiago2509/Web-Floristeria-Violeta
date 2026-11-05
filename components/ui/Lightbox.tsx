'use client'
import { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useHydrated } from '@/components/ui/useHydrated'

interface LightboxProps {
  images: { id: string; imagen_url?: string; imageUrl?: string; title?: string; category?: string }[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (newIndex: number) => void
}

// Mismo `sizes` para la foto y su precarga: así el navegador reutiliza la descarga
const MAIN_SIZES = '(min-width: 1024px) 70vw, 100vw'

const roundBtn =
  'flex items-center justify-center rounded-full border backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ' +
  'bg-white/70 border-white text-[#3B0764] hover:bg-white dark:bg-white/10 dark:border-white/25 dark:text-white dark:hover:bg-white/20'

const srcOf = (img: LightboxProps['images'][number]) => img.imageUrl || img.imagen_url || ''

export function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
  const hydrated = useHydrated()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const total = images.length

  const prev = useCallback(() => onNavigate((currentIndex - 1 + total) % total), [currentIndex, total, onNavigate])
  const next = useCallback(() => onNavigate((currentIndex + 1) % total), [currentIndex, total, onNavigate])

  // Teclado: Esc cierra, flechas cambian, Tab se queda dentro del visor
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowLeft') prev()
    else if (e.key === 'ArrowRight') next()
    else if (e.key === 'Tab' && dialogRef.current) {
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled])')
      if (!focusables.length) return
      const first = focusables[0], last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }, [isOpen, onClose, prev, next])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Al abrir: bloquea el scroll y lleva el foco al botón Cerrar. Al cerrar: devuelve el foco.
  useEffect(() => {
    if (!isOpen) return
    returnFocusRef.current = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => closeRef.current?.focus(), 50)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = 'unset'
      returnFocusRef.current?.focus?.()
    }
  }, [isOpen])

  // Mantiene la miniatura activa a la vista
  useEffect(() => {
    if (!isOpen) return
    thumbsRef.current?.querySelector<HTMLElement>(`[data-index="${currentIndex}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [currentIndex, isOpen])

  // En celular: deslizar a los lados cambia de foto, hacia abajo cierra
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120) onClose()
    else if (info.offset.x < -60) next()
    else if (info.offset.x > 60) prev()
  }

  if (!hydrated) return null
  const current = images[currentIndex]
  const neighbours = total > 1 ? [images[(currentIndex + 1) % total], images[(currentIndex - 1 + total) % total]] : []

  return createPortal(
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          ref={dialogRef}
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Visor de fotos de la galería"
        >
          {/* Fondo ambiental: la misma foto, difuminada, con velo violeta (cambia con cada foto) */}
          <div className="absolute inset-0 bg-[#F3EAFF] dark:bg-[#130A2A]" onClick={onClose} aria-hidden="true">
            <AnimatePresence initial={false}>
              <motion.div
                key={srcOf(current)}
                className="absolute inset-[-10%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image src={srcOf(current)} alt="" fill sizes="20vw" quality={30} className="object-cover blur-3xl saturate-150 scale-110" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(243,234,255,0.72)_0%,rgba(243,234,255,0.55)_50%,rgba(243,234,255,0.8)_100%)] dark:bg-[linear-gradient(180deg,rgba(19,10,42,0.78)_0%,rgba(19,10,42,0.6)_50%,rgba(19,10,42,0.85)_100%)]" />
          </div>

          {/* Barra superior: contador (anunciado a lectores de pantalla) y botón Cerrar */}
          <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between gap-4 px-4 md:px-8 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
            <p className="font-inter text-sm text-[#3B0764] dark:text-white/90" aria-live="polite" aria-atomic="true">
              <span className="font-semibold">{currentIndex + 1}</span>
              <span className="opacity-60"> / {total}</span>
              <span className="sr-only">{current.title ? `: ${current.title}` : ''}</span>
            </p>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar visor" className={`${roundBtn} gap-2 h-11 px-4 font-inter text-sm font-medium`}>
              <X className="w-5 h-5" aria-hidden="true" />
              <span>Cerrar</span>
            </button>
          </div>

          {/* Foto actual: fundido cruzado inmediato (sin esperar a que salga la anterior) */}
          <div className="absolute inset-x-0 top-16 bottom-36 md:bottom-44 lg:inset-x-28 flex items-center justify-center px-4 pointer-events-none">
            <div className="relative w-full h-full">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0 flex items-center justify-center pointer-events-auto touch-none"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={0.45}
                  onDragEnd={handleDragEnd}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={srcOf(current)}
                      alt={current.title || 'Foto de la galería'}
                      fill
                      priority
                      draggable={false}
                      sizes={MAIN_SIZES}
                      quality={85}
                      className="object-contain pointer-events-none drop-shadow-[0_30px_50px_rgba(30,11,58,0.45)]"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Precarga de la foto anterior y la siguiente: el cambio es instantáneo */}
          <div className="sr-only" aria-hidden="true">
            {neighbours.map(img => (
              <Image key={img.id} src={srcOf(img)} alt="" width={1} height={1} sizes={MAIN_SIZES} quality={85} priority />
            ))}
          </div>

          {/* Flechas: a los lados en computador, abajo en celular */}
          {total > 1 && (
            <>
              <button type="button" onClick={prev} aria-label="Foto anterior" className={`${roundBtn} absolute z-10 w-12 h-12 md:w-14 md:h-14 left-4 md:left-8 bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2`}>
                <ChevronLeft className="w-7 h-7" aria-hidden="true" />
              </button>
              <button type="button" onClick={next} aria-label="Foto siguiente" className={`${roundBtn} absolute z-10 w-12 h-12 md:w-14 md:h-14 right-4 md:right-8 bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2`}>
                <ChevronRight className="w-7 h-7" aria-hidden="true" />
              </button>
            </>
          )}

          {/* Pie: título, categoría y miniaturas */}
          <div className="absolute inset-x-0 bottom-0 z-[5] pb-[max(1.25rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-3 px-20 md:px-8 pointer-events-none">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={currentIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="text-center min-h-[2.75rem]">
                {current.category && (
                  <p className="font-inter text-[11px] uppercase tracking-[0.3em] font-semibold text-[#6D28D9] dark:text-[#C4B5FD]">{current.category}</p>
                )}
                {current.title && <p className="font-playfair text-lg md:text-xl text-[#1E0B3A] dark:text-white truncate max-w-[70vw]">{current.title}</p>}
              </motion.div>
            </AnimatePresence>

            {total > 1 && (
              <div ref={thumbsRef} className="hidden md:flex gap-2 max-w-[min(90vw,900px)] overflow-x-auto px-2 py-1 [scrollbar-width:none] pointer-events-auto" role="group" aria-label="Miniaturas">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    type="button"
                    data-index={i}
                    onClick={() => onNavigate(i)}
                    aria-label={`Ver foto ${i + 1}${img.title ? `: ${img.title}` : ''}`}
                    aria-current={i === currentIndex}
                    className={`relative shrink-0 w-14 h-14 rounded-xl overflow-hidden transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] ${i === currentIndex ? 'ring-2 ring-[#6D28D9] dark:ring-white scale-105' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={srcOf(img)} alt="" fill sizes="56px" quality={40} className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
