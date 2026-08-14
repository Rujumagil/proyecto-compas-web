import "./globals.css";
import "./logo-official.css";

export const metadata = {
  metadataBase: new URL("https://www.proyectocompas.com"),
  title: "Proyecto Compás | Decide con claridad. Avanza con dirección.",
  description:
    "Estrategia, aprendizaje y tecnología para organizar tu negocio, desarrollar tus capacidades y convertir tus ideas en resultados.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Proyecto Compás | Un ecosistema para avanzar",
    description:
      "Encuentra la ruta, las herramientas y el aprendizaje que necesitas para tomar mejores decisiones.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Proyecto Compás" }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyecto Compás | Un ecosistema para avanzar",
    description: "Decide con claridad. Avanza con dirección.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return <html lang="es"><body>{children}</body></html>;
}
