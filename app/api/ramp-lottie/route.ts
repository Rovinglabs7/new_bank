import { NextRequest } from "next/server";

const ALLOWED_PREFIXES = [
  "https://assets.ramp.com/",
  "https://cdn.air.inc/",
] as const;

function isAllowedUrl(url: string): boolean {
  return ALLOWED_PREFIXES.some((prefix) => url.startsWith(prefix));
}

/** Proxies Ramp CDN lottie assets with redirect follow (cdn.air.inc returns 302). */
export async function GET(request: NextRequest) {
  const remoteUrl = request.nextUrl.searchParams.get("url");
  if (!remoteUrl || !isAllowedUrl(remoteUrl)) {
    return new Response("Invalid url", { status: 400 });
  }

  const upstream = await fetch(remoteUrl, {
    redirect: "follow",
    headers: { Accept: "*/*" },
  });

  if (!upstream.ok) {
    return new Response("Upstream error", { status: upstream.status });
  }

  const body = await upstream.arrayBuffer();
  return new Response(body, {
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/octet-stream",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
