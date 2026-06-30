import { partners } from "@/config/partners";
import styles from "./partners-why-partner.module.css";

export function PartnersWhyPartner() {
  const { whyPartner } = partners;

  return (
    <section className={styles.section} aria-label={whyPartner.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{whyPartner.heading}</h2>

        <div className={styles.grid}>
          {whyPartner.items.map((item) => (
            <div className={styles.item} key={item.number}>
              <span className={styles.number}>{item.number}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
