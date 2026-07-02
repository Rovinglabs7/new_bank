"use client";

import { useState } from "react";
import { signOut } from "@/lib/actions/auth";
import styles from "./dashboard.module.css";

// ── Icons ─────────────────────────────────────────────────────────────────────

function Icon({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  home:        "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  activity:    "M22 12h-4l-3 9L9 3l-3 9H2",
  inbox:       "M22 12h-6l-2 3h-4l-2-3H2 M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z",
  collections: "M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  link:        "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  recurring:   "M17 1l4 4-4 4 M3 11V9a4 4 0 014-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 01-4 4H3",
  invoices:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  failed:      "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 8v4 M12 16h.01",
  mandates:    "M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  customers:   "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  subs:        "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
  orgs:        "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  automation:  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  nova:        "M12 2a10 10 0 110 20 10 10 0 010-20z M12 8v4l3 3",
  approvals:   "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  workflows:   "M5 3h14 M5 9h14 M5 15h10 M5 21h6",
  notifs:      "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  transactions:"M3 12h18 M3 6h18 M3 18h18",
  settlements: "M12 22V8 M5 12l7-10 7 10",
  payouts:     "M12 5v14 M5 12l7 7 7-7",
  balances:    "M21 12h-8 M21 6H8 M21 18h-8 M3 6v4c0 1.1.9 2 2 2h4",
  reports:     "M18 20V10 M12 20V4 M6 20v-6",
  recon:       "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  api:         "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  webhooks:    "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81a3 3 0 000-6 3 3 0 00-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9a3 3 0 000 6 3 3 0 002.96-2.54l7.14 4.16c-.05.21-.1.43-.1.66 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z",
  docs:        "M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z",
  sandbox:     "M12 2l10 6.5v7L12 22 2 15.5v-7z",
  team:        "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M9 7a4 4 0 100 8 4 4 0 000-8z",
  perms:       "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  audit:       "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M12 18v-6 M9 15h6",
  compliance:  "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  settings:    "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  search:      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  bell:        "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  help:        "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3 M12 17h.01",
  chevronDown: "M6 9l6 6 6-6",
  send:        "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
  arrowUp:     "M12 19V5 M5 12l7-7 7 7",
  arrowRight:  "M5 12h14 M12 5l7 7-7 7",
  plus:        "M12 5v14 M5 12h14",
  check:       "M20 6L9 17l-5-5",
  refresh:     "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  trendUp:     "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  inbox2:      "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
};

// ── Nav structure ──────────────────────────────────────────────────────────────

const NAV = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard",    icon: "home",        active: true },
      { label: "Activity",     icon: "activity"     },
      { label: "Inbox",        icon: "inbox" },
    ],
  },
  {
    group: "Payments",
    items: [
      { label: "Collections",       icon: "collections" },
      { label: "Payment Links",     icon: "link" },
      { label: "Recurring",         icon: "recurring" },
      { label: "Invoices",          icon: "invoices" },
      { label: "Failed Payments",   icon: "failed" },
      { label: "Mandates",          icon: "mandates" },
    ],
  },
  {
    group: "Customers",
    items: [
      { label: "Customers",      icon: "customers" },
      { label: "Subscriptions",  icon: "subs" },
      { label: "Organisations",  icon: "orgs" },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "Nova AI",      icon: "nova",      badge: "AI" },
      { label: "Automations",  icon: "automation" },
      { label: "Approvals",    icon: "approvals" },
      { label: "Workflows",    icon: "workflows" },
      { label: "Notifications",icon: "notifs" },
    ],
  },
  {
    group: "Financials",
    items: [
      { label: "Transactions",   icon: "transactions" },
      { label: "Settlements",    icon: "settlements" },
      { label: "Payouts",        icon: "payouts" },
      { label: "Balances",       icon: "balances" },
      { label: "Reports",        icon: "reports" },
      { label: "Reconciliation", icon: "recon" },
    ],
  },
  {
    group: "Developer",
    items: [
      { label: "API Keys",       icon: "api" },
      { label: "Webhooks",       icon: "webhooks" },
      { label: "Documentation",  icon: "docs" },
      { label: "Sandbox",        icon: "sandbox" },
    ],
  },
  {
    group: "Administration",
    items: [
      { label: "Team",        icon: "team" },
      { label: "Permissions", icon: "perms" },
      { label: "Audit Logs",  icon: "audit" },
      { label: "Compliance",  icon: "compliance" },
      { label: "Settings",    icon: "settings" },
    ],
  },
];

// ── Empty state component ──────────────────────────────────────────────────────

function EmptyState({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <Icon d={ICONS[icon as keyof typeof ICONS] ?? ICONS.activity} size={22} />
      </div>
      <p className={styles.emptyTitle}>{title}</p>
      <p className={styles.emptyBody}>{body}</p>
    </div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────────

function Sidebar({ collapsed, onToggle, email }: { collapsed: boolean; onToggle: () => void; email: string }) {
  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ""}`}>
      <div className={styles.sidebarLogo}>
        <span className={styles.logoMark} />
        {!collapsed && <span className={styles.logoText}>Praevor</span>}
        <button className={styles.collapseBtn} onClick={onToggle} aria-label="Toggle sidebar">
          <Icon d={ICONS.arrowRight} size={14} />
        </button>
      </div>

      {!collapsed && (
        <div className={styles.sidebarSearch}>
          <Icon d={ICONS.search} size={14} />
          <span className={styles.sidebarSearchPlaceholder}>Search…</span>
          <kbd className={styles.sidebarSearchKbd}>⌘K</kbd>
        </div>
      )}

      <nav className={styles.sidebarNav}>
        {NAV.map((section) => (
          <div key={section.group} className={styles.navGroup}>
            {!collapsed && (
              <span className={styles.navGroupLabel}>{section.group}</span>
            )}
            {section.items.map((item) => (
              <button
                key={item.label}
                className={`${styles.navItem} ${"active" in item && item.active ? styles.navItemActive : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <span className={styles.navItemIcon}>
                  <Icon d={ICONS[item.icon as keyof typeof ICONS] ?? ICONS.home} size={16} />
                </span>
                {!collapsed && (
                  <>
                    <span className={styles.navItemLabel}>{item.label}</span>
                    {"badge" in item && item.badge !== undefined && (
                      <span className={`${styles.navBadge} ${typeof item.badge === "string" ? styles.navBadgeAi : ""}`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        {!collapsed && (
          <div className={styles.sidebarUser}>
            <div className={styles.sidebarUserAvatar}>
              {email.charAt(0).toUpperCase()}
            </div>
            <div className={styles.sidebarUserInfo}>
              <span className={styles.sidebarUserEmail}>{email}</span>
              <span className={styles.sidebarUserPlan}>Pro plan</span>
            </div>
          </div>
        )}
        <form action={signOut}>
          <button type="submit" className={styles.signOutBtn} title="Sign out">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9" />
            </svg>
            {!collapsed && <span>Sign out</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}

// ── Top bar ────────────────────────────────────────────────────────────────────

function TopBar({ email }: { email: string }) {
  return (
    <header className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <span className={styles.topBarBreadcrumb}>Dashboard</span>
      </div>
      <div className={styles.topBarRight}>
        <div className={styles.topBarSearch}>
          <Icon d={ICONS.search} size={15} />
          <span>Search collections, customers…</span>
        </div>
        <button className={styles.topBarIcon} aria-label="Notifications">
          <Icon d={ICONS.bell} size={17} />
        </button>
        <button className={styles.topBarIcon} aria-label="Help">
          <Icon d={ICONS.help} size={17} />
        </button>
        <div className={styles.topBarOrg}>
          <span className={styles.topBarOrgDot} />
          <span>Praevor</span>
          <Icon d={ICONS.chevronDown} size={13} />
        </div>
      </div>
    </header>
  );
}

// ── KPI card ───────────────────────────────────────────────────────────────────

function KpiCard({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className={styles.kpiCard}>
      <span className={styles.kpiLabel}>{label}</span>
      <span className={`${styles.kpiValue} ${styles.kpiValueEmpty}`}>—</span>
      {sub && <span className={styles.kpiSub}>{sub}</span>}
    </div>
  );
}

// ── Nova input ─────────────────────────────────────────────────────────────────

function NovaInput() {
  const [query, setQuery] = useState("");
  return (
    <div className={styles.novaInputWrap}>
      <input
        className={styles.novaInput}
        placeholder="Ask Nova anything about your payments, customers or settlements…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.novaSend} aria-label="Send">
        <Icon d={ICONS.send} size={14} />
      </button>
    </div>
  );
}

// ── Main dashboard ─────────────────────────────────────────────────────────────

export function DashboardClient({ email }: { email: string }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={styles.shell}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
        email={email}
      />

      <div className={styles.main}>
        <TopBar email={email} />

        <div className={styles.content}>

          {/* Hero */}
          <section className={styles.hero}>
            <div className={styles.heroLeft}>
              <p className={styles.heroEyebrow}>Total Collections</p>
              <h1 className={styles.heroAmountEmpty}>No collections yet</h1>
              <p className={styles.heroEmptyHint}>
                Once your business starts collecting payments, your totals will appear here.
              </p>
            </div>
            <div className={styles.heroActions}>
              <p className={styles.heroActionsLabel}>Quick actions</p>
              <div className={styles.heroActionGrid}>
                {[
                  { label: "Collect Payment",     icon: "collections" },
                  { label: "Create Payment Link",  icon: "link" },
                  { label: "Bank Authorisation",   icon: "mandates" },
                  { label: "Create Subscription",  icon: "recurring" },
                  { label: "Invite Team Member",   icon: "team" },
                ].map((a) => (
                  <button key={a.label} className={styles.heroAction}>
                    <Icon d={ICONS[a.icon as keyof typeof ICONS] ?? ICONS.plus} size={15} />
                    <span>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* KPI row */}
          <section className={styles.kpiRow}>
            <KpiCard label="Collections Today"   sub="Waiting for first payment" />
            <KpiCard label="Recurring Revenue"   sub="Set up a subscription to track" />
            <KpiCard label="Settlement Balance"  sub="Settlements appear after collection" />
            <KpiCard label="Success Rate"        sub="Calculated after first payment" />
            <KpiCard label="Avg Collection Time" sub="Tracked from your first collection" />
            <KpiCard label="Failed Payments"     sub="Nothing to recover right now" />
          </section>

          {/* Row 2: Collections table + Settlement overview */}
          <div className={styles.row2}>
            <div className={`${styles.card} ${styles.collectionsCard}`}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle}>Recent Collections</h2>
                  <p className={styles.cardSub}>Your latest collections will appear here</p>
                </div>
                <button className={styles.cardAction}>View all</button>
              </div>
              <EmptyState
                icon="collections"
                title="No collections yet."
                body="Once your business starts collecting payments they'll appear here."
              />
            </div>

            <div className={`${styles.card} ${styles.settlementCard}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Settlement Overview</h2>
              </div>
              <EmptyState
                icon="settlements"
                title="No settlements yet."
                body="Settlements will appear after your first successful payment."
              />
            </div>
          </div>

          {/* Row 3: Nova AI */}
          <div className={`${styles.card} ${styles.novaCard}`}>
            <div className={styles.novaCardInner}>
              <div className={styles.novaCardLeft}>
                <div className={styles.novaAvatarWrap}>
                  <img src="/nova-avatar.jpg" alt="Nova" className={styles.novaAvatar} />
                  <span className={styles.novaOnlineDot} />
                </div>
                <div>
                  <h2 className={styles.novaTitle}>Nova <span className={styles.novaAiBadge}>AI</span></h2>
                  <p className={styles.novaSub}>Your AI payment operations assistant</p>
                </div>
              </div>
              <div className={styles.novaCardRight}>
                <p className={styles.novaWelcome}>How can I help today?</p>
                <NovaInput />
              </div>
            </div>
          </div>

          {/* Row 4: Upcoming + Failed */}
          <div className={styles.row4}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle}>Upcoming Collections</h2>
                  <p className={styles.cardSub}>Next 7 days</p>
                </div>
                <button className={styles.cardAction}>View calendar</button>
              </div>
              <EmptyState
                icon="recurring"
                title="No upcoming collections."
                body="Create your first recurring payment or mandate to schedule collections."
              />
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle}>Failed Payments</h2>
                  <p className={styles.cardSub}>Recovery recommendations</p>
                </div>
              </div>
              <EmptyState
                icon="check"
                title="No failed payments."
                body="Any collections that fail will appear here with recovery options."
              />
            </div>
          </div>

          {/* Row 5: Activity feed */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.cardTitle}>Activity</h2>
                <p className={styles.cardSub}>Everything happening in your workspace</p>
              </div>
              <button className={styles.cardAction}>View all</button>
            </div>
            <EmptyState
              icon="activity"
              title="Nothing to show."
              body="Your latest account activity will appear here."
            />
          </div>

        </div>
      </div>
    </div>
  );
}
