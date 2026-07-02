"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { site } from "@/config/site";
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

function HeroEmailCapture() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  function submit() {
    if (!email.trim()) return;
    router.push(`/contact-sales?email=${encodeURIComponent(email.trim())}`);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); submit(); }
  }

  return (
    <div className={styles.emailCapture}>
      <div className={styles.emailForm}>
        <input
          type="email"
          className={styles.emailInput}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKey}
          aria-label="Email address"
          autoComplete="email"
        />
        <button type="button" className={styles.emailSubmit} onClick={submit}>
          Submit
        </button>
      </div>
      <Link href="/contact-sales" className={styles.demoLink}>
        Book a demo
      </Link>
    </div>
  );
}

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
          <HeroEmailCapture />
        </motion.div>
      </div>
    </section>
  );
}
