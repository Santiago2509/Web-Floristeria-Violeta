import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getProductById, getProducts, getSavedOccasions } from '@/lib/db'
import { getCategories } from '@/lib/catalog'
import { ProductForm } from '@/components/admin/ProductForm'

export const dynamic = 'force-dynamic'

export default async function AdminEditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, products, savedOccasions] = await Promise.all([getProductById(id), getProducts(), getSavedOccasions()])
  if (!product) notFound()

  return (
    <div className="font-inter max-w-xl">
      <Link href="/admin/catalogo" className="inline-flex items-center gap-2 text-sm text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] mb-6">
        <ArrowLeft className="w-4 h-4" />
        Volver al catálogo
      </Link>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="font-playfair text-3xl text-[var(--theme-text)]">Editar producto</h1>
        <Link href={`/catalogo/${product.id}`} target="_blank" className="inline-flex items-center gap-1.5 text-sm text-[var(--theme-primary)]">
          Ver en la web
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
      <div className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] p-6 rounded-2xl shadow-sm">
        <ProductForm categories={getCategories(products)} savedOccasions={savedOccasions} product={product} />
      </div>
    </div>
  )
}
