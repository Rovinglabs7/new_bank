"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./nova-demo-section.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type MessageId =
  | "daniel-1"
  | "nova-typing-1"
  | "nova-1"
  | "daniel-2"
  | "nova-typing-2"
  | "nova-2-main"
  | "nova-2-card"
  | "nova-2-buttons"
  | "nova-2-btn-click"
  | "nova-3"
  | "nova-4"
  | "nova-5";

interface VisibleSet {
  [key: string]: boolean;
}

// ─── Platform pills ───────────────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 4h-8a2 2 0 00-2 2v2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2V6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2H0V8a2 2 0 012-2h2V4a2 2 0 012-2h12a2 2 0 012 2v.01" stroke="#5059C9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="15" cy="5" r="2.5" fill="#7B83EB"/>
      <path d="M10 10h8v8h-8z" fill="#5059C9" opacity=".5"/>
      <path d="M6 10h4v8H6z" fill="#7B83EB"/>
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#281e15" opacity=".7"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill="#281e15" opacity=".5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" fill="#281e15" opacity=".5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#281e15" opacity=".3"/>
    </svg>
  );
}

function NovaSparkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.4l-6.2 4.5 2.4-7.2L2 9.2h7.6z"
        fill="white"
        stroke="white"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className={styles.typingRow}>
      <div className={`${styles.avatar} ${styles.avatarNova}`}>
        <NovaSparkIcon />
      </div>
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

// ─── Message components ───────────────────────────────────────────────────────

function DanielAvatar() {
  return <div className={`${styles.avatar} ${styles.avatarDaniel}`}>D</div>;
}

function NovaAvatar() {
  return (
    <div className={`${styles.avatar} ${styles.avatarNova}`}>
      <NovaSparkIcon />
    </div>
  );
}

interface MessageGroupProps {
  sender: "daniel" | "nova";
  time: string;
  children: React.ReactNode;
  visible: boolean;
}

function MessageGroup({ sender, time, children, visible }: MessageGroupProps) {
  return (
    <div
      className={`${styles.messageGroup} ${visible ? styles.messageVisible : ""}`}
    >
      {sender === "daniel" ? <DanielAvatar /> : <NovaAvatar />}
      <div className={styles.messageContent}>
        <div className={styles.messageMeta}>
          <span className={styles.senderName}>
            {sender === "daniel" ? "Daniel" : "Nova"}
          </span>
          <span className={styles.messageTime}>{time}</span>
        </div>
        <div className={styles.messageBubbles}>{children}</div>
      </div>
    </div>
  );
}

// ─── Rich card ────────────────────────────────────────────────────────────────

interface RichCardProps {
  visible: boolean;
}

function RichCard({ visible }: RichCardProps) {
  return (
    <div className={`${styles.richCard} ${visible ? styles.richCardVisible : ""}`}>
      <div className={styles.richCardIcon}>🔄</div>
      <div className={styles.richCardBody}>
        <div className={styles.richCardTitle}>Recurring Payment</div>
        <div className={styles.richCardName}>Green Leaf Nursery</div>
        <div className={styles.richCardDetails}>£240 / month · Starts 1 Aug</div>
        <div className={styles.richCardStatus}>
          <span className={styles.statusDot} />
          Awaiting customer authorisation
        </div>
      </div>
    </div>
  );
}

// ─── Main animated chat window ────────────────────────────────────────────────

function NovaChatWindow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<VisibleSet>({});
  const [btnClicked, setBtnClicked] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const timerIds = useRef<ReturnType<typeof setTimeout>[]>([]);

  const show = (id: MessageId, delay: number) => {
    const t = setTimeout(() => {
      setVisible((prev) => ({ ...prev, [id]: true }));
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    }, delay);
    timerIds.current.push(t);
  };

  const hide = (id: MessageId, delay: number) => {
    const t = setTimeout(() => {
      setVisible((prev) => ({ ...prev, [id]: false }));
    }, delay);
    timerIds.current.push(t);
  };

  const runSequence = () => {
    setBtnClicked(false);
    setBtnLoading(false);
    setVisible({});

    // 0ms — Daniel's first message
    show("daniel-1", 0);
    // 600ms — Nova typing
    show("nova-typing-1", 600);
    // 2000ms — Nova typing disappears, reply appears
    hide("nova-typing-1", 2000);
    show("nova-1", 2000);
    // 3500ms — Daniel's second message
    show("daniel-2", 3500);
    // 5000ms — Nova typing
    show("nova-typing-2", 5000);
    // 7500ms — Nova's "Done" reply with link
    hide("nova-typing-2", 7500);
    show("nova-2-main", 7500);
    // 8000ms — rich card animates in
    show("nova-2-card", 8000);
    // 9000ms — action buttons
    show("nova-2-buttons", 9000);
    // 10500ms — button highlight + auto-click
    const t1 = setTimeout(() => {
      setBtnClicked(true);
      setBtnLoading(true);
    }, 10500);
    timerIds.current.push(t1);
    // 11300ms — loading done
    const t2 = setTimeout(() => {
      setBtnLoading(false);
    }, 11300);
    timerIds.current.push(t2);
    // 12000ms — Nova confirmation
    show("nova-3", 12000);
    // 14000ms — Nova update
    show("nova-4", 14000);
    // 16500ms — Nova mandate completed
    show("nova-5", 16500);
    // 20000ms — fade all out, restart
    const t3 = setTimeout(() => {
      setVisible({});
      setBtnClicked(false);
      setBtnLoading(false);
      const t4 = setTimeout(() => {
        runSequence();
      }, 800);
      timerIds.current.push(t4);
    }, 20000);
    timerIds.current.push(t3);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          runSequence();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      timerIds.current.forEach(clearTimeout);
      timerIds.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.slackWindow}>
      {/* Header */}
      <div className={styles.slackHeader}>
        <div className={styles.slackChannel}>
          <span className={styles.hashIcon}>#</span>
          payments-ops
        </div>
        <div className={styles.slackHeaderRight}>
          <span className={styles.onlineDot} />
          <span className={styles.headerNova}>Nova</span>
          <span className={styles.memberCount}>· 2</span>
        </div>
      </div>

      {/* Message area */}
      <div className={styles.messageArea} ref={scrollRef}>
        {/* Daniel message 1 */}
        <MessageGroup sender="daniel" time="10:14 AM" visible={!!visible["daniel-1"]}>
          <p className={styles.bubble}>
            @Nova Can you create a recurring payment for Green Leaf Nursery?
          </p>
        </MessageGroup>

        {/* Nova typing 1 */}
        {visible["nova-typing-1"] && <TypingIndicator />}

        {/* Nova reply 1 */}
        <MessageGroup sender="nova" time="10:14 AM" visible={!!visible["nova-1"]}>
          <p className={styles.bubble}>Absolutely.</p>
          <p className={styles.bubble}>I&apos;ll need a few details first.</p>
          <ul className={`${styles.bubble} ${styles.bubbleList}`}>
            <li>Amount</li>
            <li>Collection frequency</li>
            <li>First collection date</li>
          </ul>
        </MessageGroup>

        {/* Daniel message 2 */}
        <MessageGroup sender="daniel" time="10:15 AM" visible={!!visible["daniel-2"]}>
          <p className={styles.bubble}>£240</p>
          <p className={styles.bubble}>Monthly</p>
          <p className={styles.bubble}>Starting on 1 August</p>
        </MessageGroup>

        {/* Nova typing 2 */}
        {visible["nova-typing-2"] && <TypingIndicator />}

        {/* Nova reply 2 */}
        <MessageGroup sender="nova" time="10:15 AM" visible={!!visible["nova-2-main"]}>
          <p className={styles.bubble}>Done.</p>
          <p className={styles.bubble}>I&apos;ve created the recurring payment.</p>
          <p className={`${styles.bubble} ${styles.bubbleLink}`}>
            pay.praevor.com/GLN-82XK
          </p>
          <RichCard visible={!!visible["nova-2-card"]} />
          <p className={`${styles.bubble} ${styles.bubbleQuestion} ${visible["nova-2-buttons"] ? styles.bubbleVisible : ""}`}>
            Would you like me to send this to the customer?
          </p>
          {visible["nova-2-buttons"] && (
            <div className={`${styles.actionButtons} ${styles.messageVisible}`}>
              <button
                className={`${styles.btnPrimary} ${btnClicked ? styles.btnClicked : ""}`}
                disabled={btnClicked}
                type="button"
                aria-label="Send to customer"
              >
                {btnLoading ? (
                  <span className={styles.btnSpinner} aria-hidden />
                ) : (
                  "Send to customer"
                )}
              </button>
              <button
                className={styles.btnGhost}
                disabled={btnClicked}
                type="button"
                aria-label="Send it myself"
              >
                I&apos;ll send it myself
              </button>
            </div>
          )}
        </MessageGroup>

        {/* Nova confirmation */}
        <MessageGroup sender="nova" time="10:16 AM" visible={!!visible["nova-3"]}>
          <p className={styles.bubble}>Done. The payment request has been sent to Green Leaf Nursery.</p>
          <p className={styles.bubble}>I&apos;ll notify you when they complete the mandate.</p>
        </MessageGroup>

        {/* Nova update */}
        <MessageGroup sender="nova" time="10:17 AM" visible={!!visible["nova-4"]}>
          <p className={styles.bubble}>
            Update: Green Leaf Nursery has opened the payment request.
          </p>
        </MessageGroup>

        {/* Nova mandate completed */}
        <MessageGroup sender="nova" time="10:18 AM" visible={!!visible["nova-5"]}>
          <p className={`${styles.bubble} ${styles.bubbleSuccess}`}>
            ✓ Mandate completed. First collection scheduled for 1 August.
          </p>
        </MessageGroup>
      </div>
    </div>
  );
}

// ─── Platform pills ───────────────────────────────────────────────────────────

const platforms = [
  { label: "WhatsApp", Icon: WhatsAppIcon },
  { label: "Slack", Icon: SlackIcon },
  { label: "Teams", Icon: TeamsIcon },
  { label: "Dashboard", Icon: DashboardIcon },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export function NovaDemoSection() {
  return (
    <section className={styles.section} aria-labelledby="nova-heading">
      <div className={styles.inner}>
        {/* Left column */}
        <div className={styles.textCol}>
          <p className={styles.eyebrow}>PRODUCT EXPERIENCE</p>
          <h2 id="nova-heading" className={styles.heading}>
            Meet Nova.
          </h2>
          <p className={styles.subtext}>
            Your AI teammate for payment operations.
          </p>
          <p className={styles.body}>
            Available in WhatsApp, Slack, Microsoft Teams and your Praevor
            dashboard. Ask questions, automate tasks and keep money moving —
            wherever you work.
          </p>
          <div className={styles.pills}>
            {platforms.map(({ label, Icon }) => (
              <span key={label} className={styles.pill}>
                <Icon />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className={styles.chatCol}>
          <NovaChatWindow />
        </div>
      </div>
    </section>
  );
}
