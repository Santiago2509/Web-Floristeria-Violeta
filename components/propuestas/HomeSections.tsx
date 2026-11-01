import dynamic from 'next/dynamic'
import { getFeaturedProducts, getGalleryImages } from '@/lib/db'
import { FloralVines } from '@/components/ui/FloralVines'

// Mismo contenido del Inicio bajo cada propuesta de portada (para verla en contexto)
const FeaturedProducts = dynamic(() => import('@/components/sections/FeaturedProducts').then(m => m.FeaturedProducts))
const PreservedRoses = dynamic(() => import('@/components/sections/PreservedRoses').then(m => m.PreservedRoses))
const AboutPreview = dynamic(() => import('@/components/sections/AboutPreview').then(m => m.AboutPreview))
const MotivationalBanner = dynamic(() => import('@/components/sections/MotivationalBanner').then(m => m.MotivationalBanner))
const ServicesPreview = dynamic(() => import('@/components/sections/ServicesPreview').then(m => m.ServicesPreview))
const GalleryPreview = dynamic(() => import('@/components/sections/GalleryPreview').then(m => m.GalleryPreview))
const Contact = dynamic(() => import('@/components/sections/Contact').then(m => m.Contact))

export async function HomeSections() {
  const [featured, gallery] = await Promise.all([getFeaturedProducts(), getGalleryImages()])
  const showcase = gallery.slice(0, 10)
  const about = (gallery.length > 12 ? gallery.slice(10) : gallery).map(g => g.imageUrl)
  return (
    <div className="relative w-full">
      <FloralVines />
      <div className="relative z-10">
        {featured.length > 0 && <FeaturedProducts featuredProducts={featured} />}
        <PreservedRoses />
        <AboutPreview photos={about} />
        <MotivationalBanner />
        <ServicesPreview />
        {showcase.length > 0 && <GalleryPreview galleryImages={showcase} />}
        <Contact />
      </div>
    </div>
  )
}
