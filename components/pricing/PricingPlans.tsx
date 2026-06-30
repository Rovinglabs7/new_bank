"use client";

import Link from "next/link";
import { pricing, regionalPrices } from "@/config/pricing";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencyToggle } from "./CurrencyToggle";
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
  const { currency } = useCurrency();
  const rates = regionalPrices[currency];

  function getPlanPrice(planId: string, fallback: string): string {
    if (planId === "standard") return rates.standard;
    if (planId === "growth") return rates.growth;
    if (planId === "enterprise") return fallback; // always "Custom pricing"
    return fallback;
  }

  return (
    <section className={styles.section} aria-label="Plans">
      <div className={styles.inner}>
        <CurrencyToggle />
        <div className={styles.grid}>
          {pricing.plans.map((plan) => {
            const displayPrice = getPlanPrice(plan.id, plan.price);
            return (
              <div
                key={plan.id}
                className={
                  plan.recommended ? `${styles.card} ${styles.recommended}` : styles.card
                }
              >
                {plan.recommended ? (
                  <span className={styles.badge}>Most popular</span>
                ) : null}

                <p className={styles.eyebrow}>{plan.eyebrow}</p>
                <h3 className={styles.name}>{plan.name}</h3>
                <p className={styles.tagline}>{plan.tagline}</p>

                <div className={styles.priceRow}>
                  <span
                    className={styles.price}
                    style={{ transition: "opacity 0.2s ease" }}
                  >
                    {displayPrice}
                  </span>
                  {plan.priceUnit && plan.id !== "enterprise" ? (
                    <span className={styles.priceUnit}>{plan.priceUnit}</span>
                  ) : null}
                </div>
                {plan.priceNote ? (
                  <p className={styles.priceNote}>{plan.priceNote}</p>
                ) : null}

                <div className={styles.actions}>
                  <Link href={plan.cta.href} className={styles.primaryCta}>
                    {plan.cta.label}
                  </Link>
                </div>

                {plan.featurePrefix ? (
                  <p className={styles.featurePrefix}>{plan.featurePrefix}</p>
                ) : null}

                <div className={styles.featureGroups}>
                  {plan.featureGroups.map((group) => (
                    <div className={styles.featureGroup} key={group.category}>
                      <p className={styles.featureCategory}>{group.category}</p>
                      <ul className={styles.features}>
                        {group.items.map((item) => (
                          <li key={item} className={styles.feature}>
                            <CheckIcon />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <a href="#compare" className={styles.compareLink}>
                  View full feature list ↓
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
