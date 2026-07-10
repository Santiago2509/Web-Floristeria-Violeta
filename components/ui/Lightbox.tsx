'use client'
import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface LightboxProps {
  images: { id: string; imagen_url: string }[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (newIndex: number) => void
}

export function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length)
    if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length)
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Botón Cerrar */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navegación */}
          <button 
            onClick={(e) => { e.stopPropagation(); onNavigate((currentIndex - 1 + images.length) % images.length) }}
            className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors z-50 p-2"
          >
            <ChevronLeft className="w-10 h-10 md:w-16 md:h-16" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onNavigate((currentIndex + 1) % images.length) }}
            className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors z-50 p-2"
          >
            <ChevronRight className="w-10 h-10 md:w-16 md:h-16" />
          </button>

          {/* Imagen Actual */}
          <div className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4 md:mx-32 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[currentIndex].imagen_url}
                  alt="Galería"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={100}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Contador */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-inter tracking-widest text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
