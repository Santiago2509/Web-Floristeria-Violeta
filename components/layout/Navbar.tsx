import Link from 'next/link'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Navbar() {
  return (
    <header className="px-6 py-4 border-b border-[var(--theme-border)]/20 flex justify-between items-center bg-[var(--theme-bg)]/60 backdrop-blur-md fixed w-full top-0 left-0 z-50">
      <div className="font-bold text-[var(--theme-primary)] text-2xl font-playfair tracking-widest uppercase">
        <Link href="/">Violeta</Link>
      </div>
      
      {/* Enlaces a los módulos */}
      <nav className="hidden md:flex items-center gap-6 font-inter text-sm font-medium text-[var(--theme-text)]">
        <Link href="/catalogo" className="hover:text-[var(--theme-primary)] transition-colors">Catálogo</Link>
        <Link href="/servicios" className="hover:text-[var(--theme-primary)] transition-colors">Servicios</Link>
        <Link href="/galeria" className="hover:text-[var(--theme-primary)] transition-colors">Galería</Link>
        <Link href="/nosotros" className="hover:text-[var(--theme-primary)] transition-colors">Nosotros</Link>
        <Link href="/contacto" className="hover:text-[var(--theme-primary)] transition-colors">Contacto</Link>
        
        {/* Separador */}
        <span className="text-[var(--theme-text-muted)]/30">|</span>
        
        <Link href="/admin" className="hover:text-[var(--theme-primary)] transition-colors text-[var(--theme-text-muted)]">
          Admin
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  )
}
