import { METALES, PAGO, precioGramo } from "../datos/metales.js";
import { useCotizacion } from "../lib/cotizacion.jsx";
import { eurosGramo, porcentaje } from "../lib/formato.js";
import { Escalonado, Hijo } from "./Animaciones.jsx";
import { Punto, textoActualizacion } from "./Indicadores.jsx";

const FILAS = [
  ...METALES[0].leyes.filter((l) => ["24", "22", "18", "14", "9"].includes(l.id)).map((ley) => ({ metal: METALES[0], ley })),
  { metal: METALES[1], ley: METALES[1].leyes.find((l) => l.id === "925") },
];

/* Precio del gramo hoy, por ley: valor del metal y lo que se paga como máximo. */
export function TablaPrecios() {
  const cotizacion = useCotizacion();
  const directo = cotizacion.fuente === "directo";

  return (
    <div className="tarjeta overflow-hidden rounded-[3px]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-borde px-5 py-4 sm:px-7">
        <p className="flex items-center gap-2.5 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-suave">
          <Punto color={directo ? "var(--color-acento)" : "var(--color-tenue)"} latido={directo} />
          {textoActualizacion(cotizacion)}
        </p>
        <p className="text-[0.75rem] text-tenue">Precios por gramo · se actualizan solos</p>
      </div>

      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Precio del gramo de oro y plata hoy según su ley, y referencia orientativa de lo que pagamos</caption>
        <thead>
          <tr className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-tenue">
            <th scope="col" className="px-5 py-4 font-bold sm:px-7">
              Ley
            </th>
            <th scope="col" className="hidden px-3 py-4 font-bold sm:table-cell">
              Pureza
            </th>
            <th scope="col" className="px-3 py-4 text-right font-bold">
              Valor del metal
            </th>
            <th scope="col" className="px-5 py-4 text-right font-bold text-acento sm:px-7">
              Pagamos aprox.
            </th>
          </tr>
        </thead>
        <Escalonado as="tbody" paso={0.06}>
          {FILAS.map(({ metal, ley }) => {
            const valor = (precioGramo(cotizacion.onza, metal.id) * ley.milesimas) / 1000;
            const destacado = metal.id === "oro" && ley.id === "18";
            return (
              <Hijo
                as="tr"
                key={`${metal.id}-${ley.id}`}
                className={`border-t border-borde/70 transition-colors hover:bg-acento/[0.04] ${destacado ? "bg-acento/[0.06]" : ""}`}
              >
                <th scope="row" className="px-4 py-4 font-normal sm:px-7">
                  <span className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 shrink-0 rotate-45 border border-acento/60" />
                    <span className="font-display text-[1.45rem] leading-none text-tinta">
                      {metal.id === "oro" ? `${ley.id}k` : ley.corto}
                    </span>
                    <span className="hidden text-[0.78rem] text-tenue sm:inline">{metal.nombre}</span>
                    {destacado ? (
                      <span className="hidden rounded-[2px] bg-acento/15 px-2 py-0.5 text-[0.56rem] font-extrabold uppercase tracking-[0.14em] text-acento md:inline">
                        La más habitual
                      </span>
                    ) : null}
                  </span>
                </th>
                <td className="tabular hidden px-3 py-4 text-[0.88rem] text-suave sm:table-cell">{porcentaje(ley.milesimas)}</td>
                <td className="tabular whitespace-nowrap px-3 py-4 text-right text-[0.88rem] text-suave sm:text-[0.95rem]">{eurosGramo(valor)}</td>
                <td className="tabular whitespace-nowrap px-5 py-4 text-right text-[0.95rem] font-semibold text-realce sm:px-7 sm:text-[1.02rem]">
                  {eurosGramo(valor * PAGO[metal.id].max)}
                </td>
              </Hijo>
            );
          })}
        </Escalonado>
      </table>
    </div>
  );
}
