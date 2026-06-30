import { readFileSync } from "fs";
import { join } from "path";

const h = readFileSync(
  join(process.cwd(), "public", "ramp-sections", "04-finance-intelligence.html"),
  "utf-8"
);
const m = h.match(/srcset="[^"]+"/);
const m2 = h.match(/src="[^"]*a184[^"]+"/);
console.log("srcset:", m?.[0]?.slice(0, 200));
console.log("src:", m2?.[0]);
