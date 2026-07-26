'use client'
import { motion } from 'framer-motion'
import { Heart, Star, Clock } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Pasión por el Arte Floral',
    description: 'No hacemos arreglos en serie. Cada creación es una pieza única diseñada con amor, prestando atención a la armonía de colores y texturas.',
  },
  {
    icon: Star,
    title: 'Calidad Premium',
    description: 'Trabajamos exclusivamente con flores frescas de la más alta calidad, seleccionadas diariamente para garantizar la máxima durabilidad y belleza.',
  },
  {
    icon: Clock,
    title: 'Compromiso y Puntualidad',
    description: 'Sabemos que las sorpresas no pueden esperar. Nos tomamos el tiempo de entrega tan en serio como la calidad de nuestras flores.',
  }
]

export function AboutValues() {
  return (
    <section className="w-full py-24 md:py-32 relative bg-white dark:bg-[#0a0a0a] border-t border-[var(--theme-border)]/10 overflow-hidden">
      
      {/* Orbes de Luz de Fondo para que el Glassmorphism tenga efecto */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[var(--theme-primary)]/10 dark:bg-[var(--theme-primary)]/20 rounded-full blur-[80px] md:blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[5%] right-[5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-300/20 dark:bg-purple-900/20 rounded-full blur-[100px] md:blur-[150px]" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="font-inter text-sm uppercase tracking-[0.3em] text-[var(--theme-primary)] mb-6 block font-semibold">
            Nuestros Pilares
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[var(--theme-text)]">
            Lo que nos define
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className="flex flex-col items-center text-center p-10 md:p-12 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(157,112,168,0.15)] transition-all duration-700 group relative overflow-hidden"
            >
              {/* Brillo interno de la tarjeta */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="w-24 h-24 rounded-full bg-white/60 dark:bg-black/30 shadow-inner flex items-center justify-center text-[var(--theme-primary)] mb-8 group-hover:-translate-y-2 transition-transform duration-500 relative">
                {/* Glow mágico del ícono en hover */}
                <div className="absolute inset-0 bg-[var(--theme-primary)] rounded-full blur-xl opacity-0 group-hover:opacity-30 dark:group-hover:opacity-50 transition-opacity duration-700" />
                <value.icon strokeWidth={1} className="w-10 h-10 relative z-10 transition-transform duration-700 group-hover:scale-110" />
              </div>
              
              <h3 className="font-playfair text-2xl lg:text-3xl text-[var(--theme-text)] mb-4 group-hover:text-[var(--theme-primary)] transition-colors duration-500">
                {value.title}
              </h3>
              
              <p className="font-inter text-[var(--theme-text-muted)] leading-relaxed font-light">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
