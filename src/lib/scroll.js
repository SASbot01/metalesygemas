/* Instancia de Lenis compartida, para que cualquier enlace pueda desplazarse con suavidad. */
let lenis = null;

export const registrarLenis = (instancia) => {
  lenis = instancia;
};

export const pararScroll = () => lenis?.stop();
export const reanudarScroll = () => lenis?.start();

export function irA(destino, { inmediato = false } = {}) {
  const el = typeof destino === "string" ? document.getElementById(destino.replace(/^#/, "")) : destino;
  if (!el) return false;
  /* Lenis ya descuenta el scroll-margin-top del destino (las secciones llevan el alto de la cabecera). */
  if (lenis) {
    lenis.scrollTo(el, { offset: -8, immediate: inmediato, duration: 1.4 });
    return true;
  }
  const cabecera = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h") || "0") * 16;
  const margen = parseFloat(getComputedStyle(el).scrollMarginTop) || cabecera;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - margen - 8, behavior: inmediato ? "auto" : "smooth" });
  return true;
}

export function arriba() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}
