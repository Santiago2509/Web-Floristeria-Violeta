import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { generarLinkWhatsApp } from '@/lib/whatsapp'

const navLinks = [
  { name: 'Catálogo', href: '/catalogo' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Galería', href: '/galeria' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
]

const headingClass = 'font-inter text-xs uppercase tracking-[0.25em] text-[var(--theme-primary)] font-semibold mb-5'
const linkClass = 'hover:text-[var(--theme-primary)] transition-colors'

export function Footer() {
  return (
    <footer className="w-full pt-16 pb-8 border-t border-[var(--theme-border)]/40 bg-[var(--theme-bg-section)] relative z-20">
      <div className="container mx-auto font-inter text-sm text-[var(--theme-text-muted)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Marca */}
          <div>
            <p className="font-playfair text-2xl mb-4 text-[var(--theme-primary)] uppercase tracking-widest">Violeta</p>
            <p className="leading-relaxed max-w-xs">
              Ramos, cajas y arreglos florales hechos a mano en el corazón de Cali.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] hover:bg-[var(--theme-plum)] hover:text-[var(--theme-on-plum)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-2.5 rounded-full bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] hover:bg-[var(--theme-plum)] hover:text-[var(--theme-on-plum)] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a href={generarLinkWhatsApp()} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full bg-[var(--theme-plum)] text-[var(--theme-on-plum)] text-xs font-medium hover:opacity-90 transition-opacity">
                Pedir por WhatsApp
              </a>
            </div>
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página">
            <p className={headingClass}>Explora</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <p className={headingClass}>Contacto</p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[var(--theme-primary)]" aria-hidden="true" />
                <span>{siteConfig.address.street}<br />{siteConfig.address.city}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[var(--theme-primary)]" aria-hidden="true" />
                <a href={siteConfig.phoneHref} className={linkClass}>{siteConfig.phoneDisplay}</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[var(--theme-primary)]" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className={`${linkClass} break-all`}>{siteConfig.email}</a>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div>
            <p className={headingClass}>Horario</p>
            <ul className="space-y-3">
              {siteConfig.hours.map((h) => (
                <li key={h.days} className="flex gap-3">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0 text-[var(--theme-primary)]" aria-hidden="true" />
                  <span><span className="text-[var(--theme-text)]">{h.days}</span><br />{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[var(--theme-border)]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/terminos" className={linkClass}>Términos y Condiciones</Link>
            <Link href="/privacidad" className={linkClass}>Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
