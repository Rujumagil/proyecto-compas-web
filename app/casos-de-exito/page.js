import Image from "next/image";

export const metadata = {
  title: { absolute: "Casos de éxito en proyectos digitales | Compás Evolution" },
  description: "Casos reales de academias digitales, producción editorial, libros virtuales y programas formativos construidos por Compás Evolution.",
  alternates: { canonical: "/casos-de-exito" },
  openGraph: {
    title: "Casos de éxito en proyectos digitales | Compás Evolution",
    description: "Proyectos reales de academias digitales, producción editorial, libros virtuales y programas formativos llevados a operación.",
    url: "https://www.proyectocompas.com/casos-de-exito",
    siteName: "Compás Evolution",
    images: [{ url: "/og.png", alt: "Casos de éxito Compás Evolution" }],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casos de éxito en proyectos digitales | Compás Evolution",
    description: "Proyectos reales de academias digitales, producción editorial, libros virtuales y programas formativos llevados a operación.",
    images: ["/og.png"],
  },
};

const cases = [
  {
    title: "Academia ETERNI e IXCHEL",
    type: "Academia digital · Comunidad",
    challenge: "Centralizar formación, accesos y recursos en una experiencia digital coherente con la marca.",
    built: "Registro y altas, inicio de sesión y recuperación, paneles de alumno y administración, biblioteca y espacio semanal de comunidad IXCHEL.",
    result: "La academia quedó preparada para administrar accesos y recibir estudiantes con infraestructura de datos y despliegue web.",
  },
  {
    title: "La Mujer del Faro",
    type: "Producción editorial",
    challenge: "Ordenar la obra, conservar el tono de la autora y preparar un sistema editorial consistente.",
    built: "Estructura editorial, formato 6 × 9 para impresión, criterios de portada y lomo, maquetación y archivos de publicación.",
    result: "La obra cuenta con estructura, diseño y archivos preparados para su flujo de publicación e integración digital.",
  },
  {
    title: "Cuentos para Sanar",
    type: "Libro virtual · HTML",
    challenge: "Ofrecer una experiencia de lectura digital más cuidada que un archivo descargable.",
    built: "Libro virtual autocontenido, experiencia visual, navegación de lectura, integración a biblioteca y material complementario.",
    result: "El contenido quedó convertido en un producto digital reutilizable dentro de biblioteca, campañas y formación.",
  },
  {
    title: "Utah Driver Success Program",
    type: "Curso · Evaluaciones",
    challenge: "Convertir temas técnicos y reglas de conducción en una secuencia clara para el alumno.",
    built: "Estructura de clases, evaluaciones por lección, retroalimentación, guía de ingreso y mensajes de soporte y onboarding.",
    result: "El programa quedó estructurado como ruta formativa con mecanismos de evaluación y soporte para facilitar el avance del alumno.",
  },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Casos de éxito de Compás Evolution",
  url: "https://www.proyectocompas.com/casos-de-exito",
  description: "Proyectos digitales reales desarrollados por Compás Evolution.",
  hasPart: cases.map((item) => ({ "@type": "CreativeWork", name: item.title, description: item.result })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Compás Evolution", item: "https://www.proyectocompas.com/" },
    { "@type": "ListItem", position: 2, name: "Casos de éxito", item: "https://www.proyectocompas.com/casos-de-exito" },
  ],
};

export default function Page() {
  return (
    <main className="productPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <header className="simpleHeader"><div className="shell simpleHeaderInner">
        <a href="/" aria-label="Volver a Compás Evolution"><Image src="/brand/compas-evolution-horizontal.svg" alt="Compás Evolution" width={250} height={64} /></a>
        <nav aria-label="Navegación principal"><a href="/">Inicio</a><a href="/soluciones">Soluciones</a><a href="/nosotros">Nosotros</a></nav>
      </div></header>

      <section className="productHero"><div className="shell productHeroGrid">
        <div><p className="eyebrow"><span /> Proyectos reales</p><h1>Casos de éxito: academias, libros y formación digital llevados a operación</h1><p>Mostramos problemas, sistemas construidos y resultados que podemos respaldar. Las métricas comerciales sólo se publican cuando están verificadas.</p><div className="productActions"><a className="primary" href="#casos">Ver proyectos</a><a className="secondary" href="/soluciones">Explorar soluciones</a></div></div>
        <Image className="productHeroLogo" src="/brand/compas-evolution-halcon.svg" alt="Compás Evolution" width={700} height={700} priority />
      </div></section>

      <section className="productBody" id="casos"><div className="shell">
        <div className="productBodyGrid">{cases.map((item) => <article className="productPanel" key={item.title}><p className="eyebrow dark"><span /> {item.type}</p><h2>{item.title}</h2><h3>El reto</h3><p>{item.challenge}</p><h3>Qué construimos</h3><p>{item.built}</p><h3>Resultado verificable</h3><p>{item.result}</p></article>)}</div>
        <div className="productCta"><div><h2>Tu proyecto puede ser el siguiente.</h2><p>Empezamos por entender la necesidad y definir una ruta que podamos construir y medir.</p></div><a href="#agente-ventas" data-compas-agent="sales">Iniciar diagnóstico</a></div>
      </div></section>
    </main>
  );
}
