/*
 * Los 8 artículos de su blog, con su misma URL (slug) para no perder posicionamiento.
 * Cada bloque es { h: "Subtítulo" } o { p: "Párrafo" } o { lista: [...] }.
 */

export const ARTICULOS = [
  {
    slug: "descubre-alicante-joyas",
    titulo: "Descubre Alicante a través de sus joyas: tradición, arte y lujo",
    fecha: "2025-04-20",
    categoria: "Alicante",
    imagen: "alicante-noche",
    alt: "El paseo marítimo de Alicante de noche con el castillo de Santa Bárbara iluminado",
    extracto:
      "Las joyas también cuentan historias. Conoce la tradición y la belleza de Alicante a través de piezas únicas inspiradas en su cultura y su estilo mediterráneo.",
    cuerpo: [
      { h: "Alicante, fuente de inspiración" },
      { p: "Alicante es una ciudad de luz, mar y tradiciones que inspiran. Las joyas que nacen aquí reflejan su cultura y su sofisticación." },
      { h: "Joyas con identidad mediterránea" },
      { p: "En LB Metales y Gemas celebramos esa identidad con piezas hechas a mano, pensadas para quienes buscan algo más que un accesorio." },
      { h: "Un recuerdo imborrable" },
      { p: "Nuestra joyería es un punto de encuentro para viajeros, coleccionistas y amantes del arte. Cada pieza es un homenaje al alma de esta ciudad." },
      { h: "Vive la experiencia" },
      { p: "Te invitamos a vivir una experiencia única, donde el lujo se mezcla con la calidez de nuestro equipo." },
    ],
  },
  {
    slug: "lo-que-debes-saber-antes-de-comprar-oro",
    titulo: "Joyas como inversión: lo que debes saber antes de comprar oro",
    fecha: "2025-04-20",
    categoria: "Inversión",
    imagen: "insp-cadena-bokeh",
    alt: "Cadena de oro en diagonal con brillos desenfocados",
    extracto:
      "Invertir en oro es una decisión inteligente y elegante. Descubre cómo elegir bien y por qué nuestras joyas en Alicante son un valor seguro.",
    cuerpo: [
      { h: "Invertir con estilo y seguridad" },
      { p: "El oro nunca pasa de moda. Las joyas de oro son una inversión que resiste el paso del tiempo." },
      { h: "Aspectos clave antes de invertir" },
      {
        lista: [
          "**Pureza:** el oro de 24 k es el más puro, pero también el más blando.",
          "**Precio por gramo:** varía según el mercado internacional.",
          "**Diseño:** una joya bien diseñada puede aumentar su valor.",
        ],
      },
      { h: "Asesoramiento experto en Alicante" },
      { p: "En nuestra joyería te damos la información que necesitas para invertir con confianza y elegancia." },
    ],
  },
  {
    slug: "elegimos-joyas-perfectas-personalizadas",
    titulo: "Atención personalizada: cómo elegimos la joya perfecta para ti",
    fecha: "2025-04-20",
    categoria: "Atención",
    imagen: "serv-atencion",
    alt: "Manos mostrando con cuidado un anillo de oro",
    extracto:
      "Elegir una joya es un momento especial. En LB Metales y Gemas te acompañamos con atención personalizada para que encuentres la pieza perfecta, para ti o para regalar.",
    cuerpo: [
      { h: "Una experiencia a medida" },
      { p: "Comprar una joya es una experiencia íntima y personal. Cada cliente merece una atención exclusiva." },
      { h: "Nuestro proceso personalizado" },
      {
        p: "Empezamos con una charla informal para conocer tus gustos, la ocasión, tu estilo de vida y tu presupuesto. Después te mostramos opciones pensadas para ti.",
      },
      { h: "Atención cercana y profesional" },
      {
        p: "Esa atención es la que hace que clientes de toda España y del extranjero nos recomienden. Te ayudamos a elegir recuerdos inolvidables.",
      },
    ],
  },
  {
    slug: "tendencias-de-joyeria",
    titulo: "Tendencias en joyería 2025: elegancia con personalidad",
    fecha: "2025-04-20",
    categoria: "Tendencias",
    imagen: "insp-modelo-cubana",
    alt: "Modelo con collar de eslabón cubano de oro y aros de oro",
    extracto:
      "La joyería se renueva con diseños minimalistas, piedras de colores y un enfoque más consciente. Descubre lo último en estilo desde nuestra joyería en Alicante.",
    cuerpo: [
      { h: "Nuevos estilos, nuevos valores" },
      { p: "La joyería se viste de personalidad, conciencia y diseño atemporal. El lujo ya no es ostentación: es autenticidad." },
      { h: "Tendencias destacadas" },
      {
        lista: [
          "Diseños minimalistas con formas geométricas y metales lisos.",
          "Joyas vintage reinterpretadas con toques modernos.",
          "Piedras de colores como reflejo de emociones.",
          "Producción sostenible: materiales reciclados y procesos responsables.",
        ],
      },
      { h: "Joyería con alma" },
      {
        p: "En LB Metales y Gemas combinamos estas tendencias con nuestro compromiso artesanal. Si buscas joyas con estilo y con alma, estás en el lugar correcto.",
      },
    ],
  },
  {
    slug: "el-valor-de-las-piedras-preciosas",
    titulo: "El valor de las piedras preciosas: lo que debes saber antes de comprar o vender",
    fecha: "2025-04-20",
    categoria: "Gemas",
    imagen: "insp-granate",
    alt: "Pendientes de oro con perla granate en claroscuro",
    extracto:
      "Color, pureza, talla y peso: te contamos todo lo que influye en el valor de una gema. En LB Metales y Gemas valoramos tus piedras con total transparencia.",
    cuerpo: [
      { h: "Factores que determinan el valor" },
      {
        lista: [
          "**Color:** la tonalidad influye directamente en el valor.",
          "**Pureza:** menos inclusiones significa más calidad.",
          "**Talla:** una buena talla multiplica el brillo.",
          "**Peso en quilates:** a más peso, más valor potencial.",
        ],
      },
      { h: "Transparencia en la tasación" },
      { p: "En nuestra joyería de Alicante tasamos y vendemos piedras con total transparencia." },
      { h: "Acompañamiento personalizado" },
      {
        p: "Asesoramos a nuestros clientes para que entiendan el verdadero valor de sus gemas. Elegancia y honestidad nos definen.",
      },
    ],
  },
  {
    slug: "guia-reconocer-oro-autentico",
    titulo: "Guía rápida para saber si una joya es de oro auténtico",
    fecha: "2025-03-17",
    categoria: "Guía",
    imagen: "lingotes",
    alt: "Lingotes y monedas de oro de inversión",
    extracto:
      "¿Dudas si tu joya es de oro de verdad? Aprende a identificar el oro auténtico con trucos sencillos y ven a nuestra joyería en Alicante para una valoración sin compromiso.",
    cuerpo: [
      { h: "Indicadores básicos para reconocer el oro" },
      {
        lista: [
          "**Contraste grabado:** símbolos como «750» (18 k) o «585» (14 k) indican la pureza.",
          "**Color y peso:** el oro tiene un tono cálido característico y es más denso que otros metales.",
          "**No es magnético:** si se pega a un imán, probablemente no sea oro.",
          "**Prueba ácida:** solo recomendable con el equipo adecuado.",
        ],
      },
      { h: "Consulta con profesionales" },
      { p: "En LB Metales y Gemas hacemos tasaciones fiables, con tecnología precisa y personal experto." },
      { h: "Visítanos sin compromiso" },
      { p: "Si tienes dudas sobre una joya, ven a vernos en Alicante. Te diremos si es auténtica, sin compromiso." },
    ],
  },
  {
    slug: "vender-joyas",
    titulo: "¿Por qué vender tu oro en una joyería profesional es la mejor decisión?",
    fecha: "2025-03-17",
    categoria: "Vender oro",
    imagen: "serv-compra",
    alt: "Cadenas gruesas de oro en primer plano",
    extracto:
      "Vender oro puede ser seguro, transparente y justo. Te explicamos por qué hacerlo en una joyería profesional como la nuestra es la opción más inteligente.",
    cuerpo: [
      { h: "Transparencia y confianza" },
      {
        p: "El oro es uno de los metales más valorados del mundo. Ya sea por necesidad, por renovar tus joyas o por inversión, vender oro debe ser una experiencia transparente, segura y justa.",
      },
      { h: "Evaluación precisa y profesional" },
      {
        p: "Contamos con personal formado y herramientas de análisis que garantizan una tasación precisa. Evaluamos la pureza, el peso y la cotización actual en tiempo real.",
      },
      { h: "Evita riesgos innecesarios" },
      {
        p: "Vender en una joyería profesional evita precios bajos, fraudes o falta de garantías. Te asesoramos paso a paso, con discreción y honestidad.",
      },
      { h: "Elegida por clientes de dentro y fuera de Alicante" },
      {
        p: "Ven y descubre por qué tantos clientes de Alicante y de fuera nos eligen para vender sus joyas y metales preciosos.",
      },
    ],
  },
  {
    slug: "como-se-disena-una-joya",
    titulo: "Cómo se diseña una joya desde cero: el arte detrás de cada pieza",
    fecha: "2025-03-17",
    categoria: "Taller",
    imagen: "serv-creacion",
    alt: "Manos de joyera engastando una piedra en un anillo de oro",
    extracto:
      "Descubre el proceso artesanal y personalizado que convierte tus ideas en joyas únicas. En nuestra joyería de Alicante diseñamos con alma y con más de 15 años de experiencia.",
    cuerpo: [
      { h: "Todo empieza con una conversación" },
      {
        p: "Cada joya cuenta una historia, un momento, una emoción. En nuestra joyería de Alicante, crear una joya personalizada es un proceso artesanal que empieza hablando: queremos entender tus deseos, tu estilo y tus sueños. Diseñar desde cero es crear una pieza con alma.",
      },
      { h: "Etapas del diseño" },
      {
        p: "A partir de tus ideas hacemos bocetos a mano o en diseño digital para visualizar el resultado. Elegimos con cuidado los metales y las piedras, buscando siempre la armonía entre elegancia y significado.",
      },
      { h: "Producción artesanal" },
      {
        p: "Cada fase la ejecutan joyeros expertos: modelado, fundición, engaste y pulido, hasta lograr una pieza única, exclusiva y eterna.",
      },
      { h: "Compromiso con la excelencia" },
      {
        p: "Crear joyas es un arte que cultivamos desde hace más de 15 años. En LB Metales y Gemas, cada creación refleja nuestro compromiso con la excelencia y la autenticidad.",
      },
    ],
  },
];

export const articuloPorSlug = (slug) => ARTICULOS.find((a) => a.slug === slug);

const FECHA = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" });
export const fechaLarga = (iso) => FECHA.format(new Date(`${iso}T12:00:00`));

/* Minutos de lectura a 220 palabras por minuto, como mínimo uno. */
export function minutosLectura(articulo) {
  const texto = articulo.cuerpo.map((b) => b.h ?? b.p ?? b.lista?.join(" ") ?? "").join(" ");
  return Math.max(1, Math.round(texto.split(/\s+/).length / 220));
}
