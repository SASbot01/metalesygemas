import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITIO = "https://lbmetalesygemas.es";
const SUFIJO = "LB Metales y Gemas";
export const DESCRIPCION_BASE =
  "Joyería y compraventa de oro en el centro de Alicante desde 2008. Calcula al momento cuánto vale tu oro según sus quilates y su peso, y ven a tasarlo delante de ti y sin compromiso.";

const poner = (selector, atributo, valor) => document.querySelector(selector)?.setAttribute(atributo, valor);

/* Título, descripción, URL canónica y datos para compartir de cada página. */
export function useTitulo(titulo, descripcion = DESCRIPCION_BASE, { indexar = true } = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const completo = titulo ? `${titulo} · ${SUFIJO}` : `${SUFIJO} · Joyería y compra de oro en Alicante`;
    const url = SITIO + (pathname.replace(/\/$/, "") || "/");
    document.title = completo;
    poner('meta[name="description"]', "content", descripcion);
    poner('link[rel="canonical"]', "href", url);
    poner('meta[property="og:url"]', "content", url);
    poner('meta[property="og:title"]', "content", completo);
    poner('meta[property="og:description"]', "content", descripcion);

    /* Las páginas que no existen no deben indexarse. */
    let robots = document.querySelector('meta[name="robots"]');
    if (!indexar) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.name = "robots";
        document.head.appendChild(robots);
      }
      robots.content = "noindex";
      return () => robots.remove();
    }
    return undefined;
  }, [titulo, descripcion, pathname, indexar]);
}
