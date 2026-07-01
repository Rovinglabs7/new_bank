"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { currencies, Currency } from "@/config/pricing";
import styles from "./currency-toggle.module.css";

const CURRENCIES: Currency[] = ["GBP", "EUR", "USD"];

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const idx = CURRENCIES.indexOf(currency);
    const btn = optionRefs.current[idx];
    const container = containerRef.current;
    if (!btn || !container) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setSliderStyle({
      left: btnRect.left - containerRect.left,
      width: btnRect.width,
    });
  }, [currency]);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.toggle}
        ref={containerRef}
        role="group"
        aria-label="Select pricing currency"
      >
        <div
          className={styles.slider}
          style={{ left: sliderStyle.left, width: sliderStyle.width }}
          aria-hidden
        />
        {CURRENCIES.map((c, i) => {
          const meta = currencies[c];
          const active = currency === c;
          return (
            <button
              key={c}
              ref={(el) => { optionRefs.current[i] = el; }}
              type="button"
              className={active ? `${styles.option} ${styles.optionActive}` : styles.option}
              onClick={() => setCurrency(c)}
              aria-pressed={active}
            >
              {meta.symbol} {meta.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
