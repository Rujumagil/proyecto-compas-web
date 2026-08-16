const BASE_URL = "https://www.proyectocompas.com";

const pages = [
  ["/", "weekly", 1.0],
  ["/compas-one.html", "weekly", 0.9],
  ["/academia.html", "weekly", 0.9],
  ["/creators.html", "weekly", 0.9],
  ["/compas-ia.html", "weekly", 0.9],
  ["/soluciones.html", "weekly", 0.9],
  ["/casos-de-exito.html", "monthly", 0.8],
  ["/nosotros.html", "monthly", 0.8],
  ["/el-compas-del-estratega.html", "weekly", 0.8],
  ["/aviso-de-privacidad.html", "yearly", 0.3],
  ["/terminos-y-condiciones.html", "yearly", 0.3],
  ["/politica-de-cookies.html", "yearly", 0.2],
  ["/politica-de-uso-de-ia.html", "yearly", 0.3],
  ["/derechos-arco.html", "yearly", 0.2],
  ["/politica-de-cancelacion-y-reembolso.html", "yearly", 0.3],
];

export default function sitemap() {
  const lastModified = new Date("2026-08-14T00:00:00-06:00");

  return pages.map(([path, changeFrequency, priority]) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
