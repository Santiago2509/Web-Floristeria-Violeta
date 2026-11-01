import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getProducts } from '@/lib/db'
import { getUsedCategories, inCategory } from '@/lib/catalog'
import { PdfBuilder } from '@/components/admin/PdfBuilder'

export const dynamic = 'force-dynamic'

export default async function AdminCatalogPdfPage() {
  const products = await getProducts()
  const categories = getUsedCategories(products).map(name => ({
    name,
    count: products.filter(p => inCategory(p, name)).length,
  }))

  return (
    <div className="font-inter max-w-2xl">
      <Link href="/admin/catalogo" className="inline-flex items-center gap-2 text-sm text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] mb-6">
        <ArrowLeft className="w-4 h-4" />
        Volver al catálogo
      </Link>
      <h1 className="font-playfair text-3xl text-[var(--theme-text)] mb-2">Crear catálogo PDF</h1>
      <p className="text-sm text-[var(--theme-text-muted)] mb-8">
        Elige qué categorías incluir y el título de la portada. El PDF se arma con los productos actuales, ordenado por categorías.
      </p>
      <PdfBuilder categories={categories} />
    </div>
  )
}
