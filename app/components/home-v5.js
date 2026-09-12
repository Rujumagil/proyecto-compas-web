import Image from "next/image";
import Diagnostic from "./diagnostic";

const APP_URL = "https://app.proyectocompas.com";

const ecosystemTypes = [
  {
    icon: "🍽",
    tone: "gold",
    title: "Restaurantes",
    subtitle: "De la visita al pedido y la recompra",
    text: "Conecta menú, reservaciones, pedidos, clientes, promociones y operación en una experiencia digital pensada para vender y atender mejor.",
    bullets: ["Menú digital", "Reservaciones", "Pedidos", "Clientes y promociones"],
    placeholder: "Visual del ecosistema restaurante",
  },
  {
    icon: "◇",
    tone: "blue",
    title: "Academias",
    subtitle: "Del registro al aprendizaje continuo",
    text: "Integra registro, pagos, accesos, cursos, evaluaciones, progreso y comunidad dentro de una plataforma propia y escalable.",
    bullets: ["Registro y pagos", "Accesos", "Cursos y progreso", "Comunidad"],
    placeholder: "Visual del ecosistema academia",
  },
  {
    icon: "◎",
    tone: "green",
    title: "Marcas y servicios",
    subtitle: "Del contenido a la relación con el cliente",
    text: "Une presencia digital, agenda, CRM, seguimiento, automatización y productos digitales para convertir atención en oportunidades reales.",
    bullets: ["Contenido", "Agenda", "CRM", "Seguimiento"],
    placeholder: "Visual de marca / servicios",
  },
];

const cases = [
  {
    title: "ETERNI",
    category: "Educación y desarrollo personal",
    result: "Marca, academia, contenidos, comunidad, libros y pagos conectados en una experiencia digital propia.",
    tags: ["Academia", "Comunidad", "Pagos"],
    tone: "green",
  },
  {
    title: "Yamilet",
    category: "Marca personal",
    result: "Presencia digital, libros, academia, cursos, formularios y agenda organizados alrededor de su marca.",
    tags: ["Marca", "Academia", "Agenda"],
    tone: "purple",
  },
  {
    title: "AG Business",
    category: "Capacitación empresarial",
    result: "Academia, evaluaciones, recursos y operación académica para un programa especializado de formación.",
    tags: ["Academia", "Evaluaciones", "Soporte"],
    tone: "blue",
  },
  {
    title: "Chidoliro",
    category: "Restaurante",
    result: "Experiencia digital orientada a menú, reservaciones, pedidos, promociones y futura operación conectada.",
    tags: ["Menú", "Pedidos", "Reservas"],
    tone: "gold",
  },
];

const process = [
  ["01", "Escuchamos", "Entendemos cómo funciona hoy tu negocio, qué quieres lograr y dónde se están perdiendo oportunidades."],
  ["02", "Diseñamos", "Definimos el ecosistema ideal, las prioridades y la experiencia que debe vivir tu cliente."],
  ["03", "Desarrollamos", "Construimos las piezas necesarias sin llenar tu negocio de herramientas aisladas."],
  ["04", "Integramos", "Conectamos captación, operación, automatización, datos y seguimiento para que trabajen juntos."],
  ["05", "Evolucionamos", "Medimos, mejoramos y agregamos nuevas capacidades conforme tu negocio crece."],
];

const modules = [
  { title: "Compás One", label: "Opera", text: "CRM, clientes, conversaciones, agenda, pagos y seguimiento.", href: "/compas-one", tone: "one" },
  { title: "Compás Academy", label: "Forma", text: "Cursos, alumnos, evaluaciones, progreso y comunidades.", href: "/compas-academy", tone: "academy" },
  { title: "Compás Creators", label: "Crea", text: "Presencia digital, contenidos, libros, cursos y activos digitales.", href: "/compas-creators", tone: "creators" },
  { title: "Compás IA", label: "Automatiza", text: "Agentes, atención, seguimiento y procesos asistidos por inteligencia artificial.", href: "/compas-ia", tone: "ia" },
];

function VisualPlaceholder({ title, detail, className = "" }) {
  return (
    <div className={`hv5Placeholder ${className}`} aria-label={title}>
      <div className="hv5PlaceholderIcon" aria-hidden="true">
        <span />
        <span />
      </div>
      <strong>{title}</strong>
      {detail ? <small>{detail}</small> : null}
    </div>
  );
}

export default function HomeV5() {
  return (
    <main className="hv5" id="inicio">
      <header className="hv5Header">
        <nav className="hv5Shell hv5Nav" aria-label="Navegación principal">
          <a className="hv5Brand" href="#inicio" aria-label="Compás Evolution, inicio">
            <Image src="/brand/compas-evolution-official.png" alt="Compás Evolution" width={235} height={81} priority />
          </a>
          <div className="hv5NavLinks">
            <a href="#ecosistemas">Ecosistemas</a>
            <a href="#casos">Casos reales</a>
            <a href="#proceso">Cómo funciona</a>
            <a href="#elige">Diagnóstico</a>
          </div>
          <a className="hv5NavCta" href="#elige">Descubre tu ecosistema <span>→</span></a>
        </nav>
      </header>

      <section className="hv5Hero">
        <div className="hv5HeroGrid" aria-hidden="true" />
        <div className="hv5HeroGlow hv5HeroGlowOne" aria-hidden="true" />
        <div className="hv5HeroGlow hv5HeroGlowTwo" aria-hidden="true" />
        <div className="hv5Shell hv5HeroInner">
          <div className="hv5HeroCopy">
            <p className="hv5Eyebrow light">MÁS QUE PÁGINAS WEB · ECOSISTEMAS QUE GENERAN RESULTADOS</p>
            <h1>Tu negocio no necesita otra página. <em>Necesita un ecosistema que lo ayude a crecer.</em></h1>
            <p className="hv5HeroLead">Diseñamos y conectamos presencia digital, captación de clientes, CRM, automatización, inteligencia artificial, ventas, pagos, academias y operación alrededor de la forma real en que funciona tu negocio.</p>
            <div className="hv5HeroActions">
              <a className="hv5Button hv5ButtonGold" href="#elige">Descubrir qué ecosistema necesito <span>→</span></a>
              <a className="hv5Button hv5ButtonGhost" href="#casos">Ver proyectos reales <span>↓</span></a>
            </div>
            <div className="hv5HeroProof">
              <div><b>01</b><span><strong>Diagnóstico inicial</strong>Entendemos antes de construir.</span></div>
              <div><b>02</b><span><strong>Solución a medida</strong>Solo lo que aporta valor.</span></div>
              <div><b>03</b><span><strong>Evolución continua</strong>La tecnología crece contigo.</span></div>
            </div>
          </div>

          <div className="hv5HeroVisual">
            <VisualPlaceholder title="Espacio para imagen hero" detail="Mockup principal · laptop / dashboard / ecosistema · 1600 × 1000 recomendado" className="heroMain" />
            <VisualPlaceholder title="Vista móvil" detail="App / experiencia cliente" className="heroMobile" />
            <div className="hv5HeroNote">Un ecosistema diseñado alrededor de tu negocio.</div>
          </div>
        </div>
      </section>

      <section className="hv5Problem">
        <div className="hv5Shell">
          <div className="hv5SectionHead hv5SectionHeadSplit">
            <div>
              <p className="hv5Eyebrow">EL PROBLEMA NO ES TENER O NO TENER UNA PÁGINA</p>
              <h2>Una página web es solamente el principio.</h2>
              <p>Una página bonita no basta si después el prospecto se pierde, nadie da seguimiento, los pedidos llegan desordenados o cada área vive en una herramienta diferente.</p>
            </div>
            <blockquote>“Pasamos de una presencia que solo existe a un sistema que ayuda al negocio a funcionar.”</blockquote>
          </div>

          <div className="hv5Flow" aria-label="Atraer, convertir, operar y crecer">
            <article><span className="hv5FlowIcon blue">↗</span><div><b>ATRAE</b><p>Presencia digital, contenido, campañas y experiencias.</p></div></article>
            <i>→</i>
            <article><span className="hv5FlowIcon green">⌄</span><div><b>CONVIERTE</b><p>Formularios, IA, WhatsApp, agenda, reservas y ventas.</p></div></article>
            <i>→</i>
            <article><span className="hv5FlowIcon purple">⚙</span><div><b>OPERA</b><p>CRM, clientes, citas, pedidos, alumnos, pagos y procesos.</p></div></article>
            <i>→</i>
            <article><span className="hv5FlowIcon gold">↗</span><div><b>CRECE</b><p>Automatización, analítica, campañas, retención y mejora.</p></div></article>
          </div>
        </div>
      </section>

      <section className="hv5Ecosystems" id="ecosistemas">
        <div className="hv5Shell">
          <div className="hv5SectionHead hv5SectionHeadSplit">
            <div>
              <p className="hv5Eyebrow">SOLUCIONES DISEÑADAS ALREDEDOR DE CADA OPERACIÓN</p>
              <h2>Ecosistemas que construimos.</h2>
            </div>
            <p className="hv5SectionAside">El punto de entrada cambia según tu negocio. La meta es la misma: conectar lo que hoy está separado para que puedas vender, operar y crecer mejor.</p>
          </div>

          <div className="hv5EcosystemCards">
            {ecosystemTypes.map((item) => (
              <article className="hv5EcosystemCard" key={item.title}>
                <div className="hv5CardTop">
                  <span className={`hv5RoundIcon ${item.tone}`}>{item.icon}</span>
                  <div><h3>{item.title}</h3><p>{item.subtitle}</p></div>
                </div>
                <p className="hv5CardText">{item.text}</p>
                <VisualPlaceholder title={item.placeholder} detail="Aquí crearemos el mockup final del caso de uso" className={`ecosystemImage ${item.tone}`} />
                <ul>{item.bullets.map((bullet) => <li key={bullet}>✓ {bullet}</li>)}</ul>
                <a href="#elige">Diseñar este ecosistema <span>→</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hv5Cases" id="casos">
        <div className="hv5Shell">
          <div className="hv5SectionHead hv5SectionHeadSplit">
            <div>
              <p className="hv5Eyebrow">EXPERIENCIAS REALES</p>
              <h2>No son plantillas. Son ecosistemas construidos alrededor de cada proyecto.</h2>
            </div>
            <a className="hv5TextLink" href="/casos-de-exito">Ver todos los casos <span>→</span></a>
          </div>

          <div className="hv5CaseGrid">
            {cases.map((item) => (
              <article className="hv5CaseCard" key={item.title}>
                <div className="hv5CaseHeading"><span className={`hv5CaseMark ${item.tone}`}>{item.title.charAt(0)}</span><div><h3>{item.title}</h3><p>{item.category}</p></div></div>
                <VisualPlaceholder title="Espacio para imagen del caso" detail="Captura real / mockup / identidad" className="caseImage" />
                <p>{item.result}</p>
                <div className="hv5Tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
          <p className="hv5CasesNote">Publicamos resultados verificables y capacidades implementadas; no usamos cifras comerciales sin validar.</p>
        </div>
      </section>

      <section className="hv5Process" id="proceso">
        <div className="hv5Shell">
          <div className="hv5ProcessTitle"><p className="hv5Eyebrow light">CÓMO LO HACEMOS</p><h2>Una metodología clara para construir algo que sí tenga sentido para tu negocio.</h2></div>
          <div className="hv5ProcessGrid">
            {process.map(([number, title, text]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="hv5Modules">
        <div className="hv5Shell">
          <div className="hv5SectionHead hv5SectionHeadSplit">
            <div><p className="hv5Eyebrow">TECNOLOGÍA COMPÁS</p><h2>Un ecosistema. Cuatro motores que podemos combinar.</h2></div>
            <p className="hv5SectionAside">No necesitas comprar todo. Integramos los módulos que tu etapa y operación realmente requieren.</p>
          </div>
          <div className="hv5ModuleGrid">
            {modules.map((item) => (
              <a href={item.href} className={`hv5Module ${item.tone}`} key={item.title}>
                <span className="hv5ModuleSymbol">◇</span><div><small>{item.label}</small><h3>{item.title}</h3><p>{item.text}</p></div><b>→</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="hv5DiagnosticIntro">
        <div className="hv5Shell hv5DiagnosticIntroGrid">
          <div><p className="hv5Eyebrow">DIAGNÓSTICO COMPÁS</p><h2>Antes de venderte una solución, queremos entender qué necesitas.</h2></div>
          <div className="hv5DiagnosticPromises"><span>✓ Sin costo</span><span>✓ 5 preguntas</span><span>✓ Recomendación inicial</span><span>✓ Sin pedir datos antes del resultado</span></div>
        </div>
      </section>

      <div className="hv5DiagnosticWrap"><Diagnostic /></div>

      <section className="hv5Final">
        <div className="hv5Shell hv5FinalInner">
          <div><p className="hv5Eyebrow light">TU SIGUIENTE PASO</p><h2>Convierte tu negocio en un ecosistema digital.</h2><p>La tecnología correcta, conectada al proceso correcto, puede cambiar la forma en que atraes, atiendes y haces crecer a tus clientes.</p></div>
          <div className="hv5FinalActions"><a className="hv5Button hv5ButtonGold" href="#elige">Quiero mi diagnóstico <span>→</span></a><a className="hv5TextContact" href="#agente-ventas" data-compas-agent="sales" data-compas-product="diagnostico">Hablar con un orientador</a></div>
        </div>
      </section>

      <footer className="hv5Footer">
        <div className="hv5Shell hv5FooterTop">
          <div className="hv5FooterBrand"><Image src="/brand/compas-evolution-horizontal.svg" alt="Compás Evolution" width={250} height={64} /><p>Ecosistemas digitales para atraer, convertir, operar y crecer.</p></div>
          <div><strong>Ecosistemas</strong><a href="#ecosistemas">Soluciones</a><a href="#casos">Casos reales</a><a href="#proceso">Cómo funciona</a></div>
          <div><strong>Plataformas</strong><a href="/compas-one">Compás One</a><a href="/compas-academy">Compás Academy</a><a href="/compas-creators">Compás Creators</a><a href="/compas-ia">Compás IA</a></div>
          <div><strong>Acceso</strong><a href={APP_URL} target="_blank" rel="noreferrer">Entrar a Compás One ↗</a><a href="/privacidad">Privacidad</a><a href="/terminos">Términos</a></div>
        </div>
        <div className="hv5Shell hv5FooterBottom"><span>© 2026 Compás Evolution.</span><span>Ideas que hacen crecer.</span></div>
      </footer>
    </main>
  );
}
