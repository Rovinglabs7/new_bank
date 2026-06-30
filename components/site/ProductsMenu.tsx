"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import styles from "./products-menu.module.css";

export function ProductsMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { columns, switching } = site.productsMenu;

  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="products-menu-panel"
        onClick={() => setOpen((v) => !v)}
      >
        Products
      </button>

      {open && (
        <div id="products-menu-panel" role="menu" aria-label="Products" className={styles.panel}>
          <div className={styles.inner}>
            <div className={styles.grid}>
              {columns.map((col) => (
                <div className={styles.col} key={col.heading}>
                  <p className={styles.heading}>{col.heading}</p>
                  <ul className={styles.list}>
                    {col.items.map((item) => (
                      <li key={item.title} role="none">
                        <Link role="menuitem" href={item.href} onClick={() => setOpen(false)}>
                          <span className={styles.title}>{item.title}</span>
                          <span className={styles.subtext}>{item.subtext}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link role="menuitem" href={switching.href} className={styles.switch} onClick={() => setOpen(false)}>
              {switching.label}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
