'use client'
import { useId } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// ============================================================================
// COLLAGE VINTAGE — portada de "Nuestra Historia": polaroids con fotos reales de la
// galería pegadas con cinta sobre papel envejecido, un sello de tinta y notas escritas.
// ============================================================================

export type CollagePhoto = { src: string; caption: string }

const FALLBACK: CollagePhoto[] = [
  { src: '/assets/about_hero_bg_colombia_v2.webp', caption: 'El primer local' },
  { src: '/assets/about_story_img.webp', caption: 'Hecho a mano' },
  { src: '/assets/servicio_momentos.webp', caption: 'Rosas eternas' },
  { src: '/assets/servicio_regalos.webp', caption: 'Un detalle' },
  { src: '/assets/servicio_delivery.webp', caption: 'Hasta tu puerta' },
  { src: '/assets/services_hero_bg.webp', caption: 'Nuestro taller' },
]

// Posición (en % del lienzo), giro, ancho y color de la cinta de cada polaroid
// El centro (título y subtítulo) queda libre: las polaroids van en los márgenes y abajo
const DESK_SLOTS = [
  { left: 4, top: 13, rot: -8, w: 'w-[14vw] max-w-[220px]', tape: 'bg-[#E9D5FF]/80', tapeRot: -6 },
  { left: 18, top: 64, rot: 6, w: 'w-[13vw] max-w-[200px]', tape: 'bg-[#FBCFE8]/80', tapeRot: 4 },
  { left: 3, top: 62, rot: -3, w: 'w-[11vw] max-w-[170px]', tape: 'bg-[#FDE68A]/70', tapeRot: -10 },
  { left: 82, top: 12, rot: 7, w: 'w-[14vw] max-w-[220px]', tape: 'bg-[#FBCFE8]/80', tapeRot: 8 },
  { left: 68, top: 65, rot: -6, w: 'w-[13vw] max-w-[200px]', tape: 'bg-[#E9D5FF]/80', tapeRot: -4 },
  { left: 85, top: 60, rot: 4, w: 'w-[11vw] max-w-[170px]', tape: 'bg-[#FDE68A]/70', tapeRot: 6 },
]
const MOB_SLOTS = [
  { left: -4, top: 12, rot: -9, w: 'w-[40vw]', tape: 'bg-[#E9D5FF]/80', tapeRot: -6 },
  { left: 60, top: 10, rot: 7, w: 'w-[38vw]', tape: 'bg-[#FBCFE8]/80', tapeRot: 6 },
  { left: -2, top: 70, rot: 5, w: 'w-[38vw]', tape: 'bg-[#FDE68A]/70', tapeRot: 8 },
  { left: 62, top: 68, rot: -7, w: 'w-[38vw]', tape: 'bg-[#E9D5FF]/80', tapeRot: -8 },
]

function Polaroid({ photo, slot, index }: { photo: CollagePhoto; slot: (typeof DESK_SLOTS)[number]; index: number }) {
  return (
    <motion.figure
      className={`absolute ${slot.w}`}
      style={{ left: `${slot.left}%`, top: `${slot.top}%` }}
      initial={{ opacity: 0, y: -40, rotate: slot.rot - 14, scale: 1.08 }}
      animate={{ opacity: 1, y: 0, rotate: slot.rot, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.25 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* cinta adhesiva */}
      <span
        aria-hidden="true"
        className={`absolute -top-3 left-1/2 z-10 h-6 w-[45%] -translate-x-1/2 ${slot.tape} shadow-sm [mask-image:linear-gradient(90deg,transparent_0,#000_6%,#000_94%,transparent_100%)]`}
        style={{ transform: `translateX(-50%) rotate(${slot.tapeRot}deg)` }}
      />
      <div className="bg-[#FFFDF8] p-2 pb-9 sm:p-2.5 sm:pb-11 shadow-[0_18px_30px_-14px_rgba(60,35,10,0.55),0_2px_4px_rgba(60,35,10,0.15)]">
        <div className="relative aspect-square overflow-hidden bg-[#E8DCC8]">
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            sizes="(min-width: 1024px) 18vw, 45vw"
            className="object-cover [filter:sepia(0.28)_saturate(0.85)_contrast(1.05)_brightness(1.02)]"
          />
          {/* viñeta de foto antigua */}
          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(80,50,20,0.35)]" />
        </div>
        <figcaption className="absolute bottom-2 sm:bottom-3 inset-x-2 text-center font-playfair italic text-[13px] sm:text-[15px] text-[#4A3A2A] truncate">
          {photo.caption}
        </figcaption>
      </div>
    </motion.figure>
  )
}

/** Sello de tinta circular (girado, con tinta irregular) */
function InkStamp({ className = '' }: { className?: string }) {
  // ids únicos: el collage puede aparecer varias veces en la página (puertas, móvil)
  const uid = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <path id={`stamp-circle-${uid}`} d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
        <filter id={`stamp-rough-${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="3" />
        </filter>
      </defs>
      <g filter={`url(#stamp-rough-${uid})`} fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="92" strokeWidth="3" />
        <circle cx="100" cy="100" r="54" strokeWidth="1.5" />
        <text fill="currentColor" stroke="none" fontSize="15" letterSpacing="5" fontFamily="var(--font-inter), sans-serif" fontWeight="600">
          <textPath href={`#stamp-circle-${uid}`}>FLORISTERÍA VIOLETA · CALI · HECHO A MANO ·</textPath>
        </text>
        {/* violeta en el centro */}
        <g transform="translate(100 100)" stroke="none" fill="currentColor">
          <ellipse cx="-9" cy="-10" rx="8" ry="12" transform="rotate(-28 -9 -10)" />
          <ellipse cx="9" cy="-10" rx="8" ry="12" transform="rotate(28 9 -10)" />
          <ellipse cx="-15" cy="4" rx="10" ry="7" transform="rotate(-12 -15 4)" opacity="0.75" />
          <ellipse cx="15" cy="4" rx="10" ry="7" transform="rotate(12 15 4)" opacity="0.75" />
          <ellipse cx="0" cy="13" rx="9" ry="10" opacity="0.75" />
        </g>
      </g>
    </svg>
  )
}

/** Ramita de flor prensada */
function PressedFlower({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 220" className={className} aria-hidden="true">
      <path d="M60 215 C58 170 64 120 58 70" stroke="#6B7F52" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M59 150 C40 140 30 120 34 104 C50 112 58 128 59 150 Z" fill="#7D9466" opacity="0.8" />
      <path d="M60 120 C80 112 92 94 88 78 C72 86 62 100 60 120 Z" fill="#7D9466" opacity="0.8" />
      <g transform="translate(58 58)">
        <ellipse cx="-10" cy="-12" rx="10" ry="15" transform="rotate(-28 -10 -12)" fill="#7C4DAA" opacity="0.85" />
        <ellipse cx="10" cy="-12" rx="10" ry="15" transform="rotate(28 10 -12)" fill="#7C4DAA" opacity="0.85" />
        <ellipse cx="-17" cy="4" rx="13" ry="9" transform="rotate(-12 -17 4)" fill="#B79CD6" opacity="0.85" />
        <ellipse cx="17" cy="4" rx="13" ry="9" transform="rotate(12 17 4)" fill="#B79CD6" opacity="0.85" />
        <ellipse cx="0" cy="15" rx="12" ry="13" fill="#B79CD6" opacity="0.85" />
        <circle r="4.5" fill="#E2B33C" />
      </g>
    </svg>
  )
}

export function VintageCollage({ photos = [], variant = 'desktop' }: { photos?: CollagePhoto[]; variant?: 'desktop' | 'mobile' }) {
  const slots = variant === 'desktop' ? DESK_SLOTS : MOB_SLOTS
  const source = photos.length >= slots.length ? photos : [...photos, ...FALLBACK].slice(0, Math.max(slots.length, photos.length))

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F2E8D8] dark:bg-[#231733]">
      {/* papel envejecido: manchas, viñeta y grano */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,250,240,0.9)_0%,transparent_55%),radial-gradient(ellipse_at_75%_80%,rgba(214,190,150,0.45)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_30%_20%,rgba(124,77,170,0.25)_0%,transparent_55%),radial-gradient(ellipse_at_75%_80%,rgba(60,30,90,0.6)_0%,transparent_60%)]" />
      <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(110,75,35,0.35)] dark:shadow-[inset_0_0_160px_rgba(0,0,0,0.6)]" />
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-multiply dark:mix-blend-screen dark:opacity-[0.06]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />
      {/* líneas de cuaderno muy suaves */}
      <div className="absolute inset-0 opacity-[0.07] bg-[repeating-linear-gradient(0deg,#6B4A2A_0,#6B4A2A_1px,transparent_1px,transparent_34px)] dark:opacity-[0.05] dark:bg-[repeating-linear-gradient(0deg,#E9D5FF_0,#E9D5FF_1px,transparent_1px,transparent_34px)]" />

      {/* polaroids */}
      {slots.map((slot, i) => (
        <Polaroid key={i} photo={source[i]} slot={slot} index={i} />
      ))}

      {/* flores prensadas */}
      <PressedFlower className={`absolute opacity-90 ${variant === 'desktop' ? 'left-[46%] top-[72%] w-14 -rotate-[24deg]' : 'left-[42%] top-[74%] w-12 rotate-[18deg]'}`} />
      {variant === 'desktop' && <PressedFlower className="absolute right-[24%] top-[14%] w-11 rotate-[150deg] opacity-80" />}

      {/* título central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <motion.span
          className="font-inter uppercase tracking-[0.45em] text-xs sm:text-sm text-[#7A5B3A] dark:text-[#C4B5FD] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          El comienzo
        </motion.span>
        <motion.h1
          className="relative font-playfair text-[#2A1A10] dark:text-[#F6EEF9] text-5xl sm:text-7xl xl:text-8xl leading-[0.95]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Nuestra <span className="italic text-[#6D28D9] dark:text-[#C4A1FF]">Historia</span>
          {/* sello de tinta sobre el título */}
          <motion.span
            className="absolute -right-4 top-[38%] w-16 sm:right-auto sm:-left-20 sm:-top-20 sm:w-32 text-[#6D28D9]/70 dark:text-[#C4A1FF]/70 mix-blend-multiply dark:mix-blend-screen"
            initial={{ opacity: 0, scale: 1.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: -16 }}
            transition={{ delay: 1.2, duration: 0.35, ease: 'easeOut' }}
          >
            <InkStamp className="w-full h-full" />
          </motion.span>
        </motion.h1>
        <motion.p
          className="mt-6 font-playfair italic text-lg sm:text-2xl text-[#5A4632] dark:text-[#E9D5FF]/85 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Un álbum de flores, manos y momentos — desde el primer ramo en Cali.
        </motion.p>
      </div>
    </div>
  )
}
