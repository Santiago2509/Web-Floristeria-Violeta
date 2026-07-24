import { ContactHero } from '@/components/sections/ContactHero'
import { ContactFormSection } from '@/components/sections/ContactFormSection'
import { ContactMap } from '@/components/sections/ContactMap'
import { Contact as FooterContact } from '@/components/sections/Contact'

export const metadata = {
  title: 'Contacto | Floristería Violeta',
  description: 'Ponte en contacto con nosotros para hacer realidad tus arreglos florales.',
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen flex flex-col pt-16 md:pt-20">
      <ContactHero />
      <ContactFormSection />
      <ContactMap />
      <FooterContact />
    </main>
  )
}
