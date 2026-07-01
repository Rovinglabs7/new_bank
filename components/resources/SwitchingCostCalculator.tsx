"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./switching-cost-calculator.module.css";

const LS_PREFIX = "praevor_scc_";

function fmt(n: number): string {
  return n.toLocaleString("en-GB", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function loadLSNum(key: string, fallback: number): number {
  if (typeof window === "undefined") return fallback;
  const v = localStorage.getItem(LS_PREFIX + key);
  if (v === null) return fallback;
  const n = parseFloat(v);
  return isNaN(n) ? fallback : n;
}

function loadLSStr(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = localStorage.getItem(LS_PREFIX + key);
  return v !== null ? v : fallback;
}

function loadLSBoolArr(key: string, fallback: boolean[]): boolean[] {
  if (typeof window === "undefined") return fallback;
  const v = localStorage.getItem(LS_PREFIX + key);
  if (v === null) return fallback;
  try {
    return JSON.parse(v) as boolean[];
  } catch {
    return fallback;
  }
}

function saveLSNum(key: string, value: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_PREFIX + key, String(value));
}

function saveLSStr(key: string, value: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_PREFIX + key, value);
}

function saveLSBoolArr(key: string, value: boolean[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_PREFIX + key, JSON.stringify(value));
}

const CHECKBOX_LABELS = [
  "Manual payment reminders",
  "Manual reconciliation",
  "No payment forecasting",
  "No AI automation",
  "Multiple disconnected systems",
  "No instant settlement",
  "No payment insights",
  "No advance warning before payments fail",
];

const FAQ_ITEMS = [
  {
    q: "How do I estimate my switching costs?",
    a: "Switching costs are typically lower than businesses expect. Direct debit mandates transfer without customer re-authorisation. Most businesses are live within five working days. The main cost is usually the time to migrate data and train your team — often a few days of work.",
  },
  {
    q: "What should I compare when choosing a payment provider?",
    a: "Look beyond transaction fees. Consider settlement speed, failed payment recovery, reconciliation automation, reporting quality, integration with your accounting software and the quality of customer support.",
  },
  {
    q: "Why do operational costs matter more than transaction fees?",
    a: "For most SMEs collecting recurring payments, staff time spent on manual processes costs more annually than the difference in transaction fees between providers. A 0.1% fee saving on £50,000/month is £600/year. A team member spending five hours a week on payment admin costs over £6,000/year.",
  },
  {
    q: "Does switching always save money?",
    a: "Not always. This tool is designed to help you make an informed decision, not to push you towards switching. If your current setup is automated and your team spends minimal time on payment operations, the case for switching may be weaker.",
  },
  {
    q: "How accurate are these estimates?",
    a: "These are estimates based on your inputs and industry benchmarks. They are designed to give you a useful directional view of your operational costs — not precise financial projections. Speak to our team for a more detailed analysis.",
  },
  {
    q: "Can I export this report?",
    a: "PDF export is coming soon. In the meantime, you can print this page using your browser's print function.",
  },
];

function getProviderNote(provider: string): string {
  switch (provider) {
    case "GoCardless":
      return "GoCardless is a capable direct debit platform, though businesses often find they need additional tools for reconciliation, reporting and payment recovery.";
    case "Stripe":
      return "Stripe is a strong developer-first platform. Businesses with complex operational needs sometimes find it requires significant integration work to cover the full payments workflow.";
    case "Adyen":
      return "Adyen is enterprise-grade but can be complex to manage at SME scale without dedicated technical resource.";
    case "Airwallex":
    case "Wise":
      return `Multi-currency platforms like ${provider} are great for FX, though they may not cover the full operational needs of UK direct debit collection.`;
    case "Bottomline":
    case "Access PaySuite":
      return "Legacy platforms often carry manual workflows that modern payment operations tools have largely automated.";
    case "Custom":
      return "Custom payment setups can offer flexibility, but they often hide significant operational and integration overhead.";
    default:
      return "Your current provider may have limitations that are worth reviewing as your business grows.";
  }
}

function getGaugeColor(s: number): string {
  if (s <= 40) return "#dc2626";
  if (s <= 70) return "#d97706";
  return "#16a34a";
}

function getScoreLabel(s: number): string {
  if (s <= 40) return "Needs Attention";
  if (s <= 70) return "Developing";
  return "Strong";
}

function getCategoryScore(
  name: string,
  checkedItems: boolean[],
  settlementDays: number,
  recoveryDays: number,
  failedPaymentRate: number,
  reconciliationFreq: string,
  staffHoursPerMonth: number
): number {
  switch (name) {
    case "Automation": {
      let s = 100;
      if (reconciliationFreq !== "Automatically") s -= 30;
      if (checkedItems[1]) s -= 20;
      if (checkedItems[3]) s -= 20;
      if (staffHoursPerMonth > 15) s -= 15;
      return Math.max(0, Math.min(100, s));
    }
    case "Visibility": {
      let s = 100;
      if (checkedItems[4]) s -= 30;
      if (checkedItems[6]) s -= 30;
      return Math.max(0, Math.min(100, s));
    }
    case "Cash Flow": {
      let s = 100;
      if (settlementDays > 3) s -= 30;
      else if (settlementDays > 1) s -= 15;
      if (recoveryDays > 10) s -= 30;
      else if (recoveryDays > 5) s -= 15;
      return Math.max(0, Math.min(100, s));
    }
    case "Recovery": {
      let s = 100;
      if (failedPaymentRate > 7) s -= 30;
      else if (failedPaymentRate > 5) s -= 15;
      if (checkedItems[7]) s -= 25;
      return Math.max(0, Math.min(100, s));
    }
    case "Reporting": {
      let s = 100;
      if (checkedItems[2]) s -= 35;
      if (checkedItems[6]) s -= 35;
      return Math.max(0, Math.min(100, s));
    }
    case "Compliance":
      return 75;
    default:
      return 75;
  }
}

const CATEGORY_NAMES = [
  "Automation",
  "Visibility",
  "Cash Flow",
  "Recovery",
  "Reporting",
  "Compliance",
];

export function SwitchingCostCalculator() {
  const [provider, setProvider] = useState("GoCardless");
  const [businessType, setBusinessType] = useState("SaaS / Subscription");
  const [monthlyVolume, setMonthlyVolume] = useState(75000);
  const [avgPaymentValue, setAvgPaymentValue] = useState(150);
  const [country, setCountry] = useState("United Kingdom");
  const [employeeCount, setEmployeeCount] = useState("11-50");

  const [failedPerMonth, setFailedPerMonth] = useState(25);
  const [resolveMinutes, setResolveMinutes] = useState(20);
  const [teamSize, setTeamSize] = useState(2);
  const [reconciliationFreq, setReconciliationFreq] = useState("Weekly");

  const [settlementDays, setSettlementDays] = useState(2);
  const [recoveryDays, setRecoveryDays] = useState(7);

  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(8).fill(false)
  );

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProvider(loadLSStr("provider", "GoCardless"));
    setBusinessType(loadLSStr("businessType", "SaaS / Subscription"));
    setMonthlyVolume(loadLSNum("monthlyVolume", 75000));
    setAvgPaymentValue(loadLSNum("avgPaymentValue", 150));
    setCountry(loadLSStr("country", "United Kingdom"));
    setEmployeeCount(loadLSStr("employeeCount", "11-50"));
    setFailedPerMonth(loadLSNum("failedPerMonth", 25));
    setResolveMinutes(loadLSNum("resolveMinutes", 20));
    setTeamSize(loadLSNum("teamSize", 2));
    setReconciliationFreq(loadLSStr("reconciliationFreq", "Weekly"));
    setSettlementDays(loadLSNum("settlementDays", 2));
    setRecoveryDays(loadLSNum("recoveryDays", 7));
    setCheckedItems(loadLSBoolArr("checkedItems", Array(8).fill(false)));
    setHydrated(true);
  }, []);

  // ── Calculations ──────────────────────────────────────────────────────────
  const monthlyTransactions = Math.round(monthlyVolume / avgPaymentValue) || 0;
  const failedPaymentRate =
    monthlyTransactions > 0
      ? (failedPerMonth / monthlyTransactions) * 100
      : 0;
  const monthlyRevenueDelayed = failedPerMonth * avgPaymentValue;
  const annualRevenueDelayed = monthlyRevenueDelayed * 12;

  const staffCostPerHour = 25;
  const staffHoursPerMonth =
    ((failedPerMonth * resolveMinutes) / 60) * teamSize;
  const monthlyLabourCost = staffHoursPerMonth * staffCostPerHour;
  const annualLabourCost = monthlyLabourCost * 12;

  const dailyRevenue = monthlyVolume / 22;
  const cashTiedUp = settlementDays * dailyRevenue;

  const reconciliationHours =
    reconciliationFreq === "Automatically"
      ? 0
      : reconciliationFreq === "Daily"
      ? 10
      : reconciliationFreq === "Weekly"
      ? 4
      : 2;
  const monthlyReconcHours = reconciliationHours;
  const reconcCost = monthlyReconcHours * staffCostPerHour;

  const annualHiddenCost =
    annualLabourCost + reconcCost * 12 + cashTiedUp * 0.05;

  // Maturity score
  let score = 100;
  if (failedPaymentRate > 7) score -= 15;
  if (failedPaymentRate > 5) score -= 10;
  if (staffHoursPerMonth > 15) score -= 10;
  if (staffHoursPerMonth > 8) score -= 5;
  if (settlementDays > 3) score -= 10;
  if (settlementDays > 1) score -= 5;
  if (recoveryDays > 10) score -= 10;
  if (recoveryDays > 5) score -= 5;
  score -= checkedItems.filter(Boolean).length * 5;
  score = Math.max(0, Math.min(100, score));

  const gaugeColor = getGaugeColor(score);
  const scoreLabel = getScoreLabel(score);

  const potentialAnnualHoursSaved = staffHoursPerMonth * 12 * 0.65;
  const potentialRevenueFasterAccess = annualRevenueDelayed * 0.4;
  const potentialAdminSavings = annualLabourCost * 0.6;

  const recommendations: { title: string; body: string }[] = [];
  if (failedPerMonth > 20) {
    recommendations.push({
      title: "Automate payment retries",
      body: "Manual recovery at your scale is time-intensive and error-prone.",
    });
  }
  if (reconciliationFreq !== "Automatically") {
    recommendations.push({
      title: "Automate reconciliation",
      body: "Connecting to Xero or QuickBooks could eliminate manual reconciliation work.",
    });
  }
  if (settlementDays > 2) {
    recommendations.push({
      title: "Review settlement arrangements",
      body: "Faster settlement could improve cash flow predictability.",
    });
  }
  if (checkedItems[0]) {
    recommendations.push({
      title: "Introduce automated payment reminders",
      body: "Proactive communication reduces failed payment rates.",
    });
  }
  if (checkedItems[2]) {
    recommendations.push({
      title: "Add payment forecasting",
      body: "Better visibility helps finance teams plan with confidence.",
    });
  }
  recommendations.push({
    title: "Consolidate payment operations",
    body: "Multiple disconnected systems increase admin overhead and reduce visibility.",
  });

  const providerNote = getProviderNote(provider);

  if (!hydrated) return null;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Free Business Tool</p>
          <h1 className={styles.heroHeading}>
            Is staying with your current provider costing you more than
            switching?
          </h1>
          <p className={styles.heroBody}>
            Compare the operational and financial impact of your current payment
            setup. Discover where delays, manual work and failed collections may
            be costing your business more than you realise.
          </p>
        </div>
      </section>

      {/* ── Calculator ────────────────────────────────────────────────────── */}
      <section className={styles.calculatorSection}>
        <div className={styles.calculatorInner}>
          <div className={styles.calculatorCard}>
            {/* Step 1 */}
            <div className={styles.stepBlock}>
              <p className={styles.stepLabel}>Step 1</p>
              <h2 className={styles.stepHeading}>Current Provider</h2>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="provider">
                  Who do you currently collect payments with?
                </label>
                <select
                  id="provider"
                  className={styles.select}
                  value={provider}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setProvider(e.target.value);
                    saveLSStr("provider", e.target.value);
                  }}
                >
                  <option value="GoCardless">GoCardless</option>
                  <option value="Stripe">Stripe</option>
                  <option value="Adyen">Adyen</option>
                  <option value="Airwallex">Airwallex</option>
                  <option value="Wise">Wise</option>
                  <option value="Bottomline">Bottomline</option>
                  <option value="Access PaySuite">Access PaySuite</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>

            {/* Step 2 */}
            <div className={styles.stepBlock}>
              <p className={styles.stepLabel}>Step 2</p>
              <h2 className={styles.stepHeading}>Business Profile</h2>
              <div className={styles.inputsGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="businessType">
                    Business Type
                  </label>
                  <select
                    id="businessType"
                    className={styles.select}
                    value={businessType}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setBusinessType(e.target.value);
                      saveLSStr("businessType", e.target.value);
                    }}
                  >
                    <option value="SaaS / Subscription">SaaS / Subscription</option>
                    <option value="Membership Organisation">Membership Organisation</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Property">Property</option>
                    <option value="Charity">Charity</option>
                    <option value="Retail">Retail</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="monthlyVolume">
                    Monthly Payment Volume (£)
                  </label>
                  <input
                    id="monthlyVolume"
                    type="number"
                    className={styles.input}
                    value={monthlyVolume}
                    min={0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const v = parseFloat(e.target.value) || 0;
                      setMonthlyVolume(v);
                      saveLSNum("monthlyVolume", v);
                    }}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="avgPaymentValue">
                    Average Payment Value (£)
                  </label>
                  <input
                    id="avgPaymentValue"
                    type="number"
                    className={styles.input}
                    value={avgPaymentValue}
                    min={1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const v = parseFloat(e.target.value) || 1;
                      setAvgPaymentValue(v);
                      saveLSNum("avgPaymentValue", v);
                    }}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    Estimated Monthly Transactions
                  </label>
                  <div className={styles.readOnly}>
                    {monthlyTransactions.toLocaleString()}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="country">
                    Country
                  </label>
                  <select
                    id="country"
                    className={styles.select}
                    value={country}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setCountry(e.target.value);
                      saveLSStr("country", e.target.value);
                    }}
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Netherlands">Netherlands</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="employeeCount">
                    Number of Employees
                  </label>
                  <select
                    id="employeeCount"
                    className={styles.select}
                    value={employeeCount}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setEmployeeCount(e.target.value);
                      saveLSStr("employeeCount", e.target.value);
                    }}
                  >
                    <option value="1-10">1&ndash;10</option>
                    <option value="11-50">11&ndash;50</option>
                    <option value="51-200">51&ndash;200</option>
                    <option value="201-500">201&ndash;500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className={styles.stepBlock}>
              <p className={styles.stepLabel}>Step 3</p>
              <h2 className={styles.stepHeading}>Current Operations</h2>
              <div className={styles.inputsGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="failedPerMonth">
                    Failed payments per month
                  </label>
                  <input
                    id="failedPerMonth"
                    type="number"
                    className={styles.input}
                    value={failedPerMonth}
                    min={0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const v = parseFloat(e.target.value) || 0;
                      setFailedPerMonth(v);
                      saveLSNum("failedPerMonth", v);
                    }}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="resolveMinutes">
                    Time to resolve each failed payment (mins)
                  </label>
                  <input
                    id="resolveMinutes"
                    type="number"
                    className={styles.input}
                    value={resolveMinutes}
                    min={0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const v = parseFloat(e.target.value) || 0;
                      setResolveMinutes(v);
                      saveLSNum("resolveMinutes", v);
                    }}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="teamSize">
                    People involved in payment admin
                  </label>
                  <input
                    id="teamSize"
                    type="number"
                    className={styles.input}
                    value={teamSize}
                    min={1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const v = parseFloat(e.target.value) || 1;
                      setTeamSize(v);
                      saveLSNum("teamSize", v);
                    }}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="reconciliationFreq">
                    Manual reconciliation frequency
                  </label>
                  <select
                    id="reconciliationFreq"
                    className={styles.select}
                    value={reconciliationFreq}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setReconciliationFreq(e.target.value);
                      saveLSStr("reconciliationFreq", e.target.value);
                    }}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Automatically">Automatically</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className={styles.stepBlock}>
              <p className={styles.stepLabel}>Step 4</p>
              <h2 className={styles.stepHeading}>Cash Flow</h2>
              <div className={styles.inputsGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="settlementDays">
                    Average settlement time
                  </label>
                  <select
                    id="settlementDays"
                    className={styles.select}
                    value={settlementDays}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const v = parseInt(e.target.value, 10);
                      setSettlementDays(v);
                      saveLSNum("settlementDays", v);
                    }}
                  >
                    <option value={0}>Same Day</option>
                    <option value={1}>1 Day</option>
                    <option value={2}>2 Days</option>
                    <option value={3}>3 Days</option>
                    <option value={4}>4+ Days</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="recoveryDays">
                    Avg. days until failed payments are recovered
                  </label>
                  <input
                    id="recoveryDays"
                    type="number"
                    className={styles.input}
                    value={recoveryDays}
                    min={0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const v = parseFloat(e.target.value) || 0;
                      setRecoveryDays(v);
                      saveLSNum("recoveryDays", v);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className={styles.stepBlock}>
              <p className={styles.stepLabel}>Step 5</p>
              <h2 className={styles.stepHeading}>Current Experience</h2>
              <p className={styles.stepSubtext}>
                Select all that apply to your current payment setup.
              </p>
              <div className={styles.checkboxGrid}>
                {CHECKBOX_LABELS.map((labelText, i) => (
                  <label key={i} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={checkedItems[i]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const next = [...checkedItems];
                        next[i] = e.target.checked;
                        setCheckedItems(next);
                        saveLSBoolArr("checkedItems", next);
                      }}
                    />
                    <span>{labelText}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ── Section 1: Operational Profile ──────────────────────────── */}
          <div className={styles.resultsSection}>
            <h2 className={styles.resultsSectionHeading}>
              Current Operational Profile
            </h2>
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>
                  &pound;{fmt(monthlyVolume)}
                </div>
                <div className={styles.metricLabel}>Monthly payment volume</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>
                  {monthlyTransactions.toLocaleString()}
                </div>
                <div className={styles.metricLabel}>
                  Estimated monthly transactions
                </div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>
                  &pound;{fmt(monthlyRevenueDelayed)}
                </div>
                <div className={styles.metricLabel}>
                  Monthly failed payment value
                </div>
              </div>
            </div>
          </div>

          {/* ── Section 2: Hidden Operational Cost ──────────────────────── */}
          <div className={styles.resultsSection}>
            <h2 className={styles.resultsSectionHeading}>
              Hidden Operational Cost
            </h2>
            <div className={styles.darkCardsGrid}>
              <div className={styles.darkCard}>
                <div className={styles.darkCardValue}>
                  {staffHoursPerMonth.toFixed(1)} hrs/month
                </div>
                <div className={styles.darkCardLabel}>
                  Staff time on failed payments
                </div>
              </div>
              <div className={styles.darkCard}>
                <div className={styles.darkCardValue}>
                  &pound;{fmt(monthlyLabourCost)}
                </div>
                <div className={styles.darkCardLabel}>
                  Estimated monthly labour cost
                </div>
              </div>
              <div className={styles.darkCard}>
                <div className={styles.darkCardValue}>
                  &pound;{fmt(cashTiedUp)}
                </div>
                <div className={styles.darkCardLabel}>
                  Cash delayed in settlement
                </div>
              </div>
              <div className={styles.darkCard}>
                <div className={styles.darkCardValue}>
                  {monthlyReconcHours} hrs/month
                </div>
                <div className={styles.darkCardLabel}>
                  Reconciliation effort
                </div>
              </div>
            </div>
            <div className={styles.totalImpactCard}>
              <div className={styles.totalImpactLabel}>
                Total estimated annual impact
              </div>
              <div className={styles.totalImpactValue}>
                &pound;{fmt(annualHiddenCost)}
              </div>
              <div className={styles.totalImpactSubtext}>
                Combined labour, reconciliation and cash flow opportunity cost
              </div>
            </div>
          </div>

          {/* ── Section 3: Recommendations ──────────────────────────────── */}
          <div className={styles.resultsSection}>
            <h2 className={styles.resultsSectionHeading}>
              Where Your Business Could Improve
            </h2>
            <div className={styles.recommendationsList}>
              {recommendations.map((rec, i) => (
                <div key={i} className={styles.recommendationItem}>
                  <div className={styles.recommendationTitle}>{rec.title}</div>
                  <div className={styles.recommendationBody}>{rec.body}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Section 4: Opportunity Cost ─────────────────────────────── */}
          <div className={styles.opportunitySection}>
            <div className={styles.opportunityInner}>
              <h2 className={styles.opportunityHeading}>Opportunity Cost</h2>
              <p className={styles.opportunityDisclaimer}>
                These figures represent potential improvements based on industry
                benchmarks. Individual results vary.
              </p>
              <div className={styles.opportunityGrid}>
                <div className={styles.opportunityCard}>
                  <div className={styles.opportunityValue}>
                    {Math.round(potentialAnnualHoursSaved)} hours
                  </div>
                  <div className={styles.opportunityCardLabel}>
                    Annual hours potentially freed
                  </div>
                </div>
                <div className={styles.opportunityCard}>
                  <div className={styles.opportunityValue}>
                    &pound;{fmt(potentialRevenueFasterAccess)}
                  </div>
                  <div className={styles.opportunityCardLabel}>
                    Annual revenue with faster settlement access
                  </div>
                </div>
                <div className={styles.opportunityCard}>
                  <div className={styles.opportunityValue}>
                    &pound;{fmt(potentialAdminSavings)}
                  </div>
                  <div className={styles.opportunityCardLabel}>
                    Potential admin cost savings
                  </div>
                </div>
                <div className={styles.opportunityCard}>
                  <div className={styles.opportunityValue}>Real-time</div>
                  <div className={styles.opportunityCardLabel}>
                    Payments visibility{" "}
                    <span className={styles.vsTag}>vs Delayed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Section 5: Maturity Score ────────────────────────────────── */}
          <div className={styles.resultsSection}>
            <h2 className={styles.resultsSectionHeading}>
              Operational Maturity Score
            </h2>
            <div className={styles.scoreCard}>
              <div className={styles.scoreRow}>
                <span className={styles.scoreNumber}>{score}</span>
                <span
                  className={styles.scoreScaleLabel}
                  style={{ color: gaugeColor }}
                >
                  {scoreLabel}
                </span>
              </div>
              <div className={styles.gaugeTrack}>
                <div
                  className={styles.gaugeFill}
                  style={{ width: `${score}%`, background: gaugeColor }}
                />
              </div>
              <div className={styles.categoryPills}>
                {CATEGORY_NAMES.map((name) => {
                  const cs = getCategoryScore(
                    name,
                    checkedItems,
                    settlementDays,
                    recoveryDays,
                    failedPaymentRate,
                    reconciliationFreq,
                    staffHoursPerMonth
                  );
                  const dotColor = getGaugeColor(cs);
                  return (
                    <div key={name} className={styles.categoryPill}>
                      <span
                        className={styles.pillDot}
                        style={{ background: dotColor }}
                      />
                      <span className={styles.pillName}>{name}</span>
                      <span
                        className={styles.pillScore}
                        style={{ color: dotColor }}
                      >
                        {cs}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.providerNote}>
              <div className={styles.providerNoteHeading}>
                About {provider}
              </div>
              <p className={styles.providerNoteBody}>{providerNote}</p>
              <p className={styles.providerNoteAppend}>
                Praevor users typically report faster settlement, fewer manual
                processes and improved payment recovery rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Educational ───────────────────────────────────────────────────── */}
      <section className={styles.eduSection}>
        <div className={styles.eduInner}>
          <h2 className={styles.eduHeading}>
            Why switching isn&apos;t just about transaction fees
          </h2>
          <div className={styles.eduGrid}>
            <div className={styles.eduItem}>
              <h3 className={styles.eduItemHeading}>The hidden admin tax</h3>
              <p className={styles.eduItemBody}>
                Manual payment chasing, reconciliation and retry work often
                costs SMEs more in staff time than transaction fees alone. Most
                businesses don&apos;t realise how significant this overhead is
                until they measure it.
              </p>
            </div>
            <div className={styles.eduItem}>
              <h3 className={styles.eduItemHeading}>The settlement drag</h3>
              <p className={styles.eduItemBody}>
                Every extra day between collection and settlement is a day your
                business can&apos;t reinvest, pay suppliers or grow. Settlement
                timing directly affects working capital.
              </p>
            </div>
            <div className={styles.eduItem}>
              <h3 className={styles.eduItemHeading}>The failure spiral</h3>
              <p className={styles.eduItemBody}>
                A failed payment is rarely just a failed payment. It triggers
                customer contact, manual retry, reconciliation updates and
                delayed cash flow &mdash; often costing 3&ndash;5x the face
                value of the original transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Transparency ──────────────────────────────────────────────────── */}
      <section className={styles.transparencySection}>
        <div className={styles.transparencyInner}>
          <div className={styles.transparencyBox}>
            <h2 className={styles.transparencyHeading}>
              How these estimates are calculated
            </h2>
            <ul className={styles.transparencyList}>
              <li>
                Staff cost assumed at &pound;25/hour. You can adjust this by
                updating the time inputs.
              </li>
              <li>
                Failed payment recovery costs are estimated based on staff time
                inputs.
              </li>
              <li>
                Cash flow delay cost uses 5% annual opportunity cost on delayed
                capital.
              </li>
              <li>
                All figures are estimates. Actual results depend on your
                provider, team structure and payment volumes.
              </li>
              <li>
                This tool is designed to educate, not to guarantee savings.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
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

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaHeading}>
            See how Praevor can simplify your payment operations.
          </h2>
          <p className={styles.ctaBody}>
            Book a personalised demo to see how businesses reduce manual work,
            improve cash flow visibility and automate payment operations with
            Praevor.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact-sales" className={styles.primaryBtn}>
              Book a demo
            </Link>
            <Link href="/pricing" className={styles.secondaryBtn}>
              Explore pricing &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
