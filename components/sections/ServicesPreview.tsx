'use client'
import { motion } from 'framer-motion'
import { Truck, Heart, Gift, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    id: '01',
    title: 'Domicilios Express',
    description: 'Entregamos tus emociones directamente en la puerta, con cuidado y puntualidad impecable.',
    image: '/assets/servicio_delivery.webp',
    icon: Truck
  },
  {
    id: '02',
    title: 'Momentos Especiales',
    description: 'Arreglos pensados para celebrar aniversarios, cumpleaños, declaraciones de amor o fechas inolvidables.',
    image: '/assets/servicio_eventos.webp',
    icon: Heart
  },
  {
    id: '03',
    title: 'Regalos Personalizados',
    description: 'Acompaña tus flores con detalles únicos pensados especialmente para robar sonrisas.',
    image: '/assets/servicio_regalos.webp',
    icon: Gift
  }
]

export function ServicesPreview() {
  return (
    <section className="w-full relative py-20 lg:py-28 z-20">
      <div className="container mx-auto relative z-10">

        {/* ENCABEZADO */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-14">
          <div>
            <span className="inline-flex items-center gap-3 font-inter text-[11px] uppercase tracking-[0.35em] text-[var(--theme-primary)] font-semibold mb-4">
              <span className="w-8 h-px bg-[var(--theme-primary)]" />
              Nuestros servicios
            </span>
            <h2 className="font-playfair text-5xl md:text-6xl text-[var(--theme-text)] leading-[1.05]">
              Más allá de <span className="italic text-[var(--theme-primary)]">las flores</span>
            </h2>
          </div>
          <Link
            href="/servicios"
            className="group self-start lg:self-auto inline-flex items-center gap-2 font-inter text-sm font-medium text-[var(--theme-primary)]"
          >
            Ver todos los servicios
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* TARJETAS — en móvil se deslizan horizontalmente */}
        <div className="-mx-6 px-6 md:mx-0 md:px-0 flex md:grid md:grid-cols-3 gap-5 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 [scrollbar-width:none]">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group snap-center shrink-0 w-[78%] sm:w-[55%] md:w-auto"
            >
              <Link href="/servicios" className="block">
                {/* Foto en arco */}
                <div className="relative aspect-[4/5] rounded-t-full rounded-b-3xl overflow-hidden bg-[var(--theme-bg-section)] shadow-[0_30px_60px_-30px_rgba(42,15,61,0.55)]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 78vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <span className="absolute bottom-5 left-5 w-12 h-12 rounded-full bg-white/95 text-[#2A0F3D] flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
                    <service.icon className="w-5 h-5" />
                  </span>
                </div>

                {/* Texto */}
                <div className="pt-6 px-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-playfair italic text-lg text-[var(--theme-primary)]">{service.id}</span>
                    <h3 className="font-playfair text-2xl lg:text-[1.7rem] text-[var(--theme-text)] leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p className="font-inter text-[var(--theme-text-muted)] text-sm lg:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
