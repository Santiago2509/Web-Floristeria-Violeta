'use client'
import { motion } from 'framer-motion'

// ============================================================================
// ORNAMENTOS CALIGRÁFICOS — trazos finos con espirales que se dibujan solos.
// Usan `currentColor`: el color se elige con la clase de texto del contenedor.
// ============================================================================

function Draw({ d, delay = 0, duration = 2, width = 1.4, opacity = 1 }: { d: string; delay?: number; duration?: number; width?: number; opacity?: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={opacity}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ pathLength: { duration, delay, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.2, delay } }}
    />
  )
}

/** Pequeño adorno: hoja + punto (se dibuja al final del trazo) */
function Bud({ x, y, r = 0, delay }: { x: number; y: number; r?: number; delay: number }) {
  return (
    <motion.g
      transform={`translate(${x} ${y}) rotate(${r})`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: 'backOut' }}
      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
    >
      <path d="M0 0 C4 -6 12 -6 14 0 C12 6 4 6 0 0 Z" fill="currentColor" fillOpacity={0.55} />
    </motion.g>
  )
}

/**
 * Adorno horizontal simétrico (para encima o debajo de un título):
 * curvas en S que terminan en espirales y un rombo central.
 */
export function TitleFlourish({ className = '', delay = 0, flip = false }: { className?: string; delay?: number; flip?: boolean }) {
  // mitad izquierda; la derecha es su espejo
  const half =
    'M300 40 C268 40 250 22 222 22 C196 22 186 44 162 44 C138 44 130 24 110 24 ' +
    'C88 24 80 44 60 42 C42 40 36 22 48 16 C60 10 70 24 60 30 C54 34 46 28 50 24'
  const tail = 'M222 22 C214 10 200 6 190 10 C182 14 186 24 194 22'
  return (
    <svg viewBox="0 0 600 64" className={className} aria-hidden="true" style={flip ? { transform: 'scaleY(-1)' } : undefined}>
      <g>
        <Draw d={half} delay={delay} duration={2.2} width={1.7} />
        <Draw d={tail} delay={delay + 1} duration={1} width={1.1} opacity={0.8} />
        <Bud x={154} y={44} r={20} delay={delay + 1.6} />
      </g>
      <g transform="translate(600 0) scale(-1 1)">
        <Draw d={half} delay={delay} duration={2.2} width={1.7} />
        <Draw d={tail} delay={delay + 1} duration={1} width={1.1} opacity={0.8} />
        <Bud x={154} y={44} r={20} delay={delay + 1.6} />
      </g>
      <motion.path
        d="M300 32 L308 40 L300 48 L292 40 Z"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 2, duration: 0.4, ease: 'backOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
    </svg>
  )
}

/** Enredadera caligráfica que sale de una esquina con varias volutas. */
export function CornerFlourish({ className = '', delay = 0, mirror = false, flip = false }: { className?: string; delay?: number; mirror?: boolean; flip?: boolean }) {
  const main =
    'M4 4 C60 10 92 40 118 78 C140 110 150 150 196 168 C230 182 262 170 270 146 ' +
    'C276 126 258 112 244 120 C232 128 238 146 252 142'
  const curl1 = 'M118 78 C130 52 156 40 176 50 C192 58 190 80 174 82 C162 84 158 70 168 66'
  const curl2 = 'M60 26 C48 52 54 82 76 92 C92 100 106 88 100 76 C96 68 86 70 86 78'
  const curl3 = 'M196 168 C186 196 196 224 220 232 C236 238 248 226 242 214'
  const transform = [mirror ? 'scaleX(-1)' : '', flip ? 'scaleY(-1)' : ''].join(' ').trim()
  return (
    <svg viewBox="0 0 280 250" className={className} aria-hidden="true" style={transform ? { transform } : undefined}>
      <Draw d={main} delay={delay} duration={2.6} width={1.5} />
      <Draw d={curl1} delay={delay + 0.9} duration={1.4} width={1.2} opacity={0.85} />
      <Draw d={curl2} delay={delay + 0.4} duration={1.4} width={1.2} opacity={0.85} />
      <Draw d={curl3} delay={delay + 1.6} duration={1.2} width={1.1} opacity={0.75} />
      <Bud x={92} y={50} r={-30} delay={delay + 1.4} />
      <Bud x={150} y={120} r={40} delay={delay + 1.9} />
      <Bud x={232} y={176} r={10} delay={delay + 2.4} />
    </svg>
  )
}

/**
 * Voluta barroca grande para flanquear un título (lado izquierdo; usar `mirror` para el derecho).
 * El trazo nace junto al título y se enrosca hacia fuera en varias espirales.
 */
export function SideScroll({ className = '', delay = 0, mirror = false }: { className?: string; delay?: number; mirror?: boolean }) {
  const main =
    'M300 110 C250 110 226 70 186 70 C146 70 132 122 96 122 C62 122 46 92 62 74 ' +
    'C78 56 106 70 98 92 C92 108 70 106 70 92 C70 84 78 80 84 84'
  const upper = 'M186 70 C176 38 146 22 120 30 C100 36 102 62 120 60 C132 58 132 44 122 44'
  const lower = 'M236 106 C232 144 204 166 176 160 C154 155 156 132 172 134 C184 136 182 150 172 150'
  const whisker = 'M96 122 C80 146 54 158 32 150 C18 144 20 128 32 130'
  const tendril = 'M150 72 C150 52 160 40 172 40'
  const transform = mirror ? 'scaleX(-1)' : undefined
  return (
    <svg viewBox="0 0 310 190" className={className} aria-hidden="true" style={transform ? { transform } : undefined}>
      <Draw d={main} delay={delay} duration={2.6} width={1.8} />
      <Draw d={upper} delay={delay + 0.8} duration={1.6} width={1.4} opacity={0.9} />
      <Draw d={lower} delay={delay + 1.1} duration={1.6} width={1.4} opacity={0.9} />
      <Draw d={whisker} delay={delay + 1.6} duration={1.4} width={1.2} opacity={0.75} />
      <Draw d={tendril} delay={delay + 1.3} duration={0.8} width={1} opacity={0.7} />
      <Bud x={208} y={84} r={-25} delay={delay + 1.8} />
      <Bud x={130} y={104} r={150} delay={delay + 2.1} />
      <Bud x={52} y={140} r={200} delay={delay + 2.6} />
      <motion.circle cx={300} cy={110} r={3} fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + 0.1 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
    </svg>
  )
}
