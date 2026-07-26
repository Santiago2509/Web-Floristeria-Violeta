'use client'
import { motion } from 'framer-motion'

export function LeftFloralVector() {
  return (
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 lg:w-[450px] h-[700px] opacity-25 dark:opacity-35 pointer-events-none hidden md:block z-0 overflow-hidden">
      <motion.svg 
        viewBox="0 0 250 500" fill="none" xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full text-[var(--theme-primary)] drop-shadow-[0_0_10px_rgba(157,112,168,0.4)]"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Tallo terciario exterior */}
        <motion.path
          d="M -10 500 C -20 400, 50 300, 10 200 C -20 100, 40 50, 40 0"
          stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 3.5, delay: 0.8, ease: "easeInOut" }} viewport={{ once: true, amount: 0.4 }}
        />

        {/* Tallo secundario fino */}
        <motion.path
          d="M -30 550 C 70 450, 200 300, 100 180 C 60 100, 150 0, 150 0"
          stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }} viewport={{ once: true, amount: 0.4 }}
        />

        {/* Tallo principal curvo (churro) - Dibuja de abajo hacia arriba */}
        <motion.path
          d="M -50 550 C 50 420, 220 300, 120 180 C 60 80, 180 -20, 180 -20"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }} viewport={{ once: true, amount: 0.4 }}
        />
        
        {/* Hojas principales */}
        <motion.path d="M 145 230 C 200 210, 210 140, 170 120 C 150 160, 120 180, 145 230 Z" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.path d="M 85 360 C 20 340, 10 260, 50 240 C 70 280, 100 300, 85 360 Z" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }} viewport={{ once: true, amount: 0.4 }} />
        
        {/* Hojas adicionales */}
        <motion.path d="M 125 150 C 150 140, 160 100, 140 90 C 130 110, 115 125, 125 150 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.8" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 1.7, ease: "easeOut" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.path d="M 25 160 C 0 130, 0 80, 20 70 C 35 90, 40 120, 25 160 Z" stroke="currentColor" strokeWidth="0.6" opacity="0.6" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 2.2, ease: "easeOut" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.path d="M 170 330 C 210 320, 220 270, 200 250 C 180 270, 160 300, 170 330 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.7" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }} viewport={{ once: true, amount: 0.4 }} />

        {/* Flores abstractas */}
        <motion.circle cx="180" cy="40" r="22" stroke="currentColor" strokeWidth="1.5" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 2.0, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.circle cx="180" cy="40" r="8" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 1, delay: 2.3 }} viewport={{ once: true, amount: 0.4 }} />
        <motion.circle cx="180" cy="40" r="32" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" initial={{ scale: 0, opacity: 0, rotate: -90 }} whileInView={{ scale: 1, opacity: 0.6, rotate: 0 }} transition={{ duration: 2, delay: 2.4, ease: "easeOut" }} viewport={{ once: true, amount: 0.4 }} />

        <motion.circle cx="100" cy="220" r="14" stroke="currentColor" strokeWidth="1" opacity="0.7" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.7 }} transition={{ duration: 1, delay: 1.8, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.circle cx="100" cy="220" r="4" fill="currentColor" opacity="0.7" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 1, delay: 2.1 }} viewport={{ once: true, amount: 0.4 }} />

        <motion.circle cx="70" cy="300" r="10" stroke="currentColor" strokeWidth="1" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 1.4, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.circle cx="70" cy="300" r="4" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 1, delay: 1.7 }} viewport={{ once: true, amount: 0.4 }} />
        
        <motion.circle cx="35" cy="140" r="12" stroke="currentColor" strokeWidth="1" opacity="0.5" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.5 }} transition={{ duration: 1, delay: 2.4, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.circle cx="35" cy="140" r="3" fill="currentColor" opacity="0.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 1, delay: 2.7 }} viewport={{ once: true, amount: 0.4 }} />

        <motion.circle cx="190" cy="400" r="15" stroke="currentColor" strokeWidth="1" opacity="0.6" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.6 }} transition={{ duration: 1, delay: 1.6, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.circle cx="190" cy="400" r="5" fill="currentColor" opacity="0.6" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 1, delay: 1.9 }} viewport={{ once: true, amount: 0.4 }} />

        {/* Polvo estelar / Polen flotante */}
        {[
          { cx: 210, cy: 180, r: 3, delay: 2.4 }, { cx: 60, cy: 120, r: 4, delay: 1.7 },
          { cx: 90, cy: 260, r: 2, delay: 1.0 }, { cx: 140, cy: 420, r: 3, delay: 0.6 },
          { cx: 25, cy: 360, r: 1.5, delay: 2.0 }, { cx: 190, cy: 100, r: 2, delay: 2.8 },
          { cx: 220, cy: 330, r: 2.5, delay: 2.2 }, { cx: 120, cy: 50, r: 1.5, delay: 2.6 },
          { cx: 160, cy: 450, r: 2, delay: 1.4 }, { cx: 40, cy: 200, r: 2.5, delay: 2.1 },
        ].map((dot, i) => (
          <motion.circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill="currentColor" opacity={0.8} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: dot.delay }} viewport={{ once: true, amount: 0.4 }} />
        ))}

        {/* Estrellas chispeantes */}
        <motion.path d="M 160 320 L 165 325 L 170 320 L 165 315 Z" fill="currentColor" initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} transition={{ delay: 3.0, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.path d="M 70 80 L 73 83 L 76 80 L 73 77 Z" fill="currentColor" initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} transition={{ delay: 2.3, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.path d="M 220 200 L 224 204 L 228 200 L 224 196 Z" fill="currentColor" opacity="0.6" initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} transition={{ delay: 2.7, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
      </motion.svg>
    </div>
  )
}

export function RightFloralVector() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 lg:w-[450px] h-[700px] opacity-25 dark:opacity-35 pointer-events-none hidden md:block z-0 overflow-hidden">
      <motion.svg 
        viewBox="0 0 250 500" fill="none" xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full text-[var(--theme-primary)] drop-shadow-[0_0_10px_rgba(157,112,168,0.4)]"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        
        {/* Tallo terciario exterior inverso */}
        <motion.path
          d="M 260 500 C 270 400, 200 300, 240 200 C 270 100, 210 50, 210 0"
          stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 3.5, delay: 0.8, ease: "easeInOut" }} viewport={{ once: true, amount: 0.4 }}
        />

        {/* Tallo secundario fino inverso */}
        <motion.path
          d="M 280 550 C 180 450, 50 300, 150 180 C 190 100, 100 0, 100 0"
          stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }} viewport={{ once: true, amount: 0.4 }}
        />

        {/* Tallo principal curvo inverso - Dibuja de abajo hacia arriba */}
        <motion.path
          d="M 300 550 C 200 420, 30 300, 130 180 C 190 80, 70 -20, 70 -20"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }} viewport={{ once: true, amount: 0.4 }}
        />
        
        {/* Hojas principales */}
        <motion.path d="M 105 230 C 50 210, 40 140, 80 120 C 100 160, 130 180, 105 230 Z" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.path d="M 165 360 C 230 340, 240 260, 200 240 C 180 280, 150 300, 165 360 Z" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }} viewport={{ once: true, amount: 0.4 }} />
        
        {/* Hojas adicionales */}
        <motion.path d="M 125 150 C 100 140, 90 100, 110 90 C 120 110, 135 125, 125 150 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.8" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 1.7, ease: "easeOut" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.path d="M 225 160 C 250 130, 250 80, 230 70 C 215 90, 210 120, 225 160 Z" stroke="currentColor" strokeWidth="0.6" opacity="0.6" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 2.2, ease: "easeOut" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.path d="M 80 330 C 40 320, 30 270, 50 250 C 70 270, 90 300, 80 330 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.7" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }} viewport={{ once: true, amount: 0.4 }} />

        {/* Flores abstractas */}
        <motion.circle cx="70" cy="40" r="22" stroke="currentColor" strokeWidth="1.5" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 1.8, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.circle cx="70" cy="40" r="8" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 1, delay: 2.1 }} viewport={{ once: true, amount: 0.4 }} />
        <motion.circle cx="70" cy="40" r="32" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" initial={{ scale: 0, opacity: 0, rotate: 90 }} whileInView={{ scale: 1, opacity: 0.6, rotate: 0 }} transition={{ duration: 2, delay: 2.4, ease: "easeOut" }} viewport={{ once: true, amount: 0.4 }} />

        <motion.circle cx="150" cy="220" r="14" stroke="currentColor" strokeWidth="1" opacity="0.7" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.7 }} transition={{ duration: 1, delay: 1.8, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.circle cx="150" cy="220" r="4" fill="currentColor" opacity="0.7" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 1, delay: 2.1 }} viewport={{ once: true, amount: 0.4 }} />

        <motion.circle cx="180" cy="300" r="10" stroke="currentColor" strokeWidth="1" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 1.4, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.circle cx="180" cy="300" r="4" fill="currentColor" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 1, delay: 1.7 }} viewport={{ once: true, amount: 0.4 }} />
        
        <motion.circle cx="215" cy="140" r="12" stroke="currentColor" strokeWidth="1" opacity="0.5" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.5 }} transition={{ duration: 1, delay: 2.4, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.circle cx="215" cy="140" r="3" fill="currentColor" opacity="0.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 1, delay: 2.7 }} viewport={{ once: true, amount: 0.4 }} />

        <motion.circle cx="60" cy="400" r="15" stroke="currentColor" strokeWidth="1" opacity="0.6" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.6 }} transition={{ duration: 1, delay: 1.6, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.circle cx="60" cy="400" r="5" fill="currentColor" opacity="0.6" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 1, delay: 1.9 }} viewport={{ once: true, amount: 0.4 }} />

        {/* Polvo estelar / Polen flotante */}
        {[
          { cx: 40, cy: 180, r: 3, delay: 2.4 }, { cx: 190, cy: 120, r: 4, delay: 1.7 },
          { cx: 160, cy: 260, r: 2, delay: 1.0 }, { cx: 110, cy: 420, r: 3, delay: 0.6 },
          { cx: 225, cy: 360, r: 1.5, delay: 2.0 }, { cx: 60, cy: 100, r: 2, delay: 2.8 },
          { cx: 30, cy: 330, r: 2.5, delay: 2.2 }, { cx: 130, cy: 50, r: 1.5, delay: 2.6 },
          { cx: 90, cy: 450, r: 2, delay: 1.4 }, { cx: 210, cy: 200, r: 2.5, delay: 2.1 },
        ].map((dot, i) => (
          <motion.circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill="currentColor" opacity={0.8} initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: dot.delay }} viewport={{ once: true, amount: 0.4 }} />
        ))}

        {/* Estrellas chispeantes */}
        <motion.path d="M 90 320 L 95 325 L 100 320 L 95 315 Z" fill="currentColor" initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} transition={{ delay: 3.0, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.path d="M 180 80 L 183 83 L 186 80 L 183 77 Z" fill="currentColor" initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} transition={{ delay: 2.3, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
        <motion.path d="M 30 200 L 34 204 L 38 200 L 34 196 Z" fill="currentColor" opacity="0.6" initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} transition={{ delay: 2.7, type: "spring" }} viewport={{ once: true, amount: 0.4 }} />
      </motion.svg>
    </div>
  )
}
