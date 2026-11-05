'use client'
import { useSyncExternalStore } from 'react'

// ============================================================================
// Azar "por visita": una semilla fija mientras la página está abierta y nueva al recargar.
// Se calcula en el navegador (0 en el servidor) para que el HTML del servidor coincida.
// ============================================================================

let pageSeed = 0
const getPageSeed = () => (pageSeed ||= 1 + Math.floor(Math.random() * 2 ** 31))
const noopSubscribe = () => () => {}

/** Semilla aleatoria de esta visita (0 durante el render del servidor). */
export function usePageSeed(): number {
  return useSyncExternalStore(noopSubscribe, getPageSeed, () => 0)
}

/** Mezcla determinista a partir de una semilla (mulberry32 + Fisher-Yates). */
export function seededShuffle<T>(items: T[], seed: number): T[] {
  const out = [...items]
  let s = seed >>> 0
  const rand = () => {
    s = (s + 0x6D2B79F5) >>> 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
