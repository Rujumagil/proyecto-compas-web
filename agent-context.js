(() => {
  "use strict";

  function syncContext(anchor) {
    if (!anchor) return;
    const route = String(anchor.dataset.compasAgent || "").trim().toLowerCase();
    const product = String(anchor.dataset.compasProduct || "").trim().toLowerCase();
    if (!route && !product) return;

    try {
      const url = new URL(window.location.href);
      if (route) url.searchParams.set("compas_agent", route);
      if (product) url.searchParams.set("compas_product", product);
      const next = `${url.pathname}${url.search}${url.hash || ""}`;
      window.history.replaceState(window.history.state, "", next);
    } catch (error) {
      console.warn("No fue posible registrar el contexto del agente.", error);
    }
  }

  document.addEventListener(
    "click",
    (event) => {
      const anchor = event.target?.closest?.("a[data-compas-agent],a[data-compas-product]");
      if (anchor) syncContext(anchor);
    },
    true,
  );
})();
