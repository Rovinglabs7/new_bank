export const mockUser = {
  id: "mock-user-id",
  email: "dev@praevor.com",
  name: "Bean There Coffee",
} as const;

function normalizeEnvFlag(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().replace(/^["']|["']$/g, "").toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

function hasProductionApi(): boolean {
  const apiUrl = process.env.API_URL?.trim().replace(/^["']|["']$/g, "");
  if (!apiUrl) return false;
  return !/(localhost|127\.0\.0\.1)/i.test(apiUrl);
}

/** When true, auth and API calls are bypassed so every page is reachable without the backend. */
export function isMockMode(): boolean {
  if (normalizeEnvFlag(process.env.MOCK_MODE)) return true;
  if (normalizeEnvFlag(process.env.NEXT_PUBLIC_MOCK_MODE)) return true;

  // Production deploys without a reachable API (e.g. Cloudflare Workers) should
  // stay in mock mode so sign-in/sign-up do not hit localhost.
  if (process.env.NODE_ENV === "production" && !hasProductionApi()) {
    return true;
  }

  return false;
}
