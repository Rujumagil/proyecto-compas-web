import "./globals.css";
import "./logo-official.css";

export const metadata = {
  metadataBase: new URL("https://www.proyectocompas.com"),
  applicationName: "Proyecto Compás Evolution",
  title: "Proyecto Compás Evolution | Decide con claridad. Avanza con dirección.",
  description:
    "Un ecosistema de estrategia, creación, aprendizaje, operación e inteligencia artificial para organizar proyectos, desarrollar capacidades y avanzar con dirección.",
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Proyecto Compás Evolution | Un ecosistema para avanzar",
    description:
      "Estrategia, creación, aprendizaje, operación e inteligencia artificial conectadas para ayudarte a decidir y avanzar con dirección.",
    url: "/",
    siteName: "Proyecto Compás Evolution",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Proyecto Compás Evolution",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyecto Compás Evolution | Un ecosistema para avanzar",
    description: "Decide con claridad. Avanza con dirección.",
    images: ["/og.png"],
  },
};

export const viewport = {
  themeColor: "#003366",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
