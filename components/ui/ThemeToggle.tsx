'use client'
import { useTheme } from './ThemeProvider'
import { SunIcon, MoonIcon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full border border-[var(--theme-border)]/30 
                 bg-[var(--theme-bg)]/80 backdrop-blur-md shadow-xl text-[var(--theme-text)] 
                 hover:scale-110 hover:border-[var(--theme-primary)] 
                 transition-all duration-300"
      aria-label="Cambiar tema"
    >
      {theme === 'light'
        ? <MoonIcon size={18} />
        : <SunIcon size={18} className="text-primary" />
      }
    </button>
  )
}
