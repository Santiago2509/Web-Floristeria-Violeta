'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function AboutStory() {
  return (
    <section className="w-full py-24 md:py-32 relative bg-[var(--theme-bg)]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Texto de la Historia */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <span className="font-inter text-sm uppercase tracking-widest text-[var(--theme-primary)] mb-4 font-semibold">
              Los Comienzos
            </span>
            <h2 className="font-playfair text-4xl lg:text-5xl text-[var(--theme-text)] mb-8 leading-tight">
              Un sueño cultivado <br/> con amor y detalle
            </h2>
            
            <div className="font-inter text-[var(--theme-text-muted)] leading-relaxed space-y-6 text-lg">
              <p>
                Floristería Violeta nació de una pasión genuina por la belleza natural y el deseo de crear algo más que simples arreglos florales. Desde nuestro primer día, entendimos que no vendemos flores; ayudamos a las personas a expresar lo que las palabras a veces no pueden decir.
              </p>
              <p>
                Comenzamos en un pequeño taller, donde cada ramo era diseñado meticulosamente a mano. Aunque hemos crecido, nuestra filosofía no ha cambiado: cada tallo es seleccionado por su frescura, cada color es elegido con un propósito, y cada entrega es tratada como el evento más importante del día.
              </p>
              <p>
                Hoy, somos un equipo de artesanos florales dedicados a la alta costura botánica. Ya sea para un aniversario íntimo o para la boda de tus sueños, en Violeta ponemos nuestra alma para que tu momento florezca.
              </p>
            </div>
          </motion.div>

          {/* Imagen Editorial */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <Image
              src="/assets/about_story_img.png"
              alt="Florista trabajando en un arreglo"
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Pequeño detalle de cristal flotante */}
            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 text-white shadow-xl">
              <p className="font-playfair text-xl italic text-center">
                "Las flores son la música del suelo, de los labios de la tierra habladas sin sonido."
              </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
