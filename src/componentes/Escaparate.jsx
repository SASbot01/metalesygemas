import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PIEZAS } from "../datos/galeria.js";
import { enlaceWhatsApp } from "../lib/whatsapp.js";
import { Imagen } from "./Imagen.jsx";
import { IconoPlay, IconoWhatsApp } from "./Iconos.jsx";

function TarjetaPieza({ pieza, indice, className = "" }) {
  return (
    <figure className={`group relative ${className}`}>
      <div className="relative overflow-hidden rounded-[3px] border border-borde">
        <Imagen
          nombre={pieza.imagen}
          alt={pieza.alt}
          ratio="9/16"
          sizes="(min-width: 1024px) 24vw, 72vw"
          claseImg="transition-transform duration-[1.4s] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010519] via-[#010519]/15 to-transparent" />
        <span className="absolute left-4 top-4 rounded-[2px] border border-[#fffee9]/25 bg-[#010519]/50 px-3 py-1 text-[0.65rem] font-medium tracking-[0.2em] text-[#fffee9] backdrop-blur">
          {String(indice + 1).padStart(2, "0")}
        </span>
        {pieza.enlace ? (
          <a
            href={pieza.enlace}
            target="_blank"
            rel="noopener"
            aria-label={`Ver el vídeo de «${pieza.nombre}» en TikTok`}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-[#010519]/55 text-[#fffee9] backdrop-blur transition-transform duration-500 hover:scale-110"
          >
            <IconoPlay className="h-3.5 w-3.5 translate-x-px" />
          </a>
        ) : null}
        <figcaption className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-display text-[1.45rem] leading-[1.05] text-[#fffee9]">{pieza.nombre}</p>
          <p className="mt-2 text-[0.66rem] font-medium uppercase tracking-[0.14em] text-[#c9cfe1] [font-stretch:112.5%]">{pieza.detalle}</p>
          <a
            href={enlaceWhatsApp(`Hola, he visto en vuestra web la pieza «${pieza.nombre}». ¿Me podéis dar más información?`)}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex items-center gap-2 rounded-[2px] border border-[#fffee9]/25 bg-[#010519]/50 px-3.5 py-2 text-[0.66rem] font-medium uppercase tracking-[0.12em] text-[#fffee9] backdrop-blur transition-colors hover:border-[#fffee9]"
          >
            <IconoWhatsApp className="h-4 w-4" />
            Preguntar
          </a>
        </figcaption>
      </div>
    </figure>
  );
}

/*
 * Las piezas de su escaparate. En escritorio, una fila de piezas que suben y bajan a
 * distinto ritmo al hacer scroll; en móvil, un carrusel que se desliza con el dedo.
 */
export function Escaparate({ cabecera, pie, piezas = PIEZAS.slice(0, 4), columnas = "grid-cols-4" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const subir = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const bajar = useTransform(scrollYProgress, [0, 1], [-30, 50]);

  return (
    <div ref={ref} className="py-24 lg:py-32">
      <div className="contenedor">{cabecera}</div>

      <div className="sin-barra mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 lg:hidden">
        {piezas.map((p, i) => (
          <TarjetaPieza key={p.id ?? p.imagen} pieza={p} indice={i} className="w-[68vw] max-w-[19rem] shrink-0 snap-center" />
        ))}
      </div>

      <div className={`contenedor mt-16 hidden gap-6 pb-16 lg:grid ${columnas}`}>
        {piezas.map((p, i) => (
          <motion.div key={p.id ?? p.imagen} style={{ y: i % 2 ? bajar : subir }}>
            <TarjetaPieza pieza={p} indice={i} />
          </motion.div>
        ))}
      </div>

      {pie ? <div className="contenedor mt-10 lg:mt-6">{pie}</div> : null}
    </div>
  );
}
