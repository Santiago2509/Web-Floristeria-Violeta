import { ServicesHero } from '@/components/sections/ServicesHero'
import { Services } from '@/components/sections/Services'
import { ProcessSection } from '@/components/sections/ProcessSection'

export const metadata = {
  title: 'Servicios | Floristería Violeta',
  description: 'Descubre nuestros servicios de Domicilios Express, Decoración de Eventos y Regalos Personalizados.',
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
