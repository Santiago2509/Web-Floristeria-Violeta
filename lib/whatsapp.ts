export function generarLinkWhatsApp(mensajeBase?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573215079305'
  const mensaje = mensajeBase || 'Hola Floristería Violeta, me gustaría hacer un pedido.'
  return `https://wa.me/${number}?text=${encodeURIComponent(mensaje)}`
}
