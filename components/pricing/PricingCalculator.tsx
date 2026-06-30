"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pricing, currencies, regionalPrices } from "@/config/pricing";
import { useCurrency } from "@/context/CurrencyContext";
import styles from "./pricing-calculator.module.css";

const PLAN_OPTIONS = [
  { id: "standard", label: "Standard" },
  { id: "growth", label: "Growth" },
  { id: "enterprise", label: "Enterprise" },
] as const;

type PlanId = (typeof PLAN_OPTIONS)[number]["id"];

type PaymentType = "recurring" | "oneoff" | "mixed";

const PAYMENT_TYPE_OPTIONS: { value: PaymentType; label: string }[] = [
  { value: "recurring", label: "Mostly recurring" },
  { value: "oneoff", label: "Mostly one-off" },
  { value: "mixed", label: "Mixed" },
];

/** Parse a fee string like "1.1% + 20p", "1.35% + €0.25", "1.20% + $0.30"
 *  Returns { pct: 0.011, fixed: 0.20 } */
function parseFeeString(fee: string): { pct: number; fixed: number } {
  const pctMatch = fee.match(/([\d.]+)%/);
  const fixedMatch = fee.match(/[+]\s*[£€$]?([\d.]+)p?/);
  const pct = pctMatch ? parseFloat(pctMatch[1]) / 100 : 0;
  let fixed = 0;
  if (fixedMatch) {
    const raw = parseFloat(fixedMatch[1]);
    // if the string contains "p" after the number it's pence
    const isPence = /[\d.]+p/.test(fee);
    fixed = isPence ? raw / 100 : raw;
  }
  return { pct, fixed };
}

function calcAdminTime(monthlyVolume: number, paymentType: PaymentType, plan: PlanId): number {
  let base: number;
  if (monthlyVolume < 10000) {
    base = 7;
  } else if (monthlyVolume < 50000) {
    base = 14;
  } else if (monthlyVolume < 100000) {
    base = 22;
  } else {
    base = 35;
  }
  if (paymentType === "recurring") base += 2;
  if (paymentType === "oneoff") base -= 2;
  if (plan === "growth" || plan === "enterprise") base += 4;
  return Math.max(1, base);
}

function useAnimatedOpacity(dep: unknown): boolean {
  const [faded, setFaded] = useState(false);
  const prevRef = useRef(dep);
  useEffect(() => {
    if (prevRef.current !== dep) {
      prevRef.current = dep;
      setFaded(true);
      const t = setTimeout(() => setFaded(false), 120);
      return () => clearTimeout(t);
    }
  }, [dep]);
  return faded;
}

export function PricingCalculator() {
  const { calculator } = pricing;
  const { currency } = useCurrency();
  const sym = currencies[currency].symbol;

  const [selectedPlan, setSelectedPlan] = useState<PlanId>("standard");
  const [volumeRaw, setVolumeRaw] = useState("25000");
  const [avgPaymentRaw, setAvgPaymentRaw] = useState("45");
  const [paymentType, setPaymentType] = useState<PaymentType>("mixed");

  // Debounced committed values
  const [monthlyVolume, setMonthlyVolume] = useState(25000);
  const [avgPayment, setAvgPayment] = useState(45);

  const debounceVolumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceAvgRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleVolumeChange = useCallback((val: string) => {
    setVolumeRaw(val);
    if (debounceVolumeRef.current) clearTimeout(debounceVolumeRef.current);
    debounceVolumeRef.current = setTimeout(() => {
      const n = parseFloat(val.replace(/,/g, ""));
      if (!isNaN(n) && n >= 0) setMonthlyVolume(n);
    }, 300);
  }, []);

  const handleAvgChange = useCallback((val: string) => {
    setAvgPaymentRaw(val);
    if (debounceAvgRef.current) clearTimeout(debounceAvgRef.current);
    debounceAvgRef.current = setTimeout(() => {
      const n = parseFloat(val.replace(/,/g, ""));
      if (!isNaN(n) && n > 0) setAvgPayment(n);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceVolumeRef.current) clearTimeout(debounceVolumeRef.current);
      if (debounceAvgRef.current) clearTimeout(debounceAvgRef.current);
    };
  }, []);

  const transactionCount = avgPayment > 0 ? Math.round(monthlyVolume / avgPayment) : 0;

  // Monthly cost
  let monthlyCost: number | null = null;
  if (selectedPlan !== "enterprise") {
    const rates = regionalPrices[currency];
    const feeString = selectedPlan === "standard" ? rates.standard : rates.growth;
    const { pct, fixed } = parseFeeString(feeString);
    monthlyCost = monthlyVolume * pct + transactionCount * fixed;
  }

  // Revenue protected
  let revenueProtected: number | null = null;
  if (selectedPlan === "growth") {
    revenueProtected = monthlyVolume * 0.009;
  } else if (selectedPlan === "enterprise") {
    revenueProtected = monthlyVolume * 0.014;
  }

  // Admin time
  const adminTime = calcAdminTime(monthlyVolume, paymentType, selectedPlan);

  // Net impact (Growth only)
  let netImpact: number | null = null;
  if (selectedPlan === "growth" && revenueProtected !== null && monthlyCost !== null) {
    netImpact = revenueProtected - monthlyCost;
  }

  const faded = useAnimatedOpacity(
    `${selectedPlan}|${monthlyVolume}|${avgPayment}|${paymentType}|${currency}`
  );

  const valueStyle: React.CSSProperties = {
    opacity: faded ? 0.55 : 1,
    transition: "opacity 0.15s ease",
  };

  function fmt(n: number): string {
    return n.toLocaleString("en-GB", { maximumFractionDigits: 0 });
  }

  return (
    <section className={styles.section} aria-label="ROI calculator">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{calculator.heading}</h2>
        <p className={styles.subheading}>{calculator.subheading}</p>

        <div className={styles.card}>
          {/* Plan selector */}
          <div className={styles.planTabs} role="tablist" aria-label="Select a plan">
            {PLAN_OPTIONS.map((plan) => (
              <button
                key={plan.id}
                type="button"
                role="tab"
                aria-selected={selectedPlan === plan.id}
                className={
                  selectedPlan === plan.id
                    ? `${styles.planTab} ${styles.planTabActive}`
                    : styles.planTab
                }
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.label}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className={styles.inputs}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>How much do you collect each month?</span>
              <div className={styles.currencyInputWrap}>
                <span className={styles.currencyPrefix}>{sym}</span>
                <input
                  type="number"
                  min={0}
                  className={`${styles.fieldInput} ${styles.fieldInputPrefixed}`}
                  value={volumeRaw}
                  onChange={(e) => handleVolumeChange(e.target.value)}
                  placeholder="25000"
                  aria-label={`Monthly payment volume in ${currency}`}
                />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>What is your average payment amount?</span>
              <div className={styles.currencyInputWrap}>
                <span className={styles.currencyPrefix}>{sym}</span>
                <input
                  type="number"
                  min={1}
                  className={`${styles.fieldInput} ${styles.fieldInputPrefixed}`}
                  value={avgPaymentRaw}
                  onChange={(e) => handleAvgChange(e.target.value)}
                  placeholder="45"
                  aria-label={`Average payment amount in ${currency}`}
                />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Payment type</span>
              <select
                className={`${styles.fieldInput} ${styles.fieldSelect}`}
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as PaymentType)}
              >
                {PAYMENT_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Derived: estimated transactions */}
          <p className={styles.derivedLine} style={valueStyle}>
            Approx. {fmt(transactionCount)} payments/month based on your inputs
          </p>

          {/* Metric cards */}
          <div className={styles.cards}>
            {/* Card 1: Monthly Cost */}
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>Estimated monthly cost</span>
              <span className={styles.metricValue} style={valueStyle}>
                {selectedPlan === "enterprise"
                  ? "Custom pricing"
                  : monthlyCost !== null
                  ? `${sym}${fmt(monthlyCost)}/month`
                  : "—"}
              </span>
            </div>

            {/* Card 2: Revenue Protected */}
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>
                Estimated revenue protected
                <span className={styles.tooltip} aria-label="How we estimate revenue protected">
                  <span className={styles.tooltipIcon}>i</span>
                  <span className={styles.tooltipText}>
                    Based on estimated reductions in failed collections and automated payment recovery. Actual results vary.
                  </span>
                </span>
              </span>
              <span className={styles.metricValue} style={valueStyle}>
                {selectedPlan === "standard" ? (
                  <span className={styles.metricMuted}>No automated recovery on Standard</span>
                ) : revenueProtected !== null ? (
                  `approx. ${sym}${fmt(revenueProtected)}/month`
                ) : (
                  "—"
                )}
              </span>
            </div>

            {/* Card 3: Admin Time Saved */}
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>
                Estimated admin time saved
                <span className={styles.tooltip} aria-label="How we estimate admin time saved">
                  <span className={styles.tooltipIcon}>i</span>
                  <span className={styles.tooltipText}>
                    Estimate based on automated reconciliation, payment reminders, reporting and payment operations.
                  </span>
                </span>
              </span>
              <span className={styles.metricValue} style={valueStyle}>
                {adminTime} hrs/month
              </span>
            </div>

            {/* Card 4: Net Impact (Growth only) */}
            {selectedPlan === "growth" && netImpact !== null ? (
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Net monthly impact</span>
                <span
                  className={styles.metricValue}
                  style={{
                    ...valueStyle,
                    color: netImpact >= 0 ? "#22c55e" : undefined,
                  }}
                >
                  {netImpact >= 0
                    ? `+${sym}${fmt(netImpact)}/month`
                    : `-${sym}${fmt(Math.abs(netImpact))}/month`}
                </span>
              </div>
            ) : null}
          </div>

          <p className={styles.disclaimer}>
            These estimates are illustrative and based on the information provided. Actual fees and savings may vary depending on payment behaviour, payment methods and account configuration.
          </p>
        </div>
      </div>
    </section>
  );
}
