import Image from "next/image";

export default function LegalPage({ title, intro, children }) {
  return (
    <main className="legalPage">
      <header className="simpleHeader">
        <div className="shell simpleHeaderInner">
          <a href="/" aria-label="Volver a Proyecto Compás">
            <Image src="/brand/compas-evolution-horizontal.svg" alt="Compás Evolution" width={250} height={64} />
          </a>
          <nav aria-label="Navegación legal">
            <a href="/">Inicio</a>
            <a href="/privacidad">Privacidad</a>
            <a href="/terminos">Términos</a>
            <a href="#agente-soporte" data-compas-agent="support">Soporte</a>
          </nav>
        </div>
      </header>
      <section className="legalHero">
        <div className="shell">
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>
      <section className="legalContent">
        <div className="shell"><article>{children}</article></div>
      </section>
    </main>
  );
}
