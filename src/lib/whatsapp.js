import { NEGOCIO } from "../datos/negocio.js";

export const enlaceWhatsApp = (mensaje = "Hola, os escribo desde la web de LB Metales y Gemas.") =>
  `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;

export const enlaceTelefono = (i = 0) => `tel:${NEGOCIO.telefonos[i].tel}`;
