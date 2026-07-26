'use client'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'

export function AboutStory() {
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
  }

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section className="w-full py-24 md:py-32 relative bg-[var(--theme-bg)] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto">
          
          {/* Tarjeta de Texto (Superpuesta) */}
          <motion.div 
            variants={containerVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-[55%] relative z-20 bg-[#FDFBF7] dark:bg-[#111111] p-10 md:p-14 lg:p-16 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] lg:-mr-20 xl:-mr-32 mt-12 lg:mt-0 order-2 lg:order-1 border border-black/5 dark:border-white/5"
          >
            <motion.span variants={itemVars} className="font-inter text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--theme-text-muted)] mb-4 font-bold block">
              Los Comienzos
            </motion.span>
            
            <motion.h2 variants={itemVars} className="font-playfair text-4xl lg:text-5xl text-[var(--theme-text)] mb-8 leading-[1.2]">
              Un sueño cultivado <br className="hidden md:block"/> con amor y detalle.
            </motion.h2>
            
            <div className="font-inter text-[var(--theme-text-muted)] leading-relaxed space-y-5 text-[15px] md:text-base font-medium mb-10">
              <motion.p variants={itemVars}>
                Floristería Violeta nació de una pasión genuina por la belleza natural y el deseo de crear algo más que simples arreglos florales. Desde nuestro primer día, entendimos que no vendemos flores; ayudamos a las personas a expresar lo que las palabras a veces no pueden decir.
              </motion.p>
              <motion.p variants={itemVars}>
                Comenzamos en un pequeño taller, donde cada ramo era diseñado meticulosamente a mano. Aunque hemos crecido, nuestra filosofía no ha cambiado: cada tallo es seleccionado por su frescura, cada color es elegido con un propósito, y cada entrega es tratada como el evento más importante del día.
              </motion.p>
            </div>

            {/* Cita Integrada */}
            <motion.div variants={itemVars} className="flex items-start gap-4">
              <span className="font-playfair text-6xl text-[var(--theme-primary)] opacity-80 leading-none h-8">
                “
              </span>
              <p className="font-playfair text-xl md:text-2xl text-[var(--theme-text)] italic pt-2 leading-tight">
                Las flores son la música del suelo, de los labios de la tierra habladas sin sonido."
              </p>
            </motion.div>
          </motion.div>

          {/* Imagen Editorial (Arco de Catedral) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-[45%] relative z-10 h-[500px] md:h-[600px] lg:h-[750px] rounded-t-full rounded-b-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] group order-1 lg:order-2"
          >
            <Image
              src="/assets/about_story_img.png"
              alt="Florista trabajando en un arreglo"
              fill
              className="object-cover transition-transform duration-[20s] ease-linear group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
