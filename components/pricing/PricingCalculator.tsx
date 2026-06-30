"use client";

import { useMemo, useState } from "react";
import { pricing } from "@/config/pricing";
import styles from "./pricing-calculator.module.css";

const PLAN_OPTIONS = [
  { id: "standard", label: "Standard" },
  { id: "growth", label: "Growth" },
  { id: "enterprise", label: "Enterprise" },
] as const;

type PlanId = (typeof PLAN_OPTIONS)[number]["id"];

export function PricingCalculator() {
  const { calculator } = pricing;
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("growth");
  const [transactionCount, setTransactionCount] = useState(500);
  const [averageValue, setAverageValue] = useState(45);

  const results = useMemo(() => {
    // TODO: wire up fee calculation logic based on plan rates above
    const planMultiplier =
      selectedPlan === "standard" ? 1 : selectedPlan === "growth" ? 1.15 : 1.3;
    const estimatedMonthlyCost =
      transactionCount * averageValue * 0.012 * planMultiplier;
    const estimatedRevenueProtected =
      selectedPlan === "growth" || selectedPlan === "enterprise"
        ? transactionCount * averageValue * 0.04
        : 0;
    const estimatedTimeSaved = Math.round(transactionCount / 50) + 2;

    return {
      estimatedMonthlyCost,
      estimatedRevenueProtected,
      estimatedTimeSaved,
    };
  }, [selectedPlan, transactionCount, averageValue]);

  return (
    <section className={styles.section} aria-label="Pricing calculator">
      <div className={styles.inner}>
        <h2 className={styles.heading}>{calculator.heading}</h2>
        <p className={styles.subheading}>{calculator.subheading}</p>

        <div className={styles.card}>
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

          <div className={styles.inputs}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Monthly transactions</span>
              <input
                type="number"
                min={0}
                className={styles.fieldInput}
                value={transactionCount}
                onChange={(event) => setTransactionCount(Number(event.target.value))}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Average transaction value (£)</span>
              <input
                type="number"
                min={0}
                className={styles.fieldInput}
                value={averageValue}
                onChange={(event) => setAverageValue(Number(event.target.value))}
              />
            </label>
          </div>

          <div className={styles.results}>
            <div className={styles.result}>
              <span className={styles.resultLabel}>Estimated monthly cost</span>
              <span className={styles.resultValue}>
                £{results.estimatedMonthlyCost.toFixed(2)}
              </span>
            </div>

            {selectedPlan === "growth" || selectedPlan === "enterprise" ? (
              <div className={styles.result}>
                <span className={styles.resultLabel}>Estimated revenue protected</span>
                <span className={styles.resultValue}>
                  £{results.estimatedRevenueProtected.toFixed(2)}
                </span>
              </div>
            ) : null}

            <div className={styles.result}>
              <span className={styles.resultLabel}>Estimated time saved</span>
              <span className={styles.resultValue}>{results.estimatedTimeSaved} hrs/month</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
