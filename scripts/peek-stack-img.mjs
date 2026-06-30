import { readFileSync } from "fs";
const h = readFileSync("public/ramp-sections/04-finance-intelligence.html", "utf-8");
const i = h.indexOf('alt="Stack by Ramp"');
const j = h.indexOf(">", i);
console.log(h.slice(i, j + 1));
