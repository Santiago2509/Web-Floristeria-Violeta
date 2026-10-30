'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
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

const INTERVALO_MS = 9000

export function MotivationalBanner() {
  const whatsappUrl = generarLinkWhatsApp('¡Hola! Me gustaría recibir asesoría para elegir el arreglo floral perfecto.')
  const [fraseIndex, setFraseIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setFraseIndex((prev) => (prev + 1) % FRASES.length), INTERVALO_MS)
    return () => clearTimeout(timer)
  }, [fraseIndex])

  return (
    <section className="w-full py-6 lg:py-10 relative z-30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-[var(--theme-plum)] text-[var(--theme-on-plum)] dark:border dark:border-white/10"
        >
          {/* Luz suave y arcos decorativos (sin texturas) */}
          <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(201,167,216,0.25)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative grid lg:grid-cols-[1.35fr_1fr] items-center gap-10 lg:gap-6 px-7 py-14 sm:px-12 lg:pl-16 lg:pr-12 lg:py-16">

            {/* Texto */}
            <div className="relative">
              {/* Comilla gigante decorativa */}
              <span aria-hidden="true" className="absolute -top-24 -left-3 lg:-top-32 lg:-left-6 font-playfair text-[10rem] lg:text-[13rem] leading-none text-[var(--theme-lilac)]/30 select-none">
                “
              </span>

              <span className="relative inline-flex items-center gap-3 font-inter text-[11px] uppercase tracking-[0.35em] text-white/60 font-semibold mb-6">
                <span className="w-8 h-px bg-white/40" />
                Palabras que florecen
              </span>

              <div className="relative min-h-[170px] sm:min-h-[150px] lg:min-h-[190px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={fraseIndex}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="font-playfair italic text-3xl sm:text-4xl lg:text-5xl leading-[1.15]"
                  >
                    {FRASES[fraseIndex]}
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Indicadores (con barra de progreso en la frase activa) */}
              <div className="flex flex-wrap gap-1.5 mt-6 mb-10" role="tablist" aria-label="Frases">
                {FRASES.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === fraseIndex}
                    aria-label={`Frase ${i + 1}`}
                    onClick={() => setFraseIndex(i)}
                    className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-500 ${i === fraseIndex ? 'w-10 bg-white/25' : 'w-1.5 bg-white/30 hover:bg-white/60'}`}
                  >
                    {i === fraseIndex && (
                      <motion.span
                        key={fraseIndex}
                        className="absolute inset-y-0 left-0 bg-white"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: INTERVALO_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full whitespace-nowrap bg-white text-[#2A0F3D] font-inter text-sm font-semibold shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 transition-transform"
                >
                  <MessageCircle className="w-5 h-5" />
                  Asesoría gratis por WhatsApp
                </a>
                <p className="font-inter text-sm text-white/70 max-w-xs leading-relaxed">
                  Cuéntanos qué quieres expresar y te ayudamos a elegir el arreglo perfecto.
                </p>
              </div>
            </div>

            {/* Foto en arco */}
            <div className="relative hidden sm:flex justify-center lg:justify-end">
              <div className="relative w-[260px] h-[340px] lg:w-[320px] lg:h-[420px]">
                <span className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-b-3xl border border-white/25" />
                <div className="relative w-full h-full rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/assets/about_story_img.webp"
                    alt="Florista preparando un arreglo"
                    fill
                    sizes="(min-width: 1024px) 320px, 260px"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -left-8 bottom-10 bg-white text-[#2A0F3D] rounded-2xl px-4 py-3 shadow-xl">
                  <p className="font-playfair text-2xl leading-none">100%</p>
                  <p className="font-inter text-[11px] uppercase tracking-wider text-[#6B5A78] mt-1">hecho a mano</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
