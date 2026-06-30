import { readFileSync } from "fs";
import { join } from "path";

const js = readFileSync(
  join(process.cwd(), "public", "ramp-files", "0muplqiods2wh.js.download"),
  "utf-8"
);
const idx = js.indexOf("200+ Integrations");
console.log(js.slice(idx - 800, idx + 200));

const bundle = readFileSync(
  join(process.cwd(), "public", "ramp-files", "0ng.340zy-m9-.js.download"),
  "utf-8"
);
for (const key of [
  "home-sync-with-netsuite",
  "home-integrations",
  "integrations-globe",
  "homepage-integrations",
  "platform-integrations",
  "integrations-hero",
  "home-price-intelligence",
]) {
  const m = bundle.match(new RegExp(`"${key}":\\{src:"([^"]+)"`));
  if (m) console.log(key, "->", m[1]);
}

// search sync-with-netsuite in bundle
const i = bundle.indexOf("home-sync");
console.log("\nhome-sync context:", bundle.slice(i, i + 200));
