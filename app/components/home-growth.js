import Image from "next/image";

const faqs = [
  ["¿Qué es Compás Evolution?", "Es el ecosistema que conecta operación, aprendizaje, creación e inteligencia artificial para que una persona o negocio avance con una ruta coherente."],
  ["¿Puedo contratar solamente una solución?", "Sí. Puedes comenzar con Compás One, Academy, Creators o IA según tu necesidad y después conectar más capacidades."],
  ["¿Necesito saber de tecnología?", "No. El enfoque es acompañarte desde la necesidad y configurar la solución para que puedas usarla con claridad."],
  ["¿Pueden crear mi página, curso o academia?", "Sí. Compás Creators acompaña la estructura, diseño y desarrollo de proyectos editoriales y digitales."],
  ["¿Los agentes reemplazan a una persona?", "No necesariamente. Los agentes atienden, clasifican y dan seguimiento; cuando se requiere verificación, autorización o criterio humano, el caso puede escalarse."],
  ["¿Cómo se utiliza mi información?", "Los datos se usan para atender la solicitud, mantener continuidad y operar los servicios conforme al Aviso de Privacidad y la política de uso de IA y datos."],
];

const testimonials = [
  {
    name: "Guadalupe",
    project: "ETERNI",
    role: "Fundadora",
    initials: "G",
    quote: "Con Proyecto Compás logramos transformar nuestras ideas en una experiencia digital mucho más ordenada. La academia, los contenidos y la identidad de ETERNI comenzaron a sentirse como partes de un mismo proyecto y no como esfuerzos separados.",
  },
  {
    name: "Astrid",
    project: "ASTRA Retiro",
    role: "Especialista en retiro y pensión",
    initials: "A",
    quote: "El desarrollo de ASTRA Retiro me ayudó a presentar mis servicios de una manera más clara y profesional. Ahora la página orienta mejor a las personas desde el primer contacto y facilita que cada prospecto llegue con una necesidad mucho más definida.",
  },
  {
    name: "Angélica",
    project: "AG Business Networking",
    role: "Dirección académica",
    initials: "AG",
    quote: "Necesitábamos que nuestros alumnos tuvieran una experiencia de aprendizaje más organizada. Con la academia pudimos estructurar cursos, evaluaciones, recursos y soporte dentro de una ruta más sencilla de seguir para nuestros estudiantes.",
  },
  {
    name: "Yamilet",
    project: "Marca personal Yamilet",
    role: "Autora y creadora de contenidos",
    initials: "Y",
    quote: "El acompañamiento me permitió convertir mi experiencia y mis ideas en una presencia digital con mayor dirección. Más que construir una página, fuimos organizando una plataforma capaz de presentar mis libros, cursos y proyectos con una misma identidad.",
  },
];

export default function HomeGrowth() {
  return (
    <>
      <div className="productGrid growthProductGrid">
        <article className="productCard creatorsCard">
          <div className="productTop">
            <Image src="/brand/compas-creators-logo.svg" alt="Compás Creators" width={512} height={512} />
            <span>CREACIÓN</span>
          </div>
          <div className="productCopy">
            <p className="productKicker">De experiencia a proyecto</p>
            <h3>Convierte lo que sabes<br />en algo que pueda crecer.</h3>
            <p>Transformamos ideas, historias y conocimiento en libros, cursos, páginas, academias y productos digitales con estructura.</p>
            <ul><li>Dirección y estructura</li><li>Diseño y desarrollo</li><li>Ruta de publicación y lanzamiento</li></ul>
            <a href="/compas-creators">Conocer Compás Creators <span aria-hidden="true">→</span></a>
          </div>
        </article>

        <article className="productCard iaCard">
          <div className="productTop">
            <Image src="/brand/compas-ia-logo.svg" alt="Compás IA" width={512} height={512} />
            <span>INTELIGENCIA ARTIFICIAL</span>
          </div>
          <div className="productCopy">
            <p className="productKicker">Agentes con función y contexto</p>
            <h3>Atiende, orienta<br />y da seguimiento.</h3>
            <p>Configura agentes especializados en ventas, soporte y seguimiento conectados al conocimiento y procesos de cada negocio.</p>
            <ul><li>Ventas y calificación</li><li>Soporte y resolución</li><li>Seguimiento y continuidad</li></ul>
            <a href="/compas-ia">Conocer Compás IA <span aria-hidden="true">→</span></a>
          </div>
        </article>
      </div>

      <section className="growthSection alt" id="agentes">
        <div className="shell">
          <div className="growthHeader"><div><p className="eyebrow dark"><span /> Atención inteligente</p><h2>El agente correcto para cada momento.</h2></div><p>En lugar de enviar a todas las personas al mismo canal, cada solicitud se dirige según su intención y puede escalarse cuando necesita intervención humana.</p></div>
          <div className="agentGrid">
            <article className="agentCard"><span>VENTAS</span><h3>Agente de Ventas</h3><p>Identifica la necesidad, explica soluciones, califica la oportunidad y propone el siguiente paso.</p><a href="#agente-ventas" data-compas-agent="sales">Hablar con ventas →</a></article>
            <article className="agentCard"><span>SOPORTE</span><h3>Agente de Soporte</h3><p>Prioriza accesos, funcionamiento, incidencias y dudas de uso sin convertir cada conversación en una venta.</p><a href="#agente-soporte" data-compas-agent="support">Solicitar soporte →</a></article>
            <article className="agentCard"><span>SEGUIMIENTO</span><h3>Agente de Seguimiento</h3><p>Continúa propuestas, proyectos, citas o pendientes desde el punto en que se quedaron.</p><a href="#agente-seguimiento" data-compas-agent="followup">Dar seguimiento →</a></article>
          </div>
        </div>
      </section>

      <section className="growthSection" id="casos">
        <div className="shell">
          <div className="growthHeader"><div><p className="eyebrow dark"><span /> Casos en acción</p><h2>Soluciones construidas alrededor de una necesidad real.</h2></div><p>El valor no está en repetir una plantilla, sino en conectar página, experiencia, contenido y operación de acuerdo con cada proyecto.</p></div>
          <div className="caseGrid">
            <article className="caseCard"><span>ETERNI</span><h3>Marca + academia</h3><p>Experiencia digital para contenidos, cursos, recursos y acompañamiento dentro de una misma identidad.</p><a href="#agente-ventas" data-compas-agent="sales" data-compas-product="creators">Quiero una solución similar →</a></article>
            <article className="caseCard"><span>ASTRA RETIRO</span><h3>Orientación + captación</h3><p>Página enfocada en explicar servicios, orientar al visitante y conectar el prospecto con el seguimiento operativo.</p><a href="#agente-ventas" data-compas-agent="sales" data-compas-product="compas-one">Quiero una solución similar →</a></article>
            <article className="caseCard"><span>AG BUSINESS</span><h3>Academia + soporte</h3><p>Experiencia académica estructurada para cursos, evaluaciones, recursos y soporte técnico de los alumnos.</p><a href="#agente-ventas" data-compas-agent="sales" data-compas-product="compas-academy">Quiero una solución similar →</a></article>
          </div>
        </div>
      </section>

      <section className="growthSection testimonialSection" id="experiencias">
        <div className="shell">
          <div className="growthHeader testimonialHeader">
            <div><p className="eyebrow dark"><span /> Experiencias del ecosistema</p><h2>Proyectos que tomaron forma con una ruta más clara.</h2></div>
            <p>Estos textos son borradores editoriales de testimonio y deben ser validados por cada cliente antes de considerarse testimonios definitivos.</p>
          </div>
          <div className="testimonialGrid">
            {testimonials.map((item) => (
              <article className="testimonialCard" key={item.project}>
                <div className="testimonialMark">“</div>
                <p className="testimonialQuote">{item.quote}</p>
                <div className="testimonialPerson">
                  <div className="testimonialAvatar" aria-hidden="true">{item.initials}</div>
                  <div><strong>{item.name}</strong><span>{item.role} · {item.project}</span></div>
                </div>
                <small>Texto preliminar · sujeto a aprobación</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="growthSection alt" id="preguntas">
        <div className="shell">
          <div className="growthHeader"><div><p className="eyebrow dark"><span /> Preguntas frecuentes</p><h2>Antes de comenzar.</h2></div><p>Respuestas rápidas para entender cómo funciona el ecosistema y cuál puede ser el siguiente paso.</p></div>
          <div className="faqGrid">{faqs.map(([q,a]) => <details className="faqItem" key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
          <div className="trustStrip"><a href="/privacidad">Aviso de Privacidad</a><a href="/terminos">Términos y Condiciones</a><a href="/cookies">Política de Cookies</a><a href="/ia-y-datos">Uso de IA y Datos</a></div>
        </div>
      </section>
    </>
  );
}
