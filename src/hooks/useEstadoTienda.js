import { useEffect, useState } from "react";
import { estadoTienda } from "../lib/horario.js";

/* Abierto o cerrado, recalculado cada minuto. */
export function useEstadoTienda() {
  const [estado, setEstado] = useState(() => estadoTienda());
  useEffect(() => {
    const id = setInterval(() => setEstado(estadoTienda()), 60_000);
    return () => clearInterval(id);
  }, []);
  return estado;
}
