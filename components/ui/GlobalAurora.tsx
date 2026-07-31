'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function GlobalAurora() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Base sólida para evitar fondo del navegador */}
      <div className="absolute inset-0 bg-[#FCFAFA] dark:bg-[#11081a]" />
      {/* Blob 1 - Banda Principal Morada */}
      <motion.div
        animate={{
          x: ["-20vw", "30vw", "-10vw", "-20vw"],
          y: ["-10vh", "40vh", "10vh", "-10vh"],
          scale: [1, 1.4, 0.9, 1],
          rotate: [0, 45, -20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[80vw] h-[40vw] max-w-[1000px] max-h-[500px] bg-[var(--theme-primary)]/40 dark:bg-[var(--theme-primary)]/50 rounded-[40%_60%_70%_30%] blur-[120px] mix-blend-multiply dark:mix-blend-screen"
      />
      
      {/* Blob 2 - Banda Secundaria Fucsia */}
      <motion.div
        animate={{
          x: ["30vw", "-20vw", "40vw", "30vw"],
          y: ["20vh", "-10vh", "30vh", "20vh"],
          scale: [0.8, 1.3, 1, 0.8],
          rotate: [0, -60, 30, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/4 right-0 w-[60vw] h-[80vw] max-w-[800px] max-h-[1000px] bg-fuchsia-500/25 dark:bg-fuchsia-500/30 rounded-[60%_40%_30%_70%] blur-[130px] mix-blend-multiply dark:mix-blend-screen"
      />
      
      {/* Blob 3 - Banda Profunda Indigo */}
      <motion.div
        animate={{
          x: ["-10vw", "40vw", "-30vw", "-10vw"],
          y: ["50vh", "-20vh", "40vh", "50vh"],
          scale: [1, 1.5, 0.8, 1],
          rotate: [0, 90, -45, 0],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-0 left-1/4 w-[70vw] h-[50vw] max-w-[900px] max-h-[600px] bg-indigo-500/20 dark:bg-indigo-500/25 rounded-[50%_50%_70%_30%] blur-[140px] mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Blob 4 - Toque de luz suave para más dinamismo */}
      <motion.div
        animate={{
          x: ["40vw", "-40vw", "10vw", "40vw"],
          y: ["-20vh", "50vh", "-10vh", "-20vh"],
          scale: [1.2, 0.7, 1.4, 1.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-pink-400/20 dark:bg-pink-400/25 rounded-[30%_70%_50%_50%] blur-[100px] mix-blend-multiply dark:mix-blend-screen"
      />
    </div>
  )
}
