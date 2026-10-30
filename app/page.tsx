import { Hero } from '@/components/sections/Hero'
import { getFeaturedProducts, getGalleryImages } from '@/lib/db'
import { FloralVines } from '@/components/ui/FloralVines'
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
const PreservedRoses = dynamic(() => import('@/components/sections/PreservedRoses').then(mod => mod.PreservedRoses))
const ServicesPreview = dynamic(() => import('@/components/sections/ServicesPreview').then(mod => mod.ServicesPreview))
const GalleryPreview = dynamic(() => import('@/components/sections/GalleryPreview').then(mod => mod.GalleryPreview))
const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => mod.Contact))

export default async function Home() {
  const [featured, gallery] = await Promise.all([getFeaturedProducts(), getGalleryImages()])
  const { showcase, about } = splitGallery(gallery)

  return (
    <div className="flex flex-col relative w-full">
      <Hero />

      {/* Desde aquí hasta el final, las enredaderas florales crecen por los márgenes con el scroll */}
      <div className="relative w-full">
        <FloralVines />

        <div className="relative z-10">
          {/* Las secciones con contenido de la BD solo se muestran si hay datos */}
          {featured.length > 0 && <FeaturedProducts featuredProducts={featured} />}
          <PreservedRoses />
          <AboutPreview photos={about} />
          <MotivationalBanner />
          <ServicesPreview />
          {showcase.length > 0 && <GalleryPreview galleryImages={showcase} />}
          <Contact />
        </div>
      </div>
    </div>
  )
}
