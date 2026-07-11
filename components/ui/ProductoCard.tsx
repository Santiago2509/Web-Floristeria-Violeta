'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { generarLinkWhatsApp } from '@/lib/whatsapp'

interface ProductoCardProps {
  id: string;
  nombre: string;
  precio: number;
  mostrar_precio?: boolean;
  imagenUrl: string;
  categoria?: string;
  index?: number;
}

export function ProductoCard({ id, nombre, precio, mostrar_precio = true, imagenUrl, categoria, index = 0 }: ProductoCardProps) {
  const whatsappUrl = generarLinkWhatsApp(`¡Hola! Me encantó el arreglo floral "${nombre}" que vi en su catálogo y me gustaría pedir más información.`)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="mb-6 break-inside-avoid"
    >
      <div className="group relative flex flex-col rounded-2xl overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-black/40 border border-white/60 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 h-full">
      
      {/* Link invisible que cubre toda la tarjeta para navegar al detalle */}
      <Link href={`/catalogo/${id}`} className="absolute inset-0 z-10">
        <span className="sr-only">Ver detalle de {nombre}</span>
      </Link>

      {/* Contenedor de la Imagen */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: id === '2' ? '1/1' : '4/5' }}>
        <Image
          src={imagenUrl}
          alt={nombre}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Sombra interna sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Botón Flotante WhatsApp en Hover (z-20 para estar por encima del link) */}
        <div className="absolute bottom-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
          <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} 
            className="flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
          </a>
        </div>
      </div>
      
      {/* Contenido (Nombre y Precio) */}
      <div className="p-3 md:p-6 flex flex-col items-center text-center relative z-0">
        {categoria && (
          <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 text-[8px] md:text-[10px] font-inter uppercase tracking-widest bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] rounded-full mb-2 md:mb-3 border border-[var(--theme-primary)]/20">
            {categoria}
          </span>
        )}
        <h3 className="font-playfair text-sm sm:text-base md:text-2xl text-[var(--theme-text)] mb-1 md:mb-2 line-clamp-2">
          {nombre}
        </h3>
        {mostrar_precio && (
          <p className="font-inter text-xs sm:text-sm md:text-lg text-[var(--theme-text-muted)] font-light">
            ${precio.toLocaleString('es-CO')}
          </p>
        )}
      </div>
    </div>
    </motion.div>
  )
}
