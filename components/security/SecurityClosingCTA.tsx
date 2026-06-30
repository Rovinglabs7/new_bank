import Link from "next/link";
import { security } from "@/config/security";
import styles from "./securityClosingCta.module.css";

export function SecurityClosingCTA() {
  const { closing } = security;

  return (
    <section className={styles.section} aria-label="Get started">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{closing.heading}</h2>

        <div className={styles.ctas}>
          <Link href={closing.primaryCta.href} className={styles.primaryCta}>
            {closing.primaryCta.label}
          </Link>
          <Link href={closing.secondaryCta.href} className={styles.secondaryCta}>
            {closing.secondaryCta.label}
          </Link>
        </div>

        <p className={styles.disclaimer}>{closing.disclaimer}</p>
      </div>
    </section>
  );
}
