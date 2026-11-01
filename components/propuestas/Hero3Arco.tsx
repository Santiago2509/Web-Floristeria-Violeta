'use client'
import { motion } from 'framer-motion'
import { CircleText, GoldButtons } from './shared'

const JOST = { fontFamily: 'var(--font-jost), sans-serif' }

// PROPUESTA 3 — "Arco editorial": título dorado gigante + video dentro de un arco con marco dorado
export function Hero3Arco() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_at_70%_40%,#3A1560_0%,#1A0B2E_55%,#0F0620_100%)] text-white pt-24 pb-16 lg:pt-28">
      {/* Líneas doradas finas de fondo */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-[linear-gradient(180deg,transparent,#C9A24B55,transparent)]" />
      <div className="absolute right-[6%] top-0 bottom-0 w-px bg-[linear-gradient(180deg,transparent,#C9A24B33,transparent)] hidden lg:block" />

      <div className="container mx-auto relative grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-6 items-center min-h-[calc(100svh-10rem)]">
        {/* Arco con video (arriba en móvil) */}
        <motion.div
          className="relative mx-auto lg:order-2 w-[68vw] max-w-[380px] aspect-[3/4.2]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 translate-x-3 translate-y-3 lg:translate-x-5 lg:translate-y-5 rounded-t-full rounded-b-[1.5rem] border border-[#C9A24B]/70" />
          <div className="absolute inset-0 rounded-t-full rounded-b-[1.5rem] overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
            <video autoPlay loop muted playsInline preload="metadata" poster="/assets/hero_poster.webp" aria-hidden="true" className="w-full h-full object-cover scale-[1.35]">
              <source src="/assets/heroprincipal.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute -left-10 -bottom-8 lg:-left-16 lg:-bottom-10">
            <CircleText text="HECHO A MANO · CALI · DESDE EL CORAZÓN · " size={120} />
          </div>
        </motion.div>

        {/* Texto */}
        <div className="relative text-center lg:text-left lg:order-1">
          <motion.p className="uppercase text-[#E9C878] mb-4" style={{ ...JOST, letterSpacing: '0.45em', fontSize: '0.8rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Floristería · Cali
          </motion.p>
          <h1 className="gold-text gold-glow sign-on leading-[0.88]" style={{ ...JOST, fontWeight: 300, fontSize: 'clamp(4.2rem, 19vw, 10.5rem)', letterSpacing: '0.04em', animationDelay: '0.4s' }}>
            VIO<br />LETA
          </h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.3, duration: 0.8 }} className="origin-left mx-auto lg:mx-0 my-7 h-px w-32 bg-[#C9A24B]" />
          <motion.p
            className="font-playfair italic text-xl md:text-2xl text-white/85 max-w-md mx-auto lg:mx-0 mb-9"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Ramos, cajas y rosas eternas, armados flor por flor.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.8 }} className="flex justify-center lg:justify-start">
            <GoldButtons />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
