'use client'
import { useSyncExternalStore } from 'react'

const noopSubscribe = () => () => {}

/** false durante el render del servidor y la hidratación; true después en el cliente. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false)
}
