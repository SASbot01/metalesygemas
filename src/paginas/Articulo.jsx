import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTitulo } from "../hooks/useTitulo.js";
import { ARTICULOS, articuloPorSlug, fechaLarga, minutosLectura } from "../datos/blog.js";
import { Imagen } from "../componentes/Imagen.jsx";
import { TarjetaArticulo } from "../componentes/Articulos.jsx";
import { Aparecer, EASE, TextoRevelado } from "../componentes/Animaciones.jsx";
import { Boton, BotonWhatsApp } from "../componentes/Botones.jsx";
import { IconoFlecha } from "../componentes/Iconos.jsx";
import { PrecioEnDirecto } from "../componentes/Indicadores.jsx";
import NoEncontrada from "./NoEncontrada.jsx";

/* **negrita** dentro de los textos del blog. */
function ConNegritas({ texto }) {
  return texto.split(/(\*\*[^*]+\*\*)/).map((trozo, i) =>
    trozo.startsWith("**") ? <strong key={i}>{trozo.slice(2, -2)}</strong> : <Fragment key={i}>{trozo}</Fragment>,
  );
}

export default function Articulo() {
  const { slug } = useParams();
  const articulo = articuloPorSlug(slug);
  useTitulo(articulo ? articulo.titulo : "Página no encontrada", articulo?.extracto, { indexar: Boolean(articulo) });
  const { scrollYProgress } = useScroll();
  const progreso = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  if (!articulo) return <NoEncontrada />;

  const indice = ARTICULOS.indexOf(articulo);
  const relacionados = [1, 2, 3].map((d) => ARTICULOS[(indice + d) % ARTICULOS.length]);

  return (
    <article>
      <header className="relative pt-[calc(var(--nav-h)+3rem)] lg:pt-[calc(var(--nav-h)+5rem)]">
        <div className="contenedor max-w-[76rem]">
          <div className="max-w-[48rem]">
          <Aparecer>
            <Link to="/blog" className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-tenue transition-colors hover:text-acento">
              <IconoFlecha className="h-3.5 w-3.5 rotate-180" />
              Blog
            </Link>
          </Aparecer>
          <Aparecer as="p" delay={0.05} className="eyebrow mt-8">
            {articulo.categoria}
          </Aparecer>
          <TextoRevelado
            as="h1"
            alCargar
            retraso={0.1}
            lineas={[articulo.titulo]}
            className="mt-5 text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.02] tracking-[-0.02em]"
          />
          <Aparecer delay={0.3} className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.85rem] text-tenue">
            <span>{fechaLarga(articulo.fecha)}</span>
            <span className="h-3 w-px bg-borde" />
            <span>{minutosLectura(articulo)} min de lectura</span>
            <span className="h-3 w-px bg-borde" />
            <span>LB Metales y Gemas</span>
          </Aparecer>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          className="contenedor mt-12 max-w-[76rem]"
        >
          <Imagen nombre={articulo.imagen} alt={articulo.alt} ratio="21/10" prioridad className="rounded-[3px] border border-borde" sizes="100vw" />
        </motion.div>
      </header>

      <div className="contenedor grid max-w-[76rem] gap-14 py-16 lg:grid-cols-[1fr_18rem] lg:py-24">
        <div className="prosa w-full max-w-[42rem]">
          <p className="!text-[1.3rem] !leading-relaxed !text-tinta/90">{articulo.extracto}</p>
          {articulo.cuerpo.map((bloque, i) => {
            if (bloque.h) return <h2 key={i}>{bloque.h}</h2>;
            if (bloque.lista)
              return (
                <ul key={i}>
                  {bloque.lista.map((item) => (
                    <li key={item}>
                      <ConNegritas texto={item} />
                    </li>
                  ))}
                </ul>
              );
            return (
              <p key={i}>
                <ConNegritas texto={bloque.p} />
              </p>
            );
          })}
        </div>

        <aside className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
          <div className="tarjeta borde-fino rounded-[3px] p-6">
            <div className="mb-5 h-[2px] overflow-hidden rounded-full bg-hundido">
              <motion.div style={{ scaleX: progreso, background: "var(--color-acento)" }} className="h-full origin-left" />
            </div>
            <p className="font-display text-[1.6rem] leading-tight">¿Cuánto vale tu oro hoy?</p>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-suave">Calcúlalo en segundos con la cotización en directo.</p>
            <PrecioEnDirecto className="mt-5" />
            <div className="mt-6 grid gap-3">
              <Boton a="/tasador" flecha magnetico={false} className="!px-4 !text-[0.72rem]">
                Ir al tasador
              </Boton>
              <BotonWhatsApp magnetico={false} className="!px-4 !text-[0.72rem]" mensaje={`Hola, he leído «${articulo.titulo}» en vuestra web y tengo una consulta.`}>
                Preguntar
              </BotonWhatsApp>
            </div>
          </div>
        </aside>
      </div>

      <section className="perla py-20 lg:py-24">
        <div className="contenedor">
          <h2 className="titulo-seccion">
            Sigue <em className="realce italic">leyendo.</em>
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((a) => (
              <TarjetaArticulo key={a.slug} articulo={a} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
