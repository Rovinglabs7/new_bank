"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/config/site";
import styles from "./header.module.css";

export function Header() {
  return (
    <motion.header
      className={styles.header}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          {site.brand}
        </Link>

        <nav className={styles.nav} aria-label="Main">
          {site.nav.map((item) => (
            <Link key={item.label} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href={site.navActions.login.href} className={styles.login}>
            {site.navActions.login.label}
          </Link>
          <Link href={site.navActions.demo.href} className={styles.demo}>
            {site.navActions.demo.label}
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
