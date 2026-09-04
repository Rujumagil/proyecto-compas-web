import Image from "next/image";

export default function ProductPage({ product }) {
  const pageUrl = `https://www.proyectocompas.com/${product.slug}`;
  const provider = {
    "@type": "Organization",
    name: "Compás Evolution",
    url: "https://www.proyectocompas.com/",
  };

  const schema = product.schemaType === "SoftwareApplication"
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: product.title,
        url: pageUrl,
        description: product.seoDescription || product.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        featureList: product.includes,
        provider,
      }
    : {
        "@context": "https://schema.org",
        "@type": "Service",
        name: product.title,
        serviceType: product.kicker,
        url: pageUrl,
        description: product.seoDescription || product.description,
        provider,
      };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Compás Evolution",
        item: "https://www.proyectocompas.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.title,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = product.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: product.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <main className="productPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
      <header className="simpleHeader">
        <div className="shell simpleHeaderInner">
          <a href="/" aria-label="Volver a Compás Evolution">
            <Image src="/brand/compas-evolution-horizontal.svg" alt="Compás Evolution" width={250} height={64} />
          </a>
          <nav aria-label="Navegación principal">
            <a href="/">Inicio</a>
            <a href="/soluciones">Soluciones</a>
            <a href="/casos-de-exito">Casos</a>
            <a href="/nosotros">Nosotros</a>
          </nav>
        </div>
      </header>

      <section className="productHero">
        <div className="shell productHeroGrid">
          <div>
            <p className="eyebrow"><span /> {product.kicker}</p>
            <h1>{product.seoH1 || product.title}</h1>
            <p>{product.description}</p>
            <div className="productActions">
              <a className="primary" href="#agente-ventas" data-compas-agent="sales" data-compas-product={product.slug}>{product.primaryCtaLabel || "Hablar con ventas"}</a>
              {product.directUrl ? <a className="secondary" href={product.directUrl} target="_blank" rel="noreferrer">{product.directLabel}</a> : null}
            </div>
          </div>
          <Image className="productHeroLogo" src={product.logo} alt={product.title} width={700} height={700} priority />
        </div>
      </section>

      <section className="productBody">
        <div className="shell">
          <div className="productBodyGrid">
            <article className="productPanel">
              <h2>Para quién es</h2>
              <p>{product.audience}</p>
            </article>
            <article className="productPanel">
              <h2>Qué resuelve</h2>
              <ul>{product.solves.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className="productPanel">
              <h2>Qué incluye</h2>
              <ul>{product.includes.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className="productPanel">
              <h2>Cómo empezamos</h2>
              <ol>{product.steps.map((item) => <li key={item}>{item}</li>)}</ol>
            </article>
          </div>

          {product.valueHeading || product.useCases?.length ? (
            <div className="productBodyGrid">
              {product.valueHeading ? (
                <article className="productPanel">
                  <h2>{product.valueHeading}</h2>
                  <p>{product.valueText}</p>
                </article>
              ) : null}
              {product.useCases?.length ? (
                <article className="productPanel">
                  <h2>{product.useCasesHeading || "Casos de uso"}</h2>
                  <ul>{product.useCases.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ) : null}
            </div>
          ) : null}

          {product.faqs?.length ? (
            <div>
              <div className="productCta">
                <div>
                  <h2>Preguntas frecuentes sobre {product.shortName}</h2>
                  <p>Respuestas claras antes de decidir si esta solución encaja con tu operación.</p>
                </div>
              </div>
              <div className="productBodyGrid">
                {product.faqs.map((faq) => (
                  <article className="productPanel" key={faq.question}>
                    <h2>{faq.question}</h2>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <div className="productCta">
            <div>
              <h2>Empieza por una conversación con contexto.</h2>
              <p>El agente sabrá qué solución estás revisando y podrá orientarte desde ese punto.</p>
            </div>
            <a href="#agente-ventas" data-compas-agent="sales" data-compas-product={product.slug}>Quiero avanzar con {product.shortName}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
