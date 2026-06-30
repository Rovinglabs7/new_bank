import { getRampSectionHtml } from "@/lib/ramp-sections";

type Props = {
  slug: string;
  className?: string;
};

/**
 * Server-rendered Ramp section HTML — no Next.js hydration from ramp.com.
 * Edit copy via config or replace this section with a React rebuild over time.
 */
export function RampSection({ slug, className }: Props) {
  const html = getRampSectionHtml(slug);
  if (!html) return null;

  return (
    <div
      className={className ? `ramp-section ${className}` : "ramp-section"}
      data-ramp-section={slug}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
