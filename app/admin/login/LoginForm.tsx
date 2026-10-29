'use client'

import { useActionState } from 'react'
import { adminLogin, type LoginState } from '@/lib/auth-actions'

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(adminLogin, {})

  return (
    <form action={formAction} className="space-y-4 font-inter">
      <div className="space-y-1">
        <label htmlFor="password" className="text-xs text-[var(--theme-text-muted)] font-medium">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full px-4 py-2 rounded-xl bg-[var(--theme-bg)] border border-[var(--theme-border)] text-[var(--theme-text)] focus:outline-none focus:border-[var(--theme-primary)]"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-500">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-xl bg-[var(--theme-primary)] text-white font-medium hover:bg-[var(--theme-primary-dark)] transition-colors shadow-md disabled:opacity-60"
      >
        {isPending ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  )
}
