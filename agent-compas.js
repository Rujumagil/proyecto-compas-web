(() => {
  "use strict";

  const AVATAR_SRC = "/brand/compas-evolution-halcon.svg";
  const HOST_SELECTOR = "compas-one-web-chat";
  const MAX_BOOT_ATTEMPTS = 32;
  const MAX_SYNC_ATTEMPTS = 12;

  const ROUTES = {
    sales: {
      title: "Agente de Ventas Compás",
      subtitle: "Compás Evolution · Ventas",
      label: "Ventas y orientación",
      description: "Te ayudo a identificar la solución adecuada, resolver dudas comerciales y definir el siguiente paso.",
      formText: "Déjame un medio de contacto para registrar tu conversación y poder dar seguimiento a tu proyecto.",
      placeholder: "Cuéntame qué quieres lograr o qué servicio te interesa...",
    },
    support: {
      title: "Agente de Soporte Compás",
      subtitle: "Compás Evolution · Soporte",
      label: "Soporte y ayuda",
      description: "Te ayudo con accesos, funcionamiento, incidencias y dudas sobre el uso de nuestros servicios.",
      formText: "Déjame un medio de contacto para identificar tu cuenta y dar continuidad al caso si es necesario.",
      placeholder: "Describe el problema o la ayuda que necesitas...",
    },
    followup: {
      title: "Agente de Seguimiento Compás",
      subtitle: "Compás Evolution · Seguimiento",
      label: "Seguimiento",
      description: "Te ayudo a continuar una conversación, proyecto, propuesta, cita o pendiente que ya está en proceso.",
      formText: "Déjame un medio de contacto para localizar tu conversación y continuar desde el punto correcto.",
      placeholder: "Cuéntame qué pendiente, propuesta o proyecto quieres continuar...",
    },
  };

  let initialized = false;
  let activeRoute = "sales";

  function normalizeRoute(value) {
    const route = String(value || "").trim().toLowerCase();
    return Object.prototype.hasOwnProperty.call(ROUTES, route) ? route : "sales";
  }

  function routeFromLink(anchor) {
    if (!anchor) return null;

    const explicit = anchor.dataset.compasAgent;
    if (explicit) return normalizeRoute(explicit);

    const href = String(anchor.getAttribute("href") || "").toLowerCase();
    const text = String(anchor.textContent || "").toLowerCase();

    if (href.includes("#agente-soporte") || /soporte|ayuda|apoyo|problema|incidencia/.test(text)) {
      return "support";
    }

    if (href.includes("#agente-seguimiento") || /seguimiento|continuar|pendiente|estatus|estado de mi/.test(text)) {
      return "followup";
    }

    if (
      href.includes("#agente-ventas") ||
      href.includes("wa.me/") ||
      /orientaci[oó]n|conversemos|desarrollar mi proyecto|m[aá]s informaci[oó]n|cotiza|ventas|asesor/.test(text)
    ) {
      return "sales";
    }

    return null;
  }

  function ensureRouteBanner(shadow) {
    const body = shadow.querySelector(".body");
    const messages = shadow.querySelector(".messages");
    if (!body || !messages) return null;

    let banner = shadow.querySelector(".compas-route-banner");
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "compas-route-banner";
      body.insertBefore(banner, messages);
    }
    return banner;
  }

  function syncCopy(shadow) {
    const route = ROUTES[activeRoute];
    const title = shadow.querySelector(".header strong");
    const subtitle = shadow.querySelector(".header small");
    const formTitle = shadow.querySelector(".form h3");
    const formText = shadow.querySelector(".form p");
    const textarea = shadow.querySelector(".composer textarea");
    const banner = ensureRouteBanner(shadow);

    if (title) title.textContent = route.title;
    if (subtitle) subtitle.textContent = route.subtitle;
    if (formTitle) formTitle.textContent = activeRoute === "support" ? "Para ayudarte mejor" : "Antes de comenzar";
    if (formText) formText.textContent = route.formText;
    if (textarea) textarea.setAttribute("placeholder", route.placeholder);

    if (banner) {
      banner.innerHTML = "";
      const strong = document.createElement("strong");
      strong.textContent = route.label;
      const span = document.createElement("span");
      span.textContent = route.description;
      banner.append(strong, span);
    }
  }

  function signalRoute(route) {
    activeRoute = normalizeRoute(route);
    try {
      window.dispatchEvent(
        new CustomEvent("compas:chat-route", {
          detail: { route: activeRoute },
        }),
      );
    } catch (error) {
      console.warn("No fue posible enviar la ruta al Agente Compás.", error);
    }

    const host = document.querySelector(HOST_SELECTOR);
    if (host?.shadowRoot) syncCopy(host.shadowRoot);
  }

  function openRoute(route) {
    signalRoute(route);

    const host = document.querySelector(HOST_SELECTOR);
    const shadow = host?.shadowRoot;
    if (!shadow) return false;

    syncCopy(shadow);
    const panel = shadow.querySelector(".panel");
    const launcher = shadow.querySelector(".launcher");

    if (launcher && panel && !panel.classList.contains("open")) {
      launcher.click();
    }

    window.setTimeout(() => syncCopy(shadow), 80);
    window.setTimeout(() => syncCopy(shadow), 500);
    return true;
  }

  function installLinkRouting() {
    const salesSelectors = [
      ".portfolioFoot a[href*='wa.me']",
      ".founderCopy a[href*='wa.me']",
      ".ecosystemCopy a[href*='wa.me']",
      ".finalActions a[href*='wa.me']",
    ];

    document.querySelectorAll(salesSelectors.join(",")).forEach((anchor) => {
      anchor.dataset.compasAgent = "sales";
      anchor.setAttribute("href", "#agente-ventas");
      anchor.removeAttribute("target");
      anchor.removeAttribute("rel");
    });

    const footerLinks = document.querySelector(".footerInner > div");
    if (footerLinks && !footerLinks.querySelector("[data-compas-agent='support']")) {
      const sales = document.createElement("a");
      sales.href = "#agente-ventas";
      sales.dataset.compasAgent = "sales";
      sales.textContent = "Ventas";

      const support = document.createElement("a");
      support.href = "#agente-soporte";
      support.dataset.compasAgent = "support";
      support.textContent = "Soporte";

      const followup = document.createElement("a");
      followup.href = "#agente-seguimiento";
      followup.dataset.compasAgent = "followup";
      followup.textContent = "Seguimiento";

      footerLinks.append(sales, support, followup);
    }

    const finalCta = document.querySelector(".finalCta");
    if (finalCta && !finalCta.querySelector(".compasAgentShortcuts")) {
      const shortcuts = document.createElement("div");
      shortcuts.className = "compasAgentShortcuts";
      shortcuts.innerHTML = `
        <span>¿Ya eres cliente?</span>
        <a href="#agente-soporte" data-compas-agent="support">Necesito soporte</a>
        <a href="#agente-seguimiento" data-compas-agent="followup">Dar seguimiento a mi caso</a>
      `;
      finalCta.appendChild(shortcuts);
    }
  }

  function applyIdentity() {
    const host = document.querySelector(HOST_SELECTOR);
    if (!host || !host.shadowRoot) return false;

    const shadow = host.shadowRoot;
    const launcher = shadow.querySelector(".launcher");
    const panel = shadow.querySelector(".panel");

    if (!launcher || !panel) return false;

    if (!initialized) {
      initialized = true;

      try {
        const style = document.createElement("style");
        style.dataset.compasAgentBrand = "v3";
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
          .compas-route-banner {
            margin: 0 0 14px;
            padding: 12px 13px;
            border: 1px solid rgba(18, 53, 91, .14);
            border-radius: 14px;
            background: #F7F9FC;
            color: #111827;
          }
          .compas-route-banner strong,
          .compas-route-banner span { display: block; }
          .compas-route-banner strong {
            color: #12355B;
            font-size: 12px;
            letter-spacing: .02em;
          }
          .compas-route-banner span {
            margin-top: 4px;
            color: #526578;
            font-size: 11px;
            line-height: 1.45;
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
        launcher.setAttribute("aria-label", "Abrir atención de Compás Evolution");
        panel.setAttribute("aria-label", "Atención Compás Evolution");

        const pageStyle = document.createElement("style");
        pageStyle.dataset.compasAgentLinks = "v3";
        pageStyle.textContent = `
          .compasAgentShortcuts {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 18px;
            color: #61717d;
            font-size: .72rem;
          }
          .compasAgentShortcuts span { font-weight: 700; color: #12355B; }
          .compasAgentShortcuts a {
            padding-bottom: 3px;
            border-bottom: 1px solid rgba(18, 53, 91, .35);
            color: #12355B;
            font-weight: 800;
          }
        `;
        document.head.appendChild(pageStyle);
      } catch (error) {
        initialized = false;
        console.warn("No fue posible aplicar la identidad del Agente Compás.", error);
        return false;
      }
    }

    syncCopy(shadow);
    installLinkRouting();

    let syncAttempts = 0;
    const syncTimer = window.setInterval(() => {
      syncAttempts += 1;
      syncCopy(shadow);
      if (syncAttempts >= MAX_SYNC_ATTEMPTS || !host.isConnected) {
        window.clearInterval(syncTimer);
      }
    }, 400);

    return true;
  }

  function handleRoutedClick(event) {
    const anchor = event.target?.closest?.("a");
    if (!anchor) return;

    const route = routeFromLink(anchor);
    if (!route) return;

    const href = String(anchor.getAttribute("href") || "");
    const shouldRoute = Boolean(anchor.dataset.compasAgent) || href.includes("wa.me/") || href.startsWith("#agente-");
    if (!shouldRoute) return;

    event.preventDefault();
    openRoute(route);
  }

  function boot() {
    installLinkRouting();
    document.addEventListener("click", handleRoutedClick);

    const params = new URL(window.location.href).searchParams;
    const requestedRoute = params.get("compas_agent");
    if (requestedRoute) activeRoute = normalizeRoute(requestedRoute);

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
