import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import "./index.css";

import { CotizacionProvider } from "./lib/cotizacion.jsx";
import { articuloPorSlug } from "./datos/blog.js";
import { Layout } from "./componentes/Layout.jsx";
import { Inicio } from "./paginas/Inicio.jsx";

const PaginaTasador = lazy(() => import("./paginas/PaginaTasador.jsx"));
const Servicios = lazy(() => import("./paginas/Servicios.jsx"));
const Joyeria = lazy(() => import("./paginas/Joyeria.jsx"));
const Galeria = lazy(() => import("./paginas/Galeria.jsx"));
const GuiaDelOro = lazy(() => import("./paginas/GuiaDelOro.jsx"));
const Nosotros = lazy(() => import("./paginas/Nosotros.jsx"));
const Blog = lazy(() => import("./paginas/Blog.jsx"));
const Articulo = lazy(() => import("./paginas/Articulo.jsx"));
const Contacto = lazy(() => import("./paginas/Contacto.jsx"));
const Privacidad = lazy(() => import("./paginas/Privacidad.jsx"));
const NoEncontrada = lazy(() => import("./paginas/NoEncontrada.jsx"));

/* Las URLs de la web antigua (WordPress) siguen funcionando. */
const ANTIGUAS = {
  about: "/nosotros",
  services: "/servicios",
  contact: "/contacto",
  "politica-privacidad": "/privacidad",
  "cookie-policy-eu": "/privacidad",
  "pagina-ejemplo": "/",
};

/* Los artículos vivían en la raíz (/vender-joyas/): ahora en /blog/vender-joyas. */
function RutaAntigua() {
  const { slug } = useParams();
  if (ANTIGUAS[slug]) return <Navigate to={ANTIGUAS[slug]} replace />;
  if (articuloPorSlug(slug)) return <Navigate to={`/blog/${slug}`} replace />;
  return <NoEncontrada />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CotizacionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="tasador" element={<PaginaTasador />} />
            <Route path="servicios" element={<Servicios />} />
            <Route path="joyeria" element={<Joyeria />} />
            <Route path="galeria" element={<Galeria />} />
            <Route path="guia-del-oro" element={<GuiaDelOro />} />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<Articulo />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="privacidad" element={<Privacidad />} />
            <Route path=":slug" element={<RutaAntigua />} />
            <Route path="*" element={<NoEncontrada />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CotizacionProvider>
  </React.StrictMode>,
);
