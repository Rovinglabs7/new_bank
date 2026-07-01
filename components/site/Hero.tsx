"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/config/site";
import { NovaWidget } from "./NovaWidget";
import styles from "./hero.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * i,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  const { hero } = site;

  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden />

      <div className={styles.inner}>
        <motion.h1
          className={styles.headline}
          variants={fadeUp}
          initial={false}
          animate="visible"
          custom={0}
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          className={styles.subheadline}
          variants={fadeUp}
          initial={false}
          animate="visible"
          custom={1}
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          className={styles.ctas}
          variants={fadeUp}
          initial={false}
          animate="visible"
          custom={2}
        >
          <Link href={hero.primaryCta.href} className={styles.primaryCta}>
            {hero.primaryCta.label}
          </Link>
        </motion.div>
      </div>

      {/* Nova widget — floats at hero bottom, overlaps next section */}
      <div className={styles.widgetAnchor}>
        <NovaWidget />
      </div>
    </section>
  );
}
