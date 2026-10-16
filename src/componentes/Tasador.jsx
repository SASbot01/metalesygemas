import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { METALES, PAGO, leyPorId, metalPorId, precioGramo, tasar } from "../datos/metales.js";
import { useCotizacion } from "../lib/cotizacion.jsx";
import { euros, eurosGramo, gramos as fmtGramos, importe, numero } from "../lib/formato.js";
import { enlaceWhatsApp } from "../lib/whatsapp.js";
import { Pulsera3D } from "./Pulsera3D.jsx";
import { Cifra, EASE } from "./Animaciones.jsx";
import { Punto, textoActualizacion } from "./Indicadores.jsx";
import { IconoCerrar, IconoInfo, IconoMas, IconoMenos, IconoWhatsApp } from "./Iconos.jsx";

const MIN_G = 0.1;
const MAX_G = 5000;
/* El deslizador va en escala logarítmica: precisión en gramos pequeños y alcance hasta 1 kg. */
const DESLIZADOR = { min: 0.5, max: 1000, pasos: 1000 };
const aDeslizador = (g) =>
  Math.round((Math.log(Math.min(Math.max(g, DESLIZADOR.min), DESLIZADOR.max) / DESLIZADOR.min) / Math.log(DESLIZADOR.max / DESLIZADOR.min)) * DESLIZADOR.pasos);
const desdeDeslizador = (v) => {
  const g = DESLIZADOR.min * Math.pow(DESLIZADOR.max / DESLIZADOR.min, v / DESLIZADOR.pasos);
  return g < 10 ? Math.round(g * 10) / 10 : g < 100 ? Math.round(g * 2) / 2 : Math.round(g);
};

/* «7,5», «7.5» y «1.250» (punto de miles) se leen bien; «10,5,3» no es un peso. */
const leerGramos = (texto) => {
  const t = String(texto).replace(/\s/g, "");
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(t)) return parseFloat(t.replace(/\./g, "").replace(",", "."));
  if ((t.match(/[.,]/g) || []).length > 1) return NaN;
  const n = parseFloat(t.replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
};

const nombreLey = (metal, ley) => (metal.id === "oro" ? `oro de ${ley.id} k (${ley.milesimas})` : `${metal.nombre.toLowerCase()} ${ley.corto}`);

function Paso({ numero: n, titulo, children, accion }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-4 flex w-full items-center justify-between gap-4">
        <span className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-acento/40 text-[0.7rem] font-bold text-acento">{n}</span>
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-suave">{titulo}</span>
        </span>
        {accion}
      </legend>
      {children}
    </fieldset>
  );
}

export function Tasador() {
  const cotizacion = useCotizacion();
  const [metalId, setMetalId] = useState("oro");
  const [leyId, setLeyId] = useState("18");
  const [texto, setTexto] = useState("10");
  const [lote, setLote] = useState([]);

  const metal = metalPorId(metalId);
  const ley = leyPorId(metal, leyId);
  const g = leerGramos(texto);
  const gramosValidos = Number.isFinite(g) && g >= MIN_G && g <= MAX_G;
  const pesoCalculo = gramosValidos ? g : 0;
  const resultado = tasar({ metal, ley, gramos: pesoCalculo, cotizacion: cotizacion.onza });
  const gramoFino = precioGramo(cotizacion.onza, metal.id);

  const elegirMetal = (id) => {
    const nuevo = metalPorId(id);
    setMetalId(id);
    setLeyId(leyPorId(nuevo, null).id);
  };

  const ajustarGramos = (delta) => {
    const base = Number.isFinite(g) ? g : 0;
    const paso = base < 10 ? 0.5 : base < 100 ? 1 : 10;
    const nuevo = Math.min(MAX_G, Math.max(MIN_G, Math.round((base + delta * paso) * 10) / 10));
    setTexto(numero(nuevo, 1).replace(/\./g, ""));
  };

  const anadirAlLote = () => {
    if (!gramosValidos) return;
    setLote((l) => [...l, { id: `${Date.now()}-${l.length}`, metalId, leyId: ley.id, gramos: g }]);
  };

  const piezasLote = useMemo(
    () =>
      lote.map((p) => {
        const m = metalPorId(p.metalId);
        const l = leyPorId(m, p.leyId);
        return { ...p, metal: m, ley: l, ...tasar({ metal: m, ley: l, gramos: p.gramos, cotizacion: cotizacion.onza }) };
      }),
    [lote, cotizacion.onza],
  );
  const totalLote = piezasLote.reduce((t, p) => ({ min: t.min + p.min, max: t.max + p.max, valor: t.valor + p.valor }), { min: 0, max: 0, valor: 0 });

  const mensajePieza = gramosValidos
    ? `Hola, he usado el tasador de vuestra web: ${fmtGramos(g)} de ${nombreLey(metal, ley)}. Me sale una estimación de ${euros(resultado.min)} a ${euros(resultado.max)}. ¿Cuándo puedo pasar a tasarlo?`
    : "Hola, me gustaría tasar unas joyas. ¿Cuándo puedo pasar?";
  const mensajeLote = `Hola, he usado el tasador de vuestra web con estas piezas:\n${piezasLote
    .map((p) => `• ${fmtGramos(p.gramos)} de ${nombreLey(p.metal, p.ley)}`)
    .join("\n")}\nEstimación total: ${euros(totalLote.min)} a ${euros(totalLote.max)}. ¿Cuándo puedo pasar a tasarlo?`;

  const directo = cotizacion.fuente === "directo";
  const pago = PAGO[metal.id];

  return (
    <div className="tarjeta borde-fino relative overflow-hidden rounded-[3px] bg-superficie">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-acento/10 blur-[110px]" />

      <div className="relative grid lg:grid-cols-[1.08fr_1fr]">
        {/* Controles */}
        <div className="flex flex-col gap-9 p-5 sm:p-8 lg:p-11">
          <Paso numero={1} titulo="Metal">
            <LayoutGroup id="metal">
              <div role="radiogroup" aria-label="Metal" className="grid grid-cols-2 gap-2 rounded-[3px] border border-borde bg-fondo/60 p-1.5">
                {METALES.map((m) => {
                  const activo = m.id === metalId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      role="radio"
                      aria-checked={activo}
                      onClick={() => elegirMetal(m.id)}
                      className={`relative flex min-h-12 items-center justify-center gap-2.5 rounded-[3px] px-2 text-[0.88rem] font-semibold transition-colors ${
                        activo ? "text-principal-tinta" : "text-suave hover:text-tinta"
                      }`}
                    >
                      {activo ? (
                        <motion.span
                          layoutId="metal-activo"
                          className="absolute inset-0 rounded-[3px]"
                          style={{ background: "var(--color-principal)" }}
                          transition={{ duration: 0.5, ease: EASE }}
                        />
                      ) : null}
                      <span className="relative h-2.5 w-2.5 rotate-45 border border-current opacity-70" />
                      <span className="relative">{m.nombre}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </Paso>

          <Paso
            numero={2}
            titulo={metal.id === "oro" ? "Quilates" : "Ley"}
            accion={
              <Link to="/guia-del-oro" className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-tenue transition-colors hover:text-acento">
                <IconoInfo className="h-4 w-4" />
                ¿Cuál es la mía?
              </Link>
            }
          >
            <LayoutGroup id="ley">
              <div role="radiogroup" aria-label="Ley del metal" className={`grid gap-2 ${metal.leyes.length > 4 ? "grid-cols-4 sm:grid-cols-7" : "grid-cols-4"}`}>
                {metal.leyes.map((l) => {
                  const activo = l.id === ley.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      role="radio"
                      aria-checked={activo}
                      aria-label={l.nombre}
                      onClick={() => setLeyId(l.id)}
                      className={`relative flex min-h-[4.25rem] flex-col items-center justify-center rounded-[3px] border px-1 transition-colors ${
                        activo ? "border-transparent text-principal-tinta" : "border-borde text-tinta hover:border-acento/50"
                      }`}
                    >
                      {activo ? (
                        <motion.span
                          layoutId="ley-activa"
                          className="absolute inset-0 rounded-[3px]"
                          style={{ background: "var(--color-principal)" }}
                          transition={{ duration: 0.45, ease: EASE }}
                        />
                      ) : null}
                      <span className="relative font-display text-[1.6rem] leading-none">{metal.id === "oro" ? `${l.id}k` : l.corto}</span>
                      <span className={`relative mt-1 text-[0.62rem] font-bold tracking-[0.14em] ${activo ? "text-principal-tinta/70" : "text-tenue"}`}>
                        {metal.id === "oro" ? l.milesimas : `${numero(l.milesimas / 10, 1)} %`}
                      </span>
                      {l.habitual ? (
                        <span
                          className={`absolute -top-2 right-1/2 translate-x-1/2 rounded-[2px] px-1.5 py-px text-[0.5rem] font-extrabold uppercase tracking-[0.12em] ${
                            activo ? "bg-principal-tinta text-principal" : "bg-principal/10 text-principal"
                          }`}
                        >
                          Habitual
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
            <p className="mt-3 text-[0.82rem] leading-relaxed text-tenue">
              <span className="text-suave">{ley.nombre}.</span> {ley.uso}.
              {metal.id === "oro" ? " Busca el número grabado en la pieza: 750 es 18 k y 585 es 14 k." : null}
            </p>
          </Paso>

          <Paso numero={3} titulo="Peso">
            <div className="flex items-stretch gap-2">
              <button
                type="button"
                onClick={() => ajustarGramos(-1)}
                aria-label="Menos peso"
                className="grid w-14 shrink-0 place-items-center rounded-[3px] border border-borde text-suave transition-colors hover:border-acento hover:text-acento"
              >
                <IconoMenos className="h-5 w-5" />
              </button>
              <label className="relative flex min-w-0 flex-1 items-baseline justify-center gap-2 rounded-[3px] border border-borde bg-fondo/60 px-4 py-3 focus-within:border-acento">
                <span className="sr-only">Peso en gramos</span>
                <input
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={texto}
                  onChange={(e) => setTexto(e.target.value.replace(/[^\d.,]/g, "").slice(0, 7))}
                  onFocus={(e) => e.target.select()}
                  className="tabular w-full min-w-0 bg-transparent text-center font-display text-[2.6rem] leading-none text-tinta outline-none"
                  aria-invalid={!gramosValidos}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[0.85rem] font-bold uppercase tracking-[0.2em] text-tenue">g</span>
              </label>
              <button
                type="button"
                onClick={() => ajustarGramos(1)}
                aria-label="Más peso"
                className="grid w-14 shrink-0 place-items-center rounded-[3px] border border-borde text-suave transition-colors hover:border-acento hover:text-acento"
              >
                <IconoMas className="h-5 w-5" />
              </button>
            </div>

            <input
              type="range"
              min="0"
              max={DESLIZADOR.pasos}
              value={aDeslizador(gramosValidos ? g : DESLIZADOR.min)}
              onChange={(e) => setTexto(numero(desdeDeslizador(Number(e.target.value)), 1).replace(/\./g, ""))}
              onKeyDown={(e) => {
                const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
                if (d) {
                  e.preventDefault();
                  ajustarGramos(d);
                }
              }}
              aria-label="Peso en gramos"
              className="deslizador mt-5 w-full"
              style={{ "--avance": `${(aDeslizador(gramosValidos ? g : DESLIZADOR.min) / DESLIZADOR.pasos) * 100}%` }}
            />
            <div className="mt-1.5 flex justify-between text-[0.66rem] font-semibold text-tenue">
              <span>0,5 g</span>
              <span>10 g</span>
              <span>100 g</span>
              <span>1 kg</span>
            </div>

            {!gramosValidos ? (
              <p role="alert" className="mt-3 text-[0.82rem] text-cerrado">
                Escribe un peso entre 0,1 g y 5 kg.
              </p>
            ) : null}

            <div className="mt-5">
              <p className="mb-2.5 text-[0.75rem] text-tenue">¿Sin báscula? Pesos aproximados:</p>
              <div className="flex flex-wrap gap-2">
                {metal.ejemplos.map((ej) => (
                  <button
                    key={ej.nombre}
                    type="button"
                    onClick={() => {
                      setTexto(numero(ej.gramos, 1).replace(/\./g, ""));
                      if (ej.ley) setLeyId(ej.ley);
                    }}
                    className={`chip !py-1.5 ${g === ej.gramos ? "!border-acento/60 !text-realce" : ""}`}
                  >
                    {ej.nombre}
                    <span className="tabular text-tenue">~{numero(ej.gramos, 1)} g</span>
                  </button>
                ))}
              </div>
            </div>
          </Paso>
        </div>

        {/* Resultado */}
        <div className="relative flex flex-col border-t border-borde bg-[radial-gradient(ellipse_at_50%_25%,color-mix(in_srgb,var(--color-acento)_10%,transparent),transparent_65%)] p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-11">
          <div className="relative">
            <Pulsera3D
              tono={ley.tono}
              encuadre={0.95}
              etiqueta={`Pulsera barbada en ${ley.nombre.toLowerCase()}`}
              className="mx-auto aspect-[16/10] w-full max-w-[26rem]"
            />
            <p className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[2px] border border-borde bg-fondo/85 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-suave backdrop-blur [font-stretch:112.5%]">
              {metal.id === "oro" ? `Oro ${ley.id} k · ${ley.milesimas}` : `${metal.nombre} ${ley.corto}`}
            </p>
          </div>

          <p className="sr-only" aria-live="polite">
            {gramosValidos ? `Estimación: de ${euros(resultado.min)} a ${euros(resultado.max)}` : ""}
          </p>
          <div className="mt-2 text-center">
            <p className="eyebrow eyebrow-centrado justify-center !text-tenue">Te ofrecemos aprox.</p>
            <p className="cifra mt-4 flex flex-wrap items-baseline justify-center gap-x-4 text-[clamp(2.5rem,5vw,3.7rem)] leading-none text-tinta">
              <span>
                <Cifra valor={resultado.min} formato={importe} duracion={0.9} />
                <span className="moneda">€</span>
              </span>
              <span aria-hidden="true" className="inline-block h-px w-10 self-center bg-tenue" />
              <span className="realce">
                <Cifra valor={resultado.max} formato={importe} duracion={0.9} />
                <span className="moneda">€</span>
              </span>
            </p>
            <p className="mx-auto mt-4 max-w-sm text-[0.88rem] leading-relaxed text-suave">
              {fmtGramos(resultado.fino)} de {metal.nombre.toLowerCase()} {metal.id === "plata" ? "pura" : "puro"} × {eurosGramo(gramoFino)}
              <span className="text-tenue"> = valor del metal </span>
              <span className="tabular text-tinta">{euros(resultado.valor)}</span>
            </p>
            <p className="mt-3 flex items-center justify-center gap-2 text-[0.72rem] font-semibold text-tenue">
              <Punto color={directo ? "var(--color-acento)" : "var(--color-tenue)"} latido={directo} />
              {textoActualizacion(cotizacion)}
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <a
              href={enlaceWhatsApp(mensajePieza)}
              target="_blank"
              rel="noopener"
              className="boton boton-principal !px-4 !text-[0.74rem]"
            >
              <IconoWhatsApp className="h-[18px] w-[18px]" />
              Reservar tasación
            </a>
            <button type="button" onClick={anadirAlLote} disabled={!gramosValidos} className="boton boton-linea !px-4 !text-[0.74rem] disabled:opacity-40">
              <IconoMas className="h-4 w-4" />
              Añadir al lote
            </button>
          </div>

          <p className="mt-6 text-center text-[0.75rem] leading-relaxed text-tenue">
            Estimación orientativa: entre el {numero(pago.min * 100)} y el {numero(pago.max * 100)} % del valor del metal. La oferta
            definitiva te la damos en tienda, tras pesar y comprobar la ley delante de ti.
          </p>
        </div>
      </div>

      {/* Lote de varias piezas */}
      <AnimatePresence initial={false}>
        {piezasLote.length ? (
          <motion.div
            key="lote"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative overflow-hidden border-t border-borde"
          >
            <div className="p-5 sm:p-8 lg:px-11">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-[1.8rem]">Tu lote</h3>
                <p className="text-[0.8rem] text-tenue">
                  {piezasLote.length} {piezasLote.length === 1 ? "pieza" : "piezas"} · valor del metal{" "}
                  <span className="tabular text-suave">{euros(totalLote.valor)}</span>
                </p>
              </div>
              <ul className="mt-5 grid gap-2">
                <AnimatePresence initial={false}>
                  {piezasLote.map((p, i) => (
                    <motion.li
                      key={p.id}
                      layout
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex items-center gap-4 rounded-[3px] border border-borde bg-fondo/50 px-4 py-3"
                    >
                      <span className="tabular text-[0.7rem] font-bold text-tenue">{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-2.5 w-2.5 shrink-0 rotate-45 border border-acento/60" />
                      <span className="min-w-0 flex-1 text-[0.92rem] text-tinta">
                        {fmtGramos(p.gramos)} <span className="text-suave">de {nombreLey(p.metal, p.ley)}</span>
                      </span>
                      <span className="tabular hidden text-[0.92rem] text-suave sm:block">
                        {euros(p.min)} – {euros(p.max)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setLote((l) => l.filter((x) => x.id !== p.id))}
                        aria-label="Quitar pieza"
                        className="grid h-8 w-8 place-items-center rounded-full text-tenue transition-colors hover:bg-hundido hover:text-tinta"
                      >
                        <IconoCerrar className="h-4 w-4" />
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div className="mt-6 flex flex-col gap-4 rounded-[3px] border border-acento/30 bg-acento/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-tenue">Total estimado</p>
                  <p className="cifra mt-2 flex items-baseline gap-3 text-[2.1rem] leading-none text-tinta">
                    <span>
                      {importe(totalLote.min)}
                      <span className="moneda">€</span>
                    </span>
                    <span aria-hidden="true" className="inline-block h-px w-8 self-center bg-tenue" />
                    <span className="realce">
                      {importe(totalLote.max)}
                      <span className="moneda">€</span>
                    </span>
                  </p>
                </div>
                <a href={enlaceWhatsApp(mensajeLote)} target="_blank" rel="noopener" className="boton boton-principal !text-[0.74rem]">
                  <IconoWhatsApp className="h-[18px] w-[18px]" />
                  Enviar mi lote
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
