(() => {
  "use strict";

  if (window.__compasAgentLoaderInstalled) return;
  window.__compasAgentLoaderInstalled = true;

  const CHAT_SRC = "https://app.proyectocompas.com/compas-chat.js";
  const KEY = "wc_775408ca243abfea3d5ec95025e3c2d9bdbb";
  let started = false;

  function loadScript(src, attrs = {}) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
      document.body.appendChild(script);
    });
  }

  async function start() {
    if (started) return;
    started = true;

    try {
      await loadScript(CHAT_SRC, { "data-key": KEY });
      await loadScript("/agent-context.js?v=2");
      await loadScript("/agent-compas.js?v=5");
    } catch (error) {
      started = false;
      console.warn("[Compás] El agente no pudo iniciarse. La página seguirá disponible.", error);
    }
  }

  function schedule() {
    window.setTimeout(start, 1400);
  }

  if (document.readyState === "complete") {
    schedule();
  } else {
    window.addEventListener("load", schedule, { once: true });
  }
})();
