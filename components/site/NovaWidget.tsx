"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./nova-widget.module.css";

// ─── Mock responses (same as before) ─────────────────────────────────────────

const RESPONSES: Record<string, string> = {
  default:
    "Great question. Praevor handles that for you automatically. Our platform is designed to remove friction from every part of the payment process, so your team can focus on growing the business rather than chasing payments. If you'd like to dig deeper, I'd recommend [speaking with our team](/contact-sales) or [starting a free trial](/signup).",
  pricing:
    "Praevor offers three plans: **Starter** (free, up to 50 payments/month), **Growth** (from £49/month), and **Enterprise** (custom). All plans include our core payment infrastructure with no hidden fees. You can explore the full breakdown on our [pricing page](/pricing).",
  recurring:
    "Recurring payments on Praevor use the UK Direct Debit scheme via Bacs. Once your customer authorises a mandate, Praevor handles every subsequent collection automatically — retrying intelligently on failure and keeping your ledger in sync. Learn more on the [Recurring Payments page](/products/subscription-payments).",
  settlement:
    "Settlements typically arrive within **2 business days** of collection for standard Direct Debit. Our Instant Bank Pay product settles the same day — often within minutes. Enterprise customers can unlock next-day settlement. See [settlement details](/pricing#settlement).",
  gocardless:
    "Switching from GoCardless is straightforward. Praevor can **migrate your existing mandates** without requiring your customers to re-authorise — zero disruption to your collections. Our onboarding team handles the migration, typically within 5–10 business days. [Book a migration call](/contact-sales).",
  xero:
    "Yes — Praevor connects directly to Xero. Collections are reconciled automatically against invoices, and failed payments create tasks in your workflow so nothing falls through the cracks. Setup takes about 10 minutes. [Read the integration guide](/products/accounting-integrations).",
  "payment link":
    "Payment links let you collect one-off payments in under a minute. Create a link from your dashboard, share it by email or SMS, and your customer pays instantly via open banking. Funds settle the same day. [See how it works](/products/instant-bank-pay).",
  failed:
    "Praevor's failure prediction engine flags at-risk payments **before** they fail. When a payment does fail, the system automatically retries on the optimal day — typically recovering 70% of initially failed collections. [Read more](/products/failure-prediction).",
  compliance:
    "Praevor is authorised and regulated by the **Financial Conduct Authority** as a Payment Institution. All customer data is encrypted at rest and in transit, and we are ISO 27001 certified. See our [security and compliance overview](/security).",
  api:
    "Praevor's REST API lets you build the full payment stack into your product. You get webhooks for every event, idempotent endpoints, and SDKs for Node, Python, Ruby and PHP. [Explore the API docs](/products/api).",
  enterprise:
    "Praevor Enterprise includes custom settlement timelines, dedicated account management, SLA-backed uptime, advanced reporting, SSO and custom mandate branding. [Talk to our sales team](/contact-sales).",
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

const CHIPS = [
  "Pricing",
  "Payment links",
  "Recurring payments",
  "Failed payments",
  "Settlement times",
  "Xero integration",
  "Compliance & FCA",
  "Switching from GoCardless",
  "Book a demo",
  "API documentation",
];

const PLACEHOLDERS = [
  "Ask Nova anything...",
  "How do Direct Debits work?",
  "Can I switch from GoCardless?",
  "How quickly do settlements arrive?",
  "What does Enterprise include?",
  "How do payment links work?",
];

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

interface Message {
  role: "user" | "nova";
  text: string;
  streaming?: boolean;
}

export function NovaWidget() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Rotate placeholder
  useEffect(() => {
    const t = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Scroll to bottom
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
      setExpanded(true);
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
    if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => setExpanded(true);

  return (
    <motion.div
      className={styles.widget}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Conversation thread — only when active */}
      <AnimatePresence>
        {expanded && messages.length > 0 && (
          <motion.div
            className={styles.thread}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.messages}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={msg.role === "user" ? styles.msgUser : styles.msgNova}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {msg.role === "nova" && (
                    <div className={styles.msgAvatar}>
                      <Image src="/nova-avatar.jpg" alt="Nova" width={24} height={24} className={styles.msgAvatarImg} />
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
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    className={styles.msgNova}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.msgAvatar}>
                      <Image src="/nova-avatar.jpg" alt="Nova" width={24} height={24} className={styles.msgAvatarImg} />
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
        <div className={styles.avatarWrap}>
          <Image src="/nova-avatar.jpg" alt="Nova" width={34} height={34} className={styles.avatar} />
          <span className={styles.onlineDot} aria-hidden />
        </div>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder={expanded && messages.length > 0 ? "Ask a follow-up..." : PLACEHOLDERS[placeholderIdx]}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          onFocus={handleFocus}
          aria-label="Ask Nova a question"
          autoComplete="off"
        />
        <button
          className={`${styles.sendBtn} ${query.trim() ? styles.sendBtnActive : ""}`}
          onClick={() => submit(query)}
          aria-label="Send message"
          type="button"
          disabled={!query.trim()}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Suggestion chips — hide once conversation starts */}
      <AnimatePresence>
        {!expanded && (
          <motion.div
            className={styles.chips}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {CHIPS.map((chip) => (
              <button
                key={chip}
                className={styles.chip}
                type="button"
                onClick={() => {
                  inputRef.current?.focus();
                  submit(chip);
                }}
              >
                {chip}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
