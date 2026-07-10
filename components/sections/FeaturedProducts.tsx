import { mockProductos } from '@/lib/mock-data'
import { ProductoCard } from '@/components/ui/ProductoCard'
import Link from 'next/link'

export function FeaturedProducts() {
  // Simulando la consulta a Supabase: destacado=true, activo=true, ordenado por 'orden', limite 6
  const productos = mockProductos
    .filter(p => p.destacado && p.activo)
    .sort((a, b) => a.orden - b.orden)
    .slice(0, 6)

  // Si no hay productos, no renderizamos la sección
  if (productos.length === 0) return null

  return (
    <section className="w-full py-24 bg-[var(--theme-bg)] relative z-10" id="catalogo">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-[var(--theme-text)] mb-4">
            Selección Violeta
          </h2>
          <p className="font-inter text-[var(--theme-text-muted)] max-w-2xl mx-auto">
            Nuestros arreglos florales más solicitados, diseñados con pasión y elegancia para hacer de cada momento algo inolvidable.
          </p>
        </div>

        {/* Grid Masonry con CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {productos.map((producto, index) => (
            <ProductoCard 
              key={producto.id}
              id={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              mostrar_precio={producto.mostrar_precio}
              imagenUrl={producto.imagen_url}
              categoria={producto.categoria}
              // Pasamos el índice para poder hacer stagger en la animación si es necesario
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/catalogo"
            className="inline-block px-10 py-4 rounded-full font-inter font-medium text-[var(--theme-bg)] transition-transform hover:scale-105 shadow-xl hover:shadow-2xl"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          >
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  )
}
