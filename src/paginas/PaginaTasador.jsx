import { useTitulo } from "../hooks/useTitulo.js";
import { NEGOCIO } from "../datos/negocio.js";
import { Boton, BotonWhatsApp } from "../componentes/Botones.jsx";
import { usePrecioGramo } from "../lib/cotizacion.jsx";
import { PAGO } from "../datos/metales.js";
import { euros, eurosGramo, numero } from "../lib/formato.js";
import { Tasador } from "../componentes/Tasador.jsx";
import { TablaPrecios } from "../componentes/TablaPrecios.jsx";
import { Pasos } from "../componentes/Pasos.jsx";
import { CabeceraPagina, Compramos, Preguntas } from "../componentes/Bloques.jsx";
import { Encabezado, Oro } from "../componentes/Encabezado.jsx";
import { LlamadaFinal } from "../componentes/LlamadaFinal.jsx";
import { Aparecer, Escalonado, Hijo } from "../componentes/Animaciones.jsx";
import { EstadoTienda, PrecioEnDirecto } from "../componentes/Indicadores.jsx";

/* La cuenta del tasador, con un ejemplo real: 10 g de oro de 18 k. */
function Formula() {
  const gramo = usePrecioGramo("oro");
  const fino = 7.5;
  const valor = fino * gramo;
  const terminos = [
    { etiqueta: "Peso", valor: "10 g", nota: "Pesado delante de ti" },
    { signo: "×", etiqueta: "Pureza", valor: "75 %", nota: "Oro de 18 k (750)" },
    { signo: "×", etiqueta: "Cotización", valor: eurosGramo(gramo), nota: "Oro puro, hoy" },
    { signo: "=", etiqueta: "Valor del metal", valor: euros(valor), nota: `${numero(fino, 1)} g de oro puro`, destacado: true },
  ];
  return (
    <Escalonado className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {terminos.map((t) => (
        <Hijo
          key={t.etiqueta}
          className={`relative rounded-[3px] border p-6 ${t.destacado ? "borde-fino border-transparent bg-acento/[0.07]" : "border-borde bg-fondo-2"}`}
        >
          {t.signo ? (
            <span className="absolute -left-[1.15rem] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-borde bg-fondo font-sans text-[1.05rem] font-medium text-acento lg:grid">
              {t.signo}
            </span>
          ) : null}
          <p className="whitespace-nowrap text-[0.68rem] font-bold uppercase tracking-[0.22em] text-tenue">{t.etiqueta}</p>
          <p className={`tabular mt-3 font-display text-[2.4rem] leading-none ${t.destacado ? "realce" : "text-tinta"}`}>{t.valor}</p>
          <p className="mt-2 text-[0.85rem] text-suave">{t.nota}</p>
        </Hijo>
      ))}
    </Escalonado>
  );
}

export default function PaginaTasador() {
  useTitulo(
    "Tasador de oro online",
    "Calcula cuánto vale tu oro según sus quilates y su peso con la cotización en directo. Tasación en Alicante, delante de ti y sin compromiso.",
  );

  return (
    <>
      <CabeceraPagina
        antetitulo="Tasador de oro online"
        titulo={["Tu oro, tasado", <Oro key="o">al gramo y al día.</Oro>]}
        derecha={
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <PrecioEnDirecto />
            <EstadoTienda />
          </div>
        }
      >
        Calcula al momento cuánto vale tu oro o tu plata según su ley y su peso. Usamos la cotización internacional en
        directo; la oferta final te la damos en la tienda, con tus piezas delante.
      </CabeceraPagina>

      <section id="tasador" className="claro scroll-mt-[var(--nav-h)] py-20 lg:py-28">
        <div className="contenedor">
          <Aparecer>
            <Tasador />
          </Aparecer>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="contenedor">
          <Encabezado antetitulo="Cómo calculamos" titulo={["Una cuenta sencilla", <Oro key="o">y a la vista.</Oro>]}>
            El valor de una joya de oro depende de cuánto oro puro lleva y de lo que cotiza ese día. Este es el ejemplo de una pieza de
            10 gramos de oro de 18 quilates con el precio de hoy:
          </Encabezado>
          <div className="mt-12">
            <Formula />
          </div>
          <Aparecer delay={0.2} className="texto-cuerpo mt-8 max-w-3xl">
            Sobre ese valor del metal te hacemos la oferta: en oro, entre el {numero(PAGO.oro.min * 100)} y el{" "}
            {numero(PAGO.oro.max * 100)} %, según la pieza y la cantidad. Lo que no es metal al peso —relojes de alta gama, brillantes,
            monedas de colección o antigüedades— lo valoramos pieza a pieza.
          </Aparecer>
        </div>
      </section>

      <section className="claro py-20 lg:py-28">
        <div className="contenedor grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)] lg:self-start">
            <Encabezado antetitulo="Precio del oro hoy" titulo={["Lo que vale", <Oro key="o">cada ley, hoy.</Oro>]}>
              Precio por gramo según la ley de la pieza, actualizado con la cotización internacional.
            </Encabezado>
          </div>
          <Aparecer delay={0.1}>
            <TablaPrecios />
          </Aparecer>
        </div>
      </section>

      <section className="border-y border-borde py-20 lg:py-28">
        <div className="contenedor">
          <Encabezado antetitulo="Vender tu oro" titulo={["Tres pasos,", <Oro key="o">cero sorpresas.</Oro>]} />
          <div className="mt-14 lg:mt-20">
            <Pasos />
          </div>
        </div>
      </section>

      <section className="claro py-20 lg:py-28">
        <div className="contenedor">
          <Encabezado antetitulo="Qué compramos" titulo={["Oro, plata", <Oro key="o">y mucho más.</Oro>]}>
            Lo que pone nuestro rótulo: relojes de alta gama, anillos, monedas, pulseras, collares, brillantes y antigüedades.
          </Encabezado>
          <div className="mt-12">
            <Compramos />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="contenedor grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Encabezado antetitulo="Preguntas frecuentes" titulo={["Lo que nos", <Oro key="o">preguntáis más.</Oro>]} />
          <Aparecer delay={0.1}>
            <Preguntas />
          </Aparecer>
        </div>
      </section>

      <LlamadaFinal
        titulo={["¿Prefieres que", <Oro key="o">lo veamos juntos?</Oro>]}
        texto="Ven a la tienda sin cita: pesamos y comprobamos tus piezas delante de ti y te damos la oferta al momento."
        imagen="serv-tasacion"
        acciones={
          <>
            <Boton a={NEGOCIO.comoLlegar} flecha>
              Cómo llegar
            </Boton>
            <BotonWhatsApp mensaje="Hola, tengo algunas joyas de oro y me gustaría tasarlas. ¿Cuándo puedo pasar?">Escríbenos por WhatsApp</BotonWhatsApp>
          </>
        }
      />
    </>
  );
}
