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

import { GalleryImage } from '@/types'

export const mockGaleria: GalleryImage[] = [
  { id: '1', imageUrl: 'https://picsum.photos/seed/flor1/800/1000', title: 'Boda', category: 'Eventos', createdAt: '2026-08-01T00:00:00Z' },
  { id: '2', imageUrl: 'https://picsum.photos/seed/flor2/800/800', title: 'Cumpleaños', category: 'Arreglos', createdAt: '2026-08-01T00:00:00Z' },
  { id: '3', imageUrl: 'https://picsum.photos/seed/flor3/800/1000', title: 'Aniversario', category: 'Cajas', createdAt: '2026-08-01T00:00:00Z' },
  { id: '4', imageUrl: 'https://picsum.photos/seed/flor4/800/800', title: 'Grado', category: 'Eventos', createdAt: '2026-08-01T00:00:00Z' },
  { id: '5', imageUrl: 'https://picsum.photos/seed/flor5/800/1000', title: 'Romance', category: 'Ramos', createdAt: '2026-08-01T00:00:00Z' },
  { id: '6', imageUrl: 'https://picsum.photos/seed/flor6/800/800', title: 'Primavera', category: 'Arreglos', createdAt: '2026-08-01T00:00:00Z' }
]
