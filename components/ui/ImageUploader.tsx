'use client'

import { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { UploadCloud, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploaderProps {
  name: string
}

export function ImageUploader({ name }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string>('')

  return (
    <div className="space-y-2">
      {/* Input oculto que envía el dato al form action de Next.js */}
      <input type="hidden" name={name} value={imageUrl} />
      
      <CldUploadWidget
        uploadPreset="violeta_preset"
        onSuccess={(result: any) => {
          if (result.info && result.info.secure_url) {
            setImageUrl(result.info.secure_url)
          }
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => open()}
                className={`w-full py-3 px-4 rounded-xl border-2 border-dashed transition-all flex items-center justify-center gap-2 text-sm font-medium
                  ${imageUrl 
                    ? 'border-green-500/50 bg-green-500/10 text-green-600 hover:bg-green-500/20' 
                    : 'border-[var(--theme-border)] bg-[var(--theme-bg)] hover:border-[var(--theme-primary)] text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)]'
                  }`}
              >
                {imageUrl ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    ¡Foto Subida con Éxito! (Clic para cambiar)
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-5 h-5" />
                    Subir Foto desde tu Computadora
                  </>
                )}
              </button>

              {imageUrl && (
                <div className="relative w-full h-32 rounded-xl overflow-hidden border border-[var(--theme-border)]">
                  <Image src={imageUrl} alt="Vista previa" fill className="object-cover" />
                </div>
              )}
            </div>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
