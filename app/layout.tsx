import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { BackgroundBlobs } from '@/components/ui/BackgroundBlobs'
import { SplashScreen } from '@/components/ui/SplashScreen'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Floristería Violeta',
  description: 'Las mejores flores para cada ocasión',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body 
        className="antialiased transition-colors duration-300 font-inter"
        style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}
      >
        <ThemeProvider>
          {/* Capa de Ruido Visual (Film Grain) */}
          <div 
            className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035] dark:opacity-[0.025]"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}
          />
          <SplashScreen />
          <BackgroundBlobs />
          <Navbar />
          <main className="min-h-screen relative z-10">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
