"use client";

import {
  type FormEvent,
  type KeyboardEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type MessageComposerProps = {
  conversationId: string;
  channel: string;
  webChatEnabled?: boolean;
  disabled?: boolean;
};

type SendResponse = {
  ok?: boolean;
  error?: string;
  messageId?: string;
  sentAt?: string;
};

type AiDraftResponse = {
  ok?: boolean;
  error?: string;
  draft?: string;
  assistantName?: string;
  workspaceName?: string;
  requiresHumanApproval?: boolean;
};

export function MessageComposer({
  conversationId,
  channel,
  webChatEnabled = false,
  disabled = false,
}: MessageComposerProps) {
  const router = useRouter();

  const [body, setBody] = useState("");
  const [isSending, setIsSending] =
    useState(false);
  const [isGenerating, setIsGenerating] =
    useState(false);
  const [errorMessage, setErrorMessage] =
    useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const messengerEnabled =
    channel === "messenger";
  const externalSendEnabled =
    messengerEnabled || webChatEnabled;

  async function generateAiDraft() {
    if (
      disabled ||
      isSending ||
      isGenerating
    ) {
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsGenerating(true);

    try {
      const response = await fetch(
        "/api/ai/draft",
        {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            conversationId,
          }),
        },
      );

      const result = (await response
        .json()
        .catch(
          () => ({}),
        )) as AiDraftResponse;

      if (
        !response.ok ||
        result.ok === false ||
        !result.draft
      ) {
        throw new Error(
          result.error ??
            `No se pudo generar el borrador (${response.status}).`,
        );
      }

      setBody(
        result.draft.slice(0, 2000),
      );

      setSuccessMessage(
        `${result.assistantName ?? "La IA"} preparó un borrador para ${result.workspaceName ?? "la empresa activa"}. Revísalo antes de enviarlo.`,
      );
    } catch (error) {
      console.error(
        "Error al generar borrador con IA:",
        error,
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No fue posible generar el borrador.",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  async function sendMessage() {
    const cleanBody = body.trim();

    if (
      !cleanBody ||
      isSending ||
      isGenerating ||
      disabled
    ) {
      return;
    }

    if (!externalSendEnabled) {
      setErrorMessage(
        "El envío externo todavía no está habilitado para este canal.",
      );
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsSending(true);

    try {
      const response = await fetch(
        webChatEnabled
          ? "/conversations/api/send-web-chat"
          : "/conversations/api/send",
        {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            conversationId,
            body: cleanBody,
          }),
        },
      );

      const result = (await response
        .json()
        .catch(
          () => ({}),
        )) as SendResponse;

      if (
        !response.ok ||
        result.ok === false
      ) {
        throw new Error(
          result.error ??
            `No se pudo enviar el mensaje (${response.status}).`,
        );
      }

      setBody("");
      setSuccessMessage(
        "Mensaje enviado correctamente.",
      );
      router.refresh();
    } catch (error) {
      console.error(
        "Error al enviar mensaje:",
        error,
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No fue posible enviar el mensaje.",
      );
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    void sendMessage();
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <form
      className="message-composer"
      onSubmit={handleSubmit}
    >
      <div className="message-composer-toolbar">
        <button
          type="button"
          disabled
          title="Archivos próximamente"
        >
          Adjuntar
        </button>

        <button
          type="button"
          disabled
          title="Plantillas próximamente"
        >
          Plantillas
        </button>

        <button
          className="message-ai-draft-button"
          type="button"
          disabled={
            disabled ||
            isSending ||
            isGenerating
          }
          title="Preparar una sugerencia usando las instrucciones y la información de la empresa activa"
          onClick={() => {
            void generateAiDraft();
          }}
        >
          {isGenerating
            ? "Preparando respuesta..."
            : "Sugerir respuesta con IA"}
        </button>

        <span className="message-channel-status">
          {messengerEnabled
            ? "Messenger conectado"
            : webChatEnabled
              ? "Chat web conectado"
              : "Canal solo lectura"}
        </span>
      </div>

      <textarea
        rows={4}
        maxLength={2000}
        disabled={
          disabled ||
          isSending ||
          isGenerating ||
          !externalSendEnabled
        }
        placeholder={
          externalSendEnabled
            ? "Escribe una respuesta o crea un borrador con IA..."
            : "El envío se habilitará cuando este canal esté conectado."
        }
        value={body}
        onKeyDown={handleKeyDown}
        onChange={(event) => {
          setBody(event.target.value);
          setErrorMessage("");
          setSuccessMessage("");
        }}
      />

      <footer>
        <div>
          <span>
            {body.length} / 2000
          </span>

          <small>
            La IA solo prepara el borrador · Tú decides cuándo enviarlo
          </small>
        </div>

        <button
          className="message-send-button"
          type="submit"
          disabled={
            disabled ||
            isSending ||
            isGenerating ||
            !externalSendEnabled ||
            !body.trim()
          }
        >
          {isSending
            ? "Enviando..."
            : "Enviar mensaje"}
        </button>
      </footer>

      {errorMessage && (
        <p
          className="message-composer-error"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {successMessage && (
        <p
          className="message-composer-success"
          role="status"
        >
          {successMessage}
        </p>
      )}
    </form>
  );
}
