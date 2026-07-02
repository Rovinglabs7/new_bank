"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./payment-ops-cards.module.css";

// ─── CARD ONE: Automation Workflow ───────────────────────────────────────────

const STEPS = [
  { id: 1, label: "WHEN", value: "Customer completes checkout" },
  { id: 2, label: "CREATE", value: "Recurring payment" },
  { id: 3, label: "SEND", value: "Secure payment request" },
  { id: 4, label: "WAIT", value: "Customer authorisation" },
  { id: 5, label: "THEN", value: "Notify the team", accent: true },
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
      timings.push(setTimeout(() => setVisibleSteps((prev) => [...prev, stepIdx]), delay));
    };
    const showLine = (lineIdx: number, delay: number) => {
      timings.push(setTimeout(() => setActiveLine((prev) => [...prev, lineIdx]), delay));
    };

    show(0, 300);   showLine(0, 700);
    show(1, 950);   showLine(1, 1350);
    show(2, 1600);
    timings.push(setTimeout(() => { setCursorVisible(true); setCursorPos({ x: 52, y: 62 }); }, 2000));
    timings.push(setTimeout(() => setClicking(true), 2300));
    timings.push(setTimeout(() => setClicking(false), 2550));
    showLine(2, 2700);
    show(3, 2950);  showLine(3, 3350);
    show(4, 3600);
    timings.push(setTimeout(() => { setCursorPos({ x: 60, y: 82 }); }, 3800));
    timings.push(setTimeout(() => setClicking(true), 4050));
    timings.push(setTimeout(() => setClicking(false), 4300));
    timings.push(setTimeout(() => setCursorVisible(false), 4600));
    timings.push(setTimeout(() => { setDone(true); animatingRef.current = false; }, 5000));
    timings.push(setTimeout(() => runAnimation(), 8500));

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
                animate={{ opacity: 1, left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, scale: clicking ? 0.85 : 1 }}
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
                      <span className={styles.stepValue} style={step.accent ? { color: "#16a34a" } : undefined}>
                        {step.value}
                      </span>
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

// ─── CARD TWO: Global Collections ────────────────────────────────────────────

const COLLECTIONS = [
  { id: "new-york",     flag: "🇺🇸", city: "New York",      amount: "$42,860"   },
  { id: "london",       flag: "🇬🇧", city: "London",        amount: "£26,840"   },
  { id: "berlin",       flag: "🇩🇪", city: "Berlin",        amount: "€33,560"   },
  { id: "san-fran",     flag: "🇺🇸", city: "San Francisco", amount: "$18,420"   },
  { id: "paris",        flag: "🇫🇷", city: "Paris",         amount: "€22,780"   },
  { id: "amsterdam",    flag: "🇳🇱", city: "Amsterdam",     amount: "€19,420"   },
  { id: "zurich",       flag: "🇨🇭", city: "Zurich",        amount: "CHF 41,200"},
  { id: "chicago",      flag: "🇺🇸", city: "Chicago",       amount: "$31,280"   },
  { id: "stockholm",    flag: "🇸🇪", city: "Stockholm",     amount: "kr 284,000"},
  { id: "madrid",       flag: "🇪🇸", city: "Madrid",        amount: "€17,960"   },
  { id: "milan",        flag: "🇮🇹", city: "Milan",         amount: "€28,440"   },
  { id: "dublin",       flag: "🇮🇪", city: "Dublin",        amount: "€14,720"   },
  { id: "seattle",      flag: "🇺🇸", city: "Seattle",       amount: "$23,640"   },
  { id: "munich",       flag: "🇩🇪", city: "Munich",        amount: "€38,900"   },
  { id: "boston",       flag: "🇺🇸", city: "Boston",        amount: "$29,180"   },
  { id: "austin",       flag: "🇺🇸", city: "Austin",        amount: "$21,450"   },
];

// Three fixed slot positions within the card
const SLOTS = [
  { top: "14%", left: "8%",  right: "auto" },
  { top: "40%", left: "auto", right: "6%"  },
  { top: "66%", left: "12%", right: "auto" },
];

function CollectionSlot({ slotIdx, startIdx }: { slotIdx: number; startIdx: number }) {
  const STRIDE = 5; // each slot advances by this to keep items distinct
  const [idx, setIdx] = useState(startIdx);
  const slot = SLOTS[slotIdx];

  useEffect(() => {
    const delay = slotIdx * 1400;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setIdx((i) => (i + STRIDE) % COLLECTIONS.length);
      }, 3200);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [slotIdx]);

  const item = COLLECTIONS[idx];

  return (
    <div className={styles.collectionSlot} style={{ top: slot.top, left: slot.left, right: slot.right }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          className={styles.collectionCard}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.collectionFlag}>{item.flag}</span>
          <div className={styles.collectionInfo}>
            <span className={styles.collectionCity}>{item.city}</span>
            <span className={styles.collectionAmount}>{item.amount} collected</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CollectionsCard() {
  return (
    <div className={styles.card}>
      <div className={styles.cardMedia}>
        {/* Subtle globe/map background */}
        <div className={styles.collectionsGlobe} aria-hidden>
          <svg viewBox="0 0 400 300" className={styles.collectionsGlobeSvg} fill="none">
            {/* Ellipse representing globe */}
            <ellipse cx="200" cy="150" rx="130" ry="130" stroke="currentColor" strokeWidth="0.8" />
            {/* Latitude lines */}
            {[-60, -30, 0, 30, 60].map((lat) => {
              const y = 150 - (lat / 90) * 130;
              const rx = Math.cos((lat * Math.PI) / 180) * 130;
              return <ellipse key={lat} cx="200" cy={y} rx={rx} ry={rx * 0.22} stroke="currentColor" strokeWidth="0.5" />;
            })}
            {/* Longitude lines */}
            {[-90, -60, -30, 0, 30, 60, 90].map((lng) => {
              const x = 200 + (lng / 180) * 130;
              return <line key={lng} x1={x} y1={20} x2={x} y2={280} stroke="currentColor" strokeWidth="0.5" />;
            })}
          </svg>
        </div>

        {/* Floating payment notification slots */}
        {SLOTS.map((_, i) => (
          <CollectionSlot key={i} slotIdx={i} startIdx={i * 5} />
        ))}

        {/* Live indicator */}
        <div className={styles.liveIndicator} aria-hidden>
          <span className={styles.liveDot} />
          <span className={styles.liveLabel}>Live</span>
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
          <CollectionsCard />
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
