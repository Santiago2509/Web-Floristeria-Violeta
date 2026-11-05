'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, Star, Clock } from 'lucide-react'
import { VintageCollage, type CollagePhoto } from './VintageCollage'

export function StorytellingJourneyMobile({ photos = [] }: { photos?: CollagePhoto[] }) {
  return (
    <div className="w-full bg-[var(--theme-bg)] pb-20 overflow-hidden">
      {/* HERO SECTION - MOBILE */}
      <section className="relative h-[85svh] w-full mb-16">
        <VintageCollage photos={photos} variant="mobile" />
      </section>

      {/* CHAPTER 1: LA SEMILLA */}
      <section className="px-6 mb-24">
        <div className="relative mb-10">
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 dark:border-white/10"
           >
             <Image src="/assets/nosotros_semilla.webp" alt="Rosas preservadas bajo cúpula frente al logo de Violeta Floristería" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[50%_47%]" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
             <div className="absolute bottom-6 left-6 text-white">
                <h3 className="font-playfair text-5xl mb-1 drop-shadow-lg">01</h3>
                <span className="font-inter uppercase tracking-[0.3em] text-xs text-[var(--theme-primary)] drop-shadow-md">La Semilla</span>
             </div>
           </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-3xl mb-6 leading-tight">Un sueño cultivado con <span className="text-[var(--theme-primary)] italic">amor</span> y detalle.</h2>
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[var(--theme-primary)] to-transparent opacity-50 rounded-full" />
            <p className="font-inter text-[var(--theme-text-muted)] text-base leading-relaxed mb-6">
              Floristería Violeta nació de una pasión genuina por la belleza natural y el deseo de crear algo más que simples arreglos florales. Desde nuestro primer día, entendimos que no vendemos flores; ayudamos a las personas a expresar lo que las palabras a veces no pueden decir.
            </p>
            <p className="font-inter text-[var(--theme-text-muted)] text-base leading-relaxed">
              Comenzamos en un pequeño taller, donde cada ramo era diseñado meticulosamente a mano, soñando con transformar emociones en arte botánico.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CHAPTER 2: EL TALLO */}
      <section className="px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <h3 className="font-playfair text-4xl">02</h3>
            <div className="h-[1px] flex-1 bg-[var(--theme-border)]/40" />
            <span className="font-inter uppercase tracking-widest text-xs text-[var(--theme-primary)]">El Tallo</span>
          </div>
          <h2 className="font-playfair text-3xl mb-6 leading-tight">Creciendo hacia la luz de la excelencia.</h2>
          <p className="font-inter text-[var(--theme-text-muted)] text-base leading-relaxed mb-8">
            Aunque hemos crecido, nuestra filosofía no ha cambiado. Nuestro equipo de artesanos florales dedica su vida a la alta costura botánica. Cada tallo es seleccionado por su frescura, cada color es elegido con un propósito.
          </p>
          <div className="p-6 rounded-2xl bg-[var(--theme-primary)]/5 dark:bg-white/5 border border-[var(--theme-primary)]/10 dark:border-white/10 backdrop-blur-md">
            <p className="font-playfair text-lg italic text-[var(--theme-text)]/90">
              “Las flores son la música del suelo, de los labios de la tierra habladas sin sonido.”
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[400px] w-full rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl border-[4px] border-white/30 dark:border-white/10"
          style={{ clipPath: 'inset(0px round 10rem 10rem 2rem 2rem)' }}
        >
           <Image src="/assets/nosotros_tallo.webp" alt="Sorpresa romántica con cajas de rosas rojas, globos de corazón y camino de pétalos" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[50%_55%]" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        </motion.div>
      </section>

      {/* CHAPTER 3: EL FLORECIMIENTO */}
      <section className="px-6 relative">
        <div className="absolute inset-0 bg-[var(--theme-primary)]/5 blur-[80px] -z-10 rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="font-playfair text-2xl mb-2 text-[var(--theme-primary)] drop-shadow-md">03 — El Florecimiento</h3>
          <h2 className="font-playfair text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-text)] to-[var(--theme-primary)]">Nuestros Pilares</h2>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Heart, t: 'Pasión Floral', d: 'Cada creación es única, cuidando la armonía de colores.' },
            { icon: Star, t: 'Calidad Premium', d: 'Flores de la más alta calidad, elegidas cada día.' },
            { icon: Clock, t: 'Puntualidad', d: 'Nos tomamos el tiempo de entrega tan en serio como nuestras flores.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`relative overflow-hidden rounded-[1.75rem] border border-[var(--theme-border)] bg-[var(--theme-bg-card)] p-5 ${i === 2 ? 'col-span-2 flex items-center gap-4' : 'flex flex-col'}`}
            >
              {/* arco decorativo de fondo */}
              <span className="absolute -right-6 -top-6 w-20 h-24 rounded-b-full bg-[var(--theme-blush)]" />
              <div className={`relative w-11 h-11 shrink-0 rounded-full bg-plum-gradient flex items-center justify-center ${i === 2 ? '' : 'mb-4'}`}>
                <item.icon className="w-5 h-5 text-white" strokeWidth={1.8} />
              </div>
              <div className="relative">
                <h4 className="font-playfair text-xl leading-tight mb-1.5 text-[var(--theme-text)]">{item.t}</h4>
                <p className="font-inter text-[13px] text-[var(--theme-text-muted)] leading-snug">{item.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
