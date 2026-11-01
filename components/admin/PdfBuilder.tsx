'use client'

import { useMemo, useState } from 'react'
import { Check, FileDown, Eye, Link2 } from 'lucide-react'

type Category = { name: string; count: number }

const inputClass = 'w-full px-4 py-2.5 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-primary)]'

// Plantillas rápidas para la portada
const PRESETS = [
  { title: 'Catálogo', subtitle: `Colección ${new Date().getFullYear()}` },
  { title: 'Amor y Amistad', subtitle: `Septiembre ${new Date().getFullYear()}` },
  { title: 'Día de la Madre', subtitle: `Mayo ${new Date().getFullYear()}` },
  { title: 'Rosas Preservadas', subtitle: 'Colección eterna' },
]

export function PdfBuilder({ categories }: { categories: Category[] }) {
  const [selected, setSelected] = useState<string[]>(categories.map(c => c.name))
  const [title, setTitle] = useState(PRESETS[0].title)
  const [subtitle, setSubtitle] = useState(PRESETS[0].subtitle)
  const [copied, setCopied] = useState(false)

  const allSelected = selected.length === categories.length
  const total = useMemo(() => categories.filter(c => selected.includes(c.name)).reduce((n, c) => n + c.count, 0), [categories, selected])

  const toggle = (name: string) =>
    setSelected(prev => (prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]))

  // Enlace al PDF (sin categorías = todas)
  const href = (download: boolean) => {
    const params = new URLSearchParams()
    if (!allSelected) params.set('categorias', selected.join(','))
    params.set('titulo', title.trim() || 'Catálogo')
    if (subtitle.trim()) params.set('subtitulo', subtitle.trim())
    if (download) params.set('descargar', '1')
    return `/catalogo/pdf?${params.toString()}`
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(new URL(href(false), window.location.origin).toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (categories.length === 0) {
    return <p className="text-[var(--theme-text-muted)]">Todavía no hay productos en el catálogo.</p>
  }

  return (
    <div className="space-y-8">
      {/* Categorías */}
      <section className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[var(--theme-text)]">1. Categorías</h2>
          <button
            type="button"
            onClick={() => setSelected(allSelected ? [] : categories.map(c => c.name))}
            className="text-sm text-[var(--theme-primary)] hover:underline"
          >
            {allSelected ? 'Quitar todas' : 'Marcar todas'}
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {categories.map(c => {
            const on = selected.includes(c.name)
            return (
              <button
                key={c.name}
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggle(c.name)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors ${on ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/5' : 'border-[var(--theme-border)] hover:border-[var(--theme-primary)]/50'}`}
              >
                <span className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${on ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] text-white' : 'border-[var(--theme-border)]'}`}>
                  {on && <Check className="w-3.5 h-3.5" />}
                </span>
                <span className="flex-1 text-[var(--theme-text)]">{c.name}</span>
                <span className="text-xs text-[var(--theme-text-muted)]">{c.count} {c.count === 1 ? 'producto' : 'productos'}</span>
              </button>
            )
          })}
        </div>
        <p className="text-xs text-[var(--theme-text-muted)] mt-3">
          Un producto con varias categorías aparece en cada una de las que elijas.
        </p>
      </section>

      {/* Portada */}
      <section className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold text-[var(--theme-text)]">2. Portada</h2>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(p => (
            <button
              key={p.title}
              type="button"
              onClick={() => { setTitle(p.title); setSubtitle(p.subtitle) }}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${title === p.title ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] text-white' : 'border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:border-[var(--theme-primary)]'}`}
            >
              {p.title}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="space-y-1">
            <span className="text-xs text-[var(--theme-text-muted)] font-medium">Título</span>
            <input value={title} maxLength={60} onChange={e => setTitle(e.target.value)} className={inputClass} />
          </label>
          <label className="space-y-1">
            <span className="text-xs text-[var(--theme-text-muted)] font-medium">Subtítulo</span>
            <input value={subtitle} maxLength={60} onChange={e => setSubtitle(e.target.value)} className={inputClass} />
          </label>
        </div>
      </section>

      {/* Generar */}
      <section className="space-y-3">
        <p className="text-sm text-[var(--theme-text-muted)]">
          {selected.length === 0
            ? 'Elige al menos una categoría.'
            : <>Se incluirán <strong className="text-[var(--theme-text)]">{selected.length} {selected.length === 1 ? 'categoría' : 'categorías'}</strong> ({total} productos).</>}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={selected.length ? href(true) : undefined}
            aria-disabled={!selected.length}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--theme-primary)] text-white font-medium shadow-md hover:bg-[var(--theme-primary-dark)] transition-colors ${!selected.length ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <FileDown className="w-5 h-5" />
            Descargar PDF
          </a>
          <a
            href={selected.length ? href(false) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!selected.length}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--theme-border)] text-[var(--theme-text)] hover:border-[var(--theme-primary)] transition-colors ${!selected.length ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <Eye className="w-5 h-5" />
            Ver
          </a>
          <button
            type="button"
            onClick={copyLink}
            disabled={!selected.length}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--theme-border)] text-[var(--theme-text)] hover:border-[var(--theme-primary)] transition-colors disabled:opacity-50"
          >
            <Link2 className="w-5 h-5" />
            {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
          </button>
        </div>
        <p className="text-xs text-[var(--theme-text-muted)]">
          El enlace siempre muestra los productos actuales: puedes compartirlo por WhatsApp y se actualiza solo.
        </p>
      </section>
    </div>
  )
}
