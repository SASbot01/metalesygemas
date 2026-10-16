const crear = (opciones) => new Intl.NumberFormat("es-ES", { useGrouping: "always", ...opciones });

const EUR_0 = crear({ style: "currency", currency: "EUR", maximumFractionDigits: 0, minimumFractionDigits: 0 });
const EUR_2 = crear({ style: "currency", currency: "EUR", maximumFractionDigits: 2, minimumFractionDigits: 2 });
const NUM_0 = crear({ maximumFractionDigits: 0 });
const NUM_1 = crear({ maximumFractionDigits: 1 });
const NUM_2 = crear({ maximumFractionDigits: 2, minimumFractionDigits: 2 });

/* Euros sin decimales a partir de 100 €; por debajo, con céntimos. */
export const euros = (valor, { decimales } = {}) => {
  if (!Number.isFinite(valor)) return "—";
  const conCentimos = decimales ?? Math.abs(valor) < 100;
  return (conCentimos ? EUR_2 : EUR_0).format(valor);
};

/* El importe sin el símbolo, para pintar el € aparte (más pequeño). */
const NUM_IMPORTE_0 = crear({ maximumFractionDigits: 0 });
export const importe = (valor) =>
  Number.isFinite(valor) ? (Math.abs(valor) < 100 ? NUM_2.format(valor) : NUM_IMPORTE_0.format(valor)) : "—";

export const eurosGramo = (valor) => (Number.isFinite(valor) ? `${NUM_2.format(valor)} €/g` : "—");

const NUM_HASTA_2 = crear({ maximumFractionDigits: 2 });
/* El peso tal cual lo escribe el cliente (hasta 2 decimales); desde 100 g, sin decimales. */
export const gramos = (valor) => `${(valor >= 100 ? NUM_0 : NUM_HASTA_2).format(valor)} g`;

export const numero = (valor, decimales = 0) => (decimales ? NUM_1 : NUM_0).format(valor);

export const porcentaje = (milesimas) => `${NUM_1.format(milesimas / 10)} %`;

const HORA = new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" });
export const hora = (fecha) => HORA.format(fecha);
