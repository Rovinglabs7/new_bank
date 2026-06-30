import { pricing } from "@/config/pricing";
import styles from "./pricing-addons.module.css";

export function PricingAddons() {
  const { addons } = pricing;

  return (
    <section className={styles.section} aria-label="Add-ons">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{addons.heading}</h2>
        <p className={styles.subheading}>{addons.subheading}</p>

        <div className={styles.grid}>
          {addons.items.map((addon) => (
            <div className={styles.card} key={addon.name}>
              <div className={styles.cardTop}>
                <h3 className={styles.name}>{addon.name}</h3>
                <span className={styles.price}>{addon.price}</span>
              </div>
              <p className={styles.description}>{addon.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
