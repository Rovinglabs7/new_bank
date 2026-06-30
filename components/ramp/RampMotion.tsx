"use client";

import { useEffect } from "react";
import {
  proxyRampLottieUrl,
  RAMP_PLATFORM_CARD_LOTTIES,
  resolveRampLottieSrc,
} from "@/lib/ramp-lottie-map";
import { mountIntegrationsGlobe } from "@/lib/integrations-globe";

function initTickers(root: HTMLElement) {
  root.querySelectorAll<HTMLUListElement>("ul[role='group']").forEach((ul) => {
    if (ul.dataset.rampTickerInit) return;
    const items = ul.querySelectorAll(":scope > .ticker-item");
    if (items.length < 2) return;

    ul.dataset.rampTickerInit = "1";
    items.forEach((item) => ul.appendChild(item.cloneNode(true)));

    let offset = 0;
    let raf = 0;
    const tick = () => {
      offset -= 0.45;
      const loopWidth = ul.scrollWidth / 2;
      if (loopWidth > 0 && -offset >= loopWidth) offset = 0;
      ul.style.transform = `translateX(${offset}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    ul.addEventListener("ramp-ticker-destroy", () => cancelAnimationFrame(raf), {
      once: true,
    });
  });
}

function fixBrokenImages(root: HTMLElement) {
  root.querySelectorAll<HTMLImageElement>("img[srcset]").forEach((img) => {
    const srcset = img.getAttribute("srcset") ?? "";
    if (!srcset.includes("ramp.comhttps")) return;
    const src = img.getAttribute("src");
    if (src) img.setAttribute("srcset", src);
    else img.removeAttribute("srcset");
  });
}

/** Scroll crossfade: old-way → new-way in systems integration section */
function initSystemsScroll(root: HTMLElement) {
  const section = root.querySelector<HTMLElement>(
    '[data-ramp-section="systems-integration"]'
  );
  if (!section || section.dataset.rampSystemsInit) return;

  const track =
    section.querySelector<HTMLElement>('[class*="200vh"]') ??
    section.querySelector<HTMLElement>(":scope > div > div");
  const containers = section.querySelectorAll<HTMLElement>(".dotlottie-container");
  if (!track || containers.length < 2) return;

  section.dataset.rampSystemsInit = "1";
  const oldLayer = containers[0];
  const newLayer = containers[1]?.parentElement;

  const update = () => {
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), rect.height - vh);
    const progress = scrolled / Math.max(rect.height - vh, 1);
    const fade = Math.min(Math.max((progress - 0.28) / 0.12, 0), 1);

    if (oldLayer instanceof HTMLElement) {
      oldLayer.style.opacity = String(1 - fade);
    }
    if (newLayer instanceof HTMLElement) {
      newLayer.style.opacity = String(fade);
    }
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();

  section.addEventListener(
    "ramp-systems-destroy",
    () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      delete section.dataset.rampSystemsInit;
    },
    { once: true }
  );
}

function initIntegrationsGlobe(root: HTMLElement) {
  const section = root.querySelector<HTMLElement>(
    '[data-ramp-section="platform-back-office"]'
  );
  const link = section?.querySelector<HTMLElement>('a[href*="integrations"]');
  const mask = link?.querySelector<HTMLElement>('div[style*="mask-image"]');
  if (!(mask instanceof HTMLElement)) return () => {};
  return mountIntegrationsGlobe(mask);
}

async function initLotties(root: HTMLElement) {
  const { DotLottie } = await import("@lottiefiles/dotlottie-web");
  const players: InstanceType<typeof DotLottie>[] = [];

  const mount = (
    container: HTMLElement,
    rawSrc: string,
    fallback?: HTMLElement | null
  ) => {
    if (container.dataset.rampLottieInit) return;

    const src = proxyRampLottieUrl(rawSrc);
    let canvas =
      container.querySelector<HTMLCanvasElement>("canvas.ramp-lottie-canvas") ??
      container.querySelector<HTMLCanvasElement>("canvas");

    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.className =
        "ramp-lottie-canvas pointer-events-none absolute inset-0 size-full";
      container.appendChild(canvas);
    } else {
      canvas.classList.add("ramp-lottie-canvas");
    }

    container.dataset.rampLottieInit = "1";

    const player = new DotLottie({
      canvas,
      src,
      autoplay: true,
      loop: true,
      renderConfig: { autoResize: true },
    });

    const showFallback = () => {
      if (fallback) fallback.style.removeProperty("display");
    };

    player.addEventListener("load", () => {
      player.play();
      if (fallback) fallback.style.display = "none";
    });

    player.addEventListener("loadError", () => {
      delete container.dataset.rampLottieInit;
      showFallback();
    });

    players.push(player);
  };

  root
    .querySelectorAll<HTMLElement>('[data-asset-type="lottie"][data-asset-src]')
    .forEach((container) => {
      const src = container.getAttribute("data-asset-src");
      if (!src) return;
      mount(container, src);
    });

  root.querySelectorAll<HTMLElement>(".dotlottie-container [data-name]").forEach((node) => {
    const container = node.closest<HTMLElement>(".dotlottie-container");
    const instanceId = node.getAttribute("data-name");
    if (!container || !instanceId) return;

    const src = resolveRampLottieSrc(instanceId);
    if (!src) return;

    const fallback = node.classList.contains("animation")
      ? node
      : node.querySelector<HTMLElement>(".animation");

    mount(container, src, fallback);
  });

  const platformSection = root.querySelector<HTMLElement>(
    '[data-ramp-section="platform-back-office"]'
  );
  if (platformSection) {
    for (const [slug, lottieSrc] of Object.entries(RAMP_PLATFORM_CARD_LOTTIES)) {
      const link = platformSection.querySelector<HTMLElement>(`a[href*="${slug}"]`);
      const container =
        link?.querySelector<HTMLElement>('div[style*="mask-image"]') ??
        link?.querySelector("canvas")?.parentElement;
      if (!(container instanceof HTMLElement)) continue;
      mount(container, lottieSrc);
    }
  }

  return () => players.forEach((p) => p.destroy());
}

/** Restores Ramp dotLottie players, stats ticker, and systems scroll crossfade. */
export function RampMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".ramp-home");
    if (!root) return;

    let cancelled = false;
    let destroyLotties: (() => void) | undefined;
    let destroyIntegrationsGlobe: (() => void) | undefined;

    const startLotties = () => {
      initLotties(root).then((destroy) => {
        if (cancelled) {
          destroy();
          return;
        }
        destroyLotties?.();
        destroyLotties = destroy;
      });
    };

    const boot = () => {
      fixBrokenImages(root);
      initTickers(root);
      initSystemsScroll(root);
      destroyIntegrationsGlobe?.();
      destroyIntegrationsGlobe = initIntegrationsGlobe(root);
      startLotties();
    };

    boot();
    // Remount lotties after Ramp CSS layout (absolute containers need final dimensions)
    const layoutTimer = window.setTimeout(() => {
      destroyLotties?.();
      root.querySelectorAll<HTMLElement>("[data-ramp-lottie-init]").forEach((el) => {
        delete el.dataset.rampLottieInit;
        el.querySelector<HTMLElement>(".animation")?.style.removeProperty("display");
      });
      destroyIntegrationsGlobe?.();
      destroyIntegrationsGlobe = initIntegrationsGlobe(root);
      startLotties();
    }, 200);

    return () => {
      cancelled = true;
      window.clearTimeout(layoutTimer);
      destroyLotties?.();
      destroyIntegrationsGlobe?.();
      root.querySelectorAll<HTMLUListElement>("ul[data-ramp-ticker-init]").forEach((ul) => {
        ul.dispatchEvent(new Event("ramp-ticker-destroy"));
        delete ul.dataset.rampTickerInit;
      });
      root
        .querySelector('[data-ramp-section="systems-integration"]')
        ?.dispatchEvent(new Event("ramp-systems-destroy"));
      root.querySelectorAll<HTMLElement>("[data-ramp-lottie-init]").forEach((el) => {
        delete el.dataset.rampLottieInit;
        el.querySelector(".ramp-lottie-canvas")?.remove();
        el.querySelector<HTMLElement>(".animation")?.style.removeProperty("display");
      });
    };
  }, []);

  return null;
}
