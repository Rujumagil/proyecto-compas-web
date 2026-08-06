import "server-only";

import {
  createHash,
  randomBytes,
  randomUUID,
} from "node:crypto";

import { runSuperAgent } from "@/lib/ai/super-agent/engine";
import {
  supabaseAdminJson,
} from "@/lib/ai/super-agent/supabase-admin";

type WebChatConfigRow = {
  id: string;
  workspace_id: string;
  public_key: string;
  enabled: boolean;
  allowed_origins: string[];
  widget_title: string;
  widget_subtitle: string;
  welcome_message: string;
  offline_message: string;
  primary_color: string;
  position: "left" | "right";
  require_contact_method: boolean;
  privacy_url: string | null;
  max_messages_per_minute: number;
  session_timeout_minutes: number;
};

type WebChatSessionRow = {
  id: string;
  config_id: string;
  workspace_id: string;
  contact_id: string;
  conversation_id: string;
  session_token_hash: string;
  origin: string;
  status: "open" | "closed" | "blocked" | "expired";
  message_count: number;
  last_activity_at: string;
  expires_at: string;
};

type ContactRow = {
  id: string;
  display_name: string;
  first_name?: string | null;
  last_name?: string | null;
  email: string | null;
  phone: string | null;
};

type ConversationRow = {
  id: string;
};

type MessageRow = {
  id: string;
  body: string | null;
};

type AgentProfileRow = {
  enabled: boolean;
  operating_mode: string;
};

export type PublicWebChatConfig = {
  title: string;
  subtitle: string;
  welcomeMessage: string;
  primaryColor: string;
  position: "left" | "right";
  requireContactMethod: boolean;
  privacyUrl: string | null;
};

export type WebChatMessageInput = {
  publicKey: string;
  sessionToken?: string;
  clientMessageId: string;
  message: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  consent?: boolean;
  pageUrl?: string;
};

export type WebChatMessageResult = {
  sessionToken: string;
  contactId: string;
  conversationId: string;
  incomingMessageId: string | null;
  replyMessageId: string | null;
  reply: string;
  handoff: boolean;
};

export type PublicWebChatMessage = {
  id: string;
  direction: "incoming" | "outgoing";
  body: string;
  sentAt: string;
};

const PUBLIC_KEY_PATTERN = /^wc_[a-f0-9]{36}$/;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string"
    ? value.trim().slice(0, maxLength)
    : "";
}

function normalizeEmail(value: unknown): string | null {
  const email = cleanText(value, 320)
    .replace(/\s+/g, "")
    .toLowerCase();

  if (!email) return null;

  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    ? email
    : null;
}

function normalizePhone(value: unknown): string | null {
  const raw = cleanText(value, 80);
  if (!raw) return null;

  const hasPlus = raw.trim().startsWith("+");
  const digits = raw.replace(/\D/g, "");

  if (digits.length < 10 || digits.length > 15) {
    return null;
  }

  return `${hasPlus ? "+" : ""}${digits}`;
}

function splitName(value: unknown): {
  firstName: string;
  lastName: string | null;
  displayName: string;
} {
  const displayName = cleanText(value, 160)
    .replace(/\s+/g, " ");

  if (displayName.length < 2) {
    throw new Error("Escribe tu nombre para iniciar el chat.");
  }

  const [firstName, ...rest] = displayName.split(" ");

  return {
    firstName,
    lastName: rest.length ? rest.join(" ") : null,
    displayName,
  };
}

export function normalizeOrigin(value: string | null): string | null {
  if (!value) return null;

  try {
    return new URL(value).origin.toLowerCase();
  } catch {
    return null;
  }
}

export function getRequestOrigin(request: Request): string | null {
  return (
    normalizeOrigin(request.headers.get("origin")) ??
    normalizeOrigin(request.headers.get("referer"))
  );
}

export function createCorsHeaders(origin: string): Headers {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Compas-Chat-Session",
  );
  headers.set("Access-Control-Max-Age", "86400");
  headers.set("Vary", "Origin");
  return headers;
}

function assertPublicKey(value: string): void {
  if (!PUBLIC_KEY_PATTERN.test(value)) {
    throw new Error("La clave pública del chat no es válida.");
  }
}

function assertClientMessageId(value: string): void {
  if (!UUID_PATTERN.test(value)) {
    throw new Error("El identificador del mensaje no es válido.");
  }
}

export async function getWebChatConfig(
  publicKey: string,
): Promise<WebChatConfigRow> {
  assertPublicKey(publicKey);

  const query = new URLSearchParams({
    select: "*",
    public_key: `eq.${publicKey}`,
    enabled: "eq.true",
    limit: "1",
  });

  const rows = await supabaseAdminJson<WebChatConfigRow[]>(
    `/rest/v1/web_chat_configs?${query.toString()}`,
  );

  if (!rows[0]) {
    throw new Error("El chat web no está disponible.");
  }

  return rows[0];
}

export function assertAllowedOrigin(
  config: WebChatConfigRow,
  origin: string | null,
): string {
  if (!origin) {
    throw new Error("No fue posible validar el origen del sitio.");
  }

  const allowed = new Set(
    (config.allowed_origins ?? [])
      .map((item) => normalizeOrigin(item))
      .filter((item): item is string => Boolean(item)),
  );

  if (!allowed.has(origin)) {
    throw new Error("Este dominio no está autorizado para usar el chat.");
  }

  return origin;
}

export function toPublicConfig(
  config: WebChatConfigRow,
): PublicWebChatConfig {
  return {
    title: config.widget_title,
    subtitle: config.widget_subtitle,
    welcomeMessage: config.welcome_message,
    primaryColor: config.primary_color,
    position: config.position,
    requireContactMethod:
      config.require_contact_method,
    privacyUrl: config.privacy_url,
  };
}

function hashValue(value: string): string {
  return createHash("sha256")
    .update(value, "utf8")
    .digest("hex");
}

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function getIpHash(request: Request, publicKey: string): string {
  return hashValue(`${publicKey}:${getClientIp(request)}`);
}

async function getSessionByToken(
  config: WebChatConfigRow,
  sessionToken: string,
): Promise<WebChatSessionRow | null> {
  const tokenHash = hashValue(sessionToken);
  const query = new URLSearchParams({
    select: "*",
    config_id: `eq.${config.id}`,
    session_token_hash: `eq.${tokenHash}`,
    status: "eq.open",
    limit: "1",
  });

  const rows = await supabaseAdminJson<WebChatSessionRow[]>(
    `/rest/v1/web_chat_sessions?${query.toString()}`,
  );

  const session = rows[0] ?? null;

  if (
    session &&
    new Date(session.expires_at).getTime() <= Date.now()
  ) {
    const updateQuery = new URLSearchParams({
      id: `eq.${session.id}`,
    });

    await supabaseAdminJson<void>(
      `/rest/v1/web_chat_sessions?${updateQuery.toString()}`,
      {
        method: "PATCH",
        prefer: "return=minimal",
        body: JSON.stringify({ status: "expired" }),
      },
    );

    return null;
  }

  return session;
}

async function findExistingContact(input: {
  workspaceId: string;
  email: string | null;
  phone: string | null;
}): Promise<ContactRow | null> {
  const filters: string[] = [];

  if (input.email) {
    filters.push(`email.eq.${input.email}`);
  }

  if (input.phone) {
    filters.push(`phone.eq.${input.phone}`);
  }

  if (!filters.length) return null;

  const query = new URLSearchParams({
    select:
      "id,display_name,first_name,last_name,email,phone",
    workspace_id: `eq.${input.workspaceId}`,
    or: `(${filters.join(",")})`,
    order: "created_at.asc",
    limit: "1",
  });

  const rows = await supabaseAdminJson<ContactRow[]>(
    `/rest/v1/contacts?${query.toString()}`,
  );

  return rows[0] ?? null;
}

async function createOrUpdateContact(input: {
  config: WebChatConfigRow;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
}): Promise<ContactRow> {
  const names = splitName(input.name);
  const existing = await findExistingContact({
    workspaceId: input.config.workspace_id,
    email: input.email,
    phone: input.phone,
  });

  if (existing) {
    const values: Record<string, unknown> = {};

    if (!existing.email && input.email) {
      values.email = input.email;
    }

    if (!existing.phone && input.phone) {
      values.phone = input.phone;
    }

    if (Object.keys(values).length > 0) {
      values.updated_at = new Date().toISOString();
      const query = new URLSearchParams({
        id: `eq.${existing.id}`,
        workspace_id: `eq.${input.config.workspace_id}`,
      });

      const rows = await supabaseAdminJson<ContactRow[]>(
        `/rest/v1/contacts?${query.toString()}`,
        {
          method: "PATCH",
          prefer: "return=representation",
          body: JSON.stringify(values),
        },
      );

      return rows[0] ?? existing;
    }

    return existing;
  }

  const rows = await supabaseAdminJson<ContactRow[]>(
    "/rest/v1/contacts",
    {
      method: "POST",
      prefer: "return=representation",
      body: JSON.stringify({
        workspace_id: input.config.workspace_id,
        first_name: names.firstName,
        last_name: names.lastName,
        display_name: names.displayName,
        company_name: input.company,
        phone: input.phone,
        email: input.email,
        status: "lead",
        source: "web_chat",
      }),
    },
  );

  if (!rows[0]) {
    throw new Error("No fue posible registrar el contacto.");
  }

  return rows[0];
}

async function createConversation(input: {
  config: WebChatConfigRow;
  contact: ContactRow;
  origin: string;
  pageUrl: string | null;
}): Promise<ConversationRow> {
  const now = new Date().toISOString();
  const rows = await supabaseAdminJson<ConversationRow[]>(
    "/rest/v1/conversations",
    {
      method: "POST",
      prefer: "return=representation",
      body: JSON.stringify({
        workspace_id: input.config.workspace_id,
        contact_id: input.contact.id,
        assigned_user_id: null,
        channel: "internal",
        status: "open",
        priority: "normal",
        subject: `Chat web · ${input.config.widget_title}`,
        unread_count: 0,
        last_message_preview: null,
        last_message_at: now,
        metadata: {
          source: "web_chat",
          website_origin: input.origin,
          page_url: input.pageUrl,
          public_key: input.config.public_key,
        },
        created_at: now,
        updated_at: now,
      }),
    },
  );

  if (!rows[0]) {
    throw new Error("No fue posible abrir la conversación.");
  }

  return rows[0];
}

async function createSession(input: {
  request: Request;
  config: WebChatConfigRow;
  contact: ContactRow;
  conversation: ConversationRow;
  origin: string;
  pageUrl: string | null;
}): Promise<{
  session: WebChatSessionRow;
  sessionToken: string;
}> {
  const sessionToken = randomBytes(32).toString("base64url");
  const sessionTokenHash = hashValue(sessionToken);
  const now = new Date();
  const expiresAt = new Date(
    now.getTime() +
      input.config.session_timeout_minutes * 60_000,
  ).toISOString();

  const rows = await supabaseAdminJson<WebChatSessionRow[]>(
    "/rest/v1/web_chat_sessions",
    {
      method: "POST",
      prefer: "return=representation",
      body: JSON.stringify({
        config_id: input.config.id,
        workspace_id: input.config.workspace_id,
        contact_id: input.contact.id,
        conversation_id: input.conversation.id,
        session_token_hash: sessionTokenHash,
        origin: input.origin,
        page_url: input.pageUrl,
        ip_hash: getIpHash(
          input.request,
          input.config.public_key,
        ),
        user_agent: cleanText(
          input.request.headers.get("user-agent"),
          500,
        ) || null,
        status: "open",
        message_count: 0,
        last_activity_at: now.toISOString(),
        expires_at: expiresAt,
      }),
    },
  );

  if (!rows[0]) {
    throw new Error("No fue posible iniciar la sesión del chat.");
  }

  return {
    session: rows[0],
    sessionToken,
  };
}

async function countRecentMessages(
  session: WebChatSessionRow,
): Promise<number> {
  const since = new Date(
    Date.now() - 60_000,
  ).toISOString();
  const query = new URLSearchParams({
    select: "id",
    conversation_id: `eq.${session.conversation_id}`,
    direction: "eq.incoming",
    created_at: `gte.${since}`,
    limit: "31",
  });

  const rows = await supabaseAdminJson<Array<{ id: string }>>(
    `/rest/v1/conversation_messages?${query.toString()}`,
  );

  return rows.length;
}

async function getExistingMessage(
  session: WebChatSessionRow,
  externalMessageId: string,
): Promise<MessageRow | null> {
  const query = new URLSearchParams({
    select: "id,body",
    conversation_id: `eq.${session.conversation_id}`,
    external_message_id: `eq.${externalMessageId}`,
    limit: "1",
  });

  const rows = await supabaseAdminJson<MessageRow[]>(
    `/rest/v1/conversation_messages?${query.toString()}`,
  );

  return rows[0] ?? null;
}

async function getLastOutgoingReply(
  session: WebChatSessionRow,
): Promise<string | null> {
  const query = new URLSearchParams({
    select: "body",
    conversation_id: `eq.${session.conversation_id}`,
    direction: "eq.outgoing",
    order: "sent_at.desc",
    limit: "1",
  });

  const rows = await supabaseAdminJson<MessageRow[]>(
    `/rest/v1/conversation_messages?${query.toString()}`,
  );

  return rows[0]?.body ?? null;
}

async function insertMessage(input: {
  session: WebChatSessionRow;
  direction: "incoming" | "outgoing";
  body: string;
  externalMessageId: string;
  metadata: Record<string, unknown>;
}): Promise<string> {
  const now = new Date().toISOString();
  const rows = await supabaseAdminJson<Array<{ id: string }>>(
    "/rest/v1/conversation_messages",
    {
      method: "POST",
      prefer:
        "resolution=ignore-duplicates,return=representation",
      body: JSON.stringify({
        workspace_id: input.session.workspace_id,
        conversation_id: input.session.conversation_id,
        contact_id: input.session.contact_id,
        sender_user_id: null,
        direction: input.direction,
        message_type: "text",
        body: input.body,
        external_message_id: input.externalMessageId,
        status:
          input.direction === "incoming"
            ? "received"
            : "sent",
        metadata: input.metadata,
        sent_at: now,
        created_at: now,
      }),
    },
  );

  return rows[0]?.id ?? "";
}

async function updateConversation(input: {
  session: WebChatSessionRow;
  preview: string;
  incrementUnread: boolean;
}): Promise<void> {
  const now = new Date().toISOString();
  const query = new URLSearchParams({
    id: `eq.${input.session.conversation_id}`,
    workspace_id: `eq.${input.session.workspace_id}`,
  });

  await supabaseAdminJson<void>(
    `/rest/v1/conversations?${query.toString()}`,
    {
      method: "PATCH",
      prefer: "return=minimal",
      body: JSON.stringify({
        status: "open",
        unread_count: input.incrementUnread ? 1 : 0,
        last_message_preview: input.preview.slice(0, 500),
        last_message_at: now,
        updated_at: now,
      }),
    },
  );
}

async function updateSession(
  session: WebChatSessionRow,
  timeoutMinutes: number,
): Promise<void> {
  const now = new Date();
  const query = new URLSearchParams({
    id: `eq.${session.id}`,
  });

  await supabaseAdminJson<void>(
    `/rest/v1/web_chat_sessions?${query.toString()}`,
    {
      method: "PATCH",
      prefer: "return=minimal",
      body: JSON.stringify({
        message_count: session.message_count + 1,
        last_activity_at: now.toISOString(),
        expires_at: new Date(
          now.getTime() + timeoutMinutes * 60_000,
        ).toISOString(),
      }),
    },
  );
}

async function getAgentProfile(
  workspaceId: string,
): Promise<AgentProfileRow | null> {
  const query = new URLSearchParams({
    select: "enabled,operating_mode",
    workspace_id: `eq.${workspaceId}`,
    limit: "1",
  });

  const rows = await supabaseAdminJson<AgentProfileRow[]>(
    `/rest/v1/ai_agent_profiles?${query.toString()}`,
  );

  return rows[0] ?? null;
}

function agentCanAutoReply(
  profile: AgentProfileRow | null,
): boolean {
  return Boolean(
    profile?.enabled &&
      ["supervised", "autonomous"].includes(
        profile.operating_mode,
      ),
  );
}

export async function getWebChatHistory(input: {
  config: WebChatConfigRow;
  origin: string;
  sessionToken: string;
}): Promise<{
  contactId: string;
  conversationId: string;
  messages: PublicWebChatMessage[];
}> {
  const sessionToken = cleanText(input.sessionToken, 200);

  if (!sessionToken) {
    throw new Error("La sesión del chat es obligatoria.");
  }

  const session = await getSessionByToken(
    input.config,
    sessionToken,
  );

  if (!session || session.origin !== input.origin) {
    throw new Error("La sesión del chat venció o no es válida.");
  }

  const query = new URLSearchParams({
    select: "id,direction,body,sent_at",
    workspace_id: `eq.${session.workspace_id}`,
    conversation_id: `eq.${session.conversation_id}`,
    order: "sent_at.asc",
    limit: "80",
  });
  const rows = await supabaseAdminJson<
    Array<{
      id: string;
      direction: string;
      body: string | null;
      sent_at: string;
    }>
  >(`/rest/v1/conversation_messages?${query.toString()}`);

  return {
    contactId: session.contact_id,
    conversationId: session.conversation_id,
    messages: rows
      .filter(
        (row) =>
          (row.direction === "incoming" ||
            row.direction === "outgoing") &&
          Boolean(row.body?.trim()),
      )
      .map((row) => ({
        id: row.id,
        direction: row.direction as "incoming" | "outgoing",
        body: row.body?.trim() ?? "",
        sentAt: row.sent_at,
      })),
  };
}

export async function processWebChatMessage(input: {
  request: Request;
  config: WebChatConfigRow;
  origin: string;
  payload: WebChatMessageInput;
}): Promise<WebChatMessageResult> {
  const message = cleanText(input.payload.message, 2000);
  const pageUrl = cleanText(input.payload.pageUrl, 1000) || null;

  if (!message) {
    throw new Error("Escribe un mensaje antes de enviarlo.");
  }

  assertClientMessageId(input.payload.clientMessageId);

  let sessionToken = cleanText(
    input.payload.sessionToken,
    200,
  );
  let session = sessionToken
    ? await getSessionByToken(input.config, sessionToken)
    : null;

  if (session && session.origin !== input.origin) {
    throw new Error("La sesión no pertenece a este sitio.");
  }

  if (!session) {
    if (input.payload.consent !== true) {
      throw new Error(
        "Debes aceptar el aviso de privacidad para iniciar el chat.",
      );
    }

    const email = normalizeEmail(input.payload.email);
    const phone = normalizePhone(input.payload.phone);

    if (
      input.config.require_contact_method &&
      !email &&
      !phone
    ) {
      throw new Error(
        "Escribe un correo o teléfono válido para iniciar el chat.",
      );
    }

    const contact = await createOrUpdateContact({
      config: input.config,
      name: cleanText(input.payload.name, 160),
      email,
      phone,
      company:
        cleanText(input.payload.company, 160) || null,
    });
    const conversation = await createConversation({
      config: input.config,
      contact,
      origin: input.origin,
      pageUrl,
    });
    const created = await createSession({
      request: input.request,
      config: input.config,
      contact,
      conversation,
      origin: input.origin,
      pageUrl,
    });

    session = created.session;
    sessionToken = created.sessionToken;
  }

  const recentCount = await countRecentMessages(session);

  if (recentCount >= input.config.max_messages_per_minute) {
    throw new Error(
      "Enviaste varios mensajes en poco tiempo. Espera un minuto e inténtalo de nuevo.",
    );
  }

  const externalMessageId =
    `webchat:${session.id}:${input.payload.clientMessageId}`;
  const existing = await getExistingMessage(
    session,
    externalMessageId,
  );

  if (existing) {
    return {
      sessionToken,
      contactId: session.contact_id,
      conversationId: session.conversation_id,
      incomingMessageId: existing.id,
      replyMessageId: null,
      reply:
        (await getLastOutgoingReply(session)) ??
        input.config.offline_message,
      handoff: false,
    };
  }

  const incomingMessageId = await insertMessage({
    session,
    direction: "incoming",
    body: message,
    externalMessageId,
    metadata: {
      provider: "web_chat",
      source: "website_chat",
      website_origin: input.origin,
      page_url: pageUrl,
      client_message_id: input.payload.clientMessageId,
    },
  });

  if (!incomingMessageId) {
    return {
      sessionToken,
      contactId: session.contact_id,
      conversationId: session.conversation_id,
      incomingMessageId: null,
      replyMessageId: null,
      reply:
        (await getLastOutgoingReply(session)) ??
        input.config.offline_message,
      handoff: false,
    };
  }

  await Promise.all([
    updateConversation({
      session,
      preview: message,
      incrementUnread: true,
    }),
    updateSession(
      session,
      input.config.session_timeout_minutes,
    ),
  ]);

  const profile = await getAgentProfile(
    input.config.workspace_id,
  );
  let reply = input.config.offline_message;
  let handoff = true;
  let agentRunId: string | null = null;

  try {
    const result = await runSuperAgent({
      workspaceId: input.config.workspace_id,
      conversationId: session.conversation_id,
      contactId: session.contact_id,
      triggerMessageId: incomingMessageId || null,
      currentMessage: message,
      preview: false,
      source: "web",
    });

    agentRunId = result.runId ?? null;

    if (
      agentCanAutoReply(profile) &&
      !result.blocked &&
      result.decision &&
      !result.decision.handoff
    ) {
      reply = result.decision.reply;
      handoff = false;
    }
  } catch (error) {
    console.error("WEB_CHAT_AGENT_FAILED", {
      workspaceId: input.config.workspace_id,
      conversationId: session.conversation_id,
      error:
        error instanceof Error
          ? error.message
          : "Error desconocido del Super Agente.",
    });
  }

  const outgoingId = `webchat:${session.id}:reply:${randomUUID()}`;

  const replyMessageId = await insertMessage({
    session,
    direction: "outgoing",
    body: reply,
    externalMessageId: outgoingId,
    metadata: {
      provider: "web_chat",
      source: handoff
        ? "web_chat_handoff"
        : "super_agent",
      ai_agent_run_id: agentRunId,
      handoff,
    },
  });

  await updateConversation({
    session,
    preview: reply,
    incrementUnread: true,
  });

  return {
    sessionToken,
    contactId: session.contact_id,
    conversationId: session.conversation_id,
    incomingMessageId,
    replyMessageId: replyMessageId || null,
    reply,
    handoff,
  };
}
