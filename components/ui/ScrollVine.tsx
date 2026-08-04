'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion'

/* ╔══════════════════════════════════════════════════════════════╗
   ║  HAND-SCULPTED SVG PATH DATA                               ║
   ║  Every path below was carefully designed with precise       ║
   ║  bezier curves to replicate the reference image exactly.    ║
   ╚══════════════════════════════════════════════════════════════╝ */

/**
 * SPIRAL ROSE — A single continuous bezier path that spirals
 * from the outermost petal inward to the center.
 * When animated with pathLength, the rose "blooms" from
 * outside to inside in one fluid, mesmerizing motion.
 *
 * Layers: outer (r≈36) → mid (r≈22) → inner (r≈14) → tight (r≈7) → center
 */
const ROSE_SPIRAL = `
  M 0,36
  C -20,36 -36,20 -36,0
  C -36,-20 -20,-36 0,-36
  C 20,-36 36,-20 36,0
  C 36,15 25,28 10,28
  C -5,28 -22,15 -22,0
  C -22,-12 -12,-22 0,-22
  C 12,-22 20,-12 20,0
  C 20,9 13,16 4,16
  C -6,16 -14,8 -14,0
  C -14,-6 -8,-12 0,-12
  C 6,-12 12,-6 12,0
  C 12,4 8,7 4,7
  C 0,7 -4,4 -4,0
  C -4,-2 -2,-4 0,-4
  C 2,-4 3,-2 3,0
`.trim()

/**
 * ROSE PETAL FILLS — 5 solid almond-shaped petals arranged
 * around the center. These fade in AFTER the spiral outline
 * starts drawing, creating a layered "blooming" effect.
 */
const ROSE_PETALS = [
  'M 0,-7 C -13,-14 -19,-30 0,-36 C 19,-30 13,-14 0,-7 Z',
  'M 7,0 C 14,-13 30,-19 36,0 C 30,19 14,13 7,0 Z',
  'M 4,7 C 14,14 20,26 12,33 C 3,36 -2,20 4,7 Z',
  'M -4,7 C -14,14 -20,26 -12,33 C -3,36 2,20 -4,7 Z',
  'M -7,0 C -14,-13 -30,-19 -36,0 C -30,19 -14,13 -7,0 Z',
]

/**
 * BOTANICAL LEAF (OUTLINED) — Leaf contour with central vein
 * and 3 branching side veins. Draws itself with pathLength.
 */
const LEAF_CONTOUR =
  'M 0,0 C 10,-6 28,-22 38,-48 C 40,-54 36,-56 28,-46 C 18,-32 8,-14 0,0 Z'
const LEAF_MAIN_VEIN = 'M 3,-3 Q 20,-25 36,-50'
const LEAF_SIDE_VEINS =
  'M 10,-10 L 20,-20 M 17,-18 L 27,-32 M 23,-28 L 33,-42'

/**
 * SOLID LEAF — A filled silhouette leaf, no outline/veins.
 * Used as an accent to add visual weight near roses.
 */
const SOLID_LEAF =
  'M 0,0 C -8,-5 -20,-18 -28,-38 C -30,-44 -26,-46 -20,-38 C -12,-26 -4,-12 0,0 Z'

/**
 * FLOWER BUD — 3 overlapping petals pointing upward,
 * like a flower that hasn't opened yet.
 */
const BUD_PETALS = [
  'M 0,0 C -3,-7 -2,-16 0,-20 C 2,-16 3,-7 0,0 Z',
  'M 0,0 C -7,-4 -9,-13 -6,-18 C -3,-14 0,-7 0,0 Z',
  'M 0,0 C 7,-4 9,-13 6,-18 C 3,-14 0,-7 0,0 Z',
]

/**
 * CURLING TENDRILS — Elegant spiral strokes that curl
 * into themselves, adding filigree detail.
 */
const TENDRIL_RIGHT =
  'M 0,0 C 10,-6 20,-4 18,4 C 16,12 8,10 10,4 C 12,-2 18,0 16,6'
const TENDRIL_LEFT =
  'M 0,0 C -10,-6 -20,-4 -18,4 C -16,12 -8,10 -10,4 C -12,-2 -18,0 -16,6'

/* ╔══════════════════════════════════════════════════════════════╗
   ║  STEM PATH GENERATOR                                        ║
   ║  Creates a smooth, flowing S-curve that runs the full        ║
   ║  height of the page. Each half-wave swings the vine to       ║
   ║  one side and back, creating elegant undulations.            ║
   ╚══════════════════════════════════════════════════════════════╝ */

function generateStemPath(
  pageHeight: number,
  centerX: number,
  amplitude: number,
  startDir: 1 | -1
): string {
  const halfWaveH = 350
  const count = Math.ceil((pageHeight + 100) / halfWaveH) + 1

  let d = `M ${centerX},-50`
  let dir = startDir

  for (let i = 0; i < count; i++) {
    const yStart = -50 + i * halfWaveH
    const yEnd = yStart + halfWaveH

    // Two control points create a smooth half-sine curve
    const cp1x = centerX + amplitude * dir * 0.6
    const cp1y = yStart + halfWaveH * 0.15
    const cp2x = centerX + amplitude * dir
    const cp2y = yEnd - halfWaveH * 0.3

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${centerX},${yEnd}`
    dir = (dir * -1) as 1 | -1
  }

  return d
}

/**
 * Approximates the vine's X-position at a given Y fraction,
 * so we can position flowers right on the stem.
 */
function getVineXAtY(
  centerX: number,
  amplitude: number,
  startDir: 1 | -1,
  yFraction: number,
  pageHeight: number
): number {
  const halfWaveH = 350
  const y = yFraction * pageHeight
  const segIndex = Math.floor((y + 50) / halfWaveH)
  const segProgress = ((y + 50) - segIndex * halfWaveH) / halfWaveH
  const dir = segIndex % 2 === 0 ? startDir : -startDir
  return centerX + amplitude * dir * Math.sin(segProgress * Math.PI)
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║  FLORAL COMPOSITION LAYOUT                                  ║
   ║  Pre-defined positions for floral clusters along the vines. ║
   ║  Each cluster gets a rose (or bud) + leaves + tendril.      ║
   ╚══════════════════════════════════════════════════════════════╝ */

interface CompositionDef {
  yFrac: number
  vine: 'left' | 'right'
  hasRose: boolean
  roseScale: number
}

const COMPOSITIONS: CompositionDef[] = [
  { yFrac: 0.08,  vine: 'left',  hasRose: true,  roseScale: 1.1  },
  { yFrac: 0.18,  vine: 'right', hasRose: false, roseScale: 0    },
  { yFrac: 0.26,  vine: 'right', hasRose: true,  roseScale: 0.9  },
  { yFrac: 0.36,  vine: 'left',  hasRose: true,  roseScale: 1.0  },
  { yFrac: 0.46,  vine: 'right', hasRose: true,  roseScale: 1.15 },
  { yFrac: 0.55,  vine: 'left',  hasRose: false, roseScale: 0    },
  { yFrac: 0.64,  vine: 'left',  hasRose: true,  roseScale: 1.05 },
  { yFrac: 0.74,  vine: 'right', hasRose: true,  roseScale: 0.85 },
  { yFrac: 0.84,  vine: 'left',  hasRose: true,  roseScale: 0.95 },
  { yFrac: 0.92,  vine: 'right', hasRose: false, roseScale: 0    },
]

/* ╔══════════════════════════════════════════════════════════════╗
   ║  MAIN COMPONENT — ScrollVine                                ║
   ╚══════════════════════════════════════════════════════════════╝ */

export function ScrollVine() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })

  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001,
  })

  // Track page dimensions
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDims({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        })
      }
    }
    update()
    const obs = new ResizeObserver(() => requestAnimationFrame(update))
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  // Generate stem paths (memoized — only recalculates on resize)
  const { leftStem, rightStem } = useMemo(() => {
    if (dims.w === 0 || dims.h === 0)
      return { leftStem: '', rightStem: '' }

    const leftX = dims.w * 0.08
    const rightX = dims.w * 0.92
    const amp = Math.max(40, dims.w * 0.04)

    return {
      leftStem: generateStemPath(dims.h, leftX, amp, 1),
      rightStem: generateStemPath(dims.h, rightX, amp, -1),
    }
  }, [dims])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[5] pointer-events-none overflow-hidden hidden lg:block"
    >
      {dims.h > 0 && (
        <svg
          width={dims.w}
          height={dims.h}
          xmlns="http://www.w3.org/2000/svg"
          className="text-[var(--theme-primary)] opacity-[0.25] dark:opacity-[0.15]"
        >
          {/* ── Vine Stems ── */}
          <StemRenderer d={leftStem} progress={smooth} />
          <StemRenderer d={rightStem} progress={smooth} />

          {/* ── Floral Compositions ── */}
          {COMPOSITIONS.map((comp, i) => {
            const isLeft = comp.vine === 'left'
            const centerX = isLeft ? dims.w * 0.08 : dims.w * 0.92
            const amp = Math.max(40, dims.w * 0.04)
            const startDir: 1 | -1 = isLeft ? 1 : -1
            const vineX = getVineXAtY(centerX, amp, startDir, comp.yFrac, dims.h)
            const y = comp.yFrac * dims.h

            return (
              <FloralComposition
                key={i}
                x={vineX}
                y={y}
                yFrac={comp.yFrac}
                hasRose={comp.hasRose}
                roseScale={comp.roseScale}
                isLeft={isLeft}
                smooth={smooth}
              />
            )
          })}
        </svg>
      )}
    </div>
  )
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║  STEM RENDERER                                              ║
   ║  The vine stem draws itself from top to bottom as you       ║
   ║  scroll through the entire page.                            ║
   ╚══════════════════════════════════════════════════════════════╝ */

function StemRenderer({
  d,
  progress,
}: {
  d: string
  progress: MotionValue<number>
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pathLength: progress }}
    />
  )
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║  FLORAL COMPOSITION                                         ║
   ║  A complete cluster: rose + outlined leaf + solid leaf       ║
   ║  + tendril + dot accents. Each piece animates independently ║
   ║  as scroll reaches its position on the page.                ║
   ╚══════════════════════════════════════════════════════════════╝ */

function FloralComposition({
  x,
  y,
  yFrac,
  hasRose,
  roseScale,
  isLeft,
  smooth,
}: {
  x: number
  y: number
  yFrac: number
  hasRose: boolean
  roseScale: number
  isLeft: boolean
  smooth: MotionValue<number>
}) {
  // The "draw" progress: 0→1 as scroll reaches this element
  const drawProgress = useTransform(
    smooth,
    [Math.max(0, yFrac - 0.12), Math.min(1, yFrac + 0.04)],
    [0, 1]
  )

  // Solid fills appear with a delay after outline starts drawing
  const fillReveal = useTransform(drawProgress, [0.3, 0.85], [0, 0.8])

  // Elements scale up as they're revealed
  const scaleIn = useTransform(drawProgress, [0, 0.6], [0, 1])

  const dir = isLeft ? 1 : -1

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* ── ROSE ── */}
      {hasRose && (
        <g transform={`scale(${roseScale})`}>
          {/* Solid petal fills — fade in after spiral starts */}
          <motion.g style={{ opacity: fillReveal, scale: fillReveal }}>
            {ROSE_PETALS.map((d, i) => (
              <path key={i} d={d} fill="currentColor" />
            ))}
          </motion.g>

          {/* Spiral outline — the mesmerizing drawing animation */}
          <motion.path
            d={ROSE_SPIRAL}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: drawProgress }}
          />

          {/* Center dot */}
          <motion.circle
            cx="0"
            cy="0"
            r="3"
            fill="currentColor"
            style={{ scale: scaleIn }}
          />
        </g>
      )}

      {/* ── FLOWER BUD (when no rose) ── */}
      {!hasRose && (
        <motion.g style={{ scale: scaleIn, opacity: scaleIn }}>
          {BUD_PETALS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="currentColor"
              style={{ opacity: fillReveal }}
            />
          ))}
        </motion.g>
      )}

      {/* ── OUTLINED LEAF — upper, with veins ── */}
      <motion.g
        transform={`translate(${-20 * dir}, -50) rotate(${isLeft ? -35 : 35})`}
        style={{ scale: scaleIn, opacity: scaleIn }}
      >
        <motion.path
          d={LEAF_CONTOUR}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: drawProgress }}
        />
        <motion.path
          d={LEAF_MAIN_VEIN}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          style={{ pathLength: drawProgress }}
        />
        <motion.path
          d={LEAF_SIDE_VEINS}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinecap="round"
          style={{ pathLength: drawProgress }}
        />
      </motion.g>

      {/* ── SOLID LEAF — lower, mirrored ── */}
      <motion.g
        transform={`translate(${15 * dir}, 45) rotate(${isLeft ? 140 : -140})`}
        style={{ scale: scaleIn, opacity: scaleIn }}
      >
        <motion.path
          d={SOLID_LEAF}
          fill="currentColor"
          style={{ opacity: fillReveal }}
        />
      </motion.g>

      {/* ── CURLING TENDRIL ── */}
      <motion.g
        transform={`translate(${28 * dir}, -15) rotate(${isLeft ? -15 : 15})`}
        style={{ scale: scaleIn, opacity: scaleIn }}
      >
        <motion.path
          d={isLeft ? TENDRIL_RIGHT : TENDRIL_LEFT}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          style={{ pathLength: drawProgress }}
        />
      </motion.g>

      {/* ── DOT ACCENTS ── */}
      <motion.g
        transform={`translate(${35 * dir}, 20)`}
        style={{ scale: scaleIn, opacity: scaleIn }}
      >
        <circle cx="0" cy="0" r="2.5" fill="currentColor" />
        <circle cx={7 * dir} cy="-6" r="1.8" fill="currentColor" />
        <circle cx={-4 * dir} cy="-10" r="1.3" fill="currentColor" />
      </motion.g>
    </g>
  )
}
