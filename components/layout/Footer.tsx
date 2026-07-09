import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full py-8 border-t border-[var(--theme-border)]/20 bg-[var(--theme-bg-section)] relative z-20">
      <div className="container mx-auto px-6 text-center text-[var(--theme-text-muted)]">
        <p className="font-playfair text-2xl mb-4 text-[var(--theme-primary)] uppercase tracking-widest">Violeta</p>
        <p className="text-sm font-inter">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
        <div className="flex justify-center gap-6 mt-6 text-sm font-inter">
          <Link href="/terminos" className="hover:text-[var(--theme-primary)] transition-colors">Términos y Condiciones</Link>
          <Link href="/privacidad" className="hover:text-[var(--theme-primary)] transition-colors">Política de Privacidad</Link>
        </div>
      </div>
    </footer>
  )
}
