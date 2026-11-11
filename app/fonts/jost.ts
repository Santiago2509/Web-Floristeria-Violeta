import localFont from 'next/font/local'

// Tipografía geométrica similar a la del letrero de referencia (estilo Futura).
// Archivos estáticos (no variables): sin trazos superpuestos al dibujar el contorno de las letras.
export const jost = localFont({
  src: [
    { path: './jost-latin-300-normal.woff2', weight: '300' },
    { path: './jost-latin-400-normal.woff2', weight: '400' },
    { path: './jost-latin-500-normal.woff2', weight: '500' },
    { path: './jost-latin-600-normal.woff2', weight: '600' },
  ],
  variable: '--font-jost',
  display: 'swap',
})
