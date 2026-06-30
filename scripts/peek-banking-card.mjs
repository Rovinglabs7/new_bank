import { readFileSync } from "fs";
import { join } from "path";

const p = readFileSync(
  join(process.cwd(), "public", "ramp-sections", "02-platform-back-office.html"),
  "utf-8"
);
const i = p.indexOf("Banking");
console.log(p.slice(i, i + 1800));

const bundle = readFileSync(
  join(process.cwd(), "public", "ramp-files", "0ng.340zy-m9-.js.download"),
  "utf-8"
);
for (const key of [
  "home-integrations",
  "home-price-intelligence",
  "home-completely-flexible",
  "treasury-platform",
  "q4-treasury-rba",
  "q4-treasury-cash-manager",
]) {
  const m = bundle.match(new RegExp(`"${key}":\\{src:"([^"]+)"`));
  if (m) console.log(key, "->", m[1]);
}
