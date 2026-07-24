import { Hero } from '@/components/sections/Hero'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { MotivationalBanner } from '@/components/sections/MotivationalBanner'
import { AboutPreview } from '@/components/sections/AboutPreview'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProducts />
      <MotivationalBanner />
      <AboutPreview />
      <ServicesPreview />
      <GalleryPreview />
      <Contact />
    </div>
  );
}
