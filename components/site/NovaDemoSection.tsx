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
      <div className={styles.richCardIcon}>🔄</div>
      <div className={styles.richCardBody}>
        <div className={styles.richCardTitle}>Recurring Payment</div>
        <div className={styles.richCardName}>Green Leaf Nursery</div>
        <div className={styles.richCardDetails}>£240 / month · Starts 1 August</div>
        <div className={styles.richCardStatus}>
          <span className={styles.statusDot} />
          Awaiting authorisation
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
    // 4000ms — Daniel 2
    show("d2", 4000);
    // 5000ms — Nova typing 2
    show("nt2", 5000);
    // 7000ms — Nova reply + card
    hide("nt2", 7000);
    show("n2", 7000);
    show("n2card", 7500);
    show("n2btns", 8500);
    // 9500ms — button auto-highlight
    const t1 = setTimeout(() => { setBtnClicked(true); setBtnLoading(true); }, 9500);
    timers.current.push(t1);
    const t2 = setTimeout(() => setBtnLoading(false), 10100);
    timers.current.push(t2);
    // 10500ms — Nova confirmation
    show("n3", 10500);
    // 13000ms — Emma
    show("e1", 13000);
    // 14000ms — Nova typing
    show("nt3", 14000);
    // 15500ms — Nova reply
    hide("nt3", 15500);
    show("n4", 15500);
    // 17000ms — James
    show("j1", 17000);
    // 19000ms — Nova final
    show("n5", 19000);
    // 21000ms — reset
    const t3 = setTimeout(() => {
      setVis({});
      setBtnClicked(false);
      setBtnLoading(false);
      const t4 = setTimeout(runSequence, 800);
      timers.current.push(t4);
    }, 21000);
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
                  <p className={styles.msgText}>Morning Nova — can you help me set up a monthly payment for Green Leaf Nursery?</p>
                </div>
              </div>

              {vis["nt1"] && <TypingIndicator platform="slack" />}

              {/* Nova 1 */}
              <div className={`${styles.msgRow} ${vis["n1"] ? styles.msgVisible : ""}`}>
                <NovaAvatarImg className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Nova</span><span className={styles.msgTime}>10:14 AM</span></div>
                  <p className={styles.msgText}>Morning, Daniel. Of course.</p>
                  <p className={styles.msgText}>What amount would you like to collect, and when should the first payment go out?</p>
                </div>
              </div>

              {/* Daniel 2 */}
              <div className={`${styles.msgRow} ${vis["d2"] ? styles.msgVisible : ""}`}>
                <DanielInitial className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Daniel</span><span className={styles.msgTime}>10:15 AM</span></div>
                  <p className={styles.msgText}>£240 a month. Starting 1 August.</p>
                </div>
              </div>

              {vis["nt2"] && <TypingIndicator platform="slack" />}

              {/* Nova 2 */}
              <div className={`${styles.msgRow} ${vis["n2"] ? styles.msgVisible : ""}`}>
                <NovaAvatarImg className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Nova</span><span className={styles.msgTime}>10:15 AM</span></div>
                  <p className={styles.msgText}>Perfect — I&apos;ve put everything together.</p>
                  <RichCard visible={!!vis["n2card"]} />
                  <p className={styles.msgText}>Would you like me to send the payment request directly to Green Leaf Nursery?</p>
                  {vis["n2btns"] && (
                    <div className={`${styles.actionButtons} ${styles.msgVisible}`}>
                      <button
                        className={`${styles.btnPrimary} ${btnClicked ? styles.btnClicked : ""}`}
                        disabled={btnClicked}
                        type="button"
                      >
                        {btnLoading ? <span className={styles.btnSpinner} aria-hidden /> : "Send to customer"}
                      </button>
                      <button
                        className={styles.btnGhost}
                        disabled={btnClicked}
                        type="button"
                      >
                        I&apos;ll share it myself
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Nova 3 */}
              <div className={`${styles.msgRow} ${vis["n3"] ? styles.msgVisible : ""}`}>
                <NovaAvatarImg className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Nova</span><span className={styles.msgTime}>10:16 AM</span></div>
                  <p className={styles.msgText}>Done. I&apos;ve emailed the request to Green Leaf Nursery. I&apos;ll keep you updated on their progress.</p>
                </div>
              </div>

              {/* Emma */}
              <div className={`${styles.msgRow} ${vis["e1"] ? styles.msgVisible : ""}`}>
                <EmmaInitial className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Emma</span><span className={styles.msgTime}>10:24 AM</span></div>
                  <p className={styles.msgText}>Any update on Oakwood Care?</p>
                </div>
              </div>

              {vis["nt3"] && <TypingIndicator platform="slack" />}

              {/* Nova 4 */}
              <div className={`${styles.msgRow} ${vis["n4"] ? styles.msgVisible : ""}`}>
                <NovaAvatarImg className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Nova</span><span className={styles.msgTime}>10:24 AM</span></div>
                  <p className={styles.msgText}>Not yet — they&apos;ve viewed the request but haven&apos;t completed authorisation. I&apos;ve scheduled a nudge for tomorrow morning.</p>
                </div>
              </div>

              {/* James */}
              <div className={`${styles.msgRow} ${vis["j1"] ? styles.msgVisible : ""}`}>
                <JamesInitial className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>James</span><span className={styles.msgTime}>10:25 AM</span></div>
                  <p className={styles.msgText}>Brilliant. One less thing to chase.</p>
                </div>
              </div>

              {/* Nova 5 */}
              <div className={`${styles.msgRow} ${vis["n5"] ? styles.msgVisible : ""}`}>
                <NovaAvatarImg className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Nova</span><span className={styles.msgTime}>10:31 AM</span></div>
                  <p className={styles.msgText}>Update: Green Leaf Nursery has completed the authorisation. First collection scheduled for 1 August. 🎉</p>
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
                  <p className={styles.msgText}>Has Oakwood Care completed their Direct Debit yet?</p>
                </div>
              </div>

              {vis["nt1"] && <TypingIndicator platform="teams" />}

              <div className={`${styles.teamsMsgRow} ${vis["n1"] ? styles.msgVisible : ""}`}>
                <NovaAvatarImg className={styles.msgAvatar} />
                <div className={styles.msgContent}>
                  <div className={styles.msgMeta}><span className={styles.msgName}>Nova</span><span className={styles.msgTime}>9:03 AM</span></div>
                  <p className={styles.msgText}>Not yet — they&apos;ve viewed the request but haven&apos;t completed it. I&apos;ve scheduled a reminder for tomorrow morning.</p>
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
                  <p className={styles.msgText}>Quick update — Oakwood Care has now completed the authorisation. Their first collection is scheduled for Monday.</p>
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
                  <p className={styles.msgText}>Exactly. I&apos;ll notify the team once the payment settles.</p>
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

  const runSequence = useCallback(() => {
    setVis({});
    show("d1", 0);
    show("n1", 1200);
    show("d2", 3500);
    show("n2", 4800);
    show("n3", 8500);
    show("d3", 10000);
    show("n4", 11500);
    const t = setTimeout(() => {
      setVis({});
      const t2 = setTimeout(runSequence, 800);
      timers.current.push(t2);
    }, 18000);
    timers.current.push(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

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
          {/* Daniel (right) */}
          <div className={`${styles.waBubbleRow} ${styles.waBubbleRight} ${vis["d1"] ? styles.msgVisible : ""}`}>
            <div className={`${styles.waBubble} ${styles.waBubbleOut}`}>
              Morning Nova. Anything I should know about?
            </div>
          </div>

          {/* Nova (left) */}
          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n1"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div>
              <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
                Morning 👋
              </div>
              <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
                Quiet start today — everything collected overnight except one payment from Bramble Design. I&apos;ve already scheduled another attempt for tomorrow based on their usual payment history.
              </div>
            </div>
          </div>

          <div className={`${styles.waBubbleRow} ${styles.waBubbleRight} ${vis["d2"] ? styles.msgVisible : ""}`}>
            <div className={`${styles.waBubble} ${styles.waBubbleOut}`}>
              Amazing. Thanks for sorting it.
            </div>
          </div>

          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n2"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Always. Enjoy your morning — I&apos;ll message you if anything needs your attention.
            </div>
          </div>

          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n3"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Quick update — Bramble Design&apos;s payment came through on the retry. You&apos;re all caught up.
            </div>
          </div>

          <div className={`${styles.waBubbleRow} ${styles.waBubbleRight} ${vis["d3"] ? styles.msgVisible : ""}`}>
            <div className={`${styles.waBubble} ${styles.waBubbleOut}`}>
              You&apos;re a lifesaver. Cheers Nova.
            </div>
          </div>

          <div className={`${styles.waBubbleRow} ${styles.waBubbleLeft} ${vis["n4"] ? styles.msgVisible : ""}`}>
            <NovaAvatarImg className={styles.waAvatar} />
            <div className={`${styles.waBubble} ${styles.waBubbleIn}`}>
              Happy to help 😊
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
            Nova works wherever your team works. Ask questions, automate tasks and get updates — without leaving the tools you already use.
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
