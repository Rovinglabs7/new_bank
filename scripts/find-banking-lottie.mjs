import { readFileSync } from "fs";
import { join } from "path";

const js = readFileSync(
  join(process.cwd(), "public", "ramp-files", "0muplqiods2wh.js.download"),
  "utf-8"
);
// Find component U (integrations) - search for home-integrations string
const i = js.indexOf("home-integrations");
console.log("home-integrations in platform js:", i >= 0 ? js.slice(i - 100, i + 150) : "NOT FOUND");

const bundle = readFileSync(
  join(process.cwd(), "public", "ramp-files", "0ng.340zy-m9-.js.download"),
  "utf-8"
);
for (const key of ["home-integrations", "treasury-platform", "q4-treasury-rba", "home-price-intelligence"]) {
  const m = bundle.match(new RegExp(`"${key}":\\{src:"([^"]+)",width:(\\d+),height:(\\d+)`));
  if (m) console.log(key, m[1], m[2], m[3]);
}
