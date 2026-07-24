import { AboutHero } from '@/components/sections/AboutHero'
import { AboutStory } from '@/components/sections/AboutStory'
import { AboutValues } from '@/components/sections/AboutValues'
import { Contact } from '@/components/sections/Contact'

export const metadata = {
  title: 'Nosotros | Floristería Violeta',
  description: 'Conoce la historia y la pasión detrás de Floristería Violeta.',
}

export default function NosotrosPage() {
  return (
    <main className="min-h-screen flex flex-col pt-16 md:pt-20">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <Contact />
    </main>
  )
}
