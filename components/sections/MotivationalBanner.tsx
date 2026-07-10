'use client'
import { motion } from 'framer-motion'
import { generarLinkWhatsApp } from '@/lib/whatsapp'
import { MessageCircle } from 'lucide-react'

export function MotivationalBanner() {
  const whatsappUrl = generarLinkWhatsApp('¡Hola! Me gustaría recibir asesoría para elegir el arreglo floral perfecto.')

  return (
    <section className="w-full py-32 relative overflow-hidden flex items-center justify-center text-center" style={{ backgroundColor: 'var(--theme-primary)' }}>
      {/* Elementos decorativos de fondo (opcional, para dar textura) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_white_0%,_transparent_100%)]" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[var(--theme-bg)] italic font-light mb-8 max-w-4xl leading-tight"
        >
          "El lenguaje más puro del amor se escribe con pétalos, colores y fragancias."
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-inter text-lg text-[var(--theme-bg)]/80 mb-12 max-w-xl"
        >
          Déjanos ayudarte a expresar lo que las palabras no pueden decir. Cada arreglo está diseñado para conectar corazones.
        </motion.p>
        
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
          className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--theme-bg)] text-[var(--theme-primary)] font-inter font-medium transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
        >
          <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span>Hablemos por WhatsApp</span>
        </motion.a>
      </div>
    </section>
  )
}
