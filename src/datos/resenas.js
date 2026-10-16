/*
 * Reseñas de su ficha de Google, como las enseña su web actual (todas de 5 estrellas).
 * La fecha es la de Google (data-time del widget de su web); se ordenan de la más reciente a la más antigua.
 */
const LISTA = [
  {
    nombre: "Juana Dominguez",
    fecha: "2022-08-14",
    nota: 5,
    texto:
      "Gran variedad de piezas de oro de 18 k exclusivas, grandes profesionales, envíos y trato perfecto, recomendable 100 %. Me atendió Samuel y, a pesar de hacerlo todo por teléfono, fue más que en persona: pendiente de todo y aclarándome cualquier cosa que le preguntaba. Llevo dos compras con él y las dos 👍🥰 No hay dos sin tres, gracias Samuel. Desde Extremadura, Plasencia.",
  },
  {
    nombre: "Ruben Muñoz",
    fecha: "2025-02-22",
    nota: 5,
    texto: "Joyas bonitas y modernas… volveré sin duda. Muy buena atención y trato… lo recomiendo 100 %.",
  },
  {
    nombre: "Josefina Megia Gomez",
    fecha: "2023-01-22",
    nota: 5,
    texto: "Todo atención, variedad de artículos y buen precio. Volveremos. Gracias.",
  },
  {
    nombre: "Jesús Santiago",
    fecha: "2022-05-12",
    nota: 5,
    texto: "Excelente trato, grandes profesionales.",
  },
  {
    nombre: "Rodrigo Talavera",
    fecha: "2021-11-20",
    nota: 5,
    texto: "Buen surtido de joyas a precios competitivos. Excelente atención.",
  },
];

export const RESENAS = [...LISTA].sort((a, b) => b.fecha.localeCompare(a.fecha));

/* «hace 1 año», «hace 3 años»… calculado con la fecha, para que no caduque. */
export function haceCuanto(iso, hoy = new Date()) {
  const f = new Date(`${iso}T12:00:00`);
  let anios = hoy.getFullYear() - f.getFullYear();
  if (hoy < new Date(hoy.getFullYear(), f.getMonth(), f.getDate())) anios--;
  if (anios < 1) return "hace unos meses";
  return anios === 1 ? "hace 1 año" : `hace ${anios} años`;
}
