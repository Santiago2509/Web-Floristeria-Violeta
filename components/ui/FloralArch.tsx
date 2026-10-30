'use client'
import { motion } from 'framer-motion'

// ============================================================================
// ARCO FLORAL — enredadera en forma de arco que se dibuja al entrar en pantalla,
// con violetas y hojas que brotan a lo largo del tallo. Decoración vectorial
// para enmarcar la vitrina de rosas preservadas.
// ============================================================================

const W = 520, H = 600
const CX = W / 2, R = 215, TOP = 250 // centro y radio del arco; TOP = altura donde empieza la curva
const LEFT = CX - R, RIGHT = CX + R

const ARCH = `M ${LEFT} ${H} L ${LEFT} ${TOP} A ${R} ${R} 0 0 1 ${RIGHT} ${TOP} L ${RIGHT} ${H}`
// Segundo tallo más fino que serpentea junto al principal
const ARCH_2 = `M ${LEFT + 10} ${H} C ${LEFT - 12} ${H - 120}, ${LEFT + 24} ${TOP + 120}, ${LEFT + 8} ${TOP} A ${R - 8} ${R - 8} 0 0 1 ${RIGHT - 8} ${TOP} C ${RIGHT - 24} ${TOP + 120}, ${RIGHT + 12} ${H - 120}, ${RIGHT - 10} ${H}`

// Punto del arco según un parámetro 0..1 (patas rectas + semicírculo), y orientación hacia fuera
function pointAt(t: number) {
  const leg = H - TOP
  const curve = Math.PI * R
  const total = leg * 2 + curve
  let d = t * total
  if (d <= leg) return { x: LEFT, y: H - d, nx: -1, ny: 0 }
  d -= leg
  if (d <= curve) {
    const a = Math.PI - d / R
    return { x: CX + R * Math.cos(a), y: TOP - R * Math.sin(a), nx: Math.cos(a), ny: -Math.sin(a) }
  }
  d -= curve
  return { x: RIGHT, y: TOP + d, nx: 1, ny: 0 }
}

const COLORS: [string, string][] = [
  ['#6D28D9', '#C4B5FD'],
  ['#A21CAF', '#F0ABFC'],
  ['#7C3AED', '#DDD6FE'],
  ['#9333EA', '#E9D5FF'],
]

// Flores y hojas a lo largo del arco (t = posición 0..1)
const FLOWERS = [0.12, 0.27, 0.4, 0.5, 0.6, 0.73, 0.88].map((t, i) => ({ t, size: i === 3 ? 1.35 : 0.85 + (i % 3) * 0.18, color: i % COLORS.length }))
const LEAVES = [0.06, 0.19, 0.33, 0.45, 0.55, 0.67, 0.8, 0.94]

function Flower({ x, y, size, color, delay }: { x: number; y: number; size: number; color: number; delay: number }) {
  const [dark, light] = COLORS[color]
  const s = 20 * size
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g
        initial={{ scale: 0, rotate: -70, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ transformBox: 'view-box', originX: '0px', originY: '0px' }}
      >
        <ellipse cx={-s * 0.42} cy={-s * 0.55} rx={s * 0.48} ry={s * 0.72} transform={`rotate(-28 ${-s * 0.42} ${-s * 0.55})`} fill={dark} />
        <ellipse cx={s * 0.42} cy={-s * 0.55} rx={s * 0.48} ry={s * 0.72} transform={`rotate(28 ${s * 0.42} ${-s * 0.55})`} fill={dark} />
        <ellipse cx={-s * 0.72} cy={s * 0.12} rx={s * 0.6} ry={s * 0.4} transform={`rotate(-12 ${-s * 0.72} ${s * 0.12})`} fill={light} />
        <ellipse cx={s * 0.72} cy={s * 0.12} rx={s * 0.6} ry={s * 0.4} transform={`rotate(12 ${s * 0.72} ${s * 0.12})`} fill={light} />
        <ellipse cx={0} cy={s * 0.62} rx={s * 0.55} ry={s * 0.6} fill={light} />
        <path d={`M 0 ${s * 0.25} L 0 ${s * 0.95} M ${-s * 0.18} ${s * 0.3} L ${-s * 0.28} ${s * 0.8} M ${s * 0.18} ${s * 0.3} L ${s * 0.28} ${s * 0.8}`} stroke={dark} strokeOpacity={0.5} strokeWidth={1} strokeLinecap="round" />
        <circle r={s * 0.24} fill="#FFFFFF" />
        <circle r={s * 0.16} fill="#FACC15" />
      </motion.g>
    </g>
  )
}

function Leaf({ x, y, angle, delay }: { x: number; y: number; angle: number; delay: number }) {
  const s = 15
  const heart = `M 0 0 C ${-s * 0.2} ${-s * 0.5}, ${-s * 1.1} ${-s * 0.9}, ${-s * 0.7} ${-s * 1.5} C ${-s * 0.45} ${-s * 1.85}, ${-s * 0.05} ${-s * 1.7}, 0 ${-s * 1.4} C ${s * 0.05} ${-s * 1.7}, ${s * 0.45} ${-s * 1.85}, ${s * 0.7} ${-s * 1.5} C ${s * 1.1} ${-s * 0.9}, ${s * 0.2} ${-s * 0.5}, 0 0 Z`
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <motion.path
        d={heart}
        fill="var(--arch-leaf)"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay }}
        style={{ transformBox: 'view-box', originX: '0px', originY: '0px' }}
      />
    </g>
  )
}

export function FloralArch({ className = '' }: { className?: string }) {
  const DRAW = 1.8 // segundos que tarda en dibujarse el tallo
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`floral-arch overflow-visible ${className}`} aria-hidden="true">
      <motion.path
        d={ARCH_2}
        fill="none"
        stroke="var(--arch-stem)"
        strokeOpacity={0.45}
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: DRAW + 0.4, ease: 'easeInOut' }}
      />
      <motion.path
        d={ARCH}
        fill="none"
        stroke="var(--arch-stem)"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: DRAW, ease: 'easeInOut' }}
      />
      {LEAVES.map((t, i) => {
        const p = pointAt(t)
        const angle = (Math.atan2(p.ny, p.nx) * 180) / Math.PI + 90 + (i % 2 === 0 ? -35 : 35)
        return <Leaf key={i} x={p.x} y={p.y} angle={angle} delay={t * DRAW + 0.1} />
      })}
      {FLOWERS.map((f, i) => {
        const p = pointAt(f.t)
        return <Flower key={i} x={p.x + p.nx * 6} y={p.y + p.ny * 6} size={f.size} color={f.color} delay={f.t * DRAW + 0.25} />
      })}
    </svg>
  )
}
