"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from "framer-motion";
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
  { id: "london",    name: "London",    currency: "GBP", symbol: "£", amount: 8420,  angle: 30,  settlement: "Tomorrow" },
  { id: "amsterdam", name: "Amsterdam", currency: "EUR", symbol: "€", amount: 4860,  angle: 110, settlement: "Today" },
  { id: "new-york",  name: "New York",  currency: "USD", symbol: "$", amount: 12300, angle: 200, settlement: "Tomorrow" },
  { id: "sydney",    name: "Sydney",    currency: "AUD", symbol: "A$", amount: 6210, angle: 310, settlement: "Today" },
];

function useCountUp(target: number, active: boolean, duration = 1.4) {
  const [value, setValue] = useState(0);
  const counted = useRef(false);

  useEffect(() => {
    if (!active || counted.current) return;
    counted.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);

  return value;
}

function GlobePoint({ loc, rotation, hovered, onHover, onLeave }: {
  loc: typeof LOCATIONS[0];
  rotation: number;
  hovered: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  const angle = (loc.angle + rotation) % 360;
  const rad = (angle * Math.PI) / 180;
  const cx = 50;
  const cy = 50;
  const rx = 38;
  const ry = 16;
  // Elliptical orbit
  const x = cx + rx * Math.sin(rad);
  const y = cy + ry * Math.sin(rad) * Math.cos(0.4) - 10 * Math.cos(rad);
  const depth = Math.cos(rad);
  const visible = depth > -0.3;
  const opacity = visible ? Math.max(0.3, (depth + 0.3) / 1.3) : 0;
  const isHovered = hovered === loc.id;
  const counted = useCountUp(loc.amount, visible && opacity > 0.6);

  return (
    <motion.div
      className={styles.globeLabel}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        zIndex: Math.round((depth + 1) * 10),
        pointerEvents: visible ? "auto" : "none",
      }}
      onMouseEnter={() => onHover(loc.id)}
      onMouseLeave={onLeave}
    >
      <motion.div
        className={styles.globeLabelInner}
        animate={{ scale: isHovered ? 1.06 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.globeDot} />
        <div>
          <div className={styles.globeCity}>{loc.name}</div>
          <div className={styles.globeAmount}>
            {loc.symbol}{counted.toLocaleString()} collected
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={styles.globeTooltip}
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18 }}
          >
            <div className={styles.tooltipRow}>
              <span className={styles.tooltipKey}>Settlement</span>
              <span className={styles.tooltipVal}>{loc.settlement}</span>
            </div>
            <div className={styles.tooltipRow}>
              <span className={styles.tooltipKey}>Currency</span>
              <span className={styles.tooltipVal}>{loc.currency}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function GlobeCard() {
  const [rotation, setRotation] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    const tick = (now: number) => {
      if (lastRef.current) {
        const delta = now - lastRef.current;
        if (!hovered) {
          setRotation((r) => (r + delta * 0.018) % 360);
        }
      }
      lastRef.current = now;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered]);

  return (
    <div className={styles.card}>
      <div className={styles.cardMedia}>
        <div className={styles.globeContainer}>
          {/* SVG globe base */}
          <svg className={styles.globeSvg} viewBox="0 0 100 100" fill="none">
            {/* Main ellipse */}
            <ellipse cx="50" cy="50" rx="38" ry="38" stroke="rgba(40,30,21,0.08)" strokeWidth="0.5" />
            {/* Latitude lines */}
            {[-20, 0, 20].map((offset, i) => (
              <ellipse key={i} cx="50" cy={50 + offset} rx="38" ry="10" stroke="rgba(40,30,21,0.05)" strokeWidth="0.4" />
            ))}
            {/* Longitude arcs (simplified) */}
            {[0, 45, 90, 135].map((a, i) => {
              const r = (a * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={50 + 38 * Math.cos(r)}
                  y1={50 - 38 * Math.sin(r)}
                  x2={50 - 38 * Math.cos(r)}
                  y2={50 + 38 * Math.sin(r)}
                  stroke="rgba(40,30,21,0.05)"
                  strokeWidth="0.4"
                />
              );
            })}
            {/* Dot pattern */}
            {Array.from({ length: 200 }).map((_, i) => {
              const lat = (i * 137.508) % 180 - 90;
              const lng = (i * 222.5) % 360 - 180;
              const latR = (lat * Math.PI) / 180;
              const lngR = (lng * Math.PI) / 180;
              const x = 50 + 36 * Math.cos(latR) * Math.sin(lngR);
              const y = 50 - 36 * Math.sin(latR) * 0.42;
              return <circle key={i} cx={x} cy={y} r="0.55" fill="rgba(40,30,21,0.18)" />;
            })}
          </svg>

          {/* Location labels */}
          {LOCATIONS.map((loc) => (
            <GlobePoint
              key={loc.id}
              loc={loc}
              rotation={rotation}
              hovered={hovered}
              onHover={setHovered}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>
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
