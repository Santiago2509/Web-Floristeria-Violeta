'use client'
import { motion } from 'framer-motion'
import { useCalmMotion } from './useCalmMotion'
import { useHydrated } from './useHydrated'

export function GlobalAurora() {
  const calm = useCalmMotion()
  const hydrated = useHydrated()

  if (!hydrated) return null

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Base sólida — beige claro en light, negro púrpura en dark */}
      <div className="absolute inset-0 bg-[#FAF7FF] dark:bg-[#0D0018]" />

      {/* Blob 1 — Púrpura profundo principal */}
      <motion.div
        animate={calm ? undefined : {
          x: ["-20vw", "30vw", "-10vw", "-20vw"],
          y: ["-10vh", "40vh", "10vh", "-10vh"],
          scale: [1, 1.3, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[80vw] h-[40vw] max-w-[1000px] max-h-[500px] rounded-[40%_60%_70%_30%] will-change-transform"
        style={{
          background: 'radial-gradient(ellipse, #7B00FF55 0%, #4B008222 60%, transparent 100%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Blob 2 — Magenta/Fucsia vibrante */}
      <motion.div
        animate={calm ? undefined : {
          x: ["30vw", "-20vw", "40vw", "30vw"],
          y: ["20vh", "-10vh", "30vh", "20vh"],
          scale: [0.8, 1.2, 1, 0.8],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/4 right-0 w-[60vw] h-[80vw] max-w-[800px] max-h-[1000px] rounded-[60%_40%_30%_70%] will-change-transform"
        style={{
          background: 'radial-gradient(ellipse, #CC00FF40 0%, #880099 30 60%, transparent 100%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Blob 3 — Violeta medio profundo */}
      <motion.div
        animate={calm ? undefined : {
          x: ["-10vw", "40vw", "-30vw", "-10vw"],
          y: ["50vh", "-20vh", "40vh", "50vh"],
          scale: [1, 1.4, 0.85, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-0 left-1/4 w-[70vw] h-[50vw] max-w-[900px] max-h-[600px] rounded-[50%_50%_70%_30%] will-change-transform"
        style={{
          background: 'radial-gradient(ellipse, #6600CC35 0%, #3D006633 60%, transparent 100%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Blob 4 — Acento brillante violeta eléctrico */}
      <motion.div
        animate={calm ? undefined : {
          x: ["40vw", "-40vw", "10vw", "40vw"],
          y: ["-20vh", "50vh", "-10vh", "-20vh"],
          scale: [1.1, 0.75, 1.3, 1.1],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-[30%_70%_50%_50%] will-change-transform"
        style={{
          background: 'radial-gradient(ellipse, #AA00DD30 0%, #66008830 60%, transparent 100%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Blob 5 — Glow central brillante (simula el resplandor del centro de los frames) */}
      <motion.div
        animate={calm ? undefined : {
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.5, 0.8, 0.4, 0.5],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[30%] left-[35%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full will-change-transform"
        style={{
          background: 'radial-gradient(ellipse, #9900FF25 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  )
}


