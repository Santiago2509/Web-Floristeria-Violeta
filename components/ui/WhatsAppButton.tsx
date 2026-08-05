'use client'
import { motion } from 'framer-motion'
import { generarLinkWhatsApp } from '@/lib/whatsapp'

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
      <motion.a
        href={generarLinkWhatsApp()}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all duration-300 group"
        aria-label="Contactar por WhatsApp"
      >
        {/* Icono WhatsApp simple y limpio */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="relative z-10"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>

        {/* Tooltip elegante - Solo Desktop */}
        <div className="absolute right-16 px-4 py-2 bg-white dark:bg-[#1a1a1a] text-[var(--theme-text)] text-sm font-inter rounded-xl shadow-lg border border-[var(--theme-border)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
          Chatea con nosotros
        </div>
      </motion.a>
    </div>
  )
}
