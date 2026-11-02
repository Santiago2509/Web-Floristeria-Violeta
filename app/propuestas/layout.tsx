import localFont from 'next/font/local'

// Tipografía geométrica similar a la del letrero de referencia (estilo Futura).
// Archivos estáticos (no variables): sin trazos superpuestos al dibujar el contorno de las letras.
const jost = localFont({
  src: [
    { path: './fonts/jost-latin-300-normal.woff2', weight: '300' },
    { path: './fonts/jost-latin-400-normal.woff2', weight: '400' },
    { path: './fonts/jost-latin-500-normal.woff2', weight: '500' },
    { path: './fonts/jost-latin-600-normal.woff2', weight: '600' },
  ],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata = {
  title: 'Propuestas de inicio',
  robots: { index: false, follow: false },
}

export default function PropuestasLayout({ children }: { children: React.ReactNode }) {
  return <div className={jost.variable}>{children}</div>
}
