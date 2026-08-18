import LegalPage from "../components/legal-page";

export const metadata = {
  title: "Información legal",
  description: "Información legal y de titularidad del sitio Proyecto Compás / Compás Evolution.",
  alternates: { canonical: "/informacion-legal" },
};

export default function Page() {
  return (
    <LegalPage
      title="Información legal"
      intro="Datos de identificación y titularidad vinculados al sitio proyectocompas.com y a la identidad comercial Proyecto Compás / Compás Evolution."
    >
      <p className="legalNote">Última actualización: 18 de agosto de 2026.</p>

      <h2>Titular legal y fiscal</h2>
      <p>
        <strong>ASTRID ANDREA ARAIZA RINCON</strong> es la titular legal y fiscal
        identificada para la operación comercial vinculada a este sitio.
      </p>

      <h2>Identidad comercial</h2>
      <p>
        <strong>Proyecto Compás</strong> y <strong>Compás Evolution</strong> son las
        denominaciones de presentación utilizadas en este sitio para identificar el
        ecosistema de servicios, productos y soluciones digitales.
      </p>

      <h2>Domicilio</h2>
      <p>
        REAL DEL VALLE 22 INT 22, VALLE DORADO, TLAJOMULCO DE ZUÑIGA, JALISCO,
        C.P. 45655, MÉXICO.
      </p>

      <h2>Dominio oficial</h2>
      <p>
        El dominio oficial del proyecto es{" "}
        <a href="https://www.proyectocompas.com/">www.proyectocompas.com</a>.
      </p>

      <h2>Contacto</h2>
      <p>
        Para asuntos administrativos o legales relacionados con este sitio puedes
        escribir a{" "}
        <a href="mailto:proyectocompas.info@gmail.com">proyectocompas.info@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
