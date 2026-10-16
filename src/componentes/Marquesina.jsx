import { CATEGORIAS } from "../datos/negocio.js";
import { IconoDiamanteLinea } from "./Iconos.jsx";

/* Lo que pone su rótulo, en grande y en movimiento: alterna relleno y contorno. */
export function Marquesina({ elementos = CATEGORIAS, inversa = false }) {
  const Tira = ({ oculta }) => (
    <ul aria-hidden={oculta || undefined} className="flex shrink-0 items-center">
      {[...elementos, ...elementos].map((texto, i) => (
        <li key={`${texto}-${i}`} className="flex items-center">
          <span
            className={`whitespace-nowrap px-8 font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-none ${
              i % 2 ? "italic text-transparent" : "text-tinta"
            }`}
            style={i % 2 ? { WebkitTextStroke: "1px color-mix(in srgb, var(--color-acento) 70%, transparent)" } : undefined}
          >
            {texto}
          </span>
          <IconoDiamanteLinea className="h-3 w-3 text-acento" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mascara-borde-x flex overflow-hidden py-10 md:py-14" aria-label={`Compramos y vendemos: ${elementos.join(", ")}`}>
      <div className={`flex animate-marquesina-lenta ${inversa ? "[animation-direction:reverse]" : ""}`}>
        <Tira />
        <Tira oculta />
      </div>
    </div>
  );
}
