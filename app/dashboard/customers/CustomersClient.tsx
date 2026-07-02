"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth";
import styles from "./customers.module.css";
import dashStyles from "../dashboard.module.css";
import { SettingsModal } from "../SettingsModal";

// ── SVG primitive ─────────────────────────────────────────────────────────────

function Svg({ children, size = 16 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const Icon = {
  Home:         (s=16) => <Svg size={s}><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></Svg>,
  Payments:     (s=16) => <Svg size={s}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></Svg>,
  Customers:    (s=16) => <Svg size={s}><circle cx="8" cy="7" r="3.5"/><path d="M2 21v-1.5A4.5 4.5 0 016.5 15h3A4.5 4.5 0 0114 19.5V21"/><path d="M15 5.5a3.5 3.5 0 110 7"/><path d="M17 15h1.5A4.5 4.5 0 0123 19.5V21"/></Svg>,
  Payouts:      (s=16) => <Svg size={s}><path d="M12 3v13"/><path d="M7 11l5 5 5-5"/><path d="M5 21h14"/></Svg>,
  Connect:      (s=16) => <Svg size={s}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></Svg>,
  Developers:   (s=16) => <Svg size={s}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></Svg>,
  Integrations: (s=16) => <Svg size={s}><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></Svg>,
  Message:      (s=16) => <Svg size={s}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></Svg>,
  Bell:         (s=16) => <Svg size={s}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></Svg>,
  Settings:     (s=16) => <Svg size={s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></Svg>,
  Search:       (s=15) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  Plus:         (s=15) => <Svg size={s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>,
  Filter:       (s=14) => <Svg size={s}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Svg>,
  Download:     (s=14) => <Svg size={s}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Svg>,
  MoreHoriz:    (s=15) => <Svg size={s}><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/></Svg>,
  Eye:          (s=14) => <Svg size={s}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Svg>,
  CreditCard:   (s=14) => <Svg size={s}><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></Svg>,
  Link:         (s=14) => <Svg size={s}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></Svg>,
  Repeat:       (s=14) => <Svg size={s}><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></Svg>,
  Edit:         (s=14) => <Svg size={s}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></Svg>,
  Pause:        (s=14) => <Svg size={s}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></Svg>,
  Trash:        (s=14) => <Svg size={s}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></Svg>,
  Upload:       (s=14) => <Svg size={s}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></Svg>,
  ChevronRight: (s=14) => <Svg size={s}><polyline points="9 18 15 12 9 6"/></Svg>,
};

// ── Nav definition ────────────────────────────────────────────────────────────

const NAV = [
  { label: "Home",         icon: Icon.Home,         route: "/dashboard" },
  { label: "Payments",     icon: Icon.Payments,     route: "/dashboard/payments" },
  { label: "Customers",    icon: Icon.Customers,    route: "/dashboard/customers", active: true },
  { label: "Payouts",      icon: Icon.Payouts,      route: "/dashboard/payouts" },
  { label: "Connect",      icon: Icon.Connect,      route: "/dashboard/connect" },
  { label: "Developers",   icon: Icon.Developers,   route: "/dashboard/developers" },
  { label: "Integrations", icon: Icon.Integrations, route: "/dashboard/integrations" },
];

// ── Mock customer data ─────────────────────────────────────────────────────────

type CustomerStatus = "Active" | "Pending" | "Invited" | "Paused" | "Archived";

interface Customer {
  id: string;
  name: string;
  email: string;
  status: CustomerStatus;
  method: string;
  subs: number;
  lastPayment: string;
  lastAmount: number | null;
  collected: number;
  added: string;
}

const MOCK_CUSTOMERS: Customer[] = [];

const FILTER_OPTIONS: { label: string; key: CustomerStatus | "All" }[] = [
  { label: "All",      key: "All" },
  { label: "Active",   key: "Active" },
  { label: "Pending",  key: "Pending" },
  { label: "Invited",  key: "Invited" },
  { label: "Paused",   key: "Paused" },
  { label: "Archived", key: "Archived" },
];

function fmt(n: number) {
  return "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({ email, onNovaClick }: { email: string; onNovaClick: () => void }) {
  const router = useRouter();
  const localPart = email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim();
  const words = localPart.split(" ").filter(Boolean);
  const initials = words.slice(0, 2).map((w) => w[0].toUpperCase()).join("") || email[0].toUpperCase();

  return (
    <aside className={dashStyles.sidebar}>
      <div className={dashStyles.sidebarLogo}>
        <span className={dashStyles.logoMark} />
        <span className={dashStyles.logoText}>Praevor</span>
      </div>

      <nav className={dashStyles.sidebarNav}>
        {NAV.map(({ label, icon, route, active }) => (
          <button
            key={label}
            className={`${dashStyles.navItem} ${active ? dashStyles.navItemActive : ""}`}
            onClick={() => !active && router.push(route)}
          >
            <span className={dashStyles.navItemIcon}>{icon(17)}</span>
            <span className={dashStyles.navItemLabel}>{label}</span>
          </button>
        ))}
      </nav>

      <div className={dashStyles.sidebarBottom}>
        <div className={dashStyles.novaCard} onClick={onNovaClick} role="button" tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onNovaClick()}>
          <div className={dashStyles.novaCardProfile}>
            <img src="/nova-avatar.jpg" alt="Nova" className={dashStyles.novaCardAvatar} />
            <div className={dashStyles.novaCardInfo}>
              <span className={dashStyles.novaCardName}>Nova</span>
              <span className={dashStyles.novaCardSub}>Your AI Payment Operations Partner</span>
              <span className={dashStyles.novaCardStatus}>
                <span className={dashStyles.novaStatusDot} />
                Online
              </span>
            </div>
          </div>
          <p className={dashStyles.novaCardBody}>
            Helping you collect payments, resolve issues and keep your operations running smoothly.
          </p>
          <button className={dashStyles.novaCardCta} onClick={(e) => { e.stopPropagation(); onNovaClick(); }}>
            Ask Nova
            <span className={dashStyles.novaCtaArrow}>→</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

// ── TopBar ────────────────────────────────────────────────────────────────────

function TopBar({ email, onSettingsOpen }: { email: string; onSettingsOpen: () => void }) {
  const localPart = email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim();
  const words = localPart.split(" ").filter(Boolean);
  const initials = words.slice(0, 2).map((w) => w[0].toUpperCase()).join("") || email[0].toUpperCase();
  const displayName = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || email;

  return (
    <header className={dashStyles.topBar}>
      <div className={dashStyles.topBarLeft}>
        <div className={dashStyles.searchBar}>
          <span className={dashStyles.searchIcon}>{Icon.Search(14)}</span>
          <span className={dashStyles.searchPlaceholder}>Search</span>
          <kbd className={dashStyles.searchKbd}>⌘K</kbd>
        </div>
      </div>
      <div className={dashStyles.topBarRight}>
        <div className={dashStyles.topBarIcons}>
          <button className={dashStyles.topBarIconBtn} aria-label="Messages">{Icon.Message(16)}</button>
          <button className={dashStyles.topBarIconBtn} aria-label="Notifications">{Icon.Bell(16)}</button>
          <button className={dashStyles.topBarIconBtn} aria-label="Settings" onClick={onSettingsOpen}>{Icon.Settings(16)}</button>
        </div>
        <div className={dashStyles.topBarDivider} />
        <form action={signOut}>
          <button type="submit" className={dashStyles.userBlock}>
            <div className={dashStyles.userInfo}>
              <span className={dashStyles.userName}>{displayName}</span>
              <span className={dashStyles.userOrg}>Praevor Ltd</span>
            </div>
            <div className={dashStyles.userAvatar}>{initials}</div>
          </button>
        </form>
      </div>
    </header>
  );
}

// ── Insight cards ─────────────────────────────────────────────────────────────

function InsightCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className={styles.insightCard}>
      <p className={styles.insightLabel}>{label}</p>
      <p className={styles.insightValue}>{value}</p>
      {sub && <p className={styles.insightSub}>{sub}</p>}
    </div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────

const STATUS_COLOR: Record<CustomerStatus, string> = {
  Active:   styles.statusActive   ?? "statusActive",
  Pending:  styles.statusPending  ?? "statusPending",
  Invited:  styles.statusInvited  ?? "statusInvited",
  Paused:   styles.statusPaused   ?? "statusPaused",
  Archived: styles.statusArchived ?? "statusArchived",
};

function StatusBadge({ status }: { status: CustomerStatus }) {
  return (
    <span className={`${styles.statusBadge} ${styles[`status${status}`]}`}>
      {status}
    </span>
  );
}

// ── Row action menu ───────────────────────────────────────────────────────────

const ROW_ACTIONS = [
  { label: "View customer",       icon: Icon.Eye },
  { label: "Collect payment",     icon: Icon.CreditCard },
  { label: "Create payment link", icon: Icon.Link },
  { label: "Create subscription", icon: Icon.Repeat },
  { label: "Edit customer",       icon: Icon.Edit },
  { label: "Pause payments",      icon: Icon.Pause },
  { label: "Delete customer",     icon: Icon.Trash, danger: true },
];

function ActionMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div className={styles.actionMenu} ref={ref}>
      {ROW_ACTIONS.map(({ label, icon, danger }) => (
        <button
          key={label}
          className={`${styles.actionMenuItem} ${danger ? styles.actionMenuItemDanger : ""}`}
          onClick={onClose}
        >
          <span className={styles.actionMenuIcon}>{icon(14)}</span>
          {label}
        </button>
      ))}
    </div>
  );
}

// ── Customer row ──────────────────────────────────────────────────────────────

function CustomerRow({ customer }: { customer: Customer }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = customer.name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

  return (
    <div className={styles.tableRow}>
      <div className={`${styles.td} ${styles.tdCustomer}`}>
        <div className={styles.customerAvatar}>{initials}</div>
        <div className={styles.customerMeta}>
          <span className={styles.customerName}>{customer.name}</span>
          <span className={styles.customerEmail}>{customer.email}</span>
        </div>
      </div>
      <div className={styles.td}>
        <StatusBadge status={customer.status} />
      </div>
      <div className={`${styles.td} ${styles.tdMono}`}>
        {customer.method}
      </div>
      <div className={`${styles.td} ${styles.tdCenter}`}>
        {customer.subs > 0 ? (
          <span className={styles.subCount}>{customer.subs}</span>
        ) : (
          <span className={styles.tdMuted}>—</span>
        )}
      </div>
      <div className={styles.td}>
        <div className={styles.lastPaymentCell}>
          <span className={styles.tdText}>{customer.lastPayment}</span>
          {customer.lastAmount !== null && (
            <span className={styles.lastAmount}>{fmt(customer.lastAmount)}</span>
          )}
        </div>
      </div>
      <div className={`${styles.td} ${styles.tdMono} ${styles.tdRight}`}>
        {customer.collected > 0 ? fmt(customer.collected) : <span className={styles.tdMuted}>—</span>}
      </div>
      <div className={`${styles.td} ${styles.tdMuted}`}>
        {customer.added}
      </div>
      <div className={`${styles.td} ${styles.tdActions}`}>
        <div className={styles.actionWrap}>
          <button
            className={styles.moreBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="More actions"
          >
            {Icon.MoreHoriz(15)}
          </button>
          {menuOpen && <ActionMenu onClose={() => setMenuOpen(false)} />}
        </div>
      </div>
    </div>
  );
}

// ── Empty state illustration ──────────────────────────────────────────────────

function CustomerIllustration() {
  return (
    <svg width="148" height="124" viewBox="0 0 148 124" fill="none" aria-hidden className={styles.emptyIlluSvg}>
      {/* Card 1 — back left */}
      <rect x="4" y="22" width="80" height="92" rx="14" fill="#f3ede6" stroke="#e4d9cc" strokeWidth="1.2"/>
      {/* Card 2 — back right */}
      <rect x="64" y="14" width="80" height="92" rx="14" fill="#ede5d8" stroke="#ddd0be" strokeWidth="1.2"/>
      {/* Card 3 — front center */}
      <rect x="34" y="6" width="80" height="98" rx="14" fill="#ffffff" stroke="#e0d4c4" strokeWidth="1.5"/>
      {/* Avatar circle */}
      <circle cx="74" cy="38" r="18" fill="#f3ede6"/>
      <circle cx="74" cy="33" r="8" fill="#c8a882"/>
      <path d="M56 52a18 18 0 0136 0" fill="#c8a882"/>
      {/* Name line */}
      <rect x="50" y="68" width="48" height="5.5" rx="2.75" fill="#e0d4c4"/>
      {/* Email line */}
      <rect x="57" y="79" width="34" height="4" rx="2" fill="#ede5d8"/>
      {/* Divider */}
      <line x1="50" y1="91" x2="98" y2="91" stroke="#f0e8dc" strokeWidth="1"/>
      {/* Payment line */}
      <rect x="50" y="96" width="22" height="4" rx="2" fill="#c8a882" opacity="0.5"/>
    </svg>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIllu}>
        <CustomerIllustration />
      </div>
      <h2 className={styles.emptyHeading}>Add your first customer</h2>
      <p className={styles.emptyBody}>
        Customers are the people you collect payments from. Once added, you can send
        payment links, collect recurring payments and track every transaction from one place.
      </p>
      <div className={styles.emptyActions}>
        <button className={styles.btnPrimary}>
          <span className={styles.btnIcon}>{Icon.Plus(14)}</span>
          Add customer
        </button>
        <button className={styles.btnGhost}>
          <span className={styles.btnIcon}>{Icon.Upload(14)}</span>
          Import customers
        </button>
      </div>
    </div>
  );
}

// ── Customer table ────────────────────────────────────────────────────────────

function CustomerTable({ customers }: { customers: Customer[] }) {
  return (
    <div className={styles.tableWrap}>
      {/* Table header */}
      <div className={styles.tableHead}>
        <div className={`${styles.th} ${styles.tdCustomer}`}>Customer</div>
        <div className={styles.th}>Status</div>
        <div className={styles.th}>Method</div>
        <div className={`${styles.th} ${styles.tdCenter}`}>Subscriptions</div>
        <div className={styles.th}>Last payment</div>
        <div className={`${styles.th} ${styles.tdRight}`}>Collected</div>
        <div className={styles.th}>Date added</div>
        <div className={`${styles.th} ${styles.tdActions}`} />
      </div>

      {/* Rows */}
      <div className={styles.tableBody}>
        {customers.map((c) => <CustomerRow key={c.id} customer={c} />)}
      </div>
    </div>
  );
}

// ── Main page content ─────────────────────────────────────────────────────────

function CustomersContent() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | CustomerStatus>("All");
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);

  const filtered = customers.filter((c) => {
    const matchesFilter = activeFilter === "All" || c.status === activeFilter;
    const matchesSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  function countFor(key: "All" | CustomerStatus) {
    if (key === "All") return customers.length;
    return customers.filter((c) => c.status === key).length;
  }

  const totalCollected = customers.reduce((s, c) => s + c.collected, 0);
  const activeCount = customers.filter(c => c.status === "Active").length;
  const totalSubs = customers.reduce((s, c) => s + c.subs, 0);

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Customers</h1>
          <p className={styles.pageDesc}>Manage everyone you collect payments from in one place.</p>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlsLeft}>
          <div className={`${styles.searchField} ${search ? styles.searchFieldActive : ""}`}>
            <span className={styles.searchIcon}>{Icon.Search(14)}</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.controlsRight}>
          <button className={styles.btnSecondary}>
            <span className={styles.btnIcon}>{Icon.Filter(14)}</span>
            Filter
          </button>
          <button className={styles.btnSecondary}>
            <span className={styles.btnIcon}>{Icon.Download(14)}</span>
            Export
          </button>
          <button className={styles.btnPrimary}>
            <span className={styles.btnIcon}>{Icon.Plus(14)}</span>
            Add customer
          </button>
        </div>
      </div>

      {/* Filter pills */}
      <div className={styles.filterRow}>
        {FILTER_OPTIONS.map(({ label, key }) => (
          <button
            key={key}
            className={`${styles.filterPill} ${activeFilter === key ? styles.filterPillActive : ""}`}
            onClick={() => setActiveFilter(key)}
          >
            {label}
            <span className={`${styles.filterCount} ${activeFilter === key ? styles.filterCountActive : ""}`}>
              {countFor(key)}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.divider} />

      {/* Insight cards */}
      {customers.length > 0 && (
        <div className={styles.insightGrid}>
          <InsightCard label="Total Customers"   value={customers.length.toString()}        sub="all time" />
          <InsightCard label="Active Mandates"   value={activeCount.toString()}             sub="collecting" />
          <InsightCard label="Subscriptions"     value={totalSubs.toString()}               sub="recurring" />
          <InsightCard label="Total Collected"   value={fmt(totalCollected).split(".")[0]}  sub="lifetime" />
        </div>
      )}

      {/* Content: empty or table */}
      {filtered.length === 0 && !search ? (
        <EmptyState />
      ) : filtered.length === 0 ? (
        <div className={styles.noResults}>
          <p className={styles.noResultsText}>No customers match <strong>{search}</strong></p>
          <button className={styles.btnGhost} onClick={() => setSearch("")}>Clear search</button>
        </div>
      ) : (
        <CustomerTable customers={filtered} />
      )}
    </div>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────

export function CustomersClient({ email }: { email: string }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className={dashStyles.shell}>
      <Sidebar email={email} onNovaClick={() => router.push("/dashboard/nova")} />
      <div className={dashStyles.main}>
        <TopBar email={email} onSettingsOpen={() => setSettingsOpen(true)} />
        <CustomersContent />
      </div>
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} email={email} />
    </div>
  );
}
