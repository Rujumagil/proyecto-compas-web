(function () {
  "use strict";

  var config = window.COMPAS_TRACKING_CONFIG || {};
  window.dataLayer = window.dataLayer || [];

  function push(eventName, params) {
    var payload = Object.assign(
      {
        event: eventName,
        page_path: window.location.pathname,
        page_location: window.location.href,
      },
      params || {}
    );
    window.dataLayer.push(payload);
  }

  function loadGtm() {
    var gtmId = String(config.gtmId || "").trim();
    if (!/^GTM-[A-Z0-9]+$/i.test(gtmId)) return;
    if (document.querySelector('script[data-compas-gtm="' + gtmId + '"]')) return;

    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(gtmId);
    script.setAttribute("data-compas-gtm", gtmId);
    document.head.appendChild(script);
  }

  function normalizedText(element) {
    return String((element && element.textContent) || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);
  }

  function classifyLink(anchor) {
    var href = anchor.getAttribute("href") || "";
    var url;
    try {
      url = new URL(href, window.location.href);
    } catch (_) {
      return null;
    }

    var host = url.hostname.toLowerCase();
    var path = url.pathname.toLowerCase();
    var protocol = url.protocol.toLowerCase();

    if (anchor.dataset.analyticsEvent) {
      return {
        event: anchor.dataset.analyticsEvent,
        extra: {
          analytics_label: anchor.dataset.analyticsLabel || normalizedText(anchor),
        },
      };
    }

    if (protocol === "tel:") return { event: "phone_click" };
    if (protocol === "mailto:") return { event: "email_click" };

    if (
      host === "wa.me" ||
      host === "api.whatsapp.com" ||
      host.endsWith(".whatsapp.com") ||
      host === "whatsapp.com"
    ) {
      return { event: "whatsapp_click" };
    }

    if (host === "app.proyectocompas.com") {
      return { event: "compas_one_access_click" };
    }

    if (host === "aula.proyectocompas.com") {
      return { event: "academy_access_click" };
    }

    var solutions = ["compas-one", "compas-academy", "compas-creators", "compas-ia"];
    for (var i = 0; i < solutions.length; i += 1) {
      if (path.indexOf("/" + solutions[i]) === 0) {
        return {
          event: "solution_cta_click",
          extra: { solution: solutions[i] },
        };
      }
    }

    if (host && host !== window.location.hostname.toLowerCase()) {
      return { event: "outbound_click" };
    }

    return null;
  }

  function captureCampaign() {
    var params = new URLSearchParams(window.location.search);
    var keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "gbraid",
      "wbraid",
    ];
    var campaign = {};
    var hasValue = false;

    keys.forEach(function (key) {
      var value = params.get(key);
      if (value) {
        campaign[key] = value.slice(0, 250);
        hasValue = true;
      }
    });

    if (!hasValue) return;

    try {
      sessionStorage.setItem("compas_campaign", JSON.stringify(campaign));
    } catch (_) {}

    push("campaign_landing", campaign);
  }

  document.addEventListener(
    "click",
    function (event) {
      var anchor = event.target && event.target.closest ? event.target.closest("a") : null;
      if (!anchor) return;

      var classification = classifyLink(anchor);
      if (!classification) return;

      var href = anchor.getAttribute("href") || "";
      var params = Object.assign(
        {
          link_url: href,
          link_text: normalizedText(anchor),
        },
        classification.extra || {}
      );

      push(classification.event, params);
    },
    true
  );

  document.addEventListener(
    "submit",
    function (event) {
      var form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      push(form.dataset.analyticsEvent || "generate_lead", {
        form_id: form.id || undefined,
        form_name: form.getAttribute("name") || undefined,
        form_action: form.getAttribute("action") || undefined,
      });
    },
    true
  );

  window.CompasAnalytics = Object.freeze({
    track: function (eventName, params) {
      if (!eventName) return;
      push(String(eventName), params || {});
    },
    getCampaign: function () {
      try {
        return JSON.parse(sessionStorage.getItem("compas_campaign") || "{}");
      } catch (_) {
        return {};
      }
    },
  });

  captureCampaign();
  loadGtm();
  push("compas_tracking_ready", {
    tracking_environment: config.environment || "production",
    gtm_configured: /^GTM-[A-Z0-9]+$/i.test(String(config.gtmId || "").trim()),
  });
})();
