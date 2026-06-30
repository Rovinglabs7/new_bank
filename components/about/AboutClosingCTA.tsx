import Link from "next/link";
import { about } from "@/config/about";
import styles from "./aboutClosingCta.module.css";

export function AboutClosingCTA() {
  const { closing } = about;

  return (
    <section className={styles.section} aria-label="Get in touch">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{closing.heading}</h2>
        <Link href={closing.cta.href} className={styles.cta}>
          {closing.cta.label}
        </Link>
      </div>
    </section>
  );
}
