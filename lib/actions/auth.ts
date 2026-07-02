"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { isMockMode } from "@/config/mock";
import { ApiError, apiFetch } from "@/lib/api/client";
import { SESSION_COOKIE } from "@/lib/auth/session";

const registerSchema = z.object({
  businessName: z.string().min(1, "Business name is required").max(200),
  email: z.string().email("Enter a valid email address"),
  country: z.string().length(2, "Select your country"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
});

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export type AuthActionState = {
  error?: string;
};

type AuthResponse = {
  token: string;
};

async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function registerUser(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (isMockMode()) {
    redirect("/dashboard");
  }

  const parsed = registerSchema.safeParse({
    businessName: formData.get("businessName"),
    email: formData.get("email"),
    country: formData.get("country"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const { token } = await apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(parsed.data),
    });

    await setSessionCookie(token);
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    return { error: "Something went wrong. Please try again." };
  }

  redirect("/dashboard");
}

export async function signInWithCredentials(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const callbackUrl = formData.get("callbackUrl");

  if (isMockMode()) {
    const destination =
      typeof callbackUrl === "string" && callbackUrl.startsWith("/")
        ? callbackUrl
        : "/dashboard";
    redirect(destination);
  }

  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Email and password are required" };
  }

  try {
    const { token } = await apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    await setSessionCookie(token);
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    return { error: "Something went wrong. Please try again." };
  }

  const destination =
    typeof callbackUrl === "string" && callbackUrl.startsWith("/")
      ? callbackUrl
      : "/dashboard";

  redirect(destination);
}

export async function signOut() {
  if (!isMockMode()) {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
  }
  redirect("/");
}
