import { readFileSync, writeFileSync } from "fs";

const s = readFileSync("public/ramp-files/0muplqiods2wh.js.download", "utf-8");
const start = s.indexOf('["1Password","ADP"');
const end = s.indexOf("25919)},734215", start);
const chunk = s.slice(start - 800, end + 200);
writeFileSync("scripts/_integrations-globe-chunk.txt", chunk, "utf-8");
console.log("wrote", chunk.length, "chars");
