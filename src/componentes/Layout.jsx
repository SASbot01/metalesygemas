import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, MotionConfig, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { useMovimientoReducido } from "../hooks/medios.js";
import { arriba, irA, registrarLenis } from "../lib/scroll.js";
import { Cabecera } from "./Cabecera.jsx";
import { PieDePagina } from "./PieDePagina.jsx";
import { AccionesFlotantes } from "./AccionesFlotantes.jsx";

function BarraProgreso() {
  const { scrollYProgress } = useScroll();
  const escala = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: escala, background: "var(--color-acento)" }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
    />
  );
}

export function Layout() {
  const { pathname, hash } = useLocation();
  const quieto = useMovimientoReducido();

  /* Scroll suave, salvo para quien ha pedido menos movimiento. */
  useEffect(() => {
    if (quieto) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    registrarLenis(lenis);
    let frame = requestAnimationFrame(function bucle(tiempo) {
      lenis.raf(tiempo);
      frame = requestAnimationFrame(bucle);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      registrarLenis(null);
    };
  }, [quieto]);

  /* Cada página empieza arriba, salvo que el enlace lleve a una sección (#tasador). */
  useEffect(() => {
    if (hash) {
      /* Las páginas se cargan bajo demanda: se reintenta hasta que la sección exista (3 s como mucho). */
      const inicio = performance.now();
      let raf;
      const intentar = () => {
        if (irA(hash)) return;
        if (performance.now() - inicio < 3000) raf = requestAnimationFrame(intentar);
        else arriba();
      };
      raf = requestAnimationFrame(intentar);
      return () => cancelAnimationFrame(raf);
    }
    arriba();
  }, [pathname, hash]);

  return (
    <MotionConfig reducedMotion="user">
      <BarraProgreso />
      <Cabecera />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-screen"
      >
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </motion.main>
      <PieDePagina />
      <AccionesFlotantes />
      <div aria-hidden="true" className="grano" />
    </MotionConfig>
  );
}
