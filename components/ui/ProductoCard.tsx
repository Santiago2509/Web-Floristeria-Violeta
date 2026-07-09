import Image from 'next/image'
import Link from 'next/link'

interface ProductoCardProps {
  id: string;
  nombre: string;
  precio: number;
  imagenUrl: string;
  categoria?: string;
}

export function ProductoCard({ id, nombre, precio, imagenUrl, categoria }: ProductoCardProps) {
  return (
    <Link href={`/catalogo/${id}`} className="group relative flex flex-col rounded-2xl overflow-hidden backdrop-blur-md bg-[var(--theme-bg-card)]/30 border border-[var(--theme-border)]/20 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
      
      {/* Contenedor de la Imagen */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={imagenUrl}
          alt={nombre}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Sombra interna sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Contenido (Nombre y Precio) */}
      <div className="p-6 flex flex-col items-center text-center">
        {categoria && (
          <span className="text-xs font-inter uppercase tracking-widest text-[var(--theme-primary)] mb-3">
            {categoria}
          </span>
        )}
        <h3 className="font-playfair text-2xl text-[var(--theme-text)] mb-3">
          {nombre}
        </h3>
        <p className="font-inter text-lg text-[var(--theme-text-muted)] font-light">
          ${precio.toLocaleString('es-CO')}
        </p>
      </div>
    </Link>
  )
}
