import Link from "next/link";
import { security } from "@/config/security";
import styles from "./securityPillars.module.css";

function PillarIcon() {
  return (
    <svg
      className={styles.pillarIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M8 12h8M12 8v8" strokeLinecap="round" />
    </svg>
  );
}

export function SecurityPillars() {
  const { pillars } = security;

  return (
    <section className={styles.section} aria-label="Security pillars">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{pillars.eyebrow}</p>
        <h2 className={styles.heading}>{pillars.heading}</h2>

        <div className={styles.grid}>
          {pillars.items.map((item) => (
            <div className={styles.pillar} key={item.title}>
              <PillarIcon />
              <h3 className={styles.pillarTitle}>{item.title}</h3>
              <p className={styles.pillarBody}>{item.body}</p>
              {item.cta ? (
                <Link href={item.cta.href} className={styles.pillarLink}>
                  {item.cta.label}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
