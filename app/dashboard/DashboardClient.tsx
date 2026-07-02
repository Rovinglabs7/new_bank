"use client";

import { useState } from "react";
import { signOut } from "@/lib/actions/auth";
import styles from "./dashboard.module.css";

// ── Thin SVG icon primitives — 24px viewport, 1.5px stroke, round caps ─────────

function Svg({ children, size = 16 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

// Nav icons — minimal, optically balanced, Lucide-quality paths
function IconHome({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </Svg>
  );
}

function IconPayments({ size = 16 }) {
  return (
    <Svg size={size}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </Svg>
  );
}

function IconCustomers({ size = 16 }) {
  return (
    <Svg size={size}>
      <circle cx="8" cy="7" r="3.5" />
      <path d="M2 21v-1.5A4.5 4.5 0 016.5 15h3A4.5 4.5 0 0114 19.5V21" />
      <path d="M15 5.5a3.5 3.5 0 110 7" />
      <path d="M17 15h1.5A4.5 4.5 0 0123 19.5V21" />
    </Svg>
  );
}

function IconPayouts({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M12 3v13" />
      <path d="M7 11l5 5 5-5" />
      <path d="M5 21h14" />
    </Svg>
  );
}

function IconConnect({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </Svg>
  );
}

function IconDevelopers({ size = 16 }) {
  return (
    <Svg size={size}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </Svg>
  );
}

function IconIntegrations({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
    </Svg>
  );
}

// Top-bar icons — even thinner feel, very crisp
function IconMessage({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </Svg>
  );
}

function IconBell({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </Svg>
  );
}

function IconSettings({ size = 16 }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </Svg>
  );
}

// ── Nav definition ─────────────────────────────────────────────────────────────

const NAV = [
  { label: "Home",         Icon: IconHome,         active: true },
  { label: "Payments",     Icon: IconPayments },
  { label: "Customers",    Icon: IconCustomers },
  { label: "Payouts",      Icon: IconPayouts },
  { label: "Connect",      Icon: IconConnect },
  { label: "Developers",   Icon: IconDevelopers },
  { label: "Integrations", Icon: IconIntegrations },
];

// ── Sidebar ────────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <span className={styles.logoMark} />
        <span className={styles.logoText}>Praevor</span>
      </div>

      <nav className={styles.sidebarNav}>
        {NAV.map(({ label, Icon, active }) => (
          <button
            key={label}
            className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
          >
            <span className={styles.navItemIcon}>
              <Icon size={17} />
            </span>
            <span className={styles.navItemLabel}>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

// ── Search icon ────────────────────────────────────────────────────────────────

function IconSearch({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

// ── Top bar ────────────────────────────────────────────────────────────────────

function TopBar({ email }: { email: string }) {
  const localPart = email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim();
  const words = localPart.split(" ").filter(Boolean);
  const initials = words.slice(0, 2).map((w) => w[0].toUpperCase()).join("") || email[0].toUpperCase();
  const displayName = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || email;

  return (
    <header className={styles.topBar}>

      {/* LEFT — search bar */}
      <div className={styles.topBarLeft}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}><IconSearch size={14} /></span>
          <span className={styles.searchPlaceholder}>Search</span>
          <kbd className={styles.searchKbd}>⌘K</kbd>
        </div>
      </div>

      {/* RIGHT — icons + profile */}
      <div className={styles.topBarRight}>
        <div className={styles.topBarIcons}>
          <button className={styles.topBarIconBtn} aria-label="Messages">
            <IconMessage size={16} />
          </button>
          <button className={styles.topBarIconBtn} aria-label="Notifications">
            <IconBell size={16} />
          </button>
          <button className={styles.topBarIconBtn} aria-label="Settings">
            <IconSettings size={16} />
          </button>
        </div>

        <div className={styles.topBarDivider} />

        <form action={signOut}>
          <button type="submit" className={styles.userBlock}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{displayName}</span>
              <span className={styles.userOrg}>Praevor Ltd</span>
            </div>
            <div className={styles.userAvatar}>{initials}</div>
          </button>
        </form>
      </div>
    </header>
  );
}

// ── Relationship Manager Card ──────────────────────────────────────────────────

function RelationshipManagerCard() {
  return (
    <div className={styles.rmCard}>
      {/* Brown header */}
      <div className={styles.rmHeader}>
        <span className={styles.rmHeaderLogo}>Praevor</span>
      </div>

      {/* Avatar — overlaps header */}
      <div className={styles.rmAvatarWrap}>
        <img
          src="/pexels-rdne-7414009.jpg"
          alt="Charlotte Evans"
          className={styles.rmAvatar}
        />
      </div>

      {/* Body */}
      <div className={styles.rmBody}>
        <p className={styles.rmName}>Charlotte Evans</p>
        <p className={styles.rmTitle}>Your Relationship Manager</p>

        <button className={styles.rmBtn}>Contact Charlotte</button>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────

export function DashboardClient({ email }: { email: string }) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <TopBar email={email} />
        <div className={styles.canvas}>
          <div className={styles.canvasLayout}>
            <div className={styles.canvasMain} />
            <aside className={styles.canvasSidebar}>
              <RelationshipManagerCard />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
