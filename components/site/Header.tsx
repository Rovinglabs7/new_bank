"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";
import { ProductsMenu } from "./ProductsMenu";
import { ResourcesMenu } from "./ResourcesMenu";
import styles from "./header.module.css";

const MOBILE_NAV_GROUPS = [
  {
    heading: "Products",
    items: [
      { label: "Recurring payments", href: "/products/subscription-payments" },
      { label: "One-off payments", href: "/products/instant-bank-pay" },
      { label: "Variable payments", href: "/products/variable-payments" },
      { label: "Payment links & QR codes", href: "/products/payment-links" },
      { label: "International payments", href: "/products/international-payments" },
      { label: "AI Concierge", href: "/products/ai-concierge" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Customer Stories", href: "/customers" },
      { label: "Blog", href: "/blog" },
      { label: "Payment Guides", href: "/resources/guides" },
      { label: "Developers", href: "/developers" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
      { label: "Security", href: "/security" },
      { label: "Partners", href: "/partners" },
      { label: "Careers", href: "/careers" },
      { label: "Contact sales", href: "/contact-sales" },
    ],
  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        className={styles.header}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} onClick={close}>
            {site.brand}
          </Link>

          <nav className={styles.nav} aria-label="Main">
            {site.nav.map((item) =>
              item.label === "Products" ? (
                <ProductsMenu key={item.label} />
              ) : item.label === "Resources" ? (
                <ResourcesMenu key={item.label} />
              ) : (
                <Link key={item.label} href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className={styles.actions}>
            <Link href={site.navActions.login.href} className={styles.login}>
              {site.navActions.login.label}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className={styles.hamburger}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={`${styles.bar} ${menuOpen ? styles.barTop : ""}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barMid : ""}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barBot : ""}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            ref={menuRef}
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className={styles.mobileMenuInner}>
              {MOBILE_NAV_GROUPS.map((group) => (
                <div key={group.heading} className={styles.mobileGroup}>
                  <p className={styles.mobileGroupHeading}>{group.heading}</p>
                  <ul className={styles.mobileGroupLinks}>
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className={styles.mobileLink} onClick={close}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className={styles.mobileActions}>
                <Link href={site.navActions.login.href} className={styles.mobileLoginBtn} onClick={close}>
                  {site.navActions.login.label}
                </Link>
                <Link href={site.navActions.demo.href} className={styles.mobileDemoBtn} onClick={close}>
                  {site.navActions.demo.label}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
