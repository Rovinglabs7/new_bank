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
    </div>
  );
}
