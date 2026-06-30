import { readFileSync } from "fs";
import { join } from "path";

const p = readFileSync(
  join(process.cwd(), "public", "ramp-sections", "02-platform-back-office.html"),
  "utf-8"
);
const idx = p.indexOf("200+ Integrations");
console.log(p.slice(idx, idx + 2500).replace(/\s+/g, " "));
