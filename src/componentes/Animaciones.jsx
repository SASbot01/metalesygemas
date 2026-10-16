import { Children, useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/* Aparece al entrar en pantalla, una sola vez. */
export function Aparecer({ children, delay = 0, y = 28, className = "", as = "div", ...resto }) {
  const Componente = motion[as] ?? motion.div;
  return (
    <Componente
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -72px 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...resto}
    >
      {children}
    </Componente>
  );
}

/* Los hijos aparecen uno detrás de otro. */
export function Escalonado({ children, className = "", paso = 0.09, retraso = 0, as = "div" }) {
  const Componente = motion[as] ?? motion.div;
  return (
    <Componente
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -72px 0px" }}
      variants={{ visible: { transition: { staggerChildren: paso, delayChildren: retraso } } }}
    >
      {children}
    </Componente>
  );
}

export const variantesHijo = {
  oculto: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export function Hijo({ children, className = "", as = "div", ...resto }) {
  const Componente = motion[as] ?? motion.div;
  return (
    <Componente className={className} variants={variantesHijo} {...resto}>
      {children}
    </Componente>
  );
}

/*
 * Titular que sube línea a línea desde detrás de una máscara.
 * `lineas` es una lista de nodos: cada uno, una línea del titular.
 */
export function TextoRevelado({ lineas, as = "h2", className = "", retraso = 0, alCargar = false }) {
  const Etiqueta = as;
  const ref = useRef(null);
  const enVista = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const activo = alCargar || enVista;

  return (
    <Etiqueta ref={ref} className={className}>
      {Children.map(lineas, (linea, i) => (
        <>
          {/* Un espacio entre líneas para que el titular se lea seguido (lectores de pantalla, Google). */}
          {i ? " " : null}
          <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className="block will-change-transform"
              initial={{ y: "110%", rotate: 2 }}
              animate={activo ? { y: "0%", rotate: 0 } : undefined}
              transition={{ duration: 1.1, delay: retraso + i * 0.12, ease: EASE }}
            >
              {linea}
            </motion.span>
          </span>
        </>
      ))}
    </Etiqueta>
  );
}

/* Número que cuenta hasta su valor al aparecer o al cambiar. */
export function Cifra({ valor, formato = (v) => Math.round(v).toString(), duracion = 1.4, className = "", desde }) {
  const ref = useRef(null);
  const enVista = useInView(ref, { once: true });
  const actual = useRef(desde ?? 0);
  const [texto, setTexto] = useState(() => formato(desde ?? 0));

  useEffect(() => {
    if (!enVista || !Number.isFinite(valor)) return;
    const control = animate(actual.current, valor, {
      duration: duracion,
      ease: EASE,
      onUpdate: (v) => {
        actual.current = v;
        setTexto(formato(v));
      },
    });
    return () => control.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valor, enVista]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {texto}
    </span>
  );
}

/* Desplaza su contenido en vertical al hacer scroll (parallax). */
export function Parallax({ children, className = "", distancia = 60 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distancia, distancia]);
  const posicionada = /(^|\s)(absolute|fixed)(\s|$)/.test(className);
  return (
    <div ref={ref} className={`${posicionada ? "" : "relative"} overflow-hidden ${className}`}>
      <motion.div style={{ y, scale: 1.12 }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  );
}

/* Botón o enlace que se deja atraer un poco por el ratón. */
export function Magnetico({ children, className = "", fuerza = 0.25 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const alMover = (e) => {
    if (e.pointerType !== "mouse") return;
    const caja = ref.current.getBoundingClientRect();
    x.set((e.clientX - (caja.left + caja.width / 2)) * fuerza);
    y.set((e.clientY - (caja.top + caja.height / 2)) * fuerza);
  };
  const alSalir = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={alMover}
      onPointerLeave={alSalir}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.span>
  );
}
