"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./contact.module.css";

// ── Types ──────────────────────────────────────────────────────────────────────

type ContactReason = "sales" | "support" | "partnerships" | "press";

interface FormState {
  name: string;
  email: string;
  company: string;
  website: string;
  size: string;
  reason: string;
  currentProvider: string;
  message: string;
  updates: boolean;
}

// ── Contact card data ──────────────────────────────────────────────────────────

const CARDS = [
  {
    id: "sales" as ContactReason,
    heading: "Sales",
    desc: "Learn how Praevor can simplify the way your business gets paid. Whether you're comparing providers, switching from GoCardless, or evaluating payment infrastructure for the first time, our team can walk you through the platform.",
    bestFor: [
      "Product demonstrations",
      "Pricing enquiries",
      "Switching from another provider",
      "Enterprise conversations",
      "New business enquiries",
    ],
    cta: "Talk to Sales",
    icon: <SalesIcon />,
  },
  {
    id: "support" as ContactReason,
    heading: "Customer Support",
    desc: "Already using Praevor? Our support engineers can help with payment collections, settlements, integrations, API questions, mandates, webhooks, onboarding or anything else you're experiencing.",
    bestFor: [
      "Technical issues",
      "Failed payments",
      "API support",
      "Integrations",
      "Account assistance",
    ],
    cta: "Contact Support",
    icon: <SupportIcon />,
  },
  {
    id: "partnerships" as ContactReason,
    heading: "Partnerships",
    desc: "We're building the future of business payments together. Whether you're building software, an accounting platform, a financial product, or something entirely new, let's explore how we can work together.",
    bestFor: [
      "Technology Partners",
      "ISVs & SaaS Platforms",
      "Accountancy Software",
      "Banks & Financial Institutions",
      "Strategic Partnerships",
    ],
    cta: "Partnership Enquiry",
    icon: <PartnershipIcon />,
  },
  {
    id: "press" as ContactReason,
    heading: "Media & Press",
    desc: "For journalists, podcasts, speaking engagements, company information or media requests.",
    bestFor: [
      "Press enquiries",
      "Media requests",
      "Speaking engagements",
      "Company information",
    ],
    cta: "Press Enquiries",
    icon: <PressIcon />,
  },
];

const REASON_MAP: Record<ContactReason, string> = {
  sales: "Sales",
  support: "Support",
  partnerships: "Partnerships",
  press: "Press",
};

// ── Main page ─────────────────────────────────────────────────────────────────

export function ContactPage() {
  const [activeModal, setActiveModal] = useState<ContactReason | null>(null);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>Contact Us</p>
        <h1 className={styles.heroHeading}>Let&apos;s start a conversation.</h1>
        <p className={styles.heroSub}>
          Whether you&apos;re exploring Praevor for the first time, planning a migration,
          looking for technical guidance, or simply have a question — we&apos;d love
          to hear from you.
        </p>
      </section>

      {/* Cards */}
      <section className={styles.cardsSection} aria-label="Contact options">
        <div className={styles.cardsGrid}>
          {CARDS.map((card) => (
            <div key={card.id} className={styles.card}>
              <div className={styles.cardIcon} aria-hidden>{card.icon}</div>
              <h2 className={styles.cardHeading}>{card.heading}</h2>
              <p className={styles.cardDesc}>{card.desc}</p>
              <div className={styles.cardBestFor}>
                <p className={styles.cardBestForLabel}>Best for</p>
                <ul className={styles.cardBestForList}>
                  {card.bestFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <button
                className={styles.cardCta}
                onClick={() => setActiveModal(card.id)}
                aria-label={`Open ${card.heading} contact form`}
              >
                {card.cta}
                <ArrowIcon />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* What happens next */}
      <section className={styles.trustSection}>
        <div className={styles.trustInner}>
          <p className={styles.trustEyebrow}>What happens next</p>
          <div className={styles.trustSteps}>
            <div className={styles.trustStep}>
              <span className={styles.trustStepNum}>1</span>
              <p className={styles.trustStepTitle}>We review your enquiry</p>
              <p className={styles.trustStepBody}>
                Every message is read by a member of our team — not an automated
                ticketing system.
              </p>
            </div>
            <div className={styles.trustStep}>
              <span className={styles.trustStepNum}>2</span>
              <p className={styles.trustStepTitle}>We route it to the right specialist</p>
              <p className={styles.trustStepBody}>
                Whether it&apos;s Sales, Support, Partnerships or Engineering, your
                enquiry goes directly to the people who can help.
              </p>
            </div>
            <div className={styles.trustStep}>
              <span className={styles.trustStepNum}>3</span>
              <p className={styles.trustStepTitle}>We get back to you</p>
              <p className={styles.trustStepBody}>
                Most enquiries receive a response within one business day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={styles.footerCta}>
        <div className={styles.footerCtaInner}>
          <h2 className={styles.footerCtaHeading}>Prefer a conversation?</h2>
          <p className={styles.footerCtaBody}>
            Sometimes it&apos;s easier to talk things through. Book a personalised
            demo with one of our product specialists and see how Praevor can
            simplify your payment operations.
          </p>
          <Link href="/contact-sales/qualify" className={styles.footerCtaBtn}>
            Book a demo
            <ArrowIcon />
          </Link>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <ContactModal
            reason={activeModal}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function ContactModal({
  reason,
  onClose,
}: {
  reason: ContactReason;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    website: "",
    size: "",
    reason: REASON_MAP[reason],
    currentProvider: "",
    message: "",
    updates: false,
  });

  function set(key: keyof FormState, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    // Simulate submission — wire to a real endpoint as needed
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {submitted ? (
          <Confirmation onClose={onClose} />
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalHeading}>Get in touch</h2>
              <p className={styles.modalSub}>
                Tell us a little about what you&apos;re looking for and we&apos;ll
                connect you with the right team.
              </p>
              <div className={styles.modalResponseTime}>
                <CheckCircleIcon />
                Average response time: within one business day
              </div>
            </div>

            <div className={styles.modalBody}>
              {error && <p className={styles.formError} role="alert">{error}</p>}

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.fieldRow}>
                  <label className={styles.field}>
                    <span className={styles.label}>Full name</span>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Business email</span>
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                <div className={styles.fieldRow}>
                  <label className={styles.field}>
                    <span className={styles.label}>Company</span>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Acme Ltd"
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                      autoComplete="organization"
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>
                      Company website{" "}
                      <span className={styles.optional}>(optional)</span>
                    </span>
                    <input
                      type="url"
                      className={styles.input}
                      placeholder="https://company.com"
                      value={form.website}
                      onChange={(e) => set("website", e.target.value)}
                      autoComplete="url"
                    />
                  </label>
                </div>

                <div className={styles.fieldRow}>
                  <label className={styles.field}>
                    <span className={styles.label}>Company size</span>
                    <select
                      className={styles.select}
                      value={form.size}
                      onChange={(e) => set("size", e.target.value)}
                      required
                    >
                      <option value="" disabled>Select...</option>
                      <option value="solo">Just me</option>
                      <option value="2-10">2–10</option>
                      <option value="11-50">11–50</option>
                      <option value="51-200">51–200</option>
                      <option value="201-500">201–500</option>
                      <option value="500+">500+</option>
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>I&apos;m contacting you about</span>
                    <select
                      className={styles.select}
                      value={form.reason}
                      onChange={(e) => set("reason", e.target.value)}
                      required
                    >
                      <option value="" disabled>Select...</option>
                      <option value="Sales">Sales</option>
                      <option value="Pricing">Pricing</option>
                      <option value="Support">Support</option>
                      <option value="Migration">Migration</option>
                      <option value="Partnerships">Partnerships</option>
                      <option value="API & Integrations">API &amp; Integrations</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="Press">Press</option>
                      <option value="Something else">Something else</option>
                    </select>
                  </label>
                </div>

                <label className={styles.field}>
                  <span className={styles.label}>
                    Current payment provider{" "}
                    <span className={styles.optional}>(optional)</span>
                  </span>
                  <select
                    className={styles.select}
                    value={form.currentProvider}
                    onChange={(e) => set("currentProvider", e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="GoCardless">GoCardless</option>
                    <option value="Stripe">Stripe</option>
                    <option value="Airwallex">Airwallex</option>
                    <option value="Adyen">Adyen</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Other">Other</option>
                    <option value="Not currently using one">Not currently using one</option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>How can we help?</span>
                  <textarea
                    className={styles.textarea}
                    placeholder="Tell us a little about your business and what you're looking to achieve. The more context you provide, the better we can help."
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    required
                  />
                </label>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={form.updates}
                    onChange={(e) => set("updates", e.target.checked)}
                  />
                  I&apos;d like to receive occasional product updates from Praevor.
                </label>

                <div className={styles.formActions}>
                  <button type="submit" className={styles.submitBtn} disabled={submitting}>
                    {submitting ? "Sending…" : "Send Message"}
                    {!submitting && <ArrowIcon />}
                  </button>
                  <button type="button" className={styles.cancelBtn} onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Confirmation ───────────────────────────────────────────────────────────────

function Confirmation({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.confirm}>
      <span className={styles.confirmBadge}>
        <CheckCircleIcon /> Message received
      </span>
      <h2 className={styles.confirmHeading}>
        Thanks — we&apos;ve got your message.
      </h2>
      <p className={styles.confirmBody}>
        One of our team will review your enquiry and get back to you shortly.
        If your enquiry is urgent or relates to an existing customer account,
        we&apos;ll prioritise it accordingly.
      </p>
      <button className={styles.confirmClose} onClick={onClose}>
        Done
        <ArrowIcon />
      </button>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function SalesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6.5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PartnershipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M7 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 2a8 8 0 1 1 0 16A8 8 0 0 1 10 2z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PressIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 8h7M6.5 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 7l1.75 1.75L9.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
