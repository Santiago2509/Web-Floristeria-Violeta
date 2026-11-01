'use client'
import { motion } from 'framer-motion'
import { GoldButtons } from './shared'

const JOST = { fontFamily: 'var(--font-jost), sans-serif' }
const TITLE: React.CSSProperties = { ...JOST, fontWeight: 600, letterSpacing: '0.02em', lineHeight: 0.86 }

// PROPUESTA 4 — "Letras de video": el video de rosas se ve a través de las letras, con contorno dorado.
// Técnica: capa negra con texto blanco en modo "multiplicar" sobre el video → solo se ve el video dentro de las letras.
export function Hero4Letras() {
  const title = (
    <>
      <span className="block sm:inline">VIO</span>
      <span className="block sm:inline">LETA</span>
    </>
  )
  const size = 'text-[38vw] sm:text-[17vw]'

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black text-white flex flex-col items-center justify-center pt-20 pb-14">
      <div className="relative w-full flex-1 flex items-center justify-center">
        <video autoPlay loop muted playsInline preload="metadata" poster="/assets/hero_poster.webp" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover">
          <source src="/assets/heroprincipal.mp4" type="video/mp4" />
        </video>
        {/* Máscara: negro = oculto, blanco (letras) = se ve el video */}
        <div className="absolute inset-0 bg-black mix-blend-multiply flex items-center justify-center" aria-hidden="true">
          <motion.h2 className={`${size} text-white text-center select-none`} style={TITLE} initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}>
            {title}
          </motion.h2>
        </div>
        {/* Contorno dorado exactamente encima */}
        <motion.h1
          className={`${size} relative text-center select-none gold-glow-soft`}
          style={{ ...TITLE, color: 'transparent', WebkitTextStroke: '1.5px #E9C878' }}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
      </div>

      <motion.div className="relative z-10 flex flex-col items-center text-center px-6 -mt-2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9 }}>
        <p className="gold-text uppercase mb-6" style={{ ...JOST, letterSpacing: '0.5em', fontSize: 'clamp(0.7rem, 2.6vw, 1rem)' }}>
          Floristería · Cali
        </p>
        <GoldButtons />
      </motion.div>
    </section>
  )
}
