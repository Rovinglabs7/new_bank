"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { currencies, Currency } from "@/config/pricing";
import styles from "./currency-toggle.module.css";

const CURRENCIES: Currency[] = ["GBP", "EUR", "USD"];

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className={styles.wrapper} role="group" aria-label="Select pricing currency">
      {CURRENCIES.map((c) => {
        const meta = currencies[c];
        const active = currency === c;
        return (
          <button
            key={c}
            type="button"
            className={active ? `${styles.pill} ${styles.pillActive}` : styles.pill}
            onClick={() => setCurrency(c)}
            aria-pressed={active}
          >
            {meta.symbol} {meta.label}
          </button>
        );
      })}
    </div>
  );
}
