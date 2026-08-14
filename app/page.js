"use client";

import Image from "next/image";
import { useState } from "react";

const APP_URL = "https://app.proyectocompas.com";
const ACADEMY_URL = `${APP_URL}/academy`;
const WHATSAPP_URL =
  "https://wa.me/5213336646803?text=Hola%20Proyecto%20Comp%C3%A1s%2C%20quiero%20orientaci%C3%B3n%20para%20elegir%20mi%20siguiente%20paso";

const decisions = [
  {
    id: "operacion",
    label: "Organizar mi negocio",
    title: "Tu siguiente paso es Compás One",
    text: "Centraliza clientes, conversaciones, agenda, seguimiento y automatizaciones en un solo lugar.",
    href: APP_URL,
    cta: "Explorar Compás One",
    product: "ONE",
  },
  {
    id: "aprendizaje",
    label: "Aprender y capacitarme",
    title: "Tu siguiente paso es Compás Academy",
    text: "Avanza con rutas de aprendizaje prácticas para convertir conocimiento en acciones concretas.",
    href: ACADEMY_URL,
    cta: "Entrar a la Academia",
    product: "ACADEMY",
  },
  {
    id: "conocimiento",
    label: "Convertir mi experiencia en un proyecto",
    title: "Comienza con una ruta acompañada",
    text: "Te ayudamos a transformar tu experiencia en un libro, curso, método o propuesta digital con dirección y estructura.",
    href: WHATSAPP_URL,
    cta: "Conversar sobre mi idea",
    product: "CREATORS",
  },
  {
    id: "claridad",
    label: "Aún no sé qué necesito",
    title: "Primero encontremos el norte",
    text: "Cuéntanos qué quieres resolver. Te orientaremos hacia la herramienta, aprendizaje o acompañamiento adecuado.",
    href: WHATSAPP_URL,
    cta: "Pedir orientación",
    product: "DIAGNÓSTICO",
  },
];

const outcomes = [
  ["01", "Claridad", "Entiende qué necesitas antes de invertir tiempo, dinero o energía."],
  ["02", "Dirección", "Elige una ruta concreta según tu momento y tus objetivos."],
  ["03", "Acción", "Trabaja con herramientas, aprendizaje y acompañamiento conectados."],
];

const projects = [
  {
    category: "paginas",
    title: "ETERNI",
    type: "Página de marca y acompañamiento",
    image: "/portfolio/web-eterni.jpg",
    alt: "Página principal de ETERNI",
  },
  {
    category: "paginas",
    title: "ASTRA Retiro",
    type: "Orientación financiera y experiencia guiada",
    image: "/portfolio/web-astra-retiro.jpg",
    alt: "Página principal de ASTRA Retiro",
  },
  {
    category: "paginas",
    title: "AG Business Networking",
    type: "Plataforma de servicios empresariales",
    image: "/portfolio/web-business-networking.jpg",
    alt: "Página principal de AG Business Networking",
  },
  {
    category: "paginas",
    title: "Angélica Gallardo Accidentes",
    type: "Orientación y captación de clientes",
    image: "/portfolio/web-angelica-gallardo.jpg",
    alt: "Página principal de Angélica Gallardo Accidentes",
  },
  {
    category: "academias",
    title: "Utah Driver Success Program",
    type: "Academia con ruta de 129 pasos",
    image: "/portfolio/academy-utah-driver.jpg",
    alt: "Academia Utah Driver Success Program",
  },
  {
    category: "academias",
    title: "ETERNI Academia",
    type: "Experiencia de aprendizaje personalizada",
    image: "/portfolio/academy-eterni.jpg",
    alt: "Panel de aprendizaje de ETERNI Academia",
  },
  {
    category: "libros",
    title: "Manual IXCHEL · Semana 1",
    type: "Manual de acompañamiento",
    image: "/portfolio/manual-ixchel.jpg",
    alt: "Portada del Manual IXCHEL Semana 1, Volver a mí",
  },
  {
    category: "libros",
    title: "La Mujer del Faro",
    type: "Libro de transformación personal",
    image: "/portfolio/libro-mujer-faro.jpg",
    alt: "Portada del libro La Mujer del Faro",
  },
  {
    category: "libros",
    title: "El Compás del Estratega",
    type: "Libro y método de creación",
    image: "/portfolio/libro-compas-estratega.jpg",
    alt: "Portada del libro El Compás del Estratega",
  },
  {
    category: "libros",
    title: "El Príncipe sin Corona",
    type: "Los Reinos del Miedo · Tomo I",
    image: "/portfolio/libro-principe-sin-corona.jpg",
    alt: "Portada de El Príncipe sin Corona, tomo uno",
  },
];

export default function Home() {
  const [decision, setDecision] = useState(null);
  const [portfolioFilter, setPortfolioFilter] = useState("paginas");
  const recommendation = decisions.find((item) => item.id === decision);
  const visibleProjects = projects.filter((item) => item.category === portfolioFilter);

  return (
    <main>
      <header className="siteHeader">
        <nav className="nav shell" aria-label="Navegación principal">
          <a className="brand brandOfficial" href="#inicio" aria-label="Proyecto Compás Evolution, inicio">
            <Image
              src="/brand/compas-evolution-official.png"
              alt="Proyecto Compás Evolution"
              width={235}
              height={81}
              priority
            />
          </a>
          <div className="navLinks">
            <a href="#soluciones">Soluciones</a>
            <a href="#elige">Encuentra tu ruta</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#ruben">Quién te acompaña</a>
          </div>
          <a className="navCta" href={APP_URL} target="_blank" rel="noreferrer">
            Entrar a la app <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="heroGlow" />
        <div className="heroGrid" />
        <div className="heroAurora heroAuroraOne" />
        <div className="heroAurora heroAuroraTwo" />
        <div className="shell heroInner">
          <div className="heroCopy">
            <p className="eyebrow"><span /> Proyecto Compás Evolution</p>
            <h1>Decide con claridad.<br /><em>Avanza con dirección.</em></h1>
            <p className="heroLead">
              Un ecosistema que conecta estrategia, creación, aprendizaje, operación e inteligencia artificial para convertir tu experiencia en un proyecto con dirección.
            </p>
            <div className="heroActions">
              <a className="button buttonPrimary" href="#soluciones">
                Explorar el ecosistema <span aria-hidden="true">↓</span>
              </a>
              <a className="button buttonGhost" href="#elige">
                Encontrar mi ruta <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="heroProof" aria-label="Capacidades del ecosistema">
              <span><b>Crear</b> ideas con identidad</span>
              <span><b>Aprender</b> con propósito</span>
              <span><b>Operar</b> con claridad</span>
              <span><b>Evolucionar</b> con IA</span>
            </div>
          </div>

          <div className="heroVisual ecosystemVisualHero" aria-label="Ecosistema Proyecto Compás">
            <div className="visualLabel"><span /> Un ecosistema · Cuatro capacidades</div>
            <div className="ecosystemOrbit orbitOuter" />
            <div className="ecosystemOrbit orbitInner" />
            <div className="ecosystemCore glassPanel">
              <div className="coreCompass" aria-hidden="true"><i /></div>
              <p>PROYECTO COMPÁS</p>
              <strong>EVOLUTION</strong>
              <small>Una visión. Un rumbo.</small>
            </div>
            <div className="ecosystemNode nodeOne glassPanel">
              <span>01</span><div><b>Compás One</b><small>Operar</small></div>
            </div>
            <div className="ecosystemNode nodeAcademy glassPanel">
              <span>02</span><div><b>Academia</b><small>Aprender</small></div>
            </div>
            <div className="ecosystemNode nodeCreators glassPanel">
              <span>03</span><div><b>Creators</b><small>Crear</small></div>
            </div>
            <div className="ecosystemNode nodeAi glassPanel">
              <span>04</span><div><b>Compás IA</b><small>Evolucionar</small></div>
            </div>
            <div className="ecosystemSignal glassPanel">
              <span className="statusDot" /> Todo se conecta para ayudarte a decidir
            </div>
          </div>
        </div>
      </section>

      <section className="decisionBar" aria-label="Promesa de Proyecto Compás">
        <div className="shell decisionBarInner">
          <p>No necesitas más opciones.</p>
          <h2>Necesitas saber cuál es la correcta para ti.</h2>
          <a href="#elige">Descúbrelo en menos de un minuto <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="section shell" id="soluciones">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow dark"><span /> Dos caminos principales</p>
            <h2>Elige lo que necesitas<br />para avanzar hoy.</h2>
          </div>
          <p>
            La tecnología ordena tu operación. El aprendizaje fortalece tus decisiones. Ambas rutas forman parte del mismo ecosistema.
          </p>
        </div>

        <div className="productGrid">
          <article className="productCard oneCard">
            <div className="productTop">
              <Image src="/brand/compas-one.png" alt="Compás One" width={512} height={512} />
              <span>OPERACIÓN</span>
            </div>
            <div className="productCopy">
              <p className="productKicker">El núcleo operativo de tu ecosistema</p>
              <h3>Todo tu negocio,<br />en un solo lugar.</h3>
              <p>Gestiona clientes, ventas, conversaciones, agenda, automatizaciones e inteligencia artificial sin perder la visión completa.</p>
              <ul>
                <li>Para emprendedores y equipos</li>
                <li>Información y seguimiento centralizados</li>
                <li>Decisiones apoyadas por datos</li>
              </ul>
              <a href={APP_URL} target="_blank" rel="noreferrer">
                Explorar Compás One <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <article className="productCard academyCard">
            <div className="productTop">
              <Image src="/brand/compas-academy.png" alt="Compás Academy" width={512} height={512} />
              <span>APRENDIZAJE</span>
            </div>
            <div className="productCopy">
              <p className="productKicker">Tu conocimiento, puesto en práctica</p>
              <h3>Aprende lo necesario.<br />Aplícalo con propósito.</h3>
              <p>Accede a rutas claras, contenidos prácticos y recursos que te ayudan a desarrollar capacidades y avanzar a tu ritmo.</p>
              <ul>
                <li>Para personas que quieren crecer</li>
                <li>Aprendizaje claro y aplicable</li>
                <li>Una experiencia conectada con tu proyecto</li>
              </ul>
              <a href={ACADEMY_URL} target="_blank" rel="noreferrer">
                Entrar a Compás Academy <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="finderSection" id="elige">
        <div className="shell finderGrid">
          <div className="finderIntro">
            <p className="eyebrow light"><span /> Orientador Compás</p>
            <h2>¿Qué quieres resolver en este momento?</h2>
            <p>Selecciona la opción que más se parece a tu situación. Te mostraremos un buen punto de partida.</p>
            <div className="finderSteps" aria-hidden="true">
              <span className="active">1</span><i /><span className={recommendation ? "active" : ""}>2</span>
              <small>Necesidad</small><small>Recomendación</small>
            </div>
          </div>

          <div className="finderPanel">
            {!recommendation ? (
              <>
                <p className="panelLabel">ELIGE UNA OPCIÓN</p>
                <div className="choiceList">
                  {decisions.map((item) => (
                    <button key={item.id} type="button" onClick={() => setDecision(item.id)}>
                      <span>{item.label}</span><b aria-hidden="true">→</b>
                    </button>
                  ))}
                </div>
                <small>No necesitas registrarte para recibir una recomendación.</small>
              </>
            ) : (
              <div className="recommendation" aria-live="polite">
                <p className="panelLabel">RUTA RECOMENDADA · {recommendation.product}</p>
                <h3>{recommendation.title}</h3>
                <p>{recommendation.text}</p>
                <a className="button buttonPrimary" href={recommendation.href} target="_blank" rel="noreferrer">
                  {recommendation.cta} <span aria-hidden="true">↗</span>
                </a>
                <button className="resetButton" type="button" onClick={() => setDecision(null)}>
                  Elegir otra necesidad
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section shell methodSection" id="metodo">
        <div className="methodHeading">
          <p className="eyebrow dark"><span /> El método Compás</p>
          <h2>Menos incertidumbre.<br />Mejores decisiones.</h2>
        </div>
        <div className="outcomeGrid">
          {outcomes.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolioSection" id="proyectos">
        <div className="shell">
          <div className="portfolioHeader">
            <div>
              <p className="eyebrow dark"><span /> Proyectos en acción</p>
              <h2>Ideas que se convirtieron<br />en experiencias reales.</h2>
            </div>
            <div className="portfolioIntro">
              <p>Diseñamos páginas, academias y piezas editoriales que ayudan a presentar una propuesta, orientar a las personas y facilitar el aprendizaje.</p>
              <div className="portfolioTabs" role="group" aria-label="Filtrar proyectos">
                <button
                  type="button"
                  className={portfolioFilter === "paginas" ? "active" : ""}
                  aria-pressed={portfolioFilter === "paginas"}
                  onClick={() => setPortfolioFilter("paginas")}
                >
                  Páginas <span>04</span>
                </button>
                <button
                  type="button"
                  className={portfolioFilter === "academias" ? "active" : ""}
                  aria-pressed={portfolioFilter === "academias"}
                  onClick={() => setPortfolioFilter("academias")}
                >
                  Academias <span>02</span>
                </button>
                <button
                  type="button"
                  className={portfolioFilter === "libros" ? "active" : ""}
                  aria-pressed={portfolioFilter === "libros"}
                  onClick={() => setPortfolioFilter("libros")}
                >
                  Libros y manuales <span>04</span>
                </button>
              </div>
            </div>
          </div>

          <div className={`portfolioGrid ${portfolioFilter}`} aria-live="polite">
            {visibleProjects.map((project, index) => (
              <article className="portfolioCard" key={project.title}>
                <div className="portfolioImage">
                  <Image src={project.image} alt={project.alt} width={1400} height={788} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="portfolioMeta">
                  <h3>{project.title}</h3>
                  <p>{project.type}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="portfolioFoot">
            <p>Cada proyecto comienza con una necesidad distinta. La ruta se diseña alrededor de las personas que la van a recorrer.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Quiero desarrollar mi proyecto <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="founderSection" id="ruben">
        <div className="shell founderGrid">
          <div className="founderPortrait">
            <Image
              src="/brand/ruben-martinez.jpg"
              alt="Rubén Martínez, fundador de Proyecto Compás"
              width={900}
              height={1352}
            />
            <div className="portraitCaption">
              <span>Fundador</span>
              <strong>Rubén Martínez</strong>
            </div>
          </div>
          <div className="founderCopy">
            <p className="eyebrow dark"><span /> Quién te acompaña</p>
            <h2>Experiencia para ayudarte a encontrar el norte.</h2>
            <blockquote>
              “No necesitas llegar con el proyecto resuelto. Mi trabajo es ayudarte a ver con claridad y avanzar paso a paso.”
            </blockquote>
            <p>
              Soy <strong>Rubén Martínez</strong>, fundador de Proyecto Compás. Durante más de 20 años he acompañado el desarrollo de proyectos integrando planeación, contenidos, diseño y tecnología.
            </p>
            <p>
              Hoy reúno esa experiencia en un ecosistema pensado para personas y equipos que quieren tomar mejores decisiones sin perder su voz, su propósito ni el control de su proyecto.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Conversemos sobre tu siguiente paso <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="ecosystem shell">
        <div className="ecosystemCopy">
          <p className="eyebrow light"><span /> Más que una plataforma</p>
          <h2>Un ecosistema que crece contigo.</h2>
          <p>Empieza por lo que necesitas hoy. Cuando tu proyecto avance, encontrarás nuevas capacidades dentro de Proyecto Compás.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Hablar con un orientador <span aria-hidden="true">↗</span></a>
        </div>
        <div className="ecosystemVisual">
          <div className="orbit orbitOne" />
          <div className="orbit orbitTwo" />
          <div className="robotWrap">
            <Image src="/brand/compas-one-robot.png" alt="Asistente de Compás One" width={1024} height={885} />
          </div>
          <div className="orbitTag tagOne">ONE</div>
          <div className="orbitTag tagTwo">ACADEMY</div>
          <div className="orbitTag tagThree">CREATORS</div>
        </div>
      </section>

      <section className="finalCta shell">
        <p className="eyebrow"><span /> Tu siguiente paso</p>
        <h2>La claridad empieza<br />con una buena conversación.</h2>
        <p>Si todavía no sabes qué camino elegir, cuéntanos dónde estás y qué quieres lograr. Te ayudaremos a encontrar el norte.</p>
        <div className="finalActions">
          <a className="button buttonPrimary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Quiero orientación <span aria-hidden="true">↗</span></a>
          <a className="button buttonLight" href={APP_URL} target="_blank" rel="noreferrer">Entrar a Compás One</a>
        </div>
      </section>

      <footer>
        <div className="shell footerInner">
          <Image src="/brand/compas-evolution-horizontal.svg" alt="Proyecto Compás" width={250} height={64} />
          <p>Estrategia · Aprendizaje · Tecnología</p>
          <div>
            <a href="#soluciones">Soluciones</a>
            <a href="#elige">Encuentra tu ruta</a>
            <a href={APP_URL} target="_blank" rel="noreferrer">Acceder</a>
          </div>
          <small>© {new Date().getFullYear()} Proyecto Compás. Todos los derechos reservados.</small>
        </div>
      </footer>
    </main>
  );
}
