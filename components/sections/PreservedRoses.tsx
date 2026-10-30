'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { MessageCircle, Sparkles, Droplets, Leaf, ChevronLeft, ChevronRight } from 'lucide-react'
import { generarLinkWhatsApp } from '@/lib/whatsapp'

// ============================================================================
// COLECCIÓN ETERNA — vitrina de rosas preservadas en piezas de cristal.
// Las fotos están recortadas (sin fondo); la cúpula de cristal se dibuja en SVG.
// ============================================================================

type Piece = {
  id: string
  name: string
  article: 'la' | 'el'
  tagline: string
  image: string
  width: number
  height: number
  glow: string        // color del halo detrás de la pieza
  kind: 'dome' | 'plain'
  sizeClass: string   // ancho de la pieza en el escenario
}

const PIECES: Piece[] = [
  {
    id: 'cupula',
    name: 'Cúpula Encantada',
    article: 'la',
    tagline: 'Tres rosas rosadas bajo cúpula de cristal',
    image: '/assets/preservadas/rosas-cupula.webp',
    width: 404, height: 772,
    glow: '#F472B6',
    kind: 'dome',
    sizeClass: 'w-[210px] sm:w-[250px] lg:w-[290px]',
  },
  {
    id: 'caja',
    name: 'Caja Cristal Rubí',
    article: 'la',
    tagline: 'Rosas rojas en caja de cristal con asa',
    image: '/assets/preservadas/caja-cristal-rosas.webp',
    width: 607, height: 330,
    glow: '#F43F5E',
    kind: 'plain',
    sizeClass: 'w-[300px] sm:w-[400px] lg:w-[470px]',
  },
  {
    id: 'corazon',
    name: 'Bolso Corazón Dorado',
    article: 'el',
    tagline: 'Corazón de rosas amarillas en bolso de cristal',
    image: '/assets/preservadas/bolso-corazon.webp',
    width: 442, height: 599,
    glow: '#FACC15',
    kind: 'plain',
    sizeClass: 'w-[230px] sm:w-[270px] lg:w-[310px]',
  },
]

const AUTOPLAY_MS = 6000

// Distancia circular con signo entre una pieza y la activa (-1 = a la izquierda)
function circularOffset(index: number, active: number, total: number) {
  let offset = index - active
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

const FEATURES = [
  { icon: Sparkles, text: 'Duran años' },
  { icon: Droplets, text: 'Sin agua ni cuidados' },
  { icon: Leaf, text: 'Rosas 100% naturales' },
]

// Destellos fijos alrededor de la pieza (posiciones en % del escenario)
const SPARKLES = [
  { x: 14, y: 22, s: 10, d: 0 }, { x: 82, y: 16, s: 14, d: 1.2 }, { x: 90, y: 52, s: 8, d: 0.6 },
  { x: 8, y: 60, s: 12, d: 2.1 }, { x: 24, y: 8, s: 7, d: 1.7 }, { x: 70, y: 74, s: 9, d: 2.6 },
  { x: 32, y: 78, s: 6, d: 0.3 }, { x: 62, y: 6, s: 8, d: 3.1 }, { x: 95, y: 30, s: 6, d: 1.9 },
]

function Star({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" />
    </svg>
  )
}

// Cúpula de cristal dibujada en SVG con las rosas recortadas dentro
function GlassDome({ piece }: { piece: Piece }) {
  return (
    <div className={`relative ${piece.sizeClass} aspect-[300/470]`}>
      <div className="absolute left-[13%] right-[13%] top-[7%] bottom-[10.5%]">
        <Image src={piece.image} alt={piece.name} fill sizes="290px" className="object-contain object-bottom" />
      </div>
      <svg viewBox="0 0 300 470" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="dome-glass" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
            <stop offset="22%" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="70%" stopColor="#fff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id="dome-base" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2b2133" />
            <stop offset="100%" stopColor="#0b0710" />
          </linearGradient>
        </defs>
        {/* cristal */}
        <path d="M24 418 L24 150 C24 62 86 10 150 10 C214 10 276 62 276 150 L276 418 Z" fill="url(#dome-glass)" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        {/* reflejos */}
        <path d="M50 396 L50 160 C50 100 80 58 116 38" stroke="#fff" strokeOpacity="0.6" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M70 380 L70 300" stroke="#fff" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />
        <path d="M256 168 C254 120 236 84 210 62" stroke="#fff" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* base de madera */}
        <path d="M10 420 L10 448 C10 462 290 462 290 448 L290 420 Z" fill="url(#dome-base)" />
        <ellipse cx="150" cy="420" rx="140" ry="14" fill="#3a2d44" />
        <ellipse cx="150" cy="419" rx="128" ry="10" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

function PieceView({ piece }: { piece: Piece }) {
  if (piece.kind === 'dome') return <GlassDome piece={piece} />
  return (
    <div className={`relative ${piece.sizeClass}`} style={{ aspectRatio: `${piece.width} / ${piece.height}` }}>
      <Image src={piece.image} alt={piece.name} fill sizes="(min-width: 1024px) 470px, 300px" className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]" />
    </div>
  )
}

export function PreservedRoses() {
  const [active, setActive] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { amount: 0.35 })
  const piece = PIECES[active]

  // Cambio automático de pieza mientras la sección está a la vista
  useEffect(() => {
    if (!autoplay || !inView) return
    const timer = setTimeout(() => setActive(prev => (prev + 1) % PIECES.length), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [active, autoplay, inView])

  // Inclinación 3D siguiendo el ratón
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 })
  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const resetPointer = () => { mx.set(0); my.set(0) }

  // Ancho del escenario para separar las piezas laterales
  const stageRef = useRef<HTMLDivElement>(null)
  const [stageWidth, setStageWidth] = useState(600)
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setStageWidth(el.offsetWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const choose = (i: number) => {
    setAutoplay(false)
    setActive(i)
  }

  const whatsappUrl = generarLinkWhatsApp(`¡Hola! Me interesa ${piece.article} ${piece.name} de rosas preservadas. ¿Me cuentan precio y disponibilidad?`)

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden text-white pt-40 pb-40 lg:pt-48 lg:pb-48 z-10">
      {/* Fondo oscuro que se funde con la página arriba y abajo (sin cortes bruscos) */}
      <div
        className="absolute inset-0 pointer-events-none bg-[#12052A]"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0, #000 180px, #000 calc(100% - 180px), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 180px, #000 calc(100% - 180px), transparent 100%)',
        }}
      >
        {/* luz violeta desde arriba y brillo fucsia lateral */}
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_70%_20%,rgba(124,58,237,0.45),transparent_70%),radial-gradient(700px_500px_at_0%_85%,rgba(192,38,211,0.25),transparent_70%)]" />
      </div>

      <div className="container mx-auto relative grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-x-16 items-center">

        {/* Introducción */}
        <div className="lg:col-start-1 lg:row-start-1">
          <span className="inline-flex items-center gap-3 font-inter text-[11px] uppercase tracking-[0.35em] text-[#E9D5FF] font-semibold mb-5">
            <span className="w-8 h-px bg-[#E9D5FF]" />
            Colección eterna
          </span>
          <h2 className="font-playfair text-5xl md:text-6xl lg:text-7xl leading-[1.02] mb-6">
            Rosas que{' '}
            <span className="italic bg-[linear-gradient(100deg,#F0ABFC,#FDE68A)] bg-clip-text text-transparent pr-[0.08em]">duran años</span>
          </h2>
          <p className="font-inter text-base lg:text-lg text-white/75 leading-relaxed max-w-lg mb-8">
            Rosas naturales preservadas: conservan su color y su textura por años, sin agua ni cuidados, protegidas en piezas de cristal. Un regalo que no se marchita.
          </p>
          <ul className="flex flex-wrap gap-2">
            {FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-inter text-sm text-white/85">
                <Icon className="w-4 h-4 text-[#F0ABFC]" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Escenario */}
        <div
          ref={stageRef}
          className="relative h-[440px] sm:h-[520px] lg:h-[620px] lg:col-start-2 lg:row-start-1 lg:row-span-2 [perspective:1200px]"
          onPointerMove={handlePointer}
          onPointerLeave={resetPointer}
        >
          {/* halo del color de la pieza */}
          <motion.div
            className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full pointer-events-none"
            animate={{ background: `radial-gradient(circle, ${piece.glow}66 0%, ${piece.glow}1f 45%, transparent 70%)` }}
            transition={{ duration: 1 }}
          />
          {/* anillos de luz */}
          <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border border-white/10 pointer-events-none" />
          <div
            className="absolute left-1/2 top-[44%] w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] -ml-[190px] -mt-[190px] sm:-ml-[250px] sm:-mt-[250px] rounded-full border border-dashed border-white/10 pointer-events-none"
            style={{ animation: 'spin-slow-global 60s linear infinite' }}
          />

          {/* destellos */}
          {SPARKLES.map((sp, i) => (
            <motion.span
              key={i}
              className="absolute pointer-events-none"
              style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4], rotate: [0, 45, 90] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: sp.d, ease: 'easeInOut' }}
            >
              <Star size={sp.s} color={i % 3 === 0 ? piece.glow : '#F5E9FF'} />
            </motion.span>
          ))}

          {/* pedestal de luz */}
          <div className="absolute left-1/2 bottom-[7%] -translate-x-1/2 w-[60%] max-w-[380px] h-[60px] pointer-events-none">
            <div className="absolute inset-0 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.05)_55%,transparent_72%)]" />
            <div className="absolute inset-x-[8%] top-[18%] bottom-[18%] rounded-[50%] border border-white/25" />
          </div>

          {/* Carrusel: la pieza activa al centro (grande), las demás a los lados */}
          <motion.div
            className="absolute inset-x-0 top-0 bottom-[11%] cursor-grab active:cursor-grabbing touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) choose((active + 1) % PIECES.length)
              else if (info.offset.x > 50) choose((active - 1 + PIECES.length) % PIECES.length)
            }}
          >
            {PIECES.map((p, i) => {
              const offset = circularOffset(i, active, PIECES.length)
              const isCenter = offset === 0
              return (
                <div key={p.id} className="absolute inset-0 flex items-end justify-center pointer-events-none" style={{ zIndex: isCenter ? 3 : 1 }}>
                  <motion.div
                    className="pointer-events-auto origin-bottom"
                    initial={false}
                    animate={{
                      x: offset * stageWidth * 0.42,
                      scale: isCenter ? 1 : 0.42,
                      opacity: isCenter ? 1 : 0.55,
                      filter: isCenter ? 'brightness(1) blur(0px)' : 'brightness(0.7) blur(1px)',
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => !isCenter && choose(i)}
                    role={isCenter ? undefined : 'button'}
                    aria-label={isCenter ? undefined : `Ver ${p.name}`}
                    style={{ cursor: isCenter ? 'inherit' : 'pointer' }}
                  >
                    <motion.div style={isCenter ? { rotateX, rotateY } : undefined}>
                      <motion.div
                        animate={isCenter ? { y: [0, -14, 0] } : { y: 0 }}
                        transition={isCenter ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.6 }}
                      >
                        <PieceView piece={p} />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              )
            })}
          </motion.div>

          {/* Flechas */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center gap-3 z-10">
            {[
              { label: 'Pieza anterior', icon: ChevronLeft, step: -1 },
              { label: 'Pieza siguiente', icon: ChevronRight, step: 1 },
            ].map(({ label, icon: Icon, step }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={() => choose((active + step + PIECES.length) % PIECES.length)}
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Selector de modelos + llamada a la acción */}
        <div className="lg:col-start-1 lg:row-start-2">
          <div className="grid gap-2 mb-8" role="tablist" aria-label="Modelos de rosas preservadas">
            {PIECES.map((p, i) => {
              const isActive = i === active
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => choose(i)}
                  className={`relative overflow-hidden text-left flex items-center gap-4 rounded-2xl px-5 py-4 border transition-colors duration-300 ${isActive ? 'bg-white/10 border-white/25' : 'bg-transparent border-white/10 hover:bg-white/5'}`}
                >
                  <span className="relative w-12 h-12 shrink-0 rounded-full bg-white/10 overflow-hidden">
                    <Image src={p.image} alt="" fill sizes="48px" className="object-contain p-1" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-playfair text-xl leading-tight">{p.name}</span>
                    <span className="block font-inter text-sm text-white/60">{p.tagline}</span>
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-300" style={{ background: p.glow, transform: isActive ? 'scale(1)' : 'scale(0.5)', boxShadow: isActive ? `0 0 14px ${p.glow}` : 'none' }} />
                  {isActive && autoplay && inView && (
                    <motion.span
                      key={`progress-${active}`}
                      className="absolute left-0 bottom-0 h-[2px] bg-white/70"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full whitespace-nowrap bg-white text-[#3B0764] font-inter text-sm font-semibold shadow-[0_10px_30px_-12px_rgba(240,171,252,0.7)] hover:-translate-y-0.5 transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
              Quiero {piece.article} {piece.name}
            </a>
            <a
              href={generarLinkWhatsApp('¡Hola! ¿Me pueden enviar todos los modelos de rosas preservadas que tienen?')}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-sm font-medium text-white/80 hover:text-white underline underline-offset-4 decoration-white/30"
            >
              Ver más modelos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
