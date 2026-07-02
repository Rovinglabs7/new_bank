"use client";

import { useState, useEffect } from "react";
import styles from "./settings.module.css";

// ── SVG primitive ─────────────────────────────────────────────────────────────

function Svg({ children, size = 15 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  );
}

const I = {
  User:         (s=15) => <Svg size={s}><circle cx="12" cy="8" r="4"/><path d="M4 20v-1a8 8 0 0116 0v1"/></Svg>,
  Lock:         (s=15) => <Svg size={s}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></Svg>,
  Bell:         (s=15) => <Svg size={s}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></Svg>,
  Sun:          (s=15) => <Svg size={s}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></Svg>,
  A11y:         (s=15) => <Svg size={s}><circle cx="12" cy="4" r="2"/><path d="M4 8h16M12 10v11M8 21l4-11 4 11"/></Svg>,
  Building:     (s=15) => <Svg size={s}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></Svg>,
  Shield:       (s=15) => <Svg size={s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></Svg>,
  Users:        (s=15) => <Svg size={s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></Svg>,
  Sliders:      (s=15) => <Svg size={s}><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></Svg>,
  Check2:       (s=15) => <Svg size={s}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></Svg>,
  Bank:         (s=15) => <Svg size={s}><rect x="3" y="10" width="18" height="11" rx="1"/><path d="M3 10l9-7 9 7"/><line x1="12" y1="10" x2="12" y2="21"/><line x1="3" y1="15" x2="21" y2="15"/></Svg>,
  CreditCard:   (s=15) => <Svg size={s}><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></Svg>,
  RefreshCw:    (s=15) => <Svg size={s}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></Svg>,
  Code:         (s=15) => <Svg size={s}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></Svg>,
  Webhook:      (s=15) => <Svg size={s}><path d="M18 16.016a3 3 0 11-4.93.984l-3.07-5.3A3 3 0 117 8.984l3.07 5.3a3 3 0 011.93.73"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="6" cy="18" r="3"/></Svg>,
  Box:          (s=15) => <Svg size={s}><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></Svg>,
  DollarSign:   (s=15) => <Svg size={s}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></Svg>,
  FileText:     (s=15) => <Svg size={s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></Svg>,
  BarChart:     (s=15) => <Svg size={s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Svg>,
  LifeBuoy:     (s=15) => <Svg size={s}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></Svg>,
  Headphones:   (s=15) => <Svg size={s}><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z"/><path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z"/></Svg>,
  Scale:        (s=15) => <Svg size={s}><line x1="12" y1="3" x2="12" y2="21"/><path d="M3 6h18M3 18h18"/><path d="M5 6L3 12l2 6M19 6l2 6-2 6"/></Svg>,
  Eye:          (s=15) => <Svg size={s}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Svg>,
  EyeOff:       (s=15) => <Svg size={s}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></Svg>,
  Copy:         (s=15) => <Svg size={s}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></Svg>,
  Check:        (s=15) => <Svg size={s}><polyline points="20 6 9 17 4 12"/></Svg>,
  Download:     (s=15) => <Svg size={s}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Svg>,
  Trash:        (s=15) => <Svg size={s}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></Svg>,
  X:            (s=15) => <Svg size={s}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>,
  Chevron:      (s=14) => <Svg size={s}><polyline points="9 18 15 12 9 6"/></Svg>,
  Plus:         (s=15) => <Svg size={s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>,
  Globe:        (s=15) => <Svg size={s}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></Svg>,
  Palette:      (s=15) => <Svg size={s}><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none"/></Svg>,
  ExternalLink: (s=13) => <Svg size={s}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Svg>,
};

// ── Nav structure ─────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    section: "PERSONAL",
    items: [
      { id: "profile",       label: "Profile",       icon: I.User },
      { id: "security",      label: "Security",      icon: I.Lock },
      { id: "notifications", label: "Notifications", icon: I.Bell },
      { id: "appearance",    label: "Appearance",    icon: I.Sun },
      { id: "accessibility", label: "Accessibility", icon: I.A11y },
    ],
  },
  {
    section: "BUSINESS",
    items: [
      { id: "company-profile", label: "Company Profile",      icon: I.Building },
      { id: "verification",    label: "Business Verification", icon: I.Shield },
      { id: "branding",        label: "Branding",             icon: I.Palette },
    ],
  },
  {
    section: "TEAM",
    items: [
      { id: "team",      label: "Team Members",        icon: I.Users },
      { id: "roles",     label: "Roles & Permissions", icon: I.Sliders },
      { id: "approvals", label: "Approval Workflows",  icon: I.Check2 },
    ],
  },
  {
    section: "PAYMENTS",
    items: [
      { id: "bank-accounts",   label: "Bank Accounts",         icon: I.Bank },
      { id: "payment-methods", label: "Payment Methods",       icon: I.CreditCard },
      { id: "settlement",      label: "Settlement Preferences", icon: I.RefreshCw },
    ],
  },
  {
    section: "DEVELOPERS",
    items: [
      { id: "api-keys",   label: "API Keys",         icon: I.Code },
      { id: "webhooks",   label: "Webhooks",         icon: I.Webhook },
      { id: "oauth-apps", label: "OAuth Applications", icon: I.Box },
    ],
  },
  {
    section: "BILLING",
    items: [
      { id: "billing",  label: "Plan & Billing", icon: I.DollarSign },
      { id: "invoices", label: "Invoices",       icon: I.FileText },
      { id: "usage",    label: "Usage",          icon: I.BarChart },
    ],
  },
  {
    section: "SUPPORT",
    items: [
      { id: "help-centre",    label: "Help Centre",    icon: I.LifeBuoy },
      { id: "support-tickets", label: "Contact Support", icon: I.Headphones },
      { id: "legal",          label: "Legal",          icon: I.Scale },
      { id: "privacy",        label: "Privacy",        icon: I.Shield },
    ],
  },
];

// ── Shared UI primitives ──────────────────────────────────────────────────────

function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.pageHeader}>
      <h2 className={styles.pageTitle}>{title}</h2>
      <p className={styles.pageDesc}>{description}</p>
    </div>
  );
}

function Card({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className={styles.card}>
      {label && <p className={styles.cardLabel}>{label}</p>}
      <div className={styles.cardRows}>{children}</div>
    </div>
  );
}

// Every setting row is a clickable button. No inline action pills.
function Row({
  label,
  value,
  empty,
  description,
  noBorder,
  danger,
  toggle,
  noChevron,
}: {
  label: string;
  value?: string;
  empty?: string;
  description?: string;
  noBorder?: boolean;
  danger?: boolean;
  toggle?: React.ReactNode;
  noChevron?: boolean;
}) {
  if (toggle) {
    return (
      <div className={`${styles.row} ${styles.rowStatic} ${noBorder ? styles.rowNoBorder : ""}`}>
        <div className={styles.rowLeft}>
          <span className={styles.rowLabel}>{label}</span>
          {description && <span className={styles.rowDesc}>{description}</span>}
        </div>
        <div className={styles.rowRight}>{toggle}</div>
      </div>
    );
  }

  return (
    <button className={`${styles.row} ${styles.rowBtn} ${danger ? styles.rowDanger : ""} ${noBorder ? styles.rowNoBorder : ""}`}>
      <div className={styles.rowLeft}>
        <span className={`${styles.rowLabel} ${danger ? styles.rowLabelDanger : ""}`}>{label}</span>
        {description && <span className={styles.rowDesc}>{description}</span>}
      </div>
      <div className={styles.rowRight}>
        {value && <span className={styles.rowValue}>{value}</span>}
        {empty && <span className={styles.rowEmpty}>{empty}</span>}
        {!noChevron && <span className={styles.rowChevron}>{I.Chevron(14)}</span>}
      </div>
    </button>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button role="switch" aria-checked={checked}
      className={`${styles.toggle} ${checked ? styles.toggleOn : ""}`}
      onClick={() => onChange(!checked)}>
      <span className={styles.toggleThumb} />
    </button>
  );
}

function Badge({ label, color = "grey" }: { label: string; color?: "green" | "amber" | "grey" | "blue" }) {
  return <span className={`${styles.badge} ${styles[`badge${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>{label}</span>;
}

function SectionDivider() {
  return <div className={styles.sectionDivider} />;
}

// ── Page components ───────────────────────────────────────────────────────────

function ProfilePage({ email }: { email: string }) {
  const localPart = email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim();
  const words = localPart.split(" ").filter(Boolean);
  const displayName = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || email;
  const initials = words.slice(0, 2).map((w) => w[0].toUpperCase()).join("") || email[0].toUpperCase();

  return (
    <div className={styles.pageContent}>
      <PageHeader title="Profile" description="Manage your personal information and account details." />

      {/* Identity block */}
      <div className={styles.identityBlock}>
        <div className={styles.identityAvatar}>{initials}</div>
        <div className={styles.identityInfo}>
          <p className={styles.identityName}>{displayName}</p>
          <p className={styles.identityEmail}>{email}</p>
          <p className={styles.identityRole}>Account Owner · Praevor Ltd</p>
        </div>
        <button className={styles.textBtn}>Change photo</button>
      </div>

      <SectionDivider />

      <Card label="Personal Information">
        <Row label="Full name"     value={displayName} />
        <Row label="Email address" value={email} />
        <Row label="Job title"     value="Account Owner" />
        <Row label="Phone number"  empty="Not added" noBorder />
      </Card>

      <Card label="Localisation">
        <Row label="Language"  value="English (United Kingdom)" />
        <Row label="Time zone" value="London (GMT+0)" noBorder />
      </Card>
    </div>
  );
}

function SecurityPage() {
  return (
    <div className={styles.pageContent}>
      <PageHeader title="Security" description="Manage authentication and keep your account protected." />

      <Card label="Sign-in">
        <Row label="Password" description="Last changed more than 90 days ago." value="Update password" />
        <Row label="Two-factor authentication" description="Add an extra layer of security to your account." value="Not enabled" noBorder />
      </Card>

      <Card label="Passwordless">
        <Row label="Passkeys" description="Sign in with Face ID, Touch ID or a hardware key." empty="No passkeys added" noBorder />
      </Card>

      <Card label="Active Sessions">
        {[
          { device: "MacBook Pro · Chrome", location: "London, UK", time: "Active now", current: true },
          { device: "iPhone 15 · Safari",   location: "London, UK", time: "2 hours ago",  current: false },
          { device: "iPad · Safari",        location: "Manchester, UK", time: "3 days ago", current: false },
        ].map((s, i, arr) => (
          <div key={s.device} className={`${styles.sessionRow} ${i < arr.length - 1 ? styles.sessionRowBorder : ""}`}>
            <div className={styles.sessionLeft}>
              <p className={styles.sessionDevice}>{s.device}</p>
              <p className={styles.sessionMeta}>{s.location} · {s.time}</p>
            </div>
            {s.current
              ? <Badge label="This device" color="green" />
              : <button className={styles.revokeBtn}>Revoke</button>
            }
          </div>
        ))}
      </Card>
    </div>
  );
}

function NotificationsPage() {
  const [prefs, setPrefs] = useState({
    paymentReceived: true, paymentFailed: true, customerSignup: false,
    weeklyReport: true, inAppPayments: true, inAppTeam: true, marketing: false,
  });
  const set = (k: keyof typeof prefs) => (v: boolean) => setPrefs(p => ({ ...p, [k]: v }));

  return (
    <div className={styles.pageContent}>
      <PageHeader title="Notifications" description="Choose what Praevor sends you and when." />

      <Card label="Email">
        <Row label="Payment received"   description="Alert when a payment is successfully collected." toggle={<Toggle checked={prefs.paymentReceived} onChange={set("paymentReceived")} />} />
        <Row label="Payment failed"     description="Alert when a direct debit or collection fails."  toggle={<Toggle checked={prefs.paymentFailed}   onChange={set("paymentFailed")} />} />
        <Row label="New customer"       description="When a customer completes your payment setup."   toggle={<Toggle checked={prefs.customerSignup}  onChange={set("customerSignup")} />} />
        <Row label="Weekly summary"     description="A digest of payments and activity each week."    toggle={<Toggle checked={prefs.weeklyReport}    onChange={set("weeklyReport")} />} noBorder />
      </Card>

      <Card label="In-App">
        <Row label="Payment activity" toggle={<Toggle checked={prefs.inAppPayments} onChange={set("inAppPayments")} />} />
        <Row label="Team activity"    toggle={<Toggle checked={prefs.inAppTeam}     onChange={set("inAppTeam")} />} noBorder />
      </Card>

      <Card label="Marketing">
        <Row label="Product updates" description="Occasional emails about new Praevor features." toggle={<Toggle checked={prefs.marketing} onChange={set("marketing")} />} noBorder />
      </Card>
    </div>
  );
}

function AppearancePage() {
  const [theme, setTheme]     = useState<"light"|"dark"|"system">("system");
  const [density, setDensity] = useState<"comfortable"|"compact">("comfortable");

  return (
    <div className={styles.pageContent}>
      <PageHeader title="Appearance" description="Personalise how Praevor looks for you." />

      <Card label="Theme">
        <div className={styles.themeGrid}>
          {(["light","dark","system"] as const).map(t => (
            <button key={t} className={`${styles.themeOption} ${theme===t ? styles.themeOptionActive : ""}`} onClick={() => setTheme(t)}>
              <div className={`${styles.themePreview} ${styles[`themePreview${t.charAt(0).toUpperCase()+t.slice(1)}`]}`} />
              <span className={styles.themeLabel}>{t.charAt(0).toUpperCase()+t.slice(1)}</span>
              {theme===t && <span className={styles.themeCheck}>{I.Check(11)}</span>}
            </button>
          ))}
        </div>
      </Card>

      <Card label="Density">
        {(["comfortable","compact"] as const).map((d,i,arr) => (
          <button key={d} className={`${styles.densityRow} ${density===d ? styles.densityRowActive : ""} ${i<arr.length-1?styles.densityRowBorder:""}`} onClick={() => setDensity(d)}>
            <span className={`${styles.densityRadio} ${density===d ? styles.densityRadioOn : ""}`}>
              {density===d && <span className={styles.densityDot} />}
            </span>
            <div>
              <p className={styles.densityLabel}>{d.charAt(0).toUpperCase()+d.slice(1)}</p>
              <p className={styles.densityDesc}>{d==="comfortable" ? "More space between elements." : "Compact layout for more content."}</p>
            </div>
          </button>
        ))}
      </Card>
    </div>
  );
}

function TeamPage() {
  const members = [
    { name: "Daniel Bamidele", email: "danielbamidele042@gmail.com", role: "Owner",           lastActive: "Now" },
    { name: "Charlotte Evans", email: "charlotte@praevortech.com",   role: "Admin",            lastActive: "1h ago" },
    { name: "James Okafor",    email: "james@praevortech.com",       role: "Finance Manager",  lastActive: "Yesterday" },
  ];

  return (
    <div className={styles.pageContent}>
      <PageHeader title="Team Members" description="Manage who has access to your Praevor workspace." />

      <div className={styles.pageAction}>
        <button className={styles.primaryBtn}>
          <span>{I.Plus(14)}</span>
          Invite member
        </button>
      </div>

      <Card>
        {members.map((m, i) => (
          <button key={m.email} className={`${styles.memberRow} ${i < members.length - 1 ? styles.memberRowBorder : ""}`}>
            <div className={styles.memberAvatar}>{m.name.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
            <div className={styles.memberInfo}>
              <p className={styles.memberName}>{m.name}</p>
              <p className={styles.memberEmail}>{m.email}</p>
            </div>
            <div className={styles.memberRight}>
              <Badge label={m.role} color={m.role==="Owner" ? "blue" : "grey"} />
              <span className={styles.memberTime}>{m.lastActive}</span>
              <span className={styles.rowChevron}>{I.Chevron(14)}</span>
            </div>
          </button>
        ))}
      </Card>
    </div>
  );
}

function ApiKeysPage() {
  const [showLive, setShowLive] = useState(false);
  const [copied, setCopied]     = useState<string|null>(null);

  function copy(val: string, id: string) {
    navigator.clipboard.writeText(val).catch(()=>{});
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  }

  const keys = [
    { id: "live", label: "Live secret key",  key: "sk_live_praevor_4xT9mK2nL8pQr3sU", hint: "sk_live_••••••••••••••••••" },
    { id: "test", label: "Test secret key",  key: "sk_test_praevor_7bN1vW5hJ6qXc2dE", hint: "sk_test_••••••••••••••••••" },
    { id: "pub",  label: "Publishable key",  key: "pk_live_praevor_6eR2tY4fG9wZ1aB",  hint: "pk_live_••••••••••••••••••" },
  ];

  return (
    <div className={styles.pageContent}>
      <PageHeader title="API Keys" description="Manage your live and test API credentials." />

      <div className={styles.pageAction}>
        <button className={styles.primaryBtn}><span>{I.Plus(14)}</span>Create new key</button>
      </div>

      <Card label="Secret Keys">
        {keys.map((k, i) => (
          <div key={k.id} className={`${styles.keyRow} ${i < keys.length - 1 ? styles.keyRowBorder : ""}`}>
            <div className={styles.keyLeft}>
              <p className={styles.keyLabel}>{k.label}</p>
              <code className={styles.keyValue}>{showLive && k.id==="live" ? k.key : k.hint}</code>
            </div>
            <div className={styles.keyActions}>
              {k.id==="live" && (
                <button className={styles.iconBtn} onClick={() => setShowLive(!showLive)}>
                  {showLive ? I.EyeOff(15) : I.Eye(15)}
                </button>
              )}
              <button className={styles.iconBtn} onClick={() => copy(k.key, k.id)}>
                {copied===k.id ? I.Check(15) : I.Copy(15)}
              </button>
            </div>
          </div>
        ))}
      </Card>

      <Card label="Security">
        <Row label="IP allowlist" description="Restrict API access to specific IP addresses." empty="Not configured" noBorder />
      </Card>
    </div>
  );
}

function BillingPage() {
  return (
    <div className={styles.pageContent}>
      <PageHeader title="Plan & Billing" description="Manage your subscription, usage and payment details." />

      <div className={styles.planBlock}>
        <div className={styles.planLeft}>
          <span className={styles.planBadge}>Current plan</span>
          <p className={styles.planName}>Praevor Growth</p>
          <p className={styles.planPrice}>£149<span className={styles.planPer}>/month</span></p>
          <p className={styles.planDesc}>Unlimited payments · 3 team members · Priority support</p>
        </div>
        <button className={styles.primaryBtn}>Upgrade plan</button>
      </div>

      <SectionDivider />

      <Card label="Payment Method">
        <Row label="Visa ending in 4242" description="Expires 12/2027" value="Update" noBorder />
      </Card>

      <Card label="Recent Invoices">
        {[
          { date: "1 Jul 2026", amount: "£149.00", status: "Paid" },
          { date: "1 Jun 2026", amount: "£149.00", status: "Paid" },
          { date: "1 May 2026", amount: "£149.00", status: "Paid" },
        ].map((inv, i, arr) => (
          <div key={inv.date} className={`${styles.invoiceRow} ${i < arr.length-1 ? styles.invoiceRowBorder : ""}`}>
            <span className={styles.rowLabel}>{inv.date}</span>
            <div className={styles.invoiceRight}>
              <Badge label={inv.status} color="green" />
              <span className={styles.rowValue}>{inv.amount}</span>
              <button className={styles.iconBtn}>{I.Download(15)}</button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function CompanyProfilePage() {
  return (
    <div className={styles.pageContent}>
      <PageHeader title="Company Profile" description="Your registered business details and public information." />
      <Card label="Business Details">
        <Row label="Company name"        value="Praevor Ltd" />
        <Row label="Trading name"        value="Praevor" />
        <Row label="Company number"      value="14823901" />
        <Row label="VAT number"          empty="Not added" />
        <Row label="Industry"            value="Financial Services" noBorder />
      </Card>
      <Card label="Address">
        <Row label="Registered address"  value="1 Canada Square, London E14 5AB" />
        <Row label="Business address"    value="Same as registered" noBorder />
      </Card>
      <Card label="Online">
        <Row label="Website" value="praevortech.com" noBorder />
      </Card>
    </div>
  );
}

function RolesPage() {
  const roles = [
    { name: "Owner",           desc: "Full access to all settings, payments and team management.", members: 1 },
    { name: "Administrator",   desc: "Manage team, settings and view all financial data.", members: 1 },
    { name: "Finance Manager", desc: "Manage payments, payouts and download reports.", members: 1 },
    { name: "Read Only",       desc: "View payments and reports. Cannot take any actions.", members: 0 },
  ];

  return (
    <div className={styles.pageContent}>
      <PageHeader title="Roles & Permissions" description="Define what each team member can see and do inside Praevor." />
      <Card>
        {roles.map((r, i) => (
          <button key={r.name} className={`${styles.roleRow} ${i < roles.length - 1 ? styles.roleRowBorder : ""}`}>
            <div className={styles.roleLeft}>
              <p className={styles.roleName}>{r.name}</p>
              <p className={styles.roleDesc}>{r.desc}</p>
            </div>
            <div className={styles.roleRight}>
              <span className={styles.roleMeta}>{r.members} {r.members===1?"member":"members"}</span>
              <span className={styles.rowChevron}>{I.Chevron(14)}</span>
            </div>
          </button>
        ))}
      </Card>
    </div>
  );
}

function BankAccountsPage() {
  return (
    <div className={styles.pageContent}>
      <PageHeader title="Bank Accounts" description="Connected settlement and payout bank accounts." />
      <div className={styles.pageAction}>
        <button className={styles.primaryBtn}><span>{I.Plus(14)}</span>Connect account</button>
      </div>
      <Card>
        <button className={styles.bankRow}>
          <div className={styles.bankIcon}>{I.Bank(20)}</div>
          <div className={styles.bankInfo}>
            <p className={styles.bankName}>Barclays Business</p>
            <p className={styles.bankDetail}>Sort code 20-00-00 · Account ••••4821</p>
          </div>
          <div className={styles.bankRight}>
            <Badge label="Settlement account" color="blue" />
            <Badge label="Verified" color="green" />
            <span className={styles.rowChevron}>{I.Chevron(14)}</span>
          </div>
        </button>
      </Card>
    </div>
  );
}

function SupportPage() {
  return (
    <div className={styles.pageContent}>
      <PageHeader title="Help Centre" description="Get support, view documentation and contact the Praevor team." />

      <div className={styles.rmBlock}>
        <img src="/pexels-alena-shekhovtcova-8067887.jpg" alt="Charlotte Evans" className={styles.rmPhoto} />
        <div className={styles.rmInfo}>
          <p className={styles.rmName}>Charlotte Evans</p>
          <p className={styles.rmRole}>Relationship Manager, Praevor</p>
          <p className={styles.rmEmail}>charlotte@praevortech.com</p>
        </div>
        <button className={styles.primaryBtn}>Contact Charlotte</button>
      </div>

      <SectionDivider />

      <Card>
        <Row label="Help Centre"         description="Guides, tutorials and API documentation."        value="Visit" />
        <Row label="Support tickets"     description="View and track your open support requests."      value="Open" />
        <Row label="System status"       description="Live status of Praevor services."                value="Check" noBorder />
      </Card>
    </div>
  );
}

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.pageContent}>
      <PageHeader title={title} description={description} />
      <Card>
        <div className={styles.placeholderRow}>
          <p className={styles.placeholderText}>This section is being built.</p>
        </div>
      </Card>
    </div>
  );
}

// ── Page router ───────────────────────────────────────────────────────────────

function renderPage(id: string, email: string) {
  switch (id) {
    case "profile":         return <ProfilePage email={email} />;
    case "security":        return <SecurityPage />;
    case "notifications":   return <NotificationsPage />;
    case "appearance":      return <AppearancePage />;
    case "accessibility":   return <PlaceholderPage title="Accessibility" description="Font size, reduced motion and keyboard shortcut preferences." />;
    case "company-profile": return <CompanyProfilePage />;
    case "verification":    return <PlaceholderPage title="Business Verification" description="KYB status, identity documents and compliance checks." />;
    case "branding":        return <PlaceholderPage title="Branding" description="Upload your logo and set your accent colour." />;
    case "team":            return <TeamPage />;
    case "roles":           return <RolesPage />;
    case "approvals":       return <PlaceholderPage title="Approval Workflows" description="Set up multi-step approval chains for payments and refunds." />;
    case "bank-accounts":   return <BankAccountsPage />;
    case "payment-methods": return <PlaceholderPage title="Payment Methods" description="Enable Direct Debit, Open Banking and payment links." />;
    case "settlement":      return <PlaceholderPage title="Settlement Preferences" description="Choose how often Praevor settles funds to your bank account." />;
    case "api-keys":        return <ApiKeysPage />;
    case "webhooks":        return <PlaceholderPage title="Webhooks" description="Manage endpoints, secrets and event subscriptions." />;
    case "oauth-apps":      return <PlaceholderPage title="OAuth Applications" description="Authorised third-party applications with access to your account." />;
    case "billing":         return <BillingPage />;
    case "invoices":        return <PlaceholderPage title="Invoices" description="Download all past Praevor invoices." />;
    case "usage":           return <PlaceholderPage title="Usage" description="API calls, payment volume and billing cycle usage." />;
    case "help-centre":     return <SupportPage />;
    case "support-tickets": return <PlaceholderPage title="Contact Support" description="Open a support ticket with the Praevor team." />;
    case "legal":           return <PlaceholderPage title="Legal" description="Terms of service, acceptable use and agreements." />;
    case "privacy":         return <PlaceholderPage title="Privacy" description="Data processing, GDPR settings and data retention." />;
    default:                return <ProfilePage email={email} />;
  }
}

// ── Settings modal ────────────────────────────────────────────────────────────

export function SettingsModal({
  isOpen, onClose, email,
}: {
  isOpen: boolean; onClose: () => void; email: string;
}) {
  const [activePage, setActivePage] = useState("profile");
  const [visible, setVisible]       = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.backdrop} ${visible ? styles.backdropVisible : ""}`}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`${styles.modal} ${visible ? styles.modalVisible : ""}`} role="dialog" aria-modal aria-label="Settings">

        {/* Left panel */}
        <div className={styles.leftPanel}>
          <div className={styles.leftPanelHeader}>
            <span className={styles.leftPanelTitle}>Settings</span>
          </div>
          <div className={styles.navScroll}>
            {NAV_SECTIONS.map(({ section, items }) => (
              <div key={section} className={styles.navSection}>
                <p className={styles.navSectionLabel}>{section}</p>
                {items.map(({ id, label, icon }) => (
                  <button
                    key={id}
                    className={`${styles.navItem} ${activePage===id ? styles.navItemActive : ""}`}
                    onClick={() => setActivePage(id)}
                  >
                    <span className={styles.navItemIcon}>{icon(15)}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className={styles.rightPanel}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close settings">
            {I.X(16)}
          </button>
          <div className={styles.rightScroll}>
            {renderPage(activePage, email)}
          </div>
        </div>
      </div>
    </div>
  );
}
