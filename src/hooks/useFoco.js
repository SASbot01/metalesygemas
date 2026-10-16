import { useCallback } from "react";

/* Mueve el foco de luz de las tarjetas .foco a donde está el ratón. */
export function useFoco() {
  return useCallback((evento) => {
    const el = evento.currentTarget;
    const caja = el.getBoundingClientRect();
    el.style.setProperty("--x", `${evento.clientX - caja.left}px`);
    el.style.setProperty("--y", `${evento.clientY - caja.top}px`);
  }, []);
}
