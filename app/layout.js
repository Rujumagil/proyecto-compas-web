import "./globals.css";
import "./logo-official.css";

export const metadata = {
  metadataBase: new URL("https://www.proyectocompas.com"),
  title: {
    default: "Compás Evolution | Tecnología, IA y crecimiento para empresas",
    template: "%s | Compás Evolution",
  },
  description:
    "Ecosistema de soluciones para organizar clientes y ventas, crear academias y productos digitales e integrar agentes de inteligencia artificial con dirección.",
  applicationName: "Compás Evolution",
  category: "business",
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Compás Evolution | Tecnología, IA y crecimiento para empresas",
    description:
      "Organiza clientes y ventas, crea academias y productos digitales e integra inteligencia artificial dentro de un ecosistema con dirección.",
    url: "https://www.proyectocompas.com/",
    siteName: "Compás Evolution",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Compás Evolution" }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compás Evolution | Tecnología, IA y crecimiento para empresas",
    description:
      "Organiza clientes y ventas, crea academias y productos digitales e integra inteligencia artificial con dirección.",
    images: ["/og.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Compás Evolution",
  alternateName: "Proyecto Compás",
  url: "https://www.proyectocompas.com/",
  logo: "https://www.proyectocompas.com/brand/compas-evolution-official.png",
  email: "proyectocompas.info@gmail.com",
  sameAs: [
    "https://www.instagram.com/proyecto_compas/",
    "https://www.facebook.com/ProyectoCompasmx",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Compás Evolution",
  url: "https://www.proyectocompas.com/",
  inLanguage: "es-MX",
  description:
    "Ecosistema de soluciones para organizar clientes y ventas, crear academias y productos digitales e integrar inteligencia artificial con dirección.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <head>
        <link rel="stylesheet" href="/brand-system-v3.css" />
        <link rel="stylesheet" href="/growth-v1.css" />
        <link rel="stylesheet" href="/growth-fix.css" />
        <link rel="stylesheet" href="/diagnostic-v1.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body>
        {children}
        <script src="/agent-loader.js?v=1" defer />
      </body>
    </html>
  );
}
