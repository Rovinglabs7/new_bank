"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./switching-cost-calculator.module.css";

const LS_PREFIX = "praevor_scc_";

function fmtGBP(n: number): string {
  return n.toLocaleString("en-GB", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function loadLS(key: string, fallback: number): number {
  if (typeof window === "undefined") return fallback;
  const v = localStorage.getItem(LS_PREFIX + key);
  if (v === null) return fallback;
  const n = parseFloat(v);
  return isNaN(n) ? fallback : n;
}

function loadLSString(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = localStorage.getItem(LS_PREFIX + key);
  return v !== null ? v : fallback;
}

function saveLS(key: string, value: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_PREFIX + key, String(value));
}

function saveLSString(key: string, value: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_PREFIX + key, value);
}

function loadLSBoolArray(key: string, length: number): boolean[] {
  if (typeof window === "undefined") return Array(length).fill(false);
  const v = localStorage.getItem(LS_PREFIX + key);
  if (v === null) return Array(length).fill(false);
  try {
    const parsed = JSON.parse(v);
    if (Array.isArray(parsed) && parsed.length === length) return parsed;
  } catch {
    // ignore
  }
  return Array(length).fill(false);
}

function saveLSBoolArray(key: string, value: boolean[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_PREFIX + key, JSON.stringify(value));
}

const PROVIDERS = [
  "GoCardless",
  "Stripe",
  "Adyen",
  "Airwallex",
  "Wise",
  "Bottomline",
  "Access PaySuite",
  "Other",
];

const EXPERIENCE_ITEMS = [
  "Poor visibility into payment statuses",
  "No automated retry for failed payments",
  "Manual reconciliation with accounting software",
  "No advance warning before payments fail",
  "Slow or no customer support",
  "Limited reporting and analytics",
];

const EDU_ITEMS = [
  {
    heading: "The hidden admin tax",
    body: "Manual payment chasing, reconciliation, and retry work costs the average SME 6-10 hours per week. That's time your team could spend on growth, not admin.",
  },
  {
    heading: "The settlement drag",
    body: "Every extra day your money sits in transit is a day you can't invest, pay suppliers, or grow. Settlement delays compound quietly into a structural cash flow problem.",
  },
  {
    heading: "The failure spiral",
    body: "Without automated retries and prediction, failed payments compound — costing you 3-5x their face value once you factor in admin time, customer churn, and recovery effort.",
  },
];

const FAQ_ITEMS = [
  {
    q: "How long does switching to Praevor take?",
    a: "Most businesses are live within 5 business days. We handle the migration for you.",
  },
  {
    q: "Will my customers need to re-authorise their direct debits?",
    a: "No. Direct debit mandates transfer with you. Your customers won't notice a thing.",
  },
  {
    q: "What happens to my existing payments?",
    a: "All in-flight payments complete normally. We migrate your mandate history and payment schedule.",
  },
  {
    q: "Is there a contract or lock-in?",
    a: "No long-term contracts. Month-to-month, cancel any time.",
  },
  {
    q: "Does Praevor support my accounting software?",
    a: "Yes. We integrate natively with Xero and QuickBooks, with more on the way.",
  },
  {
    q: "What if my failure rate is already low?",
    a: "Great news. We can help you keep it that way — and recover faster when it does happen.",
  },
];

function getProviderRecommendation(provider: string): string {
  if (["GoCardless", "Stripe", "Adyen"].includes(provider)) {
    return `You're using a capable tool, but you may be paying for features you don't need and missing others.`;
  }
  if (["Bottomline", "Access PaySuite"].includes(provider)) {
    return `Legacy systems like ${provider} often mean manual work that modern platforms automate.`;
  }
  return "A custom setup can work, but it often hides significant operational cost.";
}

function getCategoryScore(
  category: string,
  failureRate: number,
  adminHours: number,
  settlementDays: number,
  retries: number,
  checkboxes: boolean[]
): number {
  switch (category) {
    case "Automation": {
      let s = 100;
      if (checkboxes[1]) s -= 40; // no automated retry
      if (checkboxes[2]) s -= 30; // manual reconciliation
      if (adminHours > 10) s -= 30;
      return Math.max(0, s);
    }
    case "Visibility": {
      let s = 100;
      if (checkboxes[0]) s -= 40; // poor visibility
      if (checkboxes[5]) s -= 30; // limited reporting
      return Math.max(0, s);
    }
    case "Cash Flow": {
      let s = 100;
      if (settlementDays > 3) s -= 40;
      if (settlementDays > 6) s -= 20;
      return Math.max(0, s);
    }
    case "Recovery": {
      let s = 100;
      if (failureRate > 7) s -= 40;
      if (checkboxes[1]) s -= 30; // no automated retry
      if (retries > 100) s -= 30;
      return Math.max(0, s);
    }
    case "Reporting": {
      let s = 100;
      if (checkboxes[5]) s -= 50; // limited reporting
      if (checkboxes[0]) s -= 20;
      return Math.max(0, s);
    }
    case "Compliance": {
      let s = 100;
      if (checkboxes[3]) s -= 40; // no advance warning
      if (checkboxes[4]) s -= 30; // slow support
      return Math.max(0, s);
    }
    default:
      return 100;
  }
}

function getPillColor(score: number): string {
  if (score >= 71) return "green";
  if (score >= 41) return "amber";
  return "red";
}

export function SwitchingCostCalculator() {
  const [provider, setProvider] = useState("GoCardless");
  const [paymentsPerMonth, setPaymentsPerMonth] = useState(500);
  const [avgPaymentValue, setAvgPaymentValue] = useState(150);
  const [failureRate, setFailureRate] = useState(5);
  const [adminHours, setAdminHours] = useState(8);
  const [hourlyCost, setHourlyCost] = useState(25);
  const [retries, setRetries] = useState(50);
  const [settlementDays, setSettlementDays] = useState(5);
  const [monthlyRevenue, setMonthlyRevenue] = useState(75000);
  const [checkboxes, setCheckboxes] = useState<boolean[]>(
    Array(EXPERIENCE_ITEMS.length).fill(false)
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProvider(loadLSString("provider", "GoCardless"));
    setPaymentsPerMonth(loadLS("paymentsPerMonth", 500));
    setAvgPaymentValue(loadLS("avgPaymentValue", 150));
    setFailureRate(loadLS("failureRate", 5));
    setAdminHours(loadLS("adminHours", 8));
    setHourlyCost(loadLS("hourlyCost", 25));
    setRetries(loadLS("retries", 50));
    setSettlementDays(loadLS("settlementDays", 5));
    setMonthlyRevenue(loadLS("monthlyRevenue", 75000));
    setCheckboxes(loadLSBoolArray("checkboxes", EXPERIENCE_ITEMS.length));
    setHydrated(true);
  }, []);

  const persist = useCallback(
    (key: string, value: number, setter: (v: number) => void) => {
      setter(value);
      saveLS(key, value);
    },
    []
  );

  const handleCheckbox = useCallback((index: number) => {
    setCheckboxes((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      saveLSBoolArray("checkboxes", next);
      return next;
    });
  }, []);

  // --- Derived calculations (no useEffect) ---
  const monthlyVolume = paymentsPerMonth * avgPaymentValue;
  const failedPaymentCostMonthly =
    (failureRate / 100) * monthlyVolume * 15;
  const adminCostMonthly = adminHours * 4.33 * hourlyCost;

  const dailyRevenue = monthlyRevenue / 30;
  const cashTiedUp = settlementDays * dailyRevenue;
  const annualAdminCost = adminCostMonthly * 12;
  const annualFailedPaymentCost = failedPaymentCostMonthly * 12;
  const totalAnnualHiddenCost = cashTiedUp + annualAdminCost + annualFailedPaymentCost;

  const tickedCount = checkboxes.filter(Boolean).length;

  let maturityScore = 100;
  if (failureRate > 7) maturityScore -= 15;
  if (adminHours > 10) maturityScore -= 10;
  if (settlementDays > 3) maturityScore -= 10;
  maturityScore -= Math.min(tickedCount * 5, 30);
  if (retries > 100) maturityScore -= 10;
  maturityScore = Math.max(0, maturityScore);

  const gaugeColor =
    maturityScore >= 71 ? "#22c55e" : maturityScore >= 41 ? "#f59e0b" : "#ef4444";

  const categories = [
    "Automation",
    "Visibility",
    "Cash Flow",
    "Recovery",
    "Reporting",
    "Compliance",
  ];

  const annualSavings =
    annualAdminCost * 0.6 + annualFailedPaymentCost * 0.4;
  const timeSavedPerYear = adminHours * 52 * 0.6;
  const fasterSettlement = Math.max(0, settlementDays - 2);

  if (!hydrated) return null;

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Free Business Tool</p>
          <h1 className={styles.heroHeading}>
            Is staying with your current provider costing you more than switching?
          </h1>
          <p className={styles.heroBody}>
            Most businesses focus on transaction fees. But the real cost of staying put is
            hidden in manual work, failed payments, and cash flow delays.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className={styles.calculatorSection}>
        <div className={styles.calculatorInner}>
          <div className={styles.calculatorCard}>
            {/* Step 1 — Provider */}
            <div className={styles.step}>
              <div className={styles.stepLabel}>Step 1 — Provider</div>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="provider">
                  Who do you currently use?
                </label>
                <select
                  id="provider"
                  className={styles.select}
                  value={provider}
                  onChange={(e) => {
                    setProvider(e.target.value);
                    saveLSString("provider", e.target.value);
                  }}
                >
                  {PROVIDERS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 2 — Business profile */}
            <div className={styles.step}>
              <div className={styles.stepLabel}>Step 2 — Business profile</div>
              <div className={styles.stepGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="paymentsPerMonth">
                    How many payments do you collect per month?
                  </label>
                  <input
                    id="paymentsPerMonth"
                    type="number"
                    className={styles.input}
                    value={paymentsPerMonth}
                    min={0}
                    onChange={(e) =>
                      persist("paymentsPerMonth", parseFloat(e.target.value) || 0, setPaymentsPerMonth)
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="avgPaymentValue">
                    What is your average payment value? (£)
                  </label>
                  <div className={styles.prefixWrap}>
                    <span className={styles.prefix}>£</span>
                    <input
                      id="avgPaymentValue"
                      type="number"
                      className={`${styles.input} ${styles.inputPrefixed}`}
                      value={avgPaymentValue}
                      min={0}
                      onChange={(e) =>
                        persist("avgPaymentValue", parseFloat(e.target.value) || 0, setAvgPaymentValue)
                      }
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="failureRate">
                    What percentage of your payments fail? (%)
                  </label>
                  <input
                    id="failureRate"
                    type="number"
                    className={styles.input}
                    value={failureRate}
                    min={0}
                    max={30}
                    onChange={(e) =>
                      persist("failureRate", Math.min(30, parseFloat(e.target.value) || 0), setFailureRate)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Step 3 — Current operations */}
            <div className={styles.step}>
              <div className={styles.stepLabel}>Step 3 — Current operations</div>
              <div className={styles.stepGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="adminHours">
                    How many hours per week does your team spend on payment admin?
                  </label>
                  <input
                    id="adminHours"
                    type="number"
                    className={styles.input}
                    value={adminHours}
                    min={0}
                    onChange={(e) =>
                      persist("adminHours", parseFloat(e.target.value) || 0, setAdminHours)
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="hourlyCost">
                    What is your average hourly cost for this work? (£)
                  </label>
                  <div className={styles.prefixWrap}>
                    <span className={styles.prefix}>£</span>
                    <input
                      id="hourlyCost"
                      type="number"
                      className={`${styles.input} ${styles.inputPrefixed}`}
                      value={hourlyCost}
                      min={0}
                      onChange={(e) =>
                        persist("hourlyCost", parseFloat(e.target.value) || 0, setHourlyCost)
                      }
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="retries">
                    How many failed payments do you manually retry each month?
                  </label>
                  <input
                    id="retries"
                    type="number"
                    className={styles.input}
                    value={retries}
                    min={0}
                    onChange={(e) =>
                      persist("retries", parseFloat(e.target.value) || 0, setRetries)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Step 4 — Cash flow */}
            <div className={styles.step}>
              <div className={styles.stepLabel}>Step 4 — Cash flow</div>
              <div className={styles.stepGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="settlementDays">
                    How many days does it take for payments to settle?
                  </label>
                  <input
                    id="settlementDays"
                    type="number"
                    className={styles.input}
                    value={settlementDays}
                    min={1}
                    max={10}
                    onChange={(e) =>
                      persist(
                        "settlementDays",
                        Math.min(10, Math.max(1, parseFloat(e.target.value) || 1)),
                        setSettlementDays
                      )
                    }
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="monthlyRevenue">
                    What is your monthly revenue from direct debit / bank payments? (£)
                  </label>
                  <div className={styles.prefixWrap}>
                    <span className={styles.prefix}>£</span>
                    <input
                      id="monthlyRevenue"
                      type="number"
                      className={`${styles.input} ${styles.inputPrefixed}`}
                      value={monthlyRevenue}
                      min={0}
                      onChange={(e) =>
                        persist("monthlyRevenue", parseFloat(e.target.value) || 0, setMonthlyRevenue)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 — Experience */}
            <div className={styles.step}>
              <div className={styles.stepLabel}>Step 5 — Your experience</div>
              <p className={styles.checkboxGroupLabel}>
                Tick any that apply to your current provider:
              </p>
              <div className={styles.checkboxGrid}>
                {EXPERIENCE_ITEMS.map((item, i) => (
                  <label key={item} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={checkboxes[i]}
                      onChange={() => handleCheckbox(i)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className={styles.resultsSection}>
            {/* Operational Profile */}
            <h2 className={styles.resultsSectionHeading}>Operational profile</h2>
            <div className={styles.profileGrid}>
              <div className={styles.profileCard}>
                <div className={styles.profileValue}>£{fmtGBP(monthlyVolume)}</div>
                <div className={styles.profileLabel}>Monthly payment volume</div>
              </div>
              <div className={styles.profileCard}>
                <div className={styles.profileValue}>£{fmtGBP(failedPaymentCostMonthly)}</div>
                <div className={styles.profileLabel}>Monthly failed payment cost (est.)</div>
              </div>
              <div className={styles.profileCard}>
                <div className={styles.profileValue}>£{fmtGBP(adminCostMonthly)}</div>
                <div className={styles.profileLabel}>Admin cost per month</div>
              </div>
            </div>

            {/* Hidden cost metrics */}
            <h2 className={styles.resultsSectionHeading}>Hidden costs</h2>
            <div className={styles.hiddenCostGrid}>
              <div className={styles.hiddenCostCard}>
                <div className={styles.hiddenCostLabel}>Cash tied up in settlement delays</div>
                <div className={styles.hiddenCostValue}>£{fmtGBP(cashTiedUp)}</div>
              </div>
              <div className={styles.hiddenCostCard}>
                <div className={styles.hiddenCostLabel}>Annual admin cost</div>
                <div className={styles.hiddenCostValue}>£{fmtGBP(annualAdminCost)}</div>
              </div>
              <div className={styles.hiddenCostCard}>
                <div className={styles.hiddenCostLabel}>Annual failed payment cost</div>
                <div className={styles.hiddenCostValue}>£{fmtGBP(annualFailedPaymentCost)}</div>
              </div>
              <div className={`${styles.hiddenCostCard} ${styles.hiddenCostTotal}`}>
                <div className={styles.hiddenCostLabel}>Total annual hidden cost</div>
                <div className={styles.hiddenCostValue}>£{fmtGBP(totalAnnualHiddenCost)}</div>
              </div>
            </div>

            {/* Maturity Score */}
            <div className={styles.maturityCard}>
              <div className={styles.maturityHeader}>
                <div>
                  <div className={styles.maturityTitle}>Operational Maturity Score</div>
                  <div className={styles.maturitySubtitle}>
                    Based on your inputs and experience
                  </div>
                </div>
                <div
                  className={styles.maturityNumber}
                  style={{ color: gaugeColor }}
                >
                  {maturityScore}
                  <span className={styles.maturityMax}>/100</span>
                </div>
              </div>

              <div className={styles.gaugeTrack}>
                <div
                  className={styles.gaugeBar}
                  style={{
                    width: `${maturityScore}%`,
                    background: gaugeColor,
                  }}
                />
              </div>
              <div className={styles.gaugeLabels}>
                <span className={styles.gaugeLabelRed}>0 — Critical</span>
                <span className={styles.gaugeLabelAmber}>40 — Fair</span>
                <span className={styles.gaugeLabelGreen}>70 — Strong</span>
              </div>

              <div className={styles.pillGrid}>
                {categories.map((cat) => {
                  const score = getCategoryScore(
                    cat,
                    failureRate,
                    adminHours,
                    settlementDays,
                    retries,
                    checkboxes
                  );
                  const color = getPillColor(score);
                  return (
                    <div
                      key={cat}
                      className={`${styles.pill} ${styles[`pill${color.charAt(0).toUpperCase()}${color.slice(1)}`]}`}
                    >
                      <span className={styles.pillName}>{cat}</span>
                      <span className={styles.pillScore}>{score}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className={styles.recommendationsCard}>
              <div className={styles.recHeading}>Personalised recommendations</div>
              <p className={styles.recProviderMessage}>
                {getProviderRecommendation(provider)}
              </p>
              <p className={styles.recProaevorMessage}>
                Praevor users typically see settlement 2-3 days faster and reduce failed
                payment rates by up to 40%.
              </p>
            </div>

            {/* Opportunity cost */}
            <div className={styles.opportunityCard}>
              <div className={styles.opportunityEyebrow}>
                If you switched to Praevor today...
              </div>
              <div className={styles.opportunityGrid}>
                <div className={styles.opportunityMetric}>
                  <div className={styles.opportunityValue}>£{fmtGBP(annualSavings)}</div>
                  <div className={styles.opportunityLabel}>Estimated annual savings</div>
                </div>
                <div className={styles.opportunityMetric}>
                  <div className={styles.opportunityValue}>
                    {timeSavedPerYear.toFixed(0)} hrs
                  </div>
                  <div className={styles.opportunityLabel}>Time saved per year</div>
                </div>
                <div className={styles.opportunityMetric}>
                  <div className={styles.opportunityValue}>
                    {fasterSettlement} {fasterSettlement === 1 ? "day" : "days"} sooner
                  </div>
                  <div className={styles.opportunityLabel}>Potential faster settlement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational */}
      <section className={styles.eduSection}>
        <div className={styles.eduInner}>
          <h2 className={styles.eduHeading}>
            Why switching isn&apos;t just about transaction fees
          </h2>
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
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>{item.q}</summary>
                <p className={styles.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaHeading}>
            Ready to find out what switching could save you?
          </h2>
          <p className={styles.ctaBody}>
            Talk to our team. We&apos;ll do a free payment health check for your business.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact-sales" className={styles.primaryBtn}>
              Book a free health check
            </Link>
            <Link href="/signup" className={styles.secondaryBtn}>
              Or get started for free →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
