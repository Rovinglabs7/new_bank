import { pricing } from "@/config/pricing";
import styles from "./pricing-fees.module.css";

export function PricingFees() {
  const { fees } = pricing;

  return (
    <section className={styles.section} id="fees" aria-label="Transaction fees">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{fees.heading}</h2>
        <p className={styles.subheading}>{fees.subheading}</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.feeHead} scope="col" />
                {fees.columns.map((col) => (
                  <th key={col} scope="col">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fees.rows.map((row) => (
                <tr key={row.label}>
                  <th className={styles.feeCell} scope="row">
                    {row.label}
                  </th>
                  <td>{row.standard}</td>
                  <td>{row.growth}</td>
                  <td>{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className={styles.note}>{fees.note}</p>
      </div>
    </section>
  );
}
