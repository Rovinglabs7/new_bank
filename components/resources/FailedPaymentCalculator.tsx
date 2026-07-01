"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./failed-payment-calculator.module.css";

const LS_PREFIX = "praevor_fpc_";

function fmt(n: number): string {
  return n.toLocaleString("en-GB", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function fmtHrs(n: number): string {
  return n.toFixed(1);
}

function loadLS(key: string, fallback: number): number {
  if (typeof window === "undefined") return fallback;
  const v = localStorage.getItem(LS_PREFIX + key);
  if (v === null) return fallback;
  const n = parseFloat(v);
  return isNaN(n) ? fallback : n;
}

function saveLS(key: string, value: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_PREFIX + key, String(value));
}

interface Results {
  monthlyPayments: number;
  failedPayments: number;
  delayedRevenue: number;
  recoveredRevenue: number;
  unrecoveredRevenue: number;
  investigateHours: number;
  contactHours: number;
  totalAdminHours: number;
  labourCost: number;
  totalMonthlyCost: number;
  annualOpportunity: number;
}

function calculate(
  volume: number,
  avgPayment: number,
  failedRate: number,
  investigateMinutes: number,
  contactMinutes: number,
  hourlyRate: number,
  teamMembers: number
): Results {
  const monthlyPayments = avgPayment > 0 ? volume / avgPayment : 0;
  const failedPayments = monthlyPayments * (failedRate / 100);
  const delayedRevenue = failedPayments * avgPayment;
  const recoveryRate = 0.65;
  const recoveredRevenue = delayedRevenue * recoveryRate;
  const unrecoveredRevenue = delayedRevenue * (1 - recoveryRate);

  const investigateHours = (failedPayments * investigateMinutes) / 60;
  const contactHours = (failedPayments * contactMinutes) / 60;
  const totalAdminHours = (investigateHours + contactHours) * teamMembers;
  const labourCost = totalAdminHours * hourlyRate;

  const totalMonthlyCost = labourCost + unrecoveredRevenue * 0.1;
  const annualOpportunity =
    totalAdminHours * hourlyRate * 12 + unrecoveredRevenue * 12 * 0.35;

  return {
    monthlyPayments,
    failedPayments,
    delayedRevenue,
    recoveredRevenue,
    unrecoveredRevenue,
    investigateHours,
    contactHours,
    totalAdminHours,
    labourCost,
    totalMonthlyCost,
    annualOpportunity,
  };
}

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

const FAQ_ITEMS = [
  {
    q: "What counts as a failed payment?",
    a: "A failed payment is any payment instruction that is rejected or returned before funds settle. For Direct Debit this includes insufficient funds, account closures, disputed mandates, and bank-level rejections. For open banking payments, failures include expired sessions, declined authorisations, and bank connectivity issues.",
  },
  {
    q: "Why do Direct Debit payments fail?",
    a: "The most common reasons are insufficient funds at the point of collection, closed or switched bank accounts, cancelled mandates, and fraud flags raised by the paying bank. Timing also plays a role — collecting on a day when a customer's account is typically low dramatically increases failure rates.",
  },
  {
    q: "How accurate are these estimates?",
    a: "This calculator uses industry benchmark data and your own inputs to produce indicative estimates. The 65% recovery rate is a commonly cited industry average for Direct Debit failures in the UK — your actual rate may differ depending on your sector, payment type, and how quickly you retry. Treat the output as directional rather than precise.",
  },
  {
    q: "How can businesses reduce failed payments?",
    a: "The most effective interventions are predictive — identifying at-risk payments before collection day and changing collection timing or contacting customers proactively. Automated retry logic, customer communication workflows, and real-time account balance visibility all contribute meaningfully to reducing the rate.",
  },
  {
    q: "Why is cash flow affected even if payments eventually recover?",
    a: "Recovery takes time — typically 7 to 21 days for a resubmission cycle, longer if manual follow-up is required. During that window, the business cannot access those funds, which creates a gap between expected and actual cash inflows. At scale, this gap becomes a structural drag on working capital.",
  },
  {
    q: "How does automation help?",
    a: "Automation removes the manual steps that make failed payments expensive: chasing customers by phone or email, manually logging outcomes, resubmitting payments, and reconciling returned items in accounting software. Automating these steps reduces the per-failure cost to near zero for the operations team, while also improving recovery rates through faster and more consistent follow-up.",
  },
];

const EDU_ITEMS = [
  {
    heading: "Delayed cash flow",
    body: "When a payment fails, revenue that was expected on a specific date is deferred — sometimes by weeks. At scale, this creates a persistent gap between forecasted and actual inflows.",
  },
  {
    heading: "Administrative work",
    body: "Every failed payment generates work: identifying the failure, logging it, deciding on next steps, resubmitting, and reconciling the outcome. This work is largely invisible but accumulates quickly.",
  },
  {
    heading: "Customer communication",
    body: "Someone needs to contact the customer, explain the issue, and coordinate resolution. This requires time, care, and often multiple touchpoints before the payment is recovered.",
  },
  {
    heading: "Finance workload",
    body: "Finance teams must track outstanding balances, reconcile returned payments, update forecasts, and handle write-offs. Failed payments multiply the entries that require human attention.",
  },
  {
    heading: "Reconciliation",
    body: "Returned payments appear in bank feeds as credits that don't map cleanly to invoices. Manual reconciliation of these items adds significant time to month-end close processes.",
  },
  {
    heading: "Forecasting disruption",
    body: "Revenue forecasts assume a known collection rate. When failures are unpredictable, the gap between forecast and actuals widens, making cash flow planning harder and less reliable.",
  },
];

export function FailedPaymentCalculator() {
  const [volume, setVolume] = useState(50000);
  const [avgPayment, setAvgPayment] = useState(250);
  const [failedRate, setFailedRate] = useState(3);
  const [investigateMinutes, setInvestigateMinutes] = useState(20);
  const [contactMinutes, setContactMinutes] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(30);
  const [teamMembers, setTeamMembers] = useState(2);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setVolume(loadLS("volume", 50000));
    setAvgPayment(loadLS("avgPayment", 250));
    setFailedRate(loadLS("failedRate", 3));
    setInvestigateMinutes(loadLS("investigateMinutes", 20));
    setContactMinutes(loadLS("contactMinutes", 15));
    setHourlyRate(loadLS("hourlyRate", 30));
    setTeamMembers(loadLS("teamMembers", 2));
    setHydrated(true);
  }, []);

  const persist = useCallback(
    (key: string, value: number, setter: (v: number) => void) => {
      setter(value);
      saveLS(key, value);
    },
    []
  );

  const results = calculate(
    volume,
    avgPayment,
    failedRate,
    investigateMinutes,
    contactMinutes,
    hourlyRate,
    teamMembers
  );

  const revenueDelayedPct =
    volume > 0 ? ((results.delayedRevenue / volume) * 100).toFixed(1) : "0.0";

  const onePercentSaving =
    (results.monthlyPayments * 0.01 * avgPayment * (1 - 0.65) * 0.35 * 12 +
      ((results.monthlyPayments * 0.01 * investigateMinutes) / 60 +
        (results.monthlyPayments * 0.01 * contactMinutes) / 60) *
        teamMembers *
        hourlyRate *
        12);

  const biggestOppIsLabour = results.labourCost > results.unrecoveredRevenue;

  if (!hydrated) return null;

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Free Business Tool</p>
          <h1 className={styles.heroHeading}>
            Calculate the true cost of failed payments.
          </h1>
          <p className={styles.heroBody}>
            Failed payments don't just delay revenue — they create operational
            overhead that compounds quietly over time. Enter your numbers below
            to see the full picture: delayed cash, unrecovered revenue, and the
            staff time absorbed by manual recovery work.
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
                <h2 className={styles.colHeading}>Your numbers</h2>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="volume">
                    Monthly payment volume (£)
                  </label>
                  <input
                    id="volume"
                    type="number"
                    className={styles.input}
                    value={volume}
                    min={0}
                    onChange={(e) =>
                      persist("volume", parseFloat(e.target.value) || 0, setVolume)
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="avgPayment">
                    Average payment value (£)
                  </label>
                  <input
                    id="avgPayment"
                    type="number"
                    className={styles.input}
                    value={avgPayment}
                    min={1}
                    onChange={(e) =>
                      persist(
                        "avgPayment",
                        parseFloat(e.target.value) || 1,
                        setAvgPayment
                      )
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="failedRate">
                    Estimated failed payment rate
                  </label>
                  <div className={styles.sliderWrap}>
                    <input
                      id="failedRate"
                      type="range"
                      className={styles.slider}
                      min={0}
                      max={10}
                      step={0.1}
                      value={failedRate}
                      onChange={(e) =>
                        persist(
                          "failedRate",
                          parseFloat(e.target.value),
                          setFailedRate
                        )
                      }
                    />
                    <div className={styles.sliderLabels}>
                      <span>0%</span>
                      <span className={styles.sliderValue}>
                        {failedRate.toFixed(1)}%
                      </span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="investigateMinutes">
                    Avg. time investigating each failure (mins)
                  </label>
                  <input
                    id="investigateMinutes"
                    type="number"
                    className={styles.input}
                    value={investigateMinutes}
                    min={0}
                    onChange={(e) =>
                      persist(
                        "investigateMinutes",
                        parseFloat(e.target.value) || 0,
                        setInvestigateMinutes
                      )
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="contactMinutes">
                    Avg. time contacting customer (mins)
                  </label>
                  <input
                    id="contactMinutes"
                    type="number"
                    className={styles.input}
                    value={contactMinutes}
                    min={0}
                    onChange={(e) =>
                      persist(
                        "contactMinutes",
                        parseFloat(e.target.value) || 0,
                        setContactMinutes
                      )
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="hourlyRate">
                    Average hourly staff cost (£)
                  </label>
                  <input
                    id="hourlyRate"
                    type="number"
                    className={styles.input}
                    value={hourlyRate}
                    min={0}
                    onChange={(e) =>
                      persist(
                        "hourlyRate",
                        parseFloat(e.target.value) || 0,
                        setHourlyRate
                      )
                    }
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="teamMembers">
                    Team members involved
                  </label>
                  <input
                    id="teamMembers"
                    type="number"
                    className={styles.input}
                    value={teamMembers}
                    min={1}
                    onChange={(e) =>
                      persist(
                        "teamMembers",
                        parseFloat(e.target.value) || 1,
                        setTeamMembers
                      )
                    }
                  />
                </div>
              </div>

              {/* Results */}
              <div className={styles.resultsCol}>
                <h2 className={styles.colHeading}>Your estimated impact</h2>

                <div className={styles.metricsGrid}>
                  <div className={styles.metricCard}>
                    <div className={styles.metricValue}>
                      £{fmt(results.delayedRevenue)}
                    </div>
                    <div className={styles.metricLabel}>
                      Monthly revenue delayed
                    </div>
                  </div>

                  <div className={styles.metricCard}>
                    <div className={styles.metricValue}>
                      £{fmt(results.unrecoveredRevenue)}
                      <Tooltip text="Based on industry average 65% recovery rate for failed Direct Debit payments in the UK." />
                    </div>
                    <div className={styles.metricLabel}>
                      Estimated unrecovered
                    </div>
                  </div>

                  <div className={styles.metricCard}>
                    <div className={styles.metricValue}>
                      {fmtHrs(results.totalAdminHours)} hrs
                    </div>
                    <div className={styles.metricLabel}>
                      Admin hours per month
                    </div>
                  </div>

                  <div className={styles.metricCard}>
                    <div className={styles.metricValue}>
                      £{fmt(results.labourCost)}
                    </div>
                    <div className={styles.metricLabel}>
                      Estimated labour cost
                    </div>
                  </div>
                </div>

                <div className={styles.opportunityCard}>
                  <div className={styles.opportunityLabel}>
                    Your estimated annual opportunity
                  </div>
                  <div className={styles.opportunityAmount}>
                    £{fmt(results.annualOpportunity)}
                  </div>
                  <div className={styles.opportunitySubtext}>
                    The total operational and revenue cost if current patterns
                    continue
                  </div>
                </div>

                <div className={styles.insightsPanel}>
                  <p className={styles.insightItem}>
                    Your team spends approximately{" "}
                    <strong>{fmtHrs(results.totalAdminHours)} hours</strong>{" "}
                    every month resolving failed payments.
                  </p>
                  <p className={styles.insightItem}>
                    Around{" "}
                    <strong>{revenueDelayedPct}%</strong> of your monthly
                    revenue is temporarily delayed due to failed collections.
                  </p>
                  <p className={styles.insightItem}>
                    Reducing your failed payment rate by 1% could recover
                    approximately{" "}
                    <strong>£{fmt(onePercentSaving)}</strong> per year.
                  </p>
                </div>

                <div className={styles.biggestOpp}>
                  <div className={styles.biggestOppHeading}>
                    Where the cost is concentrated
                  </div>
                  <p className={styles.biggestOppBody}>
                    {biggestOppIsLabour
                      ? `Based on your inputs, the largest component of your failed payment cost is administrative time — your team is spending more on manual recovery work (£${fmt(results.labourCost)}/month) than on direct revenue losses (£${fmt(results.unrecoveredRevenue)}/month in write-offs). This suggests that process automation would have the most immediate impact on your bottom line.`
                      : `Based on your inputs, the largest component of your failed payment cost is unrecovered revenue — direct write-offs (£${fmt(results.unrecoveredRevenue)}/month) exceed your administrative overhead (£${fmt(results.labourCost)}/month). Improving recovery rates through faster retry logic and proactive outreach is likely to generate the greatest return.`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className={styles.comparisonSection}>
            <h2 className={styles.comparisonHeading}>
              Manual recovery vs. automated recovery
            </h2>
            <div className={styles.comparisonGrid}>
              <div className={`${styles.comparisonCard} ${styles.current}`}>
                <div className={styles.comparisonCardHeading}>
                  Current approach
                </div>
                <ul className={styles.comparisonList}>
                  <li>Manual follow-up by email or phone</li>
                  <li>Manual reconciliation in spreadsheets</li>
                  <li>Limited visibility into failure reasons</li>
                  <li>Reactive reporting after the fact</li>
                  <li>No early warning on at-risk payments</li>
                  <li>Inconsistent customer experience</li>
                </ul>
              </div>
              <div className={`${styles.comparisonCard} ${styles.praevor}`}>
                <div className={styles.comparisonCardHeading}>With Praevor</div>
                <ul className={styles.comparisonList}>
                  <li>Automated recovery workflows</li>
                  <li>Automatic reconciliation to your accounts</li>
                  <li>Real-time visibility into every failure</li>
                  <li>AI-powered insights and reporting</li>
                  <li>Failure prediction before collection day</li>
                  <li>Consistent, branded customer communications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational */}
      <section className={styles.eduSection}>
        <div className={styles.eduInner}>
          <h2 className={styles.eduHeading}>
            What does a failed payment really cost?
          </h2>
          <p className={styles.eduSubtext}>
            The sticker price of a failed payment is the amount not collected.
            The true cost includes everything that happens next.
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
            Reduce failed payments before they happen.
          </h2>
          <p className={styles.ctaBody}>
            Praevor helps businesses predict failed payments, automate recovery,
            reconcile payments and reduce manual operational work — all from one
            platform.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact-sales" className={styles.primaryBtn}>
              Book a demo
            </Link>
            <Link href="/pricing" className={styles.secondaryBtn}>
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
