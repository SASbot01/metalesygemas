/*
 * Metales, leyes y reglas del tasador.
 *
 * La cotización llega en euros por onza troy; el tasador la pasa a gramos y la
 * multiplica por la pureza de cada ley. PAGO es la parte de ese valor que la
 * tienda ofrece al comprar: es orientativa y la fija LB, no el mercado.
 */

export const ONZA_TROY_G = 31.1034768;

export const PAGO = {
  oro: { min: 0.8, max: 0.9 },
  plata: { min: 0.6, max: 0.75 },
};

/* Cotización de respaldo (€/onza, 16-10-2026) por si no responde el servicio en directo. */
export const COTIZACION_REFERENCIA = {
  oro: 3719.78,
  plata: 51.35,
  fecha: "2026-10-16T00:54:00Z",
};

export const METALES = [
  {
    id: "oro",
    nombre: "Oro",
    simbolo: "XAU",
    leyes: [
      { id: "24", corto: "24k", nombre: "Oro de 24 quilates", milesimas: 999, uso: "Lingotes y monedas de inversión", tono: "oro24" },
      { id: "22", corto: "22k", nombre: "Oro de 22 quilates", milesimas: 916, uso: "Monedas como el soberano o el krugerrand", tono: "oro22" },
      { id: "21", corto: "21k", nombre: "Oro de 21 quilates", milesimas: 875, uso: "Joyería de Oriente Medio", tono: "oro22" },
      { id: "18", corto: "18k", nombre: "Oro de 18 quilates", milesimas: 750, uso: "La ley de la joyería española", tono: "oro18", habitual: true },
      { id: "14", corto: "14k", nombre: "Oro de 14 quilates", milesimas: 585, uso: "Joyería americana y del norte de Europa", tono: "oro14" },
      { id: "10", corto: "10k", nombre: "Oro de 10 quilates", milesimas: 417, uso: "Joyería económica americana", tono: "oro9" },
      { id: "9", corto: "9k", nombre: "Oro de 9 quilates", milesimas: 375, uso: "Joyería inglesa", tono: "oro9" },
    ],
    ejemplos: [
      { nombre: "Alianza", gramos: 4 },
      { nombre: "Cadena fina", gramos: 6 },
      { nombre: "Anillo sello", gramos: 10 },
      { nombre: "Cordón grueso", gramos: 30 },
      { nombre: "Pulsera barbada", gramos: 45 },
      { nombre: "Moneda de 1 onza", gramos: 31.1, ley: "24" },
    ],
  },
  {
    id: "plata",
    nombre: "Plata",
    simbolo: "XAG",
    leyes: [
      { id: "999", corto: "999", nombre: "Plata fina 999", milesimas: 999, uso: "Lingotes y monedas de inversión", tono: "plata" },
      { id: "925", corto: "925", nombre: "Plata de ley 925", milesimas: 925, uso: "Joyas y platería de ley", tono: "plata", habitual: true },
      { id: "900", corto: "900", nombre: "Plata 900", milesimas: 900, uso: "Monedas antiguas", tono: "plata" },
      { id: "800", corto: "800", nombre: "Plata 800", milesimas: 800, uso: "Cubertería y platería antigua", tono: "plata" },
    ],
    ejemplos: [
      { nombre: "Pulsera", gramos: 20 },
      { nombre: "Moneda de 1 onza", gramos: 31.1, ley: "999" },
      { nombre: "Cubierto", gramos: 60 },
      { nombre: "Bandeja", gramos: 400 },
    ],
  },
];

export const metalPorId = (id) => METALES.find((m) => m.id === id) ?? METALES[0];

export const leyPorId = (metal, id) =>
  metal.leyes.find((l) => l.id === id) ?? metal.leyes.find((l) => l.habitual) ?? metal.leyes[0];

/* Precio por gramo de metal fino a partir de la cotización por onza. */
export const precioGramo = (cotizacion, metalId) => (cotizacion?.[metalId] ?? 0) / ONZA_TROY_G;

export function tasar({ metal, ley, gramos, cotizacion }) {
  const fino = (gramos * ley.milesimas) / 1000;
  const valor = fino * precioGramo(cotizacion, metal.id);
  const pago = PAGO[metal.id];
  return { fino, valor, min: valor * pago.min, max: valor * pago.max };
}

/* La guía de quilates: las cinco leyes que más pasan por el mostrador. */
export const GUIA_QUILATES = [
  {
    quilates: 24,
    milesimas: 999,
    titulo: "Oro puro",
    texto:
      "Prácticamente oro puro. Su amarillo es el más intenso, pero también es el más blando: por eso se reserva para lingotes y monedas de inversión y casi nunca para joyas de diario.",
  },
  {
    quilates: 22,
    milesimas: 916,
    titulo: "El oro de las monedas",
    texto:
      "Un 91,6 % de oro. Muy cálido de color y algo más duro que el puro; es la ley de monedas de inversión como el soberano o el krugerrand y de buena parte de la joyería oriental.",
  },
  {
    quilates: 18,
    milesimas: 750,
    titulo: "La ley de la joyería",
    texto:
      "Tres partes de oro y una de otros metales que le dan dureza. Es el equilibrio perfecto entre brillo, resistencia y valor, y la ley de casi todas las joyas que hacemos y compramos.",
  },
  {
    quilates: 14,
    milesimas: 585,
    titulo: "Para el día a día",
    texto:
      "Algo más de la mitad es oro. Resiste mejor los golpes y el roce y su color es más suave. Es muy habitual en joyería americana y del norte de Europa.",
  },
  {
    quilates: 9,
    milesimas: 375,
    titulo: "La opción económica",
    texto:
      "Poco más de un tercio de oro. Es la ley más asequible: color menos intenso y menos valor por gramo. La verás sobre todo en joyería inglesa.",
  },
];

export const COLORES_ORO = [
  {
    nombre: "Oro amarillo",
    aleacion: "Oro · plata · cobre",
    texto: "El color clásico y cálido de siempre. Realza las piedras de color y los diamantes.",
    muestra: "radial-gradient(circle at 30% 30%, #fff1c4, #e2b85c 45%, #8f6a26)",
  },
  {
    nombre: "Oro blanco",
    aleacion: "Oro · paladio · plata · baño de rodio",
    texto: "Frío y luminoso. El rodiado final le da ese brillo blanco tan buscado en anillos de compromiso.",
    muestra: "radial-gradient(circle at 30% 30%, #ffffff, #d8d8d4 45%, #8e8d88)",
  },
  {
    nombre: "Oro rosa",
    aleacion: "Oro · cobre · plata",
    texto: "Más cobre en la aleación y un tono cálido y favorecedor, con aire vintage.",
    muestra: "radial-gradient(circle at 30% 30%, #ffe0d0, #e3a184 45%, #8f5440)",
  },
];

/* De su artículo «Guía rápida para saber si una joya es de oro auténtico». */
export const ORO_AUTENTICO = [
  {
    titulo: "Busca el contraste",
    texto: "Un número grabado en el cierre o en el interior te dice la ley: 750 es oro de 18 k y 585, de 14 k.",
    icono: "contraste",
  },
  {
    titulo: "Color y peso",
    texto: "El oro tiene un tono cálido característico y es muy denso: una pieza de oro pesa más de lo que aparenta.",
    icono: "peso",
  },
  {
    titulo: "No es magnético",
    texto: "Acerca un imán: el oro no reacciona. Si la pieza se pega, desconfía.",
    icono: "iman",
  },
  {
    titulo: "Prueba ácida",
    texto: "Es fiable, pero solo con el equipo adecuado. Mejor déjala en nuestras manos: te lo decimos sin compromiso.",
    icono: "acido",
  },
];
