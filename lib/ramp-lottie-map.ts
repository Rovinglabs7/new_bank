/**
 * Maps dotLottie instance IDs from the static HTML export to animation files.
 * data-name UUIDs are player instance IDs, not CDN asset IDs.
 * Files are self-hosted in public/ramp-lottie/ (see scripts/download-ramp-lotties.mjs).
 */
export const RAMP_LOTTIE_BY_INSTANCE_ID: Record<string, string> = {
  "3e105fd2-91e0-4ed7-9f90-5a6a3cd3ef9b": "/ramp-lottie/homepage-card-expenses.lottie",
  "90d8b5b4-5f02-4057-b689-c426c8ad69b5": "/ramp-lottie/homepage-procure-to-pay.lottie",
  "3eea5c57-6163-49a2-ab5e-c9e0e909abc4": "/ramp-lottie/homepage-accounting-automation.lottie",
  "e4db6a82-366f-4a97-8ae5-f8f9fca3e87c": "/ramp-lottie/home-old-way.lottie",
  "35d072d7-de4b-418c-adcb-bdbda015e518": "/ramp-lottie/home-new-way.lottie",
};

/** Remote URLs in exported HTML → local self-hosted paths */
export const RAMP_LOTTIE_REMOTE_ALIASES: Record<string, string> = {
  "https://cdn.air.inc/e754352b-9997-49c5-a5fa-bca8f3d3e646":
    "/ramp-lottie/finance-policy-agent.lottie",
  "https://cdn.air.inc/d121e557-9dbe-427b-bb5b-b7f607d6e5c2":
    "/ramp-lottie/homepage-accounting-automation.lottie",
};

export function resolveRampLottieSrc(instanceId: string): string | null {
  return RAMP_LOTTIE_BY_INSTANCE_ID[instanceId] ?? null;
}

export function proxyRampLottieUrl(url: string): string {
  const local = RAMP_LOTTIE_REMOTE_ALIASES[url.replace(/&amp;/g, "&")];
  if (local) return local;
  if (url.startsWith("/ramp-lottie/")) return url;
  // Fallback proxy for any remaining remote URLs
  if (url.startsWith("https://cdn.air.inc/")) {
    return `/api/ramp-lottie?url=${encodeURIComponent(url)}`;
  }
  if (url.startsWith("https://assets.ramp.com/")) {
    return url.replace("https://assets.ramp.com/", "/ramp-lottie/assets/");
  }
  return url;
}
