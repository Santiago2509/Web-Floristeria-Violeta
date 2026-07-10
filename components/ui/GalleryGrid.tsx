'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Lightbox } from '@/components/ui/Lightbox'

interface GalleryImage {
  id: string
  imagen_url: string
  orden: number
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  return (
    <>
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative w-full overflow-hidden rounded-xl cursor-pointer group break-inside-avoid shadow-md hover:shadow-xl transition-all"
            style={{ aspectRatio: index % 3 === 0 ? '3/4' : index % 2 === 0 ? '1/1' : '4/3' }}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={img.imagen_url}
              alt={`Galería ${index + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {/* Overlay sutil en hover para invitar al click */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white font-inter text-sm tracking-widest transition-opacity duration-300">
                AMPLIAR
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <Lightbox 
        images={images}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </>
  )
}
