import { randomUUID } from "node:crypto";

import {
  getAuthenticatedConversation,
  serviceRoleFetch,
  validateSameOrigin,
} from "@/lib/messenger-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function metadataSource(
  metadata: Record<string, unknown> | null,
): string {
  const value = metadata?.source;
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  if (!validateSameOrigin(request)) {
    return Response.json(
      { ok: false, error: "Origen no autorizado." },
      { status: 403 },
    );
  }

  try {
    const payload = (await request.json()) as {
      conversationId?: string;
      body?: string;
    };
    const conversationId = payload.conversationId?.trim() ?? "";
    const body = payload.body?.trim().slice(0, 2000) ?? "";

    if (!conversationId || !body) {
      return Response.json(
        {
          ok: false,
          error: "La conversación y el mensaje son obligatorios.",
        },
        { status: 400 },
      );
    }

    const { supabase, conversation } =
      await getAuthenticatedConversation(conversationId);

    if (
      conversation.channel !== "internal" ||
      metadataSource(conversation.metadata) !== "web_chat"
    ) {
      return Response.json(
        {
          ok: false,
          error: "La conversación no pertenece al Chat Web.",
        },
        { status: 409 },
      );
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return Response.json(
        { ok: false, error: "Sesión no válida." },
        { status: 401 },
      );
    }

    const now = new Date().toISOString();
    const externalMessageId =
      `webchat-human:${conversation.id}:${randomUUID()}`;
    const insertResponse = await serviceRoleFetch(
      "/rest/v1/conversation_messages",
      {
        method: "POST",
        headers: {
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          workspace_id: conversation.workspace_id,
          conversation_id: conversation.id,
          contact_id: conversation.contact_id,
          sender_user_id: user.id,
          direction: "outgoing",
          message_type: "text",
          body,
          external_message_id: externalMessageId,
          status: "sent",
          metadata: {
            provider: "web_chat",
            source: "human_web_chat",
            sent_by: user.id,
          },
          sent_at: now,
          created_at: now,
        }),
      },
    );
    const insertText = await insertResponse.text();

    if (!insertResponse.ok) {
      throw new Error(
        `No fue posible guardar la respuesta: ${insertText.slice(0, 400)}`,
      );
    }

    const rows = insertText
      ? (JSON.parse(insertText) as Array<{ id?: string }>)
      : [];
    const conversationQuery = new URLSearchParams({
      id: `eq.${conversation.id}`,
      workspace_id: `eq.${conversation.workspace_id}`,
    });
    const updateResponse = await serviceRoleFetch(
      `/rest/v1/conversations?${conversationQuery.toString()}`,
      {
        method: "PATCH",
        headers: {
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          status: "open",
          unread_count: 0,
          last_message_preview: body.slice(0, 500),
          last_message_at: now,
          updated_at: now,
        }),
      },
    );

    if (!updateResponse.ok) {
      console.error(
        "WEB_CHAT_HUMAN_CONVERSATION_UPDATE_FAILED",
        await updateResponse.text(),
      );
    }

    return Response.json({
      ok: true,
      messageId: rows[0]?.id ?? null,
      sentAt: now,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "No fue posible enviar la respuesta.",
      },
      { status: 500 },
    );
  }
}
