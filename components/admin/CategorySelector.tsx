'use client'

import { useState } from 'react'
import { Plus, Check, Star } from 'lucide-react'
import { MAX_CATEGORY_LENGTH, normalizeCategory } from '@/lib/catalog'

const MAX_EXTRA = 6

const same = (a: string, b: string) => a.toLocaleLowerCase('es') === b.toLocaleLowerCase('es')

// Selector de categorías: se pueden marcar varias y una es la principal (★).
// - La principal es la que se muestra en la etiqueta del producto.
// - Las adicionales hacen que el producto también aparezca en esas categorías.
export function CategorySelector({
  categories,
  initialPrimary,
  initialExtra = [],
}: {
  categories: string[]
  initialPrimary?: string
  initialExtra?: string[]
}) {
  const [options, setOptions] = useState(() => {
    const all = [...categories]
    for (const c of [initialPrimary, ...initialExtra]) if (c && !all.some(o => same(o, c))) all.push(c)
    return all
  })
  const [primary, setPrimary] = useState(initialPrimary ?? categories[0] ?? '')
  const [extra, setExtra] = useState<string[]>(initialExtra)
  const [creating, setCreating] = useState(false)
  const [draft, setDraft] = useState('')

  const isSelected = (c: string) => same(c, primary) || extra.some(e => same(e, c))

  // Tocar una categoría: la añade o la quita. Si no hay principal, pasa a serlo.
  const toggle = (c: string) => {
    if (same(c, primary)) {
      // quitar la principal: la primera adicional pasa a principal
      const [next, ...rest] = extra
      setPrimary(next ?? '')
      setExtra(rest)
    } else if (extra.some(e => same(e, c))) {
      setExtra(extra.filter(e => !same(e, c)))
    } else if (!primary) {
      setPrimary(c)
    } else if (extra.length < MAX_EXTRA) {
      setExtra([...extra, c])
    }
  }

  const makePrimary = (c: string) => {
    if (same(c, primary)) return
    setExtra([...extra.filter(e => !same(e, c)), ...(primary ? [primary] : [])])
    setPrimary(c)
  }

  const addCategory = () => {
    const name = normalizeCategory(draft)
    if (!name) return
    const existing = options.find(o => same(o, name))
    if (!existing) setOptions(prev => [...prev, name])
    const label = existing ?? name
    if (!isSelected(label)) {
      if (!primary) setPrimary(label)
      else if (extra.length < MAX_EXTRA) setExtra([...extra, label])
    }
    setDraft('')
    setCreating(false)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs text-[var(--theme-text-muted)] font-medium">Categorías</span>
        <span className="text-[11px] text-[var(--theme-text-muted)]">Toca para elegir · ★ = principal</span>
      </div>
      <input type="hidden" name="category" value={primary} />
      <input type="hidden" name="extraCategories" value={extra.join(',')} />

      <div className="flex flex-wrap gap-2">
        {options.map(option => {
          const selected = isSelected(option)
          const main = same(option, primary)
          return (
            <span
              key={option}
              className={`inline-flex items-center rounded-full text-xs font-medium border transition-colors overflow-hidden ${
                main
                  ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] text-white'
                  : selected
                    ? 'bg-[var(--theme-primary)]/10 border-[var(--theme-primary)] text-[var(--theme-primary)]'
                    : 'border-[var(--theme-border)] text-[var(--theme-text-muted)]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(option)}
                aria-pressed={selected}
                className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 hover:opacity-80"
              >
                {selected && <Check className="w-3 h-3" />}
                {option}
              </button>
              {selected && (
                <button
                  type="button"
                  onClick={() => makePrimary(option)}
                  title={main ? 'Categoría principal' : 'Marcar como principal'}
                  aria-label={main ? `${option} es la principal` : `Marcar ${option} como principal`}
                  className={`pr-2.5 pl-1 py-1.5 ${main ? '' : 'opacity-60 hover:opacity-100'}`}
                >
                  <Star className="w-3.5 h-3.5" fill={main ? 'currentColor' : 'none'} />
                </button>
              )}
            </span>
          )
        })}

        {!creating && (
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-dashed border-[var(--theme-primary)]/60 text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10"
          >
            <Plus className="w-3 h-3" />
            Nueva categoría
          </button>
        )}
      </div>

      {creating && (
        <div className="flex gap-2">
          <input
            autoFocus
            value={draft}
            maxLength={MAX_CATEGORY_LENGTH}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') { e.preventDefault(); addCategory() }
              if (e.key === 'Escape') { setCreating(false); setDraft('') }
            }}
            placeholder="Ej: Peluches"
            className="flex-1 px-4 py-2 text-sm rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:border-[var(--theme-primary)]"
          />
          <button
            type="button"
            onClick={addCategory}
            disabled={!draft.trim()}
            className="px-4 py-2 rounded-xl bg-[var(--theme-primary)] text-white text-xs font-medium disabled:opacity-50"
          >
            Añadir
          </button>
        </div>
      )}

      <p className="text-[11px] text-[var(--theme-text-muted)]">
        {primary
          ? <>Principal: <strong className="text-[var(--theme-text)]">{primary}</strong>{extra.length > 0 && <> · También en: {extra.join(', ')}</>}</>
          : 'Elige al menos una categoría.'}
      </p>
    </div>
  )
}
