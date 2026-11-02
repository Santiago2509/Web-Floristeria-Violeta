'use client'
import { motion } from 'framer-motion'
import { GoldButtons } from './shared'

const JOST = { fontFamily: 'var(--font-jost), sans-serif' }

// PROPUESTA 1 — "Letrero de luz": pared clara, letras oscuras con luz cálida detrás que se encienden
export function Hero1Letrero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[linear-gradient(180deg,#F2ECE2_0%,#FBF8F2_38%,#F6F0E6_100%)] text-[#3A2A12]">
      {/* Techo con luz de cornisa (tira LED) que se enciende */}
      <div className="absolute inset-x-0 top-0 h-[14svh] bg-[#FFFDF9]" />
      <motion.div
        className="absolute inset-x-0 top-[14svh] h-[2px] bg-[#FFD48A]"
        initial={{ opacity: 0, scaleX: 0.2 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
      />
      <motion.div
        className="absolute inset-x-0 top-[14svh] h-[26svh] bg-[linear-gradient(180deg,rgba(255,196,110,0.55)_0%,rgba(255,206,140,0.18)_40%,transparent_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.5 }}
      />
      {/* Focos del techo con su cono de luz */}
      {[18, 50, 82].map((x, i) => (
        <motion.div
          key={x}
          className="absolute top-[5svh] -translate-x-1/2"
          style={{ left: `${x}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 + i * 0.15, duration: 0.6 }}
        >
          <div className="w-5 h-2 rounded-full bg-[#FFF6DD] shadow-[0_0_12px_4px_rgba(255,214,140,0.9)] mx-auto" />
          <div className="w-40 h-[46svh] -mt-1 bg-[radial-gradient(ellipse_at_top,rgba(255,220,160,0.32)_0%,transparent_70%)] -translate-x-[calc(50%-10px)]" />
        </motion.div>
      ))}

      {/* Letrero */}
      <div className="relative z-10 flex flex-col items-center text-center pt-[27svh] px-6">
        {/* Luz cálida en la pared detrás de las letras (retroiluminación) */}
        <motion.div
          className="absolute left-1/2 top-[27svh] -translate-x-1/2 -translate-y-[22%] w-[115vw] max-w-[1100px] h-[30svh] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,190,100,0.55)_0%,rgba(255,200,130,0.22)_45%,transparent_72%)] blur-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.3, 1] }}
          transition={{ delay: 1.2, duration: 1.4, times: [0, 0.3, 0.45, 1] }}
        />
        <h1
          className="relative halo-text halo-on leading-none select-none"
          style={{ ...JOST, fontWeight: 500, fontSize: 'clamp(3.6rem, 14vw, 9.5rem)', letterSpacing: '0.06em', animationDelay: '1.2s' }}
        >
          VIOLETA<sup className="text-[0.16em] align-top ml-1">®</sup>
        </h1>
        <motion.p
          className="relative mt-3 text-[#8C7A5C] uppercase"
          style={{ ...JOST, letterSpacing: '0.42em', fontSize: 'clamp(0.7rem, 2.6vw, 1rem)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          Floristería · Cali
        </motion.p>
      </div>

      {/* "Mostrador" con luz inferior y frase retroiluminada */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 h-[34svh] bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F2EA_100%)] border-t border-[#E9E1D2] flex flex-col items-center justify-center px-6"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-x-0 top-6 h-[2px] bg-[#FFD48A] shadow-[0_0_18px_6px_rgba(255,196,110,0.55)]" />
        <p
          className="halo-text halo-on text-center uppercase mt-4"
          style={{ ...JOST, fontWeight: 600, letterSpacing: '0.08em', fontSize: 'clamp(1rem, 4.6vw, 2rem)', transform: 'perspective(600px) rotateX(12deg)' }}
        >
          Cada flor cuenta una historia
        </p>
        <GoldButtons dark={false} className="mt-6" />
      </motion.div>
    </section>
  )
}
