import { StorytellingJourney } from '@/components/sections/StorytellingJourney'

export const metadata = {
  title: 'Nosotros | Floristería Violeta',
  description: 'Conoce la historia y la pasión detrás de Floristería Violeta.',
}

export default function NosotrosPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[var(--theme-bg)]">
      <StorytellingJourney />
    </main>
  )
}
