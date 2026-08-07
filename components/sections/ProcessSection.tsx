'use client'
import { motion } from 'framer-motion'
import { MessageCircle, Paintbrush, CalendarHeart } from 'lucide-react'
import { generarLinkWhatsApp } from '@/lib/whatsapp'
import { LeftFloralVector, RightFloralVector } from '@/components/ui/FloralVectors'

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
      {/* Ola Orgánica Decorativa en la parte superior */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[120px]">
          <path d="M0,0 V40 C400,160 800,-40 1200,80 V0 Z" className="fill-[var(--theme-bg)]"></path>
        </svg>
      </div>

      {/* Vectores Decorativos en el fondo */}
      <LeftFloralVector />
      <RightFloralVector />
      
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
          
          {/* Línea conectora Vertical (solo móvil) - ANIMADA */}
          <div className="block md:hidden absolute top-[15%] bottom-[15%] left-1/2 -translate-x-1/2 w-[2px] z-0">
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-primary)]/30 to-transparent origin-top" 
            />
            {/* Chispa Flor Vertical */}
            <motion.div
              initial={{ top: "0%", opacity: 0, rotate: 0 }}
              whileInView={{ top: "100%", opacity: [0, 1, 1, 0], rotate: 720 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 4, delay: 0.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
              className="absolute left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center z-20"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white] z-10" />
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <div 
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[var(--theme-primary)] dark:bg-[var(--theme-primary-light)] shadow-[0_0_12px_var(--theme-primary)] opacity-90"
                  style={{ transform: `rotate(${angle}deg) translateY(-8px)` }}
                />
              ))}
            </motion.div>
          </div>

          {/* Línea conectora Horizontal (solo desktop) - ANIMADA */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] z-0">
            {/* Fondo de la línea */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--theme-primary)]/30 to-transparent origin-left" 
            />
            {/* Chispa Flor Viajera Horizontal */}
            <motion.div
              initial={{ left: "0%", opacity: 0, rotate: 0 }}
              whileInView={{ left: "100%", opacity: [0, 1, 1, 0], rotate: 720 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 4, delay: 0.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center z-20"
            >
              {/* Centro luminoso */}
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white] z-10" />
              
              {/* 5 Pétalos formados por puntos */}
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <div 
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[var(--theme-primary)] dark:bg-[var(--theme-primary-light)] shadow-[0_0_12px_var(--theme-primary)] opacity-90"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-8px)`
                  }}
                />
              ))}
            </motion.div>
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1, 
                  transition: { staggerChildren: 0.2, delayChildren: index * 0.3 + 0.2 } 
                }
              }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Círculo Glassmorphism Animado */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.5, rotate: -20 },
                  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 120, damping: 14 } }
                }}
                className="w-24 h-24 rounded-full bg-[var(--theme-bg)]/60 dark:bg-black/30 backdrop-blur-md border border-[var(--theme-primary)]/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center text-[var(--theme-primary)] mb-8 mx-auto relative overflow-hidden transition-all duration-500 group-hover:border-[var(--theme-primary)] group-hover:shadow-[0_0_30px_var(--theme-primary)]/30"
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-tr from-[var(--theme-primary)] to-[var(--theme-primary-light)] rounded-full origin-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <step.icon strokeWidth={1.5} className="w-10 h-10 relative z-10 group-hover:text-white transition-colors duration-500 group-hover:scale-110 transform" />
              </motion.div>
              
              <motion.h3 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="font-playfair text-2xl md:text-3xl text-[var(--theme-text)] mb-4 group-hover:text-[var(--theme-primary)] transition-colors duration-300"
              >
                {step.title}
              </motion.h3>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="font-inter text-base md:text-lg text-[var(--theme-text-muted)] leading-relaxed max-w-sm font-light"
              >
                {step.description}
              </motion.p>
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
            className="group relative px-8 py-4 rounded-full bg-[var(--theme-bg-section)] border border-[var(--theme-primary)]/50 text-[var(--theme-text)] font-inter font-medium overflow-hidden transition-all hover:scale-105 shadow-xl hover:shadow-[0_0_30px_var(--theme-primary)]/40 flex items-center gap-3"
          >
            {/* Efecto de barrido de fondo en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-primary-dark)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
            
            <MessageCircle className="w-5 h-5 relative z-10 text-[var(--theme-primary)] group-hover:text-white group-hover:animate-bounce transition-colors duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Empezar ahora
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
