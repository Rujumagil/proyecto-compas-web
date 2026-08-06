import {
  assertAllowedOrigin,
  createCorsHeaders,
  getRequestOrigin,
  getWebChatConfig,
  toPublicConfig,
} from "@/lib/web-chat/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorResponse(
  message: string,
  status: number,
  origin?: string | null,
) {
  const headers = origin
    ? createCorsHeaders(origin)
    : new Headers();

  return Response.json(
    { ok: false, error: message },
    { status, headers },
  );
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
    return errorResponse(
      error instanceof Error
        ? error.message
        : "No fue posible validar el chat.",
      403,
      origin,
    );
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const publicKey = url.searchParams.get("key")?.trim() ?? "";
  const origin = getRequestOrigin(request);

  try {
    const config = await getWebChatConfig(publicKey);
    const allowedOrigin = assertAllowedOrigin(config, origin);

    return Response.json(
      {
        ok: true,
        config: toPublicConfig(config),
      },
      {
        headers: createCorsHeaders(allowedOrigin),
      },
    );
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error.message
        : "El chat no está disponible.",
      403,
      origin,
    );
  }
}
