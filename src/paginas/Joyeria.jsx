import { useTitulo } from "../hooks/useTitulo.js";
import { NEGOCIO } from "../datos/negocio.js";
import { CREDITOS_FOTOS, ESTILO, PIEZAS } from "../datos/galeria.js";
import { TIKTOK } from "../datos/tiktok.js";
import { RESENAS, haceCuanto } from "../datos/resenas.js";
import { CabeceraPagina } from "../componentes/Bloques.jsx";
import { Encabezado, Oro } from "../componentes/Encabezado.jsx";
import { Galeria } from "../componentes/Galeria.jsx";
import { LlamadaFinal } from "../componentes/LlamadaFinal.jsx";
import { Marquesina } from "../componentes/Marquesina.jsx";
import { Aparecer, Parallax } from "../componentes/Animaciones.jsx";
import { Imagen } from "../componentes/Imagen.jsx";
import { Boton, BotonWhatsApp } from "../componentes/Botones.jsx";
import { IconoInstagram, IconoTikTok } from "../componentes/Iconos.jsx";

/* La de Juana: compró por teléfono desde Plasencia y se la enviaron. */
const DESTACADA = RESENAS.find((r) => r.nombre === "Juana Dominguez") ?? RESENAS[0];

export default function Joyeria() {
  useTitulo("Joyería", "Joyas de oro de 18 quilates, piezas exclusivas y relojes de alta gama en Alicante. Te las enviamos a toda España.");

  return (
    <>
      <CabeceraPagina
        antetitulo="Joyería · Escaparate"
        titulo={["Joyas de oro", <Oro key="o">con carácter.</Oro>]}
        derecha={
          <div className="flex flex-col items-start gap-3 lg:items-end">
            {NEGOCIO.redes.map((red) => (
              <a key={red.nombre} href={red.url} target="_blank" rel="noopener" className="chip !text-tinta">
                {red.nombre === "Instagram" ? <IconoInstagram className="h-4 w-4 text-acento" /> : <IconoTikTok className="h-4 w-4 text-acento" />}
                {red.usuario}
              </a>
            ))}
          </div>
        }
      >
        Gran variedad de piezas de oro de 18 quilates exclusivas, relojes de alta gama y joyas a medida. ¿No estás en Alicante? Te
        atendemos por teléfono o WhatsApp y te enviamos la pieza.
      </CabeceraPagina>

      <section className="pb-16 lg:pb-24">
        <div className="contenedor">
          <Aparecer>
            <Parallax className="aspect-[16/10] rounded-[3px] border border-borde sm:aspect-[21/9]" distancia={40}>
              <Imagen nombre="joya-portada" alt="Cadena barbada de oro sobre fondo negro con su reflejo" className="h-full w-full" sizes="100vw" prioridad />
            </Parallax>
          </Aparecer>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="contenedor">
          <Encabezado antetitulo="Del escaparate" titulo={["Piezas de la tienda,", <Oro key="o">tal cual.</Oro>]} className="mb-12">
            Fotos de piezas reales de nuestro escaparate. Pregúntanos por cualquiera: también te la enviamos.
          </Encabezado>
          <Galeria fotos={[...PIEZAS.slice(0, 4), ...TIKTOK.slice(24, 26)]} prefijo="pieza" rejilla />
        </div>
      </section>

      <section className="border-y border-borde">
        <Marquesina elementos={["Anillos", "Cadenas", "Pulseras", "Relojes", "Medallas", "Pendientes", "Alianzas", "Sellos"]} inversa />
      </section>

      <section className="claro py-20 lg:py-28">
        <div className="contenedor">
          <Encabezado antetitulo="Inspiración" titulo={["El oro,", <Oro key="o">como se lleva hoy.</Oro>]}>
            Cadenas que se dejan ver, anillos con presencia y pendientes que iluminan. Pregúntanos por cualquier estilo: si no lo
            tenemos, lo hacemos.
          </Encabezado>
          <div className="mt-12">
            <Galeria fotos={ESTILO} prefijo="estilo" />
          </div>
          <p className="mt-6 text-[0.75rem] text-tenue">{CREDITOS_FOTOS}</p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="contenedor grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Aparecer as="figure">
            <blockquote className="font-display text-[clamp(1.35rem,2.1vw,1.9rem)] leading-[1.5] text-tinta">
              <span className="realce">“</span>
              {DESTACADA.texto}
              <span className="realce">”</span>
            </blockquote>
            <figcaption className="mt-6 text-[0.75rem] font-bold uppercase tracking-[0.22em] text-tenue">
              {DESTACADA.nombre} · {haceCuanto(DESTACADA.fecha)} · Reseña de Google
            </figcaption>
          </Aparecer>
          <Aparecer delay={0.15} className="tarjeta borde-fino rounded-[3px] p-8">
            <p className="font-display text-[1.9rem] leading-tight">Compra a distancia, con el mismo trato.</p>
            <p className="texto-cuerpo mt-4">
              Te atendemos por teléfono o WhatsApp, resolvemos cualquier duda sobre la pieza y te la enviamos.
            </p>
            <BotonWhatsApp className="mt-7" variante="principal" mensaje="Hola, estoy fuera de Alicante y me interesa una joya. ¿Me la podéis enseñar?">
              Escríbenos
            </BotonWhatsApp>
          </Aparecer>
        </div>
      </section>

      <LlamadaFinal
        imagen="serv-creacion"
        antetitulo="Joyas a medida"
        titulo={["¿Tienes una joya", <Oro key="o">en mente?</Oro>]}
        texto="Diseñamos y creamos piezas únicas a medida, con los mejores materiales. Cuéntanos tu idea y la hacemos realidad."
        acciones={
          <>
            <BotonWhatsApp variante="principal" mensaje="Hola, tengo una idea para una joya a medida. ¿Podemos hablarlo?">
              Contar mi idea
            </BotonWhatsApp>
            <Boton a="/servicios" variante="linea">
              Ver servicios
            </Boton>
          </>
        }
      />
    </>
  );
}
