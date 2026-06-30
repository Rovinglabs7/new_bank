"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import styles from "./integration.module.css";

const FRAMER = "https://framerusercontent.com/images";

const HEX_BG = `${FRAMER}/TAhmjfzDHkkF0rQ56ovSVL98N0.svg`;
const BG_SHAPE = `${FRAMER}/ok0YH14sotPO5zXPf4nG0HIuzbQ.svg`;
const BADGE_ICON = `${FRAMER}/9DPQJlLNx2fc3Xz4SFEvbFa7KbE.svg`;
const CLIENT_LOGOS = `${FRAMER}/VdVYqkZlkUU6uQ32KYbaXXWVM.webp`;
const STAR = `${FRAMER}/NYNzlwZG9GyLk7DGYxXAX0aGwc.svg`;

/**
 * 5 + 6 + 5 honeycomb from Framer Integration section.
 * null = empty hex (shadow tile only).
 */
const HEX_LAYOUT: (string | null)[][] = [
  [
    "gk0KIU4Vl9h4U8BNCOsHa9TQRxM",
    null,
    "Ur3npOHTI7IizwC8oh6vkrmZxA",
    null,
    "x47Hnha01tCwN5smxcTb01ve04",
  ],
  [
    "UKV9mSiDW8NdzEUjRBSIXCc4XQ",
    null,
    "gk0KIU4Vl9h4U8BNCOsHa9TQRxM",
    null,
    "62raDsW2GQ24SgzAJGKnlknj7hQ",
    null,
  ],
  [
    null,
    "aNlIHEsXotZNsyXIfJvfJkooXo",
    null,
    "UKV9mSiDW8NdzEUjRBSIXCc4XQ",
    null,
  ],
];

function HexCard({ iconId }: { iconId: string | null }) {
  return (
    <div className={styles.hexCard}>
      <img src={HEX_BG} alt="" className={styles.hexBg} loading="lazy" decoding="async" />
      {iconId ? (
        <img
          src={`${FRAMER}/${iconId}.svg`}
          alt=""
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Spread apart when away; tight cluster when section is centered (contracted).
  const hexGap = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], [78, 4, 4, 78]);
  const hexGapPx = useTransform(hexGap, (v) => `${v}px`);

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
            A modern digital bank built to simplify the way you manage money
          </h2>
        </header>

        <div className={styles.trust}>
          <img
            src={CLIENT_LOGOS}
            alt="Trusted by leading companies"
            className={styles.clientLogos}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.users}>
            <img src={STAR} alt="" className={styles.star} aria-hidden />
            <span>4000+ users trust us</span>
          </div>
        </div>

        <motion.div
          className={styles.hexGrid}
          style={
            reduceMotion
              ? ({ "--hex-gap": "8px" } as React.CSSProperties)
              : ({ "--hex-gap": hexGapPx } as React.CSSProperties)
          }
        >
          {HEX_LAYOUT.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`${styles.hexRow} ${rowIndex === 1 ? styles.hexRowOffset : ""}`}
            >
              {row.map((iconId, cellIndex) => (
                <HexCard key={`${rowIndex}-${cellIndex}`} iconId={iconId} />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
