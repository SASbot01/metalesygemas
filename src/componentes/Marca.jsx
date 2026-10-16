import { Link } from "react-router-dom";

/* Una imagen de su marca (blanca sobre transparente) pintada con el color de la tinta. */
function Mascara({ src, proporcion, className }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block ${className}`}
      style={{
        aspectRatio: proporcion,
        background: "var(--color-tinta)",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

/* El monograma LB de su logotipo. */
export const Monograma = ({ className = "h-9" }) => <Mascara src="/img/monograma.png" proporcion="756 / 500" className={className} />;

/* Su logotipo completo: LB | Metales y Gemas. */
export const Logotipo = ({ className = "h-9" }) => <Mascara src="/img/logo-lb.png" proporcion="1565 / 314" className={className} />;

export function Marca({ className = "", alPulsar }) {
  return (
    <Link to="/" onClick={alPulsar} className={`group flex items-center ${className}`} aria-label="LB Metales y Gemas, inicio">
      <Logotipo className="h-8 transition-opacity duration-500 group-hover:opacity-80 md:h-9 lg:h-10" />
    </Link>
  );
}
