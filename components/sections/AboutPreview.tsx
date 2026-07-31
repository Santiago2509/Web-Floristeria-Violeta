'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function AboutPreview() {
  return (
    <section className="w-full pb-24 lg:pb-32 pt-10 relative z-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          {/* Columna Izquierda: Imagen Flotante (Overlap Transition) */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            // Columna al 60% de ancho para que la imagen pueda ser más grande
            className="w-full lg:w-7/12 relative z-30 flex justify-center lg:justify-start -mt-24 lg:-mt-[220px]"
          >
            {/* Contenedor Óvalo Alargado */}
            <div className="relative aspect-[2/3] md:aspect-[9/16] w-full max-w-[320px] sm:max-w-md lg:max-w-[480px] mx-auto lg:mx-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] rounded-full bg-[var(--theme-bg-section)] z-10 p-2 lg:p-3">
              
              <div className="relative w-full h-full rounded-full overflow-hidden z-0">
                <Image
                  src="https://picsum.photos/seed/floristeria/800/1200"
                  alt="Nuestra floristería"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 80vw, 50vw"
                />
              </div>

            </div>
          </motion.div>

          {/* Columna Derecha: Texto */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0"
          >
            <span className="font-inter text-[10px] uppercase tracking-[0.4em] text-[var(--theme-primary)] mb-5 font-medium">
              Nuestra Historia
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[var(--theme-text)] mb-6 leading-[1.1]">
              El arte de dar vida a <br className="hidden lg:block"/>
              tus emociones
            </h2>
            <p className="font-inter text-[var(--theme-text-muted)] leading-relaxed mb-10 max-w-lg font-light">
              En Floristería Violeta llevamos años cultivando no solo las flores más hermosas, sino también los momentos más especiales de nuestros clientes. Cada pétalo que seleccionamos y cada ramo que diseñamos lleva impregnado nuestro compromiso con la excelencia, el arte floral y el amor por los detalles. 
              <br/><br/>
              Creemos que las flores son el lenguaje universal del alma.
            </p>
            
            <Link 
              href="/nosotros"
              className="inline-block px-10 py-3.5 rounded-[2px] border border-[var(--theme-primary)] text-[var(--theme-primary)] font-inter text-sm tracking-wide transition-all duration-300 hover:bg-[var(--theme-primary)] hover:text-white"
            >
              Conocer más
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
