import Link from 'next/link'
import { LayoutDashboard, Image as ImageIcon, ShoppingBag, LogOut } from 'lucide-react'

export const metadata = {
  title: 'Panel de Administrador | Violeta',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--theme-bg)] flex pt-[72px]">
      {/* Sidebar Fijo */}
      <aside className="w-64 bg-[var(--theme-bg-card)] border-r border-[var(--theme-border)] fixed h-[calc(100vh-72px)] flex flex-col hidden md:flex z-40">
        <div className="p-6">
          <h2 className="font-playfair text-xl text-[var(--theme-text)] font-semibold">Admin Panel</h2>
          <p className="font-inter text-xs text-[var(--theme-text-muted)]">Modo de Pruebas</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 font-inter text-sm">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--theme-primary)]/10 text-[var(--theme-text)] hover:text-[var(--theme-primary)] transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Resumen
          </Link>
          <Link href="/admin/catalogo" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--theme-primary)]/10 text-[var(--theme-text)] hover:text-[var(--theme-primary)] transition-colors">
            <ShoppingBag className="w-5 h-5" />
            Catálogo
          </Link>
          <Link href="/admin/galeria" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--theme-primary)]/10 text-[var(--theme-text)] hover:text-[var(--theme-primary)] transition-colors">
            <ImageIcon className="w-5 h-5" />
            Galería
          </Link>
        </nav>

        <div className="p-4 border-t border-[var(--theme-border)]">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-inter text-sm">
            <LogOut className="w-5 h-5" />
            Salir al sitio
          </Link>
        </div>
      </aside>

      {/* Main Content (con padding left para el sidebar en desktop) */}
      <main className="flex-1 md:ml-64 p-6 lg:p-10">
        {children}
      </main>
    </div>
  )
}
