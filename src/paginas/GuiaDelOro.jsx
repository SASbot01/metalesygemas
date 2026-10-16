import { useTitulo } from "../hooks/useTitulo.js";
import { METALES } from "../datos/metales.js";
import { porcentaje } from "../lib/formato.js";
import { CabeceraPagina, ColoresOro, OroAutentico } from "../componentes/Bloques.jsx";
import { Encabezado, Oro } from "../componentes/Encabezado.jsx";
import { LeyDelOro } from "../componentes/LeyDelOro.jsx";
import { LlamadaFinal } from "../componentes/LlamadaFinal.jsx";
import { Imagen } from "../componentes/Imagen.jsx";
import { Aparecer, Escalonado, Hijo } from "../componentes/Animaciones.jsx";
import { EnlaceFino } from "../componentes/Botones.jsx";

const LEYES = METALES[0].leyes;

export default function GuiaDelOro() {
  useTitulo(
    "Guía del oro: quilates, colores y cómo reconocerlo",
    "Qué significan los quilates del oro (24k, 18k, 14k, 9k), en qué se diferencian el oro amarillo, blanco y rosa y cómo saber si una joya es de oro auténtico.",
  );

  return (
    <>
      <CabeceraPagina antetitulo="Guía del oro" titulo={["Todo lo que debes saber", <Oro key="o">antes de comprar o vender.</Oro>]}>
        Qué significan los quilates, por qué el oro tiene colores distintos y cómo saber si una joya es de oro de verdad. Explicado
        claro, como te lo contaríamos en el mostrador.
      </CabeceraPagina>

      <section className="pb-20 lg:pb-28">
        <div className="contenedor">
          <LeyDelOro />
        </div>
      </section>

      <section className="claro py-20 lg:py-28">
        <div className="contenedor">
          <Encabezado antetitulo="Tabla de quilataje" titulo={["Cada ley,", <Oro key="o">en milésimas.</Oro>]}>
            El contraste que verás grabado en tus joyas indica las milésimas de oro puro. Con este número, el tasador hace el resto.
          </Encabezado>

          <Aparecer delay={0.1} className="mt-12">
            <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <caption className="sr-only">Pureza del oro según sus quilates</caption>
                <thead>
                  <tr className="border-b border-acento/40 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-tenue">
                    <th scope="col" className="py-4 pr-4 font-bold">
                      Quilates
                    </th>
                    <th scope="col" className="px-4 py-4 font-bold">
                      Contraste
                    </th>
                    <th scope="col" className="px-4 py-4 font-bold">
                      Oro puro
                    </th>
                    <th scope="col" className="px-4 py-4 font-bold">
                      Otros metales
                    </th>
                    <th scope="col" className="py-4 pl-4 font-bold">
                      Dónde lo verás
                    </th>
                  </tr>
                </thead>
                <Escalonado as="tbody" paso={0.06}>
                  {LEYES.map((l) => (
                    <Hijo as="tr" key={l.id} className={`border-b border-borde ${l.habitual ? "bg-acento/[0.05]" : ""}`}>
                      <th scope="row" className="py-5 pr-4 font-display text-[2rem] font-normal leading-none text-tinta">
                        {l.id}
                        <span className="ml-1 font-sans text-[0.7rem] font-bold uppercase tracking-[0.2em] text-tenue">k</span>
                      </th>
                      <td className="tabular px-4 py-5">
                        <span className="rounded-[2px] border border-acento/40 px-2.5 py-1 font-display text-[1.25rem] text-realce">{l.milesimas}</span>
                      </td>
                      <td className="tabular px-4 py-5 text-[0.95rem] text-tinta">{porcentaje(l.milesimas)}</td>
                      <td className="tabular px-4 py-5 text-[0.95rem] text-tenue">{porcentaje(1000 - l.milesimas)}</td>
                      <td className="py-5 pl-4 text-[0.95rem] text-suave">{l.uso}</td>
                    </Hijo>
                  ))}
                </Escalonado>
              </table>
            </div>
          </Aparecer>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="contenedor">
          <Encabezado antetitulo="Colores del oro" titulo={["Amarillo, blanco o rosa:", <Oro key="o">mismo oro, otra aleación.</Oro>]}>
            Los tres son oro de la misma calidad. Lo que cambia es con qué metales se alea el oro puro para darle su color.
          </Encabezado>
          <div className="mt-12">
            <ColoresOro />
          </div>
        </div>
      </section>

      <section className="claro py-20 lg:py-28">
        <div className="contenedor">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Encabezado antetitulo="¿Es oro de verdad?" titulo={["Cuatro pistas", <Oro key="o">para reconocerlo.</Oro>]}>
              Trucos sencillos para salir de dudas en casa. Y si sigues con ellas, ven: te lo decimos sin compromiso.
            </Encabezado>
            <Aparecer delay={0.2} className="shrink-0">
              <EnlaceFino a="/blog/guia-reconocer-oro-autentico">Leer la guía completa</EnlaceFino>
            </Aparecer>
          </div>
          <div className="mt-12">
            <OroAutentico />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="contenedor grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Aparecer>
            <Imagen nombre="insp-anillo-luz" alt="Anillo de oro con brillantes bajo un haz de luz" ratio="4/5" className="rounded-[3px] border border-borde" />
          </Aparecer>
          <div>
            <Encabezado antetitulo="No confundir" titulo={["Quilates del oro", <Oro key="o">y del diamante.</Oro>]}>
              Se llaman igual, pero no tienen nada que ver. Los quilates del oro (18 k, 14 k…) miden la pureza del metal; los del
              diamante y las piedras preciosas (ct) miden su peso: un quilate son 0,2 gramos.
            </Encabezado>
            <Aparecer delay={0.15} className="mt-8 grid gap-4">
              <p className="texto-cuerpo">
                En una piedra, además del peso, cuentan el color, la pureza y la talla. Por eso las gemas no se tasan al peso como el
                metal: se valoran una a una.
              </p>
              <EnlaceFino a="/blog/el-valor-de-las-piedras-preciosas">El valor de las piedras preciosas</EnlaceFino>
            </Aparecer>
          </div>
        </div>
      </section>

      <LlamadaFinal
        imagen="lingotes"
        antetitulo="Ya sabes leer tu oro"
        titulo={["Ahora, descubre", <Oro key="o">cuánto vale.</Oro>]}
        texto="Con los quilates y el peso, el tasador te da una estimación al momento con la cotización de hoy."
      />
    </>
  );
}
