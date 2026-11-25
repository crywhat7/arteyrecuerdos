import type { ImageMetadata } from 'astro';

import placa01 from '../assets/trabajos/placa-01.jpg';
import placa02 from '../assets/trabajos/placa-02.jpg';
import placa03 from '../assets/trabajos/placa-03.jpg';
import placa04 from '../assets/trabajos/placa-04.jpg';
import placa05 from '../assets/trabajos/placa-05.jpg';
import placa06 from '../assets/trabajos/placa-06.jpg';
import placa07 from '../assets/trabajos/placa-07.jpg';
import placa08 from '../assets/trabajos/placa-08.jpg';
import placa09 from '../assets/trabajos/placa-09.jpg';

/**
 * Temas de iconografía. Se usan para filtrar la galería.
 */
export const TEMAS = [
  { id: 'fe', nombre: 'Fe y versículos' },
  { id: 'palomas', nombre: 'Palomas' },
  { id: 'angeles', nombre: 'Ángeles' },
  { id: 'manos', nombre: 'Manos orando' },
  { id: 'rosas', nombre: 'Rosas y flores' },
  { id: 'fotografia', nombre: 'Con fotografía' },
] as const;

export type TemaId = (typeof TEMAS)[number]['id'];

export interface Trabajo {
  id: string;
  imagen: ImageMetadata;
  /** Descriptivo del trabajo. Nunca incluye el nombre de la persona fallecida. */
  alt: string;
  temas: TemaId[];
  material: 'mármol verde' | 'mármol negro';
  acabado: 'dorado' | 'plateado';
  forma: 'libro abierto' | 'rectangular';
}

export const TRABAJOS: Trabajo[] = [
  {
    id: 'placa-02',
    imagen: placa02,
    alt: 'Placa de mármol oscuro con libro abierto grabado en dorado, una rosa, una paloma con ramo de olivo y el Salmo 23:1.',
    temas: ['fe', 'palomas', 'rosas'],
    material: 'mármol negro',
    acabado: 'dorado',
    forma: 'libro abierto',
  },
  {
    id: 'placa-01',
    imagen: placa01,
    alt: 'Placa de mármol verde con libro abierto, un ángel con trompeta, manos orando y el versículo de San Juan 11:25-26, todo grabado en dorado.',
    temas: ['fe', 'angeles', 'manos'],
    material: 'mármol verde',
    acabado: 'dorado',
    forma: 'rectangular',
  },
  {
    id: 'placa-05',
    imagen: placa05,
    alt: 'Placa de mármol verde con un ángel orando, una paloma, libro abierto con el Salmo 23:1-2 y bordes ornamentales en dorado.',
    temas: ['fe', 'angeles', 'palomas'],
    material: 'mármol verde',
    acabado: 'dorado',
    forma: 'rectangular',
  },
  {
    id: 'placa-07',
    imagen: placa07,
    alt: 'Placa de mármol verde con fotografía rectangular a color, una cruz con manto, un ángel orando y grabado dorado.',
    temas: ['fotografia', 'angeles', 'fe'],
    material: 'mármol verde',
    acabado: 'dorado',
    forma: 'rectangular',
  },
  {
    id: 'placa-08',
    imagen: placa08,
    alt: 'Placa de mármol negro en forma de libro abierto con grabado plateado: manos orando, una paloma y el versículo de San Juan 11:25.',
    temas: ['fe', 'palomas', 'manos'],
    material: 'mármol negro',
    acabado: 'plateado',
    forma: 'libro abierto',
  },
  {
    id: 'placa-04',
    imagen: placa04,
    alt: 'Placa de mármol verde con fotografía ovalada, un crucifijo, un rosario, libro abierto con Gálatas 2:20 y esquinas ornamentales doradas.',
    temas: ['fotografia', 'fe'],
    material: 'mármol verde',
    acabado: 'dorado',
    forma: 'rectangular',
  },
  {
    id: 'placa-03',
    imagen: placa03,
    alt: 'Dos placas de mármol verde: una rectangular con cruz y paloma, y otra en forma de libro abierto con paloma y manos orando, grabadas en dorado.',
    temas: ['fe', 'palomas', 'manos'],
    material: 'mármol verde',
    acabado: 'dorado',
    forma: 'libro abierto',
  },
  {
    id: 'placa-09',
    imagen: placa09,
    alt: 'Dos placas rectangulares de mármol verde con cruz y paloma grabadas en dorado, con los versículos de Filipenses 1:21 y San Juan 11:25.',
    temas: ['fe', 'palomas'],
    material: 'mármol verde',
    acabado: 'dorado',
    forma: 'rectangular',
  },
  {
    id: 'placa-06',
    imagen: placa06,
    alt: 'Placa de mármol verde con fotografía ovalada, crucifijo, libro abierto con el Salmo 23:4 y esquinas ornamentales en dorado.',
    temas: ['fotografia', 'fe'],
    material: 'mármol verde',
    acabado: 'dorado',
    forma: 'rectangular',
  },
];

export const porId = (id: string) => TRABAJOS.find((t) => t.id === id)!;

/** Selección para la galería destacada del inicio. */
export const DESTACADOS = ['placa-02', 'placa-01', 'placa-07', 'placa-08', 'placa-05', 'placa-03'].map(porId);
