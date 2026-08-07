'use client'

import { useState } from 'react'
import { X, Save, Trash2 } from 'lucide-react'
import { adminSaveOccasion, adminDeleteOccasion } from '@/lib/actions'

interface OccasionSelectorProps {
  savedOccasions: string[]
}

export function OccasionSelector({ savedOccasions }: OccasionSelectorProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const MAX_TAGS = 3

  const handleSelect = (tag: string) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter(t => t !== tag))
    } else if (selected.length < MAX_TAGS) {
      setSelected([...selected, tag])
    }
  }

  const handleSaveNewTag = async () => {
    const trimmed = newTag.trim()
    if (!trimmed) return
    
    // Si no está ya seleccionado y tenemos espacio, lo agregamos localmente
    if (!selected.includes(trimmed) && selected.length < MAX_TAGS) {
      setSelected([...selected, trimmed])
    }
    
    // Si no está guardado en la base de datos, lo guardamos para el futuro
    if (!savedOccasions.includes(trimmed)) {
      setIsSaving(true)
      await adminSaveOccasion(trimmed)
      setIsSaving(false)
    }
    
    setNewTag('')
  }

  return (
    <div className="space-y-3">
      <label className="text-xs text-[var(--theme-text-muted)] font-medium">
        Ocasiones Sugeridas (Máx {MAX_TAGS})
      </label>
      
      {/* Hidden input to pass the selected tags to the form */}
      <input type="hidden" name="ocasionSugerida" value={selected.join(',')} />

      {/* Tags seleccionados */}
      <div className="flex flex-wrap gap-2 min-h-[32px] p-2 bg-[var(--theme-bg)] rounded-xl border border-[var(--theme-border)]">
        {selected.length === 0 && (
          <span className="text-xs text-[var(--theme-text-muted)]/50 italic px-2 py-1">Ninguna ocasión seleccionada</span>
        )}
        {selected.map(tag => (
          <span 
            key={`sel-${tag}`}
            className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--theme-primary)] text-white text-[11px] font-medium tracking-wide uppercase rounded-full shadow-sm"
          >
            {tag}
            <button 
              type="button" 
              onClick={() => handleSelect(tag)}
              className="hover:bg-white/20 rounded-full p-0.5 transition-colors ml-1"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      {/* Selector de tags guardados */}
      {savedOccasions.length > 0 && (
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex justify-between items-center w-full mb-1">
            <span className="text-[10px] uppercase text-[var(--theme-text-muted)]">Guardadas:</span>
            <button
              type="button"
              onClick={() => setIsDeleteMode(!isDeleteMode)}
              className={`flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 rounded transition-colors ${
                isDeleteMode 
                  ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 font-medium border border-red-500/30' 
                  : 'text-[var(--theme-text-muted)] hover:bg-[var(--theme-bg)] border border-transparent'
              }`}
            >
              <Trash2 className="w-3 h-3" />
              {isDeleteMode ? 'Cancelar Eliminación' : 'Eliminar Etiquetas'}
            </button>
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {savedOccasions.map(tag => (
              <button
                key={`saved-${tag}`}
                type="button"
                onClick={async () => {
                  if (isDeleteMode) {
                    if (window.confirm(`¿Estás seguro de eliminar "${tag}" de las ocasiones guardadas?`)) {
                      await adminDeleteOccasion(tag)
                      if (selected.includes(tag)) {
                        setSelected(selected.filter(t => t !== tag))
                      }
                    }
                  } else {
                    handleSelect(tag)
                  }
                }}
                disabled={!isDeleteMode && !selected.includes(tag) && selected.length >= MAX_TAGS}
                className={`flex items-center gap-1 px-3 py-1.5 text-[10px] uppercase tracking-wider rounded-md border transition-all ${
                  isDeleteMode
                    ? 'border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
                    : selected.includes(tag)
                      ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] font-medium'
                      : 'border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:border-[var(--theme-primary)]/50 hover:text-[var(--theme-text)] disabled:opacity-30 disabled:cursor-not-allowed'
                }`}
              >
                {isDeleteMode && <Trash2 className="w-3 h-3" />}
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input para nueva ocasión */}
      <div className="flex gap-2 pt-2 border-t border-[var(--theme-border)]/50">
        <input 
          type="text" 
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Ej: Día de la Madre"
          className="flex-1 px-4 py-2 text-sm rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] focus:outline-none focus:border-[var(--theme-primary)]"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSaveNewTag()
            }
          }}
        />
        <button
          type="button"
          onClick={handleSaveNewTag}
          disabled={!newTag.trim() || isSaving}
          className="px-4 py-2 bg-[var(--theme-bg-section)] border border-[var(--theme-border)] hover:bg-[var(--theme-primary)] hover:text-white hover:border-[var(--theme-primary)] text-[var(--theme-text)] rounded-xl transition-colors flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          title="Guardar para futuros productos"
        >
          {isSaving ? (
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4" />
              Guardar
            </>
          )}
        </button>
      </div>
    </div>
  )
}
