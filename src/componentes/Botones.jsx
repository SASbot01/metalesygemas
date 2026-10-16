import { Link } from "react-router-dom";
import { enlaceWhatsApp } from "../lib/whatsapp.js";
import { irA } from "../lib/scroll.js";
import { IconoFlecha, IconoWhatsApp } from "./Iconos.jsx";
import { Magnetico } from "./Animaciones.jsx";

/*
 * Botón de la casa. `a` puede ser una ruta interna ("/tasador"), un ancla de la
 * página ("#tasador") o una dirección externa; sin `a`, es un <button>.
 */
export function Boton({ a, variante = "principal", children, className = "", flecha = false, magnetico = true, ...resto }) {
  const clases = `boton boton-${variante} ${className}`;
  const contenido = (
    <>
      {children}
      {flecha ? <IconoFlecha className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" /> : null}
    </>
  );

  let elemento;
  if (!a) {
    elemento = (
      <button type="button" className={`group ${clases}`} {...resto}>
        {contenido}
      </button>
    );
  } else if (a.startsWith("#")) {
    elemento = (
      <a
        href={a}
        className={`group ${clases}`}
        onClick={(e) => {
          if (irA(a)) e.preventDefault();
        }}
        {...resto}
      >
        {contenido}
      </a>
    );
  } else if (/^(https?:|tel:|mailto:)/.test(a)) {
    const externo = a.startsWith("http");
    elemento = (
      <a href={a} className={`group ${clases}`} {...(externo ? { target: "_blank", rel: "noopener" } : {})} {...resto}>
        {contenido}
      </a>
    );
  } else {
    elemento = (
      <Link to={a} className={`group ${clases}`} {...resto}>
        {contenido}
      </Link>
    );
  }

  return magnetico ? <Magnetico>{elemento}</Magnetico> : elemento;
}

export function BotonWhatsApp({ mensaje, children = "Escríbenos por WhatsApp", variante = "linea", className = "", ...resto }) {
  return (
    <Boton a={enlaceWhatsApp(mensaje)} variante={variante} className={className} {...resto}>
      <IconoWhatsApp className="h-[18px] w-[18px]" />
      {children}
    </Boton>
  );
}

/* Enlace de texto con subrayado que se recoge al pasar el ratón. */
export function EnlaceFino({ a, children, className = "" }) {
  const clases = `enlace-fino group ${className}`;
  const flecha = <IconoFlecha className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />;
  if (a.startsWith("#")) {
    return (
      <a href={a} className={clases} onClick={(e) => irA(a) && e.preventDefault()}>
        {children}
        {flecha}
      </a>
    );
  }
  if (/^https?:/.test(a)) {
    return (
      <a href={a} target="_blank" rel="noopener" className={clases}>
        {children}
        {flecha}
      </a>
    );
  }
  return (
    <Link to={a} className={clases}>
      {children}
      {flecha}
    </Link>
  );
}
