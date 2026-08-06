import Link from "next/link";
import { notFound } from "next/navigation";

import "./conversation-detail.css";
import "../conversations.css";

import InboxAutoRefresh from "@/components/conversations/inbox-auto-refresh";
import MarkConversationRead from "@/components/conversations/mark-conversation-read";
import { ConversationStatusControl } from "@/components/conversations/conversation-status-control";
import { MessageComposer } from "@/components/conversations/message-composer";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import {
  getConversationDetail,
  getConversations,
  type ConversationChannel,
  type ConversationStatus,
} from "@/services/conversations/conversation-service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ConversationDetailPageProps = {
  params: Promise<{
    conversationId: string;
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


function isWebChatConversation(conversation: {
  channel: ConversationChannel;
  subject: string | null;
  metadata: Record<string, unknown> | null;
}) {
  return (
    conversation.channel === "internal" &&
    (conversation.metadata?.source === "web_chat" ||
      conversation.subject?.startsWith("Chat web") === true)
  );
}

function getConversationChannelLabel(conversation: {
  channel: ConversationChannel;
  subject: string | null;
  metadata: Record<string, unknown> | null;
}) {
  return isWebChatConversation(conversation)
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

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatMessageDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Fecha no disponible";
  }

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatListDate(
  value: string | null,
) {
  if (!value) {
    return "Sin mensajes";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export default async function ConversationDetailPage({
  params,
}: ConversationDetailPageProps) {
  const { conversationId } = await params;

  const [conversations, detail] =
    await Promise.all([
      getConversations(),
      getConversationDetail(conversationId),
    ]);

  if (!detail) {
    notFound();
  }

  const {
    conversation,
    messages,
  } = detail;

  const visibleConversations = conversations;

  const contactName =
    conversation.contact?.display_name ||
    "Contacto no disponible";

  const avatarUrl =
    conversation.contact?.avatar_url ?? null;

  return (
    <main className="app-shell">
      <InboxAutoRefresh />
      <MarkConversationRead
        conversationId={conversation.id}
        unreadCount={conversation.unread_count}
      />

      <Sidebar />

      <section className="main-area">
        <Header />

        <div className="content conversation-detail-page">
          <header className="conversation-detail-page-header">
            <div>
              <span className="conversations-eyebrow">
                COMPÁS ONE · MENSAJERÍA
              </span>

              <h1>Centro de Conversaciones</h1>

              <p>
                Consulta el historial y responde desde
                el expediente central del contacto.
              </p>
            </div>

            <Link
              className="conversation-back-button"
              href="/conversations"
            >
              Volver a la bandeja
            </Link>
          </header>

          <section className="conversation-detail-inbox">
            <aside className="conversation-detail-list">
              <header>
                <span className="conversations-eyebrow">
                  BANDEJA
                </span>

                <h2>
                  {conversation.workspace_name}
                </h2>

                <small>
                  {visibleConversations.length}
                </small>
              </header>

              <div>
                {visibleConversations.map((item) => {
                  const itemContactName =
                    item.contact?.display_name ||
                    "Contacto no disponible";

                  const itemAvatarUrl =
                    item.contact?.avatar_url ?? null;

                  return (
                    <Link
                      className={`conversation-detail-list-item ${
                        item.id === conversation.id
                          ? "conversation-detail-list-item-active"
                          : ""
                      }`}
                      href={`/conversations/${item.id}`}
                      key={item.id}
                    >
                      <span
                        className={[
                          "conversation-avatar",
                          itemAvatarUrl
                            ? "conversation-avatar-photo"
                            : "",
                        ].join(" ")}
                        style={
                          itemAvatarUrl
                            ? {
                                backgroundImage:
                                  `url("${itemAvatarUrl}")`,
                              }
                            : undefined
                        }
                      >
                        {!itemAvatarUrl &&
                          getInitials(
                            itemContactName,
                          )}
                      </span>

                      <div>
                        <header>
                          <strong>
                            {itemContactName}
                          </strong>

                          <time>
                            {formatListDate(
                              item.last_message_at,
                            )}
                          </time>
                        </header>

                        <span
                          className={`conversation-channel conversation-channel-${item.channel}`}
                        >
                          {getConversationChannelLabel(item)}
                        </span>

                        <p>
                          {item.last_message_preview ||
                            "Conversación sin mensajes"}
                        </p>
                      </div>

                      {item.unread_count > 0 && (
                        <small className="conversation-unread-count">
                          {item.unread_count}
                        </small>
                      )}
                    </Link>
                  );
                })}
              </div>
            </aside>

            <section className="conversation-chat-panel">
              <header className="conversation-chat-header">
                <div className="conversation-chat-contact">
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
                      getInitials(contactName)}
                  </span>

                  <div>
                    <h2>{contactName}</h2>

                    <div>
                      <span
                        className={`conversation-channel conversation-channel-${conversation.channel}`}
                      >
                        {
                          getConversationChannelLabel(
                            conversation,
                          )
                        }
                      </span>

                      <span className="conversation-workspace-name">
                        {conversation.workspace_name}
                      </span>

                      <span
                        className={`conversation-list-status conversation-list-status-${conversation.status}`}
                      >
                        {
                          statusLabels[
                            conversation.status
                          ]
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="conversation-chat-actions">
                  {conversation.contact && (
                    <Link
                      href={`/crm/${conversation.contact.id}`}
                    >
                      Ver expediente
                    </Link>
                  )}

                  <ConversationStatusControl
                    conversationId={
                      conversation.id
                    }
                    currentStatus={
                      conversation.status
                    }
                  />
                </div>
              </header>

              <div className="conversation-messages">
                {messages.length === 0 ? (
                  <div className="conversation-no-messages">
                    <strong>
                      No hay mensajes
                    </strong>

                    <p>
                      Envía el primer mensaje para
                      comenzar esta conversación.
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <article
                      className={`message-row message-row-${message.direction}`}
                      key={message.id}
                    >
                      <div
                        className={`message-bubble message-bubble-${message.direction}`}
                      >
                        {message.body && (
                          <p>{message.body}</p>
                        )}

                        {message.media_url && (
                          <a
                            href={message.media_url}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {message.media_name ||
                              "Abrir archivo"}
                          </a>
                        )}

                        <footer>
                          <time
                            dateTime={
                              message.sent_at
                            }
                          >
                            {formatMessageDate(
                              message.sent_at,
                            )}
                          </time>

                          <span>
                            {message.direction ===
                            "incoming"
                              ? "Recibido"
                              : message.status}
                          </span>
                        </footer>
                      </div>
                    </article>
                  ))
                )}
              </div>

              <MessageComposer
                conversationId={
                  conversation.id
                }
                channel={conversation.channel}
                webChatEnabled={
                  isWebChatConversation(conversation)
                }
                disabled={
                  conversation.status ===
                  "archived"
                }
              />
            </section>

            <aside className="conversation-contact-panel">
              <span
                className={[
                  "conversation-contact-panel-avatar",
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
                  getInitials(contactName)}
              </span>

              <h2>{contactName}</h2>

              <p>
                {conversation.contact?.company_name ||
                  "Sin empresa registrada"}
              </p>

              <div className="conversation-contact-data">
                <article>
                  <span>CORREO</span>
                  <strong>
                    {conversation.contact?.email ||
                      "No registrado"}
                  </strong>
                </article>

                <article>
                  <span>TELÉFONO</span>
                  <strong>
                    {conversation.contact?.phone ||
                      "No registrado"}
                  </strong>
                </article>

                <article>
                  <span>ESPACIO</span>
                  <strong>
                    {conversation.workspace_name}
                  </strong>
                </article>
              </div>

              {conversation.contact && (
                <Link
                  className="conversation-contact-profile-link"
                  href={`/crm/${conversation.contact.id}`}
                >
                  Abrir expediente completo
                </Link>
              )}
            </aside>
          </section>
        </div>
      </section>
    </main>
  );
}
