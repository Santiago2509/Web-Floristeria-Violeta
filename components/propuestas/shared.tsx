'use client'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react'
import { generarLinkWhatsApp } from '@/lib/whatsapp'
import { PROPUESTAS } from './data'


/** Botones principales (violeta de la marca). `dark` = sobre fondo oscuro. */
export function GoldButtons({ dark = true, className = '' }: { dark?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 ${className}`}>
      <Link
        href="/catalogo"
        className="px-8 py-3.5 rounded-full font-inter text-sm font-semibold tracking-wide text-white bg-plum-gradient shadow-[0_10px_30px_-10px_rgba(109,40,217,0.8)] hover:-translate-y-0.5 transition-transform"
      >
        Ver catálogo
      </Link>
      <a
        href={generarLinkWhatsApp()}
        target="_blank"
        rel="noopener noreferrer"
        className={`px-8 py-3.5 rounded-full font-inter text-sm font-medium tracking-wide border transition-colors ${dark ? 'border-white/60 text-white hover:bg-white/10' : 'bg-white/85 backdrop-blur-md border-white text-[#3B0764] font-semibold shadow-[0_8px_24px_-12px_rgba(59,7,100,0.5)] hover:bg-white'}`}
      >
        Pedir por WhatsApp
      </a>
    </div>
  )
}

/** Texto en círculo que gira lentamente (sello). */
export function CircleText({ text, size = 180, color = '#E9D5FF', className = '', reverse = false }: { text: string; size?: number; color?: string; className?: string; reverse?: boolean }) {
  const id = `circle-${size}-${reverse ? 'r' : 'n'}`
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={{ animation: `${reverse ? 'spin-reverse' : 'spin-slow-global'} 28s linear infinite` }}
      aria-hidden="true"
    >
      <defs>
        <path id={id} d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
      </defs>
      <text fill={color} fontSize="13" letterSpacing="4.2" fontFamily="var(--font-jost), sans-serif">
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
    </svg>
  )
}

/** Barra flotante para pasar entre propuestas. */
export function ProposalSwitcher({ n }: { n: number }) {
  const total = PROPUESTAS.length
  const prev = n === 1 ? total : n - 1
  const next = n === total ? 1 : n + 1
  const current = PROPUESTAS[n - 1]
  return (
    <div className="fixed bottom-5 left-4 z-[60] flex items-center gap-1 rounded-full bg-[#1A0B2E]/90 backdrop-blur-md text-white shadow-2xl border border-white/10 pl-1 pr-1 py-1 font-inter text-xs">
      <Link href={`/propuestas/${prev}`} aria-label="Propuesta anterior" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"><ChevronLeft className="w-4 h-4" /></Link>
      <span className="px-1 whitespace-nowrap"><strong className="text-[#C4B5FD]">{n}/{total}</strong> · {current.name}</span>
      <Link href={`/propuestas/${next}`} aria-label="Propuesta siguiente" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"><ChevronRight className="w-4 h-4" /></Link>
      <Link href="/propuestas" aria-label="Ver todas las propuestas" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10"><LayoutGrid className="w-4 h-4" /></Link>
    </div>
  )
}
