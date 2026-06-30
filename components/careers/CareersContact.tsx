import { careers } from "@/config/careers";
import styles from "./careers-contact.module.css";

export function CareersContact() {
  const { contact } = careers;

  return (
    <section className={styles.section} aria-label={contact.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{contact.heading}</h2>
        <div className={styles.grid}>
          {contact.items.map((item, index) => (
            <div className={styles.item} key={item.label + index}>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.value}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
