import { GalleryMosaic } from '@/components/gallery/GalleryMosaic'
import { getGalleryImages } from '@/lib/db'

export const metadata = {
  title: 'Galería',
  description: 'Inspiración floral. Conoce algunos de nuestros ramos, cajas y arreglos más hermosos.',
}

// Para asegurar que los datos no se queden en caché
export const dynamic = 'force-dynamic'

export default async function GaleriaPage() {
  const images = await getGalleryImages()

  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-24 bg-[var(--theme-bg)]">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-3 font-inter text-[11px] uppercase tracking-[0.35em] text-[var(--theme-primary)] font-semibold mb-4">
            <span className="w-8 h-px bg-[var(--theme-primary)]" />
            Inspiración visual
            <span className="w-8 h-px bg-[var(--theme-primary)]" />
          </span>
          <h1 className="font-playfair text-5xl md:text-6xl text-[var(--theme-text)] leading-[1.05]">
            Nuestra <span className="italic text-gradient-violet">galería</span>
          </h1>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-20 text-[var(--theme-text-muted)] font-inter">
            No hay imágenes en la galería por el momento.
          </div>
        ) : (
          <GalleryMosaic images={images} />
        )}
      </div>
    </main>
  )
}
