import { ProductoCard } from '@/components/ui/ProductoCard'
import Image from 'next/image'
import { getFeaturedProducts } from '@/lib/db'

export async function FeaturedProducts() {
  const featured = await getFeaturedProducts()

  if (featured.length === 0) return null

  return (
    <section className="w-full py-24 relative bg-[var(--theme-bg)] z-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="font-playfair text-4xl text-[var(--theme-text)] mb-4">
            Selección Exclusiva
          </h2>
          <div className="w-16 h-[1px] bg-[var(--theme-primary)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((product, index) => (
            <div key={product.id} className="group flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 shadow-lg">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-playfair text-2xl text-[var(--theme-text)] mb-2">
                {product.title}
              </h3>
              <p className="font-inter text-[var(--theme-primary)] mb-4">
                ${product.price.toLocaleString('es-CO')}
              </p>
              <button className="px-8 py-3 rounded-full border border-[var(--theme-primary)] text-[var(--theme-primary)] font-inter text-sm uppercase tracking-widest transition-all hover:bg-[var(--theme-primary)] hover:text-white">
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
