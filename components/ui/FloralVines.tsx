'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion, useMotionValue, type MotionValue } from 'framer-motion'

// ============================================================================
// ENREDADERAS FLORALES — dos tallos que recorren los márgenes de la página y
// crecen con el scroll; a su paso brotan violetas, hojas de corazón, capullos
// y zarcillos. Se adaptan al margen libre de cada pantalla para no tapar el
// contenido (si el margen es muy estrecho, no se muestran).
// ============================================================================

const CONTAINER_MAX = 1280 // max-width del .container
const STEP = 155           // distancia vertical entre nudos del tallo (px)

// Las animaciones de escala/rotación giran sobre el punto de anclaje (0,0) de cada elemento
const ORIGIN = { transformBox: 'view-box', originX: '0px', originY: '0px' } as const

// Paletas de las violetas: [pétalos superiores, pétalos inferiores]
const FLOWER_COLORS: [string, string][] = [
  ['#6D28D9', '#A78BFA'],
  ['#A21CAF', '#F0ABFC'],
  ['#7C3AED', '#C4B5FD'],
  ['#9333EA', '#E9D5FF'],
  ['#5B21B6', '#DDD6FE'],
]

type NodeKind = 'flower' | 'leaves' | 'bud' | 'tendril'
type VineNode = { x: number; y: number; t: number; kind: NodeKind; dir: 1 | -1; size: number; color: number; angle: number; cluster: boolean }

// Pseudoaleatorio determinista (mismo dibujo en cada visita)
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function buildVine(height: number, width: number, seed: number) {
  const rand = seeded(seed)
  const count = Math.max(2, Math.floor((height - 80) / STEP))
  const points = Array.from({ length: count + 1 }, (_, i) => {
    const y = 30 + i * STEP + (rand() - 0.5) * 36
    const x = width * (0.34 + 0.16 * Math.sin(i * 0.9 + seed) + (rand() - 0.5) * 0.08)
    return { x, y: Math.min(y, height - 20) }
  })

  // Curva suave (Catmull-Rom → Bézier cúbica)
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }

  // Nudos: patrón flor · hojas · capullo · hojas · flor · zarcillo…
  const pattern: NodeKind[] = ['flower', 'bud', 'flower', 'tendril', 'flower', 'leaves', 'bud', 'flower', 'tendril']
  const nodes: VineNode[] = points.slice(1).map((p, i) => ({
    x: p.x,
    y: p.y,
    t: p.y / height,
    kind: pattern[(i + seed) % pattern.length],
    dir: i % 2 === 0 ? 1 : -1,
    size: 0.95 + rand() * 0.5,
    color: Math.floor(rand() * FLOWER_COLORS.length),
    angle: (rand() - 0.5) * 50,
    cluster: rand() > 0.55,
  }))

  // Tallo secundario: misma trayectoria con un vaivén desfasado, se entrelaza con el principal
  let d2 = ''
  points.forEach((p, i) => {
    const x = p.x + Math.sin(i * 1.7 + seed) * width * 0.09
    if (i === 0) d2 = `M ${x.toFixed(1)} ${p.y.toFixed(1)}`
    else {
      const prev = points[i - 1]
      const px = prev.x + Math.sin((i - 1) * 1.7 + seed) * width * 0.09
      const my = (prev.y + p.y) / 2
      d2 += ` C ${px.toFixed(1)} ${my.toFixed(1)}, ${x.toFixed(1)} ${my.toFixed(1)}, ${x.toFixed(1)} ${p.y.toFixed(1)}`
    }
  })

  return { d, d2, nodes }
}

// Escala de aparición de un elemento al llegar el tallo a su altura
function useBloom(progress: MotionValue<number>, t: number, delay = 0) {
  const start = t - 0.035 + delay
  const end = t + 0.01 + delay
  const scale = useTransform(progress, [start, end], [0, 1], { clamp: true })
  const rotate = useTransform(progress, [start, end], [-70, 0], { clamp: true })
  const opacity = useTransform(progress, [start, start + 0.008], [0, 1], { clamp: true })
  return { scale, rotate, opacity, ...ORIGIN }
}

function Violet({ node, progress, side, scale = 1, delay = 0 }: { node: VineNode; progress: MotionValue<number>; side: string; scale?: number; delay?: number }) {
  const outer = useBloom(progress, node.t, delay)
  const inner = useBloom(progress, node.t, delay + 0.012)
  const [dark] = FLOWER_COLORS[node.color]
  const light = `url(#petal-${side}-${node.color})`
  const s = 27 * node.size * scale
  const cx = node.x + node.dir * 26 * node.size * scale
  const cy = node.y - 6 - (scale < 1 ? 26 * node.size : 0)

  return (
    <g transform={`translate(${cx} ${cy}) rotate(${node.angle})`}>
      {/* pedúnculo */}
      <path d={`M ${-node.dir * 26 * node.size * scale} ${6 + (scale < 1 ? 26 * node.size : 0)} Q ${-node.dir * 12} 10 0 0`} stroke="var(--vine-stem)" strokeWidth={1.6} fill="none" strokeLinecap="round" />
      <motion.g style={{ scale: outer.scale, rotate: outer.rotate, opacity: outer.opacity, ...ORIGIN }}>
        {/* dos pétalos superiores (oscuros) */}
        <ellipse cx={-s * 0.42} cy={-s * 0.55} rx={s * 0.48} ry={s * 0.72} transform={`rotate(-28 ${-s * 0.42} ${-s * 0.55})`} fill={dark} stroke="#2E1065" strokeOpacity={0.25} strokeWidth={0.8} />
        <ellipse cx={s * 0.42} cy={-s * 0.55} rx={s * 0.48} ry={s * 0.72} transform={`rotate(28 ${s * 0.42} ${-s * 0.55})`} fill={dark} stroke="#2E1065" strokeOpacity={0.25} strokeWidth={0.8} />
        {/* dos pétalos laterales */}
        <ellipse cx={-s * 0.72} cy={s * 0.12} rx={s * 0.6} ry={s * 0.4} transform={`rotate(-12 ${-s * 0.72} ${s * 0.12})`} fill={light} stroke={dark} strokeOpacity={0.35} strokeWidth={0.8} />
        <ellipse cx={s * 0.72} cy={s * 0.12} rx={s * 0.6} ry={s * 0.4} transform={`rotate(12 ${s * 0.72} ${s * 0.12})`} fill={light} stroke={dark} strokeOpacity={0.35} strokeWidth={0.8} />
        {/* pétalo inferior con vetas */}
        <ellipse cx={0} cy={s * 0.62} rx={s * 0.55} ry={s * 0.6} fill={light} stroke={dark} strokeOpacity={0.35} strokeWidth={0.8} />
        <path d={`M 0 ${s * 0.25} L 0 ${s * 0.95} M ${-s * 0.18} ${s * 0.3} L ${-s * 0.28} ${s * 0.8} M ${s * 0.18} ${s * 0.3} L ${s * 0.28} ${s * 0.8}`} stroke={dark} strokeOpacity={0.55} strokeWidth={1} strokeLinecap="round" />
        <motion.g style={{ scale: inner.scale, ...ORIGIN }}>
          {/* centro amarillo */}
          <circle r={s * 0.24} fill="#FFFFFF" />
          <circle r={s * 0.16} fill="#FACC15" />
        </motion.g>
      </motion.g>
    </g>
  )
}

function Leaves({ node, progress }: { node: VineNode; progress: MotionValue<number> }) {
  const a = useBloom(progress, node.t)
  const b = useBloom(progress, node.t, 0.01)
  const s = 20 * node.size
  // hoja en forma de corazón (como las de la violeta), anclada en la punta
  const heart = `M 0 0 C ${-s * 0.2} ${-s * 0.5}, ${-s * 1.1} ${-s * 0.9}, ${-s * 0.7} ${-s * 1.5} C ${-s * 0.45} ${-s * 1.85}, ${-s * 0.05} ${-s * 1.7}, 0 ${-s * 1.4} C ${s * 0.05} ${-s * 1.7}, ${s * 0.45} ${-s * 1.85}, ${s * 0.7} ${-s * 1.5} C ${s * 1.1} ${-s * 0.9}, ${s * 0.2} ${-s * 0.5}, 0 0 Z`

  return (
    <g transform={`translate(${node.x} ${node.y})`}>
      <motion.g style={{ scale: a.scale, opacity: a.opacity, ...ORIGIN }}>
        <g transform={`rotate(${node.dir * 62})`}>
          <path d={heart} fill="var(--vine-leaf)" />
          <path d={`M 0 0 L 0 ${-s * 1.3}`} stroke="var(--vine-leaf-vein)" strokeWidth={1} />
        </g>
      </motion.g>
      <motion.g style={{ scale: b.scale, opacity: b.opacity, ...ORIGIN }}>
        <g transform={`rotate(${-node.dir * 118}) scale(0.75)`}>
          <path d={heart} fill="var(--vine-leaf)" />
          <path d={`M 0 0 L 0 ${-s * 1.3}`} stroke="var(--vine-leaf-vein)" strokeWidth={1} />
        </g>
      </motion.g>
    </g>
  )
}

function Bud({ node, progress }: { node: VineNode; progress: MotionValue<number> }) {
  const a = useBloom(progress, node.t)
  const [dark, light] = FLOWER_COLORS[node.color]
  const s = 10 * node.size
  const tipX = node.dir * 30 * node.size
  return (
    <g transform={`translate(${node.x} ${node.y})`}>
      <path d={`M 0 0 Q ${tipX * 0.5} ${-6} ${tipX} ${-18 * node.size}`} stroke="var(--vine-stem)" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <motion.g style={{ scale: a.scale, opacity: a.opacity, ...ORIGIN }}>
        <g transform={`translate(${tipX} ${-18 * node.size}) rotate(${node.dir * 25})`}>
          <ellipse cx={0} cy={-s * 0.6} rx={s * 0.55} ry={s} fill={dark} />
          <path d={`M ${-s * 0.3} ${-s * 0.4} Q 0 ${-s * 1.7} ${s * 0.3} ${-s * 0.4}`} fill={light} opacity={0.8} />
          <path d={`M ${-s * 0.6} 0 Q 0 ${-s * 0.5} ${s * 0.6} 0 Q 0 ${s * 0.35} ${-s * 0.6} 0 Z`} fill="var(--vine-leaf)" />
        </g>
      </motion.g>
    </g>
  )
}

function Tendril({ node, progress }: { node: VineNode; progress: MotionValue<number> }) {
  const draw = useTransform(progress, [node.t - 0.03, node.t + 0.02], [0, 1], { clamp: true })
  const k = node.size
  const dx = node.dir
  const d = `M 0 0 C ${dx * 14 * k} ${-4 * k}, ${dx * 26 * k} ${-16 * k}, ${dx * 22 * k} ${-26 * k} C ${dx * 18 * k} ${-34 * k}, ${dx * 8 * k} ${-30 * k}, ${dx * 10 * k} ${-24 * k} C ${dx * 12 * k} ${-19 * k}, ${dx * 18 * k} ${-21 * k}, ${dx * 17 * k} ${-25 * k}`
  return (
    <g transform={`translate(${node.x} ${node.y})`}>
      <motion.path d={d} fill="none" stroke="var(--vine-stem)" strokeWidth={1.4} strokeLinecap="round" style={{ pathLength: draw }} />
    </g>
  )
}

function Vine({ height, width, seed, progress, side }: { height: number; width: number; seed: number; progress: MotionValue<number>; side: 'left' | 'right' }) {
  const { d, d2, nodes } = useMemo(() => buildVine(height, width, seed), [height, width, seed])

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`absolute top-0 overflow-visible ${side === 'left' ? 'left-0' : 'right-0 -scale-x-100'}`}
    >
      <defs>
        <linearGradient id={`vine-stem-${side}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--vine-stem)" />
          <stop offset="100%" stopColor="var(--vine-stem-end)" />
        </linearGradient>
        {FLOWER_COLORS.map(([dark, light], i) => (
          <radialGradient key={i} id={`petal-${side}-${i}`} cx="50%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor={light} />
            <stop offset="100%" stopColor={dark} />
          </radialGradient>
        ))}
      </defs>
      <motion.path
        d={d2}
        fill="none"
        stroke={`url(#vine-stem-${side})`}
        strokeOpacity={0.55}
        strokeWidth={1.4}
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#vine-stem-${side})`}
        strokeWidth={3}
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />
      {nodes.map((node, i) => {
        const key = `${side}-${i}`
        // Cada nudo lleva su par de hojas + un elemento (flor, capullo o zarcillo)
        const leaves = <Leaves key={`${key}-l`} node={{ ...node, dir: (-node.dir) as 1 | -1, size: node.size * 0.85 }} progress={progress} />
        if (node.kind === 'leaves') return <Leaves key={key} node={node} progress={progress} />
        if (node.kind === 'flower') return [
          leaves,
          <Violet key={key} node={node} progress={progress} side={side} />,
          node.cluster && <Violet key={`${key}-c`} node={{ ...node, color: (node.color + 2) % FLOWER_COLORS.length, angle: -node.angle }} progress={progress} side={side} scale={0.62} delay={0.015} />,
        ]
        if (node.kind === 'bud') return [leaves, <Bud key={key} node={node} progress={progress} />]
        return [leaves, <Tendril key={key} node={node} progress={progress} />]
      })}
    </svg>
  )
}

export function FloralVines() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ height: 0, gutter: 0 })
  const reduceMotion = useReducedMotion()

  // Medimos el alto de la zona y el margen libre a cada lado del contenido
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const vw = window.innerWidth
      const pad = vw >= 1024 ? 80 : vw >= 768 ? 48 : 24 // padding del .container (ver globals.css)
      const gutter = (vw - Math.min(vw, CONTAINER_MAX)) / 2 + pad - 12
      setSize({ height: el.offsetHeight, gutter })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 95%'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })
  const full = useMotionValue(1)
  const progress = reduceMotion ? full : smooth

  // Ancho de cada enredadera: el margen disponible (máx. 190px). Si no cabe, no se muestran.
  const width = Math.min(size.gutter, 190)
  const visible = size.height > 0 && width >= 90

  return (
    <div ref={ref} aria-hidden="true" className="floral-vines absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {visible && (
        <>
          <Vine side="left" seed={3} height={size.height} width={width} progress={progress} />
          <Vine side="right" seed={6} height={size.height} width={width} progress={progress} />
        </>
      )}
    </div>
  )
}
