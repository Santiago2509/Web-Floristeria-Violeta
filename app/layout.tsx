import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { SplashScreen } from '@/components/ui/SplashScreen'
import { SmoothScroll } from '@/components/ui/SmoothScroll'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://web-floristeria-violeta.vercel.app'),
  title: {
    default: 'Floristería Violeta',
    template: '%s | Floristería Violeta',
  },
  description: 'Las mejores flores para cada ocasión. Ramos, cajas y arreglos florales exclusivos en Colombia.',
  keywords: ['floristeria', 'flores', 'arreglos florales', 'rosas', 'cajas de rosas', 'regalos', 'Cali', 'Colombia'],
  authors: [{ name: 'Floristería Violeta' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Floristería Violeta',
    description: 'Explora nuestra colección exclusiva de ramos y arreglos florales.',
    url: 'https://web-floristeria-violeta.vercel.app',
    siteName: 'Floristería Violeta',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Floristería Violeta',
    description: 'Las mejores flores para cada ocasión.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${playfair.variable} antialiased transition-colors duration-300 font-inter overflow-x-hidden relative`}
        style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}
      >
        <ThemeProvider>
          <SmoothScroll>
            <SplashScreen />
            <Navbar />
            <main className="min-h-screen relative z-10">{children}</main>
            <Footer />
            <WhatsAppButton />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
