'use client'

import { useActionState, useState } from 'react'
import { Pencil, Trash2, X, Check, AlertCircle, CheckCircle2, Tags } from 'lucide-react'
import { adminDeleteCategory, adminRenameCategory, type CategoryActionState } from '@/lib/actions'

type Category = { name: string; count: number; onlyHere: number }

const inputClass = 'flex-1 min-w-0 px-3 py-2 text-sm rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:border-[var(--theme-primary)]'

function Row({ category, others }: { category: Category; others: string[] }) {
  const [mode, setMode] = useState<'view' | 'rename' | 'delete'>('view')
  const [renameState, renameAction, renaming] = useActionState<CategoryActionState, FormData>(adminRenameCategory, {})
  const [deleteState, deleteAction, deleting] = useActionState<CategoryActionState, FormData>(adminDeleteCategory, {})
  const state = mode === 'rename' ? renameState : deleteState

  return (
    <li className="py-3">
      {mode === 'view' && (
        <div className="flex items-center gap-3">
          <span className="flex-1 text-[var(--theme-text)] font-medium">{category.name}</span>
          <span className="text-xs text-[var(--theme-text-muted)]">{category.count} {category.count === 1 ? 'producto' : 'productos'}</span>
          <button type="button" onClick={() => setMode('rename')} title="Renombrar" className="p-2 rounded-full text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10">
            <Pencil className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => setMode('delete')} title="Eliminar" className="p-2 rounded-full text-[var(--theme-text-muted)] hover:text-red-500 hover:bg-red-500/10">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {mode === 'rename' && (
        <form action={renameAction} className="flex items-center gap-2">
          <input type="hidden" name="from" value={category.name} />
          <input name="to" defaultValue={category.name} autoFocus maxLength={40} className={inputClass} aria-label={`Nuevo nombre para ${category.name}`} />
          <button type="submit" disabled={renaming} title="Guardar" className="p-2 rounded-full bg-[var(--theme-primary)] text-white disabled:opacity-60"><Check className="w-4 h-4" /></button>
          <button type="button" onClick={() => setMode('view')} title="Cancelar" className="p-2 rounded-full text-[var(--theme-text-muted)] hover:bg-[var(--theme-border)]/50"><X className="w-4 h-4" /></button>
        </form>
      )}

      {mode === 'delete' && (
        <form action={deleteAction} className="space-y-2 rounded-xl border border-red-500/30 bg-red-500/5 p-3">
          <input type="hidden" name="name" value={category.name} />
          <p className="text-sm text-[var(--theme-text)]">
            ¿Eliminar <strong>{category.name}</strong>? Desaparecerá de la web, de los filtros y del catálogo PDF.
          </p>
          {category.onlyHere > 0 ? (
            <label className="flex flex-wrap items-center gap-2 text-sm text-[var(--theme-text-muted)]">
              {category.onlyHere} {category.onlyHere === 1 ? 'producto solo tiene' : 'productos solo tienen'} esta categoría. Pasarán a:
              <select name="replacement" required defaultValue="" className="px-3 py-1.5 rounded-lg bg-[var(--theme-bg)] border border-[var(--theme-border)] text-[var(--theme-text)]">
                <option value="" disabled>Elegir…</option>
                {others.map(o => <option key={o}>{o}</option>)}
              </select>
            </label>
          ) : (
            <p className="text-xs text-[var(--theme-text-muted)]">Los productos que la tenían conservan sus otras categorías.</p>
          )}
          <div className="flex gap-2">
            <button type="submit" disabled={deleting} className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium disabled:opacity-60">
              {deleting ? 'Eliminando…' : 'Sí, eliminar'}
            </button>
            <button type="button" onClick={() => setMode('view')} className="px-4 py-2 rounded-lg border border-[var(--theme-border)] text-sm text-[var(--theme-text)]">Cancelar</button>
          </div>
        </form>
      )}

      {mode !== 'view' && state.error && (
        <p role="alert" className="mt-2 flex items-start gap-2 text-sm text-red-500"><AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />{state.error}</p>
      )}
      {mode !== 'view' && state.ok && state.message && (
        <p role="status" className="mt-2 flex items-start gap-2 text-sm text-green-600"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />{state.message}</p>
      )}
    </li>
  )
}

export function CategoryManager({ categories, allNames }: { categories: Category[]; allNames: string[] }) {
  if (categories.length === 0) return null
  return (
    <div className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] p-6 rounded-2xl shadow-sm">
      <h2 className="font-semibold text-lg mb-1 flex items-center gap-2 text-[var(--theme-text)]">
        <Tags className="w-5 h-5 text-[var(--theme-primary)]" />
        Categorías
      </h2>
      <p className="text-xs text-[var(--theme-text-muted)] mb-2">Renombra o elimina categorías. Solo se muestran en la web las que tienen productos.</p>
      <ul className="divide-y divide-[var(--theme-border)]">
        {categories.map(c => (
          <Row key={c.name} category={c} others={allNames.filter(n => n !== c.name)} />
        ))}
      </ul>
    </div>
  )
}
