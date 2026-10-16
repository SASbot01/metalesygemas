import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { enlaceTelefono, enlaceWhatsApp } from "../lib/whatsapp.js";
import { irA } from "../lib/scroll.js";
import { EASE } from "./Animaciones.jsx";
import { IconoBalanza, IconoTelefono, IconoWhatsApp } from "./Iconos.jsx";
import { Link } from "react-router-dom";

/* En móvil, una barra fija con lo esencial; en escritorio, el botón de WhatsApp. */
export function AccionesFlotantes() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 420));

  const tasarAqui = pathname === "/" || pathname === "/tasador";

  return (
    <>
      <AnimatePresence>
        {visible ? (
          <motion.a
            key="wa"
            href={enlaceWhatsApp()}
            target="_blank"
            rel="noopener"
            aria-label="Escríbenos por WhatsApp"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="group fixed bottom-7 right-7 z-40 hidden items-center gap-3 lg:flex"
          >
            <span className="pointer-events-none translate-x-3 rounded-[2px] border border-borde bg-fondo-2/90 px-4 py-2 text-[0.78rem] font-semibold text-tinta opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
              ¿Hablamos?
            </span>
            <span className="borde-fino grid h-14 w-14 place-items-center rounded-full bg-fondo-2 text-acento shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-110">
              <IconoWhatsApp className="h-6 w-6" />
            </span>
          </motion.a>
        ) : null}
      </AnimatePresence>

      <nav
        aria-label="Acciones rápidas"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-borde bg-fondo/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      >
        <div className="grid grid-cols-3">
          <a href={enlaceTelefono(0)} className="flex flex-col items-center gap-1 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-suave">
            <IconoTelefono className="h-5 w-5 text-tinta" />
            Llamar
          </a>
          <a
            href={enlaceWhatsApp()}
            target="_blank"
            rel="noopener"
            className="flex flex-col items-center gap-1 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-acento"
          >
            <IconoWhatsApp className="h-5 w-5" />
            WhatsApp
          </a>
          {tasarAqui ? (
            <a
              href="#tasador"
              onClick={(e) => irA("tasador") && e.preventDefault()}
              className="flex flex-col items-center gap-1 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-suave"
            >
              <IconoBalanza className="h-5 w-5 text-tinta" />
              Tasar
            </a>
          ) : (
            <Link to="/tasador" className="flex flex-col items-center gap-1 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-suave">
              <IconoBalanza className="h-5 w-5 text-tinta" />
              Tasar
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
