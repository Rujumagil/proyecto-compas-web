import Image from "next/image";

export const metadata = {
  title: { absolute: "Nosotros | Dirección, tecnología y evolución | Compás Evolution" },
  description: "Conoce la visión de Compás Evolution: conectar dirección, conocimiento y tecnología para construir proyectos claros, operables y capaces de evolucionar.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Nosotros | Dirección, tecnología y evolución | Compás Evolution",
    description: "Dirección, conocimiento y tecnología conectados para construir proyectos claros, operables y capaces de evolucionar.",
    url: "https://www.proyectocompas.com/nosotros",
    siteName: "Compás Evolution",
    images: [{ url: "/og.png", alt: "Compás Evolution" }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Dirección, tecnología y evolución | Compás Evolution",
    description: "Dirección, conocimiento y tecnología conectados para construir proyectos claros, operables y capaces de evolucionar.",
    images: ["/og.png"],
  },
};

const principles = [
  { title: "Claridad", text: "Entender qué se quiere construir, para quién y qué problema debe resolver antes de elegir herramientas." },
  { title: "Estructura", text: "Convertir una idea en procesos, contenidos y sistemas que puedan operar y dar continuidad al proyecto." },
  { title: "Soberanía", text: "Construir soluciones comprensibles y controlables por el proyecto, sin depender de complejidad innecesaria." },
  { title: "Legado", text: "Transformar experiencia y conocimiento en activos, productos y sistemas que puedan permanecer y evolucionar." },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Nosotros | Compás Evolution",
  url: "https://www.proyectocompas.com/nosotros",
  description: "Visión y principios de Compás Evolution.",
  mainEntity: {
    "@type": "Organization",
    name: "Compás Evolution",
    alternateName: "Proyecto Compás",
    url: "https://www.proyectocompas.com/",
  },
};

export default function Page() {
  return (
    <main className="productPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <header className="simpleHeader"><div className="shell simpleHeaderInner">
        <a href="/" aria-label="Volver a Compás Evolution"><Image src="/brand/compas-evolution-horizontal.svg" alt="Compás Evolution" width={250} height={64} /></a>
        <nav aria-label="Navegación principal"><a href="/">Inicio</a><a href="/soluciones">Soluciones</a><a href="/casos-de-exito">Casos</a></nav>
      </div></header>

      <section className="productHero"><div className="shell productHeroGrid">
        <div><p className="eyebrow"><span /> Nuestra visión</p><h1>Compás Evolution: dirección, conocimiento y tecnología para proyectos que evolucionan</h1><p>Conectamos lo que normalmente vive separado: ideas, aprendizaje, creación, operación y tecnología. La herramienta es un medio; el rumbo sigue siendo humano.</p><div className="productActions"><a className="primary" href="/soluciones">Explorar soluciones</a><a className="secondary" href="/casos-de-exito">Ver proyectos reales</a></div></div>
        <Image className="productHeroLogo" src="/brand/compas-evolution-halcon.svg" alt="Halcón de Compás Evolution" width={700} height={700} priority />
      </div></section>

      <section className="productBody"><div className="shell">
        <div className="productCta"><div><h2>Dirección antes que velocidad.</h2><p>La tecnología debe amplificar una intención, no reemplazarla. Construimos sistemas para ayudar a personas, equipos y proyectos a avanzar con mayor claridad.</p></div><a href="#agente-ventas" data-compas-agent="sales">Hablar con Compás</a></div>
        <div className="productBodyGrid">{principles.map((item) => <article className="productPanel" key={item.title}><h2>{item.title}</h2><p>{item.text}</p></article>)}</div>
      </div></section>
    </main>
  );
}
