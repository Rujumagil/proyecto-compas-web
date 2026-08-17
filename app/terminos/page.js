import LegalPage from "../components/legal-page";

export const metadata = {
  title: "Términos y Condiciones | Compás Evolution",
  description: "Términos de uso del sitio Proyecto Compás y sus servicios digitales.",
  alternates: { canonical: "/terminos" },
};

export default function Page() {
  return (
    <LegalPage title="Términos y Condiciones" intro="Reglas generales para el uso de ProyectoCompas.com y de sus herramientas de orientación, atención y acceso a servicios.">
      <p className="legalNote">Última actualización: 17 de agosto de 2026.</p>
      <h2>Uso del sitio</h2>
      <p>El sitio tiene fines informativos, comerciales y operativos. Puedes utilizarlo para conocer soluciones, solicitar orientación, acceder a plataformas del ecosistema y comunicarte con nuestros agentes de atención.</p>
      <h2>Información y propuestas</h2>
      <p>La información pública del sitio describe capacidades y ejemplos generales. El alcance, precio, tiempo de entrega y condiciones de un servicio se determinan en la propuesta, orden, contrato o acuerdo específico que corresponda.</p>
      <h2>Agentes y respuestas automatizadas</h2>
      <p>Algunas respuestas pueden generarse con inteligencia artificial. Estas respuestas sirven para orientación, clasificación, soporte inicial y seguimiento, y no sustituyen una confirmación contractual, profesional o humana cuando ésta sea necesaria.</p>
      <h2>Servicios de terceros</h2>
      <p>El ecosistema puede enlazar a plataformas externas, servicios de alojamiento, pagos, publicación, mensajería o herramientas de terceros. Sus propios términos y políticas pueden aplicar de manera adicional.</p>
      <h2>Propiedad intelectual</h2>
      <p>La marca, identidad visual, textos, metodologías, interfaces, materiales y demás contenidos propios están protegidos por la legislación aplicable. No se autoriza su reproducción, distribución, modificación o explotación comercial sin autorización, salvo los usos permitidos expresamente.</p>
      <h2>Uso responsable</h2>
      <p>No debes utilizar el sitio para realizar actividades ilícitas, intentar vulnerar su seguridad, extraer información sin autorización, suplantar identidades, introducir código malicioso o interferir con la operación de los servicios.</p>
      <h2>Disponibilidad</h2>
      <p>Trabajamos para mantener los servicios disponibles, pero pueden existir interrupciones por mantenimiento, proveedores externos, fallas técnicas, fuerza mayor o cambios de infraestructura.</p>
      <h2>Contacto</h2>
      <p>Para soporte, aclaraciones o preguntas sobre estos términos, utiliza el agente de soporte del sitio o escribe a <a href="mailto:proyectocompas.info@gmail.com">proyectocompas.info@gmail.com</a>.</p>
    </LegalPage>
  );
}
