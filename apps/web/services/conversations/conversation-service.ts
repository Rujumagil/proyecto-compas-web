import { requireWorkspaceFeature } from "@/lib/access/workspace-access";

export type ConversationChannel =
  | "whatsapp"
  | "facebook"
  | "instagram"
  | "messenger"
  | "email"
  | "internal";

export type ConversationStatus =
  | "new"
  | "open"
  | "pending"
  | "closed"
  | "archived";

export type ConversationPriority =
  | "low"
  | "normal"
  | "high"
  | "urgent";

export type ConversationListItem = {
  id: string;
  workspace_id: string;
  workspace_name: string;
  contact_id: string;
  assigned_user_id: string | null;
  channel: ConversationChannel;
  status: ConversationStatus;
  priority: ConversationPriority;
  subject: string | null;
  metadata: Record<string, unknown> | null;
  unread_count: number;
  last_message_preview: string | null;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
  contact: {
    id: string;
    display_name: string;
    avatar_url: string | null;
    email: string | null;
    phone: string | null;
    company_name: string | null;
  } | null;
};

export type ConversationMessage = {
  id: string;
  conversation_id: string;
  contact_id: string | null;
  sender_user_id: string | null;
  direction:
    | "incoming"
    | "outgoing"
    | "internal";
  message_type: string;
  body: string | null;
  status: string;
  media_url: string | null;
  media_name: string | null;
  sent_at: string;
  created_at: string;
};

export type ConversationDetail = {
  conversation: ConversationListItem;
  messages: ConversationMessage[];
};

const allowedChannels: ConversationChannel[] = [
  "whatsapp",
  "facebook",
  "instagram",
  "messenger",
  "email",
  "internal",
];

const allowedStatuses: ConversationStatus[] = [
  "new",
  "open",
  "pending",
  "closed",
  "archived",
];

const allowedPriorities: ConversationPriority[] = [
  "low",
  "normal",
  "high",
  "urgent",
];

function normalizeChannel(
  value: unknown,
): ConversationChannel {
  if (
    typeof value === "string" &&
    allowedChannels.includes(
      value as ConversationChannel,
    )
  ) {
    return value as ConversationChannel;
  }

  return "internal";
}

function normalizeStatus(
  value: unknown,
): ConversationStatus {
  if (
    typeof value === "string" &&
    allowedStatuses.includes(
      value as ConversationStatus,
    )
  ) {
    return value as ConversationStatus;
  }

  return "open";
}

function normalizePriority(
  value: unknown,
): ConversationPriority {
  if (
    typeof value === "string" &&
    allowedPriorities.includes(
      value as ConversationPriority,
    )
  ) {
    return value as ConversationPriority;
  }

  return "normal";
}

function firstRelation(
  value: unknown,
): Record<string, unknown> | null {
  const relation = Array.isArray(value)
    ? value[0]
    : value;

  if (
    typeof relation !== "object" ||
    relation === null
  ) {
    return null;
  }

  return relation as Record<
    string,
    unknown
  >;
}

function normalizeContactRelation(
  value: unknown,
): ConversationListItem["contact"] {
  const contact = firstRelation(value);

  if (!contact) {
    return null;
  }

  if (
    typeof contact.id !== "string" ||
    typeof contact.display_name !== "string"
  ) {
    return null;
  }

  return {
    id: contact.id,
    display_name: contact.display_name,
    avatar_url:
      typeof contact.avatar_url === "string"
        ? contact.avatar_url
        : null,
    email:
      typeof contact.email === "string"
        ? contact.email
        : null,
    phone:
      typeof contact.phone === "string"
        ? contact.phone
        : null,
    company_name:
      typeof contact.company_name === "string"
        ? contact.company_name
        : null,
  };
}

function normalizeWorkspaceName(
  value: unknown,
) {
  const workspace = firstRelation(value);

  if (
    workspace &&
    typeof workspace.name === "string" &&
    workspace.name.trim()
  ) {
    return workspace.name.trim();
  }

  return "Sin workspace";
}

function normalizeConversation(
  conversation: Record<string, unknown>,
): ConversationListItem {
  return {
    id: String(conversation.id),
    workspace_id: String(
      conversation.workspace_id,
    ),
    workspace_name:
      normalizeWorkspaceName(
        conversation.workspace,
      ),
    contact_id: String(
      conversation.contact_id,
    ),
    assigned_user_id:
      typeof conversation.assigned_user_id ===
      "string"
        ? conversation.assigned_user_id
        : null,
    channel: normalizeChannel(
      conversation.channel,
    ),
    status: normalizeStatus(
      conversation.status,
    ),
    priority: normalizePriority(
      conversation.priority,
    ),
    subject:
      typeof conversation.subject === "string"
        ? conversation.subject
        : null,
    metadata:
      typeof conversation.metadata === "object" &&
      conversation.metadata !== null &&
      !Array.isArray(conversation.metadata)
        ? (conversation.metadata as Record<string, unknown>)
        : null,
    unread_count:
      typeof conversation.unread_count ===
      "number"
        ? conversation.unread_count
        : 0,
    last_message_preview:
      typeof conversation.last_message_preview ===
      "string"
        ? conversation.last_message_preview
        : null,
    last_message_at:
      typeof conversation.last_message_at ===
      "string"
        ? conversation.last_message_at
        : null,
    created_at: String(
      conversation.created_at,
    ),
    updated_at: String(
      conversation.updated_at,
    ),
    contact: normalizeContactRelation(
      conversation.contact,
    ),
  };
}

const conversationSelect = `
  id,
  workspace_id,
  contact_id,
  assigned_user_id,
  channel,
  status,
  priority,
  subject,
  metadata,
  unread_count,
  last_message_preview,
  last_message_at,
  created_at,
  updated_at,
  workspace:workspaces (
    name
  ),
  contact:contacts (
    id,
    display_name,
    avatar_url,
    email,
    phone,
    company_name
  )
`;

export async function getConversations(): Promise<
  ConversationListItem[]
> {
  const { supabase, workspaceId } =
    await requireWorkspaceFeature("conversations");

  const { data, error } = await supabase
    .from("conversations")
    .select(conversationSelect)
    .eq("workspace_id", workspaceId)
    .neq("status", "archived")
    .order("last_message_at", {
      ascending: false,
      nullsFirst: false,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(
      `No fue posible cargar las conversaciones: ${error.message}`,
    );
  }

  return (data ?? []).map((conversation) =>
    normalizeConversation(
      conversation as Record<
        string,
        unknown
      >,
    ),
  );
}

export async function getConversationDetail(
  conversationId: string,
): Promise<ConversationDetail | null> {
  const { supabase, workspaceId } =
    await requireWorkspaceFeature("conversations");

  const {
    data: conversationData,
    error: conversationError,
  } = await supabase
    .from("conversations")
    .select(conversationSelect)
    .eq("id", conversationId)
    .eq("workspace_id", workspaceId)
    .maybeSingle();

  if (conversationError) {
    throw new Error(
      `No fue posible cargar la conversación: ${conversationError.message}`,
    );
  }

  if (!conversationData) {
    return null;
  }

  const conversation =
    normalizeConversation(
      conversationData as Record<
        string,
        unknown
      >,
    );

  const {
    data: messagesData,
    error: messagesError,
  } = await supabase
    .from("conversation_messages")
    .select(`
      id,
      conversation_id,
      contact_id,
      sender_user_id,
      direction,
      message_type,
      body,
      status,
      media_url,
      media_name,
      sent_at,
      created_at
    `)
    .eq(
      "conversation_id",
      conversation.id,
    )
    .eq(
      "workspace_id",
      conversation.workspace_id,
    )
    .order("sent_at", {
      ascending: true,
    });

  if (messagesError) {
    throw new Error(
      `No fue posible cargar los mensajes: ${messagesError.message}`,
    );
  }

  const messages: ConversationMessage[] = (
    messagesData ?? []
  ).map((message) => ({
    id: message.id,
    conversation_id:
      message.conversation_id,
    contact_id:
      message.contact_id ?? null,
    sender_user_id:
      message.sender_user_id ?? null,
    direction:
      message.direction as ConversationMessage["direction"],
    message_type: message.message_type,
    body: message.body ?? null,
    status: message.status,
    media_url: message.media_url ?? null,
    media_name: message.media_name ?? null,
    sent_at: message.sent_at,
    created_at: message.created_at,
  }));

  return {
    conversation,
    messages,
  };
}
