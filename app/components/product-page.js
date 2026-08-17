import Image from "next/image";

export default function ProductPage({ product }) {
  return (
    <main className="productPage">
      <header className="simpleHeader">
        <div className="shell simpleHeaderInner">
          <a href="/" aria-label="Volver a Proyecto Compás">
            <Image src="/brand/compas-evolution-horizontal.svg" alt="Compás Evolution" width={250} height={64} />
          </a>
          <nav aria-label="Navegación de producto">
            <a href="/">Inicio</a>
            <a href="/#soluciones">Ecosistema</a>
            <a href="#agente-ventas" data-compas-agent="sales" data-compas-product={product.slug}>Ventas</a>
            <a href="#agente-soporte" data-compas-agent="support" data-compas-product={product.slug}>Soporte</a>
          </nav>
        </div>
      </header>

      <section className="productHero">
        <div className="shell productHeroGrid">
          <div>
            <p className="eyebrow"><span /> {product.kicker}</p>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <div className="productActions">
              <a className="primary" href="#agente-ventas" data-compas-agent="sales" data-compas-product={product.slug}>Hablar con ventas</a>
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
