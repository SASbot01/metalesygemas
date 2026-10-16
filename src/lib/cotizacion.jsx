import { createContext, useContext, useEffect, useState } from "react";
import { COTIZACION_REFERENCIA, precioGramo } from "../datos/metales.js";

/*
 * Cotización en directo de oro y plata en euros por onza troy (gold-api.com,
 * gratuito y con CORS abierto). Se guarda 5 minutos en el navegador; si el servicio
 * no responde, el tasador sigue funcionando con la cotización de referencia.
 */

const API = "https://api.gold-api.com/price";
const CLAVE = "lb-cotizacion-v1";
const VIGENCIA_MS = 5 * 60 * 1000;
const SIMBOLOS = { oro: "XAU", plata: "XAG" };

const REFERENCIA = {
  onza: { oro: COTIZACION_REFERENCIA.oro, plata: COTIZACION_REFERENCIA.plata },
  actualizado: COTIZACION_REFERENCIA.fecha,
  pedido: 0,
};

function leerCache() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE));
    return datos?.onza?.oro > 0 ? datos : null;
  } catch {
    return null;
  }
}

function guardarCache(datos) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(datos));
  } catch {
    /* Sin almacenamiento (modo privado): se pedirá en cada visita. */
  }
}

async function pedirCotizacion(senal) {
  const filas = await Promise.all(
    Object.entries(SIMBOLOS).map(async ([metal, simbolo]) => {
      const respuesta = await fetch(`${API}/${simbolo}/EUR`, { signal: senal });
      if (!respuesta.ok) throw new Error(`${simbolo}: ${respuesta.status}`);
      const { price, updatedAt } = await respuesta.json();
      if (!(price > 0)) throw new Error(`${simbolo}: precio no válido`);
      return { metal, price, updatedAt };
    }),
  );
  return {
    onza: Object.fromEntries(filas.map((f) => [f.metal, f.price])),
    actualizado: filas[0].updatedAt ?? new Date().toISOString(),
    pedido: Date.now(),
  };
}

const Contexto = createContext({ ...REFERENCIA, fuente: "referencia" });

export function CotizacionProvider({ children }) {
  const [cotizacion, setCotizacion] = useState(() => {
    const cache = leerCache();
    return cache ? { ...cache, fuente: "directo" } : { ...REFERENCIA, fuente: "cargando" };
  });

  useEffect(() => {
    let vivo = true;
    const control = new AbortController();

    const actualizar = async () => {
      const cache = leerCache();
      if (cache && Date.now() - cache.pedido < VIGENCIA_MS) return;
      try {
        const datos = await pedirCotizacion(control.signal);
        if (!vivo) return;
        guardarCache(datos);
        setCotizacion({ ...datos, fuente: "directo" });
      } catch (error) {
        if (!vivo || error.name === "AbortError") return;
        console.warn("Cotización en directo no disponible:", error.message);
        setCotizacion((previa) => (previa.fuente === "cargando" ? { ...previa, fuente: "referencia" } : previa));
      }
    };

    actualizar();
    const intervalo = setInterval(() => document.hidden || actualizar(), VIGENCIA_MS);
    const alVolver = () => document.hidden || actualizar();
    document.addEventListener("visibilitychange", alVolver);

    return () => {
      vivo = false;
      control.abort();
      clearInterval(intervalo);
      document.removeEventListener("visibilitychange", alVolver);
    };
  }, []);

  return <Contexto.Provider value={cotizacion}>{children}</Contexto.Provider>;
}

/* { onza: {oro, plata}, actualizado, fuente: "cargando" | "directo" | "referencia" } */
export const useCotizacion = () => useContext(Contexto);

export const usePrecioGramo = (metal = "oro") => precioGramo(useCotizacion().onza, metal);
