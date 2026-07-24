import { getProducts } from '@/lib/db'
import { adminAddProduct, adminDeleteProduct, adminToggleFeatured } from '@/lib/actions'
import { Star, Trash2, Plus } from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function AdminCatalogoPage() {
  const products = await getProducts()

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
            
            <form action={adminAddProduct} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-[var(--theme-text-muted)] font-medium">Nombre del Arreglo</label>
                <input name="title" required className="w-full px-4 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:border-[var(--theme-primary)]" placeholder="Ej. Ramo de Rosas" />
              </div>
              
              <div className="space-y-1">
                <label className="text-xs text-[var(--theme-text-muted)] font-medium">Descripción</label>
                <textarea name="description" required rows={2} className="w-full px-4 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:border-[var(--theme-primary)] resize-none" placeholder="Breve descripción..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-[var(--theme-text-muted)] font-medium">Precio (COP)</label>
                  <input name="price" type="number" required className="w-full px-4 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:border-[var(--theme-primary)]" placeholder="120000" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[var(--theme-text-muted)] font-medium">Categoría</label>
                  <select name="category" className="w-full px-4 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:border-[var(--theme-primary)]">
                    <option>Ramos</option>
                    <option>Cajas</option>
                    <option>Eventos</option>
                    <option>Regalos</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[var(--theme-text-muted)] font-medium">URL de Imagen (Opcional por ahora)</label>
                <input name="imageUrl" className="w-full px-4 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:border-[var(--theme-primary)] text-xs" placeholder="https://..." />
                <p className="text-[10px] text-[var(--theme-text-muted)]">Si lo dejas vacío, se usará una imagen aleatoria.</p>
              </div>

              <button type="submit" className="w-full py-3 mt-2 rounded-xl bg-[var(--theme-primary)] text-white font-medium hover:bg-[var(--theme-primary-dark)] transition-colors shadow-md">
                Crear Producto
              </button>
            </form>
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
