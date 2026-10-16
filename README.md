# LB Metales y Gemas — web nueva

Rediseño completo de [lbmetalesygemas.es](https://lbmetalesygemas.es) (joyería y compraventa de oro en C/ Susana Llaneras, 47 · Alicante) con sus mismos textos, fotos, artículos y datos de contacto.

**Stack:** React 18 + Vite 6 + Tailwind CSS 4 + Framer Motion (animaciones) + Lenis (scroll suave) + three.js (pulsera barbada de oro en 3D, en tiempo real).

**Identidad:** los colores de su web actual — azul noche `#010519`, granate `#540212`, marfil `#fffee9` y perla `#f1f3f1` — sin dorados en la interfaz (el oro solo está en las fotos y en el render). Titulares en Bodoni Moda y texto en Mona Sans, autoalojadas en `public/fonts/`. Su logotipo «LB | Metales y Gemas» se ha regenerado nítido (`public/img/logo-lb.png`) con su monograma y su letra de marca. Las secciones claras usan las clases `.claro` (marfil) y `.perla`, que redefinen los colores en `src/index.css`.

## Arrancar

```bash
npm install
npm run dev
```

> En este Mac, `node_modules` es un enlace a `../muny/node_modules` (mismas dependencias) para no gastar disco. En otro equipo o en Vercel basta con `npm install`.

`npm run build` genera `dist/`. Para Vercel ya está `vercel.json`: redirige las URLs antiguas de WordPress (`/about/`, `/services/`, `/galeria/`, `/contact/` y los 8 artículos que vivían en la raíz) a las nuevas, para no perder posicionamiento.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Hero con la pulsera 3D y la cotización del día, tasador, precio del oro hoy por quilates, cómo vender, servicios, la joyería, escaparate, guía de quilates interactiva, nosotros, reseñas de Google (carrusel), blog y ubicación con mapa |
| `/tasador` | Tasador completo, la fórmula explicada con el precio de hoy, tabla de precios, qué compramos y preguntas frecuentes |
| `/servicios` | Los 4 servicios de su web y el proceso de joya a medida |
| `/joyeria` | Portada con cadena barbada, piezas del escaparate (con visor) e inspiración |
| `/galeria` | 24 piezas de su TikTok (como su antigua `/galeria/`), cada una con su vídeo |
| `/guia-del-oro` | Quilates (interactivo), tabla de milésimas, colores del oro y cómo reconocer oro auténtico |
| `/nosotros`, `/blog`, `/blog/:slug`, `/contacto`, `/privacidad` | |

## El tasador

`valor del metal = peso × (milésimas / 1000) × cotización del gramo de metal puro`

La oferta que se enseña es un porcentaje de ese valor, definido en `PAGO` (`src/datos/metales.js`): ahora **80–90 % en oro y 60–75 % en plata**. Son valores orientativos: **los tiene que fijar LB**. El tasador solo hace oro y plata, que es lo que pone su rótulo.

La cotización llega en directo de [gold-api.com](https://gold-api.com) (gratuito, sin clave, en euros), se guarda 5 minutos en el navegador y, si el servicio no responde, se usa `COTIZACION_REFERENCIA`.

El lote de varias piezas y la reserva se envían por WhatsApp con el mensaje ya escrito (no hace falta servidor).

## Dónde se cambia cada cosa

- `src/datos/negocio.js` — teléfonos, WhatsApp, email, dirección, horario, redes, nota de Google.
- `src/datos/metales.js` — leyes, porcentajes de pago, pesos de ejemplo, textos de la guía.
- `src/datos/contenido.js` — servicios, pasos, cifras, preguntas frecuentes.
- `src/datos/blog.js` — los 8 artículos (mismas URLs que antes).
- `src/datos/galeria.js` y `public/img/` — fotos (cada una en `nombre.webp` y `nombre-sm.webp`). Las de su escaparate son suyas; las de «Inspiración», servicios, portada de joyería y llamadas finales son de Unsplash y Pexels (licencia gratuita con uso comercial).
- `public/img/mapa.webp` — mapa del centro de Alicante sacado de OpenStreetMap y teñido en azul noche (lleva su atribución).
- `src/datos/resenas.js` — reseñas de Google con su fecha (se ordenan solas y el «hace N años» se calcula).
- `src/datos/tiktok.js` — piezas de la galería; las portadas están en `public/img/tt-*.webp` porque las de TikTok caducan.

## Pendiente de confirmar con la tienda

- Porcentajes de pago del tasador (`PAGO`).
- Que el WhatsApp es el **624 276 928** (en su web actual el botón de WhatsApp lleva al número del diseñador, no al de la tienda).
- «Cobras en el momento» (pasos para vender) y los envíos a toda España (sale de una reseña).
- El fijo del rótulo, 966 14 58 37, no está en su web: no se ha puesto.
- Titular y NIF para la página legal.
- Si la tasación es gratuita: su web solo dice «sin compromiso», y es lo que pone la web nueva.
- Si compran platino: lo quité del tasador porque no sale en su web ni en su rótulo.
