import { Hero } from '@/components/sections/Hero'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { MotivationalBanner } from '@/components/sections/MotivationalBanner'
import { AboutPreview } from '@/components/sections/AboutPreview'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { Contact } from '@/components/sections/Contact'
import { getFeaturedProducts, getGalleryImages } from '@/lib/db'

import { GlobalAurora } from '@/components/ui/GlobalAurora'

export default async function Home() {
  const featured = await getFeaturedProducts()
  const gallery = await getGalleryImages()

  return (
    <div className="flex flex-col relative">
      <GlobalAurora />
      <Hero featuredProducts={featured} />
      <FeaturedProducts featuredProducts={featured} />
      <MotivationalBanner />
      <AboutPreview />
      <ServicesPreview />
      <GalleryPreview galleryImages={gallery} />
      <Contact />
    </div>
  );
}
