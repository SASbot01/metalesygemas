import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COMPRAMOS, CIFRAS, PREGUNTAS, VALORES } from "../datos/contenido.js";
import { COLORES_ORO, ORO_AUTENTICO } from "../datos/metales.js";
import { numero } from "../lib/formato.js";
import { useFoco } from "../hooks/useFoco.js";
import { Aparecer, Cifra, EASE, Escalonado, Hijo, TextoRevelado } from "./Animaciones.jsx";
import { ICONOS, IconoMas } from "./Iconos.jsx";

/* Cabecera de las páginas interiores. */
export function CabeceraPagina({ antetitulo, titulo, children, derecha }) {
  return (
    <header className="relative isolate overflow-hidden pt-[calc(var(--nav-h)+4rem)] pb-14 lg:pt-[calc(var(--nav-h)+6rem)] lg:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(52,78,175,0.3),transparent_65%)]"
      />
      <div className="contenedor grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Aparecer as="p" className="eyebrow">
            {antetitulo}
          </Aparecer>
          <TextoRevelado as="h1" alCargar retraso={0.1} lineas={titulo} className="mt-6 text-[clamp(2.8rem,6vw,6rem)] leading-[0.98] tracking-[-0.02em]" />
          {children ? (
            <Aparecer delay={0.35} className="texto-cuerpo mt-7 max-w-2xl">
              {children}
            </Aparecer>
          ) : null}
        </div>
        {derecha ? <Aparecer delay={0.4}>{derecha}</Aparecer> : null}
      </div>
    </header>
  );
}

/* Lo que compramos, en rejilla con foco de luz. */
export function Compramos() {
  const foco = useFoco();
  return (
    <Escalonado className="grid gap-px overflow-hidden rounded-[3px] border border-borde bg-borde sm:grid-cols-2 lg:grid-cols-3">
      {COMPRAMOS.map((c) => {
        const Icono = ICONOS[c.icono];
        return (
          <Hijo key={c.titulo} className="foco relative bg-fondo p-7 lg:p-9" onPointerMove={foco}>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-acento/35 text-acento">
              <Icono className="h-6 w-6" grosor={1.3} />
            </span>
            <h3 className="mt-6 font-display text-[1.75rem] leading-tight">{c.titulo}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-suave">{c.texto}</p>
          </Hijo>
        );
      })}
    </Escalonado>
  );
}

/* Cifras de su página «Nosotros», contando hacia arriba. */
export function Cifras() {
  return (
    <Escalonado className="grid gap-px overflow-hidden rounded-[3px] border border-borde bg-borde md:grid-cols-3">
      {CIFRAS.map((c) => (
        <Hijo key={c.etiqueta} className="bg-fondo p-7 lg:p-9">
          <p className="font-display text-[clamp(3.4rem,6vw,5rem)] leading-none text-tinta">
            <span className="realce">{c.prefijo}</span>
            <Cifra valor={c.valor} formato={(v) => (c.sinSeparador ? String(Math.round(v)) : numero(v))} desde={c.sinSeparador ? 1990 : 0} />
            <span className="realce">{c.sufijo}</span>
          </p>
          <p className="mt-3 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-acento">{c.etiqueta}</p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-suave">{c.texto}</p>
        </Hijo>
      ))}
    </Escalonado>
  );
}

export function Valores() {
  return (
    <Escalonado className="grid gap-10 md:grid-cols-3">
      {VALORES.map((v, i) => (
        <Hijo key={v.titulo} className="border-t border-borde pt-7">
          <p className="font-display text-[1.1rem] text-acento">0{i + 1}</p>
          <h3 className="mt-2 font-display text-[2.1rem] leading-tight">{v.titulo}</h3>
          <p className="texto-cuerpo mt-3">{v.texto}</p>
        </Hijo>
      ))}
    </Escalonado>
  );
}

export function ColoresOro() {
  return (
    <Escalonado className="grid gap-5 md:grid-cols-3">
      {COLORES_ORO.map((c) => (
        <Hijo key={c.nombre} className="tarjeta rounded-[3px] p-7">
          <span className="block h-16 w-16 rounded-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.4)]" style={{ background: c.muestra }} />
          <h3 className="mt-6 font-display text-[1.9rem] leading-tight">{c.nombre}</h3>
          <p className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-acento">{c.aleacion}</p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-suave">{c.texto}</p>
        </Hijo>
      ))}
    </Escalonado>
  );
}

export function OroAutentico() {
  const foco = useFoco();
  return (
    <Escalonado className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {ORO_AUTENTICO.map((t, i) => {
        const Icono = ICONOS[t.icono];
        return (
          <Hijo key={t.titulo} className="tarjeta foco rounded-[3px] p-7" onPointerMove={foco}>
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-acento/35 text-acento">
                <Icono className="h-6 w-6" grosor={1.3} />
              </span>
              <span className="font-display text-[1.1rem] text-tenue">0{i + 1}</span>
            </div>
            <h3 className="mt-6 font-display text-[1.7rem] leading-tight">{t.titulo}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-suave">{t.texto}</p>
          </Hijo>
        );
      })}
    </Escalonado>
  );
}

/* Preguntas frecuentes en acordeón. */
export function Preguntas({ preguntas = PREGUNTAS }) {
  const [abierta, setAbierta] = useState(0);
  return (
    <div className="divide-y divide-borde border-y border-borde">
      {preguntas.map((item, i) => {
        const activa = abierta === i;
        return (
          <div key={item.p}>
            <h3>
              <button
                type="button"
                aria-expanded={activa}
                onClick={() => setAbierta(activa ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className={`font-display text-[1.45rem] leading-snug transition-colors sm:text-[1.65rem] ${activa ? "text-realce" : "text-tinta"}`}>
                  {item.p}
                </span>
                <motion.span
                  animate={{ rotate: activa ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-borde text-acento"
                >
                  <IconoMas className="h-4 w-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {activa ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="texto-cuerpo max-w-3xl pb-7">{item.r}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
