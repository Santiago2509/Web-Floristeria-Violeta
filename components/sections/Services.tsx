'use client'
import { motion } from 'framer-motion'
import { Truck, Sparkles, Gift } from 'lucide-react'

const services = [
  {
    icon: Truck,
    title: 'Domicilios Express',
    description: 'Entregamos tus emociones directamente en la puerta, con cuidado y puntualidad.',
  },
  {
    icon: Sparkles,
    title: 'Decoración de Eventos',
    description: 'Transformamos espacios ordinarios en escenarios mágicos e inolvidables.',
  },
  {
    icon: Gift,
    title: 'Regalos Personalizados',
    description: 'Acompaña tus flores con detalles únicos pensados especialmente para esa persona.',
  }
]

export function Services() {
  return (
    <section className="w-full py-24 relative border-y border-[var(--theme-border)]/20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-2 block">
            Nuestros Servicios
          </span>
          <h2 className="font-playfair text-4xl text-[var(--theme-text)]">
            Más allá de las flores
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center text-[var(--theme-primary)] mb-6">
                <service.icon strokeWidth={1.5} className="w-8 h-8" />
              </div>
              <h3 className="font-playfair text-xl text-[var(--theme-text)] mb-3">
                {service.title}
              </h3>
              <p className="font-inter text-[var(--theme-text-muted)] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
