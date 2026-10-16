import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PASOS } from "../datos/contenido.js";
import { Escalonado, Hijo } from "./Animaciones.jsx";

/* Los tres pasos para vender oro, unidos por una línea que se dibuja al bajar. */
export function Pasos() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const avance = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute left-0 right-0 top-[1.85rem] hidden h-px bg-borde md:block">
        <motion.div style={{ scaleX: avance, background: "var(--color-acento)" }} className="h-full origin-left" />
      </div>
      <div aria-hidden="true" className="absolute bottom-0 left-[1.85rem] top-0 w-px bg-borde md:hidden">
        <motion.div style={{ scaleY: avance, background: "var(--color-acento)" }} className="h-full w-full origin-top" />
      </div>

      <Escalonado as="ol" paso={0.15} className="relative grid gap-12 md:grid-cols-3 md:gap-10">
        {PASOS.map((paso) => (
          <Hijo as="li" key={paso.numero} className="relative pl-20 md:pl-0">
            <span className="absolute left-0 top-0 grid h-[3.7rem] w-[3.7rem] place-items-center rounded-full border border-acento/40 bg-fondo font-display text-[1.6rem] italic text-acento md:relative">
              {paso.numero}
            </span>
            <h3 className="font-display text-[1.9rem] leading-tight md:mt-8">{paso.titulo}</h3>
            <p className="texto-cuerpo mt-3 max-w-sm">{paso.texto}</p>
          </Hijo>
        ))}
      </Escalonado>
    </div>
  );
}
