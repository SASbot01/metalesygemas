import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICIOS } from "../datos/contenido.js";
import { Imagen } from "./Imagen.jsx";
import { EASE, Escalonado, Hijo } from "./Animaciones.jsx";
import { useFoco } from "../hooks/useFoco.js";

/*
 * Los cuatro servicios. En escritorio, paneles que se abren al pasar el ratón;
 * en móvil, tarjetas apiladas con su foto.
 */
export function ServiciosPaneles() {
  const [activo, setActivo] = useState(1);
  const foco = useFoco();

  return (
    <>
      <div className="hidden h-[34rem] gap-3 lg:flex">
        {SERVICIOS.map((s, i) => {
          const abierto = i === activo;
          return (
            <motion.button
              key={s.id}
              type="button"
              onMouseEnter={() => setActivo(i)}
              onFocus={() => setActivo(i)}
              onClick={() => setActivo(i)}
              aria-expanded={abierto}
              animate={{ flexGrow: abierto ? 3.2 : 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="group relative min-w-0 flex-1 overflow-hidden rounded-[3px] border border-borde text-left"
            >
              <Imagen
                nombre={s.imagen}
                alt={s.alt}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="absolute inset-0"
                claseImg={`transition-transform duration-[1.6s] ${abierto ? "scale-100" : "scale-110"}`}
              />
              <div
                className={`absolute inset-0 transition-colors duration-700 ${
                  abierto ? "bg-gradient-to-t from-fondo via-fondo/55 to-fondo/5" : "bg-fondo/75"
                }`}
              />
              <span className="absolute left-6 top-6 font-display text-[1.25rem] text-acento">{s.numero}</span>

              <AnimatePresence mode="wait" initial={false}>
                {abierto ? (
                  <motion.div
                    key="abierto"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25, ease: EASE } }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="absolute inset-x-0 bottom-0 p-8"
                  >
                    <h3 className="font-display text-[2.4rem] leading-none text-tinta">{s.titulo}</h3>
                    <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-suave">{s.texto}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="cerrado"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.2 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    className="absolute inset-x-0 bottom-0 flex justify-center p-6"
                  >
                    <span className="whitespace-nowrap font-display text-[1.6rem] text-tinta [writing-mode:vertical-rl] rotate-180">
                      {s.titulo}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <Escalonado className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {SERVICIOS.map((s) => (
          <Hijo key={s.id} className="tarjeta foco overflow-hidden" onPointerMove={foco}>
            <Imagen nombre={s.imagen} alt={s.alt} ratio="16/10" sizes="(min-width: 640px) 50vw, 100vw" />
            <div className="p-6">
              <span className="font-display text-[1.1rem] text-acento">{s.numero}</span>
              <h3 className="mt-1 font-display text-[2rem] leading-tight">{s.titulo}</h3>
              <p className="texto-cuerpo mt-3">{s.texto}</p>
            </div>
          </Hijo>
        ))}
      </Escalonado>
    </>
  );
}
