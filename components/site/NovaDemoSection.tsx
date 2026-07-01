"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./nova-demo-section.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type Platform = "whatsapp" | "slack" | "teams" | "dashboard";

interface VisibleSet {
  [key: string]: boolean;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        fill="#25D366"
      />
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.979-1.304A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
        stroke="#25D366"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function SlackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52z" fill="#E01E5A"/>
      <path d="M6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313z" fill="#E01E5A"/>
      <path d="M8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834z" fill="#36C5F0"/>
      <path d="M8.834 6.313a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312z" fill="#36C5F0"/>
      <path d="M18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834z" fill="#2EB67D"/>
      <path d="M17.688 8.834a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312z" fill="#2EB67D"/>
      <path d="M15.165 18.956a2.528 2.528 0 012.523 2.522A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52z" fill="#ECB22E"/>
      <path d="M15.165 17.688a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z" fill="#ECB22E"/>
    </svg>
  );
}

function TeamsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="15.5" cy="5.5" r="3" fill="#7B83EB"/>
      <path d="M9 10h9v7a3 3 0 01-3 3h-3a3 3 0 01-3-3v-7z" fill="#5059C9"/>
      <path d="M3 10h6v7a3 3 0 01-3 3 3 3 0 01-3-3v-7z" fill="#7B83EB"/>
      <circle cx="6" cy="6" r="3" fill="#7B83EB"/>
      <path d="M18 10h3v5a2 2 0 01-2 2 2 2 0 01-2-2v-5h1z" fill="#5059C9"/>
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity=".8"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity=".6"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" opacity=".6"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor" opacity=".4"/>
    </svg>
  );
}

// ─── Nova avatar ──────────────────────────────────────────────────────────────

function NovaAvatarImg({ className }: { className?: string }) {
  return (
    <img
      src="/nova-avatar.jpg"
      alt="Nova"
      className={`${styles.novaAvatar} ${className ?? ""}`}
    />
  );
}

function DanielInitial({ className }: { className?: string }) {
  return (
    <div className={`${styles.initialAvatar} ${styles.avatarDaniel} ${className ?? ""}`}>
      D
    </div>
  );
}

function EmmaInitial({ className }: { className?: string }) {
  return (
    <div className={`${styles.initialAvatar} ${styles.avatarEmma} ${className ?? ""}`}>
      E
    </div>
  );
}

function JamesInitial({ className }: { className?: string }) {
  return (
    <div className={`${styles.initialAvatar} ${styles.avatarJames} ${className ?? ""}`}>
      J
    </div>
  );
}

// ─── Slack UI icons ───────────────────────────────────────────────────────────

function SlackChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden>
      <path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z" />
    </svg>
  );
}

function SlackComposeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
      <path d="M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 011.414 0l2.829 2.829a1 1 0 010 1.414L7.243 18zM3 20h18v2H3v-2z" />
    </svg>
  );
}

function SlackThreadsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
      <path d="M12 2C17.523 2 22 6.477 22 12s-4.477 10-10 10c-1.702 0-3.305-.425-4.708-1.175L2 22l1.176-5.29C2.426 15.306 2 13.703 2 12 2 6.477 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm-3.5 6a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm7 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
    </svg>
  );
}

function SlackDraftsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
      <path d="M21 3a1 1 0 011 1v14a1 1 0 01-1 1H6.455L2 22.5V4a1 1 0 011-1h18zm-1 2H4v13.385L5.763 17H20V5zm-7 2v2h4v2h-6V7h2z" />
    </svg>
  );
}

function SlackMoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
      <path d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm14 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

function SlackChannelsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden>
      <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.462-6 5.5-6C9.36 3 11.072 3.802 12 5.022 12.928 3.802 14.64 3 16.5 3z" />
    </svg>
  );
}

function SlackMembersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden>
      <path d="M10 3h4a8 8 0 110 16v3.5c-5-2-12-5-12-11.5a8 8 0 018-8z" />
    </svg>
  );
}

function SlackSearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
      <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617zm-2.006-.742A6.977 6.977 0 0018 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 004.875-1.975l.15-.15z" />
    </svg>
  );
}

function SlackSendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden>
      <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
    </svg>
  );
}

function NovaAppLogo() {
  return (
    <svg width="11" height="6" viewBox="0 0 11 6" fill="none" preserveAspectRatio="none" aria-hidden>
      <path d="M10.709 1.55808C10.515 1.17565 10.2587 0.867954 9.94047 0.639053C9.62194 0.410153 9.26111 0.244472 8.85736 0.14606C8.45361 0.0513859 8.04231 0 7.62315 0H3.38078C2.96132 0 2.55001 0.0513859 2.14627 0.149798C1.73889 0.248521 1.37776 0.414201 1.05953 0.643102C0.741312 0.871691 0.488969 1.17938 0.291024 1.56213C0.0970077 1.94861 0 2.42199 0 2.9863C0 3.5503 0.0970083 3.9645 0.287096 4.34724C0.481112 4.72563 0.733454 5.04142 1.04775 5.28589C1.36234 5.53036 1.71562 5.71193 2.11151 5.82622C2.5074 5.94457 2.90722 6 3.31067 6H7.68903C8.09671 6 8.49652 5.94083 8.88848 5.82622C9.28045 5.71193 9.63765 5.53036 9.95195 5.28589C10.2665 5.04142 10.5186 4.72563 10.709 4.34724C10.8991 3.9645 11 3.51074 11 2.9863C11 2.46154 10.903 1.94488 10.705 1.56213L10.709 1.55808ZM9.35811 3.82249C9.24569 4.05139 9.10184 4.2289 8.92354 4.36282C8.74494 4.49704 8.53521 4.59545 8.29858 4.65462C8.06165 4.7138 7.81717 4.74151 7.56089 4.74151H6.88577C6.88577 4.73747 4.12602 4.73747 4.12602 4.73747C4.12602 4.74151 3.45059 4.74151 3.45059 4.74151C3.19432 4.74151 2.94983 4.71006 2.7129 4.65462C2.47628 4.59545 2.26655 4.49704 2.08824 4.36282C1.90964 4.2289 1.76216 4.04734 1.65337 3.82249C1.54458 3.59763 1.49048 3.31766 1.49048 2.9863C1.49048 2.65494 1.54458 2.36686 1.65337 2.14201C1.76216 1.92121 1.90571 1.74369 2.08824 1.60947C2.26655 1.47929 2.47628 1.38057 2.70535 1.32544C2.93442 1.26627 3.17498 1.23855 3.41553 1.23855H7.59202C7.84044 1.23855 8.07344 1.26627 8.30613 1.32544C8.53914 1.38057 8.74101 1.47524 8.92354 1.60947C9.10184 1.74369 9.24932 1.92121 9.35811 2.14201C9.46691 2.36686 9.5213 2.64684 9.5213 2.9863C9.5213 3.32544 9.46691 3.60168 9.35811 3.82249Z" fill="#FFFFFF" />
    </svg>
  );
}

function NovaAppAvatar({ className }: { className?: string }) {
  return (
    <div className={`${styles.slackNovaAppAvatar} ${className ?? ""}`}>
      <NovaAppLogo />
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator({ platform }: { platform?: "slack" | "teams" }) {
  if (platform === "slack") {
    return (
      <div className={styles.slackThinkingRow}>
        <span className={styles.slackThinkingText}>
          <strong>Nova</strong> is thinking...
        </span>
      </div>
    );
  }

  return (
    <div className={`${styles.typingRow} ${platform === "teams" ? styles.typingRowTeams : ""}`}>
      <NovaAvatarImg className={styles.typingAvatar} />
      <div className={styles.typingBubble}>
        <span className={styles.typingText}>Nova is typing</span>
        <span className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
      </div>
    </div>
  );
}

// ─── SLACK mockup ─────────────────────────────────────────────────────────────

function SlackMockup() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState<VisibleSet>({});
  const [btnClicked, setBtnClicked] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const started = useRef(false);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
      });
    });
  }, []);

  const show = useCallback((id: string, delay: number) => {
    const t = setTimeout(() => {
      setVis((p) => ({ ...p, [id]: true }));
    }, delay);
    timers.current.push(t);
  }, []);

  const hide = useCallback((id: string, delay: number) => {
    const t = setTimeout(() => setVis((p) => ({ ...p, [id]: false })), delay);
    timers.current.push(t);
  }, []);

  const runSequence = useCallback(() => {
    setBtnClicked(false);
    setVis({});

    // 0ms — Daniel first message
    show("d1", 0);
    // 800ms — Nova typing
    show("nt1", 800);
    // 2500ms — Nova reply
    hide("nt1", 2500);
    show("n1", 2500);
    // 4000ms — Daniel 2
    show("d2", 4000);
    // 5000ms — Nova typing
    show("nt2", 5000);
    // 7000ms — Nova reply + card + buttons
    hide("nt2", 7000);
    show("n2", 7000);
    show("n2card", 7800);
    show("n2btns", 8800);
    // 10000ms — auto-click "Send to customer"
    const tClick = setTimeout(() => setBtnClicked(true), 10000);
    timers.current.push(tClick);
    // 11000ms — Nova continuation
    show("n3", 11000);
    // 13500ms — Emma
    show("e1", 13500);
    // 15000ms — Nova typing
    show("nt3", 15000);
    // 16500ms — Nova update
    hide("nt3", 16500);
    show("n4", 16500);
    show("r1", 16800);
    // 19000ms — Nova continuation
    show("n5", 19000);
    show("r2", 19300);
    // 22000ms — reset
    const tReset = setTimeout(() => {
      setVis({});
      setBtnClicked(false);
      const tRestart = setTimeout(runSequence, 800);
      timers.current.push(tRestart);
    }, 22000);
    timers.current.push(tReset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, hide]);

  useEffect(() => {
    scrollToBottom();
    const t = setTimeout(scrollToBottom, 360);
    return () => clearTimeout(t);
  }, [vis, btnClicked, scrollToBottom]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();
          runSequence();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [runSequence]);

  return (
    <div className={styles.slackWindow}>
      <div className={styles.slackWindowInset} aria-hidden />

      {/* Sidebar */}
      <div className={styles.slackSidebar}>
        <div className={styles.slackWorkspace}>
          <div className={styles.slackWorkspaceLeft}>
            <span className={styles.slackWorkspaceName}>Praevor HQ</span>
            <span className={styles.slackWorkspaceChevron}><SlackChevronDown /></span>
          </div>
          <div className={styles.slackComposeBtn}>
            <SlackComposeIcon />
          </div>
        </div>

        <div className={styles.slackNavItems}>
          <div className={styles.slackNavItem}>
            <SlackThreadsIcon />
            <span>Threads</span>
          </div>
          <div className={styles.slackNavItem}>
            <SlackDraftsIcon />
            <span>Drafts &amp; Sent</span>
          </div>
          <div className={styles.slackNavItem}>
            <SlackMoreIcon />
            <span>More</span>
          </div>
        </div>

        <div className={styles.slackDivider} />

        <div className={styles.slackSidebarSection}>
          <div className={styles.slackSidebarLabel}>
            <SlackChannelsIcon />
            <span>Channels</span>
          </div>
          <div className={styles.slackChannel}>
            <span className={styles.slackChannelHash}>#</span>
            <span>general</span>
          </div>
          <div className={`${styles.slackChannel} ${styles.slackChannelActive}`}>
            <span className={styles.slackChannelHash}>#</span>
            <span>payments-ops</span>
          </div>
          <div className={styles.slackChannel}>
            <span className={styles.slackChannelHash}>#</span>
            <span>finance</span>
          </div>
          <div className={styles.slackChannel}>
            <span className={styles.slackChannelHash}>#</span>
            <span>ops</span>
          </div>
        </div>

        <div className={styles.slackDivider} />

        <div className={styles.slackSidebarSection}>
          <div className={styles.slackSidebarLabel}>
            <SlackMembersIcon />
            <span>Members</span>
          </div>
          <div className={styles.slackMember}>
            <div className={styles.slackMemberAvatarWrap}>
              <NovaAppAvatar className={styles.slackMemberAppAvatar} />
              <span className={styles.slackPresenceDot} />
            </div>
            <span>Nova</span>
          </div>
          <div className={styles.slackMember}>
            <div className={styles.slackMemberAvatarWrap}>
              <DanielInitial className={styles.slackMemberInitial} />
              <span className={styles.slackPresenceDot} />
            </div>
            <span>Daniel</span>
          </div>
          <div className={styles.slackMember}>
            <div className={styles.slackMemberAvatarWrap}>
              <EmmaInitial className={styles.slackMemberInitial} />
              <span className={styles.slackPresenceDot} />
            </div>
            <span>Emma</span>
          </div>
          <div className={styles.slackMember}>
            <div className={styles.slackMemberAvatarWrap}>
              <JamesInitial className={styles.slackMemberInitial} />
              <span className={`${styles.slackPresenceDot} ${styles.slackPresenceAway}`} />
            </div>
            <span>James</span>
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className={styles.slackMain}>
        <div className={styles.slackHeader}>
          <div className={styles.slackHeaderLeft}>
            <span className={styles.slackHeaderHash}>#</span>
            <span className={styles.slackHeaderChannel}>payments-ops</span>
          </div>
          <div className={styles.slackHeaderRight}>
            <span className={styles.slackHeaderMembers}>Nova, Emma, Daniel, James +2</span>
            <div className={styles.slackHeaderSearch}>
              <SlackSearchIcon />
            </div>
          </div>
        </div>

        <div className={styles.slackFeed} ref={scrollRef}>
          <div className={styles.slackDateDivider}>
            <div className={styles.slackDateLine} />
            <span className={styles.slackDateLabel}>Today</span>
            <div className={styles.slackDateLine} />
          </div>

          {/* Daniel — first message group */}
          <div className={`${styles.slackMsgGroup} ${vis["d1"] ? styles.msgVisible : ""}`}>
            <DanielInitial className={styles.msgAvatar} />
            <div className={styles.msgContent}>
              <div className={styles.msgMeta}>
                <span className={styles.msgName}>Daniel</span>
                <span className={styles.msgTime}>10:14 AM</span>
              </div>
              <p className={styles.msgText}>Morning everyone. We&apos;ve just signed Green Leaf Nursery.</p>
              <p className={styles.msgText}>@Nova can you get their monthly recurring payment ready?</p>
            </div>
          </div>

          {vis["nt1"] && <TypingIndicator platform="slack" />}

          {/* Nova — reply */}
          <div className={`${styles.slackMsgGroup} ${vis["n1"] ? styles.msgVisible : ""}`}>
            <NovaAppAvatar className={styles.msgAvatar} />
            <div className={styles.msgContent}>
              <div className={styles.msgMeta}>
                <span className={styles.msgName}>Nova</span>
                <span className={styles.msgAppBadge}>App</span>
                <span className={styles.msgTime}>10:14 AM</span>
              </div>
              <p className={styles.msgText}>Happy to. What&apos;s the monthly amount, and when should the first collection go out?</p>
            </div>
          </div>

          {/* Daniel — second message group */}
          <div className={`${styles.slackMsgGroup} ${vis["d2"] ? styles.msgVisible : ""}`}>
            <DanielInitial className={styles.msgAvatar} />
            <div className={styles.msgContent}>
              <div className={styles.msgMeta}>
                <span className={styles.msgName}>Daniel</span>
                <span className={styles.msgTime}>10:15 AM</span>
              </div>
              <p className={styles.msgText}>&pound;240 a month. Starts 1 August.</p>
            </div>
          </div>

          {vis["nt2"] && <TypingIndicator platform="slack" />}

          {/* Nova — with rich card + action buttons */}
          <div className={`${styles.slackMsgGroup} ${vis["n2"] ? styles.msgVisible : ""}`}>
            <NovaAppAvatar className={styles.msgAvatar} />
            <div className={styles.msgContent}>
              <div className={styles.msgMeta}>
                <span className={styles.msgName}>Nova</span>
                <span className={styles.msgAppBadge}>App</span>
                <span className={styles.msgTime}>10:15 AM</span>
              </div>
              <p className={styles.msgText}>Perfect. Everything is ready.</p>

              <div className={`${styles.richCard} ${vis["n2card"] ? styles.richCardVisible : ""}`}>
                <div className={styles.richCardAccent} />
                <div className={styles.richCardBody}>
                  <div className={styles.richCardLabel}>Recurring Payment</div>
                  <div className={styles.richCardTitle}>Green Leaf Nursery</div>
                  <div className={styles.richCardRow}><span>Amount</span><span>&pound;240 / month</span></div>
                  <div className={styles.richCardRow}><span>Starts</span><span>1 August</span></div>
                  <div className={styles.richCardRow}><span>Status</span><span className={styles.richCardStatus}>Ready to send</span></div>
                </div>
              </div>

              <p className={styles.msgText}>Would you like me to send the payment request directly to Green Leaf Nursery?</p>

              {vis["n2btns"] && (
                <div className={styles.actionButtons}>
                  <button
                    className={`${styles.btnPrimary} ${btnClicked ? styles.btnClicked : ""}`}
                    disabled={btnClicked}
                    type="button"
                  >
                    Send to customer
                  </button>
                  <button
                    className={styles.btnGhost}
                    disabled={btnClicked}
                    type="button"
                  >
                    Review first
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Nova — continuation (no avatar) */}
          <div className={`${styles.slackMsgContinuation} ${vis["n3"] ? styles.msgVisible : ""}`}>
            <div className={styles.msgContinuationSpacer} />
            <div className={styles.msgContent}>
              <p className={styles.msgText}>Done. The payment request has been sent. I&apos;ll keep this channel updated.</p>
            </div>
          </div>

          {/* Emma */}
          <div className={`${styles.slackMsgGroup} ${vis["e1"] ? styles.msgVisible : ""}`}>
            <EmmaInitial className={styles.msgAvatar} />
            <div className={styles.msgContent}>
              <div className={styles.msgMeta}>
                <span className={styles.msgName}>Emma</span>
                <span className={styles.msgTime}>10:16 AM</span>
              </div>
              <p className={styles.msgText}>&#128077;</p>
            </div>
          </div>

          {vis["nt3"] && <TypingIndicator platform="slack" />}

          {/* Nova — update */}
          <div className={`${styles.slackMsgGroup} ${vis["n4"] ? styles.msgVisible : ""}`}>
            <NovaAppAvatar className={styles.msgAvatar} />
            <div className={styles.msgContent}>
              <div className={styles.msgMeta}>
                <span className={styles.msgName}>Nova</span>
                <span className={styles.msgAppBadge}>App</span>
                <span className={styles.msgTime}>10:22 AM</span>
              </div>
              <p className={styles.msgText}>Update. Green Leaf Nursery has opened the payment request.</p>
              <div className={`${styles.reactions} ${vis["r1"] ? styles.reactionsVisible : ""}`}>
                <span className={styles.reaction}>&#128064; 2</span>
              </div>
            </div>
          </div>

          {/* Nova — continuation */}
          <div className={`${styles.slackMsgContinuation} ${vis["n5"] ? styles.msgVisible : ""}`}>
            <div className={styles.msgContinuationSpacer} />
            <div className={styles.msgContent}>
              <p className={styles.msgText}>The Direct Debit mandate has been completed. First collection scheduled for 1 August.</p>
              <div className={`${styles.reactions} ${vis["r2"] ? styles.reactionsVisible : ""}`}>
                <span className={styles.reaction}>&#127881; 3</span>
                <span className={styles.reaction}>&#10084;&#65039; 2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Composer */}
        <div className={styles.slackComposerWrap}>
          <div className={styles.slackComposer}>
            <div className={styles.slackComposerInset} aria-hidden />
            <div className={styles.slackComposerToolbar}>
              <div className={styles.slackComposerTool} aria-hidden>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8 11h4.5a2.5 2.5 0 100-5H8v5zm10 4.5a4.5 4.5 0 01-4.5 4.5H6V4h6.5a4.5 4.5 0 013.256 7.606A4.498 4.498 0 0118 15.5zM8 13v5h5.5a2.5 2.5 0 100-5H8z" /></svg>
              </div>
              <div className={styles.slackComposerTool} aria-hidden>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z" /></svg>
              </div>
              <div className={styles.slackComposerTool} aria-hidden>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.586-1.144V16.6c1.52.877 3.075 1.4 4.586 1.4 2.56 0 3.689-.897 3.689-2.28 0-.468-.089-.862-.267-1.12H2v-2h20v2h-4.846zM7.556 11c-.14-.386-.222-.822-.222-1.32 0-1.268.497-2.283 1.489-3.047C9.813 5.878 11.18 5.5 12.914 5.5c1.463 0 2.884.323 4.086.97v2.19c-1.262-.67-2.633-1.005-4.086-1.005-2.412 0-3.617.782-3.617 2.065 0 .382.104.692.197.88H7.556z" /></svg>
              </div>
              <div className={styles.slackComposerToolDivider} />
              <div className={styles.slackComposerTool} aria-hidden>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 10-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 019.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 01-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 107.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z" /></svg>
              </div>
              <div className={styles.slackComposerTool} aria-hidden>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 6.9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" /></svg>
              </div>
            </div>
            <div className={styles.slackComposerInput}>
              <span className={styles.slackComposerPlaceholder}>Message #payments-ops</span>
            </div>
            <div className={styles.slackComposerFooter}>
              <div className={styles.slackComposerFooterLeft}>
                <div className={styles.slackComposerTool} aria-hidden>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" /></svg>
                </div>
                <div className={styles.slackComposerTool} aria-hidden>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-5-7h2a3 3 0 006 0h2a5 5 0 01-10 0zm1-2a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm8 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" /></svg>
                </div>
                <div className={styles.slackComposerTool} aria-hidden>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20 12a8 8 0 10-3.562 6.657l1.11 1.664A9.953 9.953 0 0112 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10v1.5a3.5 3.5 0 01-6.396 1.966A5 5 0 1117 12h-2a3 3 0 10-1.528 2.612A1.5 1.5 0 0020 13.5V12z" /></svg>
                </div>
              </div>
              <div className={styles.slackComposerSend}>
                <SlackSendIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TEAMS mockup ─────────────────────────────────────────────────────────────

function TeamsMockup() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState<VisibleSet>({});
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const started = useRef(false);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
      });
    });
  }, []);

  const show = useCallback((id: string, delay: number) => {
    const t = setTimeout(() => {
      setVis((p) => ({ ...p, [id]: true }));
    }, delay);
    timers.current.push(t);
  }, []);

  const hide = useCallback((id: string, delay: number) => {
    const t = setTimeout(() => setVis((p) => ({ ...p, [id]: false })), delay);
    timers.current.push(t);
  }, []);

  const runSequence = useCallback(() => {
    setVis({});
    show("e1", 0);
    show("nt1", 800);
    hide("nt1", 2200);
    show("n1", 2200);
    show("e2", 4000);
    show("nt2", 5500);
    hide("nt2", 7500);
    show("n2", 7500);
    show("j1", 9000);
    show("n3", 10500);
    const t = setTimeout(() => {
      setVis({});
      const t2 = setTimeout(runSequence, 800);
      timers.current.push(t2);
    }, 18000);
    timers.current.push(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, hide]);

  useEffect(() => {
    scrollToBottom();
    const t = setTimeout(scrollToBottom, 360);
    return () => clearTimeout(t);
  }, [vis, scrollToBottom]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();
          runSequence();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [runSequence]);

  return (
    <div className={styles.teamsWindow}>
      <div className={styles.teamsTitleBar}>
        <div className={styles.teamsTitleBarLogo} aria-hidden>
          <TeamsIcon />
        </div>

        <div className={styles.teamsTitleBarCenter}>
          <span className={styles.teamsTitleBarNavBtn} aria-hidden>
            <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
              <path d="M11.8 4.2a1 1 0 011.4 1.4L8.6 10l4.6 4.4a1 1 0 01-1.4 1.4l-5.4-5.2a1 1 0 010-1.4l5.4-5z" />
            </svg>
          </span>
          <span className={styles.teamsTitleBarNavBtn} aria-hidden>
            <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
              <path d="M8.2 4.2a1 1 0 00-1.4 1.4L11.4 10l-4.6 4.4a1 1 0 001.4 1.4l5.4-5.2a1 1 0 000-1.4l-5.4-5z" />
            </svg>
          </span>
          <div className={styles.teamsTitleBarSearchBox}>
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden>
              <path d="M8.5 3a5.5 5.5 0 014.23 8.98l3.27 3.27a.75.75 0 11-1.06 1.06l-3.27-3.27A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            <span>Search</span>
          </div>
        </div>

        <div className={styles.teamsTitleBarRight} aria-hidden>
          <span className={styles.teamsTitleBarIconBtn}>
            <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" aria-hidden>
              <circle cx="4" cy="10" r="1.25" />
              <circle cx="10" cy="10" r="1.25" />
              <circle cx="16" cy="10" r="1.25" />
            </svg>
          </span>
          <span className={styles.teamsTitleBarAvatarWrap}>
            <span className={`${styles.teamsTitleBarAvatar} ${styles.teamsAvatarEmma}`}>E</span>
            <span className={styles.teamsTitleBarPresence} />
          </span>
          <div className={styles.teamsTitleBarControls}>
            <span className={styles.teamsWinControl}>
              <svg viewBox="0 0 10 1" width="10" height="1" aria-hidden>
                <rect width="10" height="1" rx="0.5" fill="currentColor" />
              </svg>
            </span>
            <span className={styles.teamsWinControl}>
              <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden>
                <rect x="0.5" y="0.5" width="9" height="9" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </span>
            <span className={styles.teamsWinControl}>
              <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden>
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.teamsBody}>
        {/* App bar */}
        <div className={styles.teamsRail}>
          <div className={styles.teamsRailTab}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 22a2 2 0 002-2h-4a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2v1h16v-1l-2-2z" />
            </svg>
            <span>Activity</span>
          </div>
          <div className={`${styles.teamsRailTab} ${styles.teamsRailTabActive}`}>
            <span className={styles.teamsRailBadge}>1</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2z" />
            </svg>
            <span>Chat</span>
          </div>
          <div className={styles.teamsRailTab}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M9 12a3 3 0 106 0 3 3 0 00-6 0zm-7 8v-1.5A4.5 4.5 0 019.5 14h5A4.5 4.5 0 0120 18.5V20H2zM16 7a4 4 0 11-8 0 4 4 0 018 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zm-2 4.5V20h6v-1.5a3.5 3.5 0 00-3.5-3.5h-1A3.5 3.5 0 0014 15.5z" />
            </svg>
            <span>Teams</span>
          </div>
          <div className={styles.teamsRailTab}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H6zm0 2h12v16H6V4zm2 2h8v2H8V6zm0 4h8v2H8v-2z" />
            </svg>
            <span>Calendar</span>
          </div>
        </div>

        {/* Chat list */}
        <div className={styles.teamsPanel}>
          <div className={styles.teamsPanelHeader}>
            <span className={styles.teamsPanelTitle}>Chat</span>
            <span className={styles.teamsPanelHeaderIcon} aria-hidden>&#9662;</span>
          </div>
          <div className={styles.teamsPanelSectionLabel}>
            <span className={styles.teamsPanelChevron}>&#9656;</span>
            <span>Teams and channels</span>
          </div>
          <div className={styles.teamsTeam}>
            <span className={styles.teamsTeamChevron}>&#9656;</span>
            <span className={styles.teamsTeamName}>Operations</span>
          </div>
          <div className={styles.teamsChannelList}>
            <div className={styles.teamsChannelItem}>General</div>
            <div className={`${styles.teamsChannelItem} ${styles.teamsChannelItemActive}`}>Payments</div>
            <div className={styles.teamsChannelItem}>Finance</div>
          </div>
        </div>

        {/* Main conversation */}
        <div className={styles.teamsMain}>
          <div className={styles.teamsHeader}>
            <div className={styles.teamsHeaderLeft}>
              <div className={`${styles.teamsAvatar} ${styles.teamsAvatarGroup}`} aria-hidden>
                <span className={styles.teamsAvatarGroupTile} style={{ background: "#7B83EB" }}>E</span>
                <span className={styles.teamsAvatarGroupTile} style={{ background: "#5059C9" }}>J</span>
              </div>
              <div>
                <span className={styles.teamsHeaderTitle}>Payments</span>
                <span className={styles.teamsHeaderSub}>Operations &middot; 4 members</span>
              </div>
            </div>
            <div className={styles.teamsHeaderTabs}>
              <span className={`${styles.teamsHeaderTab} ${styles.teamsHeaderTabActive}`}>Posts</span>
              <span className={styles.teamsHeaderTab}>Files</span>
            </div>
          </div>

          <div className={styles.teamsFeed} ref={scrollRef}>
            <div className={`${styles.teamsMsgGroup} ${vis["e1"] ? styles.msgVisible : ""}`}>
              <div className={`${styles.teamsAvatar} ${styles.teamsAvatarEmma}`}>E</div>
              <div className={styles.teamsMsgContent}>
                <div className={styles.teamsMsgMeta}>
                  <span className={styles.teamsMsgName}>Emma</span>
                  <span className={styles.teamsMsgTime}>Yesterday 9:02 AM</span>
                </div>
                <div className={styles.teamsMsgBubble}>
                  <p className={styles.teamsMsgText}>Morning everyone. Has Oakwood Care completed their direct debit yet?</p>
                </div>
                <div className={styles.teamsMsgLikeBar}>
                  <span>&#128077; Like</span>
                  <span>Reply</span>
                </div>
              </div>
            </div>

            {vis["nt1"] && <TypingIndicator platform="teams" />}

            <div className={`${styles.teamsMsgGroup} ${vis["n1"] ? styles.msgVisible : ""}`}>
              <NovaAvatarImg className={styles.teamsAvatarNovaImg} />
              <div className={styles.teamsMsgContent}>
                <div className={styles.teamsMsgMeta}>
                  <span className={`${styles.teamsMsgName} ${styles.teamsMsgNameNova}`}>Nova</span>
                  <span className={styles.teamsMsgTime}>9:03 AM</span>
                </div>
                <div className={styles.teamsMsgBubble}>
                  <p className={styles.teamsMsgText}>Not yet. They viewed the request yesterday but haven&apos;t authorised. I&apos;ve scheduled a reminder for this morning.</p>
                </div>
                <div className={styles.teamsMsgLikeBar}>
                  <span>&#128077; Like</span>
                  <span>Reply</span>
                </div>
              </div>
            </div>

            <div className={`${styles.teamsMsgGroup} ${vis["e2"] ? styles.msgVisible : ""}`}>
              <div className={`${styles.teamsAvatar} ${styles.teamsAvatarEmma}`}>E</div>
              <div className={styles.teamsMsgContent}>
                <div className={styles.teamsMsgMeta}>
                  <span className={styles.teamsMsgName}>Emma</span>
                  <span className={styles.teamsMsgTime}>9:04 AM</span>
                </div>
                <div className={styles.teamsMsgBubble}>
                  <p className={styles.teamsMsgText}>Perfect. Thanks for keeping an eye on it.</p>
                </div>
                <div className={styles.teamsMsgLikeBar}>
                  <span>&#128077; Like</span>
                  <span>Reply</span>
                </div>
              </div>
            </div>

            {vis["nt2"] && <TypingIndicator platform="teams" />}

            <div className={`${styles.teamsMsgGroup} ${vis["n2"] ? styles.msgVisible : ""}`}>
              <NovaAvatarImg className={styles.teamsAvatarNovaImg} />
              <div className={styles.teamsMsgContent}>
                <div className={styles.teamsMsgMeta}>
                  <span className={`${styles.teamsMsgName} ${styles.teamsMsgNameNova}`}>Nova</span>
                  <span className={styles.teamsMsgTime}>9:41 AM</span>
                </div>
                <div className={styles.teamsMsgBubble}>
                  <p className={styles.teamsMsgText}>Update. Oakwood Care has now completed the authorisation. First collection is scheduled for Monday.</p>
                </div>
                <div className={styles.teamsMsgLikeBar}>
                  <span>&#128077; Like</span>
                  <span>Reply</span>
                </div>
              </div>
            </div>

            <div className={`${styles.teamsMsgGroup} ${vis["j1"] ? styles.msgVisible : ""}`}>
              <div className={`${styles.teamsAvatar} ${styles.teamsAvatarJames}`}>J</div>
              <div className={styles.teamsMsgContent}>
                <div className={styles.teamsMsgMeta}>
                  <span className={styles.teamsMsgName}>James</span>
                  <span className={styles.teamsMsgTime}>9:42 AM</span>
                </div>
                <div className={styles.teamsMsgBubble}>
                  <p className={styles.teamsMsgText}>Brilliant. One less thing to chase.</p>
                </div>
                <div className={styles.teamsMsgLikeBar}>
                  <span>&#128077; Like</span>
                  <span>Reply</span>
                </div>
              </div>
            </div>

            <div className={`${styles.teamsMsgGroup} ${vis["n3"] ? styles.msgVisible : ""}`}>
              <NovaAvatarImg className={styles.teamsAvatarNovaImg} />
              <div className={styles.teamsMsgContent}>
                <div className={styles.teamsMsgMeta}>
                  <span className={`${styles.teamsMsgName} ${styles.teamsMsgNameNova}`}>Nova</span>
                  <span className={styles.teamsMsgTime}>9:42 AM</span>
                </div>
                <div className={styles.teamsMsgBubble}>
                  <p className={styles.teamsMsgText}>I&apos;ll notify the team once the payment settles.</p>
                </div>
                <div className={styles.teamsMsgLikeBar}>
                  <span>&#128077; Like</span>
                  <span>Reply</span>
                </div>
              </div>
            </div>

          </div>

          <div className={styles.teamsComposer}>
            <div className={styles.teamsComposerBar}>
              <span className={styles.teamsComposerPlaceholder}>Start a new conversation. Type @ to mention someone.</span>
            </div>
            <div className={styles.teamsComposerToolbar}>
              <span className={styles.teamsComposerTool} aria-hidden>A</span>
              <span className={styles.teamsComposerTool} aria-hidden>&#128522;</span>
              <span className={styles.teamsComposerTool} aria-hidden>&#128206;</span>
              <span className={styles.teamsComposerTool} aria-hidden>&#8230;</span>
              <span className={styles.teamsComposerSend} aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── WHATSAPP mockup ──────────────────────────────────────────────────────────

function WhatsAppMockup() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState<VisibleSet>({});
  const [btnClicked, setBtnClicked] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const started = useRef(false);

  const show = useCallback((id: string, delay: number) => {
    const t = setTimeout(() => {
      setVis((p) => ({ ...p, [id]: true }));
      requestAnimationFrame(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      });
    }, delay);
    timers.current.push(t);
  }, []);

  const hide = useCallback((id: string, delay: number) => {
    const t = setTimeout(() => setVis((p) => ({ ...p, [id]: false })), delay);
    timers.current.push(t);
  }, []);

  const runSequence = useCallback(() => {
    setVis({});
    setBtnClicked(null);
    show("d1", 0);
    show("nt1", 1200);
    hide("nt1", 2800);
    show("n1", 2800);
    show("d2", 4200);
    show("nt2", 5200);
    hide("nt2", 7000);
    show("n2a", 7000);
    show("n2b", 7400);
    show("wabtns", 8500);
    const t1 = setTimeout(() => setBtnClicked("copy"), 9800);
    timers.current.push(t1);
    show("n3", 10800);
    show("d3", 13500);
    show("nt3", 14500);
    hide("nt3", 16000);
    show("n4", 16000);
    show("wabtns2", 17500);
    const t2 = setTimeout(() => setBtnClicked("remind"), 19000);
    timers.current.push(t2);
    show("n5", 20000);
    show("n6", 23000);
    const t3 = setTimeout(() => {
      setVis({});
      setBtnClicked(null);
      const t4 = setTimeout(runSequence, 800);
      timers.current.push(t4);
    }, 26000);
    timers.current.push(t3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, hide]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();
          runSequence();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [runSequence]);

  return (
    <div className={styles.phoneFrame}>
      <div className={styles.phoneDynamicIsland} />
      <div className={styles.phoneScreen}>
        <div className={styles.waHeader}>
          <NovaAvatarImg className={styles.waHeaderAvatar} />
          <div className={styles.waHeaderInfo}>
            <span className={styles.waHeaderName}>Nova</span>
            <span className={styles.waHeaderStatus}>
              <span className={styles.waOnlineDot} />
              online
            </span>
          </div>
          <div className={styles.waHeaderIcons}>
            <span className={styles.waHeaderIcon}>&#128249;</span>
            <span className={styles.waHeaderIcon}>&#128222;</span>
          </div>
        </div>

        <div className={styles.waChat} ref={scrollRef}>
          <div className={`${styles.waBubbleRow} ${styles.waBubbleRight} ${vis["d1"] ? styles.msgVisible : ""}`}>
            <div className={`${styles.waBubble} ${styles.waBubbleOut}`}>
              Morning Nova. Can you create a payment link for our new client?
            </div>
          </div>

          {vis["nt1"] && (
            <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft}`}>
              <NovaAvatarImg className={styles.waAvatar} />
              <div className={styles.typingBubble}>
                <span className={styles.dots}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </span>
              </div>
            </div>
          )}

          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n1"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Of course. How much would you like to collect?
            </div>
          </div>

          <div className={`${styles.waBubbleRow} ${styles.waBubbleRight} ${vis["d2"] ? styles.msgVisible : ""}`}>
            <div className={`${styles.waBubble} ${styles.waBubbleOut}`}>
              &pound;850.
            </div>
          </div>

          {vis["nt2"] && (
            <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft}`}>
              <NovaAvatarImg className={styles.waAvatar} />
              <div className={styles.typingBubble}>
                <span className={styles.dots}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </span>
              </div>
            </div>
          )}

          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n2a"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Done. I&apos;ve created the payment link.
            </div>
          </div>
          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n2b"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Would you like me to send it to the customer, or copy the link?
            </div>
          </div>

          {vis["wabtns"] && (
            <div className={`${styles.waBubbleRow} ${styles.waBubbleRight} ${styles.msgVisible}`}>
              <div className={styles.actionButtons}>
                <button
                  className={styles.btnGhost}
                  disabled={btnClicked === "copy"}
                  type="button"
                >
                  Send to customer
                </button>
                <button
                  className={`${styles.btnPrimary} ${btnClicked === "copy" ? styles.btnClicked : ""}`}
                  disabled={btnClicked === "copy"}
                  type="button"
                >
                  {btnClicked === "copy" ? <span className={styles.btnSpinner} aria-hidden /> : "Copy link"}
                </button>
              </div>
            </div>
          )}

          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n3"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Copied. The payment page stays active for 30 days.
            </div>
          </div>

          <div className={`${styles.waBubbleRow} ${styles.waBubbleRight} ${vis["d3"] ? styles.msgVisible : ""}`}>
            <div className={`${styles.waBubble} ${styles.waBubbleOut}`}>
              Has Oakwood Care paid yet?
            </div>
          </div>

          {vis["nt3"] && (
            <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft}`}>
              <NovaAvatarImg className={styles.waAvatar} />
              <div className={styles.typingBubble}>
                <span className={styles.dots}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </span>
              </div>
            </div>
          )}

          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n4"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Not yet. They opened the payment page 12 minutes ago but haven&apos;t completed it. Want me to send a reminder this afternoon?
            </div>
          </div>

          {vis["wabtns2"] && (
            <div className={`${styles.waBubbleRow} ${styles.waBubbleRight} ${styles.msgVisible}`}>
              <div className={styles.actionButtons}>
                <button
                  className={`${styles.btnPrimary} ${btnClicked === "remind" ? styles.btnClicked : ""}`}
                  disabled={btnClicked === "remind"}
                  type="button"
                >
                  Yes, remind them
                </button>
                <button
                  className={styles.btnGhost}
                  disabled={btnClicked === "remind"}
                  type="button"
                >
                  Not now
                </button>
              </div>
            </div>
          )}

          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n5"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Done. I&apos;ll let you know when they&apos;ve viewed it.
            </div>
          </div>

          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n6"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Good news. Oakwood Care has completed payment. &pound;850 received. Expected settlement: Thursday.
            </div>
          </div>
        </div>

        <div className={styles.waInputBar}>
          <span className={styles.waInputPlaceholder}>Message</span>
        </div>
      </div>
      <div className={styles.phoneHomeBar} />
    </div>
  );
}

// ─── DASHBOARD mockup ─────────────────────────────────────────────────────────

function DashboardMockup() {
  return (
    <div className={styles.macbookFrame}>
      <div className={styles.macbookScreen}>
        <div className={styles.dashLayout}>
          <div className={styles.dashMain}>
            <div className={styles.dashGreeting}>Good morning, Daniel</div>
            <div className={styles.dashMetrics}>
              <div className={styles.dashMetricCard}>
                <div className={styles.dashMetricLabel}>Today&apos;s collections</div>
                <div className={styles.dashMetricValue}>&pound;12,450</div>
              </div>
              <div className={styles.dashMetricCard}>
                <div className={styles.dashMetricLabel}>Pending</div>
                <div className={styles.dashMetricValue}>&pound;3,200</div>
              </div>
              <div className={styles.dashMetricCard}>
                <div className={styles.dashMetricLabel}>Failed</div>
                <div className={`${styles.dashMetricValue} ${styles.dashMetricFailed}`}>2</div>
              </div>
            </div>

            <div className={styles.dashTableWrap}>
              <div className={styles.dashTableHeader}>
                <span>Customer</span>
                <span>Amount</span>
                <span>Status</span>
                <span>Date</span>
              </div>
              <div className={styles.dashTableRow}>
                <span>Green Leaf Nursery</span>
                <span>&pound;240.00</span>
                <span className={`${styles.dashChip} ${styles.dashChipSuccess}`}>Collected</span>
                <span>Today</span>
              </div>
              <div className={styles.dashTableRow}>
                <span>Oakwood Care</span>
                <span>&pound;1,200.00</span>
                <span className={`${styles.dashChip} ${styles.dashChipPending}`}>Pending</span>
                <span>Today</span>
              </div>
              <div className={styles.dashTableRow}>
                <span>Bramble Design</span>
                <span>&pound;580.00</span>
                <span className={`${styles.dashChip} ${styles.dashChipSuccess}`}>Collected</span>
                <span>Today</span>
              </div>
              <div className={styles.dashTableRow}>
                <span>Fern &amp; Fox Co.</span>
                <span>&pound;320.00</span>
                <span className={`${styles.dashChip} ${styles.dashChipFailed}`}>Failed</span>
                <span>Today</span>
              </div>
            </div>
          </div>

          <div className={styles.dashNovaPanel}>
            <div className={styles.dashNovaPanelHeader}>
              <NovaAvatarImg className={styles.dashNovaAvatar} />
              <span className={styles.dashNovaPanelName}>Nova</span>
              <span className={styles.dashNovaOnlineDot} />
            </div>
            <div className={styles.dashNovaMsgs}>
              <div className={styles.dashNovaMsg}>
                <NovaAvatarImg className={styles.dashNovaMsgAvatar} />
                <div className={styles.dashNovaMsgBubble}>
                  Morning. You have 2 payments that need attention today.
                </div>
              </div>
              <div className={styles.dashNovaMsg}>
                <NovaAvatarImg className={styles.dashNovaMsgAvatar} />
                <div className={styles.dashNovaMsgBubble}>
                  Bramble Design retried successfully. All clear now.
                </div>
              </div>
            </div>
            <div className={styles.dashNovaInput}>
              <span className={styles.dashNovaInputPlaceholder}>Ask Nova anything...</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.macbookBase}>
        <div className={styles.macbookNotch} />
      </div>
    </div>
  );
}

// ─── Platform tabs ────────────────────────────────────────────────────────────

const platformTabs: { id: Platform; label: string; Icon: () => React.ReactElement; caption: string }[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    Icon: WhatsAppIcon,
    caption: "Check in on your payments on the go.",
  },
  {
    id: "slack",
    label: "Slack",
    Icon: SlackIcon,
    caption: "Nova works in your team channels, not a side panel.",
  },
  {
    id: "teams",
    label: "Microsoft Teams",
    Icon: TeamsIcon,
    caption: "Nova keeps your whole operations team informed.",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    Icon: DashboardIcon,
    caption: "Full visibility. Every payment, every status.",
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export function NovaDemoSection() {
  const [activePlatform, setActivePlatform] = useState<Platform>("slack");
  const [deviceVisible, setDeviceVisible] = useState(true);
  const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTabClick = (platform: Platform) => {
    if (platform === activePlatform) return;
    setDeviceVisible(false);
    if (switchTimer.current) clearTimeout(switchTimer.current);
    switchTimer.current = setTimeout(() => {
      setActivePlatform(platform);
      setDeviceVisible(true);
    }, 220);
  };

  useEffect(() => {
    return () => {
      if (switchTimer.current) clearTimeout(switchTimer.current);
    };
  }, []);

  const activeCaption = platformTabs.find((t) => t.id === activePlatform)?.caption ?? "";

  return (
    <section className={styles.section} aria-labelledby="nova-heading">
      <div className={styles.inner}>
        {/* Left column */}
        <div className={styles.leftCol}>
          <p className={styles.eyebrow}>PRODUCT EXPERIENCE</p>
          <h2 id="nova-heading" className={styles.heading}>Meet Nova.</h2>
          <p className={styles.subtext}>Your AI teammate for payment operations.</p>
          <p className={styles.body}>
            Nova works wherever your team works. Ask questions, automate tasks and get updates, without leaving the tools you already use.
          </p>

          <div className={styles.tabs} role="tablist" aria-label="Platform">
            {platformTabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activePlatform === id}
                className={`${styles.tab} ${activePlatform === id ? styles.tabActive : ""}`}
                onClick={() => handleTabClick(id)}
                type="button"
              >
                <span className={styles.tabIcon}><Icon /></span>
                <span className={styles.tabLabel}>{label}</span>
              </button>
            ))}
          </div>

          <p className={styles.tabCaption}>{activeCaption}</p>
        </div>

        {/* Right column */}
        <div className={styles.rightCol}>
          <div
            className={`${styles.deviceWrap} ${deviceVisible ? styles.deviceVisible : styles.deviceHidden}`}
          >
            {activePlatform === "slack" && <SlackMockup />}
            {activePlatform === "teams" && <TeamsMockup />}
            {activePlatform === "whatsapp" && <WhatsAppMockup />}
            {activePlatform === "dashboard" && <DashboardMockup />}
          </div>
        </div>
      </div>
    </section>
  );
}
