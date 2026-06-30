import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const dir = join(process.cwd(), "public", "ramp-sections");

for (const file of readdirSync(dir)) {
  const h = readFileSync(join(dir, file), "utf-8");
  if (h.includes("ramp.comhttps") || h.includes("Integrations") || h.includes("air-prod")) {
    console.log("\n===", file, "===");
    if (h.includes("ramp.comhttps")) console.log("  BAD: ramp.comhttps");
    const idx = h.indexOf("200+ Integrations");
    if (idx >= 0) console.log("  integrations:", h.slice(idx, idx + 400).replace(/\s+/g, " "));
    const idx2 = h.indexOf("air-prod");
    if (idx2 >= 0) console.log("  imgix:", h.slice(idx2 - 80, idx2 + 200).replace(/\s+/g, " "));
  }
}

// platform section - count data-name, integrations card
const p = readFileSync(join(dir, "02-platform-back-office.html"), "utf-8");
console.log("\nplatform data-name:", (p.match(/data-name="/g) || []).length);
const integ = p.indexOf("integrations");
console.log("integrations area:", p.slice(integ - 100, integ + 500).replace(/\s+/g, " ").slice(0, 600));
