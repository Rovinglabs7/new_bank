import { readFileSync } from "fs";
import { join } from "path";

const p = readFileSync(
  join(process.cwd(), "public", "ramp-sections", "02-platform-back-office.html"),
  "utf-8"
);
for (const label of ["Banking", "200+ Integrations", "Accounting automation"]) {
  const i = p.indexOf(label);
  const chunk = p.slice(i, i + 1200);
  const canvas = chunk.includes("<canvas");
  const dataName = chunk.match(/data-name="([^"]+)"/);
  console.log(label, "canvas:", canvas, "data-name:", dataName?.[1] ?? "none");
}

const bundle = readFileSync(
  join(process.cwd(), "public", "ramp-files", "0ng.340zy-m9-.js.download"),
  "utf-8"
);
const keys = [...bundle.matchAll(/"(home-[^"]+)":\{src:"([^"]+)"/g)].map((m) => m[1]);
console.log("\nhome-* keys:", keys);
