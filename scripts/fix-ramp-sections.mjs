import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

const RAMP_CDN = "https://ramp.com";

/** Media we have locally — prefer self-hosted */
const LOCAL_MEDIA = {
  "customer-poshmark": "/ramp-files/Poshmark.02ekg2_15weoc.svg",
  "platform-treasury-card-mobile": "/ramp-files/platform-treasury-card-mobile.webp",
  "platform-treasury-card": "/ramp-files/platform-treasury-card.jpg",
  "home-refresh-enterprise-workflow": "/ramp-files/home-refresh-enterprise-workflow.jpg",
  "home-refresh-global-spend-globe": "/ramp-files/home-refresh-global-spend-globe.png",
  "a184a499-09f0-4fcf-9eed-a166c47bea09": "/ramp-files/a184a499-09f0-4fcf-9eed-a166c47bea09.webp",
};

function mediaBaseName(mediaPath) {
  const file = mediaPath.replace(/^\/_next\/static\/media\//, "").split("?")[0];
  return file.split(".")[0].toLowerCase();
}

function resolveMediaPath(mediaPath) {
  const decoded = mediaPath.replace(/&amp;/g, "&").replace(/https:\/\/ramp\.com/g, "");
  if (decoded.startsWith("http://") || decoded.startsWith("https://")) {
    return decoded;
  }
  const normalized = decoded.startsWith("/_next/")
    ? decoded
    : decoded.startsWith("/")
      ? decoded
      : `/_next/static/media/${decoded}`;

  const base = mediaBaseName(normalized);
  if (LOCAL_MEDIA[base]) return LOCAL_MEDIA[base];

  const file = normalized.replace(/^\/_next\/static\/media\//, "").split("?")[0];
  return `${RAMP_CDN}/_next/static/media/${file}`;
}

function repairDoubleCdn(html) {
  return html
    .replace(/https:\/\/ramp\.com(?:https:\/\/ramp\.com)+/g, RAMP_CDN)
    .replace(/https:\/\/ramp\.com(https?:\/\/)/g, "$1");
}

function decodeNextImageUrl(nextImageUrl) {
  const decoded = nextImageUrl.replace(/&amp;/g, "&");
  const match = decoded.match(/[?&]url=([^&]+)/);
  if (!match) return null;
  return resolveMediaPath(decodeURIComponent(match[1]));
}

/** Ramp.com pins the live stats bar to the viewport; embed it in our page flow instead. */
function unfixStatsTicker(html) {
  return html
    .replace(
      /<div class="relative mb-8" style="height: 38px;">/g,
      '<div class="relative mb-8 ramp-stats-ticker">'
    )
    .replace(
      /position:\s*fixed;\s*bottom:\s*0px;\s*left:\s*0px;\s*right:\s*0px;\s*z-index:\s*50;\s*background-color:\s*white;\s*border-top-width:\s*1px;\s*border-top-style:\s*solid;\s*border-color:\s*var\(--color-black-100,\s*rgba\(0,0,0,0\.1\)\);\s*padding-left:\s*[\d.]+px;\s*padding-right:\s*[\d.]+px;/g,
      "position: relative; z-index: 1; background-color: white; border-top: 1px solid var(--color-black-100, rgba(0,0,0,0.1));"
    );
}

function rewriteExternalAnchors(html) {
  return html.replace(/href="(https?:\/\/[^"]+)"/g, (_, url) => {
    if (/\/customers(\/|$)/.test(url) || url.includes("customer")) {
      return 'href="/customers"';
    }
    if (url.includes("/blog/")) {
      return 'href="/press"';
    }
    if (url.includes("/integrations")) {
      return 'href="/integrations"';
    }
    if (url.includes("/enterprise")) {
      return 'href="/contact-sales"';
    }
    return 'href="/contact-sales"';
  });
}

function rewriteHtml(html) {
  let out = html.replace(/&quot;/g, '"');
  out = repairDoubleCdn(out);
  out = unfixStatsTicker(out);

  out = out.replace(
    /url\(["']?(\/_next\/static\/media\/[^"')]+)["']?\)/g,
    (_, path) => `url(${resolveMediaPath(path)})`
  );

  out = out.replace(
    /background-image:url\((\/_next\/static\/media\/[^)]+)\)/g,
    (_, path) => `background-image:url(${resolveMediaPath(path)})`
  );

  out = out.replace(
    /(\s(?:src|href)=["'])(\/_next\/static\/media\/[^"']+)(["'])/g,
    (_, pre, path, post) => `${pre}${resolveMediaPath(path)}${post}`
  );

  out = out.replace(
    /(data-asset-src=["'])(\/_next\/static\/media\/[^"']+)(["'])/g,
    (_, pre, path, post) => `${pre}${resolveMediaPath(path)}${post}`
  );

  out = out.replace(/srcset="[^"]*\/_next\/image[^"]*"/g, (match) => {
    const firstUrl = match.match(/\/_next\/image\?[^"\s]+/);
    if (!firstUrl) return 'srcset=""';
    const resolved = decodeNextImageUrl(firstUrl[0]);
    return resolved ? `srcset="${resolved}"` : 'srcset=""';
  });

  out = out.replace(
    /(\ssrc=["'])(\/_next\/image\?[^"']+)(["'])/g,
    (_, pre, path, post) => {
      const resolved = decodeNextImageUrl(path);
      return resolved ? `${pre}${resolved}${post}` : `${pre}${post}`;
    }
  );

  out = out.replace(
    /\ssrc=["']https:\/\/ramp\.com\/_next\/image\?[^"']+["']/g,
    (match) => {
      const path = match.match(/https:\/\/ramp\.com(\/_next\/image\?[^"']+)/)?.[1];
      const resolved = path ? decodeNextImageUrl(path) : null;
      return resolved ? ` src="${resolved}"` : ' src=""';
    }
  );

  out = out.replace(
    /\/_next\/static\/media\/https:\/\/air-prod\.imgix\.net\/[^"'\s]+/g,
    "https://air-prod.imgix.net/a184a499-09f0-4fcf-9eed-a166c47bea09.jpg?w=2265&h=2079&fm=webp&fit=crop&auto=auto"
  );

  out = out.replace(
    /(?<!https:\/\/ramp\.com)\/_next\/static\/media\/([^"'\s<>?)]+)/g,
    (_, file) => resolveMediaPath(`/_next/static/media/${file}`)
  );

  out = out.replace(
    /(<ul role="group"[^>]*style="[^"]*)transform:\s*translateX\([^)]+\);?/g,
    "$1"
  );
  out = out.replace(
    /(<li class="ticker-item"[^>]*style="[^"]*)transform:\s*translateX\([^)]+\);?/g,
    "$1"
  );

  out = out.replace(
    /srcset="https:\/\/ramp\.com(https?:\/\/[^"]+)"/g,
    'srcset="$1"'
  );

  out = out.replace(
    /<img([^>]*?)\ssrc="(\/ramp-files\/[^"]+)"([^>]*?)\ssrcset="[^"]*"([^>]*)>/g,
    '<img$1 src="$2"$3$4>'
  );

  out = out.replace(
    /<img([^>]*?)\ssrc="(https?:\/\/[^"]+)"([^>]*?)\ssrcset="[^"]*"([^>]*)>/g,
    '<img$1 src="$2"$3 srcset="$2"$4>'
  );

  out = rewriteExternalAnchors(out);

  return repairDoubleCdn(out);
}

const dir = join(process.cwd(), "public", "ramp-sections");
for (const file of readdirSync(dir).filter((f) => f.endsWith(".html"))) {
  const path = join(dir, file);
  const before = readFileSync(path, "utf-8");
  const after = rewriteHtml(before);
  if (after !== before) {
    writeFileSync(path, after, "utf-8");
    const nextBefore = (before.match(/(?<!ramp\.com)\/_next\//g) || []).length;
    const nextAfter = (after.match(/(?<!ramp\.com)\/_next\//g) || []).length;
    console.log(`fixed ${file}: local _next refs ${nextBefore} -> ${nextAfter}`);
  } else {
    console.log(`unchanged ${file}`);
  }
}

console.log("Done.");
