import { ServicesHero } from '@/components/sections/ServicesHero'
import { Services } from '@/components/sections/Services'
import { ProcessSection } from '@/components/sections/ProcessSection'

export const metadata = {
  title: 'Servicios',
  description: 'Descubre nuestros servicios de Domicilios Express, Momentos Especiales y Regalos Personalizados.',
}

export default function ServiciosPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <ServicesHero />
      <Services />
      <ProcessSection />
    </main>
  )
}
