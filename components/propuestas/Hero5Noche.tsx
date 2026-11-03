'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { AnimatedRose } from '@/components/ui/AnimatedRose'
import { CircleText, GoldButtons } from './shared'

const JOST = { fontFamily: 'var(--font-jost), sans-serif' }

// Letra clara con resplandor violeta/fucsia (igual en tema claro y oscuro: el fondo siempre es noche)
const VIOLET_NEON = {
  '--hv-letter': '#F7F1FF',
  '--hv-1': 'rgba(255,255,255,0.95)',
  '--hv-2': 'rgba(196,160,255,0.95)',
  '--hv-3': 'rgba(139,92,246,0.85)',
  '--hv-4': 'rgba(192,38,211,0.6)',
} as React.CSSProperties

// Partículas de luz (posiciones fijas para que el servidor y el navegador coincidan)
const SPARKS = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 2 + ((i * 7) % 4),
  delay: (i * 0.63) % 9,
  duration: 9 + ((i * 5) % 8),
}))

// PROPUESTA 5 (libre) — "Noche violeta": video de rosas con velo violeta, rosa que se dibuja, anillo giratorio y partículas de luz
export function Hero5Noche() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 60, damping: 15 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 60, damping: 15 })

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_at_50%_42%,#4A1D7A_0%,#24103F_45%,#0E0619_100%)] text-white flex items-center justify-center [perspective:1200px]"
      onPointerMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
    >
      {/* Video de fondo con velo violeta noche (para que el letrero y los textos se lean) */}
      <video autoPlay loop muted playsInline preload="metadata" poster="/assets/hero_poster.webp" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover">
        <source src="/assets/heroprincipal.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#24103F]/55 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(20,8,40,0.55)_0%,rgba(20,8,40,0.35)_55%,rgba(14,6,25,0.75)_100%)]" />

      {/* Partículas de luz cálida */}
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="absolute bottom-[-10px] rounded-full bg-[#FFE3A3]"
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 8px 2px rgba(255,200,110,0.7)',
            animation: `gold-rise ${s.duration}s linear ${s.delay}s infinite`,
          }}
        />
      ))}

      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative flex flex-col items-center text-center px-6 pt-20 pb-10">
        {/* Rosa + anillos */}
        <div className="relative w-[78vw] max-w-[380px] aspect-square flex items-center justify-center mb-2">
          <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(36,16,63,0.75)_0%,rgba(36,16,63,0.35)_60%,transparent_72%)] backdrop-blur-[2px]" />
          <CircleText text="FLORISTERÍA VIOLETA · CALI · FLORES QUE DICEN LO QUE SIENTES · " size={420} className="absolute inset-0 w-full h-full [filter:drop-shadow(0_1px_6px_rgba(20,8,40,0.9))]" />
          <div className="absolute inset-[13%] rounded-full border border-white/35" />
          <div className="absolute inset-[14%] flex items-center justify-center" style={{ ['--color-primary' as string]: '#F3E8FF' }}>
            <AnimatedRose className="w-full scale-125" />
          </div>
        </div>

        <h1 className="relative halo-violet leading-none" style={{ ...VIOLET_NEON, ...JOST, fontWeight: 500, fontSize: 'clamp(3.8rem, 16vw, 9.5rem)', letterSpacing: '0.12em', animationDelay: '1.4s, 3.8s' }}>
          VIOLETA
        </h1>
        <motion.p className="font-playfair italic text-lg md:text-2xl text-white mt-4 mb-9 [text-shadow:0_2px_12px_rgba(20,8,40,0.9)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: 0.9 }}>
          Flores que dicen lo que sientes
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.7, duration: 0.9 }}>
          <GoldButtons />
        </motion.div>
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--theme-bg)] to-transparent" />
    </section>
  )
}
