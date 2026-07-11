'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function AboutPreview() {
  return (
    <section className="w-full py-24 relative z-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Columna Izquierda: Imagen */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative z-30 flex justify-center lg:justify-start"
          >
            {/* Contenedor Posicionador Relativo */}
            <div className="relative aspect-[4/5] w-4/5 max-w-[300px] sm:max-w-sm lg:max-w-md mx-auto lg:mx-0 lg:-mb-32 lg:translate-y-16">
              
              {/* La Foto Real (ajustada para quedar estrictamente DENTRO del hueco del marco) */}
              <div className="absolute top-[15%] left-[12%] right-[12%] bottom-[2%] rounded-t-full rounded-b-2xl overflow-hidden z-0">
                <Image
                  src="https://picsum.photos/seed/historia/800/1000"
                  alt="Nuestra floristería"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 50vw"
                />
              </div>

              {/* El Marco Floral (forzado a cubrir todo el contenedor para ser el contorno exterior absoluto) */}
              <div className="absolute inset-0 z-10 pointer-events-none drop-shadow-[0_20px_25px_rgba(0,0,0,0.4)] scale-[1.15]">
                <Image
                  src="/assets/marco_floral.png"
                  alt="Marco floral decorativo"
                  fill
                  className="object-fill"
                />
              </div>

            </div>
          </motion.div>

          {/* Columna Derecha: Texto */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-4">
              Nuestra Historia
            </span>
            <h2 className="font-playfair text-4xl lg:text-5xl text-[var(--theme-text)] mb-6">
              El arte de dar vida a tus emociones
            </h2>
            <p className="font-inter text-[var(--theme-text-muted)] leading-relaxed mb-8 max-w-xl">
              En Floristería Violeta llevamos años cultivando no solo las flores más hermosas, sino también los momentos más especiales de nuestros clientes. Cada pétalo que seleccionamos y cada ramo que diseñamos lleva impregnado nuestro compromiso con la excelencia, el arte floral y el amor por los detalles. 
              Creemos que las flores son el lenguaje universal del alma.
            </p>
            
            <Link 
              href="/nosotros"
              className="inline-block px-8 py-3 rounded-full border border-[var(--theme-primary)] text-[var(--theme-primary)] font-inter transition-all hover:bg-[var(--theme-primary)] hover:text-[var(--theme-bg)]"
            >
              Conocer más
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
