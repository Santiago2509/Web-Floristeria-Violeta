// ============================================================================
// DATOS DEL NEGOCIO — fuente única para toda la web.
// Cambia aquí y se actualiza en Inicio, Contacto, Footer, etc.
// ============================================================================

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573215079305'

export const siteConfig = {
  name: 'Floristería Violeta',
  url: 'https://web-floristeria-violeta.vercel.app',
  whatsappNumber,
  phoneDisplay: '+57 321 507 9305',
  phoneHref: `tel:+${whatsappNumber}`,
  email: 'hola@floristeriavioleta.com',
  address: {
    street: 'Cra. 5 # 10-38, Centro Histórico',
    city: 'Cali, Valle del Cauca, Colombia',
  },
  hours: [
    { days: 'Lunes - Sábado', time: '8:00 AM - 7:00 PM' },
    { days: 'Domingos', time: '9:00 AM - 2:00 PM' },
  ],
  social: {
    instagram: 'https://www.instagram.com/floristeriavioleta28/',
    tiktok: 'https://www.tiktok.com/@floristeriavioleta28',
  },
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.5802111535496!2d-76.533221!3d3.451632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6639b70b4a9%3A0xc3b832b84cf21d2!2sCentro%2C%20Cali%2C%20Valle%20del%20Cauca!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco',
} as const
