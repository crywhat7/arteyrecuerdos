import type { ImageMetadata } from 'astro';
import { MENSAJES_WHATSAPP } from './sitio';
import { porId } from './trabajos';

export type IconoProducto = 'libro' | 'retrato' | 'aluminio' | 'cruz' | 'florero';

export interface Producto {
  id: string;
  href: string;
  /** Nombre corto para tarjetas y navegación. */
  nombre: string;
  /** H1 de su página. */
  titulo: string;
  /** Frase de una línea para las tarjetas. */
  resumen: string;
  icono: IconoProducto;
  /**
   * Imagen de portada. `null` = todavía no hay foto real del taller y se
   * muestra un marcador diseñado.
   * TODO: foto real de placas de aluminio, cruces de metal, floreros y flores.
   */
  imagen: ImageMetadata | null;
  alt: string;
  mensajeWhatsApp: string;
  /** Opción de producto en el formulario de cotización. */
  opcionFormulario: string;
}

export const PRODUCTOS: Producto[] = [
  {
    id: 'marmol',
    href: '/placas-de-marmol/',
    nombre: 'Placas de mármol',
    titulo: 'Placas de mármol para lápidas',
    resumen: 'Mármol verde o negro con grabado dorado o plateado, en forma de libro o rectangular.',
    icono: 'libro',
    imagen: porId('placa-02').imagen,
    alt: 'Placa de mármol oscuro en forma de libro abierto con grabado dorado de una paloma, una rosa y un versículo.',
    mensajeWhatsApp: MENSAJES_WHATSAPP.marmol,
    opcionFormulario: 'Placa de mármol',
  },
  {
    id: 'fotografia',
    href: '/placas-con-fotografia/',
    nombre: 'Placas con fotografía',
    titulo: 'Placas para lápida con fotografía',
    resumen: 'Medallón ovalado o rectangular con la fotografía de su ser querido, incrustado en el mármol.',
    icono: 'retrato',
    imagen: porId('placa-07').imagen,
    alt: 'Placa de mármol verde con una fotografía rectangular a color, una cruz con manto y un ángel orando en grabado dorado.',
    mensajeWhatsApp: MENSAJES_WHATSAPP.fotografia,
    opcionFormulario: 'Placa con fotografía',
  },
  {
    id: 'aluminio',
    href: '/placas-de-aluminio/',
    nombre: 'Placas de aluminio',
    titulo: 'Placas de aluminio para lápidas',
    resumen: 'Una opción más liviana y económica, resistente a la intemperie del cementerio.',
    icono: 'aluminio',
    imagen: null, // TODO: foto real
    alt: 'Placa de aluminio para lápida',
    mensajeWhatsApp: MENSAJES_WHATSAPP.aluminio,
    opcionFormulario: 'Placa de aluminio',
  },
  {
    id: 'cruces',
    href: '/cruces-de-metal/',
    nombre: 'Cruces de metal',
    titulo: 'Cruces de metal para tumbas',
    resumen: 'Cruces de hierro forjado a mano, con detalles en dorado y acabado para exteriores.',
    icono: 'cruz',
    imagen: null, // TODO: foto real
    alt: 'Cruz de hierro forjado para tumba',
    mensajeWhatsApp: MENSAJES_WHATSAPP.cruz,
    opcionFormulario: 'Cruz de metal',
  },
  {
    id: 'floreros',
    href: '/floreros-y-flores/',
    nombre: 'Floreros y flores',
    titulo: 'Floreros y flores para lápida',
    resumen: 'Floreros de metal para fijar a la lápida y arreglos florales para acompañar la visita.',
    icono: 'florero',
    imagen: null, // TODO: foto real
    alt: 'Florero de metal para lápida con flores',
    mensajeWhatsApp: MENSAJES_WHATSAPP.flores,
    opcionFormulario: 'Florero o flores',
  },
];

export const productoPorId = (id: string) => PRODUCTOS.find((p) => p.id === id)!;

/** Enlazado interno: a cada producto le tocan otros dos. */
export function relacionados(id: string, cantidad = 2): Producto[] {
  const i = PRODUCTOS.findIndex((p) => p.id === id);
  return Array.from({ length: cantidad }, (_, n) => PRODUCTOS[(i + n + 1) % PRODUCTOS.length]);
}

export const OPCIONES_FORMULARIO = PRODUCTOS.map((p) => p.opcionFormulario).concat('No estoy seguro');
