import { useState } from "react";

/*
 * Foto de /public/img en dos tamaños (nombre-sm.webp y nombre.webp).
 * Mientras carga se ve un fondo oscuro; luego aparece con un fundido.
 */
export function Imagen({
  nombre,
  alt,
  ratio,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
  claseImg = "",
  prioridad = false,
  cubrir = true,
  posicion = "center",
}) {
  const [cargada, setCargada] = useState(false);
  const posicionada = /(^|\s)(absolute|fixed)(\s|$)/.test(className);
  return (
    <div className={`${posicionada ? "" : "relative"} overflow-hidden bg-superficie ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img
        src={`/img/${nombre}.webp`}
        srcSet={`/img/${nombre}-sm.webp 640w, /img/${nombre}.webp 1400w`}
        sizes={sizes}
        alt={alt}
        loading={prioridad ? "eager" : "lazy"}
        {...(prioridad ? { fetchpriority: "high" } : {})}
        decoding="async"
        onLoad={() => setCargada(true)}
        ref={(el) => {
          if (el?.complete && el.naturalWidth && !cargada) setCargada(true);
        }}
        style={{ objectPosition: posicion }}
        className={`h-full w-full ${cubrir ? "object-cover" : "object-contain"} transition-[opacity,transform] duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          cargada ? "opacity-100" : "opacity-0"
        } ${claseImg}`}
      />
    </div>
  );
}
