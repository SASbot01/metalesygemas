import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAVEGACION, NEGOCIO } from "../datos/negocio.js";
import { enlaceTelefono, enlaceWhatsApp } from "../lib/whatsapp.js";
import { pararScroll, reanudarScroll } from "../lib/scroll.js";
import { Marca } from "./Marca.jsx";
import { EstadoTienda, PrecioEnDirecto } from "./Indicadores.jsx";
import { Boton } from "./Botones.jsx";
import { EASE } from "./Animaciones.jsx";
import { IconoCerrar, IconoInstagram, IconoMenu, IconoTelefono, IconoTikTok, IconoUbicacion, IconoWhatsApp } from "./Iconos.jsx";

export function Cabecera() {
  const { scrollY } = useScroll();
  const [solida, setSolida] = useState(false);
  const [oculta, setOculta] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previo = scrollY.getPrevious() ?? 0;
    setSolida(y > 24);
    setOculta(y > 260 && y > previo + 2 ? true : y < previo - 2 ? false : oculta);
  });

  useEffect(() => setAbierto(false), [pathname]);

  useEffect(() => {
    if (!abierto) return;
    pararScroll();
    document.documentElement.style.overflow = "hidden";
    const alPulsarTecla = (e) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", alPulsarTecla);
    return () => {
      reanudarScroll();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", alPulsarTecla);
    };
  }, [abierto]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: oculta && !abierto ? "-100%" : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solida || abierto ? "border-b border-borde/80 bg-fondo/75 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="contenedor flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Marca alPulsar={() => setAbierto(false)} />

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAVEGACION.map((item) => (
                <li key={item.a}>
                  <NavLink
                    to={item.a}
                    className={({ isActive }) =>
                      `relative block whitespace-nowrap px-3 py-2 text-[0.8rem] font-semibold tracking-[0.06em] transition-colors duration-300 ${
                        isActive ? "text-realce" : "text-suave hover:text-tinta"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.texto}
                        {isActive ? (
                          <motion.span
                            layoutId="nav-activo"
                            className="absolute inset-x-3 -bottom-0.5 h-px bg-acento"
                            transition={{ duration: 0.5, ease: EASE }}
                          />
                        ) : null}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block xl:hidden 2xl:block">
              <PrecioEnDirecto />
            </div>
            <Boton a="/contacto" variante="linea" className="!hidden !min-h-[2.75rem] !px-5 !text-[0.72rem] 2xl:!inline-flex" magnetico={false}>
              Contacto
            </Boton>
            <Boton a="/tasador" className="!hidden !min-h-[2.75rem] !px-5 !text-[0.72rem] sm:!inline-flex" magnetico={false}>
              Tasar mi oro
            </Boton>
            <button
              type="button"
              onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto}
              aria-controls="menu-movil"
              aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
              className="grid h-11 w-11 place-items-center rounded-full border border-borde text-tinta transition-colors hover:border-acento xl:hidden"
            >
              {abierto ? <IconoCerrar className="h-5 w-5" /> : <IconoMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>{abierto ? <MenuMovil cerrar={() => setAbierto(false)} /> : null}</AnimatePresence>
    </>
  );
}

function MenuMovil({ cerrar }) {
  const enlaces = [{ a: "/", texto: "Inicio" }, ...NAVEGACION, { a: "/contacto", texto: "Contacto" }];
  return (
    <motion.div
      id="menu-movil"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed inset-0 z-[45] flex flex-col overflow-y-auto bg-fondo pt-[calc(var(--nav-h)+1.5rem)] xl:hidden"
      data-lenis-prevent
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-acento/10 blur-[120px]"
      />
      <nav aria-label="Menú" className="contenedor relative flex-1">
        <ul className="flex flex-col">
          {enlaces.map((item, i) => (
            <motion.li
              key={item.a}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: EASE }}
              className="border-b border-borde/70"
            >
              <NavLink
                to={item.a}
                end={item.a === "/"}
                onClick={cerrar}
                className={({ isActive }) =>
                  `flex items-baseline justify-between py-4 font-display text-[2.3rem] leading-none transition-colors ${
                    isActive ? "text-realce" : "text-tinta"
                  }`
                }
              >
                {item.texto}
                <span className="font-sans text-[0.65rem] font-bold tracking-[0.2em] text-tenue">0{i + 1}</span>
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="contenedor relative mt-10 grid gap-5 pb-[calc(env(safe-area-inset-bottom)+2rem)]"
      >
        <EstadoTienda />
        <PrecioEnDirecto className="self-start" />
        <div className="grid grid-cols-2 gap-3">
          <a href={enlaceTelefono(0)} className="boton boton-linea !px-4">
            <IconoTelefono className="h-4 w-4" /> Llamar
          </a>
          <a href={enlaceWhatsApp()} target="_blank" rel="noopener" className="boton boton-principal !px-4">
            <IconoWhatsApp className="h-4 w-4" /> WhatsApp
          </a>
        </div>
        <a href={NEGOCIO.comoLlegar} target="_blank" rel="noopener" className="flex items-center gap-3 text-sm text-suave">
          <IconoUbicacion className="h-4 w-4 text-acento" />
          {NEGOCIO.direccion.calle} · {NEGOCIO.direccion.ciudad}
        </a>
        <div className="flex gap-3">
          <a href={NEGOCIO.redes[0].url} target="_blank" rel="noopener" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-borde text-suave">
            <IconoInstagram className="h-5 w-5" />
          </a>
          <a href={NEGOCIO.redes[1].url} target="_blank" rel="noopener" aria-label="TikTok" className="grid h-11 w-11 place-items-center rounded-full border border-borde text-suave">
            <IconoTikTok className="h-[18px] w-[18px]" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
