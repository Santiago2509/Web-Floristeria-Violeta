'use client'
import { motion } from 'framer-motion'
import { generarLinkWhatsApp } from '@/lib/whatsapp'
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'

export function MotivationalBanner() {
  const whatsappUrl = generarLinkWhatsApp('¡Hola! Me gustaría recibir asesoría para elegir el arreglo floral perfecto.')

  return (
    <section className="w-full py-32 md:py-40 relative flex items-center justify-center text-center" style={{ backgroundColor: 'var(--theme-primary)' }}>
      {/* Ola Superior (Pintada de morado y asomándose hacia arriba) */}
      <div className="absolute top-0 left-0 w-full -translate-y-[99%] leading-none pointer-events-none z-10">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[80px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.34,195.3,97.7,243.64,81.44,281.81,63.78,321.39,56.44Z" fill="var(--theme-primary)"></path>
        </svg>
      </div>

      {/* Ola Inferior (Pintada de morado, rotada y asomándose hacia abajo) */}
      <div className="absolute bottom-0 left-0 w-full translate-y-[99%] leading-none rotate-180 pointer-events-none z-10">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] md:h-[80px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.34,195.3,97.7,243.64,81.44,281.81,63.78,321.39,56.44Z" fill="var(--theme-primary)"></path>
        </svg>
      </div>

      {/* Elementos decorativos de fondo eliminados para que coincida exactamente con el color de las olas SVG */}
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center mt-8">
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
