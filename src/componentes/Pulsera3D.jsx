import { useEffect, useRef, useState } from "react";
import { useMovimientoReducido } from "../hooks/medios.js";

/*
 * La pulsera barbada en 3D. El motor (three.js) se descarga solo cuando se acerca
 * a la pantalla; si el navegador no puede pintarla, se ve `respaldo` en su lugar.
 */
export function Pulsera3D({ tono = "oro18", encuadre = 1, className = "", etiqueta, respaldo = null }) {
  const caja = useRef(null);
  const instancia = useRef(null);
  const ultimo = useRef({ tono });
  ultimo.current = { tono };
  const [estado, setEstado] = useState("cargando");
  const quieto = useMovimientoReducido();

  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    let vivo = true;

    const alAcercarse = new IntersectionObserver(
      async ([entrada]) => {
        if (!entrada.isIntersecting) return;
        alAcercarse.disconnect();
        try {
          const { crearPulsera } = await import("../tres/pulsera.js");
          if (!vivo) return;
          instancia.current = crearPulsera(el, {
            ...ultimo.current,
            animar: !quieto,
            encuadre,
            alListo: () => vivo && setEstado("listo"),
          });
        } catch (error) {
          console.error("Pulsera3D: no se ha podido pintar", error);
          if (vivo) setEstado("fallo");
        }
      },
      { rootMargin: "250px" },
    );
    alAcercarse.observe(el);

    return () => {
      vivo = false;
      alAcercarse.disconnect();
      instancia.current?.destruir();
      instancia.current = null;
      setEstado("cargando");
    };
  }, [quieto, encuadre]);

  useEffect(() => {
    instancia.current?.actualizar({ tono });
  }, [tono]);

  return (
    <div role="img" aria-label={etiqueta} className={`relative ${className}`}>
      {estado === "fallo" ? respaldo : null}
      <div
        ref={caja}
        aria-hidden="true"
        className={`absolute inset-0 transition-[opacity,transform] duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          estado === "listo" ? "scale-100 opacity-100" : "scale-[0.96] opacity-0"
        }`}
      />
    </div>
  );
}
