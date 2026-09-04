/**
 * COPY DE MARCA
 *
 * Todo lo que hay acá sale del material entregado por el cliente:
 *   · docs/01-manual-identidad-plenor.md (Manual Plenor.pdf, 70 pp.)
 *   · docs/03-aonami-plano-comercial.md  (Aonami AMENIDADES.pdf)
 *
 * Los textos marcados como `verbatim` son citas literales del manual y no
 * deberían reescribirse sin consultar. El resto es redacción propia que sigue
 * el tono verbal definido en el manual (p. 9): "profesional, claro y humano…
 * como un arquitecto urbanista que explica con precisión, sin adornos".
 *
 * NO HAY PRECIOS en ninguna parte del material entregado, por eso no hay
 * ninguno acá. Las únicas cifras comerciales documentadas son las de
 * financiamiento (manual pp. 47–48), que viven en src/config/site.ts.
 */

export const claims = {
  /** Manual pp. 49, 50, 51, 57 — el claim principal de la campaña Aonami. */
  main: "Donde el verano se convierte en forma de vida",
  /** Manual p. 49. */
  mainSupport:
    "Una nueva manera de habitar la costa, con calma, diseño y autenticidad.",
  /** Manual pp. 61–62. */
  secondary: "Tu espacio, el verano",
  /** Manual p. 21. */
  corporate: "Construyamos bienestar",
} as const;

/** Manual pp. 47–48 — los cuatro argumentos de venta de Aonami. */
export const sellingPoints = [
  {
    title: "Todo a tu alcance",
    body: "A dos minutos del pueblo y a dos minutos de la playa, sobre pista asfaltada. Sin trocha, sin desvíos.",
  },
  {
    title: "Vida tranquila, sin ruido",
    body: "Un condominio cerrado de 203 lotes con un solo acceso, vías internas adoquinadas y áreas comunes en el centro.",
  },
  {
    title: "Entornos seguros",
    body: "Cerco perimétrico completo, pórtico de ingreso con control y iluminación en todo el trazado.",
  },
  {
    title: "Terrenos con visión urbana",
    body: "Habilitación urbana con servicios, no un lote suelto en el desierto. La planificación viene primero.",
  },
] as const;

/** Manual p. 4. */
export const purpose =
  "Planificamos, diseñamos y construimos con transparencia proyectos urbanos sostenibles que generan confianza y hacen que la ciudad funcione.";

/** Manual p. 5. */
export const vision =
  "Ser el referente en desarrollo urbano sostenible y transparente, consolidando un modelo que combine progreso, sostenibilidad y confianza en cada ciudad que construimos.";

/** Manual p. 3 — mensaje clave, citado literal. */
export const keyMessage = [
  "Plenor es más que un desarrollador urbano; es una forma de construir confianza.",
  "Nace en el sur del Perú con la convicción de que el progreso debe ser visible, medible y humano. Cada proyecto que inicia deja huellas reales: servicios instalados, espacios vivos y comunidades sostenibles.",
  "Porque para Plenor, una ciudad no se promete, se construye con transparencia, con técnica y con propósito.",
] as const;

/** Manual p. 7. */
export const values = [
  { name: "Confianza", body: "La palabra se respalda con hechos." },
  { name: "Cumplimiento", body: "Prometer menos, mostrar más." },
  {
    name: "Innovación",
    body: "Resolver con creatividad y eficiencia las necesidades urbanas reales.",
  },
  {
    name: "Responsabilidad social",
    body: "Cada proyecto aporta algo concreto a la ciudad y sus comunidades.",
  },
] as const;

/** Manual p. 6 — las tres unidades de negocio, con la firma de la p. 65. */
export const businessUnits = [
  {
    name: "Arquitectura",
    signature: "Diseñamos espacios que inspiran.",
    body: "Diseña espacios funcionales y humanos que combinan técnica, estética y visión urbana.",
  },
  {
    name: "Inmobiliaria",
    signature: "Creamos valor en cada propiedad.",
    body: "Gestión y desarrollo de proyectos habitacionales y comerciales.",
  },
  {
    name: "Construcción",
    signature: "Construimos con calidad y confianza.",
    body: "Ejecuta obras urbanas e infraestructura con precisión, eficiencia y compromiso sostenible.",
  },
] as const;

/** Manual p. 14. */
export const keywords = [
  "Certeza",
  "Vida",
  "Materia",
  "Comunidad",
  "Progreso",
  "Transparencia",
  "Futuro",
  "Sostenibilidad",
] as const;

/**
 * Preguntas frecuentes.
 * Solo se responde lo que consta en el material entregado. Donde no hay dato
 * documentado, la respuesta remite al equipo de ventas en vez de inventar.
 */
export const faqs = [
  {
    q: "¿Dónde queda exactamente Residencial Aonami?",
    a: "En Punta de Bombón, provincia de Islay, Arequipa. El ingreso es por la pista asfaltada Francisco Olazabal: quedas a dos minutos del pueblo y a dos minutos de la playa.",
  },
  {
    q: "¿Cuántos lotes tiene el proyecto y de qué tamaño?",
    a: "203 lotes distribuidos en siete sectores (A a G). Van desde 90 m² hasta 270 m², con un promedio de 116 m². El grueso de la oferta está entre 90 y 125 m².",
  },
  {
    q: "¿Qué incluye la compra además del terreno?",
    a: "El proyecto contempla 10 amenidades: piscina, club house, zona de fogatas, zona de parrillas, pórtico de ingreso, canchas de frontón, juegos para niños, cancha multiusos, vías adoquinadas y cerco perimétrico. Además hay 129 plazas de estacionamiento de 15 m² cada una.",
  },
  {
    q: "¿Cómo es el financiamiento?",
    a: "Financiamiento directo con Plenor: 20 % de inicial y 48 cuotas sin intereses. Las condiciones específicas de cada lote las confirma el equipo de ventas.",
  },
  {
    q: "¿Cuánto cuesta un lote?",
    a: "Los precios se cotizan por lote, según sector, área y ubicación dentro del condominio. Escríbenos y te enviamos la lista vigente con disponibilidad.",
  },
  {
    q: "¿Puedo saber qué lotes siguen disponibles?",
    a: "Sí. La disponibilidad cambia constantemente, así que no la publicamos en la web: consúltala con el equipo de ventas indicando el sector o el rango de metraje que te interesa.",
  },
  {
    q: "¿Las áreas publicadas son definitivas?",
    a: "Las áreas y perímetros que ves en esta web son referenciales, tomados del plano comercial del proyecto. Las medidas definitivas son las que consten en el plano de habilitación urbana y en la minuta de compraventa.",
  },
  {
    q: "¿Quién desarrolla el proyecto?",
    a: "Plenor, desarrollador urbano con sede en Arequipa que integra arquitectura, inmobiliaria y construcción en un mismo equipo.",
  },
] as const;

/**
 * Criterios de dirección de arte del manual (p. 36).
 * Se dejan acá porque son el brief para cualquier imagen nueva que se sume.
 */
export const artDirection = [
  "Fotografía basada en el territorio",
  "Luz natural, cálida y suave",
  "Composición limpia y minimalista",
  "Personas integradas, no protagonistas",
  "Paleta cromática Plenor",
  "Arquitectura honesta",
  "Sensación editorial, no publicitaria",
  "Movimiento sutil",
] as const;
