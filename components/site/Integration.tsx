"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import styles from "./integration.module.css";

const FRAMER = "https://framerusercontent.com/images";

const HEX_BG = `${FRAMER}/TAhmjfzDHkkF0rQ56ovSVL98N0.svg`;
const BG_SHAPE = `${FRAMER}/ok0YH14sotPO5zXPf4nG0HIuzbQ.svg`;
const BADGE_ICON = `${FRAMER}/9DPQJlLNx2fc3Xz4SFEvbFa7KbE.svg`;

type HexLogo = { src: string; label: string } | null;

/**
 * 5 + 6 + 5 honeycomb. null = empty hex (shadow tile only).
 */
const HEX_LAYOUT: HexLogo[][] = [
  [
    { src: "/logos/shopify.svg", label: "Shopify" },
    { src: "/logos/hubspot.svg", label: "HubSpot" },
    { src: "/logos/salesforce.svg", label: "Salesforce" },
    null,
    { src: "/logos/slack.png", label: "Slack" },
  ],
  [
    { src: "/logos/microsoft-teams.svg", label: "Microsoft Teams" },
    null,
    { src: "/logos/whatsapp.svg", label: "WhatsApp Business" },
    { src: "/logos/gmail.svg", label: "Gmail" },
    { src: "/logos/outlook.png", label: "Outlook" },
    null,
  ],
  [
    null,
    { src: "/logos/xero.svg", label: "Xero" },
    null,
    { src: "/logos/quickbooks.svg", label: "QuickBooks Online" },
    { src: "/logos/sage.svg", label: "Sage" },
  ],
];

function HexCard({ logo }: { logo: HexLogo }) {
  return (
    <div className={styles.hexCard}>
      <img src={HEX_BG} alt="" className={styles.hexBg} loading="lazy" decoding="async" />
      {logo ? (
        <img
          src={logo.src}
          alt={logo.label}
          className={styles.hexIcon}
          loading="lazy"
          decoding="async"
        />
      ) : null}
    </div>
  );
}

export function Integration() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Spread apart when away; tight cluster when centered — keep more gap on small screens.
  const gapSpread = isNarrow ? 52 : 78;
  const gapTight = isNarrow ? 20 : 4;
  const hexGap = useTransform(
    scrollYProgress,
    [0, 0.42, 0.58, 1],
    [gapSpread, gapTight, gapTight, gapSpread]
  );
  const hexGapPx = useTransform(hexGap, (v) => `${v}px`);
  const restingGap = isNarrow ? "20px" : "8px";

  return (
    <section
      ref={sectionRef}
      id="integration"
      className={styles.section}
      aria-label="Integration"
    >
      <div className={styles.bgShape} aria-hidden>
        <img src={BG_SHAPE} alt="" loading="lazy" decoding="async" />
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.badge}>
            <img src={BADGE_ICON} alt="" className={styles.badgeIcon} aria-hidden />
            Integration
          </div>
          <h2 className={styles.heading}>
            Powerful on its own. Even better with the tools you already use.
          </h2>
          <a href="#integrations" className={styles.cta}>
            Explore 35+ integrations
            <span className={styles.ctaArrow} aria-hidden>
              →
            </span>
          </a>
        </header>

        <motion.div
          className={styles.hexGrid}
          style={
            reduceMotion
              ? ({ "--hex-gap": restingGap } as React.CSSProperties)
              : ({ "--hex-gap": hexGapPx } as React.CSSProperties)
          }
        >
          {HEX_LAYOUT.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`${styles.hexRow} ${rowIndex === 1 ? styles.hexRowOffset : ""}`}
            >
              {row.map((logo, cellIndex) => (
                <HexCard key={`${rowIndex}-${cellIndex}`} logo={logo} />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
