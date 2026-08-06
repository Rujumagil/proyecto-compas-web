import Image from "next/image";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { requireWorkspaceFeature } from "@/lib/access/workspace-access";
import { brandAssets } from "@/lib/brand-assets";

import "./web-chat.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;



type WebChatConfig = {
  public_key: string;
  enabled: boolean;
  allowed_origins: string[];
  widget_title: string;
  workspace_id: string;
};

type MessengerConfig = {
  page_id: string;
  page_name: string | null;
  status: string | null;
  workspace_id: string;
  last_error: string | null;
};

function configured(value: string | undefined) {
  return Boolean(value?.trim());
}

async function getWebChatConfig(
  workspaceId: string,
): Promise<{ row: WebChatConfig | null; error: string | null }> {
  const supabaseUrl = (
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    ""
  )
    .trim()
    .replace(/\/+$/, "");
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      row: null,
      error: "Faltan las variables privadas de Supabase en Vercel.",
    };
  }

  const query = new URLSearchParams({
    select:
      "public_key,enabled,allowed_origins,widget_title,workspace_id",
    workspace_id: `eq.${workspaceId}`,
    limit: "1",
  });

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/web_chat_configs?${query.toString()}`,
      {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );
    const text = await response.text();

    if (!response.ok) {
      return {
        row: null,
        error: `Supabase respondió ${response.status}: ${text.slice(0, 180)}`,
      };
    }

    const rows = JSON.parse(text) as WebChatConfig[];
    return { row: rows[0] ?? null, error: null };
  } catch (error) {
    return {
      row: null,
      error:
        error instanceof Error
          ? error.message
          : "No fue posible consultar el chat web.",
    };
  }
}

function getApplicationBaseUrl() {
  const explicit = (
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.APP_URL ??
    ""
  ).trim();

  if (explicit) return explicit.replace(/\/+$/, "");

  const production =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  if (production) return `https://${production}`;

  const deployment = process.env.VERCEL_URL?.trim();
  return deployment
    ? `https://${deployment}`
    : "https://TU-DOMINIO-DE-COMPAS-ONE";
}

async function getMessengerConfigs(
  workspaceId: string,
): Promise<{
  rows: MessengerConfig[];
  error: string | null;
}> {
  const supabaseUrl = (
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    ""
  )
    .trim()
    .replace(/\/+$/, "");

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      rows: [],
      error: "Faltan las variables privadas de Supabase en Vercel.",
    };
  }

  const query = new URLSearchParams({
    select: "page_id,page_name,status,workspace_id,last_error",
    workspace_id: `eq.${workspaceId}`,
    order: "page_name.asc",
  });

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/messenger_channel_configs?${query.toString()}`,
      {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );

    const responseText = await response.text();

    if (!response.ok) {
      return {
        rows: [],
        error: `Supabase respondió ${response.status}: ${responseText.slice(0, 180)}`,
      };
    }

    return {
      rows: JSON.parse(responseText) as MessengerConfig[],
      error: null,
    };
  } catch (error) {
    return {
      rows: [],
      error:
        error instanceof Error
          ? error.message
          : "No fue posible consultar las conexiones.",
    };
  }
}

export default async function IntegrationsPage() {
  const { workspaceId, workspace } =
    await requireWorkspaceFeature("integrations");
  const [messenger, webChat] = await Promise.all([
    getMessengerConfigs(workspaceId),
    getWebChatConfig(workspaceId),
  ]);
  const appBaseUrl = getApplicationBaseUrl();
  const embedCode = webChat.row
    ? `<script src="${appBaseUrl}/compas-chat.js" data-key="${webChat.row.public_key}" async></script>`
    : "";

  const cards = [
    {
      title: "Supabase",
      description: "Base de datos, autenticación, usuarios y workspaces.",
      active:
        configured(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
        configured(
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        ),
    },
    {
      title: "Meta Messenger",
      description: "Recepción, respuesta y perfiles de Facebook Messenger.",
      active:
        configured(process.env.META_APP_SECRET) &&
        messenger.rows.some((row) => row.status === "connected"),
    },
    {
      title: "WhatsApp Business",
      description: "Canal oficial de WhatsApp para cada cliente.",
      active: false,
    },
    {
      title: "Chat web",
      description:
        "Widget del sitio que registra contactos y conversaciones en Compás One.",
      active: Boolean(webChat.row?.enabled),
    },
    {
      title: "Inteligencia artificial",
      description: "Asistencia para CRM, respuestas y automatizaciones.",
      active:
        configured(process.env.GEMINI_API_KEY) ||
        configured(process.env.OPENAI_API_KEY),
    },
  ];

  return (
    <main className="app-shell">
      <Sidebar />

      <section className="main-area">
        <Header />

        <div className="content module-dashboard">
          <header className="module-dashboard-header">
            <div>
              <span className="eyebrow">COMPÁS ONE · INTEGRACIONES</span>
              <h1>Conexiones del ecosistema</h1>
              <p>
                Revisa únicamente las conexiones de {workspace.name}, sin
                mostrar tokens, contraseñas ni secretos.
              </p>
            </div>
          </header>

          <section className="integration-grid">
            {cards.map((card) => (
              <article key={card.title}>
                <header>
                  <span
                    className={
                      card.active
                        ? "integration-dot integration-dot-active"
                        : "integration-dot"
                    }
                  />
                  <strong>{card.title}</strong>
                </header>

                <p>{card.description}</p>

                <span
                  className={
                    card.active
                      ? "integration-status integration-status-active"
                      : "integration-status"
                  }
                >
                  {card.active ? "Conectado" : "Pendiente de configuración"}
                </span>
              </article>
            ))}
          </section>

          <section className="co-module-empty">
            <div className="co-module-empty-copy">
              <span className="eyebrow">ECOSISTEMA CONECTADO</span>
              <h2>Conecta herramientas sin perder el orden empresarial.</h2>
              <p>
                Cada canal, página y servicio se asocia al workspace activo. Las
                conexiones de ETERNI no aparecen dentro de Proyecto Compás y
                viceversa.
              </p>
            </div>

            <div className="co-module-empty-visual">
              <Image
                src={brandAssets.empty.integrations}
                alt="Integraciones empresariales de Compás One"
                width={1024}
                height={1536}
              />
            </div>
          </section>

          <section className="module-ready-panel integration-pages-panel">
            <div>
              <span className="eyebrow">PÁGINAS DE MESSENGER</span>
              <h2>
                {messenger.rows.length} {messenger.rows.length === 1
                  ? "página registrada"
                  : "páginas registradas"}
              </h2>

              {messenger.error ? (
                <p>{messenger.error}</p>
              ) : messenger.rows.length === 0 ? (
                <p>No hay páginas registradas en messenger_channel_configs.</p>
              ) : (
                <div className="integration-page-list">
                  {messenger.rows.map((page) => (
                    <div key={page.page_id}>
                      <span>
                        <strong>{page.page_name ?? "Página sin nombre"}</strong>
                        <small>ID: {page.page_id}</small>
                      </span>

                      <b
                        className={
                          page.status === "connected"
                            ? "integration-status-active"
                            : ""
                        }
                      >
                        {page.status ?? "sin estado"}
                      </b>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="module-ready-panel web-chat-install-panel">
            <div>
              <span className="eyebrow">CHAT WEB · PROYECTO COMPÁS</span>
              <h2>Convierte las visitas del sitio en contactos del CRM.</h2>
              <p>
                El widget solicita nombre y un medio de contacto, abre una
                conversación interna y permite que el Super Agente responda
                con las reglas del workspace.
              </p>
            </div>

            {webChat.error ? (
              <div className="web-chat-install-card">
                <strong>No fue posible consultar la configuración.</strong>
                <p>{webChat.error}</p>
              </div>
            ) : !webChat.row ? (
              <div className="web-chat-install-card">
                <strong>Configuración pendiente</strong>
                <p>Ejecuta la migración del Chat Web V1 en Supabase.</p>
              </div>
            ) : (
              <div className="web-chat-install-grid">
                <article className="web-chat-install-card">
                  <h3>{webChat.row.widget_title}</h3>
                  <div className="web-chat-status-line">
                    <span
                      className={
                        webChat.row.enabled
                          ? "integration-dot integration-dot-active"
                          : "integration-dot"
                      }
                    />
                    {webChat.row.enabled ? "Activo" : "Desactivado"}
                  </div>

                  <p>Dominios autorizados:</p>
                  <div className="web-chat-origin-list">
                    {webChat.row.allowed_origins.map((origin) => (
                      <code key={origin}>{origin}</code>
                    ))}
                  </div>

                  <p>Clave pública del widget:</p>
                  <code className="web-chat-public-key">
                    {webChat.row.public_key}
                  </code>
                </article>

                <article className="web-chat-install-card">
                  <h3>Código para instalar en la página</h3>
                  <p>
                    Pega este código una sola vez, inmediatamente antes de
                    la etiqueta de cierre &lt;/body&gt;.
                  </p>
                  <pre className="web-chat-embed-code">
                    <code>{embedCode}</code>
                  </pre>
                </article>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
