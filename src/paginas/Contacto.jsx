import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTitulo } from "../hooks/useTitulo.js";
import { NEGOCIO } from "../datos/negocio.js";
import { enlaceTelefono, enlaceWhatsApp } from "../lib/whatsapp.js";
import { CabeceraPagina } from "../componentes/Bloques.jsx";
import { Oro } from "../componentes/Encabezado.jsx";
import { Visitanos } from "../componentes/Visitanos.jsx";
import { Aparecer, EASE, Escalonado, Hijo } from "../componentes/Animaciones.jsx";
import { useFoco } from "../hooks/useFoco.js";
import { IconoCheck, IconoCorreo, IconoFlechaArriba, IconoInstagram, IconoTelefono, IconoTikTok, IconoWhatsApp } from "../componentes/Iconos.jsx";

const MOTIVOS = ["Vender oro o plata", "Tasar una joya", "Comprar una joya", "Joya a medida", "Otra consulta"];

function Formulario() {
  const [datos, setDatos] = useState({ nombre: "", telefono: "", motivo: MOTIVOS[0], mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [intentado, setIntentado] = useState(false);
  const cambiar = (campo) => (e) => setDatos((d) => ({ ...d, [campo]: e.target.value }));
  const valido = datos.nombre.trim().length > 1 && datos.mensaje.trim().length > 3;

  const texto = () =>
    `Hola, soy ${datos.nombre.trim()}.${datos.telefono.trim() ? ` Mi teléfono: ${datos.telefono.trim()}.` : ""}\nMotivo: ${datos.motivo}.\n${datos.mensaje.trim()}`;

  const enviar = (canal) => (e) => {
    e.preventDefault();
    setIntentado(true);
    if (!valido) return;
    const url =
      canal === "whatsapp"
        ? enlaceWhatsApp(texto())
        : `mailto:${NEGOCIO.email}?subject=${encodeURIComponent(`${datos.motivo} · web`)}&body=${encodeURIComponent(texto())}`;
    if (canal === "whatsapp") window.open(url, "_blank", "noopener");
    else window.location.href = url;
    setEnviado(true);
  };

  return (
    <form onSubmit={enviar("whatsapp")} noValidate className="tarjeta borde-fino relative overflow-hidden rounded-[3px] p-6 sm:p-9">
      <AnimatePresence mode="wait">
        {enviado ? (
          <motion.div
            key="hecho"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex min-h-[26rem] flex-col items-start justify-center"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-acento/15 text-acento">
              <IconoCheck className="h-7 w-7" />
            </span>
            <p className="mt-6 font-display text-[2.4rem] leading-tight">¡Listo, {datos.nombre.trim().split(" ")[0]}!</p>
            <p className="texto-cuerpo mt-3 max-w-md">
              Hemos preparado tu mensaje: solo tienes que enviarlo. Te contestamos lo antes posible, en horario de tienda.
            </p>
            <button type="button" onClick={() => setEnviado(false)} className="enlace-fino mt-8">
              Escribir otro mensaje
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5">
            <p className="font-display text-[2rem] leading-tight">Cuéntanos qué necesitas</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-tenue">Nombre *</span>
                <input
                  className="campo"
                  value={datos.nombre}
                  onChange={cambiar("nombre")}
                  autoComplete="name"
                  required
                  aria-invalid={intentado && datos.nombre.trim().length <= 1}
                />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-tenue">Teléfono</span>
                <input className="campo" value={datos.telefono} onChange={cambiar("telefono")} autoComplete="tel" inputMode="tel" />
              </label>
            </div>
            <fieldset className="grid gap-2">
              <legend className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-tenue">Motivo</legend>
              <div className="flex flex-wrap gap-2">
                {MOTIVOS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={datos.motivo === m}
                    onClick={() => setDatos((d) => ({ ...d, motivo: m }))}
                    className={`chip ${datos.motivo === m ? "!border-acento !bg-acento/10 !text-realce" : ""}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="grid gap-2">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-tenue">Mensaje *</span>
              <textarea
                className="campo min-h-36 resize-y"
                value={datos.mensaje}
                onChange={cambiar("mensaje")}
                placeholder="Por ejemplo: tengo una cadena y dos anillos de oro de 18 k que quiero tasar."
                required
                aria-invalid={intentado && datos.mensaje.trim().length <= 3}
              />
            </label>
            {intentado && !valido ? (
              <p role="alert" className="text-[0.85rem] text-cerrado">
                Escribe tu nombre y un mensaje para poder contestarte.
              </p>
            ) : null}
            <div className="mt-1 flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="boton boton-principal">
                <IconoWhatsApp className="h-4 w-4" />
                Enviar por WhatsApp
              </button>
              <button type="button" onClick={enviar("email")} className="boton boton-linea">
                <IconoCorreo className="h-4 w-4" />
                Enviar por email
              </button>
            </div>
            <p className="text-[0.75rem] leading-relaxed text-tenue">
              Usamos tus datos solo para responderte. Más información en{" "}
              <Link to="/privacidad" className="underline decoration-borde underline-offset-4 hover:text-suave">
                privacidad
              </Link>
              .
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

export default function Contacto() {
  useTitulo("Contacto", "Llámanos, escríbenos por WhatsApp o visítanos en C/ Susana Llaneras, 47 (Alicante). Tasación de oro sin compromiso.");
  const foco = useFoco();

  const canales = [
    { icono: IconoWhatsApp, titulo: "WhatsApp", valor: NEGOCIO.telefonos[0].numero, a: enlaceWhatsApp(), nota: "La forma más rápida" },
    { icono: IconoTelefono, titulo: "Teléfono", valor: NEGOCIO.telefonos[0].numero, a: enlaceTelefono(0), nota: "Lunes a viernes" },
    { icono: IconoTelefono, titulo: "Teléfono 2", valor: NEGOCIO.telefonos[1].numero, a: enlaceTelefono(1), nota: "Lunes a viernes" },
    { icono: IconoCorreo, titulo: "Email", valor: NEGOCIO.email, a: `mailto:${NEGOCIO.email}`, nota: "Para consultas con calma" },
    { icono: IconoInstagram, titulo: "Instagram", valor: NEGOCIO.redes[0].usuario, a: NEGOCIO.redes[0].url, nota: "Novedades del escaparate" },
    { icono: IconoTikTok, titulo: "TikTok", valor: NEGOCIO.redes[1].usuario, a: NEGOCIO.redes[1].url, nota: "Piezas en vídeo" },
  ];

  return (
    <>
      <CabeceraPagina antetitulo="Contáctanos" titulo={["Hablemos.", <Oro key="o">Estamos a un mensaje.</Oro>]}>
        Visítanos en la tienda para cualquier consulta sobre joyería o tasación de metales preciosos, o escríbenos y te contestamos
        enseguida.
      </CabeceraPagina>

      <section className="pb-20 lg:pb-28">
        <div className="contenedor grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <Aparecer>
            <Formulario />
          </Aparecer>
          <Escalonado className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1" retraso={0.1}>
            {canales.map((c) => {
              const Icono = c.icono;
              const externo = c.a.startsWith("http");
              return (
                <Hijo key={c.titulo}>
                  <a
                    href={c.a}
                    {...(externo ? { target: "_blank", rel: "noopener" } : {})}
                    onPointerMove={foco}
                    className="tarjeta foco group flex items-center gap-4 rounded-[3px] px-5 py-4 transition-colors hover:border-acento/40"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-acento/35 text-acento">
                      <Icono className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.68rem] font-bold uppercase tracking-[0.2em] text-tenue">{c.titulo}</span>
                      <span className="tabular mt-0.5 block text-[1rem] font-semibold text-tinta [overflow-wrap:anywhere]">{c.valor}</span>
                      <span className="block text-[0.78rem] text-tenue">{c.nota}</span>
                    </span>
                    <IconoFlechaArriba className="h-4 w-4 shrink-0 text-tenue transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acento" />
                  </a>
                </Hijo>
              );
            })}
          </Escalonado>
        </div>
      </section>

      <section className="claro py-20 lg:py-28">
        <Visitanos />
      </section>
    </>
  );
}
