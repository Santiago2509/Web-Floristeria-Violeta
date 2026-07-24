'use client'
import { motion } from 'framer-motion'
import { MessageCircle, Paintbrush, CalendarHeart } from 'lucide-react'
import { generarLinkWhatsApp } from '@/lib/whatsapp'

const steps = [
  {
    icon: MessageCircle,
    title: '1. Tu Visión',
    description: 'Cuéntanos qué celebras o qué deseas transmitir. Te asesoramos para elegir la paleta y las flores perfectas.',
  },
  {
    icon: Paintbrush,
    title: '2. Diseño Floral',
    description: 'Nuestros floristas artesanos crean tu arreglo o decoran tu espacio con meticulosa atención al detalle.',
  },
  {
    icon: CalendarHeart,
    title: '3. El Momento',
    description: 'Entregamos tu pedido en el momento exacto, asegurando una sorpresa impecable y emociones garantizadas.',
  }
]

export function ProcessSection() {
  const whatsappUrl = generarLinkWhatsApp('¡Hola! Quiero iniciar el proceso para un servicio floral.')

  return (
    <section className="w-full py-24 md:py-32 bg-[var(--theme-primary)]/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-4 block font-semibold">
            Nuestro Proceso
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-[var(--theme-text)]">
            Cómo trabajamos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
          {/* Línea conectora (solo visible en desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-[var(--theme-primary)]/20 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-[var(--theme-bg)] border border-[var(--theme-primary)]/30 shadow-xl flex items-center justify-center text-[var(--theme-primary)] mb-8 mx-auto relative group">
                <div className="absolute inset-0 rounded-full bg-[var(--theme-primary)] scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                <step.icon strokeWidth={1.5} className="w-10 h-10 relative z-10 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="font-playfair text-2xl text-[var(--theme-text)] mb-4">
                {step.title}
              </h3>
              <p className="font-inter text-[var(--theme-text-muted)] leading-relaxed max-w-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-[var(--theme-primary)] text-white font-inter font-medium transition-all hover:bg-[var(--theme-primary-dark)] hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3"
          >
            <MessageCircle className="w-5 h-5" />
            Empezar ahora
          </a>
        </motion.div>
      </div>
    </section>
  )
}
