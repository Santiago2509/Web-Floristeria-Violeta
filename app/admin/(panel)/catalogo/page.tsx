import { getProducts, getSavedOccasions } from '@/lib/db'
import { adminDeleteProduct, adminToggleFeatured } from '@/lib/actions'
import { getCategories } from '@/lib/catalog'
import { ProductForm } from '@/components/admin/ProductForm'
import { Star, Trash2, Plus } from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function AdminCatalogoPage() {
  const [products, savedOccasions] = await Promise.all([getProducts(), getSavedOccasions()])

  return (
    <div className="font-inter">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-playfair text-3xl text-[var(--theme-text)]">Gestor de Catálogo</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Formulario Agregar Producto */}
        <div className="xl:col-span-1">
          <div className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] p-6 rounded-2xl shadow-sm sticky top-24">
            <h2 className="font-semibold text-lg mb-6 flex items-center gap-2 text-[var(--theme-text)]">
              <Plus className="w-5 h-5 text-[var(--theme-primary)]" />
              Nuevo Producto
            </h2>
            
            <ProductForm categories={getCategories(products)} savedOccasions={savedOccasions} />
          </div>
        </div>

        {/* Lista de Productos */}
        <div className="xl:col-span-2">
          <div className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[var(--theme-border)]">
              <h2 className="font-semibold text-lg text-[var(--theme-text)]">Productos Actuales ({products.length})</h2>
            </div>
            
            <div className="divide-y divide-[var(--theme-border)]">
              {products.map(product => (
                <div key={product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-[var(--theme-bg)] transition-colors">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-playfair text-xl text-[var(--theme-text)]">{product.title}</h3>
                    <p className="text-sm text-[var(--theme-text-muted)] mb-2 line-clamp-1">{product.description}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      <span className="font-semibold text-[var(--theme-primary)]">${product.price.toLocaleString('es-CO')}</span>
                      <span className="text-xs px-2 py-1 bg-[var(--theme-border)]/50 rounded-full">{product.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Botón Destacar */}
                    <form action={async () => {
                      'use server'
                      await adminToggleFeatured(product.id)
                    }}>
                      <button 
                        title={product.isFeatured ? "Quitar del Inicio" : "Destacar en Inicio"}
                        className={`p-3 rounded-full transition-colors ${
                          product.isFeatured 
                            ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30' 
                            : 'bg-[var(--theme-bg)] text-[var(--theme-text-muted)] hover:text-yellow-500 hover:bg-yellow-500/10'
                        }`}
                      >
                        <Star className="w-5 h-5" fill={product.isFeatured ? "currentColor" : "none"} />
                      </button>
                    </form>

                    {/* Botón Eliminar */}
                    <form action={async () => {
                      'use server'
                      await adminDeleteProduct(product.id)
                    }}>
                      <button 
                        title="Eliminar producto"
                        className="p-3 rounded-full bg-[var(--theme-bg)] text-[var(--theme-text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
              
              {products.length === 0 && (
                <div className="p-12 text-center text-[var(--theme-text-muted)]">
                  No tienes productos en el catálogo.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
