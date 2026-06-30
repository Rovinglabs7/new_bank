import { site } from "@/config/site";
import styles from "./announcement-bar.module.css";

export function AnnouncementBar() {
  const { announcementBar } = site;

  return (
    <div className={styles.bar} role="status">
      <div className={styles.inner}>
        <span className={styles.tag}>{announcementBar.tag}</span>
        <span className={styles.message}>{announcementBar.message}</span>
      </div>
    </div>
  );
}
