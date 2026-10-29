import { Hero } from '@/components/sections/Hero'
import { getFeaturedProducts, getGalleryImages } from '@/lib/db'
import { GlobalAurora } from '@/components/ui/GlobalAurora'
import { ScrollVineAnimation } from '@/components/ui/ScrollVineAnimation'
import dynamic from 'next/dynamic'

// Componentes secundarios cargados dinámicamente para mejorar FCP
const FeaturedProducts = dynamic(() => import('@/components/sections/FeaturedProducts').then(mod => mod.FeaturedProducts))
const MotivationalBanner = dynamic(() => import('@/components/sections/MotivationalBanner').then(mod => mod.MotivationalBanner))
const AboutPreview = dynamic(() => import('@/components/sections/AboutPreview').then(mod => mod.AboutPreview))
const ServicesPreview = dynamic(() => import('@/components/sections/ServicesPreview').then(mod => mod.ServicesPreview))
const GalleryPreview = dynamic(() => import('@/components/sections/GalleryPreview').then(mod => mod.GalleryPreview))
const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => mod.Contact))

export default async function Home() {
  const [featured, gallery] = await Promise.all([getFeaturedProducts(), getGalleryImages()])

  return (
    <div className="flex flex-col relative w-full">
      {/* GlobalAurora — gradiente animado con paleta púrpura/violeta/magenta */}
      <GlobalAurora />

      {/* ── PARTE SUPERIOR: Hero + FeaturedProducts + Banner ── */}
      <Hero featuredProducts={featured} />
      {/* Las secciones con contenido de la BD solo se muestran si hay datos */}
      {featured.length > 0 && <FeaturedProducts featuredProducts={featured} />}
      <MotivationalBanner />

      {/* ── PARTE INFERIOR: Fondo de fotogramas comienza aquí ── */}
      {/*
        El primer frame es visible inmediatamente después del MotivationalBanner.
        AboutPreview tiene z-30 para que el canvas nunca lo tape.
        Las demás secciones van con z-20.
      */}
      <div className="relative w-full">
        <ScrollVineAnimation />

        {/* AboutPreview: z-30 — el canvas (z-1) nunca la tapa */}
        <div className="relative z-30">
          <AboutPreview />
        </div>

        {/* Resto de secciones encima del canvas (z-20) */}
        <div className="relative z-20">
          <ServicesPreview />
          {gallery.length > 0 && <GalleryPreview galleryImages={gallery} />}
          <Contact />
        </div>
      </div>

    </div>
  )
}

