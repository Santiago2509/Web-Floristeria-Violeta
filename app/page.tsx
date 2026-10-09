import fs from 'fs'
import path from 'path'
import { Hero } from '@/components/sections/Hero'
import { getFeaturedProducts, getGalleryImages } from '@/lib/db'
import { GlobalAurora } from '@/components/ui/GlobalAurora'
import dynamic from 'next/dynamic'

// Componentes secundarios cargados dinámicamente para mejorar FCP
const FeaturedProducts = dynamic(() => import('@/components/sections/FeaturedProducts').then(mod => mod.FeaturedProducts))
const MotivationalBanner = dynamic(() => import('@/components/sections/MotivationalBanner').then(mod => mod.MotivationalBanner))
const AboutPreview = dynamic(() => import('@/components/sections/AboutPreview').then(mod => mod.AboutPreview))
const ServicesPreview = dynamic(() => import('@/components/sections/ServicesPreview').then(mod => mod.ServicesPreview))
const GalleryPreview = dynamic(() => import('@/components/sections/GalleryPreview').then(mod => mod.GalleryPreview))
const Contact = dynamic(() => import('@/components/sections/Contact').then(mod => mod.Contact))
const ScrollSequenceBg = dynamic(() => import('@/components/video/ScrollSequenceBg').then(mod => mod.ScrollSequenceBg))

export default async function Home() {
  const featured = await getFeaturedProducts()
  const gallery = await getGalleryImages()

  // Leer los fotogramas dinámicamente desde la carpeta
  const framesDir = path.join(
    process.cwd(),
    'public',
    'assets',
    '_MConverter.eu_Vines_growing_on_violet_gradient_20261008190330'
  )
  let frameFiles: string[] = []
  try {
    const files = fs.readdirSync(framesDir)
    frameFiles = files
      .filter(f => f.endsWith('.png'))
      .sort((a, b) => a.localeCompare(b))
      .map(f => `/assets/_MConverter.eu_Vines_growing_on_violet_gradient_20261008190330/${f}`)
  } catch {
    // carpeta no encontrada — continúa sin fondo de fotogramas
  }

  return (
    <div className="flex flex-col relative w-full">
      {/* GlobalAurora — gradiente animado con paleta púrpura/violeta/magenta */}
      <GlobalAurora />

      {/* ── PARTE SUPERIOR: Hero + FeaturedProducts + Banner ── */}
      <Hero featuredProducts={featured} />
      <FeaturedProducts featuredProducts={featured} />
      <MotivationalBanner />

      {/* ── PARTE INFERIOR: Fondo de fotogramas comienza aquí ── */}
      {/*
        El primer frame es visible inmediatamente después del MotivationalBanner.
        AboutPreview tiene z-30 para que el canvas nunca lo tape.
        Las demás secciones van con z-20.
      */}
      <div className="relative w-full">
        {frameFiles.length > 0 && (
          <ScrollSequenceBg frames={frameFiles} />
        )}

        {/* AboutPreview: z-30 — el canvas (z-1) nunca la tapa */}
        <div className="relative z-30">
          <AboutPreview />
        </div>

        {/* Resto de secciones encima del canvas (z-20) */}
        <div className="relative z-20">
          <ServicesPreview />
          <GalleryPreview galleryImages={gallery} />
          <Contact />
        </div>
      </div>

    </div>
  )
}

