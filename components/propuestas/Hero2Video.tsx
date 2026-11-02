'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedRose } from '@/components/ui/AnimatedRose'
import { generarLinkWhatsApp } from '@/lib/whatsapp'

const JOST = { fontFamily: 'var(--font-jost), sans-serif' }

// PROPUESTA 2 — "Video con letrero": el inicio actual (video + rosa que se dibuja) con un letrero
// de LUZ VIOLETA que cambia con el tema (claro: letra oscura · oscuro: letra clara tipo neón).
export function Hero2Video() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Video limpio, sin velo oscuro */}
      <video autoPlay loop muted playsInline preload="metadata" poster="/assets/hero_poster.webp" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover">
        <source src="/assets/heroprincipal.mp4" type="video/mp4" />
      </video>
      {/* Claro: un leve destello de luz detrás del letrero · Oscuro: penumbra suave para que brille el neón */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_38%_at_50%_45%,rgba(255,255,255,0.35)_0%,transparent_75%)] dark:bg-[radial-gradient(ellipse_75%_60%_at_50%_45%,rgba(19,10,42,0.25)_0%,rgba(19,10,42,0.55)_100%)]" />

      {/* Rosa de línea que se dibuja (violeta en claro, lavanda en oscuro) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-[12rem] md:translate-y-[14rem] [--color-primary:#6D28D9] dark:[--color-primary:#E9D5FF]">
        <AnimatedRose className="w-[95vw] md:w-[660px] opacity-70" />
      </div>

      <div className="relative z-10 px-6">
        <motion.p
          className="hv-sub uppercase mb-4"
          style={{ ...JOST, fontWeight: 500, letterSpacing: '0.5em', fontSize: 'clamp(0.65rem, 2.4vw, 0.85rem)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Floristería
        </motion.p>
        <h1 className="halo-violet leading-none" style={{ ...JOST, fontWeight: 500, fontSize: 'clamp(3.8rem, 15vw, 11rem)', letterSpacing: '0.07em', animationDelay: '0.6s, 3s' }}>
          VIOLETA
        </h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className="mx-auto my-6 h-px w-40 bg-[linear-gradient(90deg,transparent,#6D28D9,transparent)] dark:bg-[linear-gradient(90deg,transparent,#E9D5FF,transparent)]" />
        <motion.p
          className="hv-sub uppercase mb-10"
          style={{ ...JOST, fontWeight: 500, letterSpacing: '0.35em', fontSize: 'clamp(0.7rem, 2.6vw, 1rem)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        >
          Cali · Flores hechas a mano
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            href="/catalogo"
            className="px-8 py-3.5 rounded-full font-inter text-sm font-semibold tracking-wide text-white bg-plum-gradient shadow-[0_10px_30px_-10px_rgba(109,40,217,0.8)] hover:-translate-y-0.5 transition-transform"
          >
            Ver catálogo
          </Link>
          <a
            href={generarLinkWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full font-inter text-sm font-semibold tracking-wide backdrop-blur-md border transition-colors bg-white/70 border-white text-[#3B0764] hover:bg-white dark:bg-white/10 dark:border-white/50 dark:text-white dark:hover:bg-white/20"
          >
            Pedir por WhatsApp
          </a>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--theme-bg)] to-transparent" />
    </section>
  )
}
