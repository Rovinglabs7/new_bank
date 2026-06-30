import { partners } from "@/config/partners";
import styles from "./partners-partner-first.module.css";

export function PartnersPartnerFirst() {
  const { partnerFirst } = partners;

  return (
    <section className={styles.section} aria-label={partnerFirst.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{partnerFirst.heading}</h2>
        <p className={styles.body}>{partnerFirst.body}</p>

        {/* TODO: replace with real partner case studies once first integrations go live — do not fabricate testimonials or partner names */}
        <div className={styles.placeholder}>
          <p className={styles.placeholderText}>
            Partner case studies will appear here once our first integrations go live.
          </p>
        </div>
      </div>
    </section>
  );
}
