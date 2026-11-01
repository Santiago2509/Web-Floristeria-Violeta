import { notFound } from 'next/navigation'
import { Hero1Letrero } from '@/components/propuestas/Hero1Letrero'
import { Hero2Video } from '@/components/propuestas/Hero2Video'
import { Hero3Arco } from '@/components/propuestas/Hero3Arco'
import { Hero4Letras } from '@/components/propuestas/Hero4Letras'
import { Hero5Noche } from '@/components/propuestas/Hero5Noche'
import { HomeSections } from '@/components/propuestas/HomeSections'
import { PROPUESTAS } from '@/components/propuestas/data'
import { ProposalSwitcher } from '@/components/propuestas/shared'

const HEROES = [Hero1Letrero, Hero2Video, Hero3Arco, Hero4Letras, Hero5Noche]

export function generateStaticParams() {
  return PROPUESTAS.map(p => ({ n: String(p.n) }))
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params
  const p = PROPUESTAS[Number(n) - 1]
  return { title: p ? `Propuesta ${p.n}: ${p.name}` : 'Propuesta' }
}

export default async function PropuestaPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params
  const index = Number(n)
  const Hero = HEROES[index - 1]
  if (!Hero) notFound()

  return (
    <div className="flex flex-col relative w-full">
      <Hero />
      <HomeSections />
      <ProposalSwitcher n={index} />
    </div>
  )
}
