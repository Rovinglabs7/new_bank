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

const LOCATIONS = [
  { id: "new-york",   name: "New York",     flag: "🇺🇸", rail: "ACH",          currency: "USD", symbol: "$",    amount: 48240,  lat: 40.7,  lng: -74.0 },
  { id: "san-fran",   name: "San Francisco",flag: "🇺🇸", rail: "ACH",          currency: "USD", symbol: "$",    amount: 18420,  lat: 37.8,  lng: -122.4},
  { id: "chicago",    name: "Chicago",      flag: "🇺🇸", rail: "ACH",          currency: "USD", symbol: "$",    amount: 31860,  lat: 41.9,  lng: -87.6 },
  { id: "london",     name: "London",       flag: "🇬🇧", rail: "Direct Debit", currency: "GBP", symbol: "£",    amount: 26840,  lat: 51.5,  lng: -0.1  },
  { id: "amsterdam",  name: "Amsterdam",    flag: "🇳🇱", rail: "SEPA",         currency: "EUR", symbol: "€",    amount: 19420,  lat: 52.4,  lng: 4.9   },
  { id: "berlin",     name: "Berlin",       flag: "🇩🇪", rail: "SEPA",         currency: "EUR", symbol: "€",    amount: 33560,  lat: 52.5,  lng: 13.4  },
  { id: "paris",      name: "Paris",        flag: "🇫🇷", rail: "SEPA",         currency: "EUR", symbol: "€",    amount: 22780,  lat: 48.9,  lng: 2.3   },
  { id: "dublin",     name: "Dublin",       flag: "🇮🇪", rail: "SEPA",         currency: "EUR", symbol: "€",    amount: 14920,  lat: 53.3,  lng: -6.3  },
  { id: "zurich",     name: "Zurich",       flag: "🇨🇭", rail: "SEPA",         currency: "CHF", symbol: "CHF ", amount: 41200,  lat: 47.4,  lng: 8.5   },
  { id: "stockholm",  name: "Stockholm",    flag: "🇸🇪", rail: "SEPA",         currency: "SEK", symbol: "kr ",  amount: 284000, lat: 59.3,  lng: 18.1  },
];

// Show max 4 at a time, cycling through all locations
const VISIBLE_COUNT = 4;
const CYCLE_INTERVAL = 3800;

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

interface LabelPos {
  id: string;
  x: number;
  y: number;
  depth: number;
}

interface GlobeSceneProps {
  onLabels: (labels: LabelPos[]) => void;
  paused: boolean;
  activeIds: string[];
}

function GlobeScene({ onLabels, paused, activeIds }: GlobeSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();

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

  const activeLocations = useMemo(
    () => LOCATIONS.filter((l) => activeIds.includes(l.id)),
    [activeIds]
  );

  const cityLocal = useMemo(
    () =>
      activeLocations.map((loc) => {
        const latR = (loc.lat * Math.PI) / 180;
        const lngR = (loc.lng * Math.PI) / 180;
        return new THREE.Vector3(
          Math.cos(latR) * Math.sin(lngR) * GLOBE_R,
          Math.sin(latR) * GLOBE_R,
          Math.cos(latR) * Math.cos(lngR) * GLOBE_R
        );
      }),
    [activeLocations]
  );

  const tmpV3 = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const grp = groupRef.current;
    if (!grp) return;
    if (!paused) grp.rotation.y += delta * 0.18;

    const labels: LabelPos[] = activeLocations.map((loc, i) => {
      tmpV3.copy(cityLocal[i]).applyMatrix4(grp.matrixWorld);
      const depth = tmpV3.clone().normalize().z;
      const ndc = tmpV3.clone().project(camera);
      return {
        id: loc.id,
        x: ((ndc.x + 1) / 2) * size.width,
        y: ((-ndc.y + 1) / 2) * size.height,
        depth,
      };
    });

    onLabels(labels);
  });

  return (
    <group ref={groupRef} rotation={[TILT_X, 0, 0]}>
      <points geometry={geometry} material={material} />
    </group>
  );
}

function useCountUp(target: number, active: boolean, duration = 1.4) {
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

function GlobeLabel({ lp }: { lp: LabelPos }) {
  const loc = LOCATIONS.find((l) => l.id === lp.id)!;
  const opacity = lp.depth > 0.1 ? Math.min(1, (lp.depth - 0.1) / 0.3) : 0;
  const counted = useCountUp(loc.amount, lp.depth > 0.45);

  return (
    <div
      className={styles.globeLabel}
      style={{
        left: lp.x,
        top: lp.y,
        opacity,
        zIndex: Math.round((lp.depth + 1) * 10),
        pointerEvents: opacity > 0.3 ? "auto" : "none",
      }}
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
    </div>
  );
}

function GlobeCard() {
  const [labels, setLabels] = useState<LabelPos[]>([]);
  const [paused, setPaused] = useState(false);
  const [activeIds, setActiveIds] = useState<string[]>(
    LOCATIONS.slice(0, VISIBLE_COUNT).map((l) => l.id)
  );
  const offsetRef = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      offsetRef.current = (offsetRef.current + 1) % LOCATIONS.length;
      const next: string[] = [];
      for (let i = 0; i < VISIBLE_COUNT; i++) {
        next.push(LOCATIONS[(offsetRef.current + i) % LOCATIONS.length].id);
      }
      setActiveIds(next);
    }, CYCLE_INTERVAL);
    return () => clearInterval(t);
  }, []);

  const handleLabels = useCallback((next: LabelPos[]) => {
    setLabels(next);
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
          <GlobeScene onLabels={handleLabels} paused={paused} activeIds={activeIds} />
        </Canvas>

        {/* Atmospheric glow overlay */}
        <div className={styles.globeGlow} aria-hidden />

        {/* DOM labels */}
        {labels.map((lp) => (
          <GlobeLabel key={lp.id} lp={lp} />
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
