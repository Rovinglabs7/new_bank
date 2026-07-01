import { Fragment } from "react";
import { pricing } from "@/config/pricing";
import styles from "./pricing-comparison.module.css";

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className={styles.cellText}>{value}</span>;
  }
  if (!value) {
    return <span className={styles.dash} aria-hidden>-</span>;
  }
  return (
    <svg
      className={styles.tickIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-label="Included"
    >
      <path d="M5 12.5 9.5 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      className={styles.tooltipIcon}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeOpacity="0.8" />
      <path d="M7 6v4" stroke="currentColor" strokeLinecap="round" />
      <circle cx="7" cy="4.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function PricingComparison() {
  const { comparison } = pricing;

  return (
    <section className={styles.section} id="compare" aria-label="Compare plans">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{comparison.heading}</h2>
        <p className={styles.subheading}>{comparison.subheading}</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.featureHead} scope="col">
                  Feature
                </th>
                <th scope="col">Standard</th>
                <th scope="col">Growth</th>
                <th scope="col">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparison.categories.map((category) => (
                <Fragment key={category.category}>
                  <tr className={styles.categoryRow}>
                    <th className={styles.categoryCell} colSpan={4} scope="colgroup">
                      {category.category}
                    </th>
                  </tr>
                  {category.rows.map((row) => (
                    <tr key={row.label}>
                      <th className={styles.featureCell} scope="row">
                        <span className={styles.featureLabelRow}>
                          <span className={styles.featureLabel}>{row.label}</span>
                          {"tooltip" in row && row.tooltip ? (
                            <span className={styles.tooltipWrapper}>
                              <InfoIcon />
                              <span className={styles.tooltipText} role="tooltip">
                                {row.tooltip}
                              </span>
                            </span>
                          ) : null}
                        </span>
                      </th>
                      <td>
                        <Cell value={row.standard} />
                      </td>
                      <td>
                        <Cell value={row.growth} />
                      </td>
                      <td>
                        <Cell value={row.enterprise} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
