import { useTitulo } from "../hooks/useTitulo.js";
import { NEGOCIO } from "../datos/negocio.js";
import { CabeceraPagina } from "../componentes/Bloques.jsx";
import { Oro } from "../componentes/Encabezado.jsx";

const SECCIONES = [
  {
    t: "Quién trata tus datos",
    p: [
      `${NEGOCIO.nombre}, con domicilio en ${NEGOCIO.direccion.calle}, ${NEGOCIO.direccion.cp} ${NEGOCIO.direccion.ciudad}. Puedes escribirnos a ${NEGOCIO.email} o llamarnos al ${NEGOCIO.telefonos[0].numero}.`,
    ],
  },
  {
    t: "Qué datos usamos y para qué",
    p: [
      "Esta web no tiene registro ni guarda formularios en ningún servidor. Cuando nos escribes por WhatsApp, por email o nos llamas, usamos los datos que nos das (nombre, teléfono, email y tu consulta) únicamente para responderte y atenderte.",
      "Si nos vendes oro u otros metales preciosos, la ley nos obliga a identificarte y a conservar el registro de la operación durante el tiempo legalmente establecido.",
    ],
  },
  {
    t: "Cookies",
    p: [
      "No usamos cookies propias ni de terceros para analítica o publicidad, por eso no verás ningún aviso de cookies.",
      "Para que el tasador cargue rápido, tu navegador guarda la última cotización del oro (no es un dato personal). La cotización se consulta en directo a gold-api.com.",
      "El mapa de la web es una imagen estática de OpenStreetMap. El botón «Cómo llegar» abre Google Maps en una pestaña nueva; a partir de ahí se aplica la política de privacidad de Google.",
    ],
  },
  {
    t: "Tus derechos",
    p: [
      `Puedes pedirnos acceso, rectificación o supresión de tus datos, o oponerte a su uso, escribiendo a ${NEGOCIO.email}. Si consideras que no te hemos atendido bien, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).`,
    ],
  },
];

export default function Privacidad() {
  useTitulo("Privacidad y cookies", "Qué datos usamos en LB Metales y Gemas, para qué y cómo puedes ejercer tus derechos.");
  return (
    <>
      <CabeceraPagina antetitulo="Legal" titulo={["Privacidad", <Oro key="o">y cookies.</Oro>]}>
        Claro y breve: qué datos usamos, para qué y cómo puedes ejercer tus derechos.
      </CabeceraPagina>
      <section className="pb-24 lg:pb-32">
        <div className="contenedor grid max-w-4xl gap-12">
          {SECCIONES.map((s, i) => (
            <div key={s.t} className="grid gap-4 border-t border-borde pt-8 md:grid-cols-[14rem_1fr] md:gap-10">
              <h2 className="font-display text-[1.7rem] leading-tight">
                <span className="mr-2 text-acento">0{i + 1}</span>
                {s.t}
              </h2>
              <div className="grid gap-4">
                {s.p.map((parrafo) => (
                  <p key={parrafo.slice(0, 30)} className="texto-cuerpo">
                    {parrafo}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
