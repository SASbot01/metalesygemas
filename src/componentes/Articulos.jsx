import { Link } from "react-router-dom";
import { fechaLarga, minutosLectura } from "../datos/blog.js";
import { Imagen } from "./Imagen.jsx";
import { IconoFlecha } from "./Iconos.jsx";

export function TarjetaArticulo({ articulo, grande = false }) {
  return (
    <Link to={`/blog/${articulo.slug}`} className="group flex h-full flex-col">
      <div className="relative overflow-hidden rounded-[3px] border border-borde">
        <Imagen
          nombre={articulo.imagen}
          alt={articulo.alt}
          ratio={grande ? "16/11" : "4/3"}
          sizes={grande ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
          claseImg="transition-transform duration-[1.4s] group-hover:scale-[1.05]"
        />
        <span className="absolute left-4 top-4 rounded-[2px] border border-tinta/20 bg-fondo/60 px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-tinta backdrop-blur">
          {articulo.categoria}
        </span>
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-[0.75rem] font-semibold text-tenue">
          {fechaLarga(articulo.fecha)} · {minutosLectura(articulo)} min de lectura
        </p>
        <h3
          className={`mt-2 font-display leading-[1.08] text-tinta transition-colors group-hover:text-realce ${
            grande ? "text-[clamp(2rem,3.2vw,2.8rem)]" : "text-[1.7rem]"
          }`}
        >
          {articulo.titulo}
        </h3>
        <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-suave">{articulo.extracto}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-acento">
          Leer artículo
          <IconoFlecha className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
