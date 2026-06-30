import { RAMP_STYLESHEETS } from "@/lib/ramp-sections.manifest";

export function RampStyles() {
  return (
    <>
      {RAMP_STYLESHEETS.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}
