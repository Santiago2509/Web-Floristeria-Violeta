'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
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
      <div className="flex items-center w-10">
        {/* Logo Flotante Gigante (Esquina Izquierda) */}
        <Link href="/" className="absolute -top-10 -left-10 md:-top-14 md:-left-16 lg:-top-16 lg:-left-20 z-[60] transition-transform hover:scale-105">
          <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <Image 
              src="/assets/esquina_de_flores.png" 
              alt="Floristería Violeta Logo" 
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </Link>
        
        {/* Decoración Flotante (Esquina Derecha) */}
        <div className="absolute -top-10 -right-10 md:-top-14 md:-right-16 lg:-top-16 lg:-right-20 z-[60] pointer-events-none scale-x-[-1]">
          <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <Image 
              src="/assets/esquina_de_flores.png" 
              alt="Decoración floral derecha" 
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Enlaces a los módulos (Versión Escritorio) */}
      <nav className="hidden md:flex items-center gap-6 font-inter text-sm font-medium text-[var(--theme-text)]">
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

      <div className="flex justify-end w-10 md:w-10 z-[60]">
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
