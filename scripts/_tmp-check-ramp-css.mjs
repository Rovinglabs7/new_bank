import { readFileSync } from "fs";

const c = readFileSync("public/ramp-files/0g8gib8b5vkql.css", "utf8");
console.log("headline-xs", c.includes("headline-xs"));
const m = c.match(/\.headline-xs\{[^}]{0,200}/);
console.log(m ? m[0] : "no headline-xs rule");
const lausanne = [...c.matchAll(/Lausanne[^"']{0,60}/g)].slice(0, 3);
console.log("Lausanne refs", lausanne.map((x) => x[0]));
