import Link from "next/link";
import { careers } from "@/config/careers";
import styles from "./careers-closing-cta.module.css";

export function CareersClosingCTA() {
  const { closing } = careers;

  return (
    <section className={styles.section} aria-label="Get started">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{closing.heading}</h2>
        <p className={styles.body}>{closing.body}</p>
        <Link href={closing.cta.href} className={styles.cta}>
          {closing.cta.label}
        </Link>
      </div>
    </section>
  );
}
