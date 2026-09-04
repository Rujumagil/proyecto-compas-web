import LegalPage from "../components/legal-page";

export const metadata = {
  title: "Política de Cookies",
  description: "Política de cookies y almacenamiento técnico utilizado por Proyecto Compás y Compás Evolution.",
  alternates: { canonical: "/cookies" },
};

export default function Page() {
  return (
    <LegalPage title="Política de Cookies" intro="Información sobre almacenamiento técnico utilizado por ProyectoCompas.com.">
      <p className="legalNote">Última actualización: 17 de agosto de 2026.</p>
      <h2>Almacenamiento técnico</h2>
      <p>El sitio y sus herramientas pueden utilizar almacenamiento local, identificadores de sesión y tecnologías equivalentes necesarias para mantener conversaciones y permitir el funcionamiento de componentes integrados.</p>
      <h2>Finalidades</h2>
      <ul><li>Mantener sesiones de atención.</li><li>Recordar configuraciones necesarias.</li><li>Proteger la operación del sitio.</li><li>Permitir integraciones técnicas.</li></ul>
      <h2>Analítica y publicidad</h2>
      <p>Si incorporamos tecnologías no esenciales para analítica, publicidad o personalización, actualizaremos esta política y solicitaremos consentimiento cuando corresponda.</p>
      <h2>Control del navegador</h2>
      <p>Puedes eliminar o bloquear cookies y datos de sitios desde tu navegador. Algunas funciones pueden dejar de operar correctamente.</p>
      <h2>Contacto</h2>
      <p>Escribe a <a href="mailto:proyectocompas.info@gmail.com">proyectocompas.info@gmail.com</a> para preguntas sobre privacidad.</p>
    </LegalPage>
  );
}
