"use client";

import { useEffect } from "react";
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
    badge: "CRM Y OPERACIÓN",
    kicker: "El núcleo operativo",
    title: "CRM para organizar clientes, ventas y seguimiento.",
    description: "Centraliza clientes, conversaciones, agenda, seguimiento y automatizaciones para operar con mayor claridad.",
    bullets: ["CRM y gestión de clientes", "Seguimiento comercial", "Automatizaciones y agentes"],
    href: "/compas-one",
    cta: "Conocer Compás One →",
  },
  {
    key: "academy",
    cardClass: "academyCard",
    image: "/brand/compas-academy-logo.svg",
    alt: "Compás Academy",
    badge: "ACADEMIAS DIGITALES",
    kicker: "Aprendizaje aplicable",
    title: "Academias digitales y capacitación para equipos, expertos y marcas.",
    description: "Organiza cursos, rutas de aprendizaje, recursos y seguimiento dentro de una experiencia académica propia.",
    bullets: ["Cursos y rutas", "Capacitación empresarial", "Academias personalizadas"],
    href: "/compas-academy",
    cta: "Conocer Compás Academy →",
  },
  {
    key: "creators",
    cardClass: "creatorsCard",
    image: "/brand/compas-creators-logo-right.svg",
    alt: "Compás Creators",
    badge: "DESARROLLO DIGITAL",
    kicker: "De experiencia a proyecto",
    title: "Páginas web, cursos y productos digitales con estructura.",
    description: "Transformamos ideas, historias y conocimiento en páginas, cursos, academias, libros y productos digitales listos para crecer.",
    bullets: ["Diseño y desarrollo web", "Cursos y productos digitales", "Publicación y lanzamiento"],
    href: "/compas-creators",
    cta: "Conocer Compás Creators →",
  },
  {
    key: "ia",
    cardClass: "iaCard",
    image: "/brand/compas-ia-logo.svg",
    alt: "Compás IA",
    badge: "AGENTES DE IA",
    kicker: "Agentes con función y contexto",
    title: "Agentes de IA para ventas, soporte y seguimiento.",
    description: "Configura agentes especializados conectados al conocimiento y los procesos de cada negocio para responder y dar continuidad.",
    bullets: ["IA para ventas", "Soporte automatizado", "Seguimiento y continuidad"],
    href: "/compas-ia",
    cta: "Conocer Compás IA →",
  },
];

const projects = [
  { title: "ETERNI", type: "Marca + academia + contenidos", result: "Academia digital implementada", image: "/portfolio/web-eterni.jpg", alt: "Proyecto ETERNI" },
  { title: "ASTRA Retiro", type: "Orientación + captación + seguimiento", result: "Captación conectada a seguimiento", image: "/portfolio/web-astra-retiro.jpg", alt: "Proyecto ASTRA Retiro" },
  { title: "AG Business Networking", type: "Academia + evaluaciones + soporte", result: "Plataforma de capacitación operativa", image: "/portfolio/web-business-networking.jpg", alt: "Proyecto AG Business Networking" },
];

const trustedBy = ["ETERNI", "ASTRA Retiro", "AG Business Networking", "El Compás del Estratega"];

export default function HomeV4() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealEls = document.querySelectorAll(".reveal");
    let revealObserver;

    if (reduceMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealEls.forEach((el) => revealObserver.observe(el));
    }

    return () => revealObserver?.disconnect();
  }, []);

  return (
    <main>
      <header className="siteHeader">
        <nav className="nav shell" aria-label="Navegación principal">
          <a className="brand brandOfficial" href="#inicio" aria-label="Compás Evolution, inicio">
            <Image src="/brand/compas-evolution-official.png" alt="Compás Evolution" width={235} height={81} priority />
          </a>
          <div className="navLinks">
            <a href="/soluciones">Soluciones</a>
            <a href="#elige">Encuentra tu ruta</a>
            <a href="/casos-de-exito">Casos</a>
            <a href="/nosotros">Nosotros</a>
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
            <h1>CRM, inteligencia artificial, academias y desarrollo digital para <em>hacer avanzar tu negocio.</em></h1>
            <p className="heroLead">Conectamos CRM y seguimiento comercial, academias digitales, desarrollo de páginas y productos digitales, y agentes de IA para ventas y atención en una ruta clara según la etapa de cada negocio.</p>
            <div className="heroActions">
              <a className="button buttonPrimary" href="/soluciones">Explorar soluciones →</a>
              <a className="button buttonGhost" href="#elige">Encontrar mi ruta →</a>
            </div>
            <div className="heroProof">
              <span><b>Compás One</b>CRM y seguimiento</span>
              <span><b>Compás Academy</b>Academias y capacitación</span>
              <span><b>Compás Creators</b>Páginas y productos digitales</span>
              <span><b>Compás IA</b>Ventas, soporte y automatización</span>
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
            <div className="ecosystemNode nodeAcademy glassPanel"><span>02</span><div><b>Compás Academy</b><small>Aprender</small></div></div>
            <div className="ecosystemNode nodeCreators glassPanel"><span>03</span><div><b>Compás Creators</b><small>Crear</small></div></div>
            <div className="ecosystemNode nodeAi glassPanel"><span>04</span><div><b>Compás IA</b><small>Evolucionar</small></div></div>
          </div>
        </div>
      </section>

      <section className="socialProof reveal">
        <div className="shell socialProofInner">
          <p>Con la confianza de</p>
          <ul>{trustedBy.map((name) => <li key={name}>{name}</li>)}</ul>
        </div>
      </section>

      <section className="decisionBar reveal">
        <div className="shell decisionBarInner">
          <p>CRM, capacitación, desarrollo e IA no deberían vivir desconectados.</p>
          <h2>Empieza por la solución digital que tu empresa necesita hoy.</h2>
          <a href="#elige">Descúbrelo en menos de un minuto →</a>
        </div>
      </section>

      <section className="section shell solutionsReelSection" id="soluciones">
        <div className="sectionHeader compactSectionHeader">
          <div>
            <p className="eyebrow dark"><span /> Soluciones digitales para empresas</p>
            <h2>CRM, academias digitales, desarrollo web e IA en un mismo ecosistema.</h2>
          </div>
          <div className="sectionAside">
            <p>Cada división resuelve una intención diferente y puede funcionar por sí sola o conectarse con las demás cuando el proyecto crece.</p>
            <span className="reelHint">Desliza para explorar →</span>
          </div>
        </div>
        <div className="horizontalReel solutionReel" aria-label="Soluciones digitales de Compás Evolution">
          {solutions.map((solution, index) => (
            <article className={`productCard reelProductCard ${solution.cardClass} reveal`} style={{ transitionDelay: `${index * 90}ms` }} key={solution.key}>
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
              <h2>Proyectos digitales que ya están en operación.</h2>
            </div>
            <div className="portfolioIntro">
              <p>Mostramos capacidades implementadas y resultados observables; las métricas comerciales sólo se publican cuando están verificadas.</p>
              <span className="reelHint reelHintLight">Desliza para recorrer →</span>
            </div>
          </div>
          <div className="horizontalReel portfolioReel" aria-label="Experiencias reales de Proyecto Compás">
            {projects.map((project, index) => (
              <article className="portfolioCard reelPortfolioCard reveal" style={{ transitionDelay: `${index * 90}ms` }} key={project.title}>
                <div className="portfolioImage">
                  <Image src={project.image} alt={project.alt} width={1400} height={788} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="portfolioMeta"><h3>{project.title}</h3><p>{project.type}</p></div>
                <p className="portfolioResult">{project.result}</p>
              </article>
            ))}
          </div>
          <div className="portfolioFoot">
            <p>Cada proyecto inicia con una necesidad distinta.</p>
            <a href="/casos-de-exito">Ver casos de éxito →</a>
          </div>
        </div>
      </section>

      <section className="ecosystem shell reveal">
        <div className="ecosystemCopy">
          <p className="eyebrow light"><span /> Más que una plataforma</p>
          <h2>Un ecosistema de soluciones digitales que crece contigo.</h2>
          <p>Puedes comenzar con CRM, capacitación, desarrollo digital o inteligencia artificial y conectar nuevas capacidades cuando tu operación lo requiera.</p>
          <a href="#agente-ventas" data-compas-agent="sales" data-compas-product="diagnostico">Hablar con un orientador →</a>
        </div>
        <div className="ecosystemVisual">
          <div className="orbit orbitOne" />
          <div className="orbit orbitTwo" />
          <div className="robotWrap"><Image src="/brand/compas-evolution-halcon.svg" alt="Halcón de Compás Evolution" width={640} height={640} /></div>
          <div className="orbitTag tagOne">COMPÁS ONE</div>
          <div className="orbitTag tagTwo">COMPÁS ACADEMY</div>
          <div className="orbitTag tagThree">COMPÁS CREATORS</div>
        </div>
      </section>

      <section className="finalCta shell reveal">
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
          <p>CRM · Academias digitales · Desarrollo digital · Inteligencia artificial</p>
          <div className="footerMap">
            <section><strong>Ecosistema</strong><a href="/compas-one">Compás One</a><a href="/compas-academy">Compás Academy</a><a href="/compas-creators">Compás Creators</a><a href="/compas-ia">Compás IA</a></section>
            <section><strong>Atención</strong><a href="#agente-ventas" data-compas-agent="sales">Ventas</a><a href="#agente-soporte" data-compas-agent="support">Soporte</a><a href="#agente-seguimiento" data-compas-agent="followup">Seguimiento</a></section>
            <section><strong>Proyecto</strong><a href="/soluciones">Soluciones</a><a href="/casos-de-exito">Casos de éxito</a><a href="/nosotros">Nosotros</a><a href={ACADEMY_URL} target="_blank" rel="noreferrer">Aula Compás</a></section>
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