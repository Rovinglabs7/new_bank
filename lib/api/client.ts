import { isMockMode } from "@/config/mock";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

const MOCK_AUTH_RESPONSES: Record<string, unknown> = {
  "/auth/register": { token: "mock-token" },
  "/auth/login": { token: "mock-token" },
};

type ValidationIssue = {
  msg?: string;
};

type ApiErrorBody = {
  error?: string;
  detail?: string | ValidationIssue[];
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function parseApiError(body: ApiErrorBody): string {
  if (body.error) return body.error;
  if (typeof body.detail === "string") return body.detail;
  if (Array.isArray(body.detail) && body.detail[0]?.msg) {
    return body.detail[0].msg;
  }
  return "Request failed";
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (isMockMode()) {
    const mock = MOCK_AUTH_RESPONSES[path];
    if (mock) return mock as T;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });

  const body = (await response.json().catch(() => ({}))) as T & ApiErrorBody;

  if (!response.ok) {
    throw new ApiError(parseApiError(body), response.status);
  }

  return body;
}
