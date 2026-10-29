'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { UploadCloud, X, CheckCircle2 } from 'lucide-react'
import { adminAddGalleryImages } from '@/lib/actions'
import { GALLERY_CATEGORIES } from '@/lib/gallery'

type PendingPhoto = { id: string; title: string; imageUrl: string }

// "IMG_boda-jardin_02" -> "Boda jardin 02"
function titleFromFilename(name: string): string {
  const clean = name.replace(/^(img|dsc|pxl|photo|foto|whatsapp image)([-_ ]|(?=\d))/i, '').replace(/[-_]+/g, ' ').trim()
  // Nombres que son solo números/fechas (cámara, WhatsApp) quedan vacíos para escribirlos a mano
  if (!/[a-záéíóúñ]{3,}/i.test(clean)) return ''
  return clean.charAt(0).toUpperCase() + clean.slice(1)
}

// Fotos de iPhone (HEIC) no se ven en los navegadores: pedimos a Cloudinary la versión JPG
function browserFriendlyUrl(url: string, format?: string): string {
  return format && /^hei[cf]$/i.test(format) ? url.replace(/\.hei[cf]$/i, '.jpg') : url
}

const inputClass = 'w-full px-3 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-sm focus:outline-none focus:border-[var(--theme-primary)]'

export function BulkGalleryUploader() {
  const [photos, setPhotos] = useState<PendingPhoto[]>([])
  const [category, setCategory] = useState(GALLERY_CATEGORIES[0])
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null)
  const [isSaving, startSaving] = useTransition()

  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    if (typeof result.info !== 'object' || !result.info?.secure_url) return
    const info = result.info
    setMessage(null)
    setPhotos(prev => [
      ...prev,
      {
        id: info.public_id,
        title: titleFromFilename(info.original_filename ?? ''),
        imageUrl: browserFriendlyUrl(info.secure_url, info.format),
      },
    ])
  }

  const updateTitle = (id: string, title: string) =>
    setPhotos(prev => prev.map(p => (p.id === id ? { ...p, title } : p)))

  const removePhoto = (id: string) => setPhotos(prev => prev.filter(p => p.id !== id))

  const missingTitles = photos.some(p => !p.title.trim())

  const save = () => {
    startSaving(async () => {
      const result = await adminAddGalleryImages(
        photos.map(({ title, imageUrl }) => ({ title, imageUrl })),
        category
      )
      if (result.ok) {
        setMessage({ type: 'ok', text: `¡${photos.length} ${photos.length === 1 ? 'foto añadida' : 'fotos añadidas'} a la galería!` })
        setPhotos([])
      } else {
        setMessage({ type: 'error', text: result.error ?? 'Algo salió mal.' })
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="bulk-category" className="text-xs text-[var(--theme-text-muted)] font-medium">Categoría (para todas las fotos)</label>
        <select id="bulk-category" value={category} onChange={e => setCategory(e.target.value)} className={inputClass}>
          {GALLERY_CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <CldUploadWidget
        uploadPreset="violeta_preset"
        options={{
          multiple: true,
          maxFiles: 50,
          sources: ['local'],
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'],
          language: 'es',
        }}
        onSuccess={handleUpload}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="w-full py-6 px-4 rounded-xl border-2 border-dashed border-[var(--theme-border)] bg-[var(--theme-bg)] hover:border-[var(--theme-primary)] text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-all flex flex-col items-center justify-center gap-2 text-sm font-medium"
          >
            <UploadCloud className="w-6 h-6" />
            {photos.length ? 'Añadir más fotos' : 'Seleccionar fotos (puedes elegir varias)'}
          </button>
        )}
      </CldUploadWidget>

      {photos.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs text-[var(--theme-text-muted)]">
            {photos.length} {photos.length === 1 ? 'foto subida' : 'fotos subidas'}. Revisa los títulos y pulsa «Añadir a la galería».
          </p>
          <ul className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {photos.map(photo => (
              <li key={photo.id} className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-[var(--theme-border)]">
                  <Image src={photo.imageUrl} alt="" fill sizes="56px" className="object-cover" />
                </div>
                <input
                  value={photo.title}
                  onChange={e => updateTitle(photo.id, e.target.value)}
                  placeholder="Título (obligatorio)"
                  aria-label="Título de la foto"
                  className={`${inputClass} ${!photo.title.trim() ? 'border-red-400' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  title="Quitar de la lista"
                  className="p-2 rounded-full text-[var(--theme-text-muted)] hover:text-red-500 hover:bg-red-500/10 shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {message && (
        <p role="status" className={`text-sm flex items-center gap-2 ${message.type === 'ok' ? 'text-green-600' : 'text-red-500'}`}>
          {message.type === 'ok' && <CheckCircle2 className="w-4 h-4" />}
          {message.text}
        </p>
      )}

      <button
        type="button"
        onClick={save}
        disabled={photos.length === 0 || missingTitles || isSaving}
        className="w-full py-3 rounded-xl bg-[var(--theme-primary)] text-white font-medium hover:bg-[var(--theme-primary-dark)] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving
          ? 'Guardando…'
          : photos.length > 0
            ? `Añadir ${photos.length} ${photos.length === 1 ? 'foto' : 'fotos'} a la galería`
            : 'Añadir a la galería'}
      </button>
      {missingTitles && (
        <p className="text-xs text-red-500 -mt-2">Escribe un título para las fotos marcadas en rojo.</p>
      )}
    </div>
  )
}
