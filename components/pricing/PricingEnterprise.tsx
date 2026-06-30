import Link from "next/link";
import { pricing } from "@/config/pricing";
import styles from "./pricing-enterprise.module.css";

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

export function PricingEnterprise() {
  const { enterprise } = pricing;

  return (
    <section className={styles.section} aria-labelledby="enterprise-heading">
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.textCol}>
            <p className={styles.eyebrow}>{enterprise.eyebrow}</p>
            <h2 id="enterprise-heading" className={styles.heading}>
              {enterprise.heading}
            </h2>
            <p className={styles.body}>{enterprise.body}</p>
            <Link href={enterprise.cta.href} className={styles.cta}>
              {enterprise.cta.label}
            </Link>
          </div>

          <ul className={styles.points}>
            {enterprise.points.map((point) => (
              <li key={point} className={styles.point}>
                <CheckIcon />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
