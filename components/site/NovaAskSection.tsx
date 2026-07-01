"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./nova-ask-section.module.css";

// ─── Mock responses ───────────────────────────────────────────────────────────

const RESPONSES: Record<string, string> = {
  default:
    "Great question. Praevor handles that for you automatically. Our platform is designed to remove friction from every part of the payment process, so your team can focus on growing the business rather than chasing payments. If you'd like to dig deeper, I'd recommend [speaking with our team](/contact-sales) or [starting a free trial](/signup).",
  pricing:
    "Praevor offers three plans: **Starter** (free, up to 50 payments/month), **Growth** (from £49/month), and **Enterprise** (custom). All plans include our core payment infrastructure with no hidden fees. Transaction fees vary by payment method. You can explore the full breakdown on our [pricing page](/pricing).",
  recurring:
    "Recurring payments on Praevor use the UK Direct Debit scheme via Bacs. Once your customer authorises a mandate, Praevor handles every subsequent collection automatically — retrying intelligently on failure, sending pre-notification emails, and keeping your ledger in sync. Most businesses see a 94%+ collection rate within the first cycle. Learn more on the [Recurring Payments page](/products/subscription-payments).",
  settlement:
    "Settlements typically arrive within **2 business days** of collection for standard Direct Debit. Our Instant Bank Pay product (powered by open banking) settles the same day — often within minutes of the customer authorising payment. Enterprise customers can unlock next-day settlement for Direct Debit. See the [settlement details](/pricing#settlement) for full timelines.",
  gocardless:
    "Switching from GoCardless is straightforward. Praevor can **migrate your existing mandates** without requiring your customers to re-authorise — so there's zero disruption to your collections. Our onboarding team handles the migration, typically completing within 5–10 business days. [Book a migration call](/contact-sales) and we'll walk you through it step by step.",
  xero:
    "Yes — Praevor connects directly to Xero. Collections are reconciled automatically against invoices, and failed payments create tasks in your workflow so nothing falls through the cracks. The integration takes about 10 minutes to set up. You can read the [integration guide](/products/accounting-integrations) or [start a free trial](/signup) to try it today.",
  "payment link":
    "Payment links let you collect one-off payments in under a minute. You create a link from your dashboard (or via API), share it by email, SMS or WhatsApp, and your customer pays instantly via open banking — no card details, no friction. Funds settle the same day. [See how it works](/products/instant-bank-pay).",
  failed:
    "Praevor's failure prediction engine flags at-risk payments **before** they fail, giving you time to act. When a payment does fail, the system automatically retries on the optimal day based on the customer's banking pattern — typically recovering 70% of initially failed collections without any manual work. [Read more about failed payment handling](/products/failure-prediction).",
  compliance:
    "Praevor is authorised and regulated by the **Financial Conduct Authority** as a Payment Institution. All customer data is encrypted at rest and in transit, and we are ISO 27001 certified. Our compliance dashboard gives you a real-time view of your mandate statuses and audit trail. See our [security and compliance overview](/security).",
  api:
    "Praevor's REST API lets you build the full payment stack into your product. You get webhooks for every event, idempotent endpoints, and SDKs for Node, Python, Ruby and PHP. Our developer docs cover getting started in under 15 minutes. [Explore the API docs](/products/api) or [speak to our integrations team](/contact-sales).",
  enterprise:
    "Praevor Enterprise is built for businesses collecting at scale. It includes custom settlement timelines, dedicated account management, SLA-backed uptime, advanced reporting, SSO and custom mandate branding. Pricing is tailored to your volume. [Talk to our sales team](/contact-sales) to get a proposal.",
};

function pickResponse(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("pric") || lower.includes("cost") || lower.includes("plan")) return RESPONSES.pricing;
  if (lower.includes("recurring") || lower.includes("direct debit") || lower.includes("subscription")) return RESPONSES.recurring;
  if (lower.includes("settl")) return RESPONSES.settlement;
  if (lower.includes("gocardless") || lower.includes("go cardless") || lower.includes("switch") || lower.includes("migrat")) return RESPONSES.gocardless;
  if (lower.includes("xero") || lower.includes("quickbooks") || lower.includes("account")) return RESPONSES.xero;
  if (lower.includes("payment link") || lower.includes("link") || lower.includes("qr")) return RESPONSES["payment link"];
  if (lower.includes("fail") || lower.includes("retr") || lower.includes("missed")) return RESPONSES.failed;
  if (lower.includes("complian") || lower.includes("fca") || lower.includes("secur") || lower.includes("gdpr")) return RESPONSES.compliance;
  if (lower.includes("api") || lower.includes("developer") || lower.includes("webhook") || lower.includes("integrat")) return RESPONSES.api;
  if (lower.includes("enterprise") || lower.includes("large") || lower.includes("scale")) return RESPONSES.enterprise;
  return RESPONSES.default;
}

const SUGGESTIONS = [
  "Pricing",
  "Recurring payments",
  "Payment links",
  "Same-day settlement",
  "Failed payment retries",
  "Xero integration",
  "Compliance & FCA",
  "Switching from GoCardless",
  "Book a demo",
  "API & developers",
];

const PLACEHOLDERS = [
  "How do recurring payments work?",
  "How quickly do settlements arrive?",
  "Can I switch from GoCardless?",
  "How do payment links work?",
  "Can I integrate with Xero?",
  "What does Enterprise include?",
];

// ─── Inline markdown renderer ─────────────────────────────────────────────────

function renderMarkdown(text: string) {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.*?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      parts.push(<strong key={key++}>{m[1]}</strong>);
    } else {
      parts.push(<a key={key++} href={m[3]} className={styles.answerLink}>{m[2]}</a>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// ─── Message types ────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "nova";
  text: string;
  streaming?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NovaAskSection() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [focused, setFocused] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Rotate placeholder
  useEffect(() => {
    const t = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isTyping]);

  const stream = useCallback((response: string) => {
    setIsTyping(false);
    let i = 0;
    setMessages((prev) => [...prev, { role: "nova", text: "", streaming: true }]);

    const tick = () => {
      i += Math.floor(Math.random() * 3) + 1;
      const chunk = response.slice(0, i);
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { role: "nova", text: chunk, streaming: i < response.length };
        return next;
      });
      if (i < response.length) {
        streamRef.current = setTimeout(tick, 12 + Math.random() * 10);
      }
    };
    streamRef.current = setTimeout(tick, 40);
  }, []);

  const submit = useCallback(
    (text: string) => {
      const q = text.trim();
      if (!q) return;
      if (streamRef.current) clearTimeout(streamRef.current);
      setQuery("");
      setMessages((prev) => [...prev, { role: "user", text: q }]);
      setIsTyping(true);
      const response = pickResponse(q);
      setTimeout(() => stream(response), 900 + Math.random() * 400);
    },
    [stream]
  );

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(query);
    }
  };

  const hasConversation = messages.length > 0;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>Available 24 / 7</p>
          <h2 className={styles.heading}>
            Still have questions?<br />
            <span className={styles.headingAccent}>Ask Nova.</span>
          </h2>
          <p className={styles.sub}>
            Nova knows everything about Praevor. Ask about pricing, recurring payments, payment links, integrations, compliance, settlements or getting started.
          </p>
        </motion.div>

        {/* Chat component */}
        <motion.div
          className={`${styles.card} ${focused ? styles.cardFocused : ""} ${hasConversation ? styles.cardExpanded : ""}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Nova identity bar */}
          <div className={styles.novaBar}>
            <div className={styles.novaAvatar}>
              <Image src="/nova-avatar.jpg" alt="Nova" width={40} height={40} className={styles.novaImg} />
              <span className={styles.onlineDot} aria-hidden />
            </div>
            <div className={styles.novaMeta}>
              <span className={styles.novaName}>Nova</span>
              <span className={styles.novaStatus}>
                {isTyping ? "Typing..." : "Typically replies instantly"}
              </span>
            </div>
          </div>

          {/* Conversation */}
          <AnimatePresence>
            {hasConversation && (
              <motion.div
                className={styles.conversation}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.messages}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      className={msg.role === "user" ? styles.msgUser : styles.msgNova}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {msg.role === "nova" && (
                        <div className={styles.msgNovaAvatar}>
                          <Image src="/nova-avatar.jpg" alt="Nova" width={28} height={28} className={styles.msgAvatarImg} />
                        </div>
                      )}
                      <div className={msg.role === "user" ? styles.bubbleUser : styles.bubbleNova}>
                        {msg.role === "nova" ? (
                          <p className={styles.novaText}>
                            {renderMarkdown(msg.text)}
                            {msg.streaming && <span className={styles.cursor} aria-hidden />}
                          </p>
                        ) : (
                          <p className={styles.userText}>{msg.text}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        className={styles.msgNova}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className={styles.msgNovaAvatar}>
                          <Image src="/nova-avatar.jpg" alt="Nova" width={28} height={28} className={styles.msgAvatarImg} />
                        </div>
                        <div className={styles.bubbleNova}>
                          <span className={styles.typingDots} aria-label="Nova is typing">
                            <span /><span /><span />
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={bottomRef} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input row */}
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder={focused || hasConversation ? "Ask a follow-up..." : PLACEHOLDERS[placeholderIdx]}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKey}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label="Ask Nova a question"
              autoComplete="off"
            />
            <button
              className={styles.sendBtn}
              onClick={() => submit(query)}
              aria-label="Send message"
              disabled={!query.trim() && !isTyping}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Suggestion pills */}
          <AnimatePresence>
            {!hasConversation && (
              <motion.div
                className={styles.pills}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.35, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    className={styles.pill}
                    onClick={() => {
                      inputRef.current?.focus();
                      submit(s);
                    }}
                    type="button"
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
