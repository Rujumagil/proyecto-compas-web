import LegalPage from "../components/legal-page";

export const metadata = {
  title: "Aviso de Privacidad",
  description: "Aviso de privacidad del sitio Proyecto Compás y sus canales de atención digital.",
  alternates: { canonical: "/privacidad" },
};

export default function Page() {
  return (
    <LegalPage title="Aviso de Privacidad" intro="Información sobre los datos que utilizamos para atender solicitudes, dar seguimiento y operar nuestros servicios digitales.">
      <p className="legalNote">Última actualización: 18 de agosto de 2026. Este aviso aplica al sitio proyectocompas.com y a los formularios y agentes de atención integrados en él.</p>
      <h2>Responsable y contacto</h2>
      <p><strong>ASTRID ANDREA ARAIZA RINCON</strong>, titular legal y fiscal vinculada a la operación de Proyecto Compás / Compás Evolution, es la responsable del tratamiento de los datos personales recabados a través de este sitio y de sus canales digitales de atención. Para asuntos de privacidad puedes escribir a <a href="mailto:proyectocompas.info@gmail.com">proyectocompas.info@gmail.com</a>. La información de titularidad y domicilio se encuentra disponible en <a href="/informacion-legal">Información legal</a>.</p>
      <h2>Datos que podemos recabar</h2>
      <p>Dependiendo de la interacción, podemos solicitar nombre, correo electrónico, teléfono, empresa o proyecto y el contenido de la conversación. El chat también puede registrar información técnica necesaria para mantener la sesión, como la página desde la que se inició la atención y un identificador de sesión.</p>
      <h2>Finalidades</h2>
      <ul>
        <li>Responder solicitudes de información, soporte, ventas o seguimiento.</li>
        <li>Identificar la solución, producto o servicio sobre el que solicitas orientación.</li>
        <li>Dar continuidad a conversaciones, propuestas, proyectos, citas o incidencias.</li>
        <li>Operar, proteger y mejorar nuestros servicios y canales digitales.</li>
        <li>Cumplir obligaciones legales o atender requerimientos de autoridad cuando resulte aplicable.</li>
      </ul>
      <h2>Inteligencia artificial y automatización</h2>
      <p>Algunas interacciones pueden ser procesadas mediante automatización e inteligencia artificial para clasificar la solicitud, generar respuestas, recuperar información de una base de conocimiento o dirigir el caso al área adecuada. Cuando un caso requiera intervención humana, verificación adicional o una decisión que no deba ser automatizada, podrá escalarse a una persona.</p>
      <h2>Transferencias y proveedores</h2>
      <p>Podemos utilizar proveedores tecnológicos para alojamiento, operación de la plataforma, bases de datos, comunicaciones y automatización. Estos proveedores reciben únicamente la información necesaria para prestar sus servicios y deben tratarla conforme a las instrucciones y medidas aplicables.</p>
      <h2>Conservación</h2>
      <p>Los datos se conservan durante el tiempo necesario para atender la finalidad que motivó su obtención, mantener continuidad operativa, cumplir obligaciones y resolver posibles responsabilidades. Posteriormente se eliminan, anonimizan o bloquean según corresponda.</p>
      <h2>Derechos sobre tus datos</h2>
      <p>Puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento de tus datos, así como revocar tu consentimiento cuando proceda. Envía tu solicitud al correo indicado, incluyendo tu nombre, medio para recibir respuesta, una descripción clara de tu solicitud y la información necesaria para localizar los datos relacionados.</p>
      <h2>Cambios al aviso</h2>
      <p>Podremos actualizar este aviso para reflejar cambios legales, tecnológicos u operativos. La versión vigente se mantendrá disponible en esta página.</p>
    </LegalPage>
  );
}
