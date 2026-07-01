import { isMockMode } from "@/config/mock";
import styles from "./mock-mode-banner.module.css";

export function MockModeBanner() {
  if (!isMockMode()) return null;

  return (
    <div className={styles.banner} role="status">
      Mock mode — auth and API calls are bypassed for frontend development
    </div>
  );
}
