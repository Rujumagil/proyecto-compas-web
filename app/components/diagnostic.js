"use client";

import { useMemo, useState } from "react";

const products = {
  one: { name: "Compás One", href: "/compas-one", product: "compas-one", text: "Ordena clientes, conversaciones, agenda, seguimiento y procesos en una sola operación." },
  academy: { name: "Compás Academy", href: "/compas-academy", product: "compas-academy", text: "Construye una ruta de aprendizaje clara para desarrollar capacidades y aplicar lo aprendido." },
  creators: { name: "Compás Creators", href: "/compas-creators", product: "compas-creators", text: "Convierte experiencia, conocimiento o una historia en un proyecto que pueda publicarse y crecer." },
  ia: { name: "Compás IA", href: "/compas-ia", product: "compas-ia", text: "Incorpora agentes especializados para atender, vender, resolver soporte y dar seguimiento." },
};

const questions = [
  { title: "¿Qué quieres lograr primero?", options: [
    ["Ordenar mi negocio y clientes", "one"], ["Aprender o capacitar a mi equipo", "academy"], ["Crear un libro, curso, página o academia", "creators"], ["Automatizar atención y seguimiento", "ia"],
  ]},
  { title: "¿Cuál es tu principal freno hoy?", options: [
    ["Pierdo prospectos o pendientes", "one"], ["Me falta una ruta clara para aprender", "academy"], ["Tengo ideas pero no logro estructurarlas", "creators"], ["Respondo lo mismo muchas veces", "ia"],
  ]},
  { title: "¿Qué resultado te daría más valor?", options: [
    ["Ver toda mi operación en un solo lugar", "one"], ["Tener cursos y recursos organizados", "academy"], ["Publicar y presentar mi proyecto", "creators"], ["Tener agentes que atiendan 24/7", "ia"],
  ]},
  { title: "¿En qué punto estás?", options: [
    ["Ya atiendo clientes y quiero profesionalizarme", "one"], ["Necesito desarrollar habilidades o contenidos", "academy"], ["Tengo experiencia o una idea que quiero convertir", "creators"], ["Ya tengo procesos y quiero hacerlos más eficientes", "ia"],
  ]},
  { title: "¿Cómo prefieres empezar?", options: [
    ["Con una herramienta operativa", "one"], ["Con una ruta de aprendizaje", "academy"], ["Con acompañamiento para construir", "creators"], ["Con un agente especializado", "ia"],
  ]},
];

export default function Diagnostic() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const result = useMemo(() => {
    const score = { one: 0, academy: 0, creators: 0, ia: 0 };
    answers.forEach((answer) => { if (score[answer] !== undefined) score[answer] += 1; });
    return Object.keys(score).sort((a,b) => score[b] - score[a])[0] || "one";
  }, [answers]);

  function choose(value) {
    const next = [...answers, value];
    setAnswers(next);
    if (step >= questions.length - 1) setFinished(true);
    else setStep(step + 1);
  }

  function reset() { setStep(0); setAnswers([]); setFinished(false); }

  const recommendation = products[result];
  const progress = finished ? 100 : Math.round((step / questions.length) * 100);

  return (
    <section className="finderSection diagnosticSection" id="elige">
      <div className="shell finderGrid">
        <div className="finderIntro">
          <p className="eyebrow light"><span /> Diagnóstico Compás</p>
          <h2>Encuentra una ruta según tu momento.</h2>
          <p>Responde cinco preguntas. No te pediremos datos personales para mostrarte una recomendación inicial.</p>
          <div className="diagProgress" aria-label={`Progreso ${progress}%`}><i style={{ width: `${progress}%` }} /></div>
          <small>{finished ? "Diagnóstico completado" : `Pregunta ${step + 1} de ${questions.length}`}</small>
        </div>

        <div className="finderPanel diagnosticPanel">
          {!finished ? (
            <>
              <p className="panelLabel">DIAGNÓSTICO · PASO {step + 1}</p>
              <h3 className="diagQuestion">{questions[step].title}</h3>
              <div className="choiceList">
                {questions[step].options.map(([label, value]) => (
                  <button key={label} type="button" onClick={() => choose(value)}><span>{label}</span><b>→</b></button>
                ))}
              </div>
              {step > 0 ? <button className="resetButton" type="button" onClick={reset}>Reiniciar diagnóstico</button> : null}
            </>
          ) : (
            <div className="recommendation" aria-live="polite">
              <p className="panelLabel">RUTA RECOMENDADA</p>
              <h3>{recommendation.name}</h3>
              <p>{recommendation.text}</p>
              <div className="diagActions">
                <a className="button buttonPrimary" href={recommendation.href}>Conocer {recommendation.name} →</a>
                <a className="diagAgentLink" href="#agente-ventas" data-compas-agent="sales" data-compas-product={recommendation.product}>Hablar con ventas sobre esta ruta</a>
              </div>
              <button className="resetButton" type="button" onClick={reset}>Hacer el diagnóstico de nuevo</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
