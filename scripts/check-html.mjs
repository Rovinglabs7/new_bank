import { readFileSync } from "fs";

const html = readFileSync("public/framer-body.html", "utf8");

let depth = 0;
const tagRe = /<\/?div\b[^>]*>/gi;
let m;
const issues = [];
while ((m = tagRe.exec(html)) !== null) {
  if (m[0].startsWith("</")) {
    depth--;
    if (depth < 0) issues.push(`extra close @${m.index}`);
  } else depth++;
}
console.log("final depth", depth);
console.log("issues", issues.slice(0, 3));
