import { partners } from "@/config/partners";
import styles from "./partners-ecosystem.module.css";

export function PartnersEcosystem() {
  const { ecosystem } = partners;

  return (
    <section className={styles.section} aria-label={ecosystem.heading}>
      <div className={styles.inner}>
        <p className={styles.heading}>{ecosystem.heading}</p>

        {/* TODO: populate with real partner logos once partnerships are confirmed — do not fabricate */}
        <div className={styles.logoRow} aria-hidden="true" />
      </div>
    </section>
  );
}
