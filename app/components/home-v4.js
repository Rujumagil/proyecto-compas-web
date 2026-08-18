"use client";

import Image from "next/image";
import HomeGrowth from "./home-growth";
import Diagnostic from "./diagnostic";

const APP_URL = "https://app.proyectocompas.com";
const ACADEMY_URL = "https://aula.proyectocompas.com/";

const solutions = [
  {
    key: "one",
    cardClass: "oneCard",
    image: "/brand/compas-one-logo-right.svg",
    alt: "Compás One",
    badge: "OPERACIÓN",
    kicker: "El núcleo operativo",
    title: "Clientes, conversaciones y seguimiento.",
    description: "Ordena la operación y conecta CRM, agenda, automatizaciones y agentes inteligentes.",
    bullets: ["CRM y contactos", "Seguimiento centralizado", "Automatizaciones y agentes"],
    href: "/compas-one",
    cta: "Conocer Compás One →",
  },
  {
    key: "academy",
    cardClass: "academyCard",
    image: "/brand/compas-academy-logo.svg",
    alt: "Compás Academy",
    badge: "APRENDIZAJE",
    kicker: "Aprendizaje aplicable",
    title: "Aprende lo necesario. Aplícalo con propósito.",
    description: "Rutas, cursos y recursos conectados con objetivos y proyectos reales.",
    bullets: ["Cursos y rutas", "Recursos del alumno", "Academias personalizadas"],
    href: "/compas-academy",
    cta: "Conocer Compás Academy →",
  },
  {
    key: "creators",
    cardClass: "creatorsCard",
    image: "/brand/compas-creators-logo-right.svg",
    alt: "Compás Creators",
    badge: "CREACIÓN",
    kicker: "De experiencia a proyecto",
    title: "Convierte lo que sabes en algo que pueda crecer.",
    description: "Transformamos ideas, historias y conocimiento en libros, cursos, páginas, academias y productos digitales con estructura.",
    bullets: ["Dirección y estructura", "Diseño y desarrollo", "Ruta de publicación y lanzamiento"],
    href: "/compas-creators",
    cta: "Conocer Compás Creators →",
  },
  {
    key: "ia",
    cardClass: "iaCard",
    image: "/brand/compas-ia-logo.svg",
    alt: "Compás IA",
    badge: "INTELIGENCIA ARTIFICIAL",
    kicker: "Agentes con función y contexto",
    title: "Atiende, orienta y da seguimiento.",
    description: "Configura agentes especializados en ventas, soporte y seguimiento conectados al conocimiento y procesos de cada negocio.",
    bullets: ["Ventas y calificación", "Soporte y resolución", "Seguimiento y continuidad"],
    href: "/compas-ia",
    cta: "Conocer Compás IA →",
  },
];

const projects = [
  { title: "ETERNI", type: "Marca + academia + contenidos", image: "/portfolio/web-eterni.jpg", alt: "Proyecto ETERNI" },
  { title: "ASTRA Retiro", type: "Orientación + captación + seguimiento", image: "/portfolio/web-astra-retiro.jpg", alt: "Proyecto ASTRA Retiro" },
  { title: "AG Business Networking", type: "Academia + evaluaciones + soporte", image: "/portfolio/web-business-networking.jpg", alt: "Proyecto AG Business Networking" },
];

export default function HomeV4() {
  return (
    <main>
      <header className="siteHeader">
        <nav className="nav shell" aria-label="Navegación principal">
          <a className="brand brandOfficial" href="#inicio" aria-label="Compás Evolution, inicio">
            <Image src="/brand/compas-evolution-official.png" alt="Compás Evolution" width={235} height={81} priority />
          </a>
          <div className="navLinks">
            <a href="#soluciones">Soluciones</a>
            <a href="#elige">Encuentra tu ruta</a>
            <a href="#agentes">Agentes</a>
            <a href="#experiencias-reales">Experiencias</a>
          </div>
          <a className="navCta" href={APP_URL} target="_blank" rel="noreferrer">Entrar a Compás One <span>↗</span></a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="heroGlow" />
        <div className="heroGrid" />
        <div className="heroAurora heroAuroraOne" />
        <div className="heroAurora heroAuroraTwo" />
        <div className="shell heroInner">
          <div className="heroCopy">
            <p className="eyebrow"><span /> Compás Evolution</p>
            <h1>Decide con claridad.<br /><em>Avanza con dirección.</em></h1>
            <p className="heroLead">Un ecosistema que conecta operación, aprendizaje, creación e inteligencia artificial para convertir necesidades reales en rutas concretas de acción.</p>
            <div className="heroActions">
              <a className="button buttonPrimary" href="#soluciones">Explorar el ecosistema ↓</a>
              <a className="button buttonGhost" href="#elige">Encontrar mi ruta →</a>
            </div>
            <div className="heroProof">
              <span><b>Compás One</b>Opera y organiza</span>
              <span><b>Academy</b>Aprende y aplica</span>
              <span><b>Creators</b>Crea y publica</span>
              <span><b>Compás IA</b>Atiende y evoluciona</span>
            </div>
          </div>
          <div className="heroVisual ecosystemVisualHero">
            <div className="visualLabel"><span /> Un ecosistema · Cuatro capacidades</div>
            <div className="ecosystemOrbit orbitOuter" />
            <div className="ecosystemOrbit orbitInner" />
            <div className="ecosystemCore glassPanel">
              <Image src="/brand/compas-evolution-halcon.svg" alt="Halcón de Compás Evolution" width={120} height={120} />
              <p>COMPÁS</p><strong>EVOLUTION</strong><small>Una visión. Un rumbo.</small>
            </div>
            <div className="ecosystemNode nodeOne glassPanel"><span>01</span><div><b>Compás One</b><small>Operar</small></div></div>
            <div className="ecosystemNode nodeAcademy glassPanel"><span>02</span><div><b>Academy</b><small>Aprender</small></div></div>
            <div className="ecosystemNode nodeCreators glassPanel"><span>03</span><div><b>Creators</b><small>Crear</small></div></div>
            <div className="ecosystemNode nodeAi glassPanel"><span>04</span><div><b>Compás IA</b><small>Evolucionar</small></div></div>
          </div>
        </div>
      </section>

      <section className="decisionBar">
        <div className="shell decisionBarInner">
          <p>No necesitas más opciones.</p>
          <h2>Necesitas saber cuál es la correcta para ti.</h2>
          <a href="#elige">Descúbrelo en menos de un minuto →</a>
        </div>
      </section>

      <section className="section shell solutionsReelSection" id="soluciones">
        <div className="sectionHeader compactSectionHeader">
          <div>
            <p className="eyebrow dark"><span /> Cuatro capacidades conectadas</p>
            <h2>Empieza por lo que necesitas hoy.</h2>
          </div>
          <div className="sectionAside">
            <p>Cada división puede funcionar por sí sola y conectarse con las demás cuando el proyecto crece.</p>
            <span className="reelHint">Desliza para explorar →</span>
          </div>
        </div>
        <div className="horizontalReel solutionReel" aria-label="Soluciones de Compás Evolution">
          {solutions.map((solution) => (
            <article className={`productCard reelProductCard ${solution.cardClass}`} key={solution.key}>
              <div className="productTop">
                <Image src={solution.image} alt={solution.alt} width={512} height={512} />
                <span>{solution.badge}</span>
              </div>
              <div className="productCopy">
                <p className="productKicker">{solution.kicker}</p>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <ul>{solution.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                <a href={solution.href}>{solution.cta}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Diagnostic />
      <HomeGrowth />

      <section className="portfolioSection" id="experiencias-reales">
        <div className="shell">
          <div className="portfolioHeader compactPortfolioHeader">
            <div>
              <p className="eyebrow light"><span /> Experiencias reales</p>
              <h2>Proyectos que ya están en acción.</h2>
            </div>
            <div className="portfolioIntro">
              <p>Una muestra de páginas, academias y sistemas construidos alrededor de necesidades reales.</p>
              <span className="reelHint reelHintLight">Desliza para recorrer →</span>
            </div>
          </div>
          <div className="horizontalReel portfolioReel" aria-label="Experiencias reales de Proyecto Compás">
            {projects.map((project, index) => (
              <article className="portfolioCard reelPortfolioCard" key={project.title}>
                <div className="portfolioImage">
                  <Image src={project.image} alt={project.alt} width={1400} height={788} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="portfolioMeta"><h3>{project.title}</h3><p>{project.type}</p></div>
              </article>
            ))}
          </div>
          <div className="portfolioFoot">
            <p>Cada proyecto inicia con una necesidad distinta.</p>
            <a href="#agente-ventas" data-compas-agent="sales" data-compas-product="compas-creators">Quiero desarrollar mi proyecto →</a>
          </div>
        </div>
      </section>

      <section className="ecosystem shell">
        <div className="ecosystemCopy">
          <p className="eyebrow light"><span /> Más que una plataforma</p>
          <h2>Un ecosistema que crece contigo.</h2>
          <p>Empieza por lo que necesitas hoy. Cuando tu proyecto avance, conecta nuevas capacidades sin perder continuidad.</p>
          <a href="#agente-ventas" data-compas-agent="sales" data-compas-product="diagnostico">Hablar con un orientador →</a>
        </div>
        <div className="ecosystemVisual">
          <div className="orbit orbitOne" />
          <div className="orbit orbitTwo" />
          <div className="robotWrap"><Image src="/brand/compas-evolution-halcon.svg" alt="Halcón de Compás Evolution" width={640} height={640} /></div>
          <div className="orbitTag tagOne">ONE</div>
          <div className="orbitTag tagTwo">ACADEMY</div>
          <div className="orbitTag tagThree">CREATORS</div>
        </div>
      </section>

      <section className="finalCta shell">
        <p className="eyebrow"><span /> Tu siguiente paso</p>
        <h2>La claridad empieza con una buena conversación.</h2>
        <p>Habla con el agente adecuado según lo que necesitas.</p>
        <div className="finalActions">
          <a className="button buttonPrimary" href="#agente-ventas" data-compas-agent="sales" data-compas-product="diagnostico">Quiero orientación →</a>
          <a className="button buttonLight" href="#agente-soporte" data-compas-agent="support">Necesito soporte</a>
          <a className="button buttonLight" href="#agente-seguimiento" data-compas-agent="followup">Dar seguimiento</a>
        </div>
      </section>

      <footer>
        <div className="shell footerInner">
          <Image src="/brand/compas-evolution-horizontal.svg" alt="Compás Evolution" width={250} height={64} />
          <p>Operación · Aprendizaje · Creación · Inteligencia artificial</p>
          <div className="footerMap">
            <section><strong>Ecosistema</strong><a href="/compas-one">Compás One</a><a href="/compas-academy">Compás Academy</a><a href="/compas-creators">Compás Creators</a><a href="/compas-ia">Compás IA</a></section>
            <section><strong>Atención</strong><a href="#agente-ventas" data-compas-agent="sales">Ventas</a><a href="#agente-soporte" data-compas-agent="support">Soporte</a><a href="#agente-seguimiento" data-compas-agent="followup">Seguimiento</a></section>
            <section><strong>Accesos</strong><a href={APP_URL} target="_blank" rel="noreferrer">Compás One</a><a href={ACADEMY_URL} target="_blank" rel="noreferrer">Aula Compás</a><a href="#experiencias-reales">Experiencias</a><a href="#preguntas">FAQ</a></section>
            <section><strong>Legal</strong><a href="/informacion-legal">Información legal</a><a href="/privacidad">Privacidad</a><a href="/terminos">Términos</a><a href="/cookies">Cookies</a><a href="/ia-y-datos">IA y datos</a><a href="/derechos-de-autor">Derechos de autor</a></section>
          </div>
          <small>
            Titular legal y fiscal: ASTRID ANDREA ARAIZA RINCON · Proyecto Compás / Compás Evolution
            <br />© {new Date().getFullYear()} Compás Evolution. Todos los derechos reservados.
          </small>
        </div>
      </footer>
    </main>
  );
}
