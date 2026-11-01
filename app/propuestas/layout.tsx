import { Jost } from 'next/font/google'

// Tipografía geométrica similar a la del letrero de referencia (estilo Futura)
const jost = Jost({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-jost', display: 'swap' })

export const metadata = {
  title: 'Propuestas de inicio',
  robots: { index: false, follow: false },
}

export default function PropuestasLayout({ children }: { children: React.ReactNode }) {
  return <div className={jost.variable}>{children}</div>
}
