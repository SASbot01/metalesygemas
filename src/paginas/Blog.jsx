import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useTitulo } from "../hooks/useTitulo.js";
import { ARTICULOS } from "../datos/blog.js";
import { CabeceraPagina } from "../componentes/Bloques.jsx";
import { Oro } from "../componentes/Encabezado.jsx";
import { TarjetaArticulo } from "../componentes/Articulos.jsx";
import { LlamadaFinal } from "../componentes/LlamadaFinal.jsx";
import { Aparecer, EASE } from "../componentes/Animaciones.jsx";

const TODAS = "Todos";

export default function Blog() {
  useTitulo("Blog", "Guías y consejos de joyero: cómo reconocer el oro, cuánto vale tu oro, piedras preciosas y tendencias en joyería.");
  const categorias = useMemo(() => [TODAS, ...new Set(ARTICULOS.map((a) => a.categoria))], []);
  const [filtro, setFiltro] = useState(TODAS);
  const lista = filtro === TODAS ? ARTICULOS : ARTICULOS.filter((a) => a.categoria === filtro);
  const [destacado, ...resto] = lista;

  return (
    <>
      <CabeceraPagina antetitulo="Blog" titulo={["Guías y consejos", <Oro key="o">de joyero.</Oro>]}>
        Todo lo que conviene saber antes de comprar, vender o regalar una joya, contado por quien lo vive cada día en el mostrador.
      </CabeceraPagina>

      <section className="pb-20 lg:pb-28">
        <div className="contenedor">
          <Aparecer>
            <LayoutGroup id="filtro-blog">
              <div role="tablist" aria-label="Categorías" className="sin-barra -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
                {categorias.map((c) => {
                  const activa = c === filtro;
                  return (
                    <button
                      key={c}
                      type="button"
                      role="tab"
                      aria-selected={activa}
                      onClick={() => setFiltro(c)}
                      className={`relative shrink-0 rounded-[2px] px-4 py-2 text-[0.82rem] font-semibold transition-colors ${
                        activa ? "text-principal-tinta" : "border border-borde text-suave hover:text-tinta"
                      }`}
                    >
                      {activa ? (
                        <motion.span
                          layoutId="categoria-activa"
                          className="absolute inset-0 rounded-[2px]"
                          style={{ background: "var(--color-principal)" }}
                          transition={{ duration: 0.45, ease: EASE }}
                        />
                      ) : null}
                      <span className="relative">{c}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </Aparecer>

          <AnimatePresence mode="wait">
            <motion.div
              key={filtro}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {destacado ? (
                <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
                  <TarjetaArticulo articulo={destacado} grande />
                  <div className="grid content-start gap-10">
                    {resto.slice(0, 1).map((a) => (
                      <TarjetaArticulo key={a.slug} articulo={a} />
                    ))}
                  </div>
                </div>
              ) : null}
              {resto.length > 1 ? (
                <div className="mt-16 grid gap-x-8 gap-y-14 border-t border-borde pt-16 md:grid-cols-2 lg:grid-cols-3">
                  {resto.slice(1).map((a) => (
                    <TarjetaArticulo key={a.slug} articulo={a} />
                  ))}
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <LlamadaFinal />
    </>
  );
}
