const faqs = [
  ["¿Qué es Compás Evolution?", "Es el ecosistema que conecta operación, aprendizaje, creación e inteligencia artificial para que una persona o negocio avance con una ruta coherente."],
  ["¿Puedo contratar solamente una solución?", "Sí. Puedes comenzar con Compás One, Compás Academy, Compás Creators o Compás IA según tu necesidad y después conectar más capacidades."],
  ["¿Necesito saber de tecnología?", "No. El enfoque es acompañarte desde la necesidad y configurar la solución para que puedas usarla con claridad."],
  ["¿Pueden crear mi página, curso o academia?", "Sí. Compás Creators acompaña la estructura, diseño y desarrollo de proyectos editoriales y digitales."],
  ["¿Los agentes reemplazan a una persona?", "No necesariamente. Los agentes atienden, clasifican y dan seguimiento; cuando se requiere verificación, autorización o criterio humano, el caso puede escalarse."],
  ["¿Cómo se utiliza mi información?", "Los datos se usan para atender la solicitud, mantener continuidad y operar los servicios conforme al Aviso de Privacidad y la política de uso de IA y datos."],
];

const projectHighlights = [
  {
    project: "ETERNI",
    label: "Marca + academia + contenidos",
    summary: "Integración de identidad, contenidos, cursos y recursos dentro de una experiencia digital conectada.",
    result: "Una estructura única para presentar y operar distintas líneas del proyecto.",
  },
  {
    project: "ASTRA Retiro",
    label: "Orientación + captación + seguimiento",
    summary: "Página especializada para explicar servicios, orientar al visitante y conectar prospectos con Compás One.",
    result: "Captación y seguimiento con rutas diferenciadas para pensión, AFORE, protección y especialistas.",
  },
  {
    project: "AG Business Networking",
    label: "Academia + evaluaciones + soporte",
    summary: "Experiencia académica organizada alrededor de cursos, evaluaciones, recursos y atención al alumno.",
    result: "Una ruta formativa más clara y preparada para operación académica digital.",
  },
  {
    project: "Yamilet Pérez",
    label: "Marca personal + academia",
    summary: "Presencia digital conectada con libros, cursos, comunidad y una academia propia.",
    result: "Una base digital capaz de crecer con nuevos contenidos y experiencias formativas.",
  },
];

export default function HomeGrowth() {
  return (
    <>
      <section className="growthSection alt" id="agentes">
        <div className="shell">
          <div className="growthHeader">
            <div><p className="eyebrow dark"><span /> Atención inteligente</p><h2>El agente correcto para cada momento.</h2></div>
            <p>En lugar de enviar a todas las personas al mismo canal, cada solicitud se dirige según su intención y puede escalarse cuando necesita intervención humana.</p>
          </div>
          <div className="agentGrid">
            <article className="agentCard"><span>VENTAS</span><h3>Agente de Ventas</h3><p>Identifica la necesidad, explica soluciones, califica la oportunidad y propone el siguiente paso.</p><a href="#agente-ventas" data-compas-agent="sales">Hablar con ventas →</a></article>
            <article className="agentCard"><span>SOPORTE</span><h3>Agente de Soporte</h3><p>Prioriza accesos, funcionamiento, incidencias y dudas de uso sin convertir cada conversación en una venta.</p><a href="#agente-soporte" data-compas-agent="support">Solicitar soporte →</a></article>
            <article className="agentCard"><span>SEGUIMIENTO</span><h3>Agente de Seguimiento</h3><p>Continúa propuestas, proyectos, citas o pendientes desde el punto en que se quedaron.</p><a href="#agente-seguimiento" data-compas-agent="followup">Dar seguimiento →</a></article>
          </div>
        </div>
      </section>

      <section className="growthSection" id="casos">
        <div className="shell">
          <div className="growthHeader">
            <div><p className="eyebrow dark"><span /> Casos en acción</p><h2>Soluciones construidas alrededor de una necesidad real.</h2></div>
            <p>El valor no está en repetir una plantilla, sino en conectar página, experiencia, contenido y operación de acuerdo con cada proyecto.</p>
          </div>
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
            <div><p className="eyebrow dark"><span /> Proyectos en evolución</p><h2>Qué se ha construido en cada proyecto.</h2></div>
            <div className="sectionAside">
              <p>Resumen de soluciones y avances observables. Los testimonios personales se publicarán únicamente cuando hayan sido aprobados por cada cliente.</p>
              <span className="reelHint">Desliza para recorrer →</span>
            </div>
          </div>
          <div className="horizontalReel testimonialReel" aria-label="Avances de proyectos del ecosistema">
            {projectHighlights.map((item) => (
              <article className="testimonialCard" key={item.project}>
                <div className="testimonialMark" aria-hidden="true">↗</div>
                <p className="testimonialQuote">{item.summary}</p>
                <div className="testimonialPerson">
                  <div className="testimonialAvatar" aria-hidden="true">{item.project.charAt(0)}</div>
                  <div><strong>{item.project}</strong><span>{item.label}</span></div>
                </div>
                <small>{item.result}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="growthSection alt" id="preguntas">
        <div className="shell">
          <div className="growthHeader"><div><p className="eyebrow dark"><span /> Preguntas frecuentes</p><h2>Antes de comenzar.</h2></div><p>Respuestas rápidas para entender cómo funciona el ecosistema y cuál puede ser el siguiente paso.</p></div>
          <div className="faqGrid">{faqs.map(([q, a]) => <details className="faqItem" key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
          <div className="trustStrip"><a href="/privacidad">Aviso de Privacidad</a><a href="/terminos">Términos y Condiciones</a><a href="/cookies">Política de Cookies</a><a href="/ia-y-datos">Uso de IA y Datos</a></div>
        </div>
      </section>
    </>
  );
}
