import { getProductById, getProducts } from '@/lib/db'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, ShoppingBag } from 'lucide-react'
import { generarLinkWhatsApp } from '@/lib/whatsapp'
import { Product } from '@/types'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ id: string }> }

// cache(): generateMetadata y la página comparten una sola consulta a la BD
const getProduct = cache(getProductById)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) return { title: 'Producto no encontrado' }
  return {
    title: product.title,
    description: product.description,
    openGraph: { images: [{ url: product.imageUrl }] },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  // En Next.js 16 `params` es una Promise (el acceso síncrono devolvía undefined)
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const buyLink = generarLinkWhatsApp(`¡Hola! Me interesa comprar el producto: *${product.title}* que vi en el catálogo.`)

  return (
    <main className="min-h-screen pt-24 md:pt-32 pb-24 bg-[var(--theme-bg)]">
      <div className="container mx-auto px-6 lg:px-12">
        <Link 
          href="/catalogo"
          className="inline-flex items-center text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al catálogo
        </Link>

        <div className="bg-[var(--theme-bg-card)] rounded-3xl overflow-hidden border border-[var(--theme-border)] shadow-2xl flex flex-col md:flex-row">
          
          {/* Imagen del producto */}
          <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[600px]">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Detalles del producto */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <span className="inline-block px-4 py-1 text-xs md:text-sm font-inter uppercase tracking-widest bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-full mb-6 w-max border border-[var(--theme-primary)]/20">
              {product.category}
            </span>
            
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[var(--theme-text)] mb-6 leading-[1.1]">
              {product.title}
            </h1>
            
            <p className="font-inter text-2xl md:text-3xl font-medium text-[var(--theme-text)] mb-8">
              ${product.price.toLocaleString('es-CO')}
            </p>
            
            <div className="w-16 h-[1px] bg-[var(--theme-primary)]/30 mb-8" />
            
            <p className="font-inter text-[var(--theme-text-muted)] text-base md:text-lg leading-relaxed mb-12">
              {product.description}
            </p>
            
            <a 
              href={buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full md:w-auto px-8 py-4 bg-[#25D366] text-white rounded-[2px] font-inter font-medium tracking-wide shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              Comprar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
