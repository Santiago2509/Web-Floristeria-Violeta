'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Heart, Star, Clock } from 'lucide-react'

export function StorytellingJourneyDesktop() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll of the entire 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Door Animation (0 to 0.20 scroll progress)
  const leftDoorX = useTransform(scrollYProgress, [0, 0.20], ["0%", "-100%"])
  const rightDoorX = useTransform(scrollYProgress, [0, 0.20], ["0%", "100%"])
  const doorsOpacity = useTransform(scrollYProgress, [0.15, 0.20], [1, 0])
  const doorsScale = useTransform(scrollYProgress, [0, 0.20], [1, 1.1])

  // Horizontal Scroll Animation (0.20 to 0.60 scroll progress)
  const x = useTransform(scrollYProgress, [0.20, 0.60], ["0%", "-50%"])

  // Background Parallax for chapters
  const bgX1 = useTransform(scrollYProgress, [0.20, 0.60], ["0%", "10%"])
  const bgX2 = useTransform(scrollYProgress, [0.20, 0.60], ["0%", "-10%"])

  // Fade out Chapter 2 (from 0.60 to 0.70)
  const chapter2Opacity = useTransform(scrollYProgress, [0, 0.60, 0.70, 1], [1, 1, 0, 0])
  const chapter2Scale = useTransform(scrollYProgress, [0, 0.60, 0.70, 1], [1, 1, 0.9, 0.9])
  
  // Eliminar Chapter 2 físicamente después de 0.70 usando mapeo estricto
  const ch2Display = useTransform(scrollYProgress, [0, 0.69, 0.70, 1], ["flex", "flex", "none", "none"])

  // Reveal Chapter 3 from below (from 0.75 to 1.0)
  const ch3Opacity = useTransform(scrollYProgress, [0, 0.75, 1], [0, 0, 1])
  const ch3TitleY = useTransform(scrollYProgress, [0, 0.75, 0.95, 1], ["150px", "150px", "0px", "0px"])
  const ch3CardsY = useTransform(scrollYProgress, [0, 0.80, 1], ["250px", "250px", "0px"])
  
  // Garantizar que Chapter 3 no exista antes de 0.75
  const ch3Display = useTransform(scrollYProgress, [0, 0.74, 0.75, 1], ["none", "none", "flex", "flex"])

  // Animaciones decorativas (Línea de tallo y Números Gigantes)
  const pathLength = useTransform(scrollYProgress, [0.20, 1], [0, 1])
  const num1Y = useTransform(scrollYProgress, [0.20, 0.60], ["0%", "20%"])
  const num2Y = useTransform(scrollYProgress, [0.50, 0.70], ["0%", "-20%"])
  const num3Y = useTransform(scrollYProgress, [0.75, 1], ["10%", "-10%"])

  return (
    <>
    {/* Ocultar el footer global solo en PC para que la página tenga un "tope" duro al terminar la animación */}
    <style>{`
      @media (min-width: 1024px) {
        footer { display: none !important; }
      }
    `}</style>
    
    <section ref={containerRef} className="relative h-[400vh] bg-[var(--theme-bg)]">
      
      {/* STICKY CONTAINER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[var(--theme-bg)] transition-colors duration-500">
        
        {/* DOORS (The Hero) */}
        <div className="absolute inset-0 z-50 pointer-events-none">
          {/* Left Door */}
          <motion.div 
            style={{ x: leftDoorX, clipPath: 'inset(0 50% 0 0)', opacity: doorsOpacity, scale: doorsScale }} 
            className="absolute inset-0"
          >
             <Image src="/assets/about_hero_bg_colombia_v2.png" alt="Hero" fill className="object-cover" priority />
             <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-white pt-20">
                <span className="font-inter uppercase tracking-[0.4em] text-sm md:text-base mb-6 opacity-80">El Comienzo</span>
                <h1 className="font-playfair text-6xl md:text-7xl lg:text-9xl drop-shadow-2xl">Nuestra Historia</h1>
             </div>
          </motion.div>

          {/* Right Door */}
          <motion.div 
            style={{ x: rightDoorX, clipPath: 'inset(0 0 0 50%)', opacity: doorsOpacity, scale: doorsScale }} 
            className="absolute inset-0"
          >
             <Image src="/assets/about_hero_bg_colombia_v2.png" alt="Hero" fill className="object-cover" priority />
             <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-white pt-20">
                <span className="font-inter uppercase tracking-[0.4em] text-sm md:text-base mb-6 opacity-80">El Comienzo</span>
                <h1 className="font-playfair text-6xl md:text-7xl lg:text-9xl drop-shadow-2xl">Nuestra Historia</h1>
             </div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            style={{ opacity: doorsOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/70"
          >
            <span className="font-inter text-xs tracking-widest uppercase">Descubrir</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"
            />
          </motion.div>
        </div>

        {/* THE JOURNEY (Horizontal Track) */}
        {/* Track is now 200vw. First 100vw is Chapter 1, second 100vw is Chapters 2 and 3 stacked. */}
        <motion.div style={{ x }} className="flex h-screen w-[200vw] relative z-10 text-[var(--theme-text)]">
          
          {/* Fondo Global del Viaje con Diseño Detallado */}
          <div className="absolute inset-0 w-[200vw] h-full pointer-events-none z-0 overflow-hidden">
             {/* Orbes Mágicos y Formas Orgánicas */}
             <motion.div style={{ x: bgX1 }} className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-[var(--theme-primary)]/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
             <motion.div style={{ x: bgX2 }} className="absolute bottom-[20%] left-[50%] w-[900px] h-[900px] bg-purple-500/10 rounded-[40%] rotate-45 blur-[150px] mix-blend-multiply dark:mix-blend-screen" />
             <motion.div style={{ x: bgX1, scale: chapter2Scale }} className="absolute top-[40%] left-[90%] w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />

             {/* ENREDADERA GIGANTE BOTÁNICA (Dibuja con el scroll) */}
             <svg className="absolute inset-0 w-full h-full opacity-60 dark:opacity-40" viewBox="0 0 4000 1000" preserveAspectRatio="xMidYMid slice">
               
               {/* --- TALLOS PRINCIPALES --- */}
               <motion.path d="M -100 800 C 400 1000, 800 200, 1500 500 S 2500 900, 3500 300 S 4100 600, 4200 500" fill="none" stroke="var(--theme-primary)" strokeWidth="4" strokeLinecap="round" style={{ pathLength }} />
               <motion.path d="M -50 900 C 300 700, 1000 300, 1800 700 S 2800 800, 3800 200" fill="none" stroke="var(--theme-primary)" strokeWidth="1.5" opacity="0.6" style={{ pathLength }} />
               <motion.path d="M 500 100 C 900 200, 1200 800, 2000 600 S 3000 100, 3900 400" fill="none" stroke="var(--theme-primary)" strokeWidth="2" opacity="0.4" strokeDasharray="10 10" style={{ pathLength }} />

               {/* --- FLORES Y HOJAS (CAPÍTULO 1: x=0 a x=1500) --- */}
               {/* Hojas grandes */}
               <motion.path d="M 300 850 Q 380 750, 450 880 Q 350 950, 300 850 Z" fill="none" stroke="var(--theme-primary)" strokeWidth="2" style={{ pathLength }} />
               <motion.path d="M 600 350 Q 650 250, 750 320 Q 680 420, 600 350 Z" fill="none" stroke="var(--theme-primary)" strokeWidth="2" style={{ pathLength }} />
               <motion.path d="M 1200 200 Q 1250 100, 1350 180 Q 1280 250, 1200 200 Z" fill="none" stroke="var(--theme-primary)" strokeWidth="1.5" opacity="0.6" style={{ pathLength }} />
               {/* Flores */}
               <motion.circle cx="450" cy="800" r="30" fill="none" stroke="var(--theme-primary)" strokeWidth="1.5" strokeDasharray="6 6" style={{ pathLength }} />
               <motion.circle cx="450" cy="800" r="10" fill="var(--theme-primary)" opacity="0.5" style={{ pathLength }} />
               <motion.circle cx="800" cy="400" r="20" fill="none" stroke="var(--theme-primary)" strokeWidth="2" style={{ pathLength }} />
               <motion.circle cx="1000" cy="750" r="15" fill="none" stroke="var(--theme-primary)" strokeWidth="1" strokeDasharray="3 3" style={{ pathLength }} />
               {/* Chispas */}
               <motion.path d="M 200 400 L 215 440 L 200 480 L 185 440 Z" fill="var(--theme-primary)" opacity="0.6" style={{ pathLength }} />
               <motion.path d="M 900 700 L 910 720 L 900 740 L 890 720 Z" fill="var(--theme-primary)" opacity="0.8" style={{ pathLength }} />
               <motion.path d="M 1300 300 L 1315 320 L 1300 340 L 1285 320 Z" fill="var(--theme-primary)" opacity="0.5" style={{ pathLength }} />

               {/* --- FLORES Y HOJAS (CAPÍTULO 2: x=1500 a x=2800) --- */}
               <motion.path d="M 1600 550 Q 1680 450, 1750 580 Q 1650 650, 1600 550 Z" fill="none" stroke="var(--theme-primary)" strokeWidth="2" style={{ pathLength }} />
               <motion.path d="M 2100 850 Q 2150 750, 2250 820 Q 2180 920, 2100 850 Z" fill="none" stroke="var(--theme-primary)" strokeWidth="2" style={{ pathLength }} />
               <motion.path d="M 2500 250 Q 2580 150, 2650 280 Q 2550 350, 2500 250 Z" fill="none" stroke="var(--theme-primary)" strokeWidth="2" opacity="0.6" style={{ pathLength }} />
               <motion.circle cx="1700" cy="500" r="40" fill="none" stroke="var(--theme-primary)" strokeWidth="2" strokeDasharray="8 8" style={{ pathLength }} />
               <motion.circle cx="1700" cy="500" r="15" fill="var(--theme-primary)" opacity="0.4" style={{ pathLength }} />
               <motion.circle cx="2300" cy="800" r="25" fill="none" stroke="var(--theme-primary)" strokeWidth="1.5" style={{ pathLength }} />
               <motion.circle cx="2000" cy="300" r="12" fill="none" stroke="var(--theme-primary)" strokeWidth="3" opacity="0.7" style={{ pathLength }} />
               <motion.path d="M 1800 200 L 1820 250 L 1800 300 L 1780 250 Z" fill="var(--theme-primary)" opacity="0.5" style={{ pathLength }} />
               <motion.path d="M 2400 600 L 2410 630 L 2400 660 L 2390 630 Z" fill="var(--theme-primary)" opacity="0.7" style={{ pathLength }} />
               <motion.path d="M 2700 800 L 2710 820 L 2700 840 L 2690 820 Z" fill="var(--theme-primary)" opacity="0.4" style={{ pathLength }} />

               {/* --- FLORES Y HOJAS (CAPÍTULO 3: x=2800 a x=4000) --- */}
               <motion.path d="M 3000 350 Q 3080 250, 3150 380 Q 3050 450, 3000 350 Z" fill="none" stroke="var(--theme-primary)" strokeWidth="2" style={{ pathLength }} />
               <motion.path d="M 3400 750 Q 3450 650, 3550 720 Q 3480 820, 3400 750 Z" fill="none" stroke="var(--theme-primary)" strokeWidth="2" style={{ pathLength }} />
               <motion.path d="M 3800 450 Q 3880 350, 3950 480 Q 3850 550, 3800 450 Z" fill="none" stroke="var(--theme-primary)" strokeWidth="1.5" opacity="0.7" style={{ pathLength }} />
               <motion.circle cx="3100" cy="300" r="50" fill="none" stroke="var(--theme-primary)" strokeWidth="2" strokeDasharray="10 10" style={{ pathLength }} />
               <motion.circle cx="3100" cy="300" r="20" fill="var(--theme-primary)" opacity="0.4" style={{ pathLength }} />
               <motion.circle cx="3600" cy="800" r="30" fill="none" stroke="var(--theme-primary)" strokeWidth="3" style={{ pathLength }} />
               <motion.circle cx="3600" cy="800" r="10" fill="none" stroke="var(--theme-primary)" strokeWidth="1" style={{ pathLength }} />
               <motion.circle cx="3900" cy="200" r="22" fill="none" stroke="var(--theme-primary)" strokeWidth="2" strokeDasharray="4 4" style={{ pathLength }} />
               <motion.path d="M 2900 800 L 2920 840 L 2900 880 L 2880 840 Z" fill="var(--theme-primary)" opacity="0.6" style={{ pathLength }} />
               <motion.path d="M 3700 200 L 3715 230 L 3700 260 L 3685 230 Z" fill="var(--theme-primary)" opacity="0.8" style={{ pathLength }} />
               <motion.path d="M 3300 500 L 3310 520 L 3300 540 L 3290 520 Z" fill="var(--theme-primary)" opacity="0.4" style={{ pathLength }} />
             </svg>

             {/* Números Gigantes Tipográficos */}
             <motion.div style={{ y: num1Y }} className="absolute top-[15%] left-[2%] text-[400px] lg:text-[600px] font-playfair leading-none text-[var(--theme-primary)]/[0.03] dark:text-white/[0.02] select-none pointer-events-none">
               01
             </motion.div>
             <motion.div style={{ y: num2Y, opacity: chapter2Opacity }} className="absolute top-[20%] left-[45%] text-[400px] lg:text-[600px] font-playfair leading-none text-[var(--theme-primary)]/[0.03] dark:text-white/[0.02] select-none pointer-events-none">
               02
             </motion.div>
             <motion.div style={{ y: num3Y, opacity: ch3Opacity }} className="absolute bottom-[0%] left-[55%] text-[300px] lg:text-[500px] font-playfair leading-none text-[var(--theme-primary)]/[0.04] dark:text-white/[0.03] select-none pointer-events-none">
               03
             </motion.div>
          </div>

          {/* CHAPTER 1: LA SEMILLA (Ocupa el primer 100vw) */}
          <div className="w-[100vw] h-full flex items-center justify-center relative z-10 px-6 lg:px-24">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 w-full max-w-7xl mt-16 lg:mt-0">
              <div className="w-full lg:w-1/2 relative h-[40vh] lg:h-[70vh]">
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/20 dark:border-white/10"
                >
                  <Image src="/assets/about_story_img.png" alt="Taller" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 text-white">
                     <h3 className="font-playfair text-5xl lg:text-7xl mb-2 drop-shadow-lg">01</h3>
                     <span className="font-inter uppercase tracking-[0.3em] text-xs lg:text-sm text-[var(--theme-primary)] drop-shadow-md">La Semilla</span>
                  </div>
                </motion.div>
                {/* Elementos flotantes satélite */}
                <motion.div 
                  animate={{ y: [10, -10, 10], rotate: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -right-6 w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-[var(--theme-primary)]/30 backdrop-blur-md bg-white/5 flex items-center justify-center shadow-xl"
                >
                  <span className="text-[var(--theme-primary)] text-sm text-center font-playfair italic">Est. 2026</span>
                </motion.div>
              </div>
              <div className="w-full lg:w-1/2 pl-0 lg:pl-10">
                <h2 className="font-playfair text-4xl lg:text-6xl mb-6 lg:mb-8 leading-tight">Un sueño cultivado con <span className="text-[var(--theme-primary)] italic">amor</span> y detalle.</h2>
                <div className="relative">
                  <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-[var(--theme-primary)] to-transparent opacity-50 rounded-full" />
                  <p className="font-inter text-[var(--theme-text-muted)] text-base lg:text-lg leading-relaxed mb-6">
                    Floristería Violeta nació de una pasión genuina por la belleza natural y el deseo de crear algo más que simples arreglos florales. Desde nuestro primer día, entendimos que no vendemos flores; ayudamos a las personas a expresar lo que las palabras a veces no pueden decir.
                  </p>
                  <p className="font-inter text-[var(--theme-text-muted)] text-base lg:text-lg leading-relaxed">
                    Comenzamos en un pequeño taller, donde cada ramo era diseñado meticulosamente a mano, soñando con transformar emociones en arte botánico.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CHAPTER 2 & 3 CONTAINER (Comparten el segundo 100vw) */}
          <div className="w-[100vw] h-full relative z-10">
            
            {/* CHAPTER 2: EL TALLO (Desaparece al hacer scroll) */}
            <motion.div style={{ opacity: chapter2Opacity, scale: chapter2Scale, display: ch2Display }} className="absolute inset-0 flex items-center justify-center px-6 lg:px-24">
              <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 w-full max-w-7xl mt-16 lg:mt-0">
                <div className="w-full lg:w-1/2 pr-0 lg:pr-12">
                  <div className="flex items-center gap-4 lg:gap-6 mb-6 lg:mb-8">
                    <h3 className="font-playfair text-4xl lg:text-5xl">02</h3>
                    <div className="h-[1px] flex-1 bg-[var(--theme-border)]/40" />
                    <span className="font-inter uppercase tracking-widest text-xs lg:text-sm text-[var(--theme-primary)]">El Tallo</span>
                  </div>
                  <h2 className="font-playfair text-3xl lg:text-6xl mb-6 lg:mb-8 leading-tight">Creciendo hacia la luz de la excelencia.</h2>
                  <p className="font-inter text-[var(--theme-text-muted)] text-base lg:text-lg leading-relaxed mb-8 lg:mb-10">
                    Aunque hemos crecido, nuestra filosofía no ha cambiado. Nuestro equipo de artesanos florales dedica su vida a la alta costura botánica. Cada tallo es seleccionado por su frescura, cada color es elegido con un propósito.
                  </p>
                  <div className="p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-[var(--theme-primary)]/5 dark:bg-white/5 border border-[var(--theme-primary)]/10 dark:border-white/10 backdrop-blur-md">
                    <p className="font-playfair text-lg lg:text-2xl italic text-[var(--theme-text)]/90">
                      "Las flores son la música del suelo, de los labios de la tierra habladas sin sonido."
                    </p>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 relative h-[40vh] lg:h-[70vh] flex justify-center items-center">
                  {/* Decoraciones traseras */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--theme-primary)]/10 to-transparent rounded-t-[10rem] rounded-b-3xl transform -rotate-6 scale-105 blur-lg" />
                  
                  {/* Contenedor principal en forma de ARCO */}
                  <motion.div 
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-[80%] h-[90%] lg:h-[100%] rounded-t-[15rem] rounded-b-[2rem] overflow-hidden border-[6px] border-white/30 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-10"
                    style={{ clipPath: 'inset(0px round 15rem 15rem 2rem 2rem)' }}
                  >
                      <Image src="/assets/hero_bg.png" alt="Flor" fill className="object-cover opacity-80 mix-blend-overlay dark:mix-blend-normal" />
                      <div className="absolute inset-0 bg-black/20" />
                      
                      {/* Imagen secundaria insertada estilo revista */}
                      <div className="absolute w-[60%] h-[40%] left-1/2 -translate-x-1/2 bottom-10 rounded-2xl overflow-hidden border-2 border-white/50 shadow-2xl">
                          <Image src="/assets/about_story_img.png" alt="Flor 2" fill className="object-cover" />
                      </div>
                  </motion.div>

                  {/* Anillo orbital decorativo */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[90%] aspect-square rounded-full border border-[var(--theme-primary)]/30 border-dashed z-0 pointer-events-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* CHAPTER 3: EL FLORECIMIENTO (Aparece desde abajo en el mismo lugar) */}
            <motion.div style={{ opacity: ch3Opacity, display: ch3Display }} className="absolute inset-0 flex items-center justify-center px-6 lg:px-24">
              <div className="w-full max-w-7xl flex flex-col items-center text-center mt-16 lg:mt-0 relative z-20">
                  <motion.div style={{ y: ch3TitleY }}>
                    <h3 className="font-playfair text-3xl lg:text-4xl mb-2 lg:mb-4 text-[var(--theme-primary)] drop-shadow-md">03 — El Florecimiento</h3>
                    <h2 className="font-playfair text-5xl lg:text-8xl mb-12 lg:mb-20 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-text)] to-[var(--theme-primary)]">Nuestros Pilares</h2>
                  </motion.div>
                  
                  <motion.div style={{ y: ch3CardsY }} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 w-full relative">
                    {/* Brillo detrás de las tarjetas */}
                    <div className="absolute inset-0 bg-[var(--theme-primary)]/5 blur-[100px] -z-10 rounded-full" />
                    
                    {[
                      { icon: Heart, t: 'Pasión Floral', d: 'Cada creación es única, prestando atención a la armonía de colores.' },
                      { icon: Star, t: 'Calidad Premium', d: 'Trabajamos con flores de la más alta calidad, seleccionadas diariamente.' },
                      { icon: Clock, t: 'Puntualidad', d: 'Nos tomamos el tiempo de entrega tan en serio como nuestras flores.' }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center p-10 lg:p-14 rounded-[2rem] lg:rounded-[3rem] bg-white/40 dark:bg-black/40 border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none backdrop-blur-2xl hover:bg-white/60 dark:hover:bg-white/5 transition-all duration-500 group relative overflow-hidden">
                        {/* Acento superior en la tarjeta */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--theme-primary)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-[var(--theme-primary)]/10 to-[var(--theme-primary)]/5 dark:from-[var(--theme-primary)]/30 dark:to-transparent flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-[var(--theme-primary)]/10">
                          <item.icon className="w-10 h-10 lg:w-12 lg:h-12 text-[var(--theme-primary)]" strokeWidth={1} />
                        </div>
                        <h4 className="font-playfair text-2xl lg:text-3xl mb-4 text-[var(--theme-text)]">{item.t}</h4>
                        <p className="font-inter text-sm lg:text-base text-[var(--theme-text-muted)] leading-relaxed font-light">{item.d}</p>
                      </div>
                    ))}
                  </motion.div>
              </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
    </>
  )
}
