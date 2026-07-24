'use client'
import { motion } from 'framer-motion'
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

export function Services() {
  return (
    <section className="w-full py-24 md:py-32 relative border-y border-[var(--theme-border)]/20 overflow-hidden" id="servicios">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 md:mb-32">
          <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-4 block font-semibold">
            Nuestros Servicios
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[var(--theme-text)]">
            Más allá de las flores
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12 lg:gap-24`}>
                
                {/* Imagen */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full md:w-1/2 relative h-[280px] sm:h-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group"
                >
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </motion.div>

                {/* Texto */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="w-full md:w-1/2 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <span className="text-2xl md:text-3xl font-playfair text-[var(--theme-primary)]/40 italic">
                      0{index + 1}
                    </span>
                    <div className="h-[1px] w-8 md:w-12 bg-[var(--theme-primary)]/40" />
                  </div>
                  
                  <h3 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[var(--theme-text)] mb-4 md:mb-6 leading-tight">
                    {service.title}
                  </h3>
                  <p className="font-inter text-base md:text-lg text-[var(--theme-text-muted)] leading-relaxed mb-6 md:mb-10">
                    {service.description}
                  </p>
                  
                  {/* Botón de acción */}
                  <div className="flex items-center gap-4 text-[var(--theme-primary)] font-medium font-inter group cursor-pointer hover:text-[var(--theme-primary-dark)] transition-colors w-max">
                    <span className="uppercase tracking-widest text-xs md:text-sm border-b border-[var(--theme-primary)] pb-1">Descubrir más</span>
                    <span className="transform transition-transform group-hover:translate-x-2">→</span>
                  </div>
                </motion.div>
                
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
