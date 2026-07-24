import Image from 'next/image'
import { getProducts } from '@/lib/db'
import { ShoppingBag } from 'lucide-react'
import { generarLinkWhatsApp } from '@/lib/whatsapp'

export const metadata = {
  title: 'Catálogo | Floristería Violeta',
  description: 'Explora nuestra colección exclusiva de ramos, cajas y arreglos florales.',
}

// Para asegurar que los datos no se queden en caché al agregar/eliminar desde el admin
export const dynamic = 'force-dynamic'

export default async function CatalogoPage() {
  const products = await getProducts()

  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-24 bg-[var(--theme-bg)]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-4 block font-semibold">
            Nuestras Creaciones
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl text-[var(--theme-text)]">
            Catálogo Exclusivo
          </h1>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-[var(--theme-text-muted)] font-inter">
            No hay productos en el catálogo por el momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {products.map((product) => {
              const buyLink = generarLinkWhatsApp(`¡Hola! Me interesa comprar el producto: *${product.title}* que vi en el catálogo.`)
              
              return (
                <div key={product.id} className="group flex flex-col bg-[var(--theme-bg-card)] rounded-3xl overflow-hidden border border-[var(--theme-border)] shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-[var(--theme-bg)]/80 backdrop-blur-md px-4 py-1 rounded-full border border-[var(--theme-border)]">
                      <span className="font-inter text-sm font-semibold text-[var(--theme-text)]">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-playfair text-2xl text-[var(--theme-text)] mb-2 group-hover:text-[var(--theme-primary)] transition-colors">
                      {product.title}
                    </h3>
                    <p className="font-inter text-[var(--theme-text-muted)] text-sm mb-6 flex-grow">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-inter text-xl font-medium text-[var(--theme-text)]">
                        ${product.price.toLocaleString('es-CO')}
                      </span>
                      <a 
                        href={buyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-white transition-colors"
                        title="Comprar por WhatsApp"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
