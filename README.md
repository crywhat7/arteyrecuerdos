# Arte y Recuerdo — sitio web

Sitio estático en **Astro** para el taller **Arte y Recuerdo** (Col. La Travesía, Tegucigalpa):
placas para lápida de mármol y aluminio, placas con fotografía, cruces de metal forjado, floreros
y arreglos florales.

Sin backend: el formulario de cotización arma un mensaje y abre WhatsApp.

---

## Comandos

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `http://localhost:4321`. |
| `npm run build` | Compila el sitio estático a `dist/`. |
| `npm run preview` | Sirve `dist/` tal como quedará en producción. |
| `npm run imagenes` | Reprocesa las fotos de `../assets/trabajos` → `src/assets/trabajos` (endereza, rota y recorta). |
| `npm run marca` | Regenera favicons, `apple-touch-icon`, logo del JSON-LD y las imágenes Open Graph. |
| `npm run assets` | Los dos anteriores, en orden. |
| `npm run lighthouse` | Audita todas las páginas en móvil contra el servidor de preview. |

Los dos scripts de assets solo hay que volver a correrlos cuando lleguen **fotos nuevas**; sus
resultados ya están versionados en `src/assets/` y `public/`.

---

## Despliegue

El resultado es HTML estático, así que sirve cualquier hosting de sitios estáticos.

| Plataforma | Build command | Output directory |
|---|---|---|
| **Cloudflare Pages** | `npm run build` | `dist` |
| **Netlify** | `npm run build` | `dist` |
| **Vercel** | `npm run build` | `dist` (framework: Astro) |

Si el repositorio se conecta con la raíz del proyecto (`ArteYRecuerdosProject/`), hay que fijar el
**root directory** en `web/`.

**Antes de publicar:** cambiar el dominio en `src/data/sitio.ts` (constante `DOMINIO`) y en
`public/robots.txt`. Es el único lugar donde está escrito.

---

## Dónde se cambia cada cosa

Todo el contenido variable está centralizado. No hace falta tocar componentes para actualizar el
negocio.

| Archivo | Contiene |
|---|---|
| `src/data/sitio.ts` | **Dominio, teléfono, WhatsApp, dirección, horario, Facebook, zonas que atienden, menú.** Es la única fuente de verdad del NAP. |
| `src/data/productos.ts` | Los cinco productos: nombre, ruta, resumen, imagen de portada, mensaje de WhatsApp y opción del formulario. |
| `src/data/trabajos.ts` | La galería: imagen, texto alternativo, temas, material, acabado y forma de cada placa. |
| `src/data/faq.ts` | Las preguntas frecuentes (alimentan la página y el JSON-LD `FAQPage` a la vez). |
| `src/styles/global.css` | Paleta, tipografías, escala tipográfica, curvas de animación. |

Para **sustituir un marcador por una foto real** basta con dejar la foto en
`src/assets/trabajos/` e importarla en `src/data/productos.ts` (`imagen: …` en lugar de `null`).

---

## Decisiones de diseño

- **Dirección de arte** tomada del banner y los posts del cliente: mármol negro, oro y el verde de
  las placas. Negro `#0b0b0b` (nunca `#000`), oro `#c9a24a` / `#e6c77a`, marfil `#f5f1e8`.
- **Tipografía:** Cormorant Garamond (titulares), Instrument Sans (cuerpo e interfaz) y Great Vibes
  solo para el wordmark. Las tres son **self-hosted** en `public/fuentes/` con el subconjunto
  latino; la del wordmark está reducida a las 11 letras de «Arte y Recuerdo» (6 KB).
- **El momento distintivo** es la sección «forma de libro abierto»: la maqueta de dos páginas con
  filo dorado reproduce la placa más pedida del taller en HTML, no en una imagen.
- **Movimiento deliberadamente sobrio.** El público llega en un momento difícil y casi siempre desde
  el celular: entrada escalonada del héroe por CSS, revelado por `IntersectionObserver` y nada más.
  No se usó una librería de *smooth scroll* a propósito — habría costado JS y se habría sentido
  fuera de tono. Todo respeta `prefers-reduced-motion`.
- **Privacidad:** las placas muestran nombres reales de personas fallecidas, así que **ningún
  nombre aparece en textos, `alt`, títulos, slugs ni metadatos**, y las imágenes Open Graph llevan
  la foto desenfocada para que no se lean.
- **Fotos retocadas solo en encuadre:** `placa-04` y `placa-06` venían rotadas 90°, `placa-01`
  inclinada. El script `preparar-imagenes.mjs` lo corrige sin alterar el contenido y los originales
  de `../assets/trabajos` nunca se modifican.
- `assets/referencia-flyer-viejo/flyer-actual.jpg` **no se usa** en el sitio (tiene errores de
  ortografía y cruces que el cliente descartó).

---

## Resultados de Lighthouse

Build de producción (`npm run preview`), **perfil móvil**, Lighthouse 13.6:

| Ruta | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| `/placas-de-marmol/` | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| `/placas-con-fotografia/` | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| `/placas-de-aluminio/` | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| `/cruces-de-metal/` | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| `/floreros-y-flores/` | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| `/trabajos/` | **99** | 100 | 100 | 100 | 2.1 s | 0 | 0 ms |
| `/como-pedir/` | 100 | 100 | 100 | 100 | 1.5 s | 0 | 0 ms |
| `/contacto/` | 100 | 100 | 100 | 100 | 1.4 s | 0 | 0 ms |

`/trabajos/` se queda en 99 porque carga las nueve fotografías de la galería; es el único punto
donde el LCP pasa de un segundo. Reproducible con `npm run lighthouse`.

---

## SEO

### Lo que ya está hecho en el código

- `<html lang="es-HN">`, `<title>` y `meta description` únicos por página, `canonical` absoluto.
- Open Graph y Twitter Card con imagen propia de 1200×630 por página (`public/og/`) y
  `og:locale = es_HN`.
- Un solo `<h1>` por página y jerarquía correcta de `h2`/`h3`.
- Texto real de 320 a 430 palabras en cada página de producto.
- Enlazado interno: cada producto enlaza a otros dos, a `/trabajos/` y a `/como-pedir/`.
- `alt` descriptivo en todas las imágenes, sin nombres de personas.
- URLs en minúscula, con guiones y sin tildes; `trailingSlash: 'always'`.
- `sitemap-index.xml` + `sitemap-0.xml` generados en el build, y `robots.txt` que los apunta.
- Favicon completo (`.ico`, `.svg`, `apple-touch-icon`, `icon-192`, `icon-512`) y
  `site.webmanifest`, generados desde el monograma AR real.
- Página `404` propia, con `noindex, follow` y atajos a todas las secciones.

### Datos estructurados (JSON-LD)

Un solo bloque `@graph` por página, desde `src/lib/schema.ts`:

| Tipo | Dónde |
|---|---|
| `LocalBusiness` | Todas las páginas (nombre, teléfono, dirección, horario, `areaServed`, `sameAs`). |
| `Service` | Las cinco páginas de producto. |
| `FAQPage` | Inicio y `/como-pedir/`. |
| `BreadcrumbList` | Todas las páginas internas, con migas visibles. |

Se omite `priceRange` a propósito (el taller no publica precios) y `geo` queda pendiente de las
coordenadas exactas.

**Validación:** todos los bloques parsean como JSON válido y se comprobó la estructura del grafo
durante el build. Falta pasarlos por el
[Rich Results Test](https://search.google.com/test/rich-results) cuando el sitio esté publicado en
su dominio: la herramienta necesita una URL pública y no acepta `localhost`.

### Checklist fuera del código (para el cliente)

- [ ] Comprar el dominio y actualizarlo en `src/data/sitio.ts` y `public/robots.txt`.
- [ ] Crear y **verificar el Google Business Profile** con exactamente el mismo NAP que el footer:
      «Arte y Recuerdo · Col. La Travesía, Tegucigalpa, Francisco Morazán, Honduras · +504
      9751-3752». Subir las fotos reales de los trabajos.
- [ ] Dar de alta el sitio en **Google Search Console** y enviar `https://<dominio>/sitemap-index.xml`.
- [ ] **Enlazar la web desde la página de Facebook** (campo «Sitio web»).
- [ ] Confirmar que el horario en Facebook y en Google coincide con el del sitio.
- [ ] Pasar las URLs por el Rich Results Test y dejar constancia aquí.

---

## Pendientes (TODO)

Están marcados con `TODO:` en el código, en el archivo que corresponde.

| Pendiente | Dónde |
|---|---|
| **Dominio definitivo** (hoy `https://arteyrecuerdo.hn` como placeholder) | `src/data/sitio.ts`, `public/robots.txt` |
| **Coordenadas exactas del taller** para el `geo` del `LocalBusiness` y el mapa | `src/data/sitio.ts` (`geo`, `mapaEmbed`) |
| **Confirmar la URL de Facebook** | `src/data/sitio.ts` |
| **Fotos reales de placas de aluminio** (hoy, marcador diseñado) | `src/data/productos.ts` |
| **Fotos reales de cruces de metal** | `src/data/productos.ts` |
| **Fotos reales de floreros y de arreglos florales** | `src/data/productos.ts` |
| **Tiempos de entrega reales** (hoy se responde «consúltenos») | `src/data/faq.ts` |
| **¿Hacen envíos fuera de Tegucigalpa? ¿Instalan en el cementerio?** | `src/data/faq.ts` |
| Rich Results Test sobre el dominio ya publicado | este README |

---

## Estructura

```
web/
├── public/
│   ├── fuentes/            tres .woff2 self-hosted (subconjunto latino)
│   ├── og/                 nueve imágenes Open Graph 1200×630
│   ├── marca/              logo para el JSON-LD
│   ├── favicon.*, icon-*.png, apple-touch-icon.png, site.webmanifest, robots.txt
├── scripts/
│   ├── preparar-imagenes.mjs   endereza / rota / recorta las fotos del taller
│   ├── generar-marca.mjs       iconos + imágenes Open Graph
│   └── lighthouse.mjs          auditoría móvil de todas las páginas
└── src/
    ├── assets/trabajos/    las nueve fotos ya corregidas
    ├── components/         Encabezado, Pie, Galería, Formulario, Proceso, Faq, Icono…
    ├── data/               sitio, productos, trabajos, faq
    ├── layouts/            Base (SEO + JSON-LD) y Producto
    ├── lib/                schema.ts (JSON-LD), iconos.ts
    ├── pages/              las diez rutas
    └── styles/global.css   el sistema de diseño
```

El JavaScript del sitio son cuatro islas pequeñas y sin dependencias: menú móvil, revelado al
hacer scroll, botón flotante de WhatsApp, y la galería (filtros + visor) con el formulario.
