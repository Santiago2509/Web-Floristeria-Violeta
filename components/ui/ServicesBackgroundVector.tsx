'use client'
import { motion } from 'framer-motion'

export function ServicesBackgroundVector() {
  return (
    <div className="absolute inset-0 w-full h-[2500px] pointer-events-none hidden md:block z-0 opacity-25 dark:opacity-35 overflow-hidden">
      <svg 
        viewBox="0 0 1000 2500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full text-[var(--theme-primary)] drop-shadow-[0_0_12px_rgba(157,112,168,0.4)]"
      >
        {/* Tallo principal serpeante (Dibuja de arriba hacia abajo) */}
        <motion.path
          d="M 500 0 C 500 200, 900 300, 800 650 C 700 1000, 100 1050, 200 1400 C 300 1750, 900 1800, 800 2150 C 700 2500, 500 2300, 500 2500"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 6, ease: "easeInOut" }} viewport={{ once: true, margin: "100px" }}
        />
        
        {/* Tallo secundario fino (Dibuja de arriba hacia abajo) */}
        <motion.path
          d="M 480 0 C 480 220, 860 320, 780 650 C 700 980, 140 1070, 220 1400 C 300 1730, 860 1820, 780 2150 C 700 2480, 480 2280, 480 2500"
          stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 6.5, delay: 0.5, ease: "easeInOut" }} viewport={{ once: true, margin: "100px" }}
        />

        {/* --- ADORNOS EN ESPACIO VACÍO 1 (Sobre tarjeta 1, y=350, x=650) --- */}
        <motion.circle cx="650" cy="350" r="18" stroke="currentColor" strokeWidth="1.5" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 1.5, duration: 1, type: "spring" }} viewport={{ once: true, margin: "100px" }} />
        <motion.circle cx="650" cy="350" r="6" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.8, duration: 1 }} viewport={{ once: true, margin: "100px" }} />
        <motion.circle cx="650" cy="350" r="28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" initial={{ scale: 0, opacity: 0, rotate: -90 }} whileInView={{ scale: 1, opacity: 0.6, rotate: 0 }} transition={{ delay: 1.9, duration: 2 }} viewport={{ once: true, margin: "100px" }} />
        
        <motion.path d="M 590 320 C 560 310, 540 280, 560 260 C 580 280, 590 300, 590 320 Z" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ delay: 1.3, duration: 1 }} viewport={{ once: true, margin: "100px" }} />
        <motion.path d="M 680 380 C 710 410, 740 420, 750 400 C 730 380, 700 370, 680 380 Z" stroke="currentColor" strokeWidth="1.2" opacity="0.8" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ delay: 1.6, duration: 1 }} viewport={{ once: true, margin: "100px" }} />

        {/* --- ADORNOS EN ESPACIO VACÍO 2 (Entre tarjeta 1 y 2, y=1050, x=500) --- */}
        <motion.circle cx="500" cy="1050" r="22" stroke="currentColor" strokeWidth="1.5" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 2.5, duration: 1, type: "spring" }} viewport={{ once: true, margin: "100px" }} />
        <motion.circle cx="500" cy="1050" r="7" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 2.8, duration: 1 }} viewport={{ once: true, margin: "100px" }} />
        <motion.circle cx="500" cy="1050" r="34" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" initial={{ scale: 0, opacity: 0, rotate: 90 }} whileInView={{ scale: 1, opacity: 0.6, rotate: 0 }} transition={{ delay: 2.9, duration: 2 }} viewport={{ once: true, margin: "100px" }} />

        <motion.path d="M 550 1000 C 580 970, 600 930, 580 910 C 560 930, 550 970, 550 1000 Z" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ delay: 2.2, duration: 1 }} viewport={{ once: true, margin: "100px" }} />
        <motion.path d="M 440 1100 C 410 1130, 380 1140, 370 1120 C 390 1100, 420 1090, 440 1100 Z" stroke="currentColor" strokeWidth="1" opacity="0.7" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ delay: 2.6, duration: 1 }} viewport={{ once: true, margin: "100px" }} />

        {/* --- ADORNOS EN ESPACIO VACÍO 3 (Entre tarjeta 2 y 3, y=1800, x=500) --- */}
        <motion.circle cx="500" cy="1800" r="16" stroke="currentColor" strokeWidth="1.5" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 4.0, duration: 1, type: "spring" }} viewport={{ once: true, margin: "100px" }} />
        <motion.circle cx="500" cy="1800" r="5" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 4.3, duration: 1 }} viewport={{ once: true, margin: "100px" }} />

        <motion.path d="M 450 1750 C 420 1720, 400 1690, 420 1670 C 440 1690, 440 1720, 450 1750 Z" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ delay: 3.7, duration: 1 }} viewport={{ once: true, margin: "100px" }} />
        <motion.path d="M 550 1850 C 580 1880, 610 1890, 620 1870 C 600 1850, 570 1840, 550 1850 Z" stroke="currentColor" strokeWidth="1" opacity="0.7" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ delay: 4.1, duration: 1 }} viewport={{ once: true, margin: "100px" }} />
        
        {/* Diamantes Geométricos Flotantes (reubicados) */}
        <motion.path d="M 720 450 L 725 455 L 730 450 L 725 445 Z" fill="currentColor" initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} transition={{ delay: 1.8, type: "spring" }} viewport={{ once: true, margin: "100px" }} />
        <motion.path d="M 380 950 L 385 955 L 390 950 L 385 945 Z" fill="currentColor" initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} transition={{ delay: 3.0, type: "spring" }} viewport={{ once: true, margin: "100px" }} />
        <motion.path d="M 600 1700 L 604 1704 L 608 1700 L 604 1696 Z" fill="currentColor" initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} transition={{ delay: 4.4, type: "spring" }} viewport={{ once: true, margin: "100px" }} />

        {/* Polvo estelar (Sparkles esparcidos por el recorrido) */}
        {[
          { x: 550, y: 150, r: 3, d: 1 }, { x: 700, y: 300, r: 2, d: 1.5 }, { x: 720, y: 550, r: 4, d: 2 },
          { x: 650, y: 750, r: 2, d: 2.2 }, { x: 500, y: 900, r: 3, d: 2.6 }, { x: 400, y: 1150, r: 2, d: 2.8 },
          { x: 250, y: 1300, r: 4, d: 3.2 }, { x: 300, y: 1500, r: 2, d: 3.4 }, { x: 450, y: 1650, r: 3, d: 3.8 },
          { x: 600, y: 1900, r: 2, d: 4.1 }, { x: 750, y: 2050, r: 4, d: 4.5 }, { x: 700, y: 2250, r: 2, d: 4.8 },
          { x: 550, y: 2350, r: 3, d: 5 }
        ].map((dot, i) => (
          <motion.circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill="currentColor" opacity="0.8" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: dot.d, duration: 0.5 }} viewport={{ once: true, margin: "100px" }} />
        ))}
      </svg>
    </div>
  )
}
