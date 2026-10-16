import { useTitulo } from "../hooks/useTitulo.js";
import { Boton } from "../componentes/Botones.jsx";
import { Aparecer, TextoRevelado } from "../componentes/Animaciones.jsx";

export default function NoEncontrada() {
  useTitulo("Página no encontrada", undefined, { indexar: false });
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-[var(--nav-h)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(52,78,175,0.3),transparent_65%)]"
      />
      <div className="contenedor text-center">
        <p
          aria-hidden="true"
          className="select-none font-display text-[clamp(8rem,26vw,20rem)] leading-none text-transparent"
          style={{ WebkitTextStroke: "1px color-mix(in srgb, var(--color-acento) 55%, transparent)" }}
        >
          404
        </p>
        <TextoRevelado
          as="h1"
          alCargar
          lineas={[
            "Esta página se ha fundido.",
            <em key="o" className="realce italic">
              El oro sigue aquí.
            </em>,
          ]}
          className="-mt-6 text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]"
        />
        <Aparecer delay={0.4} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Boton a="/" flecha>
            Volver al inicio
          </Boton>
          <Boton a="/tasador" variante="linea">
            Ir al tasador
          </Boton>
        </Aparecer>
      </div>
    </section>
  );
}
