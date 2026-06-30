/**
 * Homepage section order — reorder, comment out, or add slugs here.
 * Each slug maps to an independent component in components/ramp/sections/
 */
export const rampHomeSectionOrder = [
  "logos-marquee",
  "platform-back-office",
  "systems-integration",
  "finance-intelligence",
  "stack-banner",
  "team-scale",
  "testimonials",
] as const;

export type RampHomeSectionSlug = (typeof rampHomeSectionOrder)[number];
