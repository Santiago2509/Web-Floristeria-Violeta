import { siteConfig } from './site-config'

export function generarLinkWhatsApp(mensajeBase?: string): string {
  const mensaje = mensajeBase || 'Hola Floristería Violeta, me gustaría hacer un pedido.'
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(mensaje)}`
}
