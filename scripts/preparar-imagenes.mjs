/**
 * Prepara las fotos reales del taller para la web.
 *
 * Lee `../assets/trabajos` (originales, nunca se modifican) y escribe
 * `src/assets/trabajos` (versiones enderezadas / rotadas / recortadas).
 *
 * Solo se corrige orientación y encuadre: no se retoca el contenido.
 *
 *   node scripts/preparar-imagenes.mjs
 */
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const raiz = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const ORIGEN = path.resolve(raiz, '../assets/trabajos');
const DESTINO = path.resolve(raiz, 'src/assets/trabajos');

/** Recorte en porcentaje del ancho/alto: [izq, arriba, der, abajo] */
const AJUSTES = {
  'placa-01': { girar: 1.4, recorte: [5, 6, 5, 6] }, // venía levemente inclinada
  'placa-02': { recorte: [1, 1, 1, 1] },
  'placa-03': { recorte: [1, 1, 1, 1] },
  'placa-04': { girar: -90, recorte: [2, 2, 2, 2] }, // venía rotada 90°
  'placa-05': { recorte: [2, 2, 2, 3] },
  'placa-06': { girar: -90, recorte: [2, 2, 2, 2] }, // venía rotada 90°
  'placa-07': { recorte: [1, 1, 1, 1] },
  'placa-08': { recorte: [1, 1, 1, 1] },
  'placa-09': { recorte: [1, 1, 1, 1] },
};

await mkdir(DESTINO, { recursive: true });

const archivos = (await readdir(ORIGEN)).filter((f) => /\.jpe?g$/i.test(f)).sort();

for (const archivo of archivos) {
  const nombre = path.basename(archivo, path.extname(archivo));
  const ajuste = AJUSTES[nombre] ?? { recorte: [0, 0, 0, 0] };

  let img = sharp(path.join(ORIGEN, archivo)).rotate(); // respeta EXIF
  if (ajuste.girar) {
    img = sharp(await img.rotate(ajuste.girar, { background: '#0b0b0b' }).toBuffer());
  }

  const meta = await img.metadata();
  const [i, a, d, b] = ajuste.recorte;
  const left = Math.round((meta.width * i) / 100);
  const top = Math.round((meta.height * a) / 100);
  const width = meta.width - left - Math.round((meta.width * d) / 100);
  const height = meta.height - top - Math.round((meta.height * b) / 100);

  const salida = path.join(DESTINO, `${nombre}.jpg`);
  await img
    .extract({ left, top, width, height })
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(salida);

  console.log(`✔ ${nombre}  ${meta.width}×${meta.height} → ${width}×${height}`);
}
