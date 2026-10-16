import { useTitulo } from "../hooks/useTitulo.js";
import { NEGOCIO } from "../datos/negocio.js";
import { NOSOTROS } from "../datos/contenido.js";
import { ARTICULOS } from "../datos/blog.js";
import { TIKTOK } from "../datos/tiktok.js";
import { Hero } from "../componentes/Hero.jsx";
import { Marquesina } from "../componentes/Marquesina.jsx";
import { Tasador } from "../componentes/Tasador.jsx";
import { TablaPrecios } from "../componentes/TablaPrecios.jsx";
import { Pasos } from "../componentes/Pasos.jsx";
import { ServiciosPaneles } from "../componentes/ServiciosPaneles.jsx";
import { Escaparate } from "../componentes/Escaparate.jsx";
import { LeyDelOro } from "../componentes/LeyDelOro.jsx";
import { Resenas } from "../componentes/Resenas.jsx";
import { Visitanos } from "../componentes/Visitanos.jsx";
import { LlamadaFinal } from "../componentes/LlamadaFinal.jsx";
import { TarjetaArticulo } from "../componentes/Articulos.jsx";
import { Cifras } from "../componentes/Bloques.jsx";
import { Encabezado, Oro } from "../componentes/Encabezado.jsx";
import { Imagen } from "../componentes/Imagen.jsx";
import { Aparecer, Escalonado, Hijo, Parallax } from "../componentes/Animaciones.jsx";
import { Boton, BotonWhatsApp, EnlaceFino } from "../componentes/Botones.jsx";
import { IconoInstagram, IconoTikTok } from "../componentes/Iconos.jsx";

export function Inicio() {
  useTitulo();

  return (
    <>
      <Hero />

      <section aria-label="Lo que compramos y vendemos">
        <Marquesina />
      </section>

      {/* Tasador */}
      <section id="tasador" className="claro relative scroll-mt-[var(--nav-h)] py-20 lg:py-28">
        <div className="contenedor">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Encabezado antetitulo="Tasador online" titulo={["¿Cuánto vale tu oro?", <Oro key="o">Descúbrelo en 10 segundos.</Oro>]}>
              Elige el metal, los quilates y el peso. Calculamos con la cotización internacional en directo; la oferta definitiva te la
              damos en la tienda, delante de ti.
            </Encabezado>
            <Aparecer delay={0.2} className="shrink-0">
              <EnlaceFino a="/tasador">Más sobre cómo tasamos</EnlaceFino>
            </Aparecer>
          </div>
          <Aparecer delay={0.1} className="mt-12 lg:mt-16">
            <Tasador />
          </Aparecer>
        </div>
      </section>

      {/* Precio del día */}
      <section className="py-20 lg:py-28">
        <div className="contenedor grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)] lg:self-start">
            <Encabezado antetitulo="Precio del oro hoy" titulo={["El gramo de oro,", <Oro key="o">al día y a la vista.</Oro>]}>
              Esto es lo que vale hoy cada ley y una referencia orientativa de lo que pagamos por ella. Los precios se actualizan
              solos con la cotización internacional.
            </Encabezado>
            <Aparecer delay={0.2} className="mt-8">
              <EnlaceFino a="#tasador">Calcular con mi peso</EnlaceFino>
            </Aparecer>
          </div>
          <Aparecer delay={0.1}>
            <TablaPrecios />
          </Aparecer>
        </div>
      </section>

      {/* Cómo vender */}
      <section className="perla py-20 lg:py-28">
        <div className="contenedor">
          <Encabezado antetitulo="Vender tu oro" titulo={["Tres pasos,", <Oro key="o">cero sorpresas.</Oro>]} />
          <div className="mt-14 lg:mt-20">
            <Pasos />
          </div>
          <Aparecer delay={0.2} className="mt-14 rounded-[3px] border border-borde bg-fondo/60 px-6 py-5 text-[0.92rem] leading-relaxed text-suave">
            <span className="font-semibold text-tinta">Recuerda traer tu DNI, NIE o pasaporte.</span> La ley obliga a identificar a quien vende
            oro y metales preciosos. Compramos también piezas rotas, sueltas o enredadas.
          </Aparecer>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20 lg:py-28">
        <div className="contenedor">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Encabezado antetitulo="Servicios" titulo={["Calidad y experiencia", <Oro key="o">en cada detalle.</Oro>]}>
              Desde la creación de joyas a medida hasta la compra y tasación de oro y plata.
            </Encabezado>
            <Aparecer delay={0.2} className="shrink-0">
              <EnlaceFino a="/servicios">Todos los servicios</EnlaceFino>
            </Aparecer>
          </div>
          <div className="mt-12 lg:mt-16">
            <ServiciosPaneles />
          </div>
        </div>
      </section>

      {/* La joyería */}
      <section className="claro overflow-hidden py-20 lg:py-28">
        <div className="contenedor grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Encabezado antetitulo="La joyería" titulo={["Oro de 18 quilates", <Oro key="o">con carácter.</Oro>]}>
              Cadenas y pulseras barbadas, sellos, anillos con piedra y relojes de alta gama. Piezas exclusivas que se eligen sin prisa, en
              la tienda o por WhatsApp, y que te enviamos si estás lejos.
            </Encabezado>
            <Aparecer delay={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Boton a="/joyeria" flecha>
                Ver la joyería
              </Boton>
              <BotonWhatsApp mensaje="Hola, busco una joya de oro y me gustaría ver qué tenéis.">Preguntar por una pieza</BotonWhatsApp>
            </Aparecer>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <Aparecer>
              <Parallax className="aspect-[2/3] rounded-[3px]" distancia={30}>
                <Imagen nombre="editorial-blazer" alt="Modelo con chaqueta negra y brazalete de oro sobre fondo granate" className="h-full w-full" />
              </Parallax>
            </Aparecer>
            <Aparecer delay={0.15} className="mt-16 lg:mt-24">
              <Parallax className="aspect-[2/3] rounded-[3px]" distancia={60}>
                <Imagen nombre="editorial-pendientes" alt="Retrato con pendientes de filigrana de oro sobre fondo granate" className="h-full w-full" />
              </Parallax>
            </Aparecer>
          </div>
        </div>
      </section>

      {/* Escaparate */}
      <section className="border-b border-borde">
        <Escaparate
          piezas={TIKTOK.slice(0, 8)}
          cabecera={
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <Encabezado antetitulo="Galería" titulo={["Piezas que no pasan", <Oro key="o">desapercibidas.</Oro>]}>
                Lo último que ha pasado por el escaparate: oro de 18 quilates, piezas personalizadas y relojes de alta gama. Si una te
                gusta, pregúntanos: también la enviamos.
              </Encabezado>
              <Aparecer delay={0.2} className="shrink-0">
                <EnlaceFino a="/galeria">Ver toda la galería</EnlaceFino>
              </Aparecer>
            </div>
          }
          pie={
            <Aparecer className="flex flex-wrap items-center gap-3 text-[0.85rem] text-suave">
              Más piezas, cada semana, en
              {NEGOCIO.redes.map((red) => (
                <a
                  key={red.nombre}
                  href={red.url}
                  target="_blank"
                  rel="noopener"
                  className="chip !text-tinta"
                >
                  {red.nombre === "Instagram" ? <IconoInstagram className="h-4 w-4 text-acento" /> : <IconoTikTok className="h-4 w-4 text-acento" />}
                  {red.usuario}
                </a>
              ))}
            </Aparecer>
          }
        />
      </section>

      {/* La ley del oro */}
      <section className="perla py-20 lg:py-28">
        <div className="contenedor">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Encabezado antetitulo="La ley del oro" titulo={["¿Qué significan", <Oro key="o">los quilates?</Oro>]}>
              Los quilates indican cuánto oro puro lleva una pieza. Toca cada ley y mira cuántas de cada cien partes son oro.
            </Encabezado>
            <Aparecer delay={0.2} className="shrink-0">
              <EnlaceFino a="/guia-del-oro">La guía completa del oro</EnlaceFino>
            </Aparecer>
          </div>
          <div className="mt-12 lg:mt-16">
            <LeyDelOro />
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section className="py-20 lg:py-28">
        <div className="contenedor grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Aparecer className="relative">
            <Parallax className="aspect-[4/5] rounded-[3px] border border-borde" distancia={40}>
              <Imagen nombre="fachada" alt="Fachada de LB Metales y Gemas, compraventa en la calle Susana Llaneras" className="h-full w-full" />
            </Parallax>
            <div className="tarjeta borde-fino absolute -bottom-6 right-4 rounded-[3px] bg-fondo/80 px-6 py-5 backdrop-blur-xl sm:right-[-1.5rem]">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-tenue">En Alicante desde</p>
              <p className="mt-1.5 font-display text-[2.6rem] leading-none">
                <span className="realce">2008</span>
              </p>
            </div>
          </Aparecer>
          <div>
            <Encabezado antetitulo="Nosotros" titulo={[NOSOTROS.titulo, <Oro key="o">y por las personas.</Oro>]} />
            <Escalonado className="mt-8 grid gap-5" retraso={0.2}>
              {NOSOTROS.parrafos.map((p) => (
                <Hijo as="p" key={p.slice(0, 20)} className="texto-cuerpo">
                  {p}
                </Hijo>
              ))}
            </Escalonado>
            <Aparecer delay={0.3} className="mt-9">
              <EnlaceFino a="/nosotros">Conócenos</EnlaceFino>
            </Aparecer>
          </div>
        </div>
        <div className="contenedor mt-20">
          <Cifras />
        </div>
      </section>

      {/* Reseñas */}
      <section className="claro py-20 lg:py-28">
        <Resenas />
      </section>

      {/* Blog */}
      <section className="bg-fondo-2 py-20 lg:py-28">
        <div className="contenedor">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Encabezado antetitulo="Blog" titulo={["Guías y consejos", <Oro key="o">de joyero.</Oro>]} />
            <Aparecer delay={0.2} className="shrink-0">
              <EnlaceFino a="/blog">Todos los artículos</EnlaceFino>
            </Aparecer>
          </div>
          <Escalonado className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {[ARTICULOS[6], ARTICULOS[5], ARTICULOS[1]].map((a) => (
              <Hijo key={a.slug}>
                <TarjetaArticulo articulo={a} />
              </Hijo>
            ))}
          </Escalonado>
        </div>
      </section>

      {/* Visítanos */}
      <section id="ubicacion" className="perla scroll-mt-[var(--nav-h)] py-20 lg:py-28">
        <Visitanos />
      </section>

      <LlamadaFinal />
    </>
  );
}
