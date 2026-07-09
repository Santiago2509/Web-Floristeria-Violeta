'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Ocultar la pantalla después de 2.5 segundos
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--theme-bg)]"
        >
          <motion.svg
            width="150"
            height="150"
            viewBox="0 0 100 100"
            className="text-[var(--theme-primary)] drop-shadow-2xl"
            initial="hidden"
            animate="visible"
          >
            {/* Centro de la flor */}
            <motion.circle
              cx="50"
              cy="50"
              r="8"
              fill="currentColor"
              variants={{
                hidden: { scale: 0 },
                visible: { scale: 1, transition: { duration: 0.5, type: "spring" } }
              }}
            />
            {/* Pétalos (8 pétalos girando alrededor del centro) */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={angle} transform={`rotate(${angle} 50 50)`}>
                <motion.path
                  d="M 50 38 C 30 10, 70 10, 50 38"
                  fill="currentColor"
                  style={{ transformOrigin: "50px 38px" }}
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { 
                      scale: 1, 
                      opacity: 0.8, 
                      transition: { delay: 0.2 + i * 0.1, duration: 0.6, type: "spring" }
                    }
                  }}
                />
              </g>
            ))}
          </motion.svg>
          
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 font-playfair text-3xl tracking-[0.3em] uppercase text-[var(--theme-primary)]"
          >
            Violeta
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
