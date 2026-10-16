import { useTitulo } from "../hooks/useTitulo.js";
import { NEGOCIO } from "../datos/negocio.js";
import { TIKTOK } from "../datos/tiktok.js";
import { CabeceraPagina } from "../componentes/Bloques.jsx";
import { Encabezado, Oro } from "../componentes/Encabezado.jsx";
import { Galeria } from "../componentes/Galeria.jsx";
import { LlamadaFinal } from "../componentes/LlamadaFinal.jsx";
import { Aparecer } from "../componentes/Animaciones.jsx";
import { Boton, BotonWhatsApp } from "../componentes/Botones.jsx";
import { IconoInstagram, IconoTikTok } from "../componentes/Iconos.jsx";

const TIKTOK_PERFIL = NEGOCIO.redes.find((r) => r.nombre === "TikTok");
const INSTAGRAM = NEGOCIO.redes.find((r) => r.nombre === "Instagram");

export default function PaginaGaleria() {
  useTitulo("Galería", "Las piezas que pasan por nuestro escaparate: cadenas, sellos, pulseras, colgantes personalizados y relojes de alta gama en oro de 18 k.");

  return (
    <>
      <CabeceraPagina
        antetitulo="Galería"
        titulo={["Lo último del escaparate,", <Oro key="o">tal cual.</Oro>]}
        derecha={
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <a href={TIKTOK_PERFIL.url} target="_blank" rel="noopener" className="chip !text-tinta">
              <IconoTikTok className="h-4 w-4 text-acento" />
              {TIKTOK_PERFIL.usuario}
            </a>
            <a href={INSTAGRAM.url} target="_blank" rel="noopener" className="chip !text-tinta">
              <IconoInstagram className="h-4 w-4 text-acento" />
              {INSTAGRAM.usuario}
            </a>
          </div>
        }
      >
        Cadenas, sellos, pulseras, colgantes personalizados y relojes de alta gama que han pasado por la tienda, como los enseñamos en
        nuestro TikTok. Toca una pieza para verla en grande, ver su vídeo o preguntarnos por ella.
      </CabeceraPagina>

      <section className="pb-20 lg:pb-28">
        <div className="contenedor">
          <Galeria fotos={TIKTOK.slice(0, 24)} prefijo="tiktok" rejilla columnas="grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
          <Aparecer className="mt-14 flex flex-col items-center gap-5 text-center">
            <p className="texto-cuerpo max-w-xl">
              Cada semana subimos piezas nuevas. Síguenos para verlas antes que nadie, o escríbenos y te enseñamos lo que hay ahora
              en el escaparate.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Boton a={TIKTOK_PERFIL.url} variante="linea">
                <IconoTikTok className="h-4 w-4" />
                Ver más en TikTok
              </Boton>
              <BotonWhatsApp variante="principal" mensaje="Hola, he visto la galería de vuestra web. ¿Qué piezas tenéis ahora en el escaparate?">
                Preguntar por WhatsApp
              </BotonWhatsApp>
            </div>
          </Aparecer>
        </div>
      </section>

      <section className="claro py-20 lg:py-28">
        <div className="contenedor grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <Encabezado antetitulo="Joyas a medida" titulo={["¿Ves algo parecido", <Oro key="o">a lo que buscas?</Oro>]}>
            Muchas de estas piezas se hacen por encargo: con tu nombre, tu inicial o el diseño que tengas en mente, y en el peso que
            quieras.
          </Encabezado>
          <Aparecer delay={0.15} className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <BotonWhatsApp variante="principal" mensaje="Hola, me gustaría encargar una joya personalizada. ¿Podemos hablarlo?">
              Encargar una pieza
            </BotonWhatsApp>
            <Boton a="/joyeria" variante="linea" flecha>
              Ver la joyería
            </Boton>
          </Aparecer>
        </div>
      </section>

      <LlamadaFinal />
    </>
  );
}
