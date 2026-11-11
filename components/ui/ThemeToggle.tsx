'use client'
import { useTheme } from './ThemeProvider'
import { SunIcon, MoonIcon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg)]/80 text-[#3B0764] dark:text-white
                 hover:scale-110 hover:border-[var(--theme-primary)] transition-all duration-300"
      aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
    >
      {theme === 'light'
        ? <MoonIcon size={18} />
        : <SunIcon size={18} />
      }
    </button>
  )
}
