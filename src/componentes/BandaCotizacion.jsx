import { METALES, precioGramo } from "../datos/metales.js";
import { useCotizacion } from "../lib/cotizacion.jsx";
import { eurosGramo } from "../lib/formato.js";
import { Punto, textoActualizacion } from "./Indicadores.jsx";

const ley = (metal, id) => METALES.find((m) => m.id === metal).leyes.find((l) => l.id === id);
const COLUMNAS = [
  { etiqueta: "Oro 24 k", metal: "oro", ley: ley("oro", "24") },
  { etiqueta: "Oro 18 k", metal: "oro", ley: ley("oro", "18") },
  { etiqueta: "Plata 925", metal: "plata", ley: ley("plata", "925") },
];

/* Cotización del día bajo el hero: cuatro columnas con filetes finos. */
export function BandaCotizacion() {
  const cotizacion = useCotizacion();
  const directo = cotizacion.fuente === "directo";
  return (
    <div className="border-t border-borde">
      <dl className="contenedor grid grid-cols-2 md:grid-cols-4">
        {COLUMNAS.map((c, i) => (
          <div key={c.etiqueta} className={`py-5 md:py-6 ${i ? "md:border-l md:border-borde md:pl-8" : ""} ${i === 1 ? "border-l border-borde pl-5 md:pl-8" : ""} ${i === 2 ? "border-t border-borde md:border-t-0" : ""}`}>
            <dt className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-tenue [font-stretch:112.5%]">{c.etiqueta}</dt>
            <dd className="tabular mt-1.5 text-[1.05rem] text-tinta">{eurosGramo((precioGramo(cotizacion.onza, c.metal) * c.ley.milesimas) / 1000)}</dd>
          </div>
        ))}
        <div className="border-l border-t border-borde py-5 pl-5 md:border-t-0 md:py-6 md:pl-8">
          <dt className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-tenue [font-stretch:112.5%]">Cotización</dt>
          <dd className="mt-1.5 flex items-center gap-2 text-[1.05rem] text-tinta">
            <Punto color={directo ? "var(--color-abierto)" : "var(--color-tenue)"} latido={directo} />
            {textoActualizacion(cotizacion).replace("En directo · ", "Hoy · ")}
          </dd>
        </div>
      </dl>
    </div>
  );
}
