"use server";

import { z } from "zod";
import { isMockMode } from "@/config/mock";
import { ApiError, apiFetch } from "@/lib/api/client";

export type LeadActionState = {
  error?: string;
  success?: boolean;
};

type LeadResponse = {
  id: string;
  ok: boolean;
};

const waitlistSchema = z.object({
  email: z.string().email("Enter a valid work email"),
});

const demoSchema = z.object({
  email: z.string().email("Enter a valid work email"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().min(1, "Company name is required"),
  website: z.string().optional(),
  size: z.string().min(1, "Select your business size"),
  volume: z.string().min(1, "Select your monthly payment volume"),
  interests: z.array(z.string()),
});

const partnerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  workEmail: z.string().email("Enter a valid work email"),
  companyName: z.string().min(1, "Company name is required"),
  companyWebsite: z.string().min(1, "Company website is required"),
  integration: z.string().min(1, "Tell us what you want to integrate"),
  userCount: z.string().min(1, "Select an estimated user count"),
});

const careerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  role: z.string().min(1, "Role or area is required"),
  linkedin: z.string().min(1, "LinkedIn profile is required"),
  github: z.string().optional(),
  video: z.string().min(1, "Video introduction link is required"),
  aboutYou: z.string().min(1, "Tell us about yourself"),
  offer: z.string().min(1, "Tell us what you can offer"),
  whyPraevor: z.string().min(1, "Tell us why Praevor"),
});

function parseInterests(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function emptyToUndefined(value: FormDataEntryValue | null): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function formString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

async function submitLead(
  path: string,
  body: Record<string, unknown>,
): Promise<LeadActionState> {
  if (isMockMode()) {
    return { success: true };
  }

  try {
    await apiFetch<LeadResponse>(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

export async function joinWaitlist(
  _prev: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const parsed = waitlistSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid email" };
  }

  return submitLead("/leads/waitlist", parsed.data);
}

export async function submitDemoRequest(
  _prev: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const parsed = demoSchema.safeParse({
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    company: formData.get("company"),
    website: emptyToUndefined(formData.get("website")),
    size: formData.get("size"),
    volume: formData.get("volume"),
    interests: parseInterests(formData.get("interests")),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  return submitLead("/leads/demo", parsed.data);
}

export async function submitPartnerApplication(
  _prev: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const parsed = partnerSchema.safeParse({
    fullName: formData.get("fullName"),
    workEmail: formData.get("workEmail"),
    companyName: formData.get("companyName"),
    companyWebsite: formData.get("companyWebsite"),
    integration: formData.get("integration"),
    userCount: formData.get("userCount"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  return submitLead("/leads/partner", parsed.data);
}

export async function submitCareerApplication(
  _prev: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const parsed = careerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    role: formData.get("role"),
    linkedin: formData.get("linkedin"),
    github: emptyToUndefined(formData.get("github")),
    video: formData.get("video"),
    aboutYou: formData.get("aboutYou"),
    offer: formData.get("offer"),
    whyPraevor: formData.get("whyPraevor"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  return submitLead("/leads/career", parsed.data);
}

export async function submitDemoRequestFromClient(data: {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  size: string;
  volume: string;
  interests: string[];
}): Promise<LeadActionState> {
  const parsed = demoSchema.safeParse({
    ...data,
    website: data.website.trim() || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  return submitLead("/leads/demo", parsed.data);
}

export async function submitPartnerApplicationFromClient(
  data: Record<string, string>,
): Promise<LeadActionState> {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.set(key, value));
  return submitPartnerApplication({}, formData);
}

export async function submitCareerApplicationFromClient(
  data: Record<string, string>,
): Promise<LeadActionState> {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.set(key, value));
  return submitCareerApplication({}, formData);
}
