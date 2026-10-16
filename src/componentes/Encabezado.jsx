import { Aparecer, TextoRevelado } from "./Animaciones.jsx";

/*
 * Cabecera de sección: antetítulo, titular que sube línea a línea y entradilla.
 * `titulo` es una lista de líneas (nodos).
 */
export function Encabezado({ antetitulo, titulo, children, centrado = false, className = "", as = "h2" }) {
  return (
    <div className={`${centrado ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {antetitulo ? (
        <Aparecer as="p" className={`eyebrow ${centrado ? "eyebrow-centrado justify-center" : ""}`}>
          {antetitulo}
        </Aparecer>
      ) : null}
      <TextoRevelado as={as} lineas={titulo} className="titulo-seccion mt-5" />
      {children ? (
        <Aparecer delay={0.15} className={`texto-cuerpo mt-6 ${centrado ? "mx-auto" : ""} max-w-2xl`}>
          {children}
        </Aparecer>
      ) : null}
    </div>
  );
}

/* Una línea del titular en cursiva, con el color de acento. */
export const Oro = ({ children }) => <em className="realce pr-[0.12em] italic">{children}</em>;
