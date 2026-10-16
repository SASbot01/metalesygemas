import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NEGOCIO } from "../datos/negocio.js";
import { RESENAS, haceCuanto } from "../datos/resenas.js";
import { IconoFlecha, IconoFlechaArriba } from "./Iconos.jsx";
import { Aparecer, EASE } from "./Animaciones.jsx";

const AMARILLO_GOOGLE = "#fbbc04";
const COLORES_AVATAR = ["#540212", "#1a2350", "#4c575b", "#7a0d24", "#0a1233"];

/* La «G» de Google, para que se vea de dónde salen las reseñas. */
export function IconoGoogle({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

export function Estrellas({ nota = 5, className = "h-4 w-4" }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${String(nota).replace(".", ",")} de 5 estrellas`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const relleno = Math.max(0, Math.min(1, nota - i));
        const id = `estrella-g-${Math.round(relleno * 100)}`;
        return (
          <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className={className}>
            <defs>
              <linearGradient id={id}>
                <stop offset={`${relleno * 100}%`} stopColor={AMARILLO_GOOGLE} />
                <stop offset={`${relleno * 100}%`} stopColor="#c9c9c9" />
              </linearGradient>
            </defs>
            <path fill={`url(#${id})`} d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8L12 2.8Z" />
          </svg>
        );
      })}
    </span>
  );
}

function TarjetaResena({ resena, indice, abierta = false, alAlternar }) {
  const larga = resena.texto.length > 150;
  return (
    <figure className="tarjeta flex min-h-[17.5rem] flex-col p-6 sm:p-7">
      <figcaption className="flex items-center gap-3">
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[1.05rem] font-medium text-white"
          style={{ background: COLORES_AVATAR[indice % COLORES_AVATAR.length] }}
          aria-hidden="true"
        >
          {resena.nombre[0]}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.98rem] font-medium leading-snug text-tinta">{resena.nombre}</span>
          <span className="block text-[0.8rem] text-tenue">{haceCuanto(resena.fecha)}</span>
        </span>
        <IconoGoogle className="h-5 w-5 shrink-0" />
      </figcaption>
      <div className="mt-4">
        <Estrellas nota={resena.nota} />
      </div>
      <blockquote
        className={`mt-4 flex-1 text-[1rem] leading-relaxed text-tinta/90 ${larga && !abierta ? "line-clamp-4" : ""}`}
      >
        {resena.texto}
      </blockquote>
      {larga ? (
        <button type="button" aria-expanded={abierta} onClick={alAlternar} className="mt-3 self-start text-[0.8rem] font-medium text-acento underline underline-offset-4">
          {abierta ? "Leer menos" : "Leer más"}
        </button>
      ) : null}
    </figure>
  );
}

/* Cuántas reseñas caben a la vez según el ancho. */
function useVisibles() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const calcular = () => setN(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 700 ? 2 : 1);
    calcular();
    window.addEventListener("resize", calcular);
    return () => window.removeEventListener("resize", calcular);
  }, []);
  return n;
}

/*
 * Carrusel que rota solo cada pocos segundos, en bucle, como el de su web actual.
 * Se para al pasar el ratón o al tocarlo, y se puede mover con flechas, puntos o deslizando.
 */
function Carrusel() {
  const total = RESENAS.length;
  const visibles = useVisibles();
  const [indice, setIndice] = useState(0);
  const [animar, setAnimar] = useState(true);
  const [pausa, setPausa] = useState(false);
  const [abierta, setAbierta] = useState(null);
  const toque = useRef(null);
  const marco = useRef(null);
  const [ancho, setAncho] = useState(0);
  const lista = [...RESENAS, ...RESENAS];
  const HUECO = 20;

  useEffect(() => {
    const el = marco.current;
    if (!el) return;
    const medir = () => setAncho(el.clientWidth);
    medir();
    const obs = new ResizeObserver(medir);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const ir = (delta) => {
    setAbierta(null);
    /* Hacia atrás desde la primera: salto sin animación a la copia y un paso atrás animado. */
    if (delta < 0 && indice === 0) {
      setAnimar(false);
      setIndice(total);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimar(true);
          setIndice(total - 1);
        }),
      );
      return;
    }
    setAnimar(true);
    setIndice((i) => i + delta);
  };

  /* Al llegar a la copia, salta sin animación al principio: bucle sin cortes. */
  useEffect(() => {
    if (indice < total) return;
    const id = setTimeout(() => {
      setAnimar(false);
      setIndice((i) => i - total);
    }, 750);
    return () => clearTimeout(id);
  }, [indice, total]);

  useEffect(() => {
    if (!animar) {
      const id = requestAnimationFrame(() => setAnimar(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animar]);

  /* Rota sola, salvo con el ratón encima o con una reseña abierta. */
  useEffect(() => {
    if (pausa || abierta) return;
    const id = setInterval(() => ir(1), 4500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pausa, abierta, indice]);

  const actual = indice % total;
  const paso = (ancho + HUECO) / visibles;

  return (
    <div
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      onTouchStart={(e) => {
        setPausa(true);
        toque.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (toque.current ?? 0);
        if (Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1);
        setTimeout(() => setPausa(false), 6000);
      }}
      aria-roledescription="carrusel"
      aria-label="Reseñas de clientes"
    >
      <div ref={marco} className="overflow-hidden">
        <motion.div
          className="flex items-start gap-5"
          animate={{ x: -indice * paso }}
          transition={animar ? { duration: 0.75, ease: EASE } : { duration: 0 }}
        >
          {lista.map((r, i) => (
            <div
              key={`${r.nombre}-${i}`}
              className="shrink-0"
              style={{ width: ancho ? (ancho - (visibles - 1) * HUECO) / visibles : `${100 / visibles}%` }}
              aria-hidden={i < indice || i >= indice + visibles || undefined}
            >
              <TarjetaResena
                resena={r}
                indice={i % total}
                abierta={abierta === r.nombre}
                alAlternar={() => setAbierta((a) => (a === r.nombre ? null : r.nombre))}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div className="flex gap-2" role="tablist" aria-label="Elegir reseña">
          {RESENAS.map((r, i) => (
            <button
              key={r.nombre}
              type="button"
              role="tab"
              aria-selected={i === actual}
              aria-label={`Reseña de ${r.nombre}`}
              onClick={() => {
                setAbierta(null);
                setAnimar(true);
                setIndice(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === actual ? "w-8 bg-acento" : "w-1.5 bg-tinta/25 hover:bg-tinta/50"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => ir(-1)}
            aria-label="Reseña anterior"
            className="grid h-11 w-11 rotate-180 place-items-center rounded-full border border-borde text-tinta transition-colors hover:border-acento"
          >
            <IconoFlecha className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => ir(1)}
            aria-label="Reseña siguiente"
            className="grid h-11 w-11 place-items-center rounded-full border border-borde text-tinta transition-colors hover:border-acento"
          >
            <IconoFlecha className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* Reseñas de Google, como en su web: nota media y las opiniones de sus clientes. */
export function Resenas() {
  return (
    <div className="contenedor">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Aparecer as="p" className="eyebrow">
            Reseñas de Google
          </Aparecer>
          <Aparecer as="h2" delay={0.05} className="titulo-seccion mt-5">
            Lo que dicen <em className="realce italic">nuestros clientes.</em>
          </Aparecer>
        </div>
        <Aparecer delay={0.1}>
          <a
            href={NEGOCIO.fichaGoogle}
            target="_blank"
            rel="noopener"
            className="tarjeta group flex items-center gap-5 px-6 py-5 transition-colors hover:border-acento/50"
          >
            <IconoGoogle className="h-10 w-10" />
            <span>
              <span className="block text-[0.72rem] font-medium uppercase tracking-[0.24em] text-tinta">Excelente</span>
              <span className="mt-1.5 flex items-center gap-2.5">
                <span className="font-display text-[1.9rem] leading-none text-tinta">4,8</span>
                <Estrellas nota={NEGOCIO.google.nota} className="h-[18px] w-[18px]" />
              </span>
              <span className="mt-1.5 flex items-center gap-1.5 text-[0.8rem] text-suave">
                Basado en {NEGOCIO.google.resenas} reseñas
                <IconoFlechaArriba className="h-3.5 w-3.5 text-acento transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </span>
          </a>
        </Aparecer>
      </div>

      <Aparecer delay={0.1} className="mt-14">
        <Carrusel />
      </Aparecer>

      <Aparecer delay={0.1} className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.82rem] text-tenue">
        <IconoGoogle className="h-4 w-4" />
        Reseñas reales de nuestra ficha de Google.
        <a href={NEGOCIO.fichaGoogle} target="_blank" rel="noopener" className="text-acento underline underline-offset-4">
          Ver todas o dejar la tuya
        </a>
      </Aparecer>
    </div>
  );
}
