import Link from "next/link";
import { site } from "@/config/site";
import styles from "./demo.module.css";

export const metadata = {
  title: `See how ${site.brand} works`,
};

const tourRows = [
  { name: "Coffee Collective", owner: "Maya Reyes" },
  { name: "Weekly studio passes", owner: "Andre Kim" },
  { name: "Client retainer", owner: "Priya Nair" },
  { name: "Membership dues", owner: "Tom Walsh" },
];

export default function DemoPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <Link href="/" className={styles.backLink}>
          <span aria-hidden>←</span> Back to {site.brand}
        </Link>

        <h1 className={styles.heading}>See how {site.brand} works</h1>

        <div className={styles.grid}>
          <div className={styles.liveDemoCard}>
            <div className={styles.liveDemoTop}>
              <h2 className={styles.cardHeading}>
                Experience {site.brand} with a live demo
              </h2>
              <p className={styles.cardSubtext}>
                Schedule an expert-led, 30 minute walkthrough of the
                platform.
              </p>

              <form className={styles.demoForm}>
                <input
                  type="email"
                  required
                  placeholder="What's your email?"
                  className={styles.emailInput}
                  aria-label="Email"
                />
                <button type="submit" className={styles.demoButton}>
                  Schedule a demo
                </button>
              </form>
            </div>

            <div className={styles.mockupWrap} aria-hidden>
              <div className={styles.laptop}>
                <div className={styles.laptopScreen}>
                  <div className={styles.mockupHeader}>Reporting</div>
                  <div className={styles.mockupGrid}>
                    <div className={styles.mockupChartCard}>
                      <span className={styles.mockupLabel}>
                        Total processed
                      </span>
                      <span className={styles.mockupValue}>$1.4M</span>
                      <div className={styles.mockupChart}>
                        <span style={{ height: "30%" }} />
                        <span style={{ height: "48%" }} />
                        <span style={{ height: "40%" }} />
                        <span style={{ height: "62%" }} />
                        <span style={{ height: "55%" }} />
                        <span style={{ height: "78%" }} />
                        <span style={{ height: "70%" }} />
                      </div>
                    </div>
                    <div className={styles.mockupSideCard}>
                      <span className={styles.mockupLabel}>
                        By collection method
                      </span>
                      <div className={styles.mockupBarRow}>
                        <span className={styles.mockupBarLabel}>Recurring</span>
                        <div className={styles.mockupBarTrack}>
                          <div
                            className={styles.mockupBarFill}
                            style={{ width: "82%" }}
                          />
                        </div>
                      </div>
                      <div className={styles.mockupBarRow}>
                        <span className={styles.mockupBarLabel}>One-off</span>
                        <div className={styles.mockupBarTrack}>
                          <div
                            className={styles.mockupBarFill}
                            style={{ width: "46%" }}
                          />
                        </div>
                      </div>
                      <div className={styles.mockupBarRow}>
                        <span className={styles.mockupBarLabel}>Links</span>
                        <div className={styles.mockupBarTrack}>
                          <div
                            className={styles.mockupBarFill}
                            style={{ width: "29%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.laptopBase} />
              </div>
            </div>
          </div>

          <div className={styles.tourCard}>
            <span className={styles.eyebrow}>Takes 2 minutes</span>

            <div className={styles.tourMockup} aria-hidden>
              <div className={styles.tourMockupHeader}>
                <span>Collections</span>
                <span className={styles.tourMockupSearch}>Search & filter</span>
              </div>
              <div className={styles.tourMockupTable}>
                <div className={styles.tourMockupTableHead}>
                  <span>Name</span>
                  <span>Owner</span>
                </div>
                {tourRows.map((row) => (
                  <div className={styles.tourMockupRow} key={row.name}>
                    <span>{row.name}</span>
                    <span>{row.owner}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.tourText}>
              <h2 className={styles.cardHeadingSmall}>
                Interactive product tour
              </h2>
              <p className={styles.cardSubtext}>
                Click around our platform to see {site.brand} in action.
              </p>
            </div>
          </div>

          <div className={styles.videoCard}>
            <span className={styles.eyebrow}>Five product walkthroughs</span>

            <div className={styles.videoMockup} aria-hidden>
              <video
                className={styles.videoEl}
                src="/videos/product-walkthrough.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <span className={styles.playButton}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>

            <div className={styles.tourText}>
              <h2 className={styles.cardHeadingSmall}>Watch product videos</h2>
              <p className={styles.cardSubtext}>
                Get a high-level overview of {site.brand}&apos;s suite of
                products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
