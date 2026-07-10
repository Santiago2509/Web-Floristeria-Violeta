export interface Producto {
  id: string
  nombre: string
  precio: number
  mostrar_precio: boolean
  categoria: string
  imagen_url: string
  destacado: boolean
  activo: boolean
  orden: number
}

export const mockProductos: Producto[] = [
  {
    id: '1',
    nombre: 'Romance de Peonías',
    precio: 150000,
    mostrar_precio: true,
    categoria: 'Bouquets',
    imagen_url: 'https://picsum.photos/seed/flor1/600/800',
    destacado: true,
    activo: true,
    orden: 1,
  },
  {
    id: '2',
    nombre: 'Elegancia en Caja',
    precio: 220000,
    mostrar_precio: true,
    categoria: 'Cajas Florales',
    imagen_url: 'https://picsum.photos/seed/flor2/600/600',
    destacado: true,
    activo: true,
    orden: 2,
  },
  {
    id: '3',
    nombre: 'Orquídea Imperial',
    precio: 180000,
    mostrar_precio: false,
    categoria: 'Plantas',
    imagen_url: 'https://picsum.photos/seed/flor3/600/800',
    destacado: true,
    activo: true,
    orden: 3,
  },
  {
    id: '4',
    nombre: 'Amor Eterno (Rosas Rojas)',
    precio: 95000,
    mostrar_precio: true,
    categoria: 'Clásicos',
    imagen_url: 'https://picsum.photos/seed/flor4/600/600',
    destacado: true,
    activo: true,
    orden: 4,
  },
  {
    id: '5',
    nombre: 'Primavera Silvestre',
    precio: 135000,
    mostrar_precio: true,
    categoria: 'Especiales',
    imagen_url: 'https://picsum.photos/seed/flor5/600/800',
    destacado: true,
    activo: true,
    orden: 5,
  },
  {
    id: '6',
    nombre: 'Tulipanes de Holanda',
    precio: 210000,
    mostrar_precio: true,
    categoria: 'Exóticos',
    imagen_url: 'https://picsum.photos/seed/flor6/600/600',
    destacado: true,
    activo: true,
    orden: 6,
  }
]

export const mockGaleria = [
  { id: '1', imagen_url: 'https://picsum.photos/seed/flor1/800/1000', orden: 1 },
  { id: '2', imagen_url: 'https://picsum.photos/seed/flor2/800/800', orden: 2 },
  { id: '3', imagen_url: 'https://picsum.photos/seed/flor3/800/1000', orden: 3 },
  { id: '4', imagen_url: 'https://picsum.photos/seed/flor4/800/800', orden: 4 },
  { id: '5', imagen_url: 'https://picsum.photos/seed/flor5/800/1000', orden: 5 },
  { id: '6', imagen_url: 'https://picsum.photos/seed/flor6/800/800', orden: 6 }
]
