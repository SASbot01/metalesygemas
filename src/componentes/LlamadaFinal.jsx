import { Parallax } from "./Animaciones.jsx";
import { Imagen } from "./Imagen.jsx";
import { Boton, BotonWhatsApp } from "./Botones.jsx";
import { Encabezado, Oro } from "./Encabezado.jsx";

/* Cierre de página: foto en movimiento y las dos acciones que importan. */
export function LlamadaFinal({
  titulo = ["¿Tienes oro guardado", <Oro key="o">en un cajón?</Oro>],
  texto = "Puede valer más de lo que imaginas. Tráelo y te lo tasamos delante de ti, con el precio del día y sin compromiso.",
  imagen = "cta-terciopelo",
  antetitulo = "Tasación sin compromiso",
  acciones,
}) {
  return (
    <section className="contenedor py-24 lg:py-32">
      <div className="relative isolate overflow-hidden rounded-[3px] border border-borde">
        <Parallax className="absolute inset-0 -z-10" distancia={50}>
          <Imagen nombre={imagen} alt="" className="h-full w-full" sizes="100vw" />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(1,5,25,0.94)_12%,rgba(1,5,25,0.72)_50%,rgba(1,5,25,0.25))]" />

        <div className="px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
          <Encabezado antetitulo={antetitulo} titulo={titulo}>
            {texto}
          </Encabezado>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {acciones ?? (
              <>
                <Boton a="/tasador" flecha>
                  Calcular cuánto vale
                </Boton>
                <BotonWhatsApp mensaje="Hola, tengo algunas joyas de oro y me gustaría tasarlas. ¿Cuándo puedo pasar?">
                  Escríbenos por WhatsApp
                </BotonWhatsApp>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
