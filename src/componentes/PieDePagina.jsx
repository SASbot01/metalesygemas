import { Link } from "react-router-dom";
import { NAVEGACION, NEGOCIO } from "../datos/negocio.js";
import { filasHorario } from "../lib/horario.js";
import { enlaceTelefono, enlaceWhatsApp } from "../lib/whatsapp.js";
import { Logotipo } from "./Marca.jsx";
import { EstadoTienda } from "./Indicadores.jsx";
import { IconoCorreo, IconoInstagram, IconoTelefono, IconoTikTok, IconoUbicacion, IconoWhatsApp } from "./Iconos.jsx";

const Titulo = ({ children }) => (
  <h2 className="mb-5 font-sans text-[0.68rem] font-bold uppercase tracking-[0.28em] text-tenue">{children}</h2>
);

export function PieDePagina() {
  const horario = filasHorario();
  const laborables = horario.find((f) => f.dia === "Lunes")?.texto;

  return (
    <footer className="relative overflow-hidden border-t border-borde bg-fondo-2 pb-28 pt-20 lg:pb-10">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-acento/50 to-transparent" />

      <div className="contenedor relative grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-4" aria-label="LB Metales y Gemas, inicio">
            <Logotipo className="h-12 md:h-14" />
          </Link>
          <p className="mt-6 max-w-sm font-display text-[1.7rem] leading-tight text-tinta">
            Tu joyería de confianza en Alicante, <span className="italic text-acento">desde 2008.</span>
          </p>
          <EstadoTienda className="mt-6" />
          <div className="mt-6 flex gap-3">
            {NEGOCIO.redes.map((red) => (
              <a
                key={red.nombre}
                href={red.url}
                target="_blank"
                rel="noopener"
                aria-label={`${red.nombre} ${red.usuario}`}
                className="grid h-11 w-11 place-items-center rounded-full border border-borde text-suave transition-colors hover:border-acento hover:text-acento"
              >
                {red.nombre === "Instagram" ? <IconoInstagram className="h-5 w-5" /> : <IconoTikTok className="h-[18px] w-[18px]" />}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Pie de página">
          <Titulo>Explora</Titulo>
          <ul className="grid gap-3 text-[0.95rem]">
            <li>
              <Link to="/" className="text-suave transition-colors hover:text-realce">
                Inicio
              </Link>
            </li>
            {NAVEGACION.map((item) => (
              <li key={item.a}>
                <Link to={item.a} className="text-suave transition-colors hover:text-realce">
                  {item.texto}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contacto" className="text-suave transition-colors hover:text-realce">
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <Titulo>Contacto</Titulo>
          <ul className="grid gap-4 text-[0.95rem] text-suave">
            {NEGOCIO.telefonos.map((t, i) => (
              <li key={t.numero}>
                <a href={enlaceTelefono(i)} className="flex items-center gap-3 transition-colors hover:text-realce">
                  <IconoTelefono className="h-4 w-4 text-acento" />
                  <span className="tabular">{t.numero}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={enlaceWhatsApp()} target="_blank" rel="noopener" className="flex items-center gap-3 transition-colors hover:text-realce">
                <IconoWhatsApp className="h-4 w-4 text-acento" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${NEGOCIO.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-realce">
                <IconoCorreo className="h-4 w-4 shrink-0 text-acento" />
                {NEGOCIO.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Titulo>Visítanos</Titulo>
          <a href={NEGOCIO.comoLlegar} target="_blank" rel="noopener" className="flex gap-3 text-[0.95rem] text-suave transition-colors hover:text-realce">
            <IconoUbicacion className="mt-0.5 h-4 w-4 shrink-0 text-acento" />
            <span>
              {NEGOCIO.direccion.calle}
              <br />
              {NEGOCIO.direccion.cp} {NEGOCIO.direccion.ciudad}
              <br />
              <span className="text-tenue">{NEGOCIO.direccion.referencia}</span>
            </span>
          </a>
          <dl className="mt-6 grid gap-1.5 text-[0.9rem]">
            <div className="flex flex-col gap-0.5">
              <dt className="text-tenue">Lunes a viernes</dt>
              <dd className="tabular whitespace-nowrap text-suave">{laborables}</dd>
            </div>
            <div className="mt-2 flex flex-col gap-0.5">
              <dt className="text-tenue">Sábado y domingo</dt>
              <dd className="text-suave">Cerrado</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="contenedor relative mt-20">
        <p
          aria-hidden="true"
          className="select-none whitespace-nowrap text-center font-display text-[min(12.2vw,10.5rem)] leading-[0.8] tracking-[-0.03em] text-transparent"
          style={{ WebkitTextStroke: "1px color-mix(in srgb, var(--color-acento) 28%, transparent)" }}
        >
          Metales y Gemas
        </p>
      </div>

      <div className="contenedor relative mt-10 flex flex-col gap-4 border-t border-borde pt-8 text-[0.8rem] text-tenue md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {NEGOCIO.nombre} · {NEGOCIO.direccion.calle}, {NEGOCIO.direccion.ciudad}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/privacidad" className="transition-colors hover:text-suave">
            Privacidad y cookies
          </Link>
          <a href="https://gold-api.com" target="_blank" rel="noopener" className="transition-colors hover:text-suave">
            Cotización: gold-api.com
          </a>
        </div>
      </div>
    </footer>
  );
}
