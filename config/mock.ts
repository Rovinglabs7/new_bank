export const mockUser = {
  id: "mock-user-id",
  email: "dev@sprout.com",
  name: "Bean There Coffee",
} as const;

/** When true, auth and API calls are bypassed so every page is reachable without the backend. */
export function isMockMode(): boolean {
  return process.env.MOCK_MODE === "true";
}
