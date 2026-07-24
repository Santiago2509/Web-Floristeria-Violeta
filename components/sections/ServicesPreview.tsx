'use client'
import { motion } from 'framer-motion'
import { Truck, Sparkles, Gift } from 'lucide-react'
import Link from 'next/link'

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

export function ServicesPreview() {
  return (
    <section className="w-full py-24 relative border-y border-[var(--theme-border)]/20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-2 block font-semibold">
            Nuestros Servicios
          </span>
          <h2 className="font-playfair text-4xl text-[var(--theme-text)] mb-6">
            Más allá de las flores
          </h2>
          <p className="font-inter text-[var(--theme-text-muted)] max-w-2xl mx-auto mb-10">
            Descubre todas las formas en las que podemos ayudarte a crear momentos perfectos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              className="group flex flex-col items-center text-center p-8 rounded-3xl bg-[var(--theme-bg-card)] border border-[var(--theme-border)] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-20 h-20 rounded-2xl bg-[var(--theme-primary)]/5 flex items-center justify-center text-[var(--theme-primary)] mb-6 group-hover:scale-110 group-hover:bg-[var(--theme-primary)] group-hover:text-white transition-all duration-500">
                <service.icon strokeWidth={1.5} className="w-10 h-10" />
              </div>
              <h3 className="font-playfair text-2xl text-[var(--theme-text)] mb-4">
                {service.title}
              </h3>
              <p className="font-inter text-[var(--theme-text-muted)] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/servicios">
            <button className="px-8 py-4 rounded-full border border-[var(--theme-primary)] text-[var(--theme-primary)] font-inter font-medium transition-all hover:bg-[var(--theme-primary)] hover:text-white hover:scale-105 shadow-md">
              Ver detalles de servicios
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
