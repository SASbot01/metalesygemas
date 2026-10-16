import { useTitulo } from "../hooks/useTitulo.js";
import { SERVICIOS } from "../datos/contenido.js";
import { CabeceraPagina, Compramos } from "../componentes/Bloques.jsx";
import { Encabezado, Oro } from "../componentes/Encabezado.jsx";
import { LlamadaFinal } from "../componentes/LlamadaFinal.jsx";
import { Imagen } from "../componentes/Imagen.jsx";
import { Aparecer, Escalonado, Hijo, Parallax } from "../componentes/Animaciones.jsx";
import { Boton, BotonWhatsApp } from "../componentes/Botones.jsx";

const ACCIONES = {
  creacion: <BotonWhatsApp mensaje="Hola, me gustaría crear una joya a medida. ¿Podemos hablarlo?">Contar mi idea</BotonWhatsApp>,
  compra: (
    <Boton a="/tasador" flecha>
      Calcular cuánto vale
    </Boton>
  ),
  tasacion: (
    <Boton a="/tasador" variante="linea" flecha>
      Ir al tasador
    </Boton>
  ),
  atencion: <BotonWhatsApp mensaje="Hola, me gustaría que me asesoraseis sobre una joya.">Pedir asesoramiento</BotonWhatsApp>,
};

/* El proceso de su artículo «Cómo se diseña una joya desde cero». */
const PROCESO = [
  { titulo: "Conversación", texto: "Empezamos hablando: tus gustos, la ocasión, tu estilo y tu presupuesto." },
  { titulo: "Boceto", texto: "Dibujamos la pieza a mano o en digital y elegimos contigo metales y piedras." },
  { titulo: "Taller", texto: "Modelado, fundición, engaste y pulido, en manos de joyeros expertos." },
  { titulo: "Tu joya", texto: "Una pieza única, exclusiva y para siempre. Y si estás lejos, te la enviamos." },
];

export default function Servicios() {
  useTitulo("Servicios", "Creación de joyas a medida, compra de oro, tasación de metales preciosos y atención personalizada en Alicante.");

  return (
    <>
      <CabeceraPagina antetitulo="Servicios" titulo={["Servicios exclusivos", <Oro key="o">en joyería y más.</Oro>]}>
        Creación de joyas personalizadas, compra y tasación de oro y plata, y un trato cercano en cada visita.
      </CabeceraPagina>

      <section className="pb-12 lg:pb-20">
        <div className="contenedor grid gap-24 lg:gap-32">
          {SERVICIOS.map((s, i) => (
            <article key={s.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <Aparecer className={i % 2 ? "lg:order-last" : ""}>
                <Parallax className="aspect-[4/5] rounded-[3px] border border-borde" distancia={45}>
                  <Imagen nombre={s.imagen} alt={s.alt} className="h-full w-full" />
                </Parallax>
              </Aparecer>
              <div>
                <Aparecer as="p" className="font-display text-[clamp(4rem,8vw,7rem)] leading-none">
                  <span className="realce">{s.numero}</span>
                </Aparecer>
                <Encabezado titulo={[s.titulo]} as="h2" className="mt-2" />
                <Aparecer delay={0.1} className="mt-6 grid gap-5">
                  <p className="text-[1.2rem] leading-relaxed text-tinta">{s.resumen}</p>
                  <p className="texto-cuerpo">{s.texto}</p>
                </Aparecer>
                <Aparecer delay={0.2} className="mt-9">
                  {ACCIONES[s.id]}
                </Aparecer>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="claro py-20 lg:py-28">
        <div className="contenedor">
          <Encabezado antetitulo="Joyas a medida" titulo={["Del boceto", <Oro key="o">al último pulido.</Oro>]}>
            Cada joya cuenta una historia. Así convertimos tu idea en una pieza única:
          </Encabezado>
          <Escalonado className="mt-14 grid gap-px overflow-hidden rounded-[3px] border border-borde bg-borde md:grid-cols-2 lg:grid-cols-4">
            {PROCESO.map((p, i) => (
              <Hijo key={p.titulo} className="bg-fondo p-7 lg:p-9">
                <p className="font-display text-[1.1rem] text-acento">0{i + 1}</p>
                <h3 className="mt-3 font-display text-[2rem] leading-tight">{p.titulo}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-suave">{p.texto}</p>
              </Hijo>
            ))}
          </Escalonado>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="contenedor">
          <Encabezado antetitulo="Compraventa" titulo={["Compramos y vendemos", <Oro key="o">mucho más que oro.</Oro>]} />
          <div className="mt-12">
            <Compramos />
          </div>
        </div>
      </section>

      <LlamadaFinal
        imagen="cta-alianzas"
        antetitulo="Te esperamos en Alicante"
        titulo={["Visítanos y descubre", <Oro key="o">tu joya perfecta.</Oro>]}
        texto="Te invitamos a explorar nuestra colección y a disfrutar de un servicio personalizado, sin prisas."
        acciones={
          <>
            <Boton a="/joyeria" flecha>
              Ver la joyería
            </Boton>
            <BotonWhatsApp mensaje="Hola, busco una joya. ¿Me podéis asesorar?">Escríbenos por WhatsApp</BotonWhatsApp>
          </>
        }
      />
    </>
  );
}
