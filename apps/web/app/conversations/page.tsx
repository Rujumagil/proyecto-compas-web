import Image from "next/image";
import Link from "next/link";

import "./conversations.css";

import InboxAutoRefresh from "@/components/conversations/inbox-auto-refresh";
import { Header } from "@/components/layout/header";
import { brandAssets } from "@/lib/brand-assets";
import { Sidebar } from "@/components/layout/sidebar";
import {
  getConversations,
  type ConversationChannel,
  type ConversationStatus,
} from "@/services/conversations/conversation-service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ConversationsPageProps = {
  searchParams: Promise<{
    channel?: string;
    status?: string;
  }>;
};

const channelLabels: Record<
  ConversationChannel,
  string
> = {
  whatsapp: "WhatsApp",
  facebook: "Facebook",
  instagram: "Instagram",
  messenger: "Messenger",
  email: "Correo",
  internal: "Interno",
};


function getConversationChannelLabel(conversation: {
  channel: ConversationChannel;
  subject: string | null;
  metadata: Record<string, unknown> | null;
}) {
  const isWebChat =
    conversation.channel === "internal" &&
    (conversation.metadata?.source === "web_chat" ||
      conversation.subject?.startsWith("Chat web") === true);

  return isWebChat
    ? "Chat web"
    : channelLabels[conversation.channel];
}

const statusLabels: Record<
  ConversationStatus,
  string
> = {
  new: "Nueva",
  open: "Abierta",
  pending: "Pendiente",
  closed: "Cerrada",
  archived: "Archivada",
};

function formatRelativeDate(
  value: string | null,
) {
  if (!value) {
    return "Sin mensajes";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Fecha no disponible";
  }

  const difference =
    Date.now() - date.getTime();

  const minutes = Math.floor(
    difference / 60_000,
  );

  const hours = Math.floor(
    difference / 3_600_000,
  );

  const days = Math.floor(
    difference / 86_400_000,
  );

  if (minutes < 1) {
    return "Ahora";
  }

  if (minutes < 60) {
    return `Hace ${minutes} min`;
  }

  if (hours < 24) {
    return `Hace ${hours} h`;
  }

  if (days < 7) {
    return `Hace ${days} d`;
  }

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "short",
  }).format(date);
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function buildInboxHref({
  channel,
  status,
}: {
  channel?: string;
  status?: string;
}) {
  const params = new URLSearchParams();

  if (channel && channel !== "all") {
    params.set("channel", channel);
  }

  if (status && status !== "all") {
    params.set("status", status);
  }


  const query = params.toString();

  return query
    ? `/conversations?${query}`
    : "/conversations";
}

export default async function ConversationsPage({
  searchParams,
}: ConversationsPageProps) {
  const filters = await searchParams;
  const conversations =
    await getConversations();

  const selectedChannel =
    filters.channel ?? "all";

  const selectedStatus =
    filters.status ?? "all";

  const filteredConversations =
    conversations.filter((conversation) => {
      const channelMatches =
        selectedChannel === "all" ||
        conversation.channel === selectedChannel;

      const statusMatches =
        selectedStatus === "all" ||
        conversation.status === selectedStatus;

      return channelMatches && statusMatches;
    });

  const unreadTotal = conversations.reduce(
    (total, conversation) =>
      total + conversation.unread_count,
    0,
  );

  const openTotal = conversations.filter(
    (conversation) =>
      conversation.status === "open" ||
      conversation.status === "new",
  ).length;

  const pendingTotal = conversations.filter(
    (conversation) =>
      conversation.status === "pending",
  ).length;

  return (
    <main className="app-shell">
      <InboxAutoRefresh />
      <Sidebar />

      <section className="main-area">
        <Header />

        <div className="content conversations-page">
          <header className="conversations-page-header">
            <div>
              <span className="conversations-eyebrow">
                COMPÁS ONE · MENSAJERÍA
              </span>

              <h1>Centro de Conversaciones</h1>

              <p>
                Administra los mensajes de tus páginas
                conectadas y conserva cada contacto dentro
                de su espacio de trabajo.
              </p>
            </div>

            <span className="conversations-api-status conversations-api-connected">
              <span aria-hidden="true">●</span>
              Messenger conectado
            </span>
          </header>

          <section className="conversations-summary">
            <article>
              <span>CONVERSACIONES</span>
              <strong>
                {conversations.length}
              </strong>
              <small>Total registradas</small>
            </article>

            <article>
              <span>ABIERTAS</span>
              <strong>{openTotal}</strong>
              <small>Requieren atención</small>
            </article>

            <article>
              <span>PENDIENTES</span>
              <strong>{pendingTotal}</strong>
              <small>Esperando seguimiento</small>
            </article>

            <article>
              <span>SIN LEER</span>
              <strong>{unreadTotal}</strong>
              <small>Mensajes nuevos</small>
            </article>
          </section>

          <section className="conversation-inbox">
            <aside className="conversation-filters">
              <div className="conversation-filter-heading">
                <span>FILTROS</span>
                <strong>Bandeja</strong>
              </div>

              <nav>
                <Link
                  className={
                    selectedChannel === "all"
                      ? "conversation-filter-active"
                      : ""
                  }
                  href={buildInboxHref({
                    status: selectedStatus,
                  })}
                >
                  <span>Todos los canales</span>
                  <small>
                    {conversations.length}
                  </small>
                </Link>

                {Object.entries(
                  channelLabels,
                ).map(([channel, label]) => {
                  const count =
                    conversations.filter(
                      (conversation) =>
                        conversation.channel ===
                        channel,
                    ).length;

                  return (
                    <Link
                      className={
                        selectedChannel ===
                        channel
                          ? "conversation-filter-active"
                          : ""
                      }
                      href={buildInboxHref({
                        channel,
                        status:
                          selectedStatus,
                      })}
                      key={channel}
                    >
                      <span>{label}</span>
                      <small>{count}</small>
                    </Link>
                  );
                })}
              </nav>

              <div className="conversation-status-filter">
                <span>ESTADO</span>

                {[
                  ["all", "Todos"],
                  ["new", "Nuevas"],
                  ["open", "Abiertas"],
                  ["pending", "Pendientes"],
                  ["closed", "Cerradas"],
                ].map(([status, label]) => (
                  <Link
                    className={
                      selectedStatus === status
                        ? "conversation-filter-active"
                        : ""
                    }
                    href={buildInboxHref({
                      channel: selectedChannel,
                      status,
                    })}
                    key={status}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </aside>

            <section className="conversation-list-panel">
              <header>
                <div>
                  <span className="conversations-eyebrow">
                    BANDEJA
                  </span>

                  <h2>Conversaciones</h2>
                </div>

                <span>
                  {filteredConversations.length}
                </span>
              </header>

              {filteredConversations.length === 0 ? (
                <div className="conversation-empty-list">
                  <Image
                    className="co-empty-illustration"
                    src={brandAssets.empty.conversations}
                    alt="Mensajería y atención al cliente de Compás One"
                    width={1024}
                    height={1536}
                  />

                  <strong>No hay conversaciones</strong>

                  <p>Cuando se reciban mensajes, aparecerán aquí.</p>
                </div>
              ) : (
                <div className="conversation-list">
                  {filteredConversations.map(
                    (conversation) => {
                      const contactName =
                        conversation.contact
                          ?.display_name ||
                        "Contacto no disponible";

                      const avatarUrl =
                        conversation.contact
                          ?.avatar_url ?? null;

                      return (
                        <Link
                          className="conversation-list-item"
                          href={`/conversations/${conversation.id}`}
                          key={conversation.id}
                        >
                          <span
                            className={[
                              "conversation-avatar",
                              avatarUrl
                                ? "conversation-avatar-photo"
                                : "",
                            ].join(" ")}
                            style={
                              avatarUrl
                                ? {
                                    backgroundImage:
                                      `url("${avatarUrl}")`,
                                  }
                                : undefined
                            }
                          >
                            {!avatarUrl &&
                              getInitials(
                                contactName,
                              )}
                          </span>

                          <div className="conversation-list-content">
                            <header>
                              <strong>
                                {contactName}
                              </strong>

                              <time>
                                {formatRelativeDate(
                                  conversation.last_message_at,
                                )}
                              </time>
                            </header>

                            <div className="conversation-list-channel">
                              <span
                                className={`conversation-channel conversation-channel-${conversation.channel}`}
                              >
                                {getConversationChannelLabel(
                                  conversation,
                                )}
                              </span>

                              <span className="conversation-workspace-name">
                                {
                                  conversation.workspace_name
                                }
                              </span>

                              <span
                                className={`conversation-list-status conversation-list-status-${conversation.status}`}
                              >
                                {
                                  statusLabels[
                                    conversation
                                      .status
                                  ]
                                }
                              </span>
                            </div>

                            <p>
                              {conversation.last_message_preview ||
                                conversation.subject ||
                                "Conversación sin mensajes"}
                            </p>
                          </div>

                          {conversation.unread_count >
                            0 && (
                            <span className="conversation-unread-count">
                              {
                                conversation.unread_count
                              }
                            </span>
                          )}
                        </Link>
                      );
                    },
                  )}
                </div>
              )}
            </section>

            <section className="conversation-placeholder">
              <div>
                <Image
                  className="co-empty-illustration"
                  src={brandAssets.mascot.tablet}
                  alt="Asistente de Compás One revisando conversaciones"
                  width={1024}
                  height={1536}
                />

                <h2>Selecciona una conversación</h2>

                <p>
                  Abre una conversación para revisar
                  mensajes, responder y consultar el
                  expediente del contacto.
                </p>
              </div>
            </section>
          </section>
        </div>
      </section>
    </main>
  );
}
