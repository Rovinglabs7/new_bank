"use client";

import { useState } from "react";
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

function EmailCapture() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    const params = new URLSearchParams({ email: trimmed });
    router.push(`/contact-sales?${params.toString()}`);
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
          <EmailCapture />
        </motion.div>
      </div>
    </section>
  );
}
