import { NEGOCIO } from "../datos/negocio.js";
import { filasHorario } from "../lib/horario.js";
import { enlaceTelefono, enlaceWhatsApp } from "../lib/whatsapp.js";
import { Imagen } from "./Imagen.jsx";
import { EstadoTienda } from "./Indicadores.jsx";
import { Aparecer } from "./Animaciones.jsx";
import { Encabezado, Oro } from "./Encabezado.jsx";
import { IconoFlechaArriba, IconoTelefono, IconoUbicacion, IconoWhatsApp } from "./Iconos.jsx";

/*
 * Mapa propio en azul noche (de OpenStreetMap, sin cookies) con el pin de la tienda.
 * Para ir, «Cómo llegar» abre Google Maps con la ruta.
 */
function Mapa() {
  return (
    <div className="relative h-full min-h-[24rem] overflow-hidden rounded-[3px] border border-borde bg-fondo-2">
      <Imagen
        nombre="mapa"
        alt="Mapa del centro de Alicante con la tienda en la calle Susana Llaneras, junto al Mercado Central"
        className="absolute inset-0"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(1,5,25,0.65)_85%)]" />

      {/* Pin en la posición de la tienda (el centro del mapa). */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <div className="relative flex flex-col items-center">
          <span className="absolute bottom-0 h-3 w-3 translate-y-1/2 animate-ping rounded-full bg-principal/60" />
          <span className="grid h-12 w-12 place-items-center rounded-full rounded-br-none bg-principal shadow-[0_12px_30px_-6px_rgba(84,2,18,0.9)] [transform:rotate(45deg)]">
            <span className="block h-4 w-4 rounded-full bg-principal-tinta [transform:rotate(-45deg)]" />
          </span>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 mt-4 -translate-x-1/2 whitespace-nowrap rounded-[2px] border border-tinta/15 bg-fondo/85 px-4 py-2.5 text-center backdrop-blur">
        <p className="font-display text-[1.05rem] leading-none text-tinta">LB Metales y Gemas</p>
        <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-suave">{NEGOCIO.direccion.calle}</p>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
        <a href={NEGOCIO.comoLlegar} target="_blank" rel="noopener" className="boton boton-principal !min-h-11 !px-5 !text-[0.7rem]">
          <IconoUbicacion className="h-4 w-4" />
          Cómo llegar
        </a>
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener"
          className="rounded-[2px] bg-fondo/70 px-2 py-1 text-[0.62rem] text-tenue backdrop-blur hover:text-suave"
        >
          © OpenStreetMap
        </a>
      </div>
    </div>
  );
}

export function Visitanos() {
  const filas = filasHorario();
  return (
    <div className="contenedor grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <Encabezado antetitulo="Ubicación" titulo={["En pleno centro,", <Oro key="o">junto al Mercado.</Oro>]}>
          Ven sin cita a tasar tus joyas o a ver el escaparate. Estamos en la calle Susana Llaneras, a un paso del Mercado Central de
          Alicante.
        </Encabezado>

        <Aparecer delay={0.1} className="mt-10 grid gap-6">
          <a href={NEGOCIO.comoLlegar} target="_blank" rel="noopener" className="group flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-borde text-acento transition-colors group-hover:border-acento">
              <IconoUbicacion className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-[1.6rem] leading-tight text-tinta">{NEGOCIO.direccion.calle}</span>
              <span className="mt-1 flex items-center gap-1.5 text-[0.9rem] text-suave">
                {NEGOCIO.direccion.cp} {NEGOCIO.direccion.ciudad} · Cómo llegar
                <IconoFlechaArriba className="h-3.5 w-3.5 text-acento transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </span>
          </a>

          <div className="tarjeta rounded-[3px] p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-tenue">Horario</p>
              <EstadoTienda />
            </div>
            <dl className="mt-4 grid gap-1">
              {filas.map((f) => (
                <div
                  key={f.dia}
                  className={`flex items-center justify-between gap-4 rounded-[2px] px-3 py-2 text-[0.92rem] ${
                    f.hoy ? "bg-acento/[0.08] text-tinta" : "text-suave"
                  }`}
                >
                  <dt className="flex items-center gap-2">
                    {f.dia}
                    {f.hoy ? <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-acento">Hoy</span> : null}
                  </dt>
                  <dd className={`tabular text-right ${f.tramos.length ? "" : "text-tenue"}`}>
                    {f.tramos.length
                      ? f.tramos.map((t, i) => (
                          <span key={t} className="block whitespace-nowrap sm:inline">
                            {i ? <span className="hidden sm:inline">{"  ·  "}</span> : null}
                            {t}
                          </span>
                        ))
                      : "Cerrado"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={enlaceTelefono(0)} className="boton boton-linea">
              <IconoTelefono className="h-4 w-4" />
              {NEGOCIO.telefonos[0].numero}
            </a>
            <a href={enlaceWhatsApp()} target="_blank" rel="noopener" className="boton boton-principal">
              <IconoWhatsApp className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </Aparecer>
      </div>

      <Aparecer delay={0.15} className="min-h-[26rem] lg:min-h-0 lg:pt-24">
        <Mapa />
      </Aparecer>
    </div>
  );
}
