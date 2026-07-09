'use client'
import { useTheme } from './ThemeProvider'
import { SunIcon, MoonIcon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-border 
                 bg-bg-card text-text hover:border-primary 
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
