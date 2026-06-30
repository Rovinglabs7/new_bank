import { pricing } from "@/config/pricing";
import styles from "./pricing-glance.module.css";

export function PricingGlance() {
  const { glance } = pricing;

  return (
    <section className={styles.section} aria-label="Plans at a glance">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{glance.heading}</h2>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.labelHead} scope="col" />
                {glance.columns.map((col) => (
                  <th key={col} scope="col">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {glance.rows.map((row) => (
                <tr key={row.label}>
                  <th className={styles.labelCell} scope="row">
                    {row.label}
                  </th>
                  <td>{row.standard}</td>
                  <td>{row.growth}</td>
                  <td>{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
