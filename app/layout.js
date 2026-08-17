import Script from "next/script";
import "./globals.css";
import "./logo-official.css";

export const metadata = {
  metadataBase: new URL("https://www.proyectocompas.com"),
  title: {
    default: "Compás Evolution | Decide con claridad. Avanza con dirección.",
    template: "%s | Compás Evolution",
  },
  description:
    "Ecosistema que conecta Compás One, Compás Academy, Compás Creators y Compás IA para operar, aprender, crear y avanzar con dirección.",
  applicationName: "Compás Evolution",
  category: "business",
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Compás Evolution | Un ecosistema para avanzar",
    description:
      "Operación, aprendizaje, creación e inteligencia artificial conectados en un solo ecosistema.",
    url: "https://www.proyectocompas.com/",
    siteName: "Compás Evolution",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Compás Evolution" }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compás Evolution | Un ecosistema para avanzar",
    description: "Decide con claridad. Avanza con dirección.",
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
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Compás Evolution",
  url: "https://www.proyectocompas.com/",
  inLanguage: "es-MX",
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
        <Script
          src="https://app.proyectocompas.com/compas-chat.js"
          strategy="afterInteractive"
          data-key="wc_775408ca243abfea3d5ec95025e3c2d9bdbb"
        />
        <Script src="/agent-context.js?v=1" strategy="lazyOnload" />
        <Script src="/agent-compas.js?v=4" strategy="lazyOnload" />
      </body>
    </html>
  );
}
