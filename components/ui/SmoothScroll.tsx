'use client'
import { ReactLenis } from 'lenis/react'
import { MotionConfig, useReducedMotion } from 'framer-motion'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Con "reducir movimiento" el scroll vuelve a ser el nativo del navegador
  const smooth = !useReducedMotion()

  // MotionConfig: Framer Motion omite transformaciones si el usuario pidió reducir movimiento
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: smooth }}>
        {children}
      </ReactLenis>
    </MotionConfig>
  )
}
