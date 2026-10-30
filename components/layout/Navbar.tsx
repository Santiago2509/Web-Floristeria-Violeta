'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { siteConfig } from '@/lib/site-config'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Cerrar menú al hacer scroll para mejor UX
  useEffect(() => {
    const handleScroll = () => setIsOpen(false)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Catálogo', href: '/catalogo' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Galería', href: '/galeria' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' },
  ]

  return (
    <header className="px-6 py-4 border-b border-white/25 dark:border-white/5 flex justify-between items-center bg-white/15 dark:bg-black/10 backdrop-blur-xl fixed w-full top-0 left-0 z-50 transition-colors duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
      <div className="flex items-center w-24">
        <Link href="/" className="font-playfair text-2xl font-semibold text-[#3B0764] dark:text-white hover:opacity-80 transition-opacity">
          Violeta
        </Link>
      </div>
      {/* Enlaces a los módulos (Versión Escritorio) */}
      <nav className="hidden md:flex flex-1 justify-center items-center gap-6 font-inter text-sm font-medium">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="text-[#3B0764] dark:text-white hover:text-[var(--theme-primary)] dark:hover:opacity-70 transition-colors">
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Botones lado derecho (Redes Sociales, Tema, Menú Hamburguesa) */}
      <div className="flex items-center justify-end gap-3 md:gap-4 z-[70] w-auto">
        <Link href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hidden sm:block text-[#3B0764] dark:text-white hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </Link>
        <Link href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hidden sm:block text-[#3B0764] dark:text-white hover:opacity-70 transition-opacity">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        </Link>
        <ThemeToggle />
        
        {/* Botón Hamburguesa (Solo Móvil) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          className="md:hidden p-2 rounded-full border border-[var(--theme-border)]/30 bg-[var(--theme-bg)]/80 text-[var(--theme-primary)] hover:scale-105 transition-transform"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Menú Desplegable (Versión Móvil) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[var(--theme-bg)]/95 backdrop-blur-xl border-b border-[var(--theme-border)]/30 py-8 px-6 flex flex-col items-center gap-6 shadow-2xl md:hidden z-[40]"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="font-playfair text-xl text-[var(--theme-text)] hover:text-[var(--theme-primary)] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
