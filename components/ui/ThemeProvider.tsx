'use client'
import { createContext, useContext, useEffect, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({ theme: 'light', toggleTheme: () => {} })

// Pequeño store externo: la preferencia vive en localStorage y en el sistema operativo
const listeners = new Set<() => void>()

function getTheme(): Theme {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', callback)
  return () => {
    listeners.delete(callback)
    mq.removeEventListener('change', callback)
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // En el servidor (y durante la hidratación) el tema es 'light' para evitar desajustes
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'light' as Theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
    listeners.forEach((listener) => listener())
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
