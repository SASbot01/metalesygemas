import { motion } from "framer-motion";
import { NEGOCIO } from "../datos/negocio.js";
import { Pulsera3D } from "./Pulsera3D.jsx";
import { Imagen } from "./Imagen.jsx";
import { Boton } from "./Botones.jsx";
import { EASE, TextoRevelado } from "./Animaciones.jsx";
import { EstadoTienda } from "./Indicadores.jsx";
import { Estrellas, IconoGoogle } from "./Resenas.jsx";
import { BandaCotizacion } from "./BandaCotizacion.jsx";

/* Círculos concéntricos finos, como el guilloché de un certificado. */
function Guilloche({ className = "" }) {
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true" className={className}>
      {Array.from({ length: 22 }, (_, i) => (
        <circle key={i} cx="300" cy="300" r={40 + i * 12} fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray={i % 3 === 0 ? "2 5" : undefined} />
      ))}
    </svg>
  );
}

const aparecer = (retraso) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay: retraso, ease: EASE },
});

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-[var(--nav-h)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-12%] top-[8%] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(52,78,175,0.38),rgba(52,78,175,0.1)_42%,transparent_70%)] max-lg:right-[-40%] max-lg:top-[-6%]" />
        <Guilloche className="absolute right-[-8%] top-[2%] h-[52rem] w-[52rem] text-acento/[0.07] max-lg:right-[-55%] max-lg:top-[-12%]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-fondo" />
      </div>

      <div className="contenedor grid items-center gap-4 pb-12 pt-2 lg:min-h-[calc(100svh-var(--nav-h)-6rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pb-14 lg:pt-4">
        {/* Pulsera barbada en 3D */}
        <div className="relative order-first lg:order-last">
          <Pulsera3D
            tono="oro18"
            encuadre={0.9}
            etiqueta="Pulsera barbada de oro de 18 quilates girando"
            className="mx-auto aspect-[2/1] max-h-[30svh] w-full max-w-[34rem] sm:aspect-[16/10] sm:max-h-[44svh] lg:aspect-[1/1] lg:max-h-none lg:max-w-none"
            respaldo={<Imagen nombre="joya-portada" alt="" prioridad className="absolute inset-[6%] rounded-[3px]" />}
          />
        </div>

        {/* Texto */}
        <div className="relative z-10 max-w-[44rem]">
          <motion.p {...aparecer(0.15)} className="eyebrow">
            <span className="sm:hidden">Joyería y oro · Alicante</span>
            <span className="hidden sm:inline">Joyería y compraventa de oro · Alicante</span>
          </motion.p>

          <TextoRevelado
            as="h1"
            alCargar
            retraso={0.25}
            className="mt-5 text-[clamp(2.7rem,4.9vw,5.3rem)] leading-[0.96] lg:mt-6"
            lineas={[
              "Joyas exclusivas.",
              <>
                Tu oro, <em className="realce pr-2 italic">al precio</em>
              </>,
              <em key="hoy" className="realce pr-2 italic">
                de hoy.
              </em>,
            ]}
          />

          <motion.p {...aparecer(0.7)} className="texto-cuerpo mt-7 max-w-[34rem]">
            Más de quince años creando, comprando y tasando joyas en el centro de Alicante. Pesamos y analizamos tu oro{" "}
            <span className="text-tinta">delante de ti</span>, con la cotización del día y sin compromiso.
          </motion.p>

          <motion.div {...aparecer(0.85)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Boton a="#tasador" flecha>
              Calcular cuánto vale mi oro
            </Boton>
            <Boton a="/joyeria" variante="linea">
              Ver joyas
            </Boton>
          </motion.div>

          <motion.ul
            {...aparecer(1)}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.82rem] text-suave"
          >
            <li>
              <a href={NEGOCIO.fichaGoogle} target="_blank" rel="noopener" className="flex items-center gap-2 transition-colors hover:text-tinta">
                <IconoGoogle className="h-4 w-4" />
                <Estrellas nota={NEGOCIO.google.nota} className="h-3.5 w-3.5" />
                <span className="tabular text-tinta">4,8</span>
              </a>
            </li>
            <li className="h-3 w-px bg-borde" aria-hidden="true" />
            <li>Desde {NEGOCIO.desde}</li>
            <li className="hidden h-3 w-px bg-borde sm:block" aria-hidden="true" />
            <li>Sin compromiso</li>
            <li className="hidden h-3 w-px bg-borde sm:block" aria-hidden="true" />
            <li className="hidden sm:block">
              <EstadoTienda />
            </li>
          </motion.ul>
        </div>
      </div>

      <BandaCotizacion />
    </section>
  );
}
