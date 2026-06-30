import Link from "next/link";
import { about } from "@/config/about";
import styles from "./aboutIntegrations.module.css";

export function AboutIntegrations() {
  const { integrations } = about;

  return (
    <section className={styles.section} aria-label="Built to connect with what you already use">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{integrations.heading}</h2>
        <p className={styles.body}>{integrations.body}</p>
        <Link href={integrations.cta.href} className={styles.link}>
          {integrations.cta.label}
        </Link>
      </div>
    </section>
  );
}
