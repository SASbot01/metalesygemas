import { useCotizacion, usePrecioGramo } from "../lib/cotizacion.jsx";
import { useEstadoTienda } from "../hooks/useEstadoTienda.js";
import { eurosGramo, hora } from "../lib/formato.js";

/* Punto de estado con latido. */
export function Punto({ color = "var(--color-abierto)", latido = true }) {
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0">
      {latido ? <span className="absolute inset-0 animate-latido rounded-full" style={{ color }} /> : null}
      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: color }} />
    </span>
  );
}

/* «Abierto · cierra a las 14:00» en hora de Alicante. */
export function EstadoTienda({ className = "" }) {
  const { abierto, texto } = useEstadoTienda();
  return (
    <span className={`inline-flex items-center gap-2.5 text-[0.78rem] font-semibold text-suave ${className}`}>
      <Punto color={abierto ? "var(--color-abierto)" : "var(--color-cerrado)"} latido={abierto} />
      {texto}
    </span>
  );
}

export function textoActualizacion({ fuente, actualizado }) {
  if (fuente === "cargando") return "Actualizando cotización…";
  if (fuente === "referencia") return "Cotización de referencia";
  const fecha = new Date(actualizado);
  const esHoy = new Date().toDateString() === fecha.toDateString();
  return `En directo · ${esHoy ? hora(fecha) : fecha.toLocaleDateString("es-ES", { day: "numeric", month: "short" })}`;
}

/* Precio del gramo de oro fino en directo. */
export function PrecioEnDirecto({ className = "", etiqueta = "Oro puro" }) {
  const cotizacion = useCotizacion();
  const gramo = usePrecioGramo("oro");
  const directo = cotizacion.fuente === "directo";
  return (
    <span
      title={textoActualizacion(cotizacion)}
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-[2px] border border-borde bg-fondo-2/60 px-3.5 py-2 text-[0.75rem] font-semibold text-suave backdrop-blur ${className}`}
    >
      <Punto color={directo ? "var(--color-acento)" : "var(--color-tenue)"} latido={directo} />
      <span className="uppercase tracking-[0.16em] text-tenue">{etiqueta}</span>
      <span className="tabular text-tinta">{eurosGramo(gramo)}</span>
    </span>
  );
}
