import { AnimatedFeaturedGrid } from '@/components/ui/AnimatedFeaturedGrid'
import { Product } from '@/types'

export function FeaturedProducts({ featuredProducts: featured }: { featuredProducts: Product[] }) {
  return (
    <section className="w-full pt-16 pb-12 lg:pt-20 lg:pb-16 relative z-20">
      <div className="container mx-auto relative z-10">

        {/* ENCABEZADO — editorial, a dos columnas en escritorio */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-16 items-end mb-10 lg:mb-12">
          <div>
            <span className="inline-flex items-center gap-3 font-inter text-[11px] uppercase tracking-[0.35em] text-[var(--theme-primary)] font-semibold mb-4">
              <span className="w-8 h-px bg-[var(--theme-primary)]" />
              Colección destacada
            </span>
            <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-[var(--theme-text)] leading-[1.02]">
              Nuestros <span className="italic text-[var(--theme-primary)]">favoritos</span>
            </h2>
          </div>
          <p className="font-inter text-base lg:text-lg text-[var(--theme-text-muted)] leading-relaxed max-w-md lg:justify-self-end">
            Los arreglos que más enamoran a nuestros clientes: flores frescas, diseño artesanal y entrega el mismo día en Cali.
          </p>
        </div>

        <AnimatedFeaturedGrid products={featured} />
      </div>
    </section>
  )
}
