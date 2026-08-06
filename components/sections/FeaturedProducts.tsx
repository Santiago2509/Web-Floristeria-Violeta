import { AnimatedFeaturedGrid } from '@/components/ui/AnimatedFeaturedGrid'
import { Product } from '@/types'

export function FeaturedProducts({ featuredProducts: featured }: { featuredProducts: Product[] }) {
  return (
    <section className="w-full pb-24 lg:pb-32 pt-12 lg:pt-16 relative z-20 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* ENCABEZADO — Limpio y editorial */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-inter text-[10px] uppercase tracking-[0.5em] text-[var(--theme-primary)]/70 mb-5 font-medium">
            Colección Destacada
          </span>
          <h2 className="font-playfair text-5xl md:text-6xl text-[var(--theme-text)] mb-6 leading-[1.1]">
            Nuestros <span className="italic text-[var(--theme-primary)]">Favoritos</span>
          </h2>
        </div>

        {/* CONTENIDO — Productos o Estado Vacío */}
        {featured.length > 0 ? (
          <AnimatedFeaturedGrid products={featured} />
        ) : (
          <div className="flex flex-col items-center text-center py-20 px-8 rounded-sm bg-[var(--theme-bg-section)]/50 border border-[var(--theme-border)]/20">
            <p className="font-playfair text-xl text-[var(--theme-text)]/60 italic mb-2">
              Próximamente...
            </p>
            <p className="font-inter text-sm text-[var(--theme-text-muted)] max-w-sm">
              Estamos preparando nuestra nueva selección de favoritos.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
