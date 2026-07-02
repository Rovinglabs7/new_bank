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

// ── Nav icons ─────────────────────────────────────────────────────────────────

const I = {
  User:          (s=15) => <Svg size={s}><circle cx="12" cy="8" r="4"/><path d="M4 20v-1a8 8 0 0116 0v1"/></Svg>,
  Lock:          (s=15) => <Svg size={s}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></Svg>,
  Bell:          (s=15) => <Svg size={s}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></Svg>,
  Sun:           (s=15) => <Svg size={s}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></Svg>,
  Accessibility: (s=15) => <Svg size={s}><circle cx="12" cy="4" r="2"/><path d="M4 8h16M12 10v11M8 21l4-11 4 11"/></Svg>,
  Building:      (s=15) => <Svg size={s}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></Svg>,
  Palette:       (s=15) => <Svg size={s}><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none"/></Svg>,
  ShieldCheck:   (s=15) => <Svg size={s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></Svg>,
  Users:         (s=15) => <Svg size={s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></Svg>,
  Sliders:       (s=15) => <Svg size={s}><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></Svg>,
  GitBranch:     (s=15) => <Svg size={s}><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 01-9 9"/></Svg>,
  CheckSquare:   (s=15) => <Svg size={s}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></Svg>,
  Bank:          (s=15) => <Svg size={s}><rect x="3" y="10" width="18" height="11" rx="1"/><path d="M3 10l9-7 9 7"/><line x1="12" y1="10" x2="12" y2="21"/><line x1="3" y1="15" x2="21" y2="15"/></Svg>,
  CreditCard:    (s=15) => <Svg size={s}><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></Svg>,
  RefreshCw:     (s=15) => <Svg size={s}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></Svg>,
  RotateCcw:     (s=15) => <Svg size={s}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></Svg>,
  UserCheck:     (s=15) => <Svg size={s}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></Svg>,
  Mail:          (s=15) => <Svg size={s}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></Svg>,
  MessageSquare: (s=15) => <Svg size={s}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></Svg>,
  Code:          (s=15) => <Svg size={s}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></Svg>,
  Webhook:       (s=15) => <Svg size={s}><path d="M18 16.016a3 3 0 11-4.93.984l-3.07-5.3A3 3 0 117 8.984l3.07 5.3a3 3 0 011.93.73"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="6" cy="18" r="3"/></Svg>,
  Box:           (s=15) => <Svg size={s}><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></Svg>,
  Terminal:      (s=15) => <Svg size={s}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></Svg>,
  Activity:      (s=15) => <Svg size={s}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Svg>,
  Zap:           (s=15) => <Svg size={s}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Svg>,
  Link2:         (s=15) => <Svg size={s}><path d="M15 7h3a5 5 0 010 10h-3m-6 0H6A5 5 0 016 7h3"/><line x1="8" y1="12" x2="16" y2="12"/></Svg>,
  Briefcase:     (s=15) => <Svg size={s}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></Svg>,
  FileText:      (s=15) => <Svg size={s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></Svg>,
  BarChart2:     (s=15) => <Svg size={s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Svg>,
  DollarSign:    (s=15) => <Svg size={s}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></Svg>,
  LifeBuoy:      (s=15) => <Svg size={s}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></Svg>,
  Headphones:    (s=15) => <Svg size={s}><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z"/><path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z"/></Svg>,
  AlertTriangle: (s=15) => <Svg size={s}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Svg>,
  Download:      (s=15) => <Svg size={s}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Svg>,
  Trash2:        (s=15) => <Svg size={s}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></Svg>,
  X:             (s=15) => <Svg size={s}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>,
  Check:         (s=15) => <Svg size={s}><polyline points="20 6 9 17 4 12"/></Svg>,
  Copy:          (s=15) => <Svg size={s}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></Svg>,
  Eye:           (s=15) => <Svg size={s}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Svg>,
  EyeOff:        (s=15) => <Svg size={s}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></Svg>,
  Globe:         (s=15) => <Svg size={s}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></Svg>,
  Clock:         (s=15) => <Svg size={s}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>,
  ChevronRight:  (s=14) => <Svg size={s}><polyline points="9 18 15 12 9 6"/></Svg>,
  Plus:          (s=15) => <Svg size={s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>,
  ExternalLink:  (s=15) => <Svg size={s}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Svg>,
  ArrowRight:    (s=15) => <Svg size={s}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></Svg>,
};

// ── Nav structure ─────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    section: "ACCOUNT",
    items: [
      { id: "profile",       label: "Profile",       icon: I.User },
      { id: "security",      label: "Security",      icon: I.Lock },
      { id: "notifications", label: "Notifications", icon: I.Bell },
      { id: "appearance",    label: "Appearance",    icon: I.Sun },
      { id: "accessibility", label: "Accessibility", icon: I.Accessibility },
    ],
  },
  {
    section: "COMPANY",
    items: [
      { id: "company-profile", label: "Company Profile",      icon: I.Building },
      { id: "branding",        label: "Branding",             icon: I.Palette },
      { id: "verification",    label: "Business Verification", icon: I.ShieldCheck },
    ],
  },
  {
    section: "TEAM",
    items: [
      { id: "team",           label: "Team Members",       icon: I.Users },
      { id: "roles",          label: "Roles & Permissions", icon: I.Sliders },
      { id: "custom-roles",   label: "Custom Roles",        icon: I.GitBranch },
      { id: "approvals",      label: "Approval Workflows",  icon: I.CheckSquare },
    ],
  },
  {
    section: "PAYMENTS",
    items: [
      { id: "bank-accounts",  label: "Bank Accounts",         icon: I.Bank },
      { id: "payment-methods", label: "Payment Methods",      icon: I.CreditCard },
      { id: "settlement",     label: "Settlement Preferences", icon: I.RefreshCw },
      { id: "recurring",      label: "Recurring Payments",    icon: I.RotateCcw },
      { id: "refunds",        label: "Refund Rules",          icon: I.ArrowRight },
    ],
  },
  {
    section: "CUSTOMERS",
    items: [
      { id: "customer-portal", label: "Customer Portal",       icon: I.Globe },
      { id: "email-templates", label: "Email Templates",       icon: I.Mail },
      { id: "communication",   label: "Customer Communication", icon: I.MessageSquare },
    ],
  },
  {
    section: "DEVELOPERS",
    items: [
      { id: "api-keys",    label: "API Keys",        icon: I.Code },
      { id: "webhooks",    label: "Webhooks",        icon: I.Webhook },
      { id: "oauth-apps",  label: "OAuth Apps",      icon: I.Box },
      { id: "sandbox",     label: "Developer Sandbox", icon: I.Terminal },
      { id: "api-logs",    label: "API Logs",        icon: I.Activity },
      { id: "rate-limits", label: "Rate Limits",     icon: I.Zap },
    ],
  },
  {
    section: "INTEGRATIONS",
    items: [
      { id: "accounting",  label: "Accounting",  icon: I.Briefcase },
      { id: "crm",         label: "CRM",         icon: I.UserCheck },
      { id: "productivity", label: "Productivity", icon: I.Link2 },
    ],
  },
  {
    section: "COMPLIANCE",
    items: [
      { id: "compliance",   label: "Verification",   icon: I.ShieldCheck },
      { id: "pci",          label: "PCI Compliance",  icon: I.FileText },
      { id: "privacy",      label: "Privacy & Data",  icon: I.Lock },
      { id: "audit-logs",   label: "Audit Logs",      icon: I.Activity },
    ],
  },
  {
    section: "BILLING",
    items: [
      { id: "billing",    label: "Current Plan",    icon: I.DollarSign },
      { id: "usage",      label: "Usage",           icon: I.BarChart2 },
      { id: "invoices",   label: "Invoices",        icon: I.FileText },
    ],
  },
  {
    section: "SUPPORT",
    items: [
      { id: "support-rm",       label: "Relationship Manager", icon: I.UserCheck },
      { id: "support-tickets",  label: "Support Tickets",      icon: I.Headphones },
      { id: "help-centre",      label: "Help Centre",          icon: I.LifeBuoy },
    ],
  },
  {
    section: "ADVANCED",
    items: [
      { id: "data-export",      label: "Data Export",       icon: I.Download },
      { id: "delete-workspace", label: "Delete Workspace",  icon: I.Trash2 },
    ],
  },
];

// ── Reusable settings UI primitives ──────────────────────────────────────────

function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.pageHeader}>
      <h2 className={styles.pageTitle}>{title}</h2>
      <p className={styles.pageDesc}>{description}</p>
    </div>
  );
}

function Card({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className={styles.card}>
      {title && <p className={styles.cardTitle}>{title}</p>}
      {children}
    </div>
  );
}

function Row({
  label,
  description,
  value,
  action,
  noBorder,
}: {
  label: string;
  description?: string;
  value?: React.ReactNode;
  action?: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <div className={`${styles.row} ${noBorder ? styles.rowNoBorder : ""}`}>
      <div className={styles.rowLeft}>
        <span className={styles.rowLabel}>{label}</span>
        {description && <span className={styles.rowDesc}>{description}</span>}
      </div>
      <div className={styles.rowRight}>
        {value && <span className={styles.rowValue}>{value}</span>}
        {action}
      </div>
    </div>
  );
}

function Btn({ children, variant = "secondary", size = "md", onClick }: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md";
  onClick?: () => void;
}) {
  return (
    <button
      className={`${styles.btn} ${styles[`btn${variant.charAt(0).toUpperCase() + variant.slice(1)}`]} ${styles[`btnSize${size}`]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      className={`${styles.toggle} ${checked ? styles.toggleOn : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.toggleThumb} />
    </button>
  );
}

function Badge({ label, color = "grey" }: { label: string; color?: "green" | "amber" | "grey" | "blue" }) {
  return <span className={`${styles.badge} ${styles[`badge${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>{label}</span>;
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

      <Card>
        <div className={styles.profileHero}>
          <div className={styles.profileAvatarWrap}>
            <div className={styles.profileAvatar}>{initials}</div>
            <div className={styles.profileAvatarMeta}>
              <p className={styles.profileName}>{displayName}</p>
              <p className={styles.profileEmail}>{email}</p>
            </div>
          </div>
          <Btn variant="secondary" size="sm">Change photo</Btn>
        </div>
      </Card>

      <Card title="Personal Information">
        <Row label="Full name" value={displayName} action={<Btn variant="secondary" size="sm">Edit</Btn>} />
        <Row label="Email address" value={email} action={<Btn variant="secondary" size="sm">Change</Btn>} />
        <Row label="Job title" value="Account Owner" action={<Btn variant="secondary" size="sm">Edit</Btn>} />
        <Row label="Phone number" value="+44 —" action={<Btn variant="secondary" size="sm">Add</Btn>} noBorder />
      </Card>

      <Card title="Localisation">
        <Row label="Language" value="English (United Kingdom)" action={<Btn variant="secondary" size="sm">Change</Btn>} />
        <Row label="Time zone" value="London (GMT+0)" action={<Btn variant="secondary" size="sm">Change</Btn>} noBorder />
      </Card>
    </div>
  );
}

function SecurityPage() {
  return (
    <div className={styles.pageContent}>
      <PageHeader title="Security" description="Manage your password, authentication methods and active sessions." />

      <Card title="Authentication">
        <Row label="Password" description="Last changed more than 90 days ago."
          value="••••••••••••"
          action={<Btn variant="secondary" size="sm">Change password</Btn>} />
        <Row label="Two-factor authentication" description="Add an extra layer of security to your account."
          action={<Btn variant="secondary" size="sm">Enable 2FA</Btn>} noBorder />
      </Card>

      <Card title="Passkeys">
        <Row label="Passkeys" description="Sign in securely without a password using Face ID or Touch ID."
          action={<Btn variant="secondary" size="sm">Add passkey</Btn>} noBorder />
      </Card>

      <Card title="Active Sessions">
        {[
          { device: "MacBook Pro — Chrome", location: "London, UK", time: "Active now", current: true },
          { device: "iPhone 15 — Safari", location: "London, UK", time: "2 hours ago", current: false },
          { device: "iPad — Safari", location: "Manchester, UK", time: "3 days ago", current: false },
        ].map((s, i, arr) => (
          <div key={s.device} className={`${styles.sessionRow} ${i < arr.length - 1 ? styles.sessionRowBorder : ""}`}>
            <div className={styles.sessionLeft}>
              <span className={styles.sessionDevice}>{s.device}</span>
              <span className={styles.sessionMeta}>{s.location} · {s.time}</span>
            </div>
            {s.current
              ? <Badge label="This device" color="green" />
              : <Btn variant="secondary" size="sm">Revoke</Btn>
            }
          </div>
        ))}
      </Card>

      <Card title="Danger Zone">
        <Row label="Login history" description="Download a record of all recent logins to your account."
          action={<Btn variant="secondary" size="sm">Download</Btn>} noBorder />
      </Card>
    </div>
  );
}

function NotificationsPage() {
  const [prefs, setPrefs] = useState({
    paymentReceived: true, paymentFailed: true, customerSignup: false,
    weeklyReport: true, securityAlerts: true, productUpdates: false,
    inAppPayments: true, inAppTeam: true, marketing: false,
  });

  const set = (key: keyof typeof prefs) => (v: boolean) => setPrefs((p) => ({ ...p, [key]: v }));

  return (
    <div className={styles.pageContent}>
      <PageHeader title="Notifications" description="Choose how and when Praevor contacts you." />

      <Card title="Email Notifications">
        <Row label="Payment received" description="Get notified when a payment is successfully collected." action={<Toggle checked={prefs.paymentReceived} onChange={set("paymentReceived")} />} />
        <Row label="Payment failed" description="Alert when a direct debit or collection attempt fails." action={<Toggle checked={prefs.paymentFailed} onChange={set("paymentFailed")} />} />
        <Row label="New customer signup" description="When a new customer completes your payment flow." action={<Toggle checked={prefs.customerSignup} onChange={set("customerSignup")} />} />
        <Row label="Weekly summary" description="A digest of payments, collections and activity each week." action={<Toggle checked={prefs.weeklyReport} onChange={set("weeklyReport")} />} noBorder />
      </Card>

      <Card title="Security Alerts">
        <Row label="Security alerts" description="Always on. Required for account security." action={<Toggle checked={true} onChange={() => {}} />} noBorder />
      </Card>

      <Card title="In-App Notifications">
        <Row label="Payment activity" action={<Toggle checked={prefs.inAppPayments} onChange={set("inAppPayments")} />} />
        <Row label="Team activity" action={<Toggle checked={prefs.inAppTeam} onChange={set("inAppTeam")} />} noBorder />
      </Card>

      <Card title="Marketing">
        <Row label="Product updates & announcements" description="Occasional emails about new features and improvements."
          action={<Toggle checked={prefs.marketing} onChange={set("marketing")} />} noBorder />
      </Card>
    </div>
  );
}

function AppearancePage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");

  return (
    <div className={styles.pageContent}>
      <PageHeader title="Appearance" description="Customise how Praevor looks and feels for you." />

      <Card title="Theme">
        <div className={styles.themeGrid}>
          {(["light", "dark", "system"] as const).map((t) => (
            <button key={t} className={`${styles.themeOption} ${theme === t ? styles.themeOptionActive : ""}`}
              onClick={() => setTheme(t)}>
              <div className={`${styles.themePreview} ${styles[`themePreview${t.charAt(0).toUpperCase() + t.slice(1)}`]}`} />
              <span className={styles.themeLabel}>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
              {theme === t && <span className={styles.themeCheck}>{I.Check(12)}</span>}
            </button>
          ))}
        </div>
      </Card>

      <Card title="Density">
        <div className={styles.densityOptions}>
          {(["comfortable", "compact"] as const).map((d) => (
            <button key={d} className={`${styles.densityOption} ${density === d ? styles.densityOptionActive : ""}`}
              onClick={() => setDensity(d)}>
              <div className={styles.densityOptionInner}>
                <span className={styles.densityRadio}>
                  {density === d && <span className={styles.densityRadioFill} />}
                </span>
                <div>
                  <p className={styles.densityLabel}>{d.charAt(0).toUpperCase() + d.slice(1)}</p>
                  <p className={styles.densityDesc}>{d === "comfortable" ? "More space between elements." : "Tighter layout for more content."}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

function TeamPage() {
  const members = [
    { name: "Daniel Bamidele", email: "danielbamidele042@gmail.com", role: "Owner",   status: "Active", lastActive: "Now" },
    { name: "Charlotte Evans", email: "charlotte@praevortech.com",   role: "Admin",   status: "Active", lastActive: "1h ago" },
    { name: "James Okafor",    email: "james@praevortech.com",       role: "Finance Manager", status: "Active", lastActive: "Yesterday" },
  ];

  return (
    <div className={styles.pageContent}>
      <PageHeader title="Team Members" description="Manage who has access to your Praevor workspace." />

      <div className={styles.pageActionBar}>
        <Btn variant="primary" size="sm">
          <span className={styles.btnIcon}>{I.Plus(14)}</span>
          Invite member
        </Btn>
      </div>

      <Card>
        <div className={styles.tableHeader}>
          <span className={styles.tableCol} style={{ flex: 2 }}>Member</span>
          <span className={styles.tableCol}>Role</span>
          <span className={styles.tableCol}>Status</span>
          <span className={styles.tableCol}>Last active</span>
          <span className={styles.tableCol} />
        </div>
        {members.map((m, i) => (
          <div key={m.email} className={`${styles.tableRow} ${i < members.length - 1 ? styles.tableRowBorder : ""}`}>
            <div className={styles.tableCell} style={{ flex: 2 }}>
              <div className={styles.memberAvatar}>{m.name.split(" ").map(w => w[0]).join("").slice(0, 2)}</div>
              <div>
                <p className={styles.memberName}>{m.name}</p>
                <p className={styles.memberEmail}>{m.email}</p>
              </div>
            </div>
            <div className={styles.tableCell}><Badge label={m.role} color={m.role === "Owner" ? "blue" : "grey"} /></div>
            <div className={styles.tableCell}><Badge label={m.status} color="green" /></div>
            <div className={styles.tableCell}><span className={styles.rowValue}>{m.lastActive}</span></div>
            <div className={styles.tableCell}>
              {m.role !== "Owner" && <Btn variant="secondary" size="sm">Manage</Btn>}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function ApiKeysPage() {
  const [showLive, setShowLive] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  function copy(val: string, id: string) {
    navigator.clipboard.writeText(val).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  }

  const keys = [
    { id: "live", label: "Live secret key", key: "sk_live_praevor_4xT9mK2nL8pQr3sU", hint: "sk_live_••••••••••••••••••••" },
    { id: "test", label: "Test secret key", key: "sk_test_praevor_7bN1vW5hJ6qXc2dE", hint: "sk_test_••••••••••••••••••••" },
    { id: "pub",  label: "Publishable key",  key: "pk_live_praevor_6eR2tY4fG9wZ1aB", hint: "pk_live_••••••••••••••••••••" },
  ];

  return (
    <div className={styles.pageContent}>
      <PageHeader title="API Keys" description="Manage your live and test API credentials for Praevor integrations." />

      <div className={styles.pageActionBar}>
        <Btn variant="primary" size="sm">
          <span className={styles.btnIcon}>{I.Plus(14)}</span>
          Create new key
        </Btn>
      </div>

      <Card title="Secret Keys">
        {keys.map((k, i) => (
          <div key={k.id} className={`${styles.keyRow} ${i < keys.length - 1 ? styles.keyRowBorder : ""}`}>
            <div className={styles.keyLeft}>
              <span className={styles.keyLabel}>{k.label}</span>
              <code className={styles.keyValue}>{showLive && k.id === "live" ? k.key : k.hint}</code>
            </div>
            <div className={styles.keyActions}>
              {k.id === "live" && (
                <button className={styles.iconBtn} onClick={() => setShowLive(!showLive)} aria-label="Toggle visibility">
                  {showLive ? I.EyeOff(15) : I.Eye(15)}
                </button>
              )}
              <button className={styles.iconBtn} onClick={() => copy(k.key, k.id)} aria-label="Copy">
                {copied === k.id ? I.Check(15) : I.Copy(15)}
              </button>
              <Btn variant="secondary" size="sm">Rotate</Btn>
            </div>
          </div>
        ))}
      </Card>

      <Card title="Security">
        <Row label="IP allowlist" description="Restrict API access to specific IP addresses." action={<Btn variant="secondary" size="sm">Configure</Btn>} noBorder />
      </Card>
    </div>
  );
}

function BillingPage() {
  return (
    <div className={styles.pageContent}>
      <PageHeader title="Billing" description="Manage your subscription, usage and payment details." />

      <Card>
        <div className={styles.planCard}>
          <div className={styles.planLeft}>
            <div className={styles.planBadge}>Current plan</div>
            <p className={styles.planName}>Praevor Growth</p>
            <p className={styles.planPrice}>£149 <span className={styles.planPricePer}>/month</span></p>
            <p className={styles.planDesc}>Unlimited payments, 3 team members, priority support.</p>
          </div>
          <div className={styles.planActions}>
            <Btn variant="primary" size="sm">Upgrade plan</Btn>
            <Btn variant="secondary" size="sm">View usage</Btn>
          </div>
        </div>
      </Card>

      <Card title="Payment Method">
        <Row label="Visa ending in 4242" description="Expires 12/2027" action={<Btn variant="secondary" size="sm">Update</Btn>} noBorder />
      </Card>

      <Card title="Recent Invoices">
        {[
          { date: "1 Jul 2026", amount: "£149.00", status: "Paid" },
          { date: "1 Jun 2026", amount: "£149.00", status: "Paid" },
          { date: "1 May 2026", amount: "£149.00", status: "Paid" },
        ].map((inv, i, arr) => (
          <div key={inv.date} className={`${styles.invoiceRow} ${i < arr.length - 1 ? styles.invoiceRowBorder : ""}`}>
            <span className={styles.rowLabel}>{inv.date}</span>
            <div className={styles.invoiceRight}>
              <Badge label={inv.status} color="green" />
              <span className={styles.rowValue}>{inv.amount}</span>
              <button className={styles.iconBtn} aria-label="Download">{I.Download(15)}</button>
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
      <PageHeader title="Company Profile" description="Your registered business details and public-facing information." />
      <Card title="Business Details">
        <Row label="Company name" value="Praevor Ltd" action={<Btn variant="secondary" size="sm">Edit</Btn>} />
        <Row label="Trading name" value="Praevor" action={<Btn variant="secondary" size="sm">Edit</Btn>} />
        <Row label="Registered number" value="14823901" action={<Btn variant="secondary" size="sm">Edit</Btn>} />
        <Row label="VAT number" value="Not added" action={<Btn variant="secondary" size="sm">Add</Btn>} />
        <Row label="Industry" value="Financial Services" action={<Btn variant="secondary" size="sm">Change</Btn>} noBorder />
      </Card>
      <Card title="Addresses">
        <Row label="Registered address" value="1 Canada Square, London E14 5AB" action={<Btn variant="secondary" size="sm">Edit</Btn>} />
        <Row label="Business address" value="Same as registered" action={<Btn variant="secondary" size="sm">Edit</Btn>} noBorder />
      </Card>
      <Card title="Online Presence">
        <Row label="Website" value="praevortech.com" action={<Btn variant="secondary" size="sm">Edit</Btn>} noBorder />
      </Card>
    </div>
  );
}

function BankAccountsPage() {
  return (
    <div className={styles.pageContent}>
      <PageHeader title="Bank Accounts" description="Connect and manage settlement and payout bank accounts." />
      <div className={styles.pageActionBar}>
        <Btn variant="primary" size="sm"><span className={styles.btnIcon}>{I.Plus(14)}</span>Connect account</Btn>
      </div>
      <Card>
        <div className={styles.bankRow}>
          <div className={styles.bankLeft}>
            <div className={styles.bankIcon}>{I.Bank(20)}</div>
            <div>
              <p className={styles.bankName}>Barclays Business</p>
              <p className={styles.bankDetail}>Sort code: 20-00-00 · Account: ••••4821</p>
            </div>
          </div>
          <div className={styles.bankRight}>
            <Badge label="Settlement account" color="blue" />
            <Badge label="Verified" color="green" />
            <Btn variant="secondary" size="sm">Manage</Btn>
          </div>
        </div>
      </Card>
    </div>
  );
}

function RolesPage() {
  const roles = [
    { name: "Owner", desc: "Full access to all settings, payments and team management.", members: 1 },
    { name: "Administrator", desc: "Can manage team, settings and view all financial data.", members: 1 },
    { name: "Finance Manager", desc: "Can manage payments, payouts and download reports.", members: 1 },
    { name: "Read Only", desc: "Can view payments and reports. Cannot take any actions.", members: 0 },
  ];
  return (
    <div className={styles.pageContent}>
      <PageHeader title="Roles & Permissions" description="Define what each team member can see and do inside Praevor." />
      <Card>
        {roles.map((r, i, arr) => (
          <div key={r.name} className={`${styles.roleRow} ${i < arr.length - 1 ? styles.roleRowBorder : ""}`}>
            <div className={styles.roleLeft}>
              <p className={styles.roleName}>{r.name}</p>
              <p className={styles.roleDesc}>{r.desc}</p>
            </div>
            <div className={styles.roleRight}>
              <span className={styles.roleMemberCount}>{r.members} {r.members === 1 ? "member" : "members"}</span>
              <Btn variant="secondary" size="sm">Edit</Btn>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function SupportPage() {
  return (
    <div className={styles.pageContent}>
      <PageHeader title="Relationship Manager" description="Your dedicated Praevor contact for onboarding, support and growth." />
      <Card>
        <div className={styles.rmCard}>
          <img src="/pexels-alena-shekhovtcova-8067887.jpg" alt="Charlotte Evans" className={styles.rmPhoto} />
          <div className={styles.rmInfo}>
            <p className={styles.rmName}>Charlotte Evans</p>
            <p className={styles.rmTitle}>Relationship Manager, Praevor</p>
            <p className={styles.rmEmail}>charlotte@praevortech.com</p>
          </div>
          <div className={styles.rmActions}>
            <Btn variant="primary" size="sm">Contact Charlotte</Btn>
            <Btn variant="secondary" size="sm">Schedule a call</Btn>
          </div>
        </div>
      </Card>
      <Card title="Support">
        <Row label="Support tickets" description="View and track your open support requests."
          action={<Btn variant="secondary" size="sm"><span style={{display:"flex",alignItems:"center",gap:6}}>{I.ExternalLink(13)} Open tickets</span></Btn>} />
        <Row label="Help Centre" description="Guides, tutorials and API documentation."
          action={<Btn variant="secondary" size="sm"><span style={{display:"flex",alignItems:"center",gap:6}}>{I.ExternalLink(13)} Visit</span></Btn>} />
        <Row label="System status" description="Live status of Praevor services and infrastructure."
          action={<Btn variant="secondary" size="sm"><span style={{display:"flex",alignItems:"center",gap:6}}>{I.ExternalLink(13)} Status</span></Btn>} noBorder />
      </Card>
    </div>
  );
}

function DeleteWorkspacePage() {
  return (
    <div className={styles.pageContent}>
      <PageHeader title="Advanced" description="Irreversible actions that affect your entire workspace." />
      <Card title="Data Export">
        <Row label="Export all payments" description="Download a CSV of all payment records."
          action={<Btn variant="secondary" size="sm">Export</Btn>} />
        <Row label="Export customers" description="Download a CSV of all customer records."
          action={<Btn variant="secondary" size="sm">Export</Btn>} noBorder />
      </Card>
      <Card title="Danger Zone">
        <div className={styles.dangerCard}>
          <div className={styles.dangerLeft}>
            <p className={styles.dangerTitle}>Delete workspace</p>
            <p className={styles.dangerDesc}>Permanently delete this Praevor workspace and all associated data. This cannot be undone.</p>
          </div>
          <Btn variant="danger" size="sm">Delete workspace</Btn>
        </div>
      </Card>
    </div>
  );
}

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.pageContent}>
      <PageHeader title={title} description={description} />
      <Card>
        <div className={styles.placeholderBody}>
          <p className={styles.placeholderText}>This section is being built. Check back soon.</p>
        </div>
      </Card>
    </div>
  );
}

// ── Page renderer ─────────────────────────────────────────────────────────────

function renderPage(id: string, email: string) {
  switch (id) {
    case "profile":         return <ProfilePage email={email} />;
    case "security":        return <SecurityPage />;
    case "notifications":   return <NotificationsPage />;
    case "appearance":      return <AppearancePage />;
    case "accessibility":   return <PlaceholderPage title="Accessibility" description="Font size, reduced motion and keyboard shortcut preferences." />;
    case "company-profile": return <CompanyProfilePage />;
    case "branding":        return <PlaceholderPage title="Branding" description="Upload your logo, choose an accent colour and preview customer-facing branding." />;
    case "verification":    return <PlaceholderPage title="Business Verification" description="KYB status, identity documents and compliance checks." />;
    case "team":            return <TeamPage />;
    case "roles":           return <RolesPage />;
    case "custom-roles":    return <PlaceholderPage title="Custom Roles" description="Create, clone and edit custom permission sets for your team." />;
    case "approvals":       return <PlaceholderPage title="Approval Workflows" description="Set up multi-step approval chains for payments, refunds and payouts." />;
    case "bank-accounts":   return <BankAccountsPage />;
    case "payment-methods": return <PlaceholderPage title="Payment Methods" description="Enable and configure Direct Debit, Open Banking, payment links and more." />;
    case "settlement":      return <PlaceholderPage title="Settlement Preferences" description="Choose how often Praevor settles collected funds to your bank account." />;
    case "recurring":       return <PlaceholderPage title="Recurring Payments" description="Configure retry schedules, dunning emails and failed payment handling." />;
    case "refunds":         return <PlaceholderPage title="Refund Rules" description="Set default refund methods, approval requirements and customer notifications." />;
    case "customer-portal": return <PlaceholderPage title="Customer Portal" description="Enable and customise the self-service portal for your customers." />;
    case "email-templates": return <PlaceholderPage title="Email Templates" description="Customise transactional emails sent to your customers by Praevor." />;
    case "communication":   return <PlaceholderPage title="Customer Communication" description="Reminder schedules, payment timing and retry notifications." />;
    case "api-keys":        return <ApiKeysPage />;
    case "webhooks":        return <PlaceholderPage title="Webhooks" description="Manage webhook endpoints, secrets and event subscriptions." />;
    case "oauth-apps":      return <PlaceholderPage title="OAuth Apps" description="Authorised third-party applications with access to your Praevor account." />;
    case "sandbox":         return <PlaceholderPage title="Developer Sandbox" description="Test payments and integrations in an isolated environment." />;
    case "api-logs":        return <PlaceholderPage title="API Logs" description="Inspect recent API requests, responses and error details." />;
    case "rate-limits":     return <PlaceholderPage title="Rate Limits" description="View your current API rate limits and request usage." />;
    case "accounting":      return <PlaceholderPage title="Accounting" description="Connect Xero, QuickBooks, Sage or FreeAgent to sync your financial data." />;
    case "crm":             return <PlaceholderPage title="CRM" description="Connect HubSpot, Salesforce or Zapier to your payment workflows." />;
    case "productivity":    return <PlaceholderPage title="Productivity" description="Connect Slack, Microsoft Teams, Make and more." />;
    case "compliance":      return <PlaceholderPage title="Verification" description="KYC, KYB, FCA information and compliance check status." />;
    case "pci":             return <PlaceholderPage title="PCI Compliance" description="Your PCI DSS compliance status and required actions." />;
    case "privacy":         return <PlaceholderPage title="Privacy & Data" description="Data processing agreements, GDPR settings and data retention." />;
    case "audit-logs":      return <PlaceholderPage title="Audit Logs" description="A complete record of all actions taken within your workspace." />;
    case "billing":         return <BillingPage />;
    case "usage":           return <PlaceholderPage title="Usage" description="API calls, payment volume, team members and current billing cycle usage." />;
    case "invoices":        return <PlaceholderPage title="Invoices" description="Download all past Praevor invoices." />;
    case "support-rm":      return <SupportPage />;
    case "support-tickets": return <PlaceholderPage title="Support Tickets" description="View and manage your open support requests with the Praevor team." />;
    case "help-centre":     return <PlaceholderPage title="Help Centre" description="Guides, tutorials and API documentation for Praevor." />;
    case "data-export":     return <DeleteWorkspacePage />;
    case "delete-workspace": return <DeleteWorkspacePage />;
    default:                return <ProfilePage email={email} />;
  }
}

// ── Main modal ────────────────────────────────────────────────────────────────

export function SettingsModal({
  isOpen,
  onClose,
  email,
}: {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}) {
  const [activePage, setActivePage] = useState("profile");
  const [visible, setVisible] = useState(false);

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
                    className={`${styles.navItem} ${activePage === id ? styles.navItemActive : ""}`}
                    onClick={() => setActivePage(id)}
                  >
                    <span className={styles.navItemIcon}>{icon(15)}</span>
                    <span className={styles.navItemLabel}>{label}</span>
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
