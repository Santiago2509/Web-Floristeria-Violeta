import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LayoutDashboard, Image as ImageIcon, ShoppingBag, LogOut, Home } from 'lucide-react'
import { isAdmin } from '@/lib/auth'
import { adminLogout } from '@/lib/auth-actions'

export const metadata = {
  title: 'Panel de Administrador',
  robots: { index: false, follow: false },
}

const links = [
  { href: '/admin', label: 'Resumen', icon: LayoutDashboard },
  { href: '/admin/catalogo', label: 'Catálogo', icon: ShoppingBag },
  { href: '/admin/galeria', label: 'Galería', icon: ImageIcon },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] flex pt-[72px]">
      {/* Sidebar Fijo (escritorio) */}
      <aside className="w-64 bg-[var(--theme-bg-card)] border-r border-[var(--theme-border)] fixed h-[calc(100vh-72px)] flex-col hidden md:flex z-40">
        <div className="p-6">
          <h2 className="font-playfair text-xl text-[var(--theme-text)] font-semibold">Admin Panel</h2>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 font-inter text-sm">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--theme-primary)]/10 text-[var(--theme-text)] hover:text-[var(--theme-primary)] transition-colors">
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--theme-border)] space-y-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--theme-text)] hover:bg-[var(--theme-primary)]/10 transition-colors font-inter text-sm">
            <Home className="w-5 h-5" />
            Ver el sitio
          </Link>
          <form action={adminLogout}>
            <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-inter text-sm">
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content (con padding left para el sidebar en desktop) */}
      <main className="flex-1 md:ml-64 p-6 lg:p-10">
        {/* Navegación compacta (móvil) */}
        <nav className="md:hidden flex flex-wrap items-center gap-2 mb-6 font-inter text-sm">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="px-3 py-2 rounded-full border border-[var(--theme-border)] text-[var(--theme-text)]">
              {label}
            </Link>
          ))}
          <form action={adminLogout} className="ml-auto">
            <button type="submit" className="px-3 py-2 rounded-full text-red-500">Salir</button>
          </form>
        </nav>
        {children}
      </main>
    </div>
  )
}
