import Image from 'next/image'
import { getGalleryImages } from '@/lib/db'

export const metadata = {
  title: 'Galería | Floristería Violeta',
  description: 'Inspiración floral. Conoce algunos de nuestros trabajos más hermosos en bodas y eventos.',
}

// Para asegurar que los datos no se queden en caché
export const dynamic = 'force-dynamic'

export default async function GaleriaPage() {
  const images = await getGalleryImages()

  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-24 bg-[var(--theme-bg)]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-4 block font-semibold">
            Inspiración Visual
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl text-[var(--theme-text)]">
            Nuestra Galería
          </h1>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-20 text-[var(--theme-text-muted)] font-inter">
            No hay imágenes en la galería por el momento.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((img) => (
              <div key={img.id} className="relative group break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={img.imageUrl}
                  alt={img.title}
                  width={600}
                  height={800} // Altura base, next/image mantendrá la proporción gracias a layout responsivo
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Oscuro al hacer hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="font-inter text-xs font-semibold uppercase tracking-widest text-white/80 mb-1">
                    {img.category}
                  </span>
                  <h3 className="font-playfair text-xl text-white">
                    {img.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
