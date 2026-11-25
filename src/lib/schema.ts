import { DOMINIO, NEGOCIO } from '../data/sitio';
import type { Pregunta } from '../data/faq';

const abs = (ruta: string) => new URL(ruta, DOMINIO).href;

export const ID_NEGOCIO = `${DOMINIO}/#negocio`;

export function localBusiness() {
  return {
    '@type': 'LocalBusiness',
    '@id': ID_NEGOCIO,
    name: NEGOCIO.nombre,
    description: NEGOCIO.descripcionCorta,
    url: `${DOMINIO}/`,
    image: abs('/og/inicio.jpg'),
    logo: abs('/marca/logo-arte-y-recuerdo.png'),
    telephone: NEGOCIO.telefonoE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: NEGOCIO.direccion.calle,
      addressLocality: NEGOCIO.direccion.ciudad,
      addressRegion: NEGOCIO.direccion.departamento,
      addressCountry: NEGOCIO.direccion.paisISO,
    },
    // TODO: añadir "geo" con las coordenadas exactas del taller.
    ...(NEGOCIO.geo
      ? { geo: { '@type': 'GeoCoordinates', latitude: NEGOCIO.geo.lat, longitude: NEGOCIO.geo.lng } }
      : {}),
    openingHoursSpecification: NEGOCIO.horarioSchema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dias,
      opens: h.abre,
      closes: h.cierra,
    })),
    areaServed: NEGOCIO.zonas.map((z) => ({ '@type': 'Place', name: z })),
    sameAs: [NEGOCIO.facebook],
    knowsLanguage: 'es-HN',
    // "priceRange" se omite a propósito: el taller no publica precios.
  };
}

export function servicio(nombre: string, descripcion: string, url: string, imagen?: string) {
  return {
    '@type': 'Service',
    name: nombre,
    description: descripcion,
    serviceType: nombre,
    url: abs(url),
    ...(imagen ? { image: abs(imagen) } : {}),
    provider: { '@id': ID_NEGOCIO },
    areaServed: NEGOCIO.zonas.map((z) => ({ '@type': 'Place', name: z })),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: NEGOCIO.whatsapp,
      servicePhone: { '@type': 'ContactPoint', telephone: NEGOCIO.telefonoE164, contactType: 'customer service' },
    },
  };
}

export function faqPage(preguntas: Pregunta[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: preguntas.map((p) => ({
      '@type': 'Question',
      name: p.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
    })),
  };
}

export interface Miga {
  nombre: string;
  href: string;
}

export function breadcrumbs(migas: Miga[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: migas.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.nombre,
      item: abs(m.href),
    })),
  };
}

export function grafo(nodos: object[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodos });
}
