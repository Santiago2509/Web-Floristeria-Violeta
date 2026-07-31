'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, Sparkles, Gift } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    id: '01',
    title: 'Domicilios Express',
    description: 'Entregamos tus emociones directamente en la puerta, con cuidado y puntualidad impecable.',
    image: '/assets/servicio_delivery.png',
    icon: Truck
  },
  {
    id: '02',
    title: 'Decoración de Eventos',
    description: 'Transformamos espacios ordinarios en escenarios mágicos e inolvidables para tu día especial.',
    image: '/assets/servicio_eventos.png',
    icon: Sparkles
  },
  {
    id: '03',
    title: 'Regalos Personalizados',
    description: 'Acompaña tus flores con detalles únicos pensados especialmente para robar sonrisas.',
    image: '/assets/servicio_regalos.png',
    icon: Gift
  }
]

export function ServicesPreview() {
  const [activeService, setActiveService] = useState<string>('01')
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="w-full relative py-24 lg:py-32 z-20">
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-16 lg:mb-24">
          <span className="font-inter text-[10px] uppercase tracking-[0.4em] text-[var(--theme-primary)] mb-4 block font-medium">
            Nuestros Servicios
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[var(--theme-text)] mb-6 leading-tight">
            Más allá de <br className="hidden md:block"/> las flores
          </h2>
        </div>

        {/* ACCORDION INTERACTIVO (Vertical en Mobile, Horizontal en Desktop) */}
        <div className="flex flex-col lg:flex-row w-full h-[750px] lg:h-[600px] gap-4 lg:gap-6 mb-20">
          {services.map((service) => {
            const isActive = activeService === service.id;
            
            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => setActiveService(service.id)}
                onMouseEnter={() => {
                  if (isDesktop) setActiveService(service.id)
                }}
                animate={{
                  flex: isActive ? (isDesktop ? 3 : 4) : 1
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`relative overflow-hidden rounded-2xl lg:rounded-[2rem] cursor-pointer shadow-2xl dark:shadow-none group ${isActive ? 'ring-2 ring-[var(--theme-primary)]/50' : ''}`}
              >
                {/* Imagen de Fondo del Acordeón */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={`object-cover transition-transform duration-[1.5s] ease-out ${isActive ? 'scale-105' : 'scale-100 grayscale-[20%]'}`}
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />

                {/* Overlays de Oscurecimiento */}
                <div 
                  className={`absolute inset-0 transition-colors duration-700 ${
                    isActive 
                      ? 'bg-gradient-to-t from-black/80 via-black/30 to-transparent dark:from-black/90 dark:via-black/50 dark:to-black/20' 
                      : 'bg-black/60 dark:bg-black/80'
                  }`} 
                />

                {/* Contenido (Textos) */}
                <div className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-end pointer-events-none">
                  
                  {/* Contenedor Superior (Icono + Número) */}
                  <motion.div layout className="flex items-center gap-4 mb-3">
                    <span className={`font-playfair text-3xl lg:text-4xl font-light transition-colors duration-500 ${isActive ? 'text-[var(--theme-primary)] dark:text-[#D7BDE2]' : 'text-white/40'}`}>
                      {service.id}
                    </span>
                    <service.icon className={`w-7 h-7 lg:w-8 lg:h-8 transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/40'}`} />
                  </motion.div>

                  {/* Título */}
                  <motion.h3 
                    layout
                    className="font-playfair text-2xl lg:text-4xl text-white font-medium tracking-wide mb-2"
                  >
                    {service.title}
                  </motion.h3>
                  
                  {/* Descripción expansible */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="overflow-hidden"
                      >
                        <p className="font-inter text-white/80 text-sm lg:text-base leading-relaxed max-w-md pt-2">
                          {service.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link 
            href="/servicios"
            className="inline-block px-10 py-3.5 rounded-[2px] border border-[var(--theme-primary)] text-[var(--theme-primary)] font-inter text-sm tracking-wide transition-all duration-300 hover:bg-[var(--theme-primary)] hover:text-white"
          >
            Ver todos los servicios
          </Link>
        </div>

      </div>
    </section>
  )
}
