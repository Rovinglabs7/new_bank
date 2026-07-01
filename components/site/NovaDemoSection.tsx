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

// ─── Rich card ────────────────────────────────────────────────────────────────

function RichCard({ visible }: { visible: boolean }) {
  return (
    <div className={`${styles.richCard} ${visible ? styles.richCardVisible : ""}`}>
      <div className={styles.richCardIcon}>📨</div>
      <div className={styles.richCardBody}>
        <div className={styles.richCardTitle}>Payment Reminder Sent</div>
        <div className={styles.richCardName}>Bright Dental</div>
        <div className={styles.richCardDetails}>£1,240 due · Expires in 3 days</div>
        <div className={styles.richCardStatus}>
          <span className={styles.statusDot} />
          Reminder delivered
        </div>
      </div>
    </div>
  );
}

// ─── SLACK mockup ─────────────────────────────────────────────────────────────

function SlackMockup() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState<VisibleSet>({});
  const [btnClicked, setBtnClicked] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
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
    setBtnLoading(false);
    setVis({});

    // 0ms — Daniel
    show("d1", 0);
    // 800ms — Nova typing
    show("nt1", 800);
    // 2500ms — Nova reply
    hide("nt1", 2500);
    show("n1", 2500);
    // 4500ms — Daniel 2
    show("d2", 4500);
    // 5300ms — Nova typing 2
    show("nt2", 5300);
    // 7000ms — Nova reply + card
    hide("nt2", 7000);
    show("n2", 7000);
    show("n2card", 7500);
    // 10000ms — Nova 3
    show("n3", 10000);
    // 12000ms — Emma
    show("e1", 12000);
    // 13500ms — Nova typing 3
    show("nt3", 13500);
    // 15000ms — Nova reply 4
    hide("nt3", 15000);
    show("n4", 15000);
    // 17000ms — James
    show("j1", 17000);
    // 20000ms — reset
    const t3 = setTimeout(() => {
      setVis({});
      setBtnClicked(false);
      setBtnLoading(false);
      const t4 = setTimeout(runSequence, 800);
      timers.current.push(t4);
    }, 20000);
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
    <div className={styles.macbookFrame}>
      <div className={styles.macbookScreen}>
        <div className={styles.slackLayout}>
          {/* Slack sidebar */}
          <div className={styles.slackSidebar}>
            <div className={styles.slackWorkspace}>Praevor HQ</div>
            <div className={styles.slackChannels}>
              <div className={styles.slackChannel}># general</div>
              <div className={`${styles.slackChannel} ${styles.slackChannelActive}`}># payments-ops</div>
              <div className={styles.slackChannel}># finance</div>
              <div className={styles.slackChannel}># ops</div>
            </div>
            <div className={styles.slackSidebarSection}>Members</div>
            <div className={styles.slackMember}>
              <span className={styles.slackMemberDot} />
              Nova
            </div>
            <div className={styles.slackMember}>
              <span className={styles.slackMemberDot} />
              Daniel
            </div>
          </div>

          {/* Slack main */}
          <div className={styles.slackMain}>
            <div className={styles.slackHeader}>
              <div className={styles.slackHeaderChannel}>
                <span className={styles.hashIcon}>#</span> payments-ops
              </div>
              <div className={styles.slackHeaderMeta}>Nova, Emma, Daniel, James +2</div>
            </div>

            <div className={styles.slackMessages} ref={scrollRef}>
              {/* Daniel 1 */}
              <div className={`${styles.msgRow} ${vis["d1"] ? styles.msgVisible : ""}`}>
                <DanielInitial className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Daniel</span><span className={styles.msgTime}>10:14 AM</span></div>
                  <p className={styles.msgText}>@Nova Can you check who still hasn&apos;t paid this week?</p>
                </div>
              </div>

              {vis["nt1"] && <TypingIndicator platform="slack" />}

              {/* Nova 1 */}
              <div className={`${styles.msgRow} ${vis["n1"] ? styles.msgVisible : ""}`}>
                <NovaAvatarImg className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Nova</span><span className={styles.msgTime}>10:14 AM</span></div>
                  <p className={styles.msgText}>Three outstanding payments.</p>
                  <p className={styles.msgText}>Oakwood Care. £820. Reminder opened, not completed.</p>
                  <p className={styles.msgText}>Green Leaf Nursery. £240. Retry scheduled for tomorrow.</p>
                  <p className={styles.msgText}>Bright Dental. £1,240. Payment request expires in three days.</p>
                </div>
              </div>

              {/* Daniel 2 */}
              <div className={`${styles.msgRow} ${vis["d2"] ? styles.msgVisible : ""}`}>
                <DanielInitial className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Daniel</span><span className={styles.msgTime}>10:15 AM</span></div>
                  <p className={styles.msgText}>Send Bright Dental another reminder.</p>
                </div>
              </div>

              {vis["nt2"] && <TypingIndicator platform="slack" />}

              {/* Nova 2 */}
              <div className={`${styles.msgRow} ${vis["n2"] ? styles.msgVisible : ""}`}>
                <NovaAvatarImg className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Nova</span><span className={styles.msgTime}>10:15 AM</span></div>
                  <p className={styles.msgText}>Done. I&apos;ll let you know when they&apos;ve viewed it.</p>
                  <RichCard visible={!!vis["n2card"]} />
                </div>
              </div>

              {/* Nova 3 */}
              <div className={`${styles.msgRow} ${vis["n3"] ? styles.msgVisible : ""}`}>
                <NovaAvatarImg className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Nova</span><span className={styles.msgTime}>10:18 AM</span></div>
                  <p className={styles.msgText}>Bright Dental has opened the reminder.</p>
                </div>
              </div>

              {/* Emma */}
              <div className={`${styles.msgRow} ${vis["e1"] ? styles.msgVisible : ""}`}>
                <EmmaInitial className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Emma</span><span className={styles.msgTime}>10:20 AM</span></div>
                  <p className={styles.msgText}>Brilliant. One less thing to chase.</p>
                </div>
              </div>

              {vis["nt3"] && <TypingIndicator platform="slack" />}

              {/* Nova 4 */}
              <div className={`${styles.msgRow} ${vis["n4"] ? styles.msgVisible : ""}`}>
                <NovaAvatarImg className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Nova</span><span className={styles.msgTime}>10:24 AM</span></div>
                  <p className={styles.msgText}>Good news. Bright Dental has paid. £1,240 collected. Settlement expected Friday.</p>
                </div>
              </div>

              {/* James */}
              <div className={`${styles.msgRow} ${vis["j1"] ? styles.msgVisible : ""}`}>
                <JamesInitial className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>James</span><span className={styles.msgTime}>10:25 AM</span></div>
                  <p className={styles.msgText}>That&apos;s everything sorted. Thanks Nova.</p>
                </div>
              </div>
            </div>

            {/* Input bar */}
            <div className={styles.slackInputBar}>
              <span className={styles.slackInputPlaceholder}>Message #payments-ops</span>
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
    <div className={styles.tabletFrame}>
      <div className={styles.tabletScreen}>
        <div className={styles.teamsLayout}>
          {/* Icons rail */}
          <div className={styles.teamsRail}>
            <div className={styles.teamsRailIcon}>💬</div>
            <div className={styles.teamsRailIcon}>👥</div>
            <div className={styles.teamsRailIcon}>📅</div>
            <div className={styles.teamsRailIcon}>📁</div>
          </div>

          {/* Channel list */}
          <div className={styles.teamsChannelList}>
            <div className={styles.teamsTeamName}>Operations Team</div>
            <div className={styles.teamsChannelItem}>General</div>
            <div className={`${styles.teamsChannelItem} ${styles.teamsChannelActive}`}>Payments</div>
            <div className={styles.teamsChannelItem}>Finance</div>
            <div className={styles.teamsChannelItem}>Announcements</div>
          </div>

          {/* Main chat */}
          <div className={styles.teamsMain}>
            <div className={styles.teamsHeader}>
              <span className={styles.teamsHeaderTitle}>Payments</span>
              <span className={styles.teamsHeaderSub}>Operations Team</span>
            </div>

            <div className={styles.teamsMessages} ref={scrollRef}>
              <div className={`${styles.teamsMsgRow} ${vis["e1"] ? styles.msgVisible : ""}`}>
                <EmmaInitial className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Emma</span><span className={styles.msgTime}>Yesterday 9:02 AM</span></div>
                  <p className={styles.msgText}>Morning everyone. Has Oakwood Care completed their direct debit yet?</p>
                </div>
              </div>

              {vis["nt1"] && <TypingIndicator platform="teams" />}

              <div className={`${styles.teamsMsgRow} ${vis["n1"] ? styles.msgVisible : ""}`}>
                <NovaAvatarImg className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Nova</span><span className={styles.msgTime}>9:03 AM</span></div>
                  <p className={styles.msgText}>Not yet. They viewed the request yesterday but haven&apos;t authorised. I&apos;ve scheduled a reminder for this morning.</p>
                </div>
              </div>

              <div className={`${styles.teamsMsgRow} ${vis["e2"] ? styles.msgVisible : ""}`}>
                <EmmaInitial className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Emma</span><span className={styles.msgTime}>9:04 AM</span></div>
                  <p className={styles.msgText}>Perfect. Thanks for keeping an eye on it.</p>
                </div>
              </div>

              {vis["nt2"] && <TypingIndicator platform="teams" />}

              <div className={`${styles.teamsMsgRow} ${vis["n2"] ? styles.msgVisible : ""}`}>
                <NovaAvatarImg className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Nova</span><span className={styles.msgTime}>9:41 AM</span></div>
                  <p className={styles.msgText}>Update. Oakwood Care has completed the authorisation. First collection scheduled for Monday.</p>
                </div>
              </div>

              <div className={`${styles.teamsMsgRow} ${vis["j1"] ? styles.msgVisible : ""}`}>
                <JamesInitial className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>James</span><span className={styles.msgTime}>9:42 AM</span></div>
                  <p className={styles.msgText}>Brilliant. That&apos;s one less thing to chase.</p>
                </div>
              </div>

              <div className={`${styles.teamsMsgRow} ${vis["n3"] ? styles.msgVisible : ""}`}>
                <NovaAvatarImg className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Nova</span><span className={styles.msgTime}>9:42 AM</span></div>
                  <p className={styles.msgText}>I&apos;ll notify the team once the payment settles.</p>
                </div>
              </div>
            </div>

            <div className={styles.teamsInputBar}>
              <span className={styles.teamsInputPlaceholder}>Type a new message</span>
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
    // Step 1 (0ms) — Daniel
    show("d1", 0);
    // Step 2 (1200ms) — Nova typing
    show("nt1", 1200);
    // Step 3 (2800ms) — Nova reply
    hide("nt1", 2800);
    show("n1", 2800);
    // Step 4 (4200ms) — Daniel
    show("d2", 4200);
    // Step 5 (5200ms) — Nova typing
    show("nt2", 5200);
    // Step 6 (7000ms) — Nova 2 bubbles staggered
    hide("nt2", 7000);
    show("n2a", 7000);
    show("n2b", 7400);
    // Step 7 (8500ms) — action buttons
    show("wabtns", 8500);
    // Step 8 (9800ms) — "Copy link" clicked + spinner
    const t1 = setTimeout(() => setBtnClicked("copy"), 9800);
    timers.current.push(t1);
    // Step 9 (10800ms) — Nova confirmation
    show("n3", 10800);
    // Step 10 (13500ms) — Daniel
    show("d3", 13500);
    // Step 11 (14500ms) — Nova typing
    show("nt3", 14500);
    // Step 12 (16000ms) — Nova reply
    hide("nt3", 16000);
    show("n4", 16000);
    // Step 13 (17500ms) — buttons
    show("wabtns2", 17500);
    // Step 14 (19000ms) — "Yes, remind them" auto-clicks
    const t2 = setTimeout(() => setBtnClicked("remind"), 19000);
    timers.current.push(t2);
    // Step 15 (20000ms) — Nova confirmation
    show("n5", 20000);
    // Step 16 (23000ms) — Nova proactive update
    show("n6", 23000);
    // Step 17 (26000ms) — reset
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
        {/* WhatsApp header */}
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
            <span className={styles.waHeaderIcon}>📹</span>
            <span className={styles.waHeaderIcon}>📞</span>
          </div>
        </div>

        {/* Chat area */}
        <div className={styles.waChat} ref={scrollRef}>
          {/* Step 1 — Daniel */}
          <div className={`${styles.waBubbleRow} ${styles.waBubbleRight} ${vis["d1"] ? styles.msgVisible : ""}`}>
            <div className={`${styles.waBubble} ${styles.waBubbleOut}`}>
              Morning Nova. Can you create a payment link for our new client?
            </div>
          </div>

          {/* Step 2 — Nova typing */}
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

          {/* Step 3 — Nova */}
          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n1"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Of course. How much would you like to collect?
            </div>
          </div>

          {/* Step 4 — Daniel */}
          <div className={`${styles.waBubbleRow} ${styles.waBubbleRight} ${vis["d2"] ? styles.msgVisible : ""}`}>
            <div className={`${styles.waBubble} ${styles.waBubbleOut}`}>
              £850.
            </div>
          </div>

          {/* Step 5 — Nova typing */}
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

          {/* Step 6 — Nova 2 bubbles staggered */}
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

          {/* Step 7 — Action buttons */}
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

          {/* Step 9 — Nova confirmation */}
          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n3"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Copied. The payment page stays active for 30 days.
            </div>
          </div>

          {/* Step 10 — Daniel */}
          <div className={`${styles.waBubbleRow} ${styles.waBubbleRight} ${vis["d3"] ? styles.msgVisible : ""}`}>
            <div className={`${styles.waBubble} ${styles.waBubbleOut}`}>
              Has Oakwood Care paid yet?
            </div>
          </div>

          {/* Step 11 — Nova typing */}
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

          {/* Step 12 — Nova */}
          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n4"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Not yet. They opened the payment page 12 minutes ago but haven&apos;t completed it. Want me to send a reminder this afternoon?
            </div>
          </div>

          {/* Step 13 — Buttons */}
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

          {/* Step 15 — Nova */}
          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n5"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Done. I&apos;ll let you know when they&apos;ve viewed it.
            </div>
          </div>

          {/* Step 16 — Nova proactive update */}
          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n6"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Good news. Oakwood Care has completed payment. £850 received. Expected settlement: Thursday.
            </div>
          </div>
        </div>

        {/* Input bar */}
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
          {/* Dashboard left */}
          <div className={styles.dashMain}>
            <div className={styles.dashGreeting}>Good morning, Daniel</div>
            <div className={styles.dashMetrics}>
              <div className={styles.dashMetricCard}>
                <div className={styles.dashMetricLabel}>Today&apos;s collections</div>
                <div className={styles.dashMetricValue}>£12,450</div>
              </div>
              <div className={styles.dashMetricCard}>
                <div className={styles.dashMetricLabel}>Pending</div>
                <div className={styles.dashMetricValue}>£3,200</div>
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
                <span>£240.00</span>
                <span className={`${styles.dashChip} ${styles.dashChipSuccess}`}>Collected</span>
                <span>Today</span>
              </div>
              <div className={styles.dashTableRow}>
                <span>Oakwood Care</span>
                <span>£1,200.00</span>
                <span className={`${styles.dashChip} ${styles.dashChipPending}`}>Pending</span>
                <span>Today</span>
              </div>
              <div className={styles.dashTableRow}>
                <span>Bramble Design</span>
                <span>£580.00</span>
                <span className={`${styles.dashChip} ${styles.dashChipSuccess}`}>Collected</span>
                <span>Today</span>
              </div>
              <div className={styles.dashTableRow}>
                <span>Fern &amp; Fox Co.</span>
                <span>£320.00</span>
                <span className={`${styles.dashChip} ${styles.dashChipFailed}`}>Failed</span>
                <span>Today</span>
              </div>
            </div>
          </div>

          {/* Nova chat sidebar */}
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
    caption: "Keep operations visible across the whole team.",
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

          {/* Platform tabs */}
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
