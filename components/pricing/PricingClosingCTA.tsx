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

        <div className={styles.ctas}>
          <Link href={closing.primaryCta.href} className={styles.primaryCta}>
            {closing.primaryCta.label}
          </Link>
          <Link href={closing.secondaryCta.href} className={styles.secondaryCta}>
            {closing.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
