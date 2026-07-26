'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import Image from 'next/image'

const services = [
  {
    title: 'Domicilios Express',
    description: 'Entregamos tus emociones directamente en la puerta, con cuidado y puntualidad. Cada arreglo floral viaja en condiciones óptimas y en empaques de lujo para garantizar su frescura e impacto al llegar.',
    image: '/assets/servicio_delivery.png',
  },
  {
    title: 'Decoración de Eventos',
    description: 'Transformamos espacios ordinarios en escenarios mágicos e inolvidables. Diseñamos atmósferas florales exclusivas y hechas a la medida para bodas, galas y celebraciones íntimas de alto perfil.',
    image: '/assets/servicio_eventos.png',
  },
  {
    title: 'Regalos Personalizados',
    description: 'Acompaña tus flores con detalles únicos pensados especialmente para esa persona. Desde finas cajas de lujo hasta dedicatorias escritas a mano, creamos experiencias verdaderamente memorables.',
    image: '/assets/servicio_regalos.png',
  }
]

const titleText = "Más allá de las flores"
const containerVars: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
}
const wordVars: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: "easeOut" } }
}

const cardTextContainerVars: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
}
const cardItemVars: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: "easeOut" } }
}

function ServiceCard({ service, index }: { service: any, index: number }) {
  const isEven = index % 2 === 0
  const ref = useRef(null)
  
  // Parallax local para cada imagen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <div ref={ref} className={`flex-none w-[85vw] md:w-auto snap-center flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:gap-16 lg:gap-32 group mb-0 md:mb-0`}>
      
      {/* Imagen con Parallax y Efecto Flotante */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 relative h-[350px] sm:h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl z-0"
      >
        <motion.div style={{ y: yImage }} className="absolute inset-0 w-full h-[120%] -top-[10%] transform transition-transform duration-1000 group-hover:scale-105">
          <Image 
            src={service.image} 
            alt={service.title} 
            fill 
            className="object-cover" 
          />
        </motion.div>
        {/* Capa de luz superpuesta en hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
      </motion.div>

      {/* Texto - Superpuesto en Móvil (Animado paso a paso) */}
      <motion.div
        variants={cardTextContainerVars}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-11/12 sm:w-5/6 md:w-1/2 flex flex-col justify-center bg-[var(--theme-bg)]/85 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-8 md:p-0 rounded-3xl md:rounded-none shadow-xl md:shadow-none -mt-24 sm:-mt-32 md:mt-0 relative z-10 border border-[var(--theme-border)]/40 md:border-none"
      >
        <motion.div variants={cardItemVars} className="flex items-center gap-4 mb-6 md:mb-8 overflow-hidden">
          <span className="text-4xl md:text-5xl font-playfair text-[var(--theme-primary)]/20 italic">
            0{index + 1}
          </span>
          <div className="h-[2px] w-12 md:w-20 bg-[var(--theme-primary)]/30" />
        </motion.div>
        
        <motion.h3 variants={cardItemVars} className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[var(--theme-text)] mb-6 md:mb-8 leading-tight group-hover:text-[var(--theme-primary)] transition-colors duration-500">
          {service.title}
        </motion.h3>
        <motion.p variants={cardItemVars} className="font-inter text-base md:text-lg lg:text-xl text-[var(--theme-text-muted)] leading-relaxed mb-8 md:mb-12 font-light">
          {service.description}
        </motion.p>
        
        {/* Botón de acción animado */}
        <motion.div variants={cardItemVars} className="flex items-center gap-4 text-[var(--theme-primary)] font-medium font-inter cursor-pointer hover:text-[var(--theme-primary-dark)] transition-colors w-max relative">
          <span className="uppercase tracking-[0.2em] text-xs md:text-sm pb-1 relative overflow-hidden">
            Descubrir más
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--theme-primary)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </span>
          <motion.span 
            className="inline-block"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  )
}

import { ServicesBackgroundVector } from '@/components/ui/ServicesBackgroundVector'

export function Services() {
  return (
    <section className="w-full py-24 md:py-32 relative border-t border-[var(--theme-border)]/10 bg-[var(--theme-bg)] overflow-hidden" id="servicios">
      <ServicesBackgroundVector />
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Título Animado Palabra por Palabra */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-32 flex flex-col items-center"
        >
          <span className="font-inter text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--theme-primary)] mb-6 block font-semibold">
            Nuestros Servicios
          </span>
          <motion.h2 
            variants={containerVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="font-playfair text-4xl md:text-5xl lg:text-7xl text-[var(--theme-text)] flex flex-wrap justify-center gap-x-3 md:gap-x-4"
          >
            {titleText.split(" ").map((word, index) => (
              <motion.span key={index} variants={wordVars} className="inline-block">
                {word}
              </motion.span>
            ))}
          </motion.h2>

          {/* Indicador de Swipe (Solo Móvil) */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 1 }}
            className="md:hidden flex items-center justify-center gap-3 mt-6 text-[var(--theme-primary)] font-inter text-sm italic opacity-70"
          >
            <motion.span 
              animate={{ x: [-3, 3, -3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ←
            </motion.span>
            <span>Desliza para explorar</span>
            <motion.span 
              animate={{ x: [3, -3, 3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Carrusel horizontal en Móvil, Zigzag vertical en Desktop */}
        <div className="flex flex-row md:flex-col gap-6 md:gap-40 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-12 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
