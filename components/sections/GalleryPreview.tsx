'use client'
import { useEffect, useState } from 'react'
import { GalleryGrid } from '@/components/ui/GalleryGrid'
import Link from 'next/link'
import { GalleryImage } from '@/types'

export function GalleryPreview({ galleryImages = [] }: { galleryImages?: GalleryImage[] }) {
  const [imagenes, setImagenes] = useState<GalleryImage[]>([])

  useEffect(() => {
    if (galleryImages.length === 0) return
    const shuffled = [...galleryImages].sort(() => 0.5 - Math.random())
    // Seleccionamos 9 fotos
    setImagenes(shuffled.slice(0, 9))
  }, [galleryImages])

  // Mostrar un mensaje de vacío si no hay imágenes
  if (galleryImages.length === 0) return (
    <section className="w-full py-24 min-h-[500px]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-2 block">
            Inspiración Floral
          </span>
          <h2 className="font-playfair text-4xl text-[var(--theme-text)] mb-4">
            Nuestros Trabajos
          </h2>
          <p className="font-inter text-[var(--theme-text-muted)] mt-12 italic">
            Aún no hay imágenes en la galería. ¡Vuelve pronto!
          </p>
        </div>
      </div>
    </section>
  )

  // Mostrar un esqueleto o no mostrar nada mientras se carga la aleatoriedad (evita hydration mismatch)
  if (imagenes.length === 0) return (
    <section className="w-full py-24 min-h-[500px]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-2 block">
            Inspiración Floral
          </span>
          <h2 className="font-playfair text-4xl text-[var(--theme-text)] mb-4">
            Nuestros Trabajos
          </h2>
        </div>
      </div>
    </section>
  )

  return (
    <section className="w-full py-24 relative z-20">
      <div className="container mx-auto px-6">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-16">
          <span className="font-inter text-[10px] uppercase tracking-[0.4em] text-[var(--theme-primary)] mb-5 block font-medium">
            Inspiración Floral
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-[var(--theme-text)] mb-6 leading-[1.1]">
            Nuestros Trabajos
          </h2>
          <p className="font-inter text-[var(--theme-text-muted)] max-w-2xl mx-auto font-light leading-relaxed">
            Un vistazo a los arreglos florales y decoraciones que hemos tenido el honor de crear para nuestros clientes.
          </p>
        </div>

        {/* GALERÍA */}
        <GalleryGrid images={imagenes} />

        {/* BOTÓN CTA */}
        <div className="mt-16 text-center">
          <Link 
            href="/galeria"
            className="inline-block px-10 py-3.5 rounded-[2px] border border-[var(--theme-primary)] text-[var(--theme-primary)] font-inter text-sm tracking-wide transition-all duration-300 hover:bg-[var(--theme-primary)] hover:text-white"
          >
            Ver galería completa
          </Link>
        </div>

      </div>
    </section>
  )
}
