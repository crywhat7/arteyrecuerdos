/**
 * Genera, a partir de los assets originales:
 *   - public/favicon.ico, favicon.svg, apple-touch-icon.png, icon-192/512.png
 *   - public/marca/logo-arte-y-recuerdo.png  (para el JSON-LD)
 *   - public/og/*.jpg                        (1200×630, una por página)
 *
 *   node scripts/generar-marca.mjs
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const raiz = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const PROYECTO = path.resolve(raiz, '..');
const PUB = path.resolve(raiz, 'public');
const LOGO = path.join(PROYECTO, 'LogoArteYRecuerdo.jpeg');
const FOTOS = path.resolve(raiz, 'src/assets/trabajos');

await mkdir(path.join(PUB, 'og'), { recursive: true });
await mkdir(path.join(PUB, 'marca'), { recursive: true });

/* ------------------------------------------------------------------ *
 * 1. Iconos a partir del monograma real
 * ------------------------------------------------------------------ */
const mascara = (n) =>
  Buffer.from(`<svg width="${n}" height="${n}"><circle cx="${n / 2}" cy="${n / 2}" r="${n / 2}" fill="#fff"/></svg>`);

async function icono(tamano, salida, { recortar = true } = {}) {
  const base = sharp(LOGO).resize(tamano, tamano, { fit: 'cover' });
  const img = recortar
    ? base.composite([{ input: mascara(tamano), blend: 'dest-in' }])
    : base;
  await img.png().toFile(path.join(PUB, salida));
}

await icono(180, 'apple-touch-icon.png', { recortar: false }); // iOS ya recorta
await icono(192, 'icon-192.png');
await icono(512, 'icon-512.png');
await icono(512, 'marca/logo-arte-y-recuerdo.png');

// .ico: un PNG de 32×32 envuelto en cabecera ICO.
const png32 = await sharp(LOGO)
  .resize(32, 32, { fit: 'cover' })
  .composite([{ input: mascara(32), blend: 'dest-in' }])
  .png()
  .toBuffer();
const cab = Buffer.alloc(22);
cab.writeUInt16LE(0, 0);
cab.writeUInt16LE(1, 2);
cab.writeUInt16LE(1, 4);
cab.writeUInt8(32, 6);
cab.writeUInt8(32, 7);
cab.writeUInt8(0, 8);
cab.writeUInt8(0, 9);
cab.writeUInt16LE(1, 10);
cab.writeUInt16LE(32, 12);
cab.writeUInt32LE(png32.length, 14);
cab.writeUInt32LE(22, 18);
await writeFile(path.join(PUB, 'favicon.ico'), Buffer.concat([cab, png32]));

// SVG vectorial del monograma (usa una serif del sistema a 16 px).
await writeFile(
  path.join(PUB, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="p" cx="26%" cy="18%" r="92%">
      <stop offset="0%" stop-color="#232020"/><stop offset="55%" stop-color="#0f0e0d"/><stop offset="100%" stop-color="#070707"/>
    </radialGradient>
    <linearGradient id="o" x1="8%" y1="0%" x2="92%" y2="100%">
      <stop offset="0%" stop-color="#a9823a"/><stop offset="38%" stop-color="#e6c77a"/><stop offset="62%" stop-color="#c9a24a"/><stop offset="100%" stop-color="#8c6a2b"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#p)"/>
  <circle cx="50" cy="50" r="47.5" fill="none" stroke="url(#o)" stroke-width="1.6"/>
  <text x="50" y="50" text-anchor="middle" dominant-baseline="central" font-family="Georgia,'Times New Roman',serif" font-size="58" letter-spacing="-3" fill="url(#o)">AR</text>
  <g fill="url(#o)"><rect x="37.2" y="33" width="2" height="25"/><rect x="31.5" y="40.4" width="13.4" height="1.9"/></g>
</svg>\n`
);

/* ------------------------------------------------------------------ *
 * 2. Imágenes Open Graph (1200×630)
 * ------------------------------------------------------------------ */
const A = 1200;
const AL = 630;

const esc = (t) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Divide un titular en líneas de como mucho `max` caracteres. */
function lineas(texto, max = 22) {
  const out = [];
  let linea = '';
  for (const palabra of texto.split(' ')) {
    if ((linea + ' ' + palabra).trim().length > max && linea) {
      out.push(linea);
      linea = palabra;
    } else {
      linea = (linea + ' ' + palabra).trim();
    }
  }
  if (linea) out.push(linea);
  return out.slice(0, 3);
}

function capa(titulo) {
  const ls = lineas(titulo);
  const alto = ls.length * 76;
  const y0 = 330 - alto / 2 + 58;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${A}" height="${AL}">
  <defs>
    <linearGradient id="v" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.98"/>
      <stop offset="52%" stop-color="#0a0a0a" stop-opacity="0.92"/>
      <stop offset="78%" stop-color="#0a0a0a" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.35"/>
    </linearGradient>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a9823a"/><stop offset="45%" stop-color="#e6c77a"/><stop offset="100%" stop-color="#c9a24a"/>
    </linearGradient>
  </defs>
  <rect width="${A}" height="${AL}" fill="url(#v)"/>
  <rect x="0" y="0" width="${A}" height="6" fill="url(#g)"/>
  <text x="72" y="118" font-family="Helvetica,Arial,sans-serif" font-size="21" letter-spacing="7" fill="#e8cf8d">ARTE Y RECUERDO</text>
  <rect x="72" y="146" width="120" height="2" fill="url(#g)"/>
  ${ls
    .map(
      (l, i) =>
        `<text x="72" y="${y0 + i * 76}" font-family="Georgia,'Times New Roman',serif" font-size="66" fill="#f2ece1">${esc(l)}</text>`
    )
    .join('\n  ')}
  <text x="72" y="552" font-family="Helvetica,Arial,sans-serif" font-size="24" fill="#b8b0a4">Tegucigalpa, Honduras</text>
  <text x="72" y="588" font-family="Helvetica,Arial,sans-serif" font-size="25" font-weight="bold" fill="#e8cf8d">WhatsApp 9751-3752</text>
</svg>`);
}

const PAGINAS = [
  { salida: 'inicio.jpg', foto: 'placa-02.jpg', titulo: 'Placas para lápidas en Tegucigalpa' },
  { salida: 'placas-de-marmol.jpg', foto: 'placa-02.jpg', titulo: 'Placas de mármol para lápidas' },
  { salida: 'placas-con-fotografia.jpg', foto: 'placa-07.jpg', titulo: 'Placas con fotografía' },
  { salida: 'placas-de-aluminio.jpg', foto: 'placa-09.jpg', titulo: 'Placas de aluminio' },
  { salida: 'cruces-de-metal.jpg', foto: 'placa-01.jpg', titulo: 'Cruces de metal para tumbas' },
  { salida: 'floreros-y-flores.jpg', foto: 'placa-05.jpg', titulo: 'Floreros y flores para lápida' },
  { salida: 'trabajos.jpg', foto: 'placa-08.jpg', titulo: 'Trabajos realizados' },
  { salida: 'como-pedir.jpg', foto: 'placa-03.jpg', titulo: 'Cómo pedir su placa' },
  { salida: 'contacto.jpg', foto: 'placa-05.jpg', titulo: 'Contacto y ubicación' },
];

for (const p of PAGINAS) {
  const fondo = await sharp(path.join(FOTOS, p.foto))
    // Se difumina y se oscurece a propósito: la placa debe leerse como
    // textura, nunca como el nombre de una persona fallecida.
    .resize(A, AL, { fit: 'cover', position: 'centre' })
    .blur(3.2)
    .modulate({ brightness: 0.62 })
    .toBuffer();

  await sharp(fondo)
    .composite([{ input: capa(p.titulo), top: 0, left: 0 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(PUB, 'og', p.salida));

  console.log(`✔ og/${p.salida}`);
}

console.log('✔ iconos y manifiesto listos');
