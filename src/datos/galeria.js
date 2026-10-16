/*
 * Fotos de la galería. Las «piezas» son de su escaparate (fotogramas de sus vídeos);
 * las de «estilo» son las fotos de ambiente que ya usaban en su web.
 */

export const PIEZAS = [
  {
    id: "cobra",
    imagen: "pieza-cobra",
    ratio: "576/1024",
    nombre: "Anillo cobra",
    detalle: "Oro · pieza exclusiva",
    alt: "Anillo de oro con forma de cobra y piedra roja, sostenido entre los dedos",
  },
  {
    id: "barbada",
    imagen: "pieza-barbada",
    ratio: "576/1024",
    nombre: "Pulseras barbadas",
    detalle: "Eslabón barbado en oro",
    alt: "Pulseras de oro de eslabón barbado sobre el salpicadero de un coche",
  },
  {
    id: "rolex",
    imagen: "pieza-rolex",
    ratio: "576/1024",
    nombre: "Relojes y sellos",
    detalle: "Alta relojería y anillos de oro",
    alt: "Mano con un reloj de oro y varios anillos de oro con piedras",
  },
  {
    id: "cadenas",
    imagen: "pieza-cadenas",
    ratio: "576/1024",
    nombre: "Cadenas y medallas",
    detalle: "Piezas de peso en oro",
    alt: "Cadenas, medallas y anillos de oro sobre el mostrador",
  },
  {
    id: "cobra-mano",
    imagen: "pieza-cobra-mano",
    ratio: "602/1071",
    nombre: "Anillo cobra, de cerca",
    detalle: "Cada detalle, a la vista",
    alt: "Detalle del anillo de oro con cabezas de cobra",
  },
];

/* «Inspiración»: fotografía editorial con licencia libre (Unsplash y Pexels). */
export const ESTILO = [
  { imagen: "insp-sello", ratio: "2400/1809", alt: "Anillo de sello de oro sobre un cojín de terciopelo granate" },
  { imagen: "insp-modelo-cubana", ratio: "2784/4176", alt: "Modelo con collar de eslabón cubano de oro y aros de oro" },
  { imagen: "insp-anillo-luz", ratio: "2400/2275", alt: "Anillo de oro con brillantes bajo un haz de luz sobre fondo azul noche" },
  { imagen: "insp-pendiente", ratio: "3120/4680", alt: "Pendiente escultórico de oro sobre fondo oscuro" },
  { imagen: "insp-busto", ratio: "2400/1601", alt: "Cadena gruesa de oro sobre un busto clásico de piedra" },
  { imagen: "insp-reloj", ratio: "2400/1600", alt: "Reloj de oro con esfera azul noche sobre tela oscura" },
  { imagen: "insp-manos", ratio: "2400/3600", alt: "Manos con anillo de sello, anillos con brillantes y reloj de oro" },
  { imagen: "insp-granate", ratio: "6240/4160", alt: "Pendientes de oro con perla granate en claroscuro" },
  { imagen: "insp-cadena-bokeh", ratio: "2400/1600", alt: "Cadena de oro en diagonal con brillos desenfocados" },
];

/* Autoría de las fotos de inspiración (no es obligatoria, pero se agradece). */
export const CREDITOS_FOTOS = "Fotografía de inspiración: Unsplash y Pexels.";
