import Image from "next/image";

export const metadata = {
  title: { absolute: "Soluciones digitales para empresas | Compás Evolution" },
  description: "Soluciones para organizar clientes y ventas, crear academias, cursos, libros y plataformas, e integrar inteligencia artificial en procesos reales.",
  alternates: { canonical: "/soluciones" },
  openGraph: {
    title: "Soluciones digitales para empresas | Compás Evolution",
    description: "Organiza clientes y ventas, crea academias, cursos, libros y plataformas, e integra inteligencia artificial con una ruta clara.",
    url: "https://www.proyectocompas.com/soluciones",
    siteName: "Compás Evolution",
    images: [{ url: "/og.png", alt: "Soluciones Compás Evolution" }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soluciones digitales para empresas | Compás Evolution",
    description: "Organiza clientes y ventas, crea academias, cursos, libros y plataformas, e integra inteligencia artificial con una ruta clara.",
    images: ["/og.png"],
  },
};

const solutions = [
  { title: "Organizar clientes, ventas y seguimiento", text: "Centraliza CRM, conversaciones, agenda, procesos y automatizaciones con Compás One.", href: "/compas-one", label: "Ver Compás One" },
  { title: "Crear una academia digital", text: "Organiza cursos, rutas de aprendizaje, recursos, accesos y seguimiento en una experiencia académica propia.", href: "/compas-academy", label: "Ver Compás Academy" },
  { title: "Convertir experiencia en un curso", text: "Define objetivos, módulos, materiales, actividades, evaluaciones y una ruta de publicación aplicable.", href: "/compas-academy", label: "Explorar formación" },
  { title: "Escribir y publicar un libro", text: "Trabaja estructura, dirección editorial, diseño, maquetación y preparación para publicación.", href: "/compas-creators", label: "Ver Compás Creators" },
  { title: "Crear una página o producto digital", text: "Convierte una idea en una presencia digital conectada a captación, contenido, operación y seguimiento.", href: "/compas-creators", label: "Explorar creación" },
  { title: "Integrar agentes de inteligencia artificial", text: "Automatiza ventas, soporte y seguimiento alrededor de casos de uso definidos y conocimiento autorizado.", href: "/compas-ia", label: "Ver Compás IA" },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Soluciones de Compás Evolution",
  itemListElement: [
    { "@type": "ListItem", position: 1, url: "https://www.proyectocompas.com/compas-one", name: "Compás One" },
    { "@type": "ListItem", position: 2, url: "https://www.proyectocompas.com/compas-academy", name: "Compás Academy" },
    { "@type": "ListItem", position: 3, url: "https://www.proyectocompas.com/compas-creators", name: "Compás Creators" },
    { "@type": "ListItem", position: 4, url: "https://www.proyectocompas.com/compas-ia", name: "Compás IA" },
  ],
};

export default function Page() {
  return (
    <main className="productPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <header className="simpleHeader">
        <div className="shell simpleHeaderInner">
          <a href="/" aria-label="Volver a Compás Evolution"><Image src="/brand/compas-evolution-horizontal.svg" alt="Compás Evolution" width={250} height={64} /></a>
          <nav aria-label="Navegación principal"><a href="/">Inicio</a><a href="/casos-de-exito">Casos</a><a href="/nosotros">Nosotros</a></nav>
        </div>
      </header>

      <section className="productHero">
        <div className="shell productHeroGrid">
          <div>
            <p className="eyebrow"><span /> Soluciones Evolution</p>
            <h1>Soluciones para organizar, crear, capacitar y automatizar tu negocio</h1>
            <p>No empieces por una herramienta. Empieza por la necesidad que quieres resolver y conecta nuevas capacidades cuando tu proyecto las requiera.</p>
            <div className="productActions"><a className="primary" href="#agente-ventas" data-compas-agent="sales">Encontrar mi ruta</a><a className="secondary" href="/casos-de-exito">Ver casos reales</a></div>
          </div>
          <Image className="productHeroLogo" src="/brand/compas-evolution-halcon.svg" alt="Compás Evolution" width={700} height={700} priority />
        </div>
      </section>

      <section className="productBody"><div className="shell">
        <div className="productBodyGrid">
          {solutions.map((solution) => <article className="productPanel" key={solution.title}><h2>{solution.title}</h2><p>{solution.text}</p><p><a href={solution.href}>{solution.label} →</a></p></article>)}
        </div>
        <div className="productCta"><div><h2>¿Todavía no sabes qué necesitas?</h2><p>El diagnóstico existe para convertir una idea dispersa en una ruta concreta y proporcional a tu etapa.</p></div><a href="#agente-ventas" data-compas-agent="sales">Iniciar diagnóstico</a></div>
      </div></section>
    </main>
  );
}
