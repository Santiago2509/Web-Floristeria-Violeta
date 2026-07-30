'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, Star, Clock } from 'lucide-react'

export function StorytellingJourneyMobile() {
  return (
    <div className="w-full bg-[var(--theme-bg)] pb-20 overflow-hidden">
      {/* HERO SECTION - MOBILE */}
      <section className="relative h-[80vh] w-full mb-16">
        <Image src="/assets/about_hero_bg_colombia_v2.png" alt="Hero" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pt-20 px-6 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-inter uppercase tracking-[0.4em] text-sm mb-4"
          >
            El Comienzo
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-playfair text-5xl md:text-6xl drop-shadow-2xl"
          >
            Nuestra Historia
          </motion.h1>
        </div>
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
             <Image src="/assets/about_story_img.png" alt="Taller" fill className="object-cover" />
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
              "Las flores son la música del suelo, de los labios de la tierra habladas sin sonido."
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
           <Image src="/assets/hero_bg.png" alt="Flor" fill className="object-cover opacity-80 mix-blend-overlay dark:mix-blend-normal" />
           <div className="absolute inset-0 bg-black/20" />
           {/* Imagen secundaria insertada estilo revista */}
           <div className="absolute w-[70%] h-[40%] left-1/2 -translate-x-1/2 bottom-8 rounded-xl overflow-hidden border-2 border-white/50 shadow-2xl">
               <Image src="/assets/about_story_img.png" alt="Flor 2" fill className="object-cover" />
           </div>
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
        
        <div className="flex flex-col gap-6">
          {[
            { icon: Heart, t: 'Pasión Floral', d: 'Cada creación es única, prestando atención a la armonía de colores.' },
            { icon: Star, t: 'Calidad Premium', d: 'Trabajamos con flores de la más alta calidad, seleccionadas diariamente.' },
            { icon: Clock, t: 'Puntualidad', d: 'Nos tomamos el tiempo de entrega tan en serio como nuestras flores.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-white/40 dark:bg-black/40 border border-white/60 dark:border-white/10 shadow-lg backdrop-blur-md"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center mb-6 border border-[var(--theme-primary)]/20">
                <item.icon className="w-8 h-8 text-[var(--theme-primary)]" strokeWidth={1.5} />
              </div>
              <h4 className="font-playfair text-2xl mb-3 text-[var(--theme-text)]">{item.t}</h4>
              <p className="font-inter text-sm text-[var(--theme-text-muted)] leading-relaxed font-light">{item.d}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
