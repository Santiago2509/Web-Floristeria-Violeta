import { getProducts, getGalleryImages } from '@/lib/db'
import { ShoppingBag, ImageIcon, Star } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const products = await getProducts()
  const gallery = await getGalleryImages()
  const featured = products.filter(p => p.isFeatured)

  return (
    <div>
      <h1 className="font-playfair text-3xl text-[var(--theme-text)] mb-8">Resumen de la Tienda</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-inter">
        
        {/* Tarjeta Catálogo */}
        <div className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] p-6 rounded-2xl shadow-sm flex items-center gap-6">
          <div className="p-4 bg-blue-500/10 text-blue-500 rounded-xl">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[var(--theme-text-muted)] text-sm font-medium">Productos Activos</p>
            <p className="text-3xl font-semibold text-[var(--theme-text)]">{products.length}</p>
          </div>
        </div>

        {/* Tarjeta Destacados */}
        <div className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] p-6 rounded-2xl shadow-sm flex items-center gap-6">
          <div className="p-4 bg-yellow-500/10 text-yellow-500 rounded-xl">
            <Star className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[var(--theme-text-muted)] text-sm font-medium">En Página Principal</p>
            <p className="text-3xl font-semibold text-[var(--theme-text)]">{featured.length}</p>
          </div>
        </div>

        {/* Tarjeta Galería */}
        <div className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] p-6 rounded-2xl shadow-sm flex items-center gap-6">
          <div className="p-4 bg-purple-500/10 text-purple-500 rounded-xl">
            <ImageIcon className="w-8 h-8" />
          </div>
          <div>
            <p className="text-[var(--theme-text-muted)] text-sm font-medium">Fotos en Galería</p>
            <p className="text-3xl font-semibold text-[var(--theme-text)]">{gallery.length}</p>
          </div>
        </div>

      </div>

      <div className="mt-12 bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl">
        <h3 className="font-playfair text-xl text-yellow-600 mb-2">Modo de Pruebas Activo</h3>
        <p className="font-inter text-yellow-600/80 text-sm">
          Actualmente, este panel está conectado a una base de datos local en memoria. Toda la estructura está lista y empaquetada. El siguiente paso técnico (cuando estés listo) será conectar `lib/db.ts` a tu servidor de Supabase.
        </p>
      </div>
    </div>
  )
}
