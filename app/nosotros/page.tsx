import { StorytellingJourney } from '@/components/sections/StorytellingJourney'
import { getGalleryImages } from '@/lib/db'

export const metadata = {
  title: 'Nosotros',
  description: 'Conoce la historia y la pasión detrás de Floristería Violeta.',
}

export default async function NosotrosPage() {
  // Las fotos más recientes de la galería van al collage de la portada
  const photos = (await getGalleryImages()).slice(0, 6).map(g => ({ src: g.imageUrl, caption: g.title }))

  return (
    <main className="min-h-screen flex flex-col bg-[var(--theme-bg)]">
      <StorytellingJourney photos={photos} />
    </main>
  )
}
