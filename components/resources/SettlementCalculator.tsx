"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./settlement-calculator.module.css";

/* ─── Constants ─────────────────────────────────────────────────────────────── */

const LS_PREFIX = "praevor_stc_";

const SETTLEMENT_RULES = {
  "direct-debit": {
    standardDays: 3,
    cutoffHour: 14,
    description: "Recurring Direct Debit",
  },
  "open-banking": {
    standardDays: 1,
    cutoffHour: 16,
    description: "Open Banking Payment",
  },
  "bank-transfer": {
    standardDays: 1,
    cutoffHour: 15,
    description: "Bank Transfer",
  },
  "one-off": {
    standardDays: 2,
    cutoffHour: 14,
    description: "One-off Bank Payment",
  },
} as const;

type PaymentMethod = keyof typeof SETTLEMENT_RULES;

const UK_BANK_HOLIDAYS = [
  "2025-01-01",
  "2025-04-18",
  "2025-04-21",
  "2025-05-05",
  "2025-05-26",
  "2025-08-25",
  "2025-12-25",
  "2025-12-26",
  "2026-01-01",
  "2026-04-03",
  "2026-04-06",
  "2026-05-04",
  "2026-05-25",
  "2026-08-31",
  "2026-12-25",
  "2026-12-28",
];

const TIMELINE_STEPS = [
  "Payment Created",
  "Collection Submitted",
  "Bank Processing",
  "Settlement",
  "Funds Available",
];

/* ─── Helpers ───────────────────────────────────────────────────────────────── */

function toDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isWeekend(d: Date): boolean {
  const dow = d.getDay();
  return dow === 0 || dow === 6;
}

function isBankHoliday(d: Date): boolean {
  return UK_BANK_HOLIDAYS.includes(toDateString(d));
}

function isNonBusinessDay(d: Date): boolean {
  return isWeekend(d) || isBankHoliday(d);
}

function addBusinessDays(startDate: Date, days: number): Date {
  let count = 0;
  const d = new Date(startDate);
  while (count < days) {
    d.setDate(d.getDate() + 1);
    if (!isNonBusinessDay(d)) {
      count++;
    }
  }
  return d;
}

function countWeekendsInRange(start: Date, end: Date): number {
  let count = 0;
  const d = new Date(start);
  d.setDate(d.getDate() + 1);
  while (d <= end) {
    if (isWeekend(d)) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

function countHolidaysInRange(start: Date, end: Date): number {
  let count = 0;
  const d = new Date(start);
  d.setDate(d.getDate() + 1);
  while (d <= end) {
    if (isBankHoliday(d) && !isWeekend(d)) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

function formatSettlementDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function todayString(): string {
  return toDateString(new Date());
}

function currentTimeString(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function loadLS(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return localStorage.getItem(LS_PREFIX + key) ?? fallback;
}

function saveLS(key: string, value: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_PREFIX + key, value);
}

/* ─── Calculation ───────────────────────────────────────────────────────────── */

interface CalcResult {
  settlementDate: Date;
  businessDays: number;
  weekendsSpanned: number;
  holidaysSpanned: number;
  afterCutoff: boolean;
  rule: (typeof SETTLEMENT_RULES)[PaymentMethod];
  timelineStage: number;
}

function calculate(
  paymentMethod: PaymentMethod,
  collectionDate: string,
  collectionTime: string
): CalcResult {
  const rule = SETTLEMENT_RULES[paymentMethod];
  const [hourStr, minuteStr] = collectionTime.split(":");
  const collectionHour = parseInt(hourStr, 10);
  const collectionMinute = parseInt(minuteStr || "0", 10);

  const afterCutoff =
    collectionHour > rule.cutoffHour ||
    (collectionHour === rule.cutoffHour && collectionMinute > 0);

  const effectiveDays = rule.standardDays + (afterCutoff ? 1 : 0);

  const startDate = new Date(collectionDate + "T00:00:00");
  const settlementDate = addBusinessDays(startDate, effectiveDays);

  const weekendsSpanned = countWeekendsInRange(startDate, settlementDate);
  const holidaysSpanned = countHolidaysInRange(startDate, settlementDate);

  // Timeline stage: 0=created, 1=submitted, 2=processing, 3=settlement, 4=available
  const today = toDateString(new Date());
  let timelineStage = 0;
  if (today === collectionDate) {
    timelineStage = 1;
  } else if (today > collectionDate && today < toDateString(settlementDate)) {
    timelineStage = 2;
  } else if (today === toDateString(settlementDate)) {
    timelineStage = 3;
  } else if (today > toDateString(settlementDate)) {
    timelineStage = 4;
  }

  return {
    settlementDate,
    businessDays: effectiveDays,
    weekendsSpanned,
    holidaysSpanned,
    afterCutoff,
    rule,
    timelineStage,
  };
}

/* ─── Tooltip ───────────────────────────────────────────────────────────────── */

function Tooltip({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <span className={styles.tooltipWrapper}>
      <button
        className={styles.tooltipTrigger}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        aria-label="More information"
        type="button"
      >
        ?
      </button>
      {visible && <span className={styles.tooltipText}>{text}</span>}
    </span>
  );
}

/* ─── Static content ────────────────────────────────────────────────────────── */

const EDU_ITEMS = [
  {
    heading: "Business days",
    body: "Settlement only progresses on business days — Monday to Friday, excluding public holidays. Weekends and bank holidays do not count toward settlement time.",
  },
  {
    heading: "Cut-off times",
    body: "Each payment method has a daily cut-off time. Payments submitted after this time are treated as if submitted the following business day, adding one extra day to settlement.",
  },
  {
    heading: "Weekends",
    body: "Payments collected on a Friday or over the weekend will not begin processing until Monday. This means weekend collections typically settle later in the following week.",
  },
  {
    heading: "Public holidays",
    body: "UK bank holidays pause payment processing in the same way as weekends. If a bank holiday falls mid-settlement, it adds one business day to the settlement timeline.",
  },
  {
    heading: "Payment method",
    body: "Different payment schemes have different settlement windows. Open Banking and bank transfers typically settle faster than Direct Debit, which carries a statutory three-day window.",
  },
  {
    heading: "Bank processing",
    body: "Once submitted, payments must pass through the interbank clearing system. Each participant in the chain — your bank, the scheme operator, and the receiving bank — introduces processing time.",
  },
  {
    heading: "Settlement preferences",
    body: "Standard settlement follows scheme rules. Some platforms offer instant or same-day settlement by advancing funds from their own balance — typically reserved for verified enterprise accounts.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is settlement?",
    a: "Settlement is the process by which collected funds are transferred from the payer's bank to your business account. It is distinct from collection (the instruction to move funds) and typically occurs one to three business days after the payment is collected, depending on the payment method.",
  },
  {
    q: "Why haven't I received my payment yet?",
    a: "The most common reasons are that the payment was collected after the daily cut-off time, the collection date fell on or before a weekend or bank holiday, or the payment is still progressing through the interbank clearing system. Use this calculator to estimate your expected settlement date.",
  },
  {
    q: "Do weekends affect settlement?",
    a: "Yes. Banks and payment schemes do not process settlements on Saturdays and Sundays. A payment collected on a Friday afternoon will not begin settling until Monday at the earliest, meaning funds typically arrive on Tuesday or Wednesday.",
  },
  {
    q: "Do bank holidays delay payouts?",
    a: "Yes. UK bank holidays are treated identically to weekends for settlement purposes. If a bank holiday falls during your settlement window, one additional business day is added to the expected settlement date.",
  },
  {
    q: "Can settlement happen instantly?",
    a: "Instant settlement is available on some platforms for eligible accounts, typically through a service where the payment provider advances funds from their own balance while they await interbank settlement. Praevor offers this as an enterprise feature — contact our sales team to find out if your account qualifies.",
  },
  {
    q: "What is the difference between collection and settlement?",
    a: "Collection is the moment a payment instruction is submitted to the banking system — for example, when a Direct Debit is presented. Settlement is when the funds physically arrive in your account. There is always a gap between the two, governed by payment scheme rules.",
  },
  {
    q: "How accurate are these estimates?",
    a: "This calculator applies published scheme rules and known UK bank holidays to produce a best estimate. Actual settlement times may vary due to bank-specific processing delays, account verification holds, or exceptional circumstances. Treat these results as a reliable guide rather than a guarantee.",
  },
];

/* ─── Main component ────────────────────────────────────────────────────────── */

export function SettlementCalculator() {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("direct-debit");
  const [collectionDate, setCollectionDate] = useState(todayString());
  const [collectionTime, setCollectionTime] = useState(currentTimeString());
  const [country, setCountry] = useState("UK");
  const [settlementPreference, setSettlementPreference] = useState("standard");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPaymentMethod(
      (loadLS("paymentMethod", "direct-debit") as PaymentMethod) ||
        "direct-debit"
    );
    setCollectionDate(loadLS("collectionDate", todayString()));
    setCollectionTime(loadLS("collectionTime", currentTimeString()));
    setCountry(loadLS("country", "UK"));
    setSettlementPreference(loadLS("settlementPreference", "standard"));
    setPaymentAmount(loadLS("paymentAmount", ""));
    setHydrated(true);
  }, []);

  const persist = useCallback(
    (key: string, value: string, setter: (v: string) => void) => {
      setter(value);
      saveLS(key, value);
    },
    []
  );

  const result = calculate(paymentMethod, collectionDate, collectionTime);

  const amountNum = parseFloat(paymentAmount) || 0;
  const rule = SETTLEMENT_RULES[paymentMethod];

  const contextualInsights: string[] = [];
  if (paymentMethod === "direct-debit") {
    contextualInsights.push(
      "Direct Debit has a 3-day settlement window by scheme rules. Instant Settlement can reduce this to same-day for eligible enterprise accounts."
    );
  }
  if (result.afterCutoff) {
    contextualInsights.push(
      `Submitting collections before ${rule.cutoffHour}:00 on business days avoids an additional day of settlement delay.`
    );
  }
  if (paymentMethod !== "open-banking") {
    contextualInsights.push(
      "Open Banking payments typically settle in 1 business day, making them the fastest method for one-off collections."
    );
  } else {
    contextualInsights.push(
      "Open Banking is already your fastest available settlement option at 1 business day when submitted before the cut-off."
    );
  }

  if (!hydrated) return null;

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Free Business Tool</p>
          <h1 className={styles.heroHeading}>
            Settlement Time Calculator.
          </h1>
          <p className={styles.heroBody}>
            Estimate exactly when your payments will settle based on payment
            method, collection time, and business days. Enter your details below
            to get an accurate settlement date accounting for weekends and UK
            bank holidays.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className={styles.calculatorSection}>
        <div className={styles.calculatorInner}>
          <div className={styles.calculatorCard}>
            <div className={styles.calculatorGrid}>
              {/* Inputs */}
              <div className={styles.inputsCol}>
                <h2 className={styles.colHeading}>Payment details</h2>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="paymentMethod">
                    Payment method
                  </label>
                  <select
                    id="paymentMethod"
                    className={styles.input}
                    value={paymentMethod}
                    onChange={(e) =>
                      persist(
                        "paymentMethod",
                        e.target.value,
                        (v) => setPaymentMethod(v as PaymentMethod)
                      )
                    }
                  >
                    <option value="direct-debit">Recurring Direct Debit</option>
                    <option value="open-banking">Open Banking Payment</option>
                    <option value="bank-transfer">Bank Transfer</option>
                    <option value="one-off">One-off Bank Payment</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="collectionDate">
                    Collection date
                  </label>
                  <input
                    id="collectionDate"
                    type="date"
                    className={styles.input}
                    value={collectionDate}
                    onChange={(e) =>
                      persist("collectionDate", e.target.value, setCollectionDate)
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="collectionTime">
                    Collection time
                  </label>
                  <input
                    id="collectionTime"
                    type="time"
                    className={styles.input}
                    value={collectionTime}
                    onChange={(e) =>
                      persist("collectionTime", e.target.value, setCollectionTime)
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="country">
                    Country
                  </label>
                  <select
                    id="country"
                    className={styles.input}
                    value={country}
                    onChange={(e) =>
                      persist("country", e.target.value, setCountry)
                    }
                  >
                    <option value="UK">United Kingdom</option>
                    <option value="EU" disabled>
                      European Union (coming soon)
                    </option>
                    <option value="US" disabled>
                      United States (coming soon)
                    </option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="settlementPreference">
                    Settlement preference{" "}
                    <Tooltip text="Instant settlement is available for enterprise accounts only. Contact our sales team to find out if your account qualifies." />
                  </label>
                  <select
                    id="settlementPreference"
                    className={styles.input}
                    value={settlementPreference}
                    onChange={(e) =>
                      persist(
                        "settlementPreference",
                        e.target.value,
                        setSettlementPreference
                      )
                    }
                  >
                    <option value="standard">Standard</option>
                    <option value="instant" disabled>
                      Instant (Enterprise only)
                    </option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="paymentAmount">
                    Payment amount (£) — optional
                  </label>
                  <input
                    id="paymentAmount"
                    type="number"
                    className={styles.input}
                    value={paymentAmount}
                    min={0}
                    placeholder="e.g. 1500"
                    onChange={(e) =>
                      persist("paymentAmount", e.target.value, setPaymentAmount)
                    }
                  />
                </div>
              </div>

              {/* Results */}
              <div className={styles.resultsCol}>
                <h2 className={styles.colHeading}>Settlement estimate</h2>

                {/* Date card */}
                <div className={styles.dateCard}>
                  <div className={styles.dateCardLabel}>Expected settlement</div>
                  <div className={styles.settlementDate}>
                    {formatSettlementDate(result.settlementDate)}
                  </div>
                  <div className={styles.settlementDay}>
                    {result.rule.description}
                  </div>
                </div>

                {/* Metric cards */}
                <div className={styles.metricsGrid}>
                  <div className={styles.metricCard}>
                    <div className={styles.metricValue}>
                      {result.businessDays}
                    </div>
                    <div className={styles.metricLabel}>Business days</div>
                  </div>

                  <div className={styles.metricCard}>
                    <div className={styles.metricValue}>
                      {result.weekendsSpanned}
                    </div>
                    <div className={styles.metricLabel}>Weekends spanned</div>
                  </div>

                  <div className={styles.metricCard}>
                    <div className={styles.metricValue}>
                      {result.holidaysSpanned}
                    </div>
                    <div className={styles.metricLabel}>
                      Bank holidays in window
                    </div>
                  </div>

                  <div className={styles.metricCard}>
                    <div className={styles.metricValue}>
                      <span
                        className={
                          result.afterCutoff
                            ? styles.badgeWarning
                            : styles.badgeOk
                        }
                      >
                        {result.afterCutoff ? "After cut-off" : "Before cut-off"}
                      </span>
                    </div>
                    <div className={styles.metricLabel}>Processing status</div>
                  </div>
                </div>

                {/* Explanation text */}
                <div className={styles.explanationPanel}>
                  {result.weekendsSpanned > 0 && (
                    <p className={styles.explanationItem}>
                      This payment spans a weekend, which adds to settlement
                      time.
                    </p>
                  )}
                  {result.holidaysSpanned > 0 && (
                    <p className={styles.explanationItem}>
                      A bank holiday has been accounted for in this estimate.
                    </p>
                  )}
                  {result.afterCutoff && (
                    <p className={styles.explanationItem}>
                      This payment was collected after the {rule.cutoffHour}:00
                      processing cut-off and will begin processing the next
                      business day.
                    </p>
                  )}
                  <p className={styles.explanationItem}>
                    Settlement times are estimates. Actual timing may vary.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className={styles.timelineSection}>
              <h3 className={styles.timelineSectionHeading}>
                Payment journey
              </h3>
              <div className={styles.timeline}>
                {TIMELINE_STEPS.map((step, i) => {
                  const isPast = i < result.timelineStage;
                  const isActive = i === result.timelineStage;
                  return (
                    <div key={step} className={styles.timelineStep}>
                      {i < TIMELINE_STEPS.length - 1 && (
                        <div
                          className={`${styles.timelineConnector} ${isPast || isActive ? styles.timelineConnectorActive : ""}`}
                        />
                      )}
                      <div
                        className={`${styles.timelineDot} ${isActive ? styles.timelineDotActive : ""} ${isPast ? styles.timelineDotPast : ""}`}
                      />
                      <span className={styles.timelineLabel}>{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cash flow impact */}
          {amountNum > 0 && (
            <div className={styles.cashFlowSection}>
              <h3 className={styles.cashFlowHeading}>Cash flow impact</h3>
              <p className={styles.cashFlowBody}>
                Your business will have access to{" "}
                <strong>
                  £
                  {amountNum.toLocaleString("en-GB", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>{" "}
                in approximately{" "}
                <strong>
                  {result.businessDays} business{" "}
                  {result.businessDays === 1 ? "day" : "days"}
                </strong>
                . If you process similar payments throughout the month,
                improving settlement time by one business day on your average
                volume could meaningfully improve working capital.
              </p>
            </div>
          )}

          {/* Insights */}
          <div className={styles.insightsSection}>
            <div className={styles.insightsPanel}>
              {contextualInsights.map((insight, i) => (
                <p key={i} className={styles.insightItem}>
                  {insight}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Educational */}
      <section className={styles.eduSection}>
        <div className={styles.eduInner}>
          <h2 className={styles.eduHeading}>What affects settlement time?</h2>
          <p className={styles.eduSubtext}>
            Settlement isn&apos;t instant. Understanding the factors that influence
            timing helps you plan collections more effectively.
          </p>
          <div className={styles.eduGrid}>
            {EDU_ITEMS.map((item) => (
              <div key={item.heading} className={styles.eduItem}>
                <h3 className={styles.eduItemHeading}>{item.heading}</h3>
                <p className={styles.eduItemBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <h2 className={styles.faqHeading}>Frequently asked questions</h2>
          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{item.q}</h3>
                <p className={styles.faqAnswer}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaHeading}>
            Need faster access to your funds?
          </h2>
          <p className={styles.ctaBody}>
            Praevor helps businesses collect payments, improve cash flow
            visibility and access faster settlement options where available.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact-sales" className={styles.primaryBtn}>
              Book a demo
            </Link>
            <Link href="/pricing" className={styles.secondaryBtn}>
              Explore pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
