import { jost } from '@/app/fonts/jost'

export const metadata = {
  title: 'Propuestas de inicio',
  robots: { index: false, follow: false },
}

export default function PropuestasLayout({ children }: { children: React.ReactNode }) {
  return <div className={jost.variable}>{children}</div>
}
