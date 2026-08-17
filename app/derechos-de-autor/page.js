import LegalPage from "../components/legal-page";

export const metadata = {
  title: "Derechos de Autor | Compás Evolution",
  description: "Información sobre propiedad intelectual y uso de contenidos de Proyecto Compás.",
  alternates: { canonical: "/derechos-de-autor" },
};

export default function Page() {
  return (
    <LegalPage title="Derechos de Autor y Propiedad Intelectual" intro="Condiciones generales para el uso de marcas, contenidos, metodologías, diseños y materiales publicados por Proyecto Compás.">
      <p className="legalNote">Última actualización: 17 de agosto de 2026.</p>
      <h2>Contenidos propios</h2>
      <p>Los nombres, logotipos, identidad visual, textos, interfaces, materiales editoriales, estructuras de cursos, metodologías, recursos gráficos y demás contenidos propios de Proyecto Compás / Compás Evolution están protegidos por la legislación aplicable.</p>
      <h2>Usos permitidos</h2>
      <p>Puedes consultar y utilizar el contenido para fines personales, informativos o para recibir los servicios contratados. Cualquier uso comercial, redistribución, adaptación, publicación o reproducción sustancial requiere autorización previa cuando no exista una licencia expresa que lo permita.</p>
      <h2>Material de clientes y terceros</h2>
      <p>Las marcas, fotografías, libros, cursos y materiales de clientes o terceros mostrados como ejemplos conservan los derechos de sus respectivos titulares. Su aparición en el sitio no implica cesión de derechos.</p>
      <h2>Trabajos realizados para clientes</h2>
      <p>La titularidad, licencias y alcance de uso de entregables creados dentro de un proyecto se determinarán por la propuesta, contrato o acuerdo específico correspondiente.</p>
      <h2>Solicitudes</h2>
      <p>Para reportar un posible uso no autorizado o solicitar permiso, escribe a <a href="mailto:proyectocompas.info@gmail.com">proyectocompas.info@gmail.com</a>.</p>
    </LegalPage>
  );
}
