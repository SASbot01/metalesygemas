import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { GUIA_QUILATES } from "../datos/metales.js";
import { porcentaje } from "../lib/formato.js";
import { EASE } from "./Animaciones.jsx";

/* El contraste: el número que se graba en las joyas para indicar su ley. */
function Contraste({ milesimas }) {
  return (
    <div className="relative inline-flex items-center gap-3 rounded-[3px] border border-acento/50 px-4 py-2.5">
      <span className="text-[0.56rem] font-extrabold uppercase leading-tight tracking-[0.2em] text-tenue">
        Contraste
        <br />
        grabado
      </span>
      <span className="h-8 w-px bg-acento/30" />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={milesimas}
          initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -18, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: EASE }}
          className="realce font-display text-[2.2rem] leading-none tracking-[0.06em]"
        >
          {milesimas}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/*
 * La ley del oro, para tocarla: eliges los quilates y la cuadrícula enseña
 * cuántas de cada cien partes son oro puro.
 */
export function LeyDelOro() {
  const [indice, setIndice] = useState(2);
  const ley = GUIA_QUILATES[indice];
  const partesOro = Math.round(ley.milesimas / 10);

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <LayoutGroup id="quilates">
        <div role="tablist" aria-label="Quilates del oro" className="grid grid-cols-5 gap-1 lg:flex lg:flex-col">
          {GUIA_QUILATES.map((q, i) => {
            const activo = i === indice;
            return (
              <button
                key={q.quilates}
                type="button"
                role="tab"
                aria-selected={activo}
                aria-controls="panel-quilates"
                onClick={() => setIndice(i)}
                className={`group relative flex items-baseline justify-center gap-4 rounded-[3px] px-1 py-3 text-left transition-colors sm:px-5 lg:justify-start lg:py-4 ${
                  activo ? "" : "hover:bg-tinta/[0.03]"
                }`}
              >
                {activo ? (
                  <motion.span
                    layoutId="quilate-activo"
                    className="absolute inset-0 rounded-[3px] border border-acento/40 bg-acento/[0.07]"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                ) : null}
                <span
                  className={`relative font-display leading-none transition-colors duration-500 ${
                    activo ? "realce text-[2.1rem] sm:text-[3.4rem] lg:text-[4.6rem]" : "text-[2.1rem] text-tinta/50 group-hover:text-tinta/75 sm:text-[3.4rem] lg:text-[4.6rem]"
                  }`}
                >
                  {q.quilates}
                  <span className="ml-0.5 font-sans text-[0.62rem] font-bold uppercase tracking-[0.1em] sm:ml-1 sm:text-[0.8rem] sm:tracking-[0.2em]">k</span>
                </span>
                <span className={`relative hidden text-[0.95rem] transition-colors lg:block ${activo ? "text-tinta" : "text-tenue"}`}>
                  {q.titulo}
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <div id="panel-quilates" role="tabpanel" className="tarjeta borde-fino rounded-[3px] p-6 sm:p-9">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-tenue">Oro puro</p>
            <p className="tabular mt-2 font-display text-[3.6rem] leading-none text-tinta">{porcentaje(ley.milesimas)}</p>
          </div>
          <Contraste milesimas={ley.milesimas} />
        </div>

        {/* Cien partes: las doradas son oro puro. */}
        <div
          className="mt-8 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px] sm:gap-1"
          role="img"
          aria-label={`${partesOro} de cada 100 partes son oro puro`}
        >
          {Array.from({ length: 100 }, (_, i) => {
            const oro = i < partesOro;
            return (
              <span
                key={i}
                className="aspect-square rounded-[3px] transition-[background-color,transform,box-shadow] duration-500"
                style={{
                  transitionDelay: `${i * 5}ms`,
                  background: oro ? "var(--color-acento)" : "var(--color-hundido)",
                  transform: oro ? "scale(1)" : "scale(0.82)",
                }}
              />
            );
          })}
        </div>
        <div className="mt-3 flex justify-between text-[0.72rem] font-semibold text-tenue">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-[2px] bg-acento" /> Oro puro
          </span>
          <span className="flex items-center gap-2">
            Plata, cobre y otros metales <span className="h-2.5 w-2.5 rounded-[2px] bg-hundido" />
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={ley.quilates}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-8 border-t border-borde pt-7"
          >
            <h3 className="font-display text-[2rem] leading-tight">
              {ley.quilates} quilates · <span className="italic text-acento">{ley.titulo.toLowerCase()}</span>
            </h3>
            <p className="texto-cuerpo mt-3">{ley.texto}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
