import { getGalleryImages } from '@/lib/db'
import { adminDeleteGalleryImage } from '@/lib/actions'
import { Trash2, Plus } from 'lucide-react'
import Image from 'next/image'
import { BulkGalleryUploader } from '@/components/admin/BulkGalleryUploader'

export const dynamic = 'force-dynamic'

export default async function AdminGaleriaPage() {
  const images = await getGalleryImages()

  return (
    <div className="font-inter">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-playfair text-3xl text-[var(--theme-text)]">Gestor de Galería</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        
        {/* Formulario Agregar Imagen */}
        <div className="xl:col-span-2">
          <div className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] p-6 rounded-2xl shadow-sm sticky top-24">
            <h2 className="font-semibold text-lg mb-6 flex items-center gap-2 text-[var(--theme-text)]">
              <Plus className="w-5 h-5 text-[var(--theme-primary)]" />
              Subir Fotos
            </h2>
            
            <BulkGalleryUploader />
          </div>
        </div>

        {/* Grilla de Imágenes */}
        <div className="xl:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map(img => (
              <div key={img.id} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-[var(--theme-border)]">
                <div className="aspect-square relative">
                  <Image src={img.imageUrl} alt={img.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Info Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-xs text-white/70 uppercase tracking-widest">{img.category}</p>
                    <p className="text-white font-playfair text-lg">{img.title}</p>
                  </div>

                  {/* Botón Eliminar (Aparece en hover) */}
                  <form action={async () => {
                    'use server'
                    await adminDeleteGalleryImage(img.id)
                  }}>
                    <button 
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all shadow-md"
                      title="Eliminar foto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>

          {images.length === 0 && (
            <div className="p-12 text-center text-[var(--theme-text-muted)] bg-[var(--theme-bg-card)] rounded-2xl border border-[var(--theme-border)]">
              No tienes imágenes en la galería. Sube la primera para inspirar a tus clientes.
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
