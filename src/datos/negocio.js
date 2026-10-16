/* Datos del negocio: de su web actual, de su ficha de Google y del rótulo de la tienda. */

const DIRECCION_MAPS = "LB Metales y Gemas, C. Susana Llaneras 47, 03001 Alicante";

export const NEGOCIO = {
  nombre: "LB Metales y Gemas",
  lema: "Joyería y compraventa de oro en Alicante",
  desde: 2008,
  anios: "+15",
  satisfaccion: "98 %",

  telefonos: [
    { numero: "624 276 928", tel: "+34624276928" },
    { numero: "617 121 249", tel: "+34617121249" },
  ],
  /* El primer móvil es el que aparece en Google y en el rótulo: es el del WhatsApp. */
  whatsapp: "34624276928",
  email: "info@lbmetalesygemas.es",

  direccion: {
    calle: "C/ Susana Llaneras, 47",
    cp: "03001",
    ciudad: "Alicante",
    referencia: "A un paso del Mercado Central",
  },
  geo: { lat: 38.3469028, lng: -0.4872246 },

  mapa: `https://www.google.com/maps?q=${encodeURIComponent(DIRECCION_MAPS)}&z=17&output=embed`,
  comoLlegar: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(DIRECCION_MAPS)}`,
  fichaGoogle:
    "https://www.google.com/maps/place/LB+Metales+y+Gemas/@38.3469028,-0.4872246,17z/data=!4m6!3m5!1s0xd62364c3ec055cf:0xa1312020b2608e5d!8m2!3d38.3469028!4d-0.4872246",

  redes: [
    { nombre: "Instagram", usuario: "@lb_metalesygemas", url: "https://www.instagram.com/lb_metalesygemas/" },
    { nombre: "TikTok", usuario: "@joyeria_lb_alicante", url: "https://www.tiktok.com/@joyeria_lb_alicante" },
  ],

  google: { nota: 4.8, resenas: 8 },

  /* 0 = domingo … 6 = sábado. Tramos en hora de Madrid. */
  horario: {
    1: [["10:00", "14:00"], ["17:00", "20:00"]],
    2: [["10:00", "14:00"], ["17:00", "20:00"]],
    3: [["10:00", "14:00"], ["17:00", "20:00"]],
    4: [["10:00", "14:00"], ["17:00", "20:00"]],
    5: [["10:00", "14:00"], ["17:00", "20:00"]],
    6: [],
    0: [],
  },
};

export const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

/* Lo que pone el rótulo de la tienda: lo que compran y venden. */
export const CATEGORIAS = [
  "Oro",
  "Plata",
  "Relojes de alta gama",
  "Anillos",
  "Monedas",
  "Pulseras",
  "Collares",
  "Brillantes",
  "Antigüedades",
];

export const NAVEGACION = [
  { a: "/tasador", texto: "Tasador" },
  { a: "/servicios", texto: "Servicios" },
  { a: "/joyeria", texto: "Joyería" },
  { a: "/galeria", texto: "Galería" },
  { a: "/guia-del-oro", texto: "Guía del oro" },
  { a: "/nosotros", texto: "Nosotros" },
  { a: "/blog", texto: "Blog" },
];
