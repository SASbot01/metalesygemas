import { useEffect, useState } from "react";

function useMediaQuery(consulta, inicial = false) {
  const [coincide, setCoincide] = useState(() =>
    typeof window === "undefined" ? inicial : window.matchMedia(consulta).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(consulta);
    setCoincide(mq.matches);
    const alCambiar = (e) => setCoincide(e.matches);
    mq.addEventListener("change", alCambiar);
    return () => mq.removeEventListener("change", alCambiar);
  }, [consulta]);

  return coincide;
}

/* Quien pide menos movimiento recibe la versión quieta de cada animación. */
export const useMovimientoReducido = () => useMediaQuery("(prefers-reduced-motion: reduce)");

export const useEscritorio = () => useMediaQuery("(min-width: 1024px)");

/* El hover y los efectos de ratón, solo donde hay ratón de verdad. */
export const usePuedeHover = () => useMediaQuery("(hover: hover) and (pointer: fine)");
