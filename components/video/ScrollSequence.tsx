'use client'

import { useRef, useEffect } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

export function ScrollSequence({ frames }: { frames: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Guardamos las imágenes pre-cargadas en un ref
  const imagesRef = useRef<HTMLImageElement[]>([])

  // Precargar las imágenes de la secuencia
  useEffect(() => {
    frames.forEach((frameSrc, i) => {
      const img = new window.Image()
      img.src = frameSrc
      imagesRef.current[i] = img
    })

    // Configurar el canvas inicial
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Dibujar el primer frame una vez que cargue
      const firstImg = imagesRef.current[0]
      if (firstImg) {
        firstImg.onload = () => {
          renderFrame(0)
        }
      }
    }
    
    // Ajustar el canvas si cambia el tamaño de la ventana
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // Forzar repintado del frame actual
        if (lastFrameRef.current !== undefined) renderFrame(lastFrameRef.current)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [frames])

  const lastFrameRef = useRef(0)

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    if (canvas && img && img.complete) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Simular object-cover
        const ratio = Math.max(canvas.width / img.width, canvas.height / img.height)
        const x = (canvas.width - img.width * ratio) / 2
        const y = (canvas.height - img.height * ratio) / 2
        
        ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio)
      }
    }
    lastFrameRef.current = index
  }

  // Interceptar el progreso del scroll del contenedor
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Cada vez que cambia el scroll, pintamos el frame correspondiente
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Mapear el 0-1 del scroll a los índices de los frames (0 a frames.length - 1)
    if (frames.length > 0) {
      const frameIndex = Math.min(frames.length - 1, Math.floor(latest * frames.length))
      renderFrame(frameIndex)
    }
  })

  return (
    <section ref={containerRef} className="relative w-full h-[500vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas 
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>
    </section>
  )
}
