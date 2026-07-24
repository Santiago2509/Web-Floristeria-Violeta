'use client'
import { motion } from 'framer-motion'
import { Heart, Star, Clock } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Pasión por el Arte Floral',
    description: 'No hacemos arreglos en serie. Cada creación es una pieza única diseñada con amor, prestando atención a la armonía de colores y texturas.',
  },
  {
    icon: Star,
    title: 'Calidad Premium',
    description: 'Trabajamos exclusivamente con flores frescas de la más alta calidad, seleccionadas diariamente para garantizar la máxima durabilidad y belleza.',
  },
  {
    icon: Clock,
    title: 'Compromiso y Puntualidad',
    description: 'Sabemos que las sorpresas no pueden esperar. Nos tomamos el tiempo de entrega tan en serio como la calidad de nuestras flores.',
  }
]

export function AboutValues() {
  return (
    <section className="w-full py-24 md:py-32 relative bg-[var(--theme-primary)]/5 border-t border-[var(--theme-border)]/20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-4 block font-semibold">
            Nuestros Pilares
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-[var(--theme-text)]">
            Lo que nos define
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              className="flex flex-col items-center text-center p-10 rounded-3xl bg-[var(--theme-bg)] border border-[var(--theme-border)] shadow-xl hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="w-20 h-20 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center text-[var(--theme-primary)] mb-8 group-hover:-translate-y-2 transition-transform duration-500">
                <value.icon strokeWidth={1.5} className="w-10 h-10" />
              </div>
              <h3 className="font-playfair text-2xl text-[var(--theme-text)] mb-4">
                {value.title}
              </h3>
              <p className="font-inter text-[var(--theme-text-muted)] leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
