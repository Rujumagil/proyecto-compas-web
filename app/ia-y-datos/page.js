import LegalPage from "../components/legal-page";

export const metadata = {
  title: "Uso de IA y Datos",
  description: "Principios de uso de inteligencia artificial y datos en los agentes de atención de Compás Evolution.",
  alternates: { canonical: "/ia-y-datos" },
};

export default function Page() {
  return (
    <LegalPage title="Uso de Inteligencia Artificial y Datos" intro="Principios para que nuestros agentes inteligentes ayuden sin ocultar su función, invadir la privacidad ni sustituir decisiones que requieren una persona.">
      <p className="legalNote">Última actualización: 17 de agosto de 2026.</p>
      <h2>Para qué utilizamos IA</h2>
      <p>Utilizamos inteligencia artificial para orientar, responder preguntas frecuentes, clasificar solicitudes, recuperar información autorizada, apoyar ventas, resolver soporte inicial y dar seguimiento a conversaciones o pendientes.</p>
      <h2>Contexto y especialización</h2>
      <p>Los agentes pueden recibir contexto sobre la página, producto o tipo de atención seleccionado —por ejemplo ventas, soporte o seguimiento— para evitar respuestas genéricas y dirigir mejor la conversación.</p>
      <h2>Límites</h2>
      <ul><li>Un agente no debe inventar información que no pueda verificar.</li><li>No debe presentar una respuesta automatizada como una confirmación contractual.</li><li>No debe solicitar datos sensibles que no sean necesarios para la finalidad de la conversación.</li><li>Debe escalar a una persona cuando el caso requiera verificación, autorización o intervención humana.</li></ul>
      <h2>Revisión humana</h2>
      <p>Las personas pueden intervenir en conversaciones, corregir información, continuar un caso o asumir el control cuando la situación lo requiera.</p>
      <h2>Uso de conversaciones</h2>
      <p>Las conversaciones y datos relacionados se utilizan para atender la solicitud, mantener continuidad, operar el servicio y mejorar los procesos internos conforme al Aviso de Privacidad.</p>
      <h2>Contacto</h2>
      <p>Si consideras que una respuesta automatizada fue incorrecta o requiere revisión, utiliza el agente de soporte o escribe a <a href="mailto:proyectocompas.info@gmail.com">proyectocompas.info@gmail.com</a>.</p>
    </LegalPage>
  );
}
