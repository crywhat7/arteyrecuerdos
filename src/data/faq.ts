export interface Pregunta {
  pregunta: string;
  /** Texto plano: se usa igual en la página y en el JSON-LD de FAQPage. */
  respuesta: string;
}

/** FAQ corta del inicio. */
export const FAQ_INICIO: Pregunta[] = [
  {
    pregunta: '¿Cuánto tiempo tarda una placa?',
    // TODO: confirmar tiempos reales con el cliente y escribirlos aquí.
    respuesta:
      'Depende del diseño, del material y de la carga de trabajo del taller. Escríbanos por WhatsApp con lo que tiene pensado y le damos una fecha estimada el mismo día.',
  },
  {
    pregunta: '¿Puedo poner una fotografía en la placa?',
    respuesta:
      'Sí. Colocamos un medallón con la fotografía, ovalado o rectangular, incrustado en el mármol. Usted nos envía la foto por WhatsApp y nosotros la preparamos.',
  },
  {
    pregunta: '¿Qué información necesitan para empezar?',
    respuesta:
      'El nombre completo de su ser querido, la fecha de nacimiento y la de fallecimiento, la frase o el versículo que desea, y la fotografía si quiere incluirla. Con eso le preparamos el diseño.',
  },
  {
    pregunta: '¿Puedo ver el diseño antes de que la fabriquen?',
    respuesta:
      'Siempre. Le mostramos el diseño completo y no empezamos a fabricar hasta que usted lo apruebe. Si quiere cambiar algo, lo cambiamos sin costo.',
  },
];

/** FAQ completa de /como-pedir/. */
export const FAQ_COMPLETA: Pregunta[] = [
  ...FAQ_INICIO,
  {
    pregunta: '¿Qué materiales manejan?',
    respuesta:
      'Mármol verde y mármol negro para las placas de mayor duración, y aluminio cuando se busca una opción más liviana y económica. El grabado puede ir en dorado o en plateado.',
  },
  {
    pregunta: '¿Hacen envíos o instalación?',
    // TODO: confirmar con el cliente si hacen envíos fuera de Tegucigalpa e instalación en el cementerio.
    respuesta:
      'Atendemos Tegucigalpa, Comayagüela y alrededores. Por favor consúltenos por WhatsApp para confirmar la entrega o la instalación en su caso.',
  },
  {
    pregunta: '¿Cuánto cuesta una placa?',
    respuesta:
      'El precio depende del material, del tamaño, de la forma y de los detalles que lleve. Cotizamos sin compromiso: escríbanos por WhatsApp y le damos el precio exacto de lo que usted necesita.',
  },
  {
    pregunta: '¿Cómo se cuida una placa de mármol?',
    respuesta:
      'Basta con limpiarla con un paño suave y agua. No use cloro, ácidos ni cepillos de metal, porque pueden opacar el pulido del mármol y el grabado.',
  },
];
