(() => {
  "use strict";

  const AVATAR_SRC = "/agente-compas.webp";
  const HOST_SELECTOR = "compas-one-web-chat";
  let initialized = false;

  function applyIdentity() {
    if (initialized) return true;

    const host = document.querySelector(HOST_SELECTOR);
    if (!host || !host.shadowRoot) return false;

    const shadow = host.shadowRoot;
    const root = shadow.querySelector(".root");
    const launcher = shadow.querySelector(".launcher");
    const panel = shadow.querySelector(".panel");
    const title = shadow.querySelector(".header strong");
    const subtitle = shadow.querySelector(".header small");

    if (!root || !launcher || !panel) return false;

    initialized = true;

    const style = document.createElement("style");
    style.textContent = `
      .launcher {
        width: 72px !important;
        height: 72px !important;
        padding: 0 !important;
        border-radius: 24px !important;
        overflow: hidden !important;
        border: 1px solid rgba(212, 175, 55, .55) !important;
        background: linear-gradient(145deg, #142d3f, #244d60) !important;
        box-shadow: 0 20px 55px rgba(8, 28, 43, .32), 0 0 0 5px rgba(212, 175, 55, .08) !important;
      }
      .launcher:hover { transform: translateY(-3px) scale(1.02) !important; }
      .launcher .compas-agent-avatar {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: 50% 12% !important;
        display: block !important;
      }
      .panel {
        border-color: rgba(42, 75, 104, .18) !important;
        box-shadow: 0 28px 80px rgba(10, 31, 47, .28) !important;
      }
      .header {
        background: linear-gradient(135deg, #203f57 0%, #315f63 72%, #7b6a32 140%) !important;
      }
      .compas-agent-intro {
        position: absolute;
        right: 0;
        bottom: 88px;
        width: min(300px, calc(100vw - 28px));
        padding: 14px;
        display: grid;
        grid-template-columns: 54px 1fr;
        gap: 12px;
        align-items: center;
        border-radius: 18px;
        background: rgba(255, 253, 248, .98);
        border: 1px solid rgba(42, 75, 104, .16);
        box-shadow: 0 20px 55px rgba(8, 28, 43, .20);
        color: #173247;
        animation: compasAgentIn .35s ease both;
      }
      .compas-agent-intro img {
        width: 54px;
        height: 54px;
        object-fit: cover;
        object-position: 50% 12%;
        border-radius: 16px;
        background: #203f57;
      }
      .compas-agent-intro strong {
        display: block;
        margin-bottom: 4px;
        font-size: 13px;
        line-height: 1.2;
        color: #173247;
      }
      .compas-agent-intro p {
        margin: 0;
        font-size: 12px;
        line-height: 1.45;
        color: #587080;
      }
      .compas-agent-intro button {
        grid-column: 1 / -1;
        border: 0;
        border-radius: 12px;
        padding: 10px 12px;
        background: #294e67;
        color: #fff;
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
      }
      @keyframes compasAgentIn {
        from { opacity: 0; transform: translateY(8px) scale(.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @media (max-width: 520px) {
        .launcher { width: 64px !important; height: 64px !important; border-radius: 21px !important; }
        .compas-agent-intro { right: 0; bottom: 78px; width: min(286px, calc(100vw - 24px)); }
      }
    `;
    shadow.appendChild(style);

    launcher.innerHTML = `<img class="compas-agent-avatar" src="${AVATAR_SRC}" alt="Agente Comercial Compás">`;
    launcher.setAttribute("aria-label", "Hablar con el Agente Comercial Compás");

    if (title) title.textContent = "Agente Comercial Compás";
    if (subtitle) subtitle.textContent = "Proyecto Compás Evolution · En línea";
    panel.setAttribute("aria-label", "Agente Comercial de Proyecto Compás");

    const intro = document.createElement("div");
    intro.className = "compas-agent-intro";
    intro.innerHTML = `
      <img src="${AVATAR_SRC}" alt="">
      <div>
        <strong>Hola, soy el Agente Compás</strong>
        <p>Cuéntame qué quieres crear, mejorar u organizar y te ayudo a encontrar la mejor ruta.</p>
      </div>
      <button type="button">Iniciar conversación</button>
    `;
    root.appendChild(intro);

    const introButton = intro.querySelector("button");
    introButton?.addEventListener("click", () => {
      intro.remove();
      launcher.click();
    });

    launcher.addEventListener("click", () => {
      if (intro.isConnected) intro.remove();
    });

    window.setTimeout(() => {
      if (intro.isConnected) intro.remove();
    }, 14000);

    const observer = new MutationObserver(() => {
      const formTitle = shadow.querySelector(".form h3");
      const formText = shadow.querySelector(".form p");
      const headerTitle = shadow.querySelector(".header strong");
      const headerSubtitle = shadow.querySelector(".header small");

      if (headerTitle) headerTitle.textContent = "Agente Comercial Compás";
      if (headerSubtitle) headerSubtitle.textContent = "Proyecto Compás Evolution · En línea";
      if (formTitle) formTitle.textContent = "Antes de comenzar";
      if (formText) {
        formText.textContent = "Déjame un medio de contacto para registrar tu conversación y poder dar seguimiento a tu proyecto.";
      }
    });

    observer.observe(shadow, { childList: true, subtree: true });
    return true;
  }

  if (applyIdentity()) return;

  const pageObserver = new MutationObserver(() => {
    if (applyIdentity()) pageObserver.disconnect();
  });

  pageObserver.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => pageObserver.disconnect(), 20000);
})();
