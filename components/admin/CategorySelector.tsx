'use client'

import { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import { MAX_CATEGORY_LENGTH, normalizeCategory } from '@/lib/catalog'

// Selector de categoría: elige una existente o crea una nueva.
// Las categorías nuevas se guardan con el producto y aparecen solas en la web.
export function CategorySelector({ categories }: { categories: string[] }) {
  const [options, setOptions] = useState(categories)
  const [selected, setSelected] = useState(categories[0] ?? '')
  const [creating, setCreating] = useState(false)
  const [draft, setDraft] = useState('')

  const addCategory = () => {
    const name = normalizeCategory(draft)
    if (!name) return
    const existing = options.find(o => o.toLocaleLowerCase('es') === name.toLocaleLowerCase('es'))
    if (!existing) setOptions(prev => [...prev, name])
    setSelected(existing ?? name)
    setDraft('')
    setCreating(false)
  }

  return (
    <div className="space-y-2">
      <span className="text-xs text-[var(--theme-text-muted)] font-medium">Categoría</span>
      <input type="hidden" name="category" value={selected} />

      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Categoría">
        {options.map(option => {
          const isActive = option === selected
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setSelected(option)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                isActive
                  ? 'bg-[var(--theme-primary)] border-[var(--theme-primary)] text-white'
                  : 'border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)]'
              }`}
            >
              {isActive && <Check className="w-3 h-3" />}
              {option}
            </button>
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
            placeholder="Ej: Rosas preservadas"
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
      {creating && (
        <p className="text-[11px] text-[var(--theme-text-muted)]">
          La categoría nueva aparecerá en la web en cuanto guardes un producto con ella.
        </p>
      )}
    </div>
  )
}
