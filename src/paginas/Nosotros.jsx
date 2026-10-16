import { useTitulo } from "../hooks/useTitulo.js";
import { NOSOTROS } from "../datos/contenido.js";
import { CabeceraPagina, Cifras, Valores } from "../componentes/Bloques.jsx";
import { Encabezado, Oro } from "../componentes/Encabezado.jsx";
import { Resenas } from "../componentes/Resenas.jsx";
import { Visitanos } from "../componentes/Visitanos.jsx";
import { Imagen } from "../componentes/Imagen.jsx";
import { Aparecer, Escalonado, Hijo, Parallax } from "../componentes/Animaciones.jsx";

export default function Nosotros() {
  useTitulo("Nosotros", "Más de 15 años de joyería, compra y tasación de oro en el centro de Alicante. Conoce LB Metales y Gemas.");

  return (
    <>
      <CabeceraPagina antetitulo="Nuestra historia y compromiso" titulo={["Descubre la calidad", <Oro key="o">en joyería y tasación.</Oro>]}>
        Oficio, cercanía y confianza en pleno centro de Alicante, a un paso del Mercado Central.
      </CabeceraPagina>

      <section className="pb-20 lg:pb-28">
        <div className="contenedor grid items-center gap-6 md:grid-cols-[1fr_1.15fr]">
          <Aparecer>
            <Parallax className="aspect-[4/5] rounded-[3px] border border-borde" distancia={40}>
              <Imagen nombre="fachada" alt="Fachada de la tienda con el rótulo de compraventa" className="h-full w-full" />
            </Parallax>
          </Aparecer>
          <div className="grid gap-6">
            <Aparecer delay={0.1}>
              <Imagen nombre="alicante-noche" alt="El paseo de Alicante de noche con el castillo iluminado" ratio="4/3" className="rounded-[3px] border border-borde" />
            </Aparecer>
            <Aparecer delay={0.2} className="tarjeta borde-fino rounded-[3px] p-8">
              <p className="font-display text-[2.2rem] leading-tight">
                Joyas únicas y un servicio cercano, <span className="italic text-acento">basado en la pasión y la excelencia artesanal.</span>
              </p>
            </Aparecer>
          </div>
        </div>
      </section>

      <section className="claro py-20 lg:py-28">
        <div className="contenedor grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Encabezado antetitulo="Quiénes somos" titulo={[NOSOTROS.titulo, <Oro key="o">desde 2008.</Oro>]} />
          <Escalonado className="grid gap-6" retraso={0.15}>
            {NOSOTROS.parrafos.map((p) => (
              <Hijo as="p" key={p.slice(0, 24)} className="text-[1.15rem] leading-relaxed text-tinta/85">
                {p}
              </Hijo>
            ))}
            <Hijo as="p" className="texto-cuerpo">
              Creamos joyas a medida, compramos y tasamos oro, plata, relojes de alta gama, brillantes, monedas y antigüedades, y
              asesoramos a quien busca una pieza especial o quiere invertir con cabeza.
            </Hijo>
          </Escalonado>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="contenedor">
          <Encabezado antetitulo="Compromiso con la excelencia" titulo={["Lo que nos", <Oro key="o">define.</Oro>]} />
          <div className="mt-12">
            <Cifras />
          </div>
          <div className="mt-20">
            <Valores />
          </div>
        </div>
      </section>

      <section className="perla py-20 lg:py-28">
        <Resenas />
      </section>

      <section className="py-20 lg:py-28">
        <Visitanos />
      </section>
    </>
  );
}
