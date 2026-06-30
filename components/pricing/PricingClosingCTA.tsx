"use client";

import Link from "next/link";
import { pricing } from "@/config/pricing";
import styles from "./pricing-closing-cta.module.css";

export function PricingClosingCTA() {
  const { closing } = pricing;

  return (
    <section className={styles.section} aria-label="Get started">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{closing.heading}</h2>
        <p className={styles.body}>{closing.body}</p>

        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          <input
            type="email"
            placeholder="you@business.com"
            className={styles.emailInput}
            aria-label="Work email"
          />
          <Link href={closing.primaryCta.href} className={styles.primaryCta}>
            {closing.primaryCta.label}
          </Link>
        </form>
      </div>
    </section>
  );
}
