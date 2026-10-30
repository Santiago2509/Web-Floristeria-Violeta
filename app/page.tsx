import { Hero } from '@/components/sections/Hero'
import { getFeaturedProducts, getGalleryImages } from '@/lib/db'
import { ScrollVineAnimation } from '@/components/ui/ScrollVineAnimation'
import dynamic from 'next/dynamic'
import type { GalleryImage } from '@/types'

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => 0.5 - Math.random())
}

// Reparte la galería entre "Nuestra Historia" (collage) y "Nuestros Trabajos" (carrusel)
// para no repetir las mismas fotos cuando hay suficientes.
const SHOWCASE_COUNT = 10
function splitGallery(gallery: GalleryImage[]) {
  const shuffled = shuffle(gallery)
  const showcase = shuffled.slice(0, SHOWCASE_COUNT)
  const rest = shuffled.slice(SHOWCASE_COUNT)
  // El collage necesita al menos 3 fotos; si no sobran, reutiliza las del carrusel
  const about = (rest.length >= 3 ? rest : [...shuffled].reverse()).map(img => img.imageUrl)
  return { showcase, about }
}

// Componentes secundarios cargados dinámicamente para mejorar FCP
const FeaturedProducts = dynamic(() => import('@/components/sections/FeaturedProducts').then(mod => mod.FeaturedProducts))
const MotivationalBanner = dynamic(() => import('@/components/sections/MotivationalBanner').then(mod => mod.MotivationalBanner))
const AboutPreview = dynamic(() => import('@/components/sections/AboutPreview').then(mod => mod.AboutPreview))
const ServicesPreview = dynamic(() => import('@/components/sections/ServicesPreview').then(mod => mod.ServicesPreview))
const GalleryPreview = dynamic(() => import('@/components/sections/GalleryPreview').then(mod => mod.GalleryPreview))
const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => mod.Contact))

export default async function Home() {
  const [featured, gallery] = await Promise.all([getFeaturedProducts(), getGalleryImages()])
  const { showcase, about } = splitGallery(gallery)

  return (
    <div className="flex flex-col relative w-full">

      {/* ── PARTE SUPERIOR: Hero + FeaturedProducts + Banner ── */}
      <Hero />
      {/* Las secciones con contenido de la BD solo se muestran si hay datos */}
      {featured.length > 0 && <FeaturedProducts featuredProducts={featured} />}
      <MotivationalBanner />

      {/* ── PARTE INFERIOR: la enredadera animada se dibuja detrás de estas secciones ── */}
      <div className="relative w-full">
        <ScrollVineAnimation />

        <div className="relative z-30">
          <AboutPreview photos={about} />
        </div>

        {/* Resto de secciones encima del canvas (z-20) */}
        <div className="relative z-20">
          <ServicesPreview />
          {showcase.length > 0 && <GalleryPreview galleryImages={showcase} />}
          <Contact />
        </div>
      </div>

    </div>
  )
}

