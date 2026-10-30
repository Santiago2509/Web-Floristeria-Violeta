import { getProducts } from '@/lib/db'
import { CatalogBrowser } from '@/components/catalog/CatalogBrowser'

export const metadata = {
  title: 'Catálogo',
  description: 'Explora nuestra colección exclusiva de ramos, cajas y arreglos florales.',
}

// Para asegurar que los datos no se queden en caché al agregar/eliminar desde el admin
export const dynamic = 'force-dynamic'

type Props = { searchParams: Promise<{ q?: string; categoria?: string }> }

export default async function CatalogoPage({ searchParams }: Props) {
  const [products, params] = await Promise.all([getProducts(), searchParams])

  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-24 bg-[var(--theme-bg)]">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-3 font-inter text-[11px] uppercase tracking-[0.35em] text-[var(--theme-primary)] font-semibold mb-4">
            <span className="w-8 h-px bg-[var(--theme-primary)]" />
            Nuestras creaciones
            <span className="w-8 h-px bg-[var(--theme-primary)]" />
          </span>
          <h1 className="font-playfair text-5xl md:text-6xl text-[var(--theme-text)] leading-[1.05]">
            Catálogo <span className="italic text-gradient-violet">exclusivo</span>
          </h1>
        </div>

        <CatalogBrowser
          products={products}
          initialQuery={params.q ?? ''}
          initialCategory={params.categoria ?? ''}
        />
      </div>
    </main>
  )
}
