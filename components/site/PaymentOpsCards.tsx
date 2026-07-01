"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./payment-ops-cards.module.css";

// ─── CARD ONE: Automation Workflow ───────────────────────────────────────────

const STEPS = [
  { id: 1, label: "WHEN", value: "Customer completes checkout", icon: "⊙", color: "#281e15" },
  { id: 2, label: "CREATE", value: "Recurring payment", icon: "＋", color: "#281e15" },
  { id: 3, label: "SEND", value: "Secure payment request", icon: "→", color: "#281e15" },
  { id: 4, label: "WAIT", value: "Customer authorisation", icon: "◷", color: "#281e15" },
  { id: 5, label: "THEN", value: "Notify the team", icon: "✓", color: "#16a34a" },
];

function WorkflowCard() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [activeLine, setActiveLine] = useState<number[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [done, setDone] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  const runAnimation = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    setVisibleSteps([]);
    setActiveLine([]);
    setDone(false);
    setCursorVisible(false);

    const timings: ReturnType<typeof setTimeout>[] = [];

    const show = (stepIdx: number, delay: number) => {
      const t = setTimeout(() => {
        setVisibleSteps((prev) => [...prev, stepIdx]);
      }, delay);
      timings.push(t);
    };

    const showLine = (lineIdx: number, delay: number) => {
      const t = setTimeout(() => {
        setActiveLine((prev) => [...prev, lineIdx]);
      }, delay);
      timings.push(t);
    };

    // Step reveals
    show(0, 300);
    showLine(0, 700);
    show(1, 950);
    showLine(1, 1350);
    show(2, 1600);

    // Cursor moves to step 3
    timings.push(setTimeout(() => {
      setCursorVisible(true);
      setCursorPos({ x: 52, y: 62 });
    }, 2000));
    timings.push(setTimeout(() => {
      setClicking(true);
    }, 2300));
    timings.push(setTimeout(() => {
      setClicking(false);
    }, 2550));

    showLine(2, 2700);
    show(3, 2950);
    showLine(3, 3350);
    show(4, 3600);

    // Cursor moves to finish
    timings.push(setTimeout(() => {
      setCursorPos({ x: 60, y: 82 });
    }, 3800));
    timings.push(setTimeout(() => {
      setClicking(true);
    }, 4050));
    timings.push(setTimeout(() => {
      setClicking(false);
    }, 4300));
    timings.push(setTimeout(() => {
      setCursorVisible(false);
    }, 4600));

    timings.push(setTimeout(() => {
      setDone(true);
      animatingRef.current = false;
    }, 5000));

    // Loop
    timings.push(setTimeout(() => {
      runAnimation();
    }, 8500));

    return () => timings.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const cleanup = runAnimation();
    return cleanup;
  }, [runAnimation]);

  return (
    <div className={styles.card} ref={cardRef}>
      <div className={styles.cardMedia}>
        <div className={styles.workflowContainer}>
          {/* Cursor */}
          <AnimatePresence>
            {cursorVisible && (
              <motion.div
                className={styles.cursor}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  left: `${cursorPos.x}%`,
                  top: `${cursorPos.y}%`,
                  scale: clicking ? 0.85 : 1,
                }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
              >
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                  <path d="M1 1l15.5 9.5L9 12l-3.5 8L1 1z" fill="#281e15" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Steps */}
          <div className={styles.workflow}>
            {STEPS.map((step, i) => (
              <div key={step.id} className={styles.stepGroup}>
                <AnimatePresence>
                  {visibleSteps.includes(i) && (
                    <motion.div
                      className={styles.stepBlock}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className={styles.stepLabel}>{step.label}</span>
                      <span className={styles.stepValue}
                        style={i === 4 ? { color: "#16a34a" } : undefined}
                      >{step.value}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {i < STEPS.length - 1 && (
                  <div className={styles.connectorWrap}>
                    <AnimatePresence>
                      {activeLine.includes(i) && (
                        <motion.div
                          className={styles.connectorLine}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          style={{ originY: 0 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ))}

            {/* Done badge */}
            <AnimatePresence>
              {done && (
                <motion.div
                  className={styles.doneBadge}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={styles.doneCheck}>✓</span>
                  <span>Workflow active</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className={styles.cardContent}>
        <h2 className={styles.cardHeadline}>Payment operations on autopilot.</h2>
        <p className={styles.cardBody}>
          Automatically create payment links, retry failed collections, send reminders and keep every payment moving without manual work.
        </p>
        <a href="/products/payment-operations" className={styles.cardLink}>
          Payment Operations
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3.333 8h9.334M12.667 8L8 3.333M12.667 8L8 12.667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ─── CARD TWO: Globe ─────────────────────────────────────────────────────────

const LOCATIONS = [
  { id: "london",    name: "London",    flag: "🇬🇧", rail: "Direct Debit", currency: "GBP", symbol: "£",  amount: 8420,  lat: 51.5,  lng: -0.1  },
  { id: "amsterdam", name: "Amsterdam", flag: "🇳🇱", rail: "SEPA",         currency: "EUR", symbol: "€",  amount: 4860,  lat: 52.4,  lng: 4.9   },
  { id: "new-york",  name: "New York",  flag: "🇺🇸", rail: "ACH",          currency: "USD", symbol: "$",  amount: 12300, lat: 40.7,  lng: -74.0 },
  { id: "sydney",    name: "Sydney",    flag: "🇦🇺", rail: "BECS",         currency: "AUD", symbol: "A$", amount: 6210,  lat: -33.9, lng: 151.2 },
];

// Fibonacci sphere — even dot distribution
const GLOBE_DOTS: [number, number][] = (() => {
  const dots: [number, number][] = [];
  const n = 560;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const theta = golden * i;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lng = (((theta * 180) / Math.PI) % 360 + 360) % 360 - 180;
    dots.push([lat, lng]);
  }
  return dots;
})();

function project3D(lat: number, lng: number, rotDeg: number, cx: number, cy: number, r: number) {
  const latR = (lat * Math.PI) / 180;
  const lngR = ((lng + rotDeg) * Math.PI) / 180;
  const x3 = Math.cos(latR) * Math.sin(lngR);
  const y3 = Math.sin(latR);
  const z3 = Math.cos(latR) * Math.cos(lngR);
  return { x: cx + r * x3, y: cy - r * y3, depth: z3 };
}

function useCountUp(target: number, active: boolean, duration = 1.5) {
  const [value, setValue] = useState(0);
  const counted = useRef(false);
  useEffect(() => {
    if (!active || counted.current) return;
    counted.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return value;
}

interface LocPos {
  loc: (typeof LOCATIONS)[0];
  x: number;
  y: number;
  depth: number;
}

function GlobeLocationLabel({ lp }: { lp: LocPos }) {
  const visible = lp.depth > 0.12;
  const opacity = visible ? Math.min(1, (lp.depth - 0.12) / 0.35) : 0;
  const counted = useCountUp(lp.loc.amount, lp.depth > 0.45);

  return (
    <div
      className={styles.globeLabel}
      style={{
        left: lp.x,
        top: lp.y,
        opacity,
        zIndex: Math.round((lp.depth + 1) * 10),
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className={styles.globeLabelInner}>
        <span className={styles.globeFlag}>{lp.loc.flag}</span>
        <div>
          <div className={styles.globeCityRow}>
            <span className={styles.globeCity}>{lp.loc.name}</span>
            <span className={styles.globeRail}>{lp.loc.rail}</span>
          </div>
          <div className={styles.globeAmount}>
            {lp.loc.symbol}{counted.toLocaleString()} collected
          </div>
        </div>
      </div>
    </div>
  );
}

function GlobeCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef(0);
  const lastRef = useRef(0);
  const pausedRef = useRef(false);
  const sizeRef = useRef({ w: 0, h: 0 });
  const [labelPositions, setLabelPositions] = useState<LocPos[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const draw = (now: number) => {
      if (lastRef.current && !pausedRef.current) {
        rotRef.current = (rotRef.current + (now - lastRef.current) * 0.016) % 360;
      }
      lastRef.current = now;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      if (W !== sizeRef.current.w || H !== sizeRef.current.h) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + "px";
        canvas.style.height = H + "px";
        ctx.scale(dpr, dpr);
        sizeRef.current = { w: W, h: H };
      }

      ctx.clearRect(0, 0, W, H);

      const cx = W * 0.52;
      const cy = H * 0.5;
      const r = Math.min(W, H) * 0.37;
      const rot = rotRef.current;

      // Draw globe dots with depth-based lighting
      for (const [lat, lng] of GLOBE_DOTS) {
        const { x, y, depth } = project3D(lat, lng, rot, cx, cy, r);
        if (depth < -0.05) continue;
        // Lighting: brighter on front, fade at edges
        const lit = Math.max(0, depth);
        const alpha = 0.055 + lit * 0.22;
        const dotR = 0.85 + lit * 0.7;
        ctx.beginPath();
        ctx.arc(x, y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(40,30,21,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // Draw connection lines from label anchor to globe surface
      const positions: LocPos[] = LOCATIONS.map((loc) => {
        const { x, y, depth } = project3D(loc.lat, loc.lng, rot, cx, cy, r);

        // Draw pulse dot on globe surface
        if (depth > 0.12) {
          const pulseAlpha = Math.min(1, (depth - 0.12) / 0.35) * 0.7;
          // Outer pulse ring
          ctx.beginPath();
          ctx.arc(x, y, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(40,30,21,${(pulseAlpha * 0.18).toFixed(3)})`;
          ctx.fill();
          // Inner dot
          ctx.beginPath();
          ctx.arc(x, y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(40,30,21,${(pulseAlpha * 0.65).toFixed(3)})`;
          ctx.fill();
        }

        return { loc, x, y, depth };
      });

      setLabelPositions(positions);
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={styles.card}>
      <div
        className={styles.cardMedia}
        ref={containerRef}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <canvas ref={canvasRef} className={styles.globeCanvas} />
        {labelPositions.map((lp) => (
          <GlobeLocationLabel key={lp.loc.id} lp={lp} />
        ))}
      </div>

      <div className={styles.cardContent}>
        <h2 className={styles.cardHeadline}>Collect locally. Grow globally.</h2>
        <p className={styles.cardBody}>
          Accept payments across the UK and beyond with local payment methods, multi-currency support and one platform to manage everything.
        </p>
        <a href="/products/global-collections" className={styles.cardLink}>
          Global Collections
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3.333 8h9.334M12.667 8L8 3.333M12.667 8L8 12.667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ─── SECTION SHELL ────────────────────────────────────────────────────────────

export function PaymentOpsCards() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Automation &amp; Growth</p>
          <h2 className={styles.sectionHeading}>
            <span className={styles.headingPrimary}>Scale the team.</span>
            <span className={styles.headingMuted}>Shrink the paperwork.</span>
          </h2>
          <p className={styles.sectionSub}>You had a bureaucracy. Now you have a business again.</p>
        </div>

        <div className={styles.grid}>
          <WorkflowCard />
          <GlobeCard />
        </div>
      </div>
    </section>
  );
}
