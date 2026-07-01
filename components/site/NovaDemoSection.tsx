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

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator({ platform }: { platform?: "slack" | "teams" }) {
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
      {/* Sidebar */}
      <div className={styles.slackSidebar}>
        <div className={styles.slackWorkspace}>
          <span className={styles.slackWorkspaceName}>Praevor HQ</span>
          <span className={styles.slackWorkspaceChevron}>&#x25BE;</span>
        </div>
        <div className={styles.slackSidebarSection}>
          <div className={styles.slackSidebarLabel}>Channels</div>
          <div className={styles.slackChannel}># general</div>
          <div className={`${styles.slackChannel} ${styles.slackChannelActive}`}># payments-ops</div>
          <div className={styles.slackChannel}># finance</div>
          <div className={styles.slackChannel}># ops</div>
        </div>
        <div className={styles.slackSidebarSection}>
          <div className={styles.slackSidebarLabel}>Members</div>
          <div className={styles.slackMember}>
            <span className={styles.slackPresenceDot} />
            Nova
          </div>
          <div className={styles.slackMember}>
            <span className={styles.slackPresenceDot} />
            Daniel
          </div>
          <div className={styles.slackMember}>
            <span className={styles.slackPresenceDot} />
            Emma
          </div>
          <div className={styles.slackMember}>
            <span className={`${styles.slackPresenceDot} ${styles.slackPresenceAway}`} />
            James
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className={styles.slackMain}>
        <div className={styles.slackHeader}>
          <span className={styles.slackHeaderChannel}># payments-ops</span>
          <span className={styles.slackHeaderMembers}>Nova, Emma, Daniel, James +2</span>
        </div>

        <div className={styles.slackFeed} ref={scrollRef}>

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
            <NovaAvatarImg className={styles.msgAvatar} />
            <div className={styles.msgContent}>
              <div className={styles.msgMeta}>
                <span className={`${styles.msgName} ${styles.msgNameNova}`}>Nova</span>
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
            <NovaAvatarImg className={styles.msgAvatar} />
            <div className={styles.msgContent}>
              <div className={styles.msgMeta}>
                <span className={`${styles.msgName} ${styles.msgNameNova}`}>Nova</span>
                <span className={styles.msgTime}>10:15 AM</span>
              </div>
              <p className={styles.msgText}>Perfect. Everything is ready.</p>

              {/* Rich card */}
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

              {/* Action buttons */}
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
            <NovaAvatarImg className={styles.msgAvatar} />
            <div className={styles.msgContent}>
              <div className={styles.msgMeta}>
                <span className={`${styles.msgName} ${styles.msgNameNova}`}>Nova</span>
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
        <div className={styles.slackComposer}>
          <div className={styles.slackComposerInner}>
            <span className={styles.slackComposerPlaceholder}>Message #payments-ops</span>
          </div>
          <div className={styles.slackComposerActions}>
            <span className={styles.slackComposerIcon}>&#128522;</span>
            <span className={styles.slackComposerIcon}>&#128206;</span>
            <span className={styles.slackComposerIcon}>&#9993;</span>
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
      {/* Left icon rail */}
      <div className={styles.teamsRail}>
        <div className={styles.teamsRailAvatar}>E</div>
        <div className={styles.teamsRailIcon} title="Activity">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.teamsRailIcon} title="Chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={`${styles.teamsRailIcon} ${styles.teamsRailIconActive}`} title="Teams">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.teamsRailIcon} title="Calendar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <div className={styles.teamsRailIcon} title="Files">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Teams/channel panel */}
      <div className={styles.teamsPanel}>
        <div className={styles.teamsPanelHeader}>Teams</div>
        <div className={styles.teamsTeam}>
          <span className={styles.teamsTeamChevron}>&#x25BE;</span>
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
          <span className={styles.teamsHeaderTitle}>Payments</span>
          <span className={styles.teamsHeaderSub}>Operations &middot; 4 members</span>
        </div>

        <div className={styles.teamsFeed} ref={scrollRef}>

          <div className={`${styles.teamsMsgGroup} ${vis["e1"] ? styles.msgVisible : ""}`}>
            <div className={`${styles.teamsAvatar} ${styles.teamsAvatarEmma}`}>E</div>
            <div className={styles.teamsMsgContent}>
              <div className={styles.teamsMsgMeta}>
                <span className={styles.teamsMsgName}>Emma</span>
                <span className={styles.teamsMsgTime}>Yesterday 9:02 AM</span>
              </div>
              <p className={styles.teamsMsgText}>Morning everyone. Has Oakwood Care completed their direct debit yet?</p>
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
              <p className={styles.teamsMsgText}>Not yet. They viewed the request yesterday but haven&apos;t authorised. I&apos;ve scheduled a reminder for this morning.</p>
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
              <p className={styles.teamsMsgText}>Perfect. Thanks for keeping an eye on it.</p>
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
              <p className={styles.teamsMsgText}>Update. Oakwood Care has now completed the authorisation. First collection is scheduled for Monday.</p>
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
              <p className={styles.teamsMsgText}>Brilliant. One less thing to chase.</p>
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
              <p className={styles.teamsMsgText}>I&apos;ll notify the team once the payment settles.</p>
              <div className={styles.teamsMsgLikeBar}>
                <span>&#128077; Like</span>
                <span>Reply</span>
              </div>
            </div>
          </div>

        </div>

        {/* Composer */}
        <div className={styles.teamsComposer}>
          <div className={styles.teamsComposerBar}>
            <span className={styles.teamsComposerPlaceholder}>Start a new conversation</span>
          </div>
          <div className={styles.teamsComposerToolbar}>
            <span>A</span>
            <span>&#128522;</span>
            <span>&#128206;</span>
            <span>&#8230;</span>
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
