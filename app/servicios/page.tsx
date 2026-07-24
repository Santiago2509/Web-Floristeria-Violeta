import { ServicesHero } from '@/components/sections/ServicesHero'
import { Services } from '@/components/sections/Services'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { Contact } from '@/components/sections/Contact'

export const metadata = {
  title: 'Servicios | Floristería Violeta',
  description: 'Descubre nuestros servicios de Domicilios Express, Decoración de Eventos y Regalos Personalizados.',
}

export default function ServiciosPage() {
  return (
    <main className="min-h-screen flex flex-col pt-16 md:pt-20">
      <ServicesHero />
      <Services />
      <ProcessSection />
      <Contact />
    </main>
  )
}
