const SPRITE_SRC = "/ramp-files/integration-globe-sprite.webp";
const LOGO_COUNT = 51;
const HEX_W = 46;
const HEX_R = HEX_W * Math.sin(Math.PI / 3);
const HEX_OFFSET = 23;
const WRAP_X = 690;
const WRAP_Y = 19 * HEX_R;
const ROWS = 9;
const PAN_CENTER_X = 345;
const PAN_CENTER_Y = WRAP_Y / 2;
const TILE_RADIUS = 22;
const DEPTH_LEN = 119025 + PAN_CENTER_Y * PAN_CENTER_Y;
const INITIAL_PAN_X = -(46 * Math.floor(7.5) + (ROWS % 2 === 1 ? HEX_OFFSET : 0));
const INITIAL_PAN_Y = -(ROWS * HEX_R);
const FRAME_MS = 1000 / 60;

const DEPTH_LUT = (() => {
  const lut = new Float32Array(512);
  for (let i = 0; i < 512; i++) {
    const t = (i / 511) * DEPTH_LEN;
    lut[i] = Math.exp(-t / 33800);
  }
  return lut;
})();

const GRID = (() => {
  const cells: { x: number; y: number }[] = [];
  for (let row = 0; row < 19; row++) {
    for (let col = 0; col < 15; col++) {
      cells.push({
        x: col * HEX_W + (row % 2 === 1 ? HEX_OFFSET : 0),
        y: row * HEX_R,
      });
    }
  }
  return cells;
})();

function depthAt(dx: number, dy: number) {
  const dist = dx * dx + dy * dy;
  const t = 511 * Math.min(dist / DEPTH_LEN, 1);
  const i = t | 0;
  const j = Math.min(i + 1, 511);
  return DEPTH_LUT[i] + (DEPTH_LUT[j] - DEPTH_LUT[i]) * (t - i);
}

function buildSlotLogos(count: number) {
  const logos = Array.from({ length: count }, (_, i) => i);
  let seed = 7919;
  const rand = () => (seed = (16807 * seed) % 0x7fffffff) / 0x7fffffff;
  for (let i = logos.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [logos[i], logos[j]] = [logos[j], logos[i]];
  }
  let step = Math.min(19, Math.max(1, count - 1));
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  while (step > 1 && gcd(step, count) !== 1) step--;
  const slots: number[] = [];
  let idx = 0;
  for (let i = 0; i < 285; i++) {
    slots.push(logos[idx]);
    idx = (idx + step) % count;
  }
  return slots;
}

const SLOT_LOGOS = buildSlotLogos(LOGO_COUNT);

type PanState = {
  panX: number;
  panY: number;
  velX: number;
  velY: number;
  targetVelX: number;
  targetVelY: number;
  centerX: number;
  centerY: number;
};

export function mountIntegrationsGlobe(container: HTMLElement) {
  if (container.dataset.integrationsGlobeInit) return () => {};

  const canvas =
    container.querySelector<HTMLCanvasElement>("canvas") ??
    (() => {
      const el = document.createElement("canvas");
      el.className = "absolute inset-0 size-full";
      container.appendChild(el);
      return el;
    })();

  container.dataset.integrationsGlobeInit = "1";

  const pan: PanState = {
    panX: INITIAL_PAN_X,
    panY: INITIAL_PAN_Y,
    velX: 0,
    velY: 0,
    targetVelX: 0,
    targetVelY: 0,
    centerX: 0,
    centerY: 0,
  };

  const size = { w: 0, h: 0, dpr: 1 };
  const spriteCell = { w: 20, h: 20 };
  let sprite: HTMLImageElement | null = null;
  let spriteReady = false;
  let inView = false;
  let hovered = false;
  let contextLost = false;
  let raf = 0;
  let lastTs = 0;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isLarge = window.matchMedia("(min-width: 1024px)");

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = rect.width;
    const h = rect.height;
    if (!w || !h) return false;
    if (size.w === w && size.h === h && size.dpr === dpr) return false;
    size.w = w;
    size.h = h;
    size.dpr = dpr;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    pan.centerX = w / 2;
    pan.centerY = h / 2 + 32;
    return true;
  };

  const draw = () => {
    if (!spriteReady || !sprite || contextLost) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || !size.w || !size.h) return;

    ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
    ctx.clearRect(0, 0, size.w, size.h);
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";

    for (let i = 0; i < 285; i++) {
      const cell = GRID[i];
      const logo = SLOT_LOGOS[i];
      let dx = cell.x + pan.panX - PAN_CENTER_X;
      let dy = cell.y + pan.panY - PAN_CENTER_Y;
      dx = (((dx % WRAP_X) + WRAP_X) % WRAP_X) - PAN_CENTER_X;
      dy = (((dy % WRAP_Y) + WRAP_Y) % WRAP_Y) - PAN_CENTER_Y;

      const depth = depthAt(dx, dy);
      const scale = 0.18 + 1.17 * depth;
      const alpha = 0.35 + 0.65 * depth;
      const zoom = 1 + (scale - 0.18) * 0.5;
      const x = dx * zoom + pan.centerX;
      const y = dy * zoom + pan.centerY;

      ctx.globalAlpha = alpha;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.beginPath();
      ctx.roundRect(-TILE_RADIUS, -TILE_RADIUS, 44, 44, 12);
      ctx.fill();
      ctx.drawImage(
        sprite,
        logo * spriteCell.w,
        0,
        spriteCell.w,
        spriteCell.h,
        -TILE_RADIUS + 12,
        -TILE_RADIUS + 12,
        20,
        20
      );
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  };

  const tick = (ts: number) => {
    raf = requestAnimationFrame(tick);
    if (!inView || !spriteReady || contextLost) return;

    const dt = lastTs ? Math.min((ts - lastTs) / FRAME_MS, 3) : 0;
    lastTs = ts;

    if (reducedMotion.matches) {
      if (resize()) draw();
      return;
    }

    if (!hovered) {
      if (isLarge.matches) {
        pan.targetVelX = 0;
        pan.targetVelY = 0;
      } else {
        pan.targetVelX = 0.35;
        pan.targetVelY = 0.12;
      }
    }

    const ease = 1 - 0.94 ** dt;
    pan.velX += (pan.targetVelX - pan.velX) * ease;
    pan.velY += (pan.targetVelY - pan.velY) * ease;
    pan.panX += pan.velX * dt;
    pan.panY += pan.velY * dt;
    draw();
  };

  const onPointer = (clientX: number, clientY: number) => {
    if (!hovered) return;
    const rect = canvas.getBoundingClientRect();
    const halfW = rect.width / 2 || 1;
    const halfH = rect.height / 2 || 1;
    const nx = (clientX - rect.left - halfW) / halfW;
    const ny = (clientY - rect.top - halfH) / halfH;
    pan.targetVelX = -5 * nx;
    pan.targetVelY = -5 * ny;
  };

  const onMouseMove = (e: MouseEvent) => onPointer(e.clientX, e.clientY);
  const onTouchMove = (e: TouchEvent) => {
    const t = e.touches[0];
    if (t) onPointer(t.clientX, t.clientY);
  };

  const link = container.closest("a");
  const onEnter = () => {
    hovered = true;
  };
  const onLeave = () => {
    hovered = false;
    pan.targetVelX = 0;
    pan.targetVelY = 0;
  };

  const img = new Image();
  img.onload = () => {
    spriteCell.w = img.naturalWidth / LOGO_COUNT;
    spriteCell.h = img.naturalHeight;
    sprite = img;
    spriteReady = true;
    resize();
    draw();
  };
  img.src = SPRITE_SRC;

  const ro = new ResizeObserver(() => {
    if (resize()) draw();
  });
  ro.observe(canvas);

  const io = new IntersectionObserver(
    ([entry]) => {
      inView = entry?.isIntersecting ?? false;
    },
    { threshold: 0 }
  );
  io.observe(container);

  canvas.addEventListener("contextlost", (e) => {
    e.preventDefault();
    contextLost = true;
  });
  canvas.addEventListener("contextrestored", () => {
    contextLost = false;
    resize();
    draw();
  });

  link?.addEventListener("pointerenter", onEnter);
  link?.addEventListener("pointerleave", onLeave);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("touchmove", onTouchMove, { passive: true });

  resize();
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    link?.removeEventListener("pointerenter", onEnter);
    link?.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchmove", onTouchMove);
    delete container.dataset.integrationsGlobeInit;
  };
}
