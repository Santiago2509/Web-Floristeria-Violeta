'use client'

import { useActionState, useState } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { adminAddProduct, type ProductFormState } from '@/lib/actions'
import { ImageUploader } from '@/components/ui/ImageUploader'
import { OccasionSelector } from '@/components/admin/OccasionSelector'
import { CategorySelector } from '@/components/admin/CategorySelector'

const inputClass = 'w-full px-4 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:border-[var(--theme-primary)]'

export function ProductForm({ categories, savedOccasions }: { categories: string[]; savedOccasions: string[] }) {
  // Tras guardar con éxito, cambiamos la "versión" del formulario para vaciarlo
  const [version, setVersion] = useState(0)
  const [state, formAction, isPending] = useActionState<ProductFormState, FormData>(
    async (prev, formData) => {
      const result = await adminAddProduct(prev, formData)
      if (result.ok) setVersion(v => v + 1)
      return result
    },
    {}
  )

  return (
    <form key={version} action={formAction} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="title" className="text-xs text-[var(--theme-text-muted)] font-medium">Nombre del Arreglo</label>
        <input id="title" name="title" required className={inputClass} placeholder="Ej. Ramo de Rosas" />
      </div>

      <div className="space-y-1">
        <label htmlFor="description" className="text-xs text-[var(--theme-text-muted)] font-medium">Descripción</label>
        <textarea id="description" name="description" required rows={2} className={`${inputClass} resize-none`} placeholder="Breve descripción…" />
        <p className="text-[11px] text-[var(--theme-text-muted)]">Menciona flores, colores y ocasión: el buscador del catálogo usa este texto.</p>
      </div>

      <div className="space-y-1">
        <label htmlFor="price" className="text-xs text-[var(--theme-text-muted)] font-medium">Precio (COP)</label>
        <input id="price" name="price" type="number" min={0} required className={inputClass} placeholder="120000" />
      </div>

      <CategorySelector categories={categories} />

      <div className="space-y-1">
        <span className="text-xs text-[var(--theme-text-muted)] font-medium">Foto del Producto</span>
        <ImageUploader name="imageUrl" />
      </div>

      <OccasionSelector savedOccasions={savedOccasions} />

      <div className="flex items-center gap-2 pt-2 pb-2">
        <input type="checkbox" id="isFeatured" name="isFeatured" className="w-4 h-4 rounded border-[var(--theme-border)] text-[var(--theme-primary)] focus:ring-[var(--theme-primary)]" />
        <label htmlFor="isFeatured" className="text-sm text-[var(--theme-text)] font-medium cursor-pointer">
          Destacar en la página de inicio
        </label>
      </div>

      {state.error && (
        <p role="alert" className="flex items-start gap-2 text-sm text-red-500">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          {state.error}
        </p>
      )}
      {state.ok && state.message && (
        <p role="status" className="flex items-start gap-2 text-sm text-green-600">
          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 mt-2 rounded-xl bg-[var(--theme-primary)] text-white font-medium hover:bg-[var(--theme-primary-dark)] transition-colors shadow-md disabled:opacity-60"
      >
        {isPending ? 'Guardando…' : 'Crear Producto'}
      </button>
    </form>
  )
}
