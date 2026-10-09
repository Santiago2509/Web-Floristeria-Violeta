'use client'

import { useRef, useEffect, useState } from 'react'

interface Props {
  frames: string[]
}

export function ScrollSequenceBg({ frames }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const lastFrameRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!frames.length) return

    // Pre-cargar todos los fotogramas en paralelo
    frames.forEach((src, i) => {
      const img = new window.Image()
      img.src = src
      imagesRef.current[i] = img
    })

    const canvas = canvasRef.current
    if (!canvas) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      renderFrame(lastFrameRef.current)
    }
    updateCanvasSize()

    // Pintar el primer frame cuando cargue
    const firstImg = imagesRef.current[0]
    if (firstImg) firstImg.onload = () => renderFrame(0)

    const handleScroll = () => {
      const container = containerRef.current
      if (!container || !frames.length) return

      const rect = container.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight

      // Canvas activo cuando la sección entra en pantalla
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      setIsVisible(inView)

      if (!inView || totalScrollable <= 0) return

      // Progreso del scroll dentro de la sección (0 → 1)
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable))
      const idx = Math.min(frames.length - 1, Math.floor(progress * frames.length))
      renderFrame(idx)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateCanvasSize)
    // Llamada inicial para setear estado
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [frames])

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // Simular object-cover
    const ratio = Math.max(canvas.width / img.width, canvas.height / img.height)
    const x = (canvas.width - img.width * ratio) / 2
    const y = (canvas.height - img.height * ratio) / 2
    ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio)
    lastFrameRef.current = index
  }

  return (
    <>
      {/*
        Canvas FIXED: flota sobre toda la pantalla pero solo cuando la sección está en view.
        No le afecta overflow-hidden del padre porque es fixed (sale del flujo normal).
      */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen pointer-events-none transition-opacity duration-500"
        style={{
          zIndex: 1,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/*
        Contenedor referencia: ocupa todo el espacio de las secciones inferiores.
        Su altura determina cuánto scroll hay disponible para avanzar los fotogramas.
        Necesita ser "relativo" para que el z-10 del contenido funcione encima del canvas fixed.
      */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
    </>
  )
}


