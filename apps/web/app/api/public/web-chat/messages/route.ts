import {
  assertAllowedOrigin,
  createCorsHeaders,
  getRequestOrigin,
  getWebChatConfig,
  getWebChatHistory,
  processWebChatMessage,
  type WebChatMessageInput,
} from "@/lib/web-chat/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function responseJson(
  body: Record<string, unknown>,
  status: number,
  origin: string,
) {
  return Response.json(body, {
    status,
    headers: createCorsHeaders(origin),
  });
}

export async function OPTIONS(request: Request) {
  const url = new URL(request.url);
  const publicKey = url.searchParams.get("key")?.trim() ?? "";
  const origin = getRequestOrigin(request);

  try {
    const config = await getWebChatConfig(publicKey);
    const allowedOrigin = assertAllowedOrigin(config, origin);

    return new Response(null, {
      status: 204,
      headers: createCorsHeaders(allowedOrigin),
    });
  } catch (error) {
    const safeOrigin = origin ?? "null";
    return responseJson(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "No fue posible validar el chat.",
      },
      403,
      safeOrigin,
    );
  }
}


export async function GET(request: Request) {
  const url = new URL(request.url);
  const publicKey = url.searchParams.get("key")?.trim() ?? "";
  const sessionToken =
    request.headers.get("x-compas-chat-session")?.trim() ?? "";
  const origin = getRequestOrigin(request);

  if (!origin) {
    return Response.json(
      { ok: false, error: "No fue posible validar el origen del sitio." },
      { status: 403 },
    );
  }

  try {
    const config = await getWebChatConfig(publicKey);
    const allowedOrigin = assertAllowedOrigin(config, origin);
    const history = await getWebChatHistory({
      config,
      origin: allowedOrigin,
      sessionToken,
    });

    return responseJson(
      { ok: true, ...history },
      200,
      allowedOrigin,
    );
  } catch (error) {
    return responseJson(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "No fue posible consultar el historial.",
      },
      401,
      origin,
    );
  }
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const queryKey = url.searchParams.get("key")?.trim() ?? "";
  const origin = getRequestOrigin(request);

  if (!origin) {
    return Response.json(
      {
        ok: false,
        error: "No fue posible validar el origen del sitio.",
      },
      { status: 403 },
    );
  }

  try {
    const payload = (await request.json()) as WebChatMessageInput;
    const publicKey = queryKey || payload.publicKey?.trim() || "";
    const config = await getWebChatConfig(publicKey);
    const allowedOrigin = assertAllowedOrigin(config, origin);
    const result = await processWebChatMessage({
      request,
      config,
      origin: allowedOrigin,
      payload: {
        ...payload,
        publicKey,
      },
    });

    return responseJson(
      {
        ok: true,
        ...result,
      },
      200,
      allowedOrigin,
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No fue posible enviar el mensaje.";
    const status = /varios mensajes|Espera un minuto/i.test(message)
      ? 429
      : /origen|dominio|clave pública|no está disponible/i.test(message)
        ? 403
        : 400;

    return responseJson(
      { ok: false, error: message },
      status,
      origin,
    );
  }
}
