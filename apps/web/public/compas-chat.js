(() => {
  "use strict";

  const script = document.currentScript;
  if (!script) return;

  const publicKey = (script.dataset.key || "").trim();
  if (!publicKey || document.querySelector("compas-one-web-chat")) return;

  const scriptUrl = new URL(script.src, window.location.href);
  const apiBase = scriptUrl.origin;
  const storageKey = `compas-one-web-chat:${publicKey}`;
  const host = document.createElement("compas-one-web-chat");
  const shadow = host.attachShadow({ mode: "open" });

  document.body.appendChild(host);

  const state = {
    config: null,
    sessionToken: window.localStorage.getItem(storageKey) || "",
    profile: null,
    open: false,
    busy: false,
    seenMessageIds: new Set(),
    pollTimer: null,
  };

  const style = document.createElement("style");
  style.textContent = `
    :host { all: initial; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    * { box-sizing: border-box; }
    button, input, textarea { font: inherit; }
    .root { --chat-color: #0f766e; position: fixed; z-index: 2147483000; bottom: 20px; right: 20px; color: #102a43; }
    .root.left { left: 20px; right: auto; }
    .launcher { width: 58px; height: 58px; border: 0; border-radius: 18px; background: var(--chat-color); color: #fff; cursor: pointer; box-shadow: 0 18px 45px rgba(15, 35, 54, .28); display: grid; place-items: center; font-size: 26px; transition: transform .2s ease; }
    .launcher:hover { transform: translateY(-2px); }
    .panel { position: absolute; bottom: 72px; right: 0; width: min(380px, calc(100vw - 28px)); height: min(620px, calc(100vh - 110px)); background: #fffdfa; border: 1px solid #dce7e5; border-radius: 24px; box-shadow: 0 26px 70px rgba(15, 35, 54, .24); overflow: hidden; display: none; grid-template-rows: auto 1fr auto; }
    .left .panel { left: 0; right: auto; }
    .panel.open { display: grid; }
    .header { background: var(--chat-color); color: #fff; padding: 18px 18px 16px; display: flex; align-items: center; justify-content: space-between; gap: 14px; }
    .header strong { display: block; font-size: 17px; line-height: 1.25; }
    .header small { display: block; margin-top: 3px; opacity: .86; font-size: 12px; }
    .close { border: 0; background: rgba(255,255,255,.16); color: #fff; width: 34px; height: 34px; border-radius: 12px; cursor: pointer; font-size: 20px; }
    .body { overflow-y: auto; padding: 18px; background: #f7faf9; }
    .messages { display: grid; gap: 10px; align-content: start; }
    .bubble { max-width: 86%; padding: 11px 13px; border-radius: 16px; font-size: 14px; line-height: 1.45; white-space: pre-wrap; overflow-wrap: anywhere; }
    .bubble.agent { justify-self: start; background: #fff; border: 1px solid #e2e8e7; border-bottom-left-radius: 5px; }
    .bubble.user { justify-self: end; background: var(--chat-color); color: #fff; border-bottom-right-radius: 5px; }
    .bubble.system { justify-self: center; max-width: 100%; background: #fff3cd; color: #6b4f00; font-size: 12px; }
    .form { display: grid; gap: 11px; }
    .form h3 { margin: 0; font-size: 20px; }
    .form p { margin: 0 0 4px; color: #526578; font-size: 13px; line-height: 1.45; }
    .field { display: grid; gap: 5px; }
    .field span { font-size: 12px; font-weight: 700; color: #334e68; }
    .field input { width: 100%; border: 1px solid #cad8d6; border-radius: 12px; padding: 11px 12px; background: #fff; color: #102a43; outline: none; }
    .field input:focus, .composer textarea:focus { border-color: var(--chat-color); box-shadow: 0 0 0 3px color-mix(in srgb, var(--chat-color) 16%, transparent); }
    .consent { display: grid; grid-template-columns: auto 1fr; gap: 8px; align-items: start; color: #526578; font-size: 11px; line-height: 1.4; }
    .consent a { color: var(--chat-color); font-weight: 700; }
    .start { border: 0; border-radius: 13px; padding: 12px 15px; background: var(--chat-color); color: #fff; font-weight: 800; cursor: pointer; }
    .composer { padding: 12px; border-top: 1px solid #dce7e5; background: #fff; display: grid; grid-template-columns: 1fr auto; gap: 8px; }
    .composer textarea { resize: none; min-height: 44px; max-height: 110px; border: 1px solid #cad8d6; border-radius: 14px; padding: 11px 12px; outline: none; color: #102a43; }
    .send { width: 44px; height: 44px; border: 0; border-radius: 14px; background: var(--chat-color); color: #fff; cursor: pointer; font-size: 18px; }
    .send:disabled, .start:disabled { opacity: .58; cursor: wait; }
    .branding { text-align: center; color: #7b8d9e; font-size: 10px; padding-top: 8px; }
    @media (max-width: 520px) {
      .root, .root.left { right: 12px; left: auto; bottom: 12px; }
      .panel, .left .panel { position: fixed; inset: 8px 8px 82px; width: auto; height: auto; }
    }
  `;

  const root = document.createElement("div");
  root.className = "root";
  root.innerHTML = `
    <section class="panel" role="dialog" aria-label="Chat de atención">
      <header class="header">
        <div><strong>Proyecto Compás</strong><small>Estamos para orientarte</small></div>
        <button class="close" type="button" aria-label="Cerrar chat">×</button>
      </header>
      <div class="body"><div class="messages"></div></div>
      <div class="footer"></div>
    </section>
    <button class="launcher" type="button" aria-label="Abrir chat">✦</button>
  `;

  shadow.append(style, root);

  const panel = root.querySelector(".panel");
  const launcher = root.querySelector(".launcher");
  const closeButton = root.querySelector(".close");
  const headerTitle = root.querySelector(".header strong");
  const headerSubtitle = root.querySelector(".header small");
  const messages = root.querySelector(".messages");
  const footer = root.querySelector(".footer");
  const body = root.querySelector(".body");

  function addBubble(text, kind) {
    const bubble = document.createElement("div");
    bubble.className = `bubble ${kind}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    body.scrollTop = body.scrollHeight;
    return bubble;
  }

  function setOpen(open) {
    state.open = open;
    panel.classList.toggle("open", open);
    launcher.setAttribute("aria-expanded", String(open));
    if (open) {
      setTimeout(() => body.scrollTop = body.scrollHeight, 0);
      if (state.sessionToken) void syncHistory(false);
    }
  }

  function startPolling() {
    if (state.pollTimer) window.clearInterval(state.pollTimer);
    state.pollTimer = window.setInterval(() => {
      if (state.open && state.sessionToken && !state.busy) {
        void syncHistory(false);
      }
    }, 4000);
  }

  async function syncHistory(initial) {
    if (!state.sessionToken) return;

    const response = await fetch(
      `${apiBase}/api/public/web-chat/messages?key=${encodeURIComponent(publicKey)}`,
      {
        headers: {
          "X-Compas-Chat-Session": state.sessionToken,
        },
      },
    );
    const result = await response.json();

    if (!response.ok || !result.ok) {
      if (initial) {
        state.sessionToken = "";
        window.localStorage.removeItem(storageKey);
        renderContactForm();
      }
      return;
    }

    if (initial) messages.innerHTML = "";

    for (const item of result.messages || []) {
      if (state.seenMessageIds.has(item.id)) continue;
      state.seenMessageIds.add(item.id);
      addBubble(
        item.body,
        item.direction === "incoming" ? "user" : "agent",
      );
    }
  }

  function renderComposer() {
    footer.innerHTML = `
      <form class="composer">
        <textarea maxlength="2000" rows="1" aria-label="Mensaje" placeholder="Escribe tu mensaje..."></textarea>
        <button class="send" type="submit" aria-label="Enviar mensaje">➤</button>
      </form>
    `;

    const form = footer.querySelector("form");
    const textarea = footer.querySelector("textarea");
    const send = footer.querySelector("button");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const message = textarea.value.trim();
      if (!message || state.busy) return;

      textarea.value = "";
      addBubble(message, "user");
      state.busy = true;
      send.disabled = true;

      try {
        const clientMessageId = crypto.randomUUID();
        const response = await fetch(
          `${apiBase}/api/public/web-chat/messages?key=${encodeURIComponent(publicKey)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              publicKey,
              sessionToken: state.sessionToken || undefined,
              clientMessageId,
              message,
              name: state.profile?.name,
              email: state.profile?.email,
              phone: state.profile?.phone,
              company: state.profile?.company,
              consent: state.profile?.consent === true,
              pageUrl: window.location.href,
            }),
          },
        );
        const result = await response.json();

        if (!response.ok || !result.ok) {
          throw new Error(result.error || "No fue posible enviar el mensaje.");
        }

        state.sessionToken = result.sessionToken;
        window.localStorage.setItem(storageKey, state.sessionToken);
        state.profile = null;
        if (result.incomingMessageId) {
          state.seenMessageIds.add(result.incomingMessageId);
        }
        if (result.replyMessageId) {
          state.seenMessageIds.add(result.replyMessageId);
        }
        addBubble(result.reply, "agent");
      } catch (error) {
        const messageText =
          error instanceof Error
            ? error.message
            : "No fue posible enviar el mensaje.";

        if (
          state.sessionToken &&
          /aceptar el aviso|escribe tu nombre|correo o teléfono válido/i.test(messageText)
        ) {
          state.sessionToken = "";
          window.localStorage.removeItem(storageKey);
          state.profile = null;
          renderContactForm();
          addBubble(
            "La sesión anterior venció. Confirma tus datos para continuar.",
            "system",
          );
        } else {
          addBubble(messageText, "system");
        }
      } finally {
        state.busy = false;
        send.disabled = false;
        textarea.focus();
      }
    });
  }

  function renderContactForm() {
    footer.innerHTML = "";
    messages.innerHTML = "";

    const privacyUrl = state.config.privacyUrl || "#";
    const form = document.createElement("form");
    form.className = "form";
    form.innerHTML = `
      <h3>Antes de comenzar</h3>
      <p>Déjanos tus datos para registrar la conversación en Compás One y dar seguimiento a tu proyecto.</p>
      <label class="field"><span>Nombre *</span><input name="name" maxlength="160" required autocomplete="name"></label>
      <label class="field"><span>Correo</span><input name="email" type="email" maxlength="320" autocomplete="email"></label>
      <label class="field"><span>Teléfono</span><input name="phone" type="tel" maxlength="80" autocomplete="tel"></label>
      <label class="field"><span>Empresa o proyecto</span><input name="company" maxlength="160" autocomplete="organization"></label>
      <label class="consent"><input name="consent" type="checkbox" required><span>Acepto el <a href="${privacyUrl}" target="_blank" rel="noopener noreferrer">aviso de privacidad</a> y el uso de mis datos para responder esta solicitud.</span></label>
      <button class="start" type="submit">Iniciar conversación</button>
      <div class="branding">Atención conectada con Compás One</div>
    `;

    messages.appendChild(form);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const email = String(data.get("email") || "").trim();
      const phone = String(data.get("phone") || "").trim();

      if (state.config.requireContactMethod && !email && !phone) {
        addBubble("Escribe un correo o teléfono para continuar.", "system");
        return;
      }

      state.profile = {
        name: String(data.get("name") || "").trim(),
        email,
        phone,
        company: String(data.get("company") || "").trim(),
        consent: data.get("consent") === "on",
      };
      messages.innerHTML = "";
      addBubble(state.config.welcomeMessage, "agent");
      renderComposer();
    });
  }

  async function initialize() {
    try {
      const response = await fetch(
        `${apiBase}/api/public/web-chat/config?key=${encodeURIComponent(publicKey)}`,
      );
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Chat no disponible");

      state.config = result.config;
      root.style.setProperty("--chat-color", state.config.primaryColor || "#0f766e");
      root.classList.toggle("left", state.config.position === "left");
      headerTitle.textContent = state.config.title;
      headerSubtitle.textContent = state.config.subtitle;

      if (state.sessionToken) {
        renderComposer();
        await syncHistory(true);
      } else {
        renderContactForm();
      }

      startPolling();
    } catch (error) {
      console.error("COMPAS_WEB_CHAT_INIT_FAILED", error);
      host.remove();
    }
  }

  launcher.addEventListener("click", () => setOpen(!state.open));
  closeButton.addEventListener("click", () => setOpen(false));
  initialize();
})();
