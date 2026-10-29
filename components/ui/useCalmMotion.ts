'use client'
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useHydrated } from './useHydrated'

/**
 * true si conviene desactivar animaciones decorativas continuas:
 * el usuario pidió "reducir movimiento" o es una pantalla móvil
 * (los fondos desenfocados animados consumen mucha GPU/batería).
 */
export function useCalmMotion(): boolean {
  const reduceMotion = useReducedMotion()
  const hydrated = useHydrated()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Hasta hidratar devolvemos false para que coincida con el render del servidor
  return hydrated && (Boolean(reduceMotion) || isMobile)
}
