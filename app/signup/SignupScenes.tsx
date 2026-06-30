import styles from "./signup.module.css";

export function SignupScenes() {
  return (
    <div className={styles.scenes}>
      <div className={styles.sceneCard}>
        <img
          src="/customer-story/sarah-thompson.jpg"
          alt="Emma and Ben, owners of Bean There Coffee, standing together, smiling"
          className={styles.sceneImage}
        />
      </div>
      <blockquote className={styles.sceneQuote}>
        <p className={styles.sceneQuoteText}>
          &ldquo;Sprout has transformed the way we collect payments. What
          used to take hours each week now happens automatically, giving
          our team more time to focus on delivering exceptional care.&rdquo;
        </p>
        <footer className={styles.sceneQuoteFooter}>
          <cite className={styles.sceneQuoteName}>Emma &amp; Ben</cite>
          <span className={styles.sceneQuoteRole}>Owners of Bean There Coffee</span>
        </footer>
      </blockquote>
    </div>
  );
}
