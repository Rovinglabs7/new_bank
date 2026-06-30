import { press } from "@/config/press";
import styles from "./press-company-facts.module.css";

export function PressCompanyFacts() {
  const { companyFacts } = press;

  return (
    <section className={styles.section} aria-label={companyFacts.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{companyFacts.heading}</h2>

        <dl className={styles.list}>
          {companyFacts.items.map((item) => (
            <div className={styles.row} key={item.label}>
              <dt className={styles.label}>{item.label}</dt>
              <dd className={styles.value}>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
