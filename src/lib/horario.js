import { NEGOCIO, DIAS } from "../datos/negocio.js";

const PARTES = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Madrid",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});
const DIA_A_NUMERO = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const aMinutos = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/* Día de la semana y minuto del día en Alicante, esté donde esté quien mira la web. */
export function ahoraEnAlicante(fecha = new Date()) {
  const partes = Object.fromEntries(PARTES.formatToParts(fecha).map((p) => [p.type, p.value]));
  return { dia: DIA_A_NUMERO[partes.weekday], minuto: Number(partes.hour) * 60 + Number(partes.minute) };
}

/*
 * { abierto, texto } para la etiqueta de estado:
 * «Abierto · cierra a las 14:00», «Cerrado · abre a las 17:00», «Cerrado · abre el lunes a las 10:00».
 */
export function estadoTienda(fecha = new Date()) {
  const { dia, minuto } = ahoraEnAlicante(fecha);
  const hoy = NEGOCIO.horario[dia] ?? [];

  for (const [abre, cierra] of hoy) {
    if (minuto >= aMinutos(abre) && minuto < aMinutos(cierra)) {
      return { abierto: true, texto: `Abierto · cierra a las ${cierra}` };
    }
  }

  const siguienteHoy = hoy.find(([abre]) => aMinutos(abre) > minuto);
  if (siguienteHoy) return { abierto: false, texto: `Cerrado · abre a las ${siguienteHoy[0]}` };

  for (let i = 1; i <= 7; i++) {
    const otro = (dia + i) % 7;
    const tramos = NEGOCIO.horario[otro] ?? [];
    if (tramos.length) {
      const cuando = i === 1 ? "mañana" : `el ${DIAS[otro].toLowerCase()}`;
      return { abierto: false, texto: `Cerrado · abre ${cuando} a las ${tramos[0][0]}` };
    }
  }
  return { abierto: false, texto: "Cerrado" };
}

/* Filas del horario de lunes a domingo, marcando el día de hoy. */
export function filasHorario(fecha = new Date()) {
  const { dia } = ahoraEnAlicante(fecha);
  return [1, 2, 3, 4, 5, 6, 0].map((d) => {
    const tramos = NEGOCIO.horario[d] ?? [];
    return {
      dia: DIAS[d],
      hoy: d === dia,
      tramos: tramos.map(([a, c]) => `${a} – ${c}`),
      texto: tramos.length ? tramos.map(([a, c]) => `${a} – ${c}`).join("  ·  ") : "Cerrado",
    };
  });
}
