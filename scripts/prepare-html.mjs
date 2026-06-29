import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const sourceHtml = join(root, "BOND.html");
const outputHtml = join(root, "public", "bond.html");
const sourceAssets = join(root, "BOND_files");
const publicAssets = join(root, "public", "BOND_files");

if (!existsSync(sourceHtml)) {
  console.error("BOND.html not found at project root");
  process.exit(1);
}

mkdirSync(join(root, "public"), { recursive: true });

if (existsSync(publicAssets)) {
  console.log("public/BOND_files already exists, skipping copy");
} else if (existsSync(sourceAssets)) {
  cpSync(sourceAssets, publicAssets, { recursive: true });
  console.log("Copied BOND_files to public/BOND_files");
} else {
  console.error("BOND_files directory not found");
  process.exit(1);
}

let html = readFileSync(sourceHtml, "utf-8");

// Only change: relative asset paths → Next.js public folder paths
html = html.replace(/\.\/BOND_files\//g, "/BOND_files/");

writeFileSync(outputHtml, html, "utf-8");
writeFileSync(join(root, "public", "index.html"), html, "utf-8");
console.log(`Prepared ${outputHtml} (${html.length} bytes)`);
