"use client";

import { pricing } from "@/config/pricing";
import styles from "./pricing-fees.module.css";

function InfoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "4px", flexShrink: 0 }}
    >
      <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeOpacity="0.45" />
      <path d="M7 6v4" stroke="currentColor" strokeOpacity="0.65" strokeLinecap="round" />
      <circle cx="7" cy="4.5" r="0.75" fill="currentColor" fillOpacity="0.65" />
    </svg>
  );
}

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
              {fees.groups.map((group) => (
                <>
                  <tr key={`group-${group.category}`} className={styles.groupRow}>
                    <th
                      className={styles.groupLabel}
                      colSpan={fees.columns.length + 1}
                      scope="rowgroup"
                    >
                      {group.category}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label} className={row.tooltip ? styles.hasTooltip : undefined}>
                      <th className={styles.feeCell} scope="row">
                        <span className={styles.feeLabelInner}>
                          {row.label}
                          {row.tooltip && row.label === "Large Direct Debit" ? (
                            <span className={styles.feeNote}>{row.tooltip}</span>
                          ) : null}
                          {row.tooltip && row.label !== "Large Direct Debit" ? (
                            <span className={styles.tooltipWrapper}>
                              <InfoIcon />
                              <span className={styles.tooltipText}>{row.tooltip}</span>
                            </span>
                          ) : null}
                        </span>
                      </th>
                      <td>{row.standard}</td>
                      <td>{row.growth}</td>
                      <td>{row.enterprise}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        <p className={styles.note}>{fees.note}</p>
      </div>
    </section>
  );
}
