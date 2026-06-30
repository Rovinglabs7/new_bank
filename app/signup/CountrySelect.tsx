"use client";

import { useMemo, useRef, useState } from "react";
import { countries, type Country } from "./countries";
import styles from "./signup.module.css";

export function CountrySelect() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Country | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => c.label.toLowerCase().includes(q));
  }, [query]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  return (
    <div className={styles.countrySelect} ref={wrapRef}>
      <button
        type="button"
        className={styles.countryTrigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected ? (
          <>
            <span aria-hidden>{selected.flag}</span>
            {selected.label}
          </>
        ) : (
          <span className={styles.countryPlaceholder}>
            Search for your country
          </span>
        )}
        <span className={styles.countryChevron} aria-hidden>
          ▾
        </span>
      </button>

      {open ? (
        <div className={styles.countryDropdown}>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search countries"
            className={styles.countrySearch}
          />
          <ul className={styles.countryList} role="listbox">
            {results.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected?.code === c.code}
                  className={styles.countryOption}
                  onClick={() => {
                    setSelected(c);
                    close();
                  }}
                >
                  <span aria-hidden>{c.flag}</span>
                  {c.label}
                </button>
              </li>
            ))}
            {results.length === 0 ? (
              <li className={styles.countryEmpty}>No countries found</li>
            ) : null}
          </ul>
        </div>
      ) : null}

      <input type="hidden" name="country" value={selected?.code ?? ""} required />
    </div>
  );
}
