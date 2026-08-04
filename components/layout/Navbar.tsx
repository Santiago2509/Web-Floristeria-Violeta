'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Instagram } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Cerrar menú al hacer scroll para mejor UX
  useEffect(() => {
    const handleScroll = () => setIsOpen(false)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Catálogo', href: '/catalogo' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Galería', href: '/galeria' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' },
  ]

  return (
    <header className="px-6 py-4 border-b border-[var(--theme-border)]/20 flex justify-between items-center bg-[var(--theme-bg)]/80 backdrop-blur-lg fixed w-full top-0 left-0 z-50">
      <div className="flex items-center w-24">
        <Link href="/" className="font-playfair text-2xl font-semibold text-[var(--theme-primary)] hover:opacity-80 transition-opacity">
          Violeta
        </Link>
      </div>
      {/* Enlaces a los módulos (Versión Escritorio) */}
      <nav className="hidden md:flex flex-1 justify-center items-center gap-6 font-inter text-sm font-medium text-[var(--theme-text)]">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="hover:text-[var(--theme-primary)] transition-colors">
            {link.name}
          </Link>
        ))}
        
        <span className="text-[var(--theme-text-muted)]/30">|</span>
        
        <Link href="/admin" className="hover:text-[var(--theme-primary)] transition-colors text-[var(--theme-text-muted)]">
          Admin
        </Link>
      </nav>

      {/* Botón Hamburguesa (Versión Móvil) */}
      <div className="md:hidden flex justify-center absolute left-1/2 -translate-x-1/2 z-[70]">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full bg-[var(--theme-bg)] backdrop-blur-md border border-[var(--theme-border)]/50 text-[var(--theme-primary)] shadow-lg active:scale-95 transition-transform"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex items-center justify-end gap-4 z-[60] w-24 md:w-auto">
        <Link href="https://www.instagram.com/floristeriavioleta28/" target="_blank" rel="noopener noreferrer" className="hidden sm:block text-[var(--theme-text)] hover:text-[#E1306C] transition-colors">
          <Instagram className="w-5 h-5" />
        </Link>
        <Link href="https://www.tiktok.com/@floristeriavioleta28?_r=1&_t=ZS-98bimC6MqGq" target="_blank" rel="noopener noreferrer" className="hidden sm:block text-[var(--theme-text)] hover:text-[#ff0050] transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        </Link>
        <ThemeToggle />
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
            <div className="w-12 h-[1px] bg-[var(--theme-primary)]/20" />
            <Link 
              href="/admin" 
              onClick={() => setIsOpen(false)}
              className="font-inter text-sm tracking-widest uppercase text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors"
            >
              Admin
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
