/**
 * Maps dotLottie instance IDs from the static HTML export to real animation URLs.
 * data-name UUIDs are player instance IDs, not CDN asset IDs.
 * Sources extracted from Ramp KbLotties (public/ramp-files/0ng.340zy-m9-.js.download).
 */
export const RAMP_LOTTIE_BY_INSTANCE_ID: Record<string, string> = {
  // Platform — Cards, Procure-to-pay, Accounting automation
  "3e105fd2-91e0-4ed7-9f90-5a6a3cd3ef9b":
    "https://assets.ramp.com/nextjs/lottie/home/refresh/homepage-card-expenses-mobile-0413.lottie",
  "90d8b5b4-5f02-4057-b689-c426c8ad69b5":
    "https://assets.ramp.com/nextjs/lottie/home/refresh/homepage-procure-to-pay-0423-mobile.lottie",
  "3eea5c57-6163-49a2-ab5e-c9e0e909abc4":
    "https://cdn.air.inc/d121e557-9dbe-427b-bb5b-b7f607d6e5c2",
  // Systems — old way / new way scroll section
  "e4db6a82-366f-4a97-8ae5-f8f9fca3e87c":
    "https://assets.ramp.com/nextjs/lottie/home/refresh/home_old_way.lottie?v=2",
  "35d072d7-de4b-418c-adcb-bdbda015e518":
    "https://assets.ramp.com/nextjs/lottie/home/refresh/home_new_way.lottie?v=3",
};

export function resolveRampLottieSrc(instanceId: string): string | null {
  return RAMP_LOTTIE_BY_INSTANCE_ID[instanceId] ?? null;
}
