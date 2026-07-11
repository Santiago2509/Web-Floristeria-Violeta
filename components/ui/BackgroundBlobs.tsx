'use client'
import { motion } from 'framer-motion'

export function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      {/* Onda de plasma principal superior */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[10%] -left-[10%] w-[70vw] h-[60vh] opacity-[45%] dark:opacity-25 mix-blend-normal"
        style={{
          background: 'linear-gradient(135deg, var(--theme-primary-light) 0%, transparent 100%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Onda de plasma secundaria derecha */}
      <motion.div
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.3, 1],
          borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%"]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] -right-[10%] w-[60vw] h-[70vh] opacity-[35%] dark:opacity-25 mix-blend-normal"
        style={{
          background: 'linear-gradient(225deg, var(--theme-primary) 0%, transparent 100%)',
          filter: 'blur(140px)',
        }}
      />

      {/* Onda de plasma inferior central */}
      <motion.div
        animate={{ 
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
          borderRadius: ["50% 50% 40% 60% / 60% 40% 50% 50%", "40% 60% 50% 50% / 50% 50% 60% 40%", "50% 50% 40% 60% / 60% 40% 50% 50%"]
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] left-[15%] w-[80vw] h-[50vh] opacity-[35%] dark:opacity-20 mix-blend-normal"
        style={{
          background: 'linear-gradient(45deg, var(--theme-primary-dark) 0%, var(--theme-primary-light) 100%)',
          filter: 'blur(130px)',
        }}
      />

      {/* Destellos mágicos (Sparkles) */}
      <motion.div animate={{ opacity: [0, 1, 0], scale: [0.8, 1.5, 0.8] }} transition={{ duration: 4, repeat: Infinity, delay: 0 }} className="absolute top-[15%] left-[20%] w-2 h-2 rounded-full bg-white blur-[1px] shadow-[0_0_12px_4px_rgba(255,255,255,1)] dark:opacity-30" />
      <motion.div animate={{ opacity: [0, 1, 0], scale: [0.8, 1.5, 0.8] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute top-[40%] left-[80%] w-3 h-3 rounded-full bg-white blur-[1px] shadow-[0_0_15px_4px_rgba(255,255,255,1)] dark:opacity-30" />
      <motion.div animate={{ opacity: [0, 1, 0], scale: [0.8, 1.5, 0.8] }} transition={{ duration: 3.5, repeat: Infinity, delay: 2 }} className="absolute top-[75%] left-[30%] w-2 h-2 rounded-full bg-white blur-[1px] shadow-[0_0_12px_4px_rgba(255,255,255,1)] dark:opacity-30" />
      <motion.div animate={{ opacity: [0, 1, 0], scale: [0.8, 1.5, 0.8] }} transition={{ duration: 6, repeat: Infinity, delay: 0.5 }} className="absolute top-[60%] left-[10%] w-1.5 h-1.5 rounded-full bg-white blur-[1px] shadow-[0_0_8px_3px_rgba(255,255,255,1)] dark:opacity-30" />
      <motion.div animate={{ opacity: [0, 1, 0], scale: [0.8, 1.5, 0.8] }} transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }} className="absolute top-[25%] left-[70%] w-2 h-2 rounded-full bg-white blur-[1px] shadow-[0_0_10px_3px_rgba(255,255,255,1)] dark:opacity-30" />

      {/* Textura sutil modo claro */}
      <div
        className="dark:hidden absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Ccircle cx='1' cy='1' r='1' fill='%235B2C6F'/%3E%3C/svg%3E")`,
          backgroundSize: '4px 4px',
        }}
      />
    </div>
  )
}
