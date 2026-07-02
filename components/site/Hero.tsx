"use client";

import { useState, useEffect, useRef } from "react";
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

const PLACEHOLDER_EMAILS = [
  "sarah@acmecorp.com",
  "james@fintech.io",
  "hello@startupco.com",
  "finance@bigretail.co.uk",
  "cfo@growthstage.com",
];

function HeroEmailCapture() {
  const [email, setEmail] = useState("");
  const [typedPlaceholder, setTypedPlaceholder] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const cycleRef = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clearAll() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }

  function typePhrase(phrase: string, onDone: () => void) {
    let i = 0;
    function tick() {
      i++;
      setTypedPlaceholder(phrase.slice(0, i));
      if (i < phrase.length) {
        timeoutsRef.current.push(setTimeout(tick, 55 + Math.random() * 35));
      } else {
        timeoutsRef.current.push(setTimeout(onDone, 1800));
      }
    }
    timeoutsRef.current.push(setTimeout(tick, 55));
  }

  function erasePhrase(phrase: string, onDone: () => void) {
    let i = phrase.length;
    function tick() {
      i--;
      setTypedPlaceholder(phrase.slice(0, i));
      if (i > 0) {
        timeoutsRef.current.push(setTimeout(tick, 30));
      } else {
        timeoutsRef.current.push(setTimeout(onDone, 400));
      }
    }
    timeoutsRef.current.push(setTimeout(tick, 30));
  }

  function runCycle() {
    const phrase = PLACEHOLDER_EMAILS[cycleRef.current % PLACEHOLDER_EMAILS.length];
    cycleRef.current++;
    typePhrase(phrase, () => {
      erasePhrase(phrase, runCycle);
    });
  }

  useEffect(() => {
    const startDelay = setTimeout(runCycle, 900);
    timeoutsRef.current.push(startDelay);
    return clearAll;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function submit() {
    if (!email.trim()) return;
    router.push(`/contact-sales?email=${encodeURIComponent(email.trim())}`);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); submit(); }
  }

  return (
    <div className={styles.emailForm}>
      <div className={styles.emailInputWrap}>
        <input
          type="email"
          className={styles.emailInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Email address"
          autoComplete="email"
        />
        {!email && !isFocused && (
          <span className={styles.animatedPlaceholder} aria-hidden>
            {typedPlaceholder}
            <span className={styles.cursor}>|</span>
          </span>
        )}
      </div>
      <button type="button" className={styles.emailSubmit} onClick={submit}>
        Submit
      </button>
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
