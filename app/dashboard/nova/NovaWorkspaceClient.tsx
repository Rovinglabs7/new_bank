"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth";
import styles from "./nova.module.css";
import dashStyles from "../dashboard.module.css";

// ── Shared SVG primitive ───────────────────────────────────────────────────────

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

// ── Nav icons ─────────────────────────────────────────────────────────────────

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

function IconSearch({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

// ── Composer action icons ─────────────────────────────────────────────────────

function IconPlus({ size = 16 }) {
  return (
    <Svg size={size}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Svg>
  );
}

function IconPaperclip({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
    </Svg>
  );
}

function IconCalendar({ size = 16 }) {
  return (
    <Svg size={size}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </Svg>
  );
}

function IconFlag({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </Svg>
  );
}

function IconShield({ size = 16 }) {
  return (
    <Svg size={size}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </Svg>
  );
}

function IconMic({ size = 18 }) {
  return (
    <Svg size={size}>
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
      <path d="M19 10v2a7 7 0 01-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </Svg>
  );
}

function IconArrowUp({ size = 16 }) {
  return (
    <Svg size={size}>
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </Svg>
  );
}

// Suggestion chip icons
function IconChart({ size = 15 }) {
  return (
    <Svg size={size}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </Svg>
  );
}

function IconAlertCircle({ size = 15 }) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </Svg>
  );
}

function IconTrendingUp({ size = 15 }) {
  return (
    <Svg size={size}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </Svg>
  );
}

function IconUsers({ size = 15 }) {
  return (
    <Svg size={size}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </Svg>
  );
}

// ── Nav definition ────────────────────────────────────────────────────────────

const NAV = [
  { label: "Home",         Icon: IconHome },
  { label: "Payments",     Icon: IconPayments },
  { label: "Customers",    Icon: IconCustomers },
  { label: "Payouts",      Icon: IconPayouts },
  { label: "Connect",      Icon: IconConnect },
  { label: "Developers",   Icon: IconDevelopers },
  { label: "Integrations", Icon: IconIntegrations },
];

// ── Animated typing placeholder ───────────────────────────────────────────────

const PLACEHOLDER_SEQUENCE = [
  "Tell Nova what to do",
  "Ask Nova a question",
  "Give Nova a task",
  "Find overdue payments",
  "Create a payment link",
  "Review my subscriptions",
  "Show failed payments",
  "Explain this payout",
];

function useTypingPlaceholder() {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const phrase = PLACEHOLDER_SEQUENCE[phraseIndex];

    if (isPaused) {
      const t = setTimeout(() => setIsPaused(false), 2000);
      return () => clearTimeout(t);
    }

    if (!isDeleting && charIndex === phrase.length) {
      setIsPaused(true);
      setIsDeleting(true);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % PLACEHOLDER_SEQUENCE.length);
      return;
    }

    const speed = isDeleting ? 38 : 62;
    const t = setTimeout(() => {
      setCharIndex((i) => i + (isDeleting ? -1 : 1));
      setDisplayed(phrase.slice(0, charIndex + (isDeleting ? -1 : 1)));
    }, speed);

    return () => clearTimeout(t);
  }, [charIndex, isDeleting, isPaused, phraseIndex]);

  return displayed || " ";
}

// ── Suggestion chips ──────────────────────────────────────────────────────────

const SUGGESTIONS = [
  { label: "Review today's payments", Icon: IconChart },
  { label: "Show failed collections", Icon: IconAlertCircle },
  { label: "Summarise this week's revenue", Icon: IconTrendingUp },
  { label: "Who hasn't paid yet?", Icon: IconUsers },
];

// ── Sidebar (shared layout piece) ────────────────────────────────────────────

function Sidebar() {
  const router = useRouter();

  return (
    <aside className={dashStyles.sidebar}>
      <div className={dashStyles.sidebarLogo}>
        <span className={dashStyles.logoMark} />
        <span className={dashStyles.logoText}>Praevor</span>
      </div>

      <nav className={dashStyles.sidebarNav}>
        {NAV.map(({ label, Icon }) => (
          <button
            key={label}
            className={dashStyles.navItem}
            onClick={() => label === "Home" && router.push("/dashboard")}
          >
            <span className={dashStyles.navItemIcon}><Icon size={17} /></span>
            <span className={dashStyles.navItemLabel}>{label}</span>
          </button>
        ))}
      </nav>

      <div className={dashStyles.sidebarBottom}>
        <div className={`${dashStyles.novaCard} ${styles.novaCardActive}`}>
          <div className={dashStyles.novaCardProfile}>
            <img src="/nova-avatar.jpg" alt="Nova" className={dashStyles.novaCardAvatar} />
            <div className={dashStyles.novaCardInfo}>
              <span className={dashStyles.novaCardName}>Nova</span>
              <span className={dashStyles.novaCardSub}>Payment Operations Partner</span>
              <span className={dashStyles.novaCardStatus}>
                <span className={dashStyles.novaStatusDot} />
                Online
              </span>
            </div>
          </div>
          <p className={dashStyles.novaCardBody}>
            Helping you collect payments, resolve issues and keep your operations running smoothly.
          </p>
          <button className={dashStyles.novaCardCta}>
            Ask Nova
            <span className={dashStyles.novaCtaArrow}>→</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

// ── Top bar ───────────────────────────────────────────────────────────────────

function TopBar({ email }: { email: string }) {
  const localPart = email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim();
  const words = localPart.split(" ").filter(Boolean);
  const initials = words.slice(0, 2).map((w) => w[0].toUpperCase()).join("") || email[0].toUpperCase();
  const displayName = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || email;

  return (
    <header className={dashStyles.topBar}>
      <div className={dashStyles.topBarLeft}>
        <div className={dashStyles.searchBar}>
          <span className={dashStyles.searchIcon}><IconSearch size={14} /></span>
          <span className={dashStyles.searchPlaceholder}>Search</span>
          <kbd className={dashStyles.searchKbd}>⌘K</kbd>
        </div>
      </div>

      <div className={dashStyles.topBarRight}>
        <div className={dashStyles.topBarIcons}>
          <button className={dashStyles.topBarIconBtn} aria-label="Messages"><IconMessage size={16} /></button>
          <button className={dashStyles.topBarIconBtn} aria-label="Notifications"><IconBell size={16} /></button>
          <button className={dashStyles.topBarIconBtn} aria-label="Settings"><IconSettings size={16} /></button>
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

// ── Main workspace ────────────────────────────────────────────────────────────

function NovaWorkspace({ email }: { email: string }) {
  const placeholder = useTypingPlaceholder();
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const localPart = email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim();
  const words = localPart.split(" ").filter(Boolean);
  const firstName = words[0] ? words[0].charAt(0).toUpperCase() + words[0].slice(1) : "there";

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  return (
    <div className={styles.workspace}>
      {/* Avatar + glow */}
      <div className={styles.avatarSection}>
        <div className={styles.glowRing}>
          <img src="/nova-avatar.jpg" alt="Nova" className={styles.novaAvatar} />
        </div>
      </div>

      {/* Welcome */}
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeHeading}>Nice to see you again, {firstName}.</h1>
        <p className={styles.welcomeSub}>
          Ask Nova anything about your payments, customers, collections or business.<br />
          Nova can help you understand your data, automate operations and answer questions instantly.
        </p>
      </div>

      {/* Suggestion chips */}
      <div className={styles.suggestions}>
        {SUGGESTIONS.map(({ label, Icon }) => (
          <button
            key={label}
            className={styles.chip}
            onClick={() => setInputValue(label)}
          >
            <span className={styles.chipIcon}><Icon size={14} /></span>
            {label}
          </button>
        ))}
      </div>

      {/* Composer */}
      <div className={styles.composerWrap}>
        <div className={styles.composer}>
          <textarea
            ref={textareaRef}
            className={styles.composerInput}
            value={inputValue}
            onChange={handleInput}
            placeholder={placeholder}
            rows={1}
            aria-label="Message Nova"
          />
          <div className={styles.composerToolbar}>
            <div className={styles.composerLeft}>
              <button className={styles.toolbarBtn} aria-label="New"><IconPlus size={16} /></button>
              <button className={styles.toolbarBtn} aria-label="Attach file"><IconPaperclip size={16} /></button>
              <button className={styles.toolbarBtn} aria-label="Schedule"><IconCalendar size={16} /></button>
              <button className={styles.toolbarBtn} aria-label="Flag"><IconFlag size={16} /></button>
              <button className={styles.toolbarBtn} aria-label="Security"><IconShield size={16} /></button>
            </div>
            <div className={styles.composerRight}>
              <button className={styles.micBtn} aria-label="Voice input"><IconMic size={18} /></button>
              <button className={`${styles.sendBtn} ${inputValue.trim() ? styles.sendBtnActive : ""}`} aria-label="Send">
                <IconArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>

        <p className={styles.composerFooter}>
          Nova uses your Praevor account to provide personalised answers and recommendations.{" "}
          <a href="#" className={styles.footerLink}>Learn more</a>
        </p>
      </div>
    </div>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────

export function NovaWorkspaceClient({ email }: { email: string }) {
  return (
    <div className={dashStyles.shell}>
      <Sidebar />
      <div className={dashStyles.main}>
        <TopBar email={email} />
        <NovaWorkspace email={email} />
      </div>
    </div>
  );
}
