import { LoginForm } from './LoginForm'

export const metadata = {
  title: 'Acceso administrador',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-[72px] bg-[var(--theme-bg)]">
      <div className="w-full max-w-sm bg-[var(--theme-bg-card)] border border-[var(--theme-border)] p-8 rounded-2xl shadow-sm">
        <h1 className="font-playfair text-2xl text-[var(--theme-text)] mb-1">Panel de Administrador</h1>
        <p className="font-inter text-sm text-[var(--theme-text-muted)] mb-6">Ingresa la contraseña para continuar.</p>
        <LoginForm />
      </div>
    </div>
  )
}
