import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { enlaceWhatsApp } from "../lib/whatsapp.js";
import { pararScroll, reanudarScroll } from "../lib/scroll.js";
import { EASE } from "./Animaciones.jsx";
import { Imagen } from "./Imagen.jsx";
import { IconoCerrar, IconoFlecha, IconoPlay, IconoWhatsApp } from "./Iconos.jsx";

/*
 * Galería en columnas. Al pulsar una foto, se abre a pantalla completa con una
 * transición compartida; se navega con flechas o teclado y se cierra con Esc.
 */
export function Galeria({ fotos, prefijo, rejilla = false, columnas = "grid-cols-2 md:grid-cols-3" }) {
  const [abierta, setAbierta] = useState(null);
  const foto = abierta === null ? null : fotos[abierta];
  const visible = abierta !== null;
  const origen = useRef(null);
  const dialogo = useRef(null);
  const cerrar = useRef(null);

  const mover = useCallback((delta) => setAbierta((i) => (i === null ? i : (i + delta + fotos.length) % fotos.length)), [fotos.length]);

  /* Al abrir: se para el scroll y el foco entra en el visor; al cerrar, vuelve a la miniatura. */
  useEffect(() => {
    if (!visible) return;
    pararScroll();
    const id = requestAnimationFrame(() => cerrar.current?.focus());
    const desde = origen.current;
    return () => {
      cancelAnimationFrame(id);
      reanudarScroll();
      desde?.focus({ preventScroll: true });
    };
  }, [visible]);

  /* Teclado: Esc cierra, flechas pasan de foto y Tab no sale del visor. */
  useEffect(() => {
    if (!visible) return;
    const alTeclear = (e) => {
      if (e.key === "Escape") setAbierta(null);
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
      if (e.key === "Tab" && dialogo.current) {
        const enfocables = [...dialogo.current.querySelectorAll("button, a[href]")];
        if (!enfocables.length) return;
        const primero = enfocables[0];
        const ultimo = enfocables[enfocables.length - 1];
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero.focus();
        }
      }
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [visible, mover]);

  return (
    <>
      <div className={rejilla ? `grid gap-3 sm:gap-4 lg:gap-5 ${columnas}` : "columns-2 gap-4 md:columns-3 lg:gap-5"}>
        {fotos.map((f, i) => (
          <motion.button
            key={f.imagen}
            type="button"
            onClick={(e) => {
              origen.current = e.currentTarget;
              setAbierta(i);
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.07, ease: EASE }}
            className={`group relative block w-full break-inside-avoid overflow-hidden rounded-[3px] border border-borde text-left ${rejilla ? "" : "mb-4 lg:mb-5"}`}
            aria-label={`Ampliar: ${f.nombre ?? f.alt}`}
          >
            <motion.div layoutId={`${prefijo}-${f.imagen}`} className="overflow-hidden rounded-[3px]">
              <Imagen
                nombre={f.imagen}
                alt={f.alt}
                ratio={f.ratio}
                sizes="(min-width: 768px) 33vw, 50vw"
                claseImg="transition-transform duration-[1.4s] group-hover:scale-[1.05]"
              />
            </motion.div>
            {f.enlace ? (
              <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[#010519]/55 text-[#fffee9] backdrop-blur transition-transform duration-500 group-hover:scale-110">
                <IconoPlay className="h-3.5 w-3.5 translate-x-px" />
              </span>
            ) : null}
            {f.nombre ? (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#010519]/95 via-[#010519]/50 to-transparent p-3 pt-14 sm:p-4 sm:pt-16">
                <span className="block font-display text-[1.15rem] leading-tight text-[#fffee9] sm:text-[1.4rem]">{f.nombre}</span>
                <span className="mt-1 block text-[0.62rem] font-medium uppercase tracking-[0.14em] text-[#c9cfe1] [font-stretch:112.5%] sm:text-[0.66rem]">
                  {f.detalle}
                </span>
              </span>
            ) : null}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {foto ? (
          <motion.div
            key="visor"
            ref={dialogo}
            role="dialog"
            aria-modal="true"
            aria-label={foto.nombre ?? foto.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[80] flex flex-col bg-fondo/95 backdrop-blur-xl"
            onClick={() => setAbierta(null)}
            data-lenis-prevent
          >
            <div className="contenedor flex h-[var(--nav-h)] shrink-0 items-center justify-between">
              <span className="tabular text-[0.75rem] font-bold tracking-[0.2em] text-tenue">
                {String(abierta + 1).padStart(2, "0")} / {String(fotos.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                ref={cerrar}
                onClick={() => setAbierta(null)}
                aria-label="Cerrar"
                className="grid h-11 w-11 place-items-center rounded-full border border-borde text-tinta transition-colors hover:border-acento"
              >
                <IconoCerrar className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20">
              <motion.div
                layoutId={`${prefijo}-${foto.imagen}`}
                onClick={(e) => e.stopPropagation()}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative h-full max-h-[78vh] overflow-hidden rounded-[3px]"
                style={{ aspectRatio: foto.ratio }}
              >
                <Imagen nombre={foto.imagen} alt={foto.alt} className="h-full w-full" sizes="90vw" cubrir={false} />
              </motion.div>

              {fotos.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      mover(-1);
                    }}
                    aria-label="Anterior"
                    className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 rotate-180 place-items-center rounded-full border border-borde bg-fondo/70 text-tinta transition-colors hover:border-acento sm:left-6"
                  >
                    <IconoFlecha className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      mover(1);
                    }}
                    aria-label="Siguiente"
                    className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-borde bg-fondo/70 text-tinta transition-colors hover:border-acento sm:right-6"
                  >
                    <IconoFlecha className="h-5 w-5" />
                  </button>
                </>
              ) : null}
            </div>

            <div className="contenedor flex shrink-0 flex-col items-center gap-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                {foto.nombre ? <p className="font-display text-[1.8rem] leading-none text-tinta">{foto.nombre}</p> : null}
                <p className="mt-1 text-[0.85rem] text-suave">{foto.detalle ?? foto.alt}</p>
              </div>
              {foto.nombre ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  {foto.enlace ? (
                    <a
                      href={foto.enlace}
                      target="_blank"
                      rel="noopener"
                      onClick={(e) => e.stopPropagation()}
                      className="boton boton-linea !text-[0.72rem]"
                    >
                      <IconoPlay className="h-3.5 w-3.5" />
                      Ver el vídeo en TikTok
                    </a>
                  ) : null}
                  <a
                    href={enlaceWhatsApp(`Hola, he visto en vuestra web la pieza «${foto.nombre}». ¿Me podéis dar más información?`)}
                    target="_blank"
                    rel="noopener"
                    onClick={(e) => e.stopPropagation()}
                    className="boton boton-principal !text-[0.74rem]"
                  >
                    <IconoWhatsApp className="h-4 w-4" />
                    Preguntar por esta pieza
                  </a>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
