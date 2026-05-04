// Fuente única de datos para la landing.
// Editar este archivo no requiere tocar componentes.

export const site = {
  name: "Trivux",
  tagline: "No vayas solo. Encuentra a alguien que va al mismo evento.",
  domain: "trivux.cl",
  email: "trivux.app@gmail.com",

  // URL del release fijo por tag (el flag de "Pre-release" hace que /latest/ no resuelva).
  // Cuando se quite el prerelease flag, se puede volver a:
  //   https://github.com/Astorgato/trivux-landing/releases/latest/download/trivux-mvp.apk
  apkUrl: "https://github.com/Astorgato/trivux-landing/releases/download/v0.1.1-mvp/trivux-1.0.1.apk",
  apkVersion: "MVP · v0.1.1 Preview",

  github: "https://github.com/Astorgato/trivux-landing",
};

// Métricas reales consultadas a la base de datos de producción (Supabase).
// Snapshot: 2026-04-30
export const metrics = {
  eventos: {
    label: "Eventos en catálogo",
    value: "1.129",
    detail: "960 con fecha futura",
  },
  categorias: {
    label: "Categorías cubiertas",
    value: "18",
    detail: "Música, teatro, social, fiesta, humor, deporte y más",
  },
  subcategorias: {
    label: "Subcategorías y géneros",
    value: "67",
    detail: "Rock, Techno, Pop, Reggaeton, Clásica, Indie, Jazz…",
  },
  fuentes: {
    label: "Fuentes integradas",
    value: "5",
    detail: "TicketPlus, Passline, PuntoTicket, Eventbrite y más",
  },
};

export const fuentesList = [
  { name: "TicketPlus", events: 465 },
  { name: "Passline", events: 399 },
  { name: "PuntoTicket", events: 228 },
  { name: "Eventbrite", events: 37 },
];

export const categoriasList = [
  { emoji: "🎵", name: "Música", count: 475 },
  { emoji: "🎭", name: "Teatro", count: 131 },
  { emoji: "🍻", name: "Social", count: 112 },
  { emoji: "🎉", name: "Fiesta", count: 103 },
  { emoji: "😂", name: "Humor", count: 67 },
  { emoji: "⚽", name: "Deportes", count: 47 },
  { emoji: "🎬", name: "Cine", count: 43 },
  { emoji: "🎨", name: "Cultura", count: 34 },
];

// Géneros musicales más representativos (top subcategorías de música)
export const generosTop = [
  "Rock", "Techno", "Pop", "Rave", "Clásica",
  "Reggaeton", "Indie Pop", "Sinfónica", "Heavy Metal", "Jazz",
  "R&B", "Folk", "Indie Rock", "Cámara", "Hip-Hop",
  "Ballet", "Flamenco", "Electrónica", "Folklore Chileno", "Salsa",
  "Trap", "K-Pop", "House", "Cumbia", "Bolero",
];

// Pilares de producto que se muestran en la sección "Cómo funciona"
export const features = [
  {
    icon: "/assets/icons/eventos.png",
    title: "Eventos reales de Santiago",
    body: "Más de mil eventos vigentes consolidados desde TicketPlus, Passline, PuntoTicket y Eventbrite. Música, teatro, fiesta, deporte, gastronomía y más.",
  },
  {
    icon: "/assets/icons/swipe.png",
    title: "Match por afinidad",
    body: "Filtramos personas por música, intereses, edad y zona. El score de compatibilidad pondera Jaccard sobre gustos musicales (25%), intereses (30%), edad (25%) y zona (20%).",
  },
  {
    icon: "/assets/icons/chats.png",
    title: "Chat 1-a-1 y grupos",
    body: "Cuando hay match se abre el chat por WebSocket: typing en vivo, push notifications nativas, grupos con roles (owner / admin / member) y reportes con dedupe.",
  },
  {
    icon: "/assets/icons/grupo.png",
    title: "Encuentro coordinado",
    body: "Los grupos guardan banner, fecha y dirección de encuentro con link directo a Maps. Para que llegar al evento sea tan simple como abrir una conversación.",
  },
  {
    icon: "/assets/icons/likeparty.png",
    title: "Lentes inteligentes",
    body: "8 carruseles que reordenan el feed según afinidad: 'Cerca de ti', 'Por tu música', 'Tendencias', 'Esta semana', 'Gratis hoy', y más.",
  },
  {
    icon: "/assets/icons/heart.png",
    title: "Verificación y seguridad",
    body: "OTP por email en cada login, bloqueos bidireccionales, reportes de miembros en grupos y push notifications con auto-cleanup de tokens muertos.",
  },
];

export const team = [
  {
    name: "Cristián Astorga",
    role: "Co-fundador · Producto y backend",
    bio: "Ingeniero Matemático especializado en transformación digital. Lidera la arquitectura técnica, el backend (FastAPI + Postgres) y la lógica de matching y scoring.",
    avatar: "/assets/team/cristian.png",
    avatarFallback: "CA",
  },
  {
    name: "Anahí González",
    role: "Co-fundadora · Diseño y comunicaciones",
    bio: "Periodista y diseñadora UX/UI. Lidera la experiencia de producto, la voz de marca y la conversación con la comunidad de usuarios.",
    avatar: "/assets/team/anahi.png",
    avatarFallback: "AG",
  },
];
