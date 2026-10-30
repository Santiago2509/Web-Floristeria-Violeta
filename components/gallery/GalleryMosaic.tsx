'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryImage } from '@/types'
import { Lightbox } from '@/components/ui/Lightbox'

// Formas que se alternan en el mosaico: arco, círculo, rectángulo alto, cuadrado…
// En escritorio las formas se suavizan (rectángulos redondeados de distintas alturas).
const SHAPES = [
  'aspect-[3/4] rounded-t-full rounded-b-3xl md:rounded-3xl md:aspect-[3/4]',
  'aspect-square rounded-full md:rounded-3xl md:aspect-square',
  'aspect-[2/3] rounded-3xl md:aspect-[4/5]',
  'aspect-square rounded-3xl md:aspect-[4/3]',
  'aspect-[3/4] rounded-t-full rounded-b-3xl md:rounded-3xl md:aspect-[2/3]',
  'aspect-[4/5] rounded-[2.5rem] rounded-tr-[6rem] md:rounded-3xl md:aspect-square',
]

export function GalleryMosaic({ images }: { images: GalleryImage[] }) {
  const [category, setCategory] = useState('')
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const categories = useMemo(() => {
    const seen = new Map<string, string>()
    for (const img of images) {
      const key = img.category.trim().toLowerCase()
      if (key && !seen.has(key)) seen.set(key, img.category.trim())
    }
    return [...seen.values()]
  }, [images])

  const visible = category ? images.filter(img => img.category.trim().toLowerCase() === category.toLowerCase()) : images

  const chip = (active: boolean) =>
    `px-4 py-2 rounded-full font-inter text-sm border transition-colors ${active
      ? 'bg-plum-gradient border-transparent text-[var(--theme-on-plum)] shadow-md'
      : 'bg-[var(--theme-bg-card)] border-[var(--theme-border)] text-[var(--theme-text-muted)] hover:border-[var(--theme-primary)] hover:text-[var(--theme-primary)]'}`

  return (
    <>
      {/* Filtro por categoría (se reparte en varias líneas; sin desplazamiento lateral) */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
          <button type="button" onClick={() => setCategory('')} className={chip(!category)}>
            Todo <span className="opacity-70 text-xs">{images.length}</span>
          </button>
          {categories.map(cat => (
            <button key={cat} type="button" onClick={() => setCategory(category === cat ? '' : cat)} className={chip(category === cat)}>
              {cat}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="columns-2 lg:columns-3 gap-3 md:gap-6 [&>*]:mb-3 md:[&>*]:mb-6">
        <AnimatePresence mode="popLayout">
          {visible.map((img, i) => (
            <motion.button
              key={img.id}
              type="button"
              layout
              onClick={() => { setIndex(i); setOpen(true) }}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group block w-full break-inside-avoid text-left"
              aria-label={`Ampliar: ${img.title}`}
            >
              <div className={`relative w-full overflow-hidden bg-[var(--theme-bg-section)] shadow-[0_20px_40px_-28px_rgba(59,7,100,0.6)] ${SHAPES[i % SHAPES.length]}`}>
                <Image
                  src={img.imageUrl}
                  alt={img.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Título al pasar el ratón (escritorio) */}
                <div className="absolute inset-0 hidden md:flex flex-col justify-end p-6 bg-gradient-to-t from-[#1E0B3A]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-inter text-xs font-semibold uppercase tracking-widest text-white/80 mb-1">{img.category}</span>
                  <span className="font-playfair text-xl text-white">{img.title}</span>
                </div>
              </div>
              {/* Pie de foto discreto (móvil) */}
              <p className="md:hidden mt-1.5 px-1 font-inter text-[11px] uppercase tracking-[0.18em] text-[var(--theme-primary)] truncate">
                {img.category}
              </p>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <Lightbox
        images={visible}
        currentIndex={index}
        isOpen={open}
        onClose={() => setOpen(false)}
        onNavigate={setIndex}
      />
    </>
  )
}
