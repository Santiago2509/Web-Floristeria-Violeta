'use client'
import { motion } from 'framer-motion'
import { AnimatedRose } from '@/components/ui/AnimatedRose'
import { GoldButtons } from './shared'

const JOST = { fontFamily: 'var(--font-jost), sans-serif' }

// PROPUESTA 2 — "Video con letrero": el inicio actual (video + rosa que se dibuja) con letras retroiluminadas
export function Hero2Video() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center text-center">
      <video autoPlay loop muted playsInline preload="metadata" poster="/assets/hero_poster.webp" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover">
        <source src="/assets/heroprincipal.mp4" type="video/mp4" />
      </video>
      {/* Velo suave para que el letrero resalte */}
      <div className="absolute inset-0 bg-[#140820]/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_50%,rgba(20,8,30,0.7)_0%,rgba(20,8,30,0.35)_60%,rgba(20,8,30,0.55)_100%)]" />

      {/* Rosa de línea que se dibuja */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-[12rem] md:translate-y-[14rem]" style={{ ['--color-primary' as string]: '#F3E8FF' }}>
        <AnimatedRose className="w-[95vw] md:w-[660px] opacity-70" />
      </div>

      <div className="relative z-10 px-6">
        <motion.p
          className="uppercase text-white/90 mb-4"
          style={{ ...JOST, letterSpacing: '0.5em', fontSize: 'clamp(0.65rem, 2.4vw, 0.85rem)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Floristería
        </motion.p>
        <h1 className="halo-text halo-on leading-none" style={{ ...JOST, fontSize: 'clamp(3.8rem, 15vw, 11rem)', letterSpacing: '0.07em', animationDelay: '0.6s' }}>
          VIOLETA
        </h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className="mx-auto my-6 h-px w-40 bg-[linear-gradient(90deg,transparent,#FFFFFF,transparent)]" />
        <motion.p
          className="text-white/90 uppercase mb-10"
          style={{ ...JOST, letterSpacing: '0.35em', fontSize: 'clamp(0.7rem, 2.6vw, 1rem)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        >
          Cali · Flores hechas a mano
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.8 }}>
          <GoldButtons />
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--theme-bg)] to-transparent" />
    </section>
  )
}
