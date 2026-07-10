import { mockGaleria } from '@/lib/mock-data'
import { GalleryGrid } from '@/components/ui/GalleryGrid'
import Link from 'next/link'

export function GalleryPreview() {
  // Simular consulta a Supabase: ordenado por 'orden', limite 6
  const imagenes = mockGaleria
    .sort((a, b) => a.orden - b.orden)
    .slice(0, 6)

  if (imagenes.length === 0) return null

  return (
    <section className="w-full py-24 bg-[var(--theme-bg)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-2 block">
            Inspiración Floral
          </span>
          <h2 className="font-playfair text-4xl text-[var(--theme-text)] mb-4">
            Nuestros Trabajos
          </h2>
          <p className="font-inter text-[var(--theme-text-muted)] max-w-2xl mx-auto">
            Un vistazo a los arreglos florales y decoraciones que hemos tenido el honor de crear para nuestros clientes.
          </p>
        </div>

        <GalleryGrid images={imagenes} />

        <div className="mt-16 text-center">
          <Link 
            href="/galeria"
            className="inline-block px-10 py-4 rounded-full border border-[var(--theme-text)] text-[var(--theme-text)] font-inter font-medium transition-all hover:bg-[var(--theme-text)] hover:text-[var(--theme-bg)]"
          >
            Ver galería completa
          </Link>
        </div>
      </div>
    </section>
  )
}
