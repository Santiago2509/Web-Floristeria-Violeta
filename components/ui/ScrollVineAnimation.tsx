'use client'

import { useEffect, useRef } from 'react'
import { vineData } from './vineData'
import { useScroll, useMotionValueEvent } from 'framer-motion'

export function ScrollVineAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const initialized = useRef(false)
  const elementsRef = useRef<{ lines: any[], shapes: any[] }>({ lines: [], shapes: [] })

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

    const mk = (t: string, a: Record<string, any>, p: SVGElement) => {
      const e = document.createElementNS(NS, t)
      for (const k in a) e.setAttribute(k, a[k])
      p.appendChild(e)
      return e
    }

    const lines = vineData.lines.map(([d, c, w, t0, t1]: any) => ({
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

    const shapes = vineData.groups.map(([cx, cy, t0, t1, ps]: any) => {
      const g = mk("g", { opacity: "0" }, gShapes)
      ps.forEach(([d, c]: any) => mk("path", { d, fill: c, "fill-rule": "evenodd" }, g))
      return { el: g, cx, cy, t0, t1, v: -1 }
    })

    elementsRef.current = { lines, shapes }
  }, [])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const { lines, shapes } = elementsRef.current
    const clamp = (x: number) => x < 0 ? 0 : x > 1 ? 1 : x
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3)
    const back = (x: number) => { const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2) }

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
