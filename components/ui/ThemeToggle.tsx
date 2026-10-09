'use client'
import { useTheme } from './ThemeProvider'
import { SunIcon, MoonIcon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-white/20 
                 bg-transparent shadow-sm text-white mix-blend-difference
                 hover:scale-110 hover:border-white/50 
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
