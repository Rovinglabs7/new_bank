import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const sourceHtml = join(root, "BOND.html");
const outputHtml = join(root, "public", "bond.html");
const sourceAssets = join(root, "BOND_files");
const publicAssets = join(root, "public", "BOND_files");

const MAIN_OPEN = /<div id="main"[^>]*>/;
const MAIN_CLOSE = "</div><!--/$--></div>";
const SPROUT_DIV_START = /<div id="sprout-footer">/;
const FRAMER_HYDRATION_SCRIPT =
  /<script type="module"[^>]*data-framer-bundle="main"[^>]*><\/script>/;

const OVERRIDE_TAGS = `
<link rel="stylesheet" href="/site-overrides.css" />
<script src="/site-overrides.js"></script>
`;

if (!existsSync(sourceHtml)) {
  console.error("BOND.html not found at project root");
  process.exit(1);
}

mkdirSync(join(root, "public"), { recursive: true });

if (!existsSync(publicAssets)) {
  if (existsSync(sourceAssets)) {
    cpSync(sourceAssets, publicAssets, { recursive: true });
    console.log("Copied BOND_files to public/BOND_files");
  } else {
    console.error("BOND_files directory not found");
    process.exit(1);
  }
}

let html = readFileSync(sourceHtml, "utf-8");

html = html.replace(/\.\/BOND_files\//g, "/BOND_files/");

// Framer hydration replaces #main with the original CDN design — disable it so
// BOND.html edits (hero, footer, copy) stay visible.
html = html.replace(FRAMER_HYDRATION_SCRIPT, "");
html = html.replace(/\s*data-framer-hydrate-v2="[^"]*"/, "");
html = html.replace(/\s*data-framer-generated-page=""/, "");

// Move Sprout footer block outside #main
const sproutStart = html.search(SPROUT_DIV_START);
const mainCloseIndex =
  sproutStart !== -1 ? html.indexOf(MAIN_CLOSE, sproutStart) : -1;

if (sproutStart !== -1 && mainCloseIndex !== -1) {
  const sproutBlock = html.slice(sproutStart, mainCloseIndex);
  html = html.slice(0, sproutStart) + html.slice(mainCloseIndex);
  const insertAt = html.indexOf(MAIN_CLOSE) + MAIN_CLOSE.length;
  html = html.slice(0, insertAt) + sproutBlock + html.slice(insertAt);
  console.log("Moved sprout-footer outside #main");
}

if (!html.includes("/site-overrides.css")) {
  html = html.replace("</head>", `${OVERRIDE_TAGS}</head>`);
}

writeFileSync(outputHtml, html, "utf-8");
writeFileSync(join(root, "public", "index.html"), html, "utf-8");
console.log(`Prepared ${outputHtml} (${html.length} bytes)`);
