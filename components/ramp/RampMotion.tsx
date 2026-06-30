"use client";

import { useEffect } from "react";
import { resolveRampLottieSrc } from "@/lib/ramp-lottie-map";

function initTickers(root: HTMLElement) {
  root.querySelectorAll<HTMLUListElement>("ul[role='group']").forEach((ul) => {
    if (ul.dataset.rampTickerInit) return;
    const items = ul.querySelectorAll(":scope > .ticker-item");
    if (items.length < 2) return;

    ul.dataset.rampTickerInit = "1";
    items.forEach((item) => {
      ul.appendChild(item.cloneNode(true));
    });

    let offset = 0;
    let raf = 0;
    const speed = 0.45;

    const tick = () => {
      offset -= speed;
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

async function initLotties(root: HTMLElement) {
  const { DotLottie } = await import("@lottiefiles/dotlottie-web");
  const players: InstanceType<typeof DotLottie>[] = [];

  const mount = (
    container: HTMLElement,
    src: string,
    canvas: HTMLCanvasElement
  ) => {
    if (container.dataset.rampLottieInit) return;
    container.dataset.rampLottieInit = "1";

    const player = new DotLottie({
      canvas,
      src,
      autoplay: true,
      loop: true,
      renderConfig: { autoResize: true },
    });

    player.addEventListener("loadError", () => {
      container.dataset.rampLottieInit = "";
      canvas.remove();
    });

    players.push(player);
  };

  root.querySelectorAll<HTMLElement>('[data-asset-type="lottie"][data-asset-src]').forEach(
    (container) => {
      const src = container.getAttribute("data-asset-src");
      const canvas = container.querySelector<HTMLCanvasElement>("canvas");
      if (!src || !canvas) return;
      mount(container, src, canvas);
    }
  );

  root.querySelectorAll<HTMLElement>(".dotlottie-container [data-name]").forEach((node) => {
    const container = node.closest<HTMLElement>(".dotlottie-container");
    const instanceId = node.getAttribute("data-name");
    if (!container || !instanceId) return;

    const src = resolveRampLottieSrc(instanceId);
    if (!src) return;

    const animation = node.classList.contains("animation")
      ? node
      : node.querySelector<HTMLElement>(".animation");

    let canvas = container.querySelector<HTMLCanvasElement>("canvas.ramp-lottie-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.className = "ramp-lottie-canvas pointer-events-none absolute inset-0 size-full";
      container.style.position = container.style.position || "relative";
      container.appendChild(canvas);
    }

    if (container.dataset.rampLottieInit) return;
    container.dataset.rampLottieInit = "1";

    const player = new DotLottie({
      canvas,
      src,
      autoplay: true,
      loop: true,
      renderConfig: { autoResize: true },
    });

    player.addEventListener("load", () => {
      if (animation) animation.style.display = "none";
    });

    player.addEventListener("loadError", () => {
      delete container.dataset.rampLottieInit;
      canvas.remove();
    });

    players.push(player);
  });

  return () => {
    players.forEach((p) => p.destroy());
  };
}

/** Restores Ramp dotLottie players and live stats ticker after static HTML export. */
export function RampMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".ramp-home");
    if (!root) return;

    let cancelled = false;
    initTickers(root);
    let destroyLotties: (() => void) | undefined;

    initLotties(root).then((destroy) => {
      if (cancelled) {
        destroy();
        return;
      }
      destroyLotties = destroy;
    });

    return () => {
      cancelled = true;
      destroyLotties?.();
      root.querySelectorAll<HTMLUListElement>("ul[data-ramp-ticker-init]").forEach((ul) => {
        ul.dispatchEvent(new Event("ramp-ticker-destroy"));
        delete ul.dataset.rampTickerInit;
      });
      root.querySelectorAll<HTMLElement>(".dotlottie-container[data-ramp-lottie-init]").forEach(
        (el) => {
          delete el.dataset.rampLottieInit;
          el.querySelector(".ramp-lottie-canvas")?.remove();
          el.querySelector<HTMLElement>(".animation")?.style.removeProperty("display");
        }
      );
    };
  }, []);

  return null;
}
