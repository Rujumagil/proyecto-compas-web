export default function manifest() {
  return {
    name: "Proyecto Compás Evolution",
    short_name: "Proyecto Compás",
    description:
      "Ecosistema de estrategia, creación, aprendizaje, operación e inteligencia artificial para avanzar con dirección.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#003366",
    lang: "es-MX",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32 48x48",
        type: "image/x-icon",
      },
    ],
  };
}
