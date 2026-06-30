"use client";

import { useEffect } from "react";
import { proxyRampLottieUrl, resolveRampLottieSrc } from "@/lib/ramp-lottie-map";

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
      canvas.className = "ramp-lottie-canvas pointer-events-none absolute inset-0 size-full";
      container.style.position = container.style.position || "relative";
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

    player.addEventListener("load", () => {
      if (fallback) fallback.style.display = "none";
    });

    player.addEventListener("loadError", () => {
      delete container.dataset.rampLottieInit;
      if (canvas.classList.contains("ramp-lottie-canvas") && canvas.parentElement === container) {
        canvas.remove();
      }
      if (fallback) fallback.style.removeProperty("display");
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

  return () => players.forEach((p) => p.destroy());
}

/** Restores Ramp dotLottie players, stats ticker, and systems scroll crossfade. */
export function RampMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".ramp-home");
    if (!root) return;

    let cancelled = false;
    let destroyLotties: (() => void) | undefined;

    const boot = () => {
      initTickers(root);
      initSystemsScroll(root);
      initLotties(root).then((destroy) => {
        if (cancelled) {
          destroy();
          return;
        }
        destroyLotties = destroy;
      });
    };

    requestAnimationFrame(boot);

    return () => {
      cancelled = true;
      destroyLotties?.();
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
