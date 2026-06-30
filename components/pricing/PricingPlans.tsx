import Link from "next/link";
import { pricing } from "@/config/pricing";
import styles from "./pricing-plans.module.css";

function CheckIcon() {
  return (
    <svg
      className={styles.checkIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M5 12.5 9.5 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PricingPlans() {
  return (
    <section className={styles.section} aria-label="Plans">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {pricing.plans.map((plan) => (
            <div
              key={plan.id}
              className={
                plan.recommended ? `${styles.card} ${styles.recommended}` : styles.card
              }
            >
              {plan.recommended ? (
                <span className={styles.badge}>Most popular</span>
              ) : null}

              <h3 className={styles.name}>{plan.name}</h3>
              <p className={styles.tagline}>{plan.tagline}</p>

              <div className={styles.priceRow}>
                <span className={styles.price}>{plan.price}</span>
                {plan.priceUnit ? (
                  <span className={styles.priceUnit}>{plan.priceUnit}</span>
                ) : null}
              </div>
              {plan.priceNote ? (
                <p className={styles.priceNote}>{plan.priceNote}</p>
              ) : null}

              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature} className={styles.feature}>
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.actions}>
                <Link
                  href={plan.cta.href}
                  className={
                    plan.recommended ? styles.primaryCta : styles.secondaryCtaButton
                  }
                >
                  {plan.cta.label}
                </Link>
                {plan.secondaryCta ? (
                  <Link href={plan.secondaryCta.href} className={styles.linkCta}>
                    {plan.secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
