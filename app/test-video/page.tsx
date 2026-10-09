import fs from 'fs'
import path from 'path'
import { ScrollSequence } from '@/components/video/ScrollSequence'

export const metadata = {
  title: 'Video Test | Floristería Violeta',
}

export default async function TestVideoPage() {
  // Leemos dinámicamente cuántos fotogramas existen realmente en la carpeta
  const framesDir = path.join(process.cwd(), 'public', 'assets', '_MConverter.eu_Vines_growing_on_violet_gradient_20261008190330')
  
  let frameFiles: string[] = []
  try {
    const files = fs.readdirSync(framesDir)
    // Filtramos solo los archivos .png y los ordenamos alfabéticamente
    frameFiles = files
      .filter(file => file.endsWith('.png'))
      .sort((a, b) => a.localeCompare(b))
      .map(file => `/assets/_MConverter.eu_Vines_growing_on_violet_gradient_20261008190330/${file}`)
  } catch (error) {
    console.error("Error reading frames directory", error)
  }

  return (
    <main className="w-full bg-[var(--theme-bg)]">
      
      {/* 1. Video a pantalla completa */}
      <section className="relative w-full h-screen">
        <video 
          src="/assets/videotest.webm" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Un pequeño gradiente abajo para suavizar la transición al canvas */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[var(--theme-bg)] to-transparent z-10" />
      </section>

      {/* 2. Sección del scroll con la secuencia de imágenes dinámica */}
      {frameFiles.length > 0 ? (
        <ScrollSequence frames={frameFiles} />
      ) : (
        <div className="h-screen flex items-center justify-center text-white">
          No se encontraron fotogramas
        </div>
      )}
      
    </main>
  )
}

