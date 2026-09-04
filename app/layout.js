import "./globals.css";
import "./logo-official.css";

const homeTitle = "Compás Evolution | CRM, IA, academias y desarrollo digital";
const homeDescription =
  "Soluciones digitales para empresas: CRM, agentes de IA, academias digitales, páginas web, cursos y productos digitales conectados en un ecosistema con dirección.";

export const metadata = {
  metadataBase: new URL("https://www.proyectocompas.com"),
  title: {
    default: homeTitle,
    template: "%s | Compás Evolution",
  },
  description: homeDescription,
  applicationName: "Compás Evolution",
  category: "business",
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  robots: { index: true, follow: true },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "https://www.proyectocompas.com/",
    siteName: "Compás Evolution",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Compás Evolution" }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
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
  description: homeDescription,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <head>
        <link rel="stylesheet" href="/brand-system-v3.css" />
        <link rel="stylesheet" href="/growth-v1.css" />
        <link rel="stylesheet" href="/growth-fix.css" />
        <link rel="stylesheet" href="/diagnostic-v1.css" />
        <script src="/google-tracking-config.js" />
        <script src="/google-tracking.js" defer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body>
        {children}
        <script
          src="https://app.proyectocompas.com/compas-attribution.js"
          data-key="wc_775408ca243abfea3d5ec95025e3c2d9bdbb"
          data-product="proyecto-compas"
          defer
        />
        <script src="/agent-loader.js?v=1" defer />
      </body>
    </html>
  );
}
