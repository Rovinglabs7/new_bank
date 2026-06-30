"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { subscriptionPayments } from "@/config/subscription-payments";
import styles from "./SPFeatures.module.css";

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.5 8h17M3.5 16h17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 10a6 6 0 1 1 12 0v4l2 2H4l2-2v-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="6" r="2" fill="currentColor" />
      <circle cx="16" cy="12" r="2" fill="currentColor" />
      <circle cx="10" cy="18" r="2" fill="currentColor" />
    </svg>
  );
}

function CogIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const iconMap = {
  globe: GlobeIcon,
  bell: BellIcon,
  sliders: SlidersIcon,
  cog: CogIcon,
};

export function SPFeatures() {
  const { features } = subscriptionPayments;
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label="Features">
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.left}>
            <h2 className={styles.heading}>{features.heading}</h2>

            <div className={styles.grid}>
              {features.items.map((item, i) => {
                const Icon = iconMap[item.icon];
                return (
                  <motion.div
                    key={item.heading}
                    className={styles.feature}
                    initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
                  >
                    <div className={styles.iconWrap}>
                      <Icon />
                    </div>
                    <h3 className={styles.featureHeading}>{item.heading}</h3>
                    <p className={styles.featureBody}>
                      {item.body}
                      {item.link && (
                        <>
                          {" "}
                          <Link href={item.link.href} className={styles.featureLink}>
                            {item.link.label}
                          </Link>
                          .
                        </>
                      )}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            className={styles.visual}
            initial={reduceMotion ? undefined : { opacity: 0, x: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* image placeholder : large dashboard recurring payments view */}
            <div className={styles.imagePlaceholder} aria-hidden />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
