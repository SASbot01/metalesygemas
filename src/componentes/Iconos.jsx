/* Iconos en línea fina, a juego con la tipografía. Heredan el color del texto. */

const Base = ({ children, className = "h-5 w-5", grosor = 1.5, ...resto }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={grosor}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...resto}
  >
    {children}
  </svg>
);

export const IconoFlecha = (p) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const IconoFlechaArriba = (p) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);

export const IconoTelefono = (p) => (
  <Base {...p}>
    <path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  </Base>
);

export const IconoWhatsApp = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.83 9.83 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.17-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);

export const IconoUbicacion = (p) => (
  <Base {...p}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Base>
);

export const IconoReloj = (p) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);

export const IconoCorreo = (p) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Base>
);

export const IconoInstagram = (p) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </Base>
);

export const IconoTikTok = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M16.6 3c.3 2.3 1.7 3.8 4 4v2.7a7 7 0 0 1-4-1.3v6.1a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1V11.5a3.2 3.2 0 1 0 2.3 3.1V3h2.7Z" />
  </svg>
);

export const IconoEstrella = ({ className = "h-4 w-4", relleno = 1 }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <defs>
      <linearGradient id={`estrella-${relleno}`}>
        <stop offset={`${relleno * 100}%`} stopColor="currentColor" />
        <stop offset={`${relleno * 100}%`} stopColor="currentColor" stopOpacity="0.22" />
      </linearGradient>
    </defs>
    <path
      fill={`url(#estrella-${relleno})`}
      d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8L12 2.8Z"
    />
  </svg>
);

export const IconoPlay = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M7 4.5v15l13-7.5-13-7.5Z" />
  </svg>
);

export const IconoMenu = (p) => (
  <Base {...p}>
    <path d="M4 8h16M4 16h10" />
  </Base>
);

export const IconoCerrar = (p) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const IconoMas = (p) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const IconoMenos = (p) => (
  <Base {...p}>
    <path d="M5 12h14" />
  </Base>
);

export const IconoCheck = (p) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const IconoInfo = (p) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 8h.01" />
  </Base>
);

export const IconoBalanza = (p) => (
  <Base {...p}>
    <path d="M12 4v16M7 20h10M5 7h14M12 4l-1 3M12 4l1 3" />
    <path d="M5 7 2.5 13a3 3 0 0 0 5 0L5 7ZM19 7l-2.5 6a3 3 0 0 0 5 0L19 7Z" />
  </Base>
);

export const IconoLupa = (p) => (
  <Base {...p}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m15 15 5 5" />
  </Base>
);

export const IconoLingote = (p) => (
  <Base {...p}>
    <path d="M6.5 9h11l3 8h-17l3-8Z" />
    <path d="M8 6.5h8M12 3.5v1" />
  </Base>
);

export const IconoMoneda = (p) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="5.5" />
    <path d="M12 9.5v5" />
  </Base>
);

export const IconoBrillante = (p) => (
  <Base {...p}>
    <path d="M6.5 4h11l3.5 5-9 11L3 9l3.5-5Z" />
    <path d="M3 9h18M9 4l3 16M15 4l-3 16M9 4 7 9M15 4l2 5" />
  </Base>
);

export const IconoPlata = (p) => (
  <Base {...p}>
    <path d="M8 3c0 3 1 4 1 6v12M8 3c-1 0-2.5 2-2.5 4S7 9 8 9M16 3v6a2 2 0 0 1-2 2M16 3v18M18 3v6a2 2 0 0 1-2 2" />
  </Base>
);

export const IconoAntiguedad = (p) => (
  <Base {...p}>
    <path d="M12 3a4 4 0 0 1 4 4c0 1.5-.8 2.4-1.5 3.2L16 21H8l1.5-10.8C8.8 9.4 8 8.5 8 7a4 4 0 0 1 4-4Z" />
    <path d="M9 15h6" />
  </Base>
);

export const IconoRelojPulsera = (p) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="5" />
    <path d="M9 7.5 9.5 3h5l.5 4.5M9 16.5 9.5 21h5l.5-4.5M12 10v2l1.5 1" />
  </Base>
);

export const IconoIman = (p) => (
  <Base {...p}>
    <path d="M6 4h4v8a2 2 0 0 0 4 0V4h4v8a6 6 0 0 1-12 0V4Z" />
    <path d="M6 8h4M14 8h4" />
  </Base>
);

export const IconoContraste = (p) => (
  <Base {...p}>
    <rect x="3.5" y="7" width="17" height="10" rx="2" />
    <path d="M7.5 10.5h1.5l-1.5 3M11 13.5h1.5a1 1 0 0 0 0-2H11v-1h2.5M16 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
  </Base>
);

export const IconoAcido = (p) => (
  <Base {...p}>
    <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" />
    <path d="M7.5 15h9" />
  </Base>
);

export const IconoPeso = (p) => (
  <Base {...p}>
    <path d="M6.5 8h11l2.5 12H4L6.5 8Z" />
    <circle cx="12" cy="5" r="2" />
  </Base>
);

export const IconoDiamanteLinea = ({ className = "h-3 w-3" }) => (
  <svg viewBox="0 0 12 12" aria-hidden="true" className={className}>
    <path d="M6 0 12 6 6 12 0 6Z" fill="currentColor" />
  </svg>
);

export const ICONOS = {
  lingote: IconoLingote,
  plata: IconoPlata,
  reloj: IconoRelojPulsera,
  brillante: IconoBrillante,
  moneda: IconoMoneda,
  antiguedad: IconoAntiguedad,
  contraste: IconoContraste,
  peso: IconoPeso,
  iman: IconoIman,
  acido: IconoAcido,
};
