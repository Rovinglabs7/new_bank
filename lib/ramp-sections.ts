import { readFileSync } from "fs";
import { join } from "path";
import {
  RAMP_SECTION_MANIFEST,
  type RampSectionMeta,
} from "./ramp-sections.manifest";

export type { RampSectionMeta };

export function getRampSectionHtml(slug: string): string {
  const meta = RAMP_SECTION_MANIFEST.find((s) => s.slug === slug);
  if (!meta) return "";
  try {
    return readFileSync(
      join(process.cwd(), "public", "ramp-sections", meta.file),
      "utf-8"
    );
  } catch {
    return "";
  }
}

export function getRampSectionMeta(slug: string): RampSectionMeta | undefined {
  return RAMP_SECTION_MANIFEST.find((s) => s.slug === slug);
}

export function listRampSections(): RampSectionMeta[] {
  return RAMP_SECTION_MANIFEST;
}
