/* Textos de la web: los de su web actual, ordenados y pulidos. */

export const SERVICIOS = [
  {
    id: "creacion",
    numero: "01",
    titulo: "Creación de joyas",
    resumen: "Piezas únicas a medida, de la idea al último pulido.",
    texto:
      "Diseñamos y creamos joyas únicas y personalizadas con materiales de la más alta calidad. Partimos de tu idea, la dibujamos contigo y la hacemos realidad.",
    imagen: "serv-creacion",
    alt: "Manos de joyera engastando una piedra en un anillo de oro",
  },
  {
    id: "compra",
    numero: "02",
    titulo: "Compra de oro",
    resumen: "Precio del día, proceso transparente y pago al momento.",
    texto:
      "Un servicio de compra de oro de confianza: tasas competitivas y un proceso transparente para que obtengas el mejor valor por tus piezas, aunque estén rotas o ya no las uses.",
    imagen: "serv-compra",
    alt: "Cadenas gruesas de oro en primer plano",
  },
  {
    id: "tasacion",
    numero: "03",
    titulo: "Tasación de metales",
    resumen: "Oro y plata analizados con precisión, delante de ti.",
    texto:
      "Tasamos metales preciosos como el oro y la plata con tecnología precisa: pesamos, comprobamos la pureza y aplicamos la cotización del día para un análisis exacto y justo.",
    imagen: "serv-tasacion",
    alt: "Manos examinando un anillo con una lupa de joyero",
  },
  {
    id: "atencion",
    numero: "04",
    titulo: "Atención personalizada",
    resumen: "Te asesoramos sin prisas, en tienda o por WhatsApp.",
    texto:
      "Nuestro equipo se dedica a ofrecerte un asesoramiento experto y cercano, tanto si buscas una joya especial como si quieres vender o invertir. Y si no estás en Alicante, te atendemos por teléfono y te la enviamos.",
    imagen: "serv-atencion",
    alt: "Manos mostrando con cuidado un anillo de oro",
  },
];

export const COMPRAMOS = [
  { titulo: "Oro", texto: "Joyas, cadenas, alianzas, piezas rotas o sueltas, monedas y lingotes.", icono: "lingote" },
  { titulo: "Plata", texto: "Joyas, cubertería, bandejas, monedas y lingotes de plata.", icono: "plata" },
  { titulo: "Relojes de alta gama", texto: "Relojes de lujo de oro y acero, valorados pieza a pieza.", icono: "reloj" },
  { titulo: "Brillantes", texto: "Diamantes sueltos y joyas con brillantes y piedras preciosas.", icono: "brillante" },
  { titulo: "Monedas", texto: "Monedas de oro y plata de inversión y de colección.", icono: "moneda" },
  { titulo: "Antigüedades", texto: "Joyería antigua y piezas con historia: pregúntanos.", icono: "antiguedad" },
];

export const PASOS = [
  {
    numero: "i",
    titulo: "Calcula o ven sin más",
    texto: "Usa el tasador para hacerte una idea en segundos, o tráenos tus piezas directamente a la tienda.",
  },
  {
    numero: "ii",
    titulo: "Lo analizamos delante de ti",
    texto: "Pesamos tus joyas y comprobamos su pureza a la vista. Aplicamos la cotización del oro de ese mismo día.",
  },
  {
    numero: "iii",
    titulo: "Decides tú, sin compromiso",
    texto: "Te hacemos una oferta clara. Si te encaja, cobras en el momento; si no, te llevas tus joyas.",
  },
];

export const VALORES = [
  { titulo: "Exclusividad", texto: "Creamos joyas únicas y personalizadas para cada cliente." },
  { titulo: "Experiencia", texto: "Años de oficio que garantizan la calidad de cada pieza y cada tasación." },
  { titulo: "Confianza", texto: "Tu satisfacción es nuestra prioridad: transparencia en cada paso." },
];

export const CIFRAS = [
  { valor: 15, prefijo: "+", sufijo: "", etiqueta: "años en Alicante", texto: "Más de quince años de trayectoria ofreciendo joyas únicas y un servicio cercano." },
  { valor: 98, prefijo: "", sufijo: " %", etiqueta: "clientes satisfechos", texto: "Más del 98 % de nuestros clientes nos recomiendan por la calidad y el trato." },
  { valor: 2008, prefijo: "", sufijo: "", etiqueta: "asesorando desde", texto: "Consultoría experta en joyería para una compra especial, una inversión o una pieza a medida.", sinSeparador: true },
];

export const NOSOTROS = {
  titulo: "Pasión por la joyería",
  parrafos: [
    "En LB Metales y Gemas hemos transformado la experiencia de comprar joyas con un enfoque claro: calidad y atención personalizada. Nuestros clientes aprecian esa dedicación, y por eso vuelven y nos recomiendan en Alicante.",
    "Nuestra experiencia en la creación y la compra de joyas ha permitido a muchísimos clientes encontrar piezas únicas y valiosas, y nos ha convertido en un referente de confianza en la ciudad.",
  ],
};

export const PREGUNTAS = [
  {
    p: "¿Cómo se calcula lo que me pagáis por mi oro?",
    r: "Pesamos la pieza, comprobamos su ley (los quilates) y multiplicamos el oro puro que contiene por la cotización del día. El tasador de la web hace la misma cuenta para que llegues con una idea clara.",
  },
  {
    p: "¿Qué necesito para vender oro?",
    r: "Tu DNI, NIE o pasaporte en vigor: la ley obliga a identificar a quien vende metales preciosos. Y tus piezas, claro, aunque estén rotas, sueltas o enredadas.",
  },
  {
    p: "No sé de cuántos quilates es mi joya. ¿Pasa algo?",
    r: "Nada. Busca un número grabado (750, 585…) y, si no lo encuentras, lo comprobamos en tienda en un momento. En la guía del oro te explicamos cómo leer el contraste.",
  },
  {
    p: "¿La tasación me compromete a algo?",
    r: "Ninguno. Tasamos delante de ti y sin compromiso: si la oferta no te convence, te llevas tus joyas.",
  },
  {
    p: "¿Compráis también plata, relojes y brillantes?",
    r: "Sí: plata de ley, relojes de alta gama, monedas, brillantes y antigüedades. Lo que no sea metal al peso lo valoramos pieza a pieza.",
  },
  {
    p: "¿Por qué el precio del tasador es orientativo?",
    r: "Porque la cotización se mueve cada minuto y la pureza real solo se confirma con la pieza en la mano. La oferta definitiva te la damos en tienda.",
  },
];
