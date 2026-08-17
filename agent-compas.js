(() => {
  "use strict";

  const AVATAR_SRC = "/brand/compas-evolution-halcon.svg";
  const HOST_SELECTOR = "compas-one-web-chat";
  const MAX_BOOT_ATTEMPTS = 32;
  const MAX_SYNC_ATTEMPTS = 12;
  let initialized = false;

  function syncCopy(shadow) {
    const title = shadow.querySelector(".header strong");
    const subtitle = shadow.querySelector(".header small");
    const formTitle = shadow.querySelector(".form h3");
    const formText = shadow.querySelector(".form p");

    if (title) title.textContent = "Agente Comercial Compás";
    if (subtitle) subtitle.textContent = "Compás Evolution · En línea";
    if (formTitle) formTitle.textContent = "Antes de comenzar";
    if (formText) {
      formText.textContent = "Déjame un medio de contacto para registrar tu conversación y poder dar seguimiento a tu proyecto.";
    }
  }

  function applyIdentity() {
    if (initialized) return true;

    const host = document.querySelector(HOST_SELECTOR);
    if (!host || !host.shadowRoot) return false;

    const shadow = host.shadowRoot;
    const launcher = shadow.querySelector(".launcher");
    const panel = shadow.querySelector(".panel");

    if (!launcher || !panel) return false;

    initialized = true;

    try {
      const style = document.createElement("style");
      style.dataset.compasAgentBrand = "v2";
      style.textContent = `
        .launcher {
          width: 66px !important;
          height: 66px !important;
          padding: 8px !important;
          border-radius: 22px !important;
          overflow: hidden !important;
          border: 1px solid rgba(230, 196, 0, .62) !important;
          background: #F7F9FC !important;
          box-shadow: 0 16px 42px rgba(18, 53, 91, .26), 0 0 0 4px rgba(230, 196, 0, .08) !important;
          transform: translateZ(0);
          will-change: auto;
        }
        .launcher:hover { transform: translateY(-2px) !important; }
        .launcher .compas-agent-avatar {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          display: block !important;
          pointer-events: none !important;
        }
        .panel {
          border-color: rgba(18, 53, 91, .18) !important;
          box-shadow: 0 24px 64px rgba(17, 24, 39, .22) !important;
        }
        .header {
          background: linear-gradient(135deg, #12355B 0%, #3F6F9F 100%) !important;
        }
        @media (max-width: 520px) {
          .launcher {
            width: 58px !important;
            height: 58px !important;
            padding: 7px !important;
            border-radius: 19px !important;
            box-shadow: 0 12px 30px rgba(18, 53, 91, .22), 0 0 0 3px rgba(230, 196, 0, .07) !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .launcher { transition: none !important; transform: none !important; }
        }
      `;
      shadow.appendChild(style);

      launcher.replaceChildren();
      const avatar = document.createElement("img");
      avatar.className = "compas-agent-avatar";
      avatar.src = AVATAR_SRC;
      avatar.alt = "Halcón de Compás Evolution";
      avatar.decoding = "async";
      launcher.appendChild(avatar);
      launcher.setAttribute("aria-label", "Hablar con el Agente Comercial Compás");
      panel.setAttribute("aria-label", "Agente Comercial Compás");

      syncCopy(shadow);

      let syncAttempts = 0;
      const syncTimer = window.setInterval(() => {
        syncAttempts += 1;
        syncCopy(shadow);
        if (syncAttempts >= MAX_SYNC_ATTEMPTS || !host.isConnected) {
          window.clearInterval(syncTimer);
        }
      }, 400);

      return true;
    } catch (error) {
      initialized = false;
      console.warn("No fue posible aplicar la identidad del Agente Compás.", error);
      return false;
    }
  }

  function boot() {
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (applyIdentity() || attempts >= MAX_BOOT_ATTEMPTS) {
        window.clearInterval(timer);
      }
    }, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
