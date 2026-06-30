"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/config/site";
import { useAnimationReady } from "@/hooks/use-animation-ready";
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
  const ready = useAnimationReady();

  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden />

      <div className={styles.inner}>
        <motion.p
          className={styles.eyebrow}
          variants={fadeUp}
          initial="hidden"
          animate={ready ? "visible" : "hidden"}
          custom={0}
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          className={styles.headline}
          variants={fadeUp}
          initial="hidden"
          animate={ready ? "visible" : "hidden"}
          custom={1}
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          className={styles.subheadline}
          variants={fadeUp}
          initial="hidden"
          animate={ready ? "visible" : "hidden"}
          custom={2}
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          className={styles.ctas}
          variants={fadeUp}
          initial="hidden"
          animate={ready ? "visible" : "hidden"}
          custom={3}
        >
          <Link href={hero.primaryCta.href} className={styles.primaryCta}>
            {hero.primaryCta.label}
          </Link>
          <Link href={hero.secondaryCta.href} className={styles.secondaryCta}>
            {hero.secondaryCta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
