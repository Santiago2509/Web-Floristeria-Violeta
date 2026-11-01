import { readFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

// ============================================================================
// Descarga y prepara las fotos para el PDF: JPEG reducido (el PDF pesa poco)
// y compatible (react-pdf no admite WebP ni HEIC).
// ============================================================================

export type PdfImage = { data: Buffer; format: 'jpg' }

const MAX_WIDTH = 900
const TIMEOUT_MS = 12000
const CONCURRENCY = 6

// En Cloudinary pedimos ya la versión reducida (descarga más rápida)
function cloudinaryResized(url: string) {
  return url.includes('res.cloudinary.com') && url.includes('/upload/')
    ? url.replace('/upload/', `/upload/f_jpg,q_80,w_${MAX_WIDTH}/`)
    : url
}

async function fetchBytes(src: string, origin: string): Promise<Buffer> {
  // Archivos de /public: se leen del disco si están disponibles
  if (src.startsWith('/')) {
    try {
      return await readFile(path.join(process.cwd(), 'public', decodeURIComponent(src)))
    } catch {
      src = new URL(src, origin).toString()
    }
  }
  const res = await fetch(cloudinaryResized(src), { signal: AbortSignal.timeout(TIMEOUT_MS) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function toJpeg(bytes: Buffer): Promise<PdfImage> {
  const data = await sharp(bytes)
    .rotate() // respeta la orientación de las fotos del celular
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .flatten({ background: '#FFFFFF' }) // fondos transparentes → blanco
    .jpeg({ quality: 72, mozjpeg: true })
    .toBuffer()
  return { data, format: 'jpg' }
}

/** Carga todas las imágenes (de a varias a la vez). Las que fallen quedan como null. */
export async function loadImages(urls: string[], origin: string): Promise<Map<string, PdfImage | null>> {
  const unique = [...new Set(urls.filter(Boolean))]
  const result = new Map<string, PdfImage | null>()
  let next = 0

  async function worker() {
    while (next < unique.length) {
      const url = unique[next++]
      try {
        result.set(url, await toJpeg(await fetchBytes(url, origin)))
      } catch (err) {
        console.error('PDF: no se pudo cargar la imagen', url, err)
        result.set(url, null)
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, unique.length) }, worker))
  return result
}
