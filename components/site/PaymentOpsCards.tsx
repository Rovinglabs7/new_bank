"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
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

    show(0, 300);
    showLine(0, 700);
    show(1, 950);
    showLine(1, 1350);
    show(2, 1600);

    timings.push(setTimeout(() => {
      setCursorVisible(true);
      setCursorPos({ x: 52, y: 62 });
    }, 2000));
    timings.push(setTimeout(() => { setClicking(true); }, 2300));
    timings.push(setTimeout(() => { setClicking(false); }, 2550));

    showLine(2, 2700);
    show(3, 2950);
    showLine(3, 3350);
    show(4, 3600);

    timings.push(setTimeout(() => { setCursorPos({ x: 60, y: 82 }); }, 3800));
    timings.push(setTimeout(() => { setClicking(true); }, 4050));
    timings.push(setTimeout(() => { setClicking(false); }, 4300));
    timings.push(setTimeout(() => { setCursorVisible(false); }, 4600));
    timings.push(setTimeout(() => {
      setDone(true);
      animatingRef.current = false;
    }, 5000));
    timings.push(setTimeout(() => { runAnimation(); }, 8500));

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

// Each city has its own fixed geographic anchor on the globe card.
// ax/ay = % position on the card media area.
// tx/ty = CSS transform to keep the card within bounds (left/right/center anchor).
const LOCATIONS = [
  // North America — left side of globe
  { id: "new-york",   name: "New York",      flag: "🇺🇸", rail: "ACH",          symbol: "$",    amount: 48240,
    ax: "16%", ay: "36%", tx: "0",     ty: "-50%" },
  { id: "san-fran",   name: "San Francisco", flag: "🇺🇸", rail: "ACH",          symbol: "$",    amount: 18420,
    ax: "6%",  ay: "52%", tx: "0",     ty: "-50%" },
  { id: "chicago",    name: "Chicago",       flag: "🇺🇸", rail: "ACH",          symbol: "$",    amount: 31860,
    ax: "24%", ay: "48%", tx: "0",     ty: "-100%" },

  // British Isles — left-centre
  { id: "dublin",     name: "Dublin",        flag: "🇮🇪", rail: "SEPA",         symbol: "€",    amount: 14920,
    ax: "46%", ay: "24%", tx: "-50%",  ty: "0"    },
  { id: "london",     name: "London",        flag: "🇬🇧", rail: "Direct Debit", symbol: "£",    amount: 26840,
    ax: "58%", ay: "30%", tx: "-100%", ty: "0"    },

  // Northern Europe — top right
  { id: "stockholm",  name: "Stockholm",     flag: "🇸🇪", rail: "SEPA",         symbol: "kr ",  amount: 284000,
    ax: "80%", ay: "14%", tx: "-100%", ty: "0"    },

  // Continental Europe — right side
  { id: "amsterdam",  name: "Amsterdam",     flag: "🇳🇱", rail: "SEPA",         symbol: "€",    amount: 19420,
    ax: "72%", ay: "34%", tx: "-100%", ty: "-50%" },
  { id: "berlin",     name: "Berlin",        flag: "🇩🇪", rail: "SEPA",         symbol: "€",    amount: 33560,
    ax: "80%", ay: "38%", tx: "-100%", ty: "-50%" },
  { id: "paris",      name: "Paris",         flag: "🇫🇷", rail: "SEPA",         symbol: "€",    amount: 22780,
    ax: "62%", ay: "50%", tx: "-100%", ty: "-100%" },
  { id: "zurich",     name: "Zurich",        flag: "🇨🇭", rail: "SEPA",         symbol: "CHF ", amount: 41200,
    ax: "74%", ay: "58%", tx: "-100%", ty: "-100%" },
];

// Show 3 cities at once, cycling one at a time
const VISIBLE_COUNT = 3;
const CYCLE_INTERVAL = 3400;

const GLOBE_R = 1.0;
const TILT_X = (20 * Math.PI) / 180;

const DOT_VERT = /* glsl */ `
  uniform float uSize;
  attribute float aScale;
  varying float vDepth;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vDepth = normalize(worldPos.xyz).z;
    vec4 mvPos = viewMatrix * worldPos;
    gl_PointSize = uSize * aScale * (1.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const DOT_FRAG = /* glsl */ `
  varying float vDepth;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float circleAlpha = smoothstep(0.5, 0.18, d);
    float depthAlpha = 0.07 + max(0.0, vDepth) * 0.60;
    gl_FragColor = vec4(0.157, 0.118, 0.082, circleAlpha * depthAlpha);
  }
`;

function buildGlobeGeo(count: number) {
  const positions: number[] = [];
  const scales: number[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions.push(r * Math.cos(theta) * GLOBE_R, y * GLOBE_R, r * Math.sin(theta) * GLOBE_R);
    scales.push(0.7 + Math.random() * 0.6);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("aScale", new THREE.Float32BufferAttribute(scales, 1));
  return geo;
}

interface GlobeSceneProps {
  paused: boolean;
}

function GlobeScene({ paused }: GlobeSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  useThree();

  const geometry = useMemo(() => buildGlobeGeo(2200), []);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: DOT_VERT,
        fragmentShader: DOT_FRAG,
        uniforms: { uSize: { value: 150.0 } },
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  useFrame((_, delta) => {
    const grp = groupRef.current;
    if (!grp) return;
    if (!paused) grp.rotation.y += delta * 0.18;
  });

  return (
    <group ref={groupRef} rotation={[TILT_X, 0, 0]}>
      <points geometry={geometry} material={material} />
    </group>
  );
}

function useCountUp(target: number, active: boolean, duration = 1.2) {
  const [value, setValue] = useState(0);
  const counted = useRef(false);
  useEffect(() => {
    if (!active) { counted.current = false; setValue(0); return; }
    if (counted.current) return;
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

// Each active notification is just a locId + a unique key so AnimatePresence
// remounts the component (triggering count-up) whenever the city changes.
interface ActiveNotif {
  locId: string;
  key: number;
}

function GlobeNotif({ locId }: { locId: string }) {
  const loc = LOCATIONS.find((l) => l.id === locId)!;
  const counted = useCountUp(loc.amount, true);

  return (
    <motion.div
      className={styles.globeLabel}
      style={{
        top: loc.ay,
        left: loc.ax,
        transform: `translate(${loc.tx}, ${loc.ty})`,
        pointerEvents: "none",
      }}
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -6 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.globeLabelInner}>
        <span className={styles.globeFlag}>{loc.flag}</span>
        <div>
          <div className={styles.globeCityRow}>
            <span className={styles.globeCity}>{loc.name}</span>
            <span className={styles.globeRail}>{loc.rail}</span>
          </div>
          <div className={styles.globeAmount}>
            {loc.symbol}{counted.toLocaleString()} collected
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Start with 3 geographically spread cities: New York, London, Stockholm
const INITIAL_IDS = ["new-york", "london", "stockholm"];

function GlobeCard() {
  const [paused, setPaused] = useState(false);
  // activeNotifs: array of {locId, key} — max VISIBLE_COUNT entries, one per city
  const [activeNotifs, setActiveNotifs] = useState<ActiveNotif[]>(() =>
    INITIAL_IDS.map((id, i) => ({ locId: id, key: i }))
  );
  const keyRef = useRef(100);
  const replaceIdxRef = useRef(0); // which slot to replace next (round-robin)
  const locIdxRef = useRef(INITIAL_IDS.length); // next location index in rotation

  // Build a deterministic rotation order: spread across regions
  const ROTATION = [
    "san-fran", "amsterdam", "paris", "chicago", "zurich",
    "dublin", "berlin", "new-york", "stockholm", "london",
  ];

  useEffect(() => {
    const t = setInterval(() => {
      setActiveNotifs((prev) => {
        // which slot (0..2) to replace
        const ri = replaceIdxRef.current % VISIBLE_COUNT;
        replaceIdxRef.current += 1;

        // find the next city from ROTATION that isn't already visible
        const currentIds = prev.map((n) => n.locId);
        let nextId: string | undefined;
        let attempts = 0;
        while (!nextId && attempts < ROTATION.length) {
          const candidate = ROTATION[locIdxRef.current % ROTATION.length];
          locIdxRef.current += 1;
          attempts += 1;
          if (!currentIds.includes(candidate)) nextId = candidate;
        }
        if (!nextId) return prev; // safety — shouldn't happen

        return prev.map((n, i) =>
          i === ri ? { locId: nextId!, key: ++keyRef.current } : n
        );
      });
    }, CYCLE_INTERVAL);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={styles.card}>
      <div
        className={styles.cardMedia}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 0, 2.8], fov: 48 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <GlobeScene paused={paused} />
        </Canvas>

        {/* Atmospheric glow overlay */}
        <div className={styles.globeGlow} aria-hidden />

        {/* City-anchored notifications — each city has its own fixed position */}
        <AnimatePresence>
          {activeNotifs.map((n) => (
            <GlobeNotif key={n.key} locId={n.locId} />
          ))}
        </AnimatePresence>
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

// ─── EMAIL CAPTURE ────────────────────────────────────────────────────────────

function EmailCapture() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) { setError("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    router.push(`/contact-sales?email=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className={styles.captureWrap}>
      <form className={styles.captureForm} onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          className={styles.captureInput}
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          aria-label="Email address"
          autoComplete="email"
        />
        <button type="submit" className={styles.captureBtn}>
          Book a demo
        </button>
      </form>
      {error ? (
        <p className={styles.captureError}>{error}</p>
      ) : (
        <p className={styles.captureReassurance}>
          No spam. Just a quick way to book your personalised demo.
        </p>
      )}
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

        <motion.div
          className={styles.ctaBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className={styles.ctaHeading}>Ready to grow? So are we.</h3>
          <p className={styles.ctaBody}>
            Praevor is built to grow with your business, making every payment simpler, every collection smoother and every day a little easier.
          </p>
          <EmailCapture />
        </motion.div>
      </div>
    </section>
  );
}
