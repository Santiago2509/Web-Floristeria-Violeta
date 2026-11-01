import { renderToBuffer } from '@react-pdf/renderer'
import QRCode from 'qrcode'
import { getProducts } from '@/lib/db'
import { siteConfig } from '@/lib/site-config'
import { planCatalog } from '@/lib/pdf/plan'
import { loadImages } from '@/lib/pdf/images'
import { CatalogDocument } from '@/lib/pdf/CatalogDocument'

// GET /catalogo/pdf?categorias=Ramos,Cajas&titulo=Amor y Amistad&subtitulo=Septiembre 2026[&descargar=1]
// Sin categorías: incluye todas las que tengan productos. El PDF se arma con los productos actuales.

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const MAX_TEXT = 60

export async function GET(request: Request) {
  const url = new URL(request.url)
  const selected = (url.searchParams.get('categorias') ?? '').split(',').map(c => c.trim()).filter(Boolean)
  const title = (url.searchParams.get('titulo') ?? '').trim().slice(0, MAX_TEXT) || 'Catálogo'
  const subtitle = (url.searchParams.get('subtitulo') ?? '').trim().slice(0, MAX_TEXT) || `Colección ${new Date().getFullYear()}`

  const plan = planCatalog(await getProducts(), selected)
  if (plan.pages.length === 0) {
    return new Response('No hay productos en las categorías elegidas.', { status: 404 })
  }

  const imageUrls = plan.sections.flatMap(s => s.products.map(p => p.imageUrl))
  const [images, qr] = await Promise.all([
    loadImages(imageUrls, url.origin),
    QRCode.toDataURL(`${siteConfig.url}/catalogo`, { margin: 0, width: 360, color: { dark: '#3B0764', light: '#FFFFFF' } }),
  ])

  const pdf = await renderToBuffer(<CatalogDocument plan={plan} images={images} title={title} subtitle={subtitle} qr={qr} />)

  const slug = title.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'Catalogo'
  const disposition = url.searchParams.has('descargar') ? 'attachment' : 'inline'

  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `${disposition}; filename="Violeta-${slug}.pdf"`,
      'Cache-Control': 'no-store',
    },
  })
}
