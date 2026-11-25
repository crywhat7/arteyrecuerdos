/**
 * Única fuente de verdad del negocio.
 * Si cambia el teléfono, la dirección, el horario o el dominio, se cambia AQUÍ.
 */

/** TODO: reemplazar por el dominio real cuando se compre. */
export const DOMINIO = 'https://arteyrecuerdo.hn';

export const NEGOCIO = {
  nombre: 'Arte y Recuerdo',
  nombreLegal: 'Arte y Recuerdo',
  descripcionCorta:
    'Taller de placas para lápidas, cruces de metal forjado, floreros y arreglos florales en Tegucigalpa.',

  // --- Contacto ---
  telefono: '+504 9751-3752',
  telefonoE164: '+50497513752',
  telefonoHref: 'tel:+50497513752',
  whatsapp: 'https://wa.me/50497513752',

  // --- NAP (debe ser idéntico en la web, Facebook y Google Business Profile) ---
  direccion: {
    calle: 'Col. La Travesía',
    ciudad: 'Tegucigalpa',
    departamento: 'Francisco Morazán',
    pais: 'Honduras',
    paisISO: 'HN',
  },
  /** TODO: pedir las coordenadas exactas del taller y completarlas. */
  geo: null as { lat: number; lng: number } | null,
  /** Mapa provisional: búsqueda por colonia. Cambiar por el enlace del taller. */
  mapaUrl: 'https://www.google.com/maps/search/?api=1&query=Col.+La+Traves%C3%ADa%2C+Tegucigalpa%2C+Honduras',
  mapaEmbed:
    'https://www.google.com/maps?q=Col.%20La%20Traves%C3%ADa,%20Tegucigalpa,%20Honduras&output=embed',

  // --- Redes ---
  /** TODO: confirmar la URL final de la página. */
  facebook: 'https://facebook.com/arteyrecuerdohn',

  // --- Horario ---
  horario: [
    { dias: 'Lunes a viernes', horas: '8:00 a. m. – 5:00 p. m.' },
    { dias: 'Sábado', horas: '8:00 a. m. – 12:00 m.' },
    { dias: 'Domingo', horas: 'Cerrado' },
  ],
  horarioSchema: [
    { dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], abre: '08:00', cierra: '17:00' },
    { dias: ['Saturday'], abre: '08:00', cierra: '12:00' },
  ],

  zonas: ['Tegucigalpa', 'Comayagüela', 'Valle de Ángeles', 'Santa Lucía', 'Francisco Morazán'],
} as const;

export const NAP_TEXTO = `${NEGOCIO.nombre} · ${NEGOCIO.direccion.calle}, ${NEGOCIO.direccion.ciudad}, ${NEGOCIO.direccion.departamento}, ${NEGOCIO.direccion.pais} · ${NEGOCIO.telefono}`;

/**
 * Arma un enlace de WhatsApp con un mensaje ya escrito.
 */
export function enlaceWhatsApp(mensaje?: string): string {
  if (!mensaje) return NEGOCIO.whatsapp;
  return `${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export const MENSAJES_WHATSAPP = {
  general: 'Buenos días. Me gustaría cotizar una placa para lápida, por favor.',
  marmol: 'Buenos días. Me gustaría cotizar una placa de mármol para lápida, por favor.',
  fotografia: 'Buenos días. Me gustaría cotizar una placa para lápida con fotografía, por favor.',
  aluminio: 'Buenos días. Me gustaría cotizar una placa de aluminio para lápida, por favor.',
  cruz: 'Buenos días. Me gustaría cotizar una cruz de metal para una tumba, por favor.',
  flores: 'Buenos días. Me gustaría cotizar un florero o un arreglo de flores para una lápida, por favor.',
};

export const NAV = [
  { texto: 'Placas de mármol', href: '/placas-de-marmol/' },
  { texto: 'Con fotografía', href: '/placas-con-fotografia/' },
  { texto: 'Aluminio', href: '/placas-de-aluminio/' },
  { texto: 'Cruces', href: '/cruces-de-metal/' },
  { texto: 'Floreros y flores', href: '/floreros-y-flores/' },
  { texto: 'Trabajos', href: '/trabajos/' },
  { texto: 'Cómo pedir', href: '/como-pedir/' },
  { texto: 'Contacto', href: '/contacto/' },
];
