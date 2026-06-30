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

const INTEGRATION_ICONS = [
  "gk0KIU4Vl9h4U8BNCOsHa9TQRxM",
  "x47Hnha01tCwN5smxcTb01ve04",
  "Ur3npOHTI7IizwC8oh6vkrmZxA",
  "aNlIHEsXotZNsyXIfJvfJkooXo",
  "UKV9mSiDW8NdzEUjRBSIXCc4XQ",
  "62raDsW2GQ24SgzAJGKnlknj7hQ",
] as const;

/** Honeycomb rows: 5 + 6 + 5 hexagons (matches Framer Integration section). */
const HEX_ROWS = [
  { count: 5, offset: false, startIndex: 0, emptySlots: [1, 3] },
  { count: 6, offset: true, startIndex: 5, emptySlots: [0, 2, 4] },
  { count: 5, offset: false, startIndex: 11, emptySlots: [1, 4] },
] as const;

function HexCard({ iconId, empty }: { iconId?: string; empty?: boolean }) {
  return (
    <div className={styles.hexCard}>
      <div className={styles.hexSurface}>
        <img src={HEX_BG} alt="" className={styles.hexBg} loading="lazy" decoding="async" />
        {!empty && iconId ? (
          <img
            src={`${FRAMER}/${iconId}.svg`}
            alt=""
            className={styles.hexIcon}
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
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

  const hexGap = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [48, 6, 6, 48]);
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
              ? ({ "--hex-gap": "12px" } as React.CSSProperties)
              : ({ "--hex-gap": hexGapPx } as React.CSSProperties)
          }
        >
          {HEX_ROWS.map((row) => (
            <div
              key={row.startIndex}
              className={`${styles.hexRow} ${row.offset ? styles.hexRowOffset : ""}`}
            >
              {Array.from({ length: row.count }, (_, i) => {
                const empty = row.emptySlots.includes(i as never);
                const iconId =
                  INTEGRATION_ICONS[(row.startIndex + i) % INTEGRATION_ICONS.length];
                return (
                  <HexCard
                    key={`${row.startIndex}-${i}`}
                    iconId={iconId}
                    empty={empty}
                  />
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
