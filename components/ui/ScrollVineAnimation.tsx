'use client'

import { useEffect, useRef } from 'react'
import { vineData } from './vineData'
import { useScroll, useMotionValueEvent } from 'framer-motion'

type VineLine = [d: string, color: string, width: number, t0: number, t1: number]
type VineGroup = [cx: number, cy: number, t0: number, t1: number, paths: [d: string, color: string][]]
type AnimatedLine = { el: SVGElement; t0: number; t1: number; v: number }
type AnimatedShape = AnimatedLine & { cx: number; cy: number }
type VineElements = { lines: AnimatedLine[]; shapes: AnimatedShape[] }

const clamp = (x: number) => x < 0 ? 0 : x > 1 ? 1 : x
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3)
const back = (x: number) => { const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2) }

// Actualiza el SVG según el progreso del scroll (fuera del componente: muta el DOM directamente)
function updateVine({ lines, shapes }: VineElements, latest: number) {
  for (const l of lines) {
    const v = clamp((latest - l.t0) / (l.t1 - l.t0))
    if (v === l.v) continue
    l.v = v
    l.el.setAttribute("opacity", v > 0 ? "1" : "0")
    l.el.setAttribute("stroke-dashoffset", (1 - easeOut(v)).toString())
  }
  for (const s of shapes) {
    const v = clamp((latest - s.t0) / (s.t1 - s.t0))
    if (v === s.v) continue
    s.v = v
    if (v <= 0) { s.el.setAttribute("opacity", "0"); continue }
    const k = .25 + .75 * back(v)
    s.el.setAttribute("opacity", clamp(v * 3).toString())
    s.el.setAttribute("transform", `translate(${s.cx} ${s.cy}) scale(${k}) translate(${-s.cx} ${-s.cy})`)
  }
}

export function ScrollVineAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const initialized = useRef(false)
  const elementsRef = useRef<VineElements>({ lines: [], shapes: [] })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 80%"]
  })

  useEffect(() => {
    if (!svgRef.current || initialized.current) return
    initialized.current = true

    const NS = "http://www.w3.org/2000/svg"
    const svg = svgRef.current
    const gLines = document.createElementNS(NS, "g")
    const gShapes = document.createElementNS(NS, "g")
    svg.append(gLines, gShapes)

    const mk = (t: string, a: Record<string, string | number>, p: SVGElement) => {
      const e = document.createElementNS(NS, t)
      for (const k in a) e.setAttribute(k, String(a[k]))
      p.appendChild(e)
      return e
    }

    const lines = (vineData.lines as unknown as VineLine[]).map(([d, c, w, t0, t1]) => ({
      el: mk("path", { 
        d, 
        pathLength: "1", 
        fill: "none", 
        stroke: c, 
        "stroke-width": w, 
        "stroke-linecap": "round", 
        "stroke-linejoin": "round", 
        "stroke-dasharray": "1", 
        "stroke-dashoffset": "1", 
        opacity: "0" 
      }, gLines),
      t0, t1, v: -1
    }))

    const shapes = (vineData.groups as unknown as VineGroup[]).map(([cx, cy, t0, t1, ps]) => {
      const g = mk("g", { opacity: "0" }, gShapes)
      ps.forEach(([d, c]) => mk("path", { d, fill: c, "fill-rule": "evenodd" }, g))
      return { el: g, cx, cy, t0, t1, v: -1 }
    })

    elementsRef.current = { lines, shapes }
  }, [])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    updateVine(elementsRef.current, latest)
  })

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <svg 
          ref={svgRef} 
          viewBox="0 0 1920 1080" 
          preserveAspectRatio="xMidYMid slice" 
          aria-hidden="true"
          className="w-full h-full absolute inset-0"
        />
      </div>
    </div>
  )
}
