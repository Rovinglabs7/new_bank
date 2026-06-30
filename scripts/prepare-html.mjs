import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const sourceHtml = join(root, "BOND.html");
const outputHtml = join(root, "public", "bond.html");
const sourceAssets = join(root, "BOND_files");
const publicAssets = join(root, "public", "BOND_files");
const customDir = join(root, "custom");
const publicCustomDir = join(root, "public", "custom");

const MAIN_CLOSE = "</div><!--/$--></div>";

const CUSTOM_TAGS = `
<link rel="stylesheet" href="/custom/overrides.css" />
<script src="/custom/overrides.js"></script>
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

// Copy custom/ assets to public/custom/ (edit files in custom/ for future changes)
if (existsSync(customDir)) {
  mkdirSync(publicCustomDir, { recursive: true });
  for (const file of ["overrides.css", "overrides.js"]) {
    const src = join(customDir, file);
    if (existsSync(src)) {
      cpSync(src, join(publicCustomDir, file));
    }
  }
}

let html = readFileSync(sourceHtml, "utf-8");
html = html.replace(/\.\/BOND_files\//g, "/BOND_files/");

// Remove embedded footer from BOND.html — injected from custom/footer.html instead
const sproutStart = html.indexOf('<div id="sprout-footer">');
if (sproutStart !== -1) {
  const overlayStart = html.indexOf('<div id="overlay">', sproutStart);
  if (overlayStart !== -1) {
    html = html.slice(0, sproutStart) + html.slice(overlayStart);
    console.log("Stripped embedded sprout-footer from BOND.html");
  }
}

// Inject custom footer after the outer #main (last MAIN_CLOSE marker)
const footerPath = join(customDir, "footer.html");
const footerHtml = existsSync(footerPath)
  ? readFileSync(footerPath, "utf-8")
  : "";

const lastMainClose = html.lastIndexOf(MAIN_CLOSE);
if (lastMainClose !== -1 && footerHtml) {
  const afterMain = lastMainClose + MAIN_CLOSE.length;
  html = html.slice(0, afterMain) + footerHtml + html.slice(afterMain);
  console.log("Injected custom/footer.html after #main");
}

if (!html.includes("/custom/overrides.css")) {
  html = html.replace("</head>", `${CUSTOM_TAGS}</head>`);
}

writeFileSync(outputHtml, html, "utf-8");
writeFileSync(join(root, "public", "index.html"), html, "utf-8");
console.log(`Prepared ${outputHtml} (${html.length} bytes)`);
