import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PROPUESTAS } from '@/components/propuestas/data'

const PREVIEW_BG = [
  'bg-[linear-gradient(180deg,#F2ECE2,#FBF8F2)]',
  'bg-[url(/assets/hero_poster.webp)] bg-cover bg-center',
  'bg-[radial-gradient(ellipse_at_70%_40%,#3A1560,#1A0B2E)]',
  'bg-black',
  'bg-[radial-gradient(ellipse_at_50%_42%,#4A1D7A,#0E0619)]',
]

export default function PropuestasIndex() {
  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-24 bg-[var(--theme-bg)]">
      <div className="container mx-auto max-w-5xl">
        <p className="font-inter text-[11px] uppercase tracking-[0.35em] text-[var(--theme-primary)] font-semibold mb-3">Para revisar con el cliente</p>
        <h1 className="font-playfair text-4xl md:text-5xl text-[var(--theme-text)] mb-3">Propuestas de inicio</h1>
        <p className="font-inter text-[var(--theme-text-muted)] max-w-2xl mb-10">
          Cinco portadas distintas con las letras doradas retroiluminadas. Cada una muestra el resto del inicio debajo. La página principal no cambia hasta que elijas una.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {PROPUESTAS.map((p, i) => (
            <Link key={p.n} href={`/propuestas/${p.n}`} className="group rounded-3xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-bg-card)] hover:shadow-xl transition-shadow">
              <div className={`relative h-44 flex items-center justify-center ${PREVIEW_BG[i]}`}>
                {i === 1 && <div className="absolute inset-0 bg-black/40" />}
                <span className="relative gold-text gold-glow text-5xl tracking-[0.08em]" style={{ fontFamily: 'var(--font-jost), sans-serif' }}>VIOLETA</span>
              </div>
              <div className="p-5 flex items-start gap-4">
                <span className="font-playfair italic text-3xl text-[var(--theme-primary)] leading-none">{p.n}</span>
                <div className="flex-1">
                  <h2 className="font-playfair text-xl text-[var(--theme-text)] mb-1">{p.name}</h2>
                  <p className="font-inter text-sm text-[var(--theme-text-muted)] leading-relaxed">{p.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--theme-primary)] mt-1 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
