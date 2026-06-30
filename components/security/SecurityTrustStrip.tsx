import { security } from "@/config/security";
import styles from "./securityTrustStrip.module.css";

export function SecurityTrustStrip() {
  const { trustStrip } = security;

  return (
    <section className={styles.section} aria-label="Infrastructure partners">
      <div className={styles.inner}>
        <p className={styles.message}>{trustStrip.message}</p>
        <ul className={styles.partners}>
          {trustStrip.partners.map((partner) => (
            <li key={partner.name} className={styles.partner}>
              {partner.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
