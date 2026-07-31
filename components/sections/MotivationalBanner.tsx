'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generarLinkWhatsApp } from '@/lib/whatsapp'
import { MessageCircle } from 'lucide-react'

const FRASES = [
  "El lenguaje más puro del amor se escribe con flores.",
  "Donde florecen las flores, florece la esperanza.",
  "Cada arreglo que diseñamos es un abrazo a la distancia.",
  "Las flores siempre hacen mejor a las personas, más felices y más útiles.",
  "Una flor no piensa en competir con la flor de al lado. Simplemente florece.",
  "Los detalles más simples pueden cambiar un día por completo.",
  "Hay flores en todas partes para quien quiera verlas.",
  "El amor es como una flor hermosa, su fragancia hace del mundo un lugar mejor.",
  "Siembra una semilla de amor y cosecharás un jardín de felicidad.",
  "Las flores son la música de la tierra, habladas sin sonido."
]

export function MotivationalBanner() {
  const whatsappUrl = generarLinkWhatsApp('¡Hola! Me gustaría recibir asesoría para elegir el arreglo floral perfecto.')
  const [fraseIndex, setFraseIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % FRASES.length)
    }, 30000) // Cambia cada 30 segundos
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full py-32 md:py-40 relative flex items-center justify-center text-center bg-[var(--theme-primary)] dark:bg-[#34164c]">
      
      {/* ═══════════════════════════════════════════════════
          WAVES (Olas de transición OUTWARDS)
      ═══════════════════════════════════════════════════ */}
      
      {/* Ola Superior (Sale hacia arriba) */}
      <div className="absolute top-[1px] left-0 w-full leading-[0] z-10 pointer-events-none -translate-y-[100%]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] rotate-180 fill-[var(--theme-primary)] dark:fill-[#34164c]">
          <path d="M0,0 V46.29 c47.79,22.2,103.59,32.17,158,28 c70.36-5.37,136.33-33.31,206.8-37.5 C438.64,32.43,512.34,53.67,583,72.05 c69.27,18,138.3,24.88,209.4,13.08 c36.15-6,69.85-17.84,104.45-29.34 C989.49,25,1113-14.29,1200,52.47 V0 Z" />
        </svg>
      </div>

      {/* Ola Inferior (Sale hacia abajo) */}
      <div className="absolute bottom-[1px] left-0 w-full leading-[0] z-10 pointer-events-none translate-y-[100%]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] fill-[var(--theme-primary)] dark:fill-[#34164c]">
          <path d="M0,0 V46.29 c47.79,22.2,103.59,32.17,158,28 c70.36-5.37,136.33-33.31,206.8-37.5 C438.64,32.43,512.34,53.67,583,72.05 c69.27,18,138.3,24.88,209.4,13.08 c36.15-6,69.85-17.84,104.45-29.34 C989.49,25,1113-14.29,1200,52.47 V0 Z" />
        </svg>
      </div>


      {/* ═══════════════════════════════════════════════════
          FONDOS Y TEXTURAS
      ═══════════════════════════════════════════════════ */}
      
      {/* Contenedor con overflow-hidden solo para las texturas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Textura SVG Mosaico (Pétalos sutiles) */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 15C30 15 38 20 38 30C38 35 34 38 30 38C26 38 22 35 22 30C22 20 30 15 30 15Z' fill='%23FFFFFF'/%3E%3Cpath d='M15 30C15 30 20 22 30 22C35 22 38 26 38 30C38 34 35 38 30 38C20 38 15 30 15 30Z' fill='%23FFFFFF' opacity='0.5' transform='rotate(45 30 30)'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Film Grain (Ruido de película superpuesto) */}
        <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          CONTENIDO PRINCIPAL
      ═══════════════════════════════════════════════════ */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Ícono superior */}
          <div className="mb-10 text-white/40">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m12 18 4-5-4-5" />
              <path d="M8 13h8" />
            </svg>
          </div>

          <div className="relative min-h-[160px] md:min-h-[140px] flex items-center justify-center w-full mb-8">
            <AnimatePresence mode="wait">
              <motion.h2 
                key={fraseIndex}
                initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute font-playfair text-3xl md:text-5xl lg:text-6xl text-white italic leading-tight drop-shadow-md px-4"
              >
                "{FRASES[fraseIndex]}"
              </motion.h2>
            </AnimatePresence>
          </div>
          
          <p className="font-inter text-white/80 text-lg md:text-xl font-light mb-14 max-w-2xl">
            Permítenos ser los traductores de tus sentimientos. Cada arreglo que diseñamos es una carta de amor o un momento inolvidable esperando a suceder.
          </p>
          
          {/* Botón Animado */}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group relative">
            
            {/* Border Animado Conic Gradient (Background Clip) */}
            <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-white via-white/20 to-white opacity-40 group-hover:opacity-100 group-hover:from-[var(--theme-blush)] group-hover:to-[var(--theme-blush)] transition-all duration-300 overflow-hidden" style={{ animation: 'spin-slow 4s linear infinite' }}>
              <div className="absolute inset-[2px] rounded-full bg-[var(--theme-primary)]" />
            </div>

            {/* Contenido del botón */}
            <div className="relative flex items-center gap-3 px-8 py-4 bg-transparent group-hover:bg-[var(--theme-blush)] rounded-full transition-colors duration-300">
              <MessageCircle className="w-5 h-5 text-white group-hover:text-[var(--theme-primary)]" style={{ animation: 'breathe 2.5s infinite ease-in-out' }} />
              <span className="font-inter text-sm md:text-base text-white group-hover:text-[var(--theme-primary)] font-medium tracking-wide">
                Hablemos por WhatsApp
              </span>
            </div>
          </a>

        </motion.div>
      </div>

    </section>
  )
}
