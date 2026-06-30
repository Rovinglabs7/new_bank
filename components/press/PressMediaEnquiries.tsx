import { press } from "@/config/press";
import styles from "./press-media-enquiries.module.css";

export function PressMediaEnquiries() {
  const { mediaEnquiries } = press;

  return (
    <section className={styles.section} aria-label={mediaEnquiries.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{mediaEnquiries.heading}</h2>
        <p className={styles.body}>{mediaEnquiries.body}</p>
        <a href={`mailto:${mediaEnquiries.email}`} className={styles.email}>
          {mediaEnquiries.email}
        </a>
        <p className={styles.responseTime}>{mediaEnquiries.responseTime}</p>
      </div>
    </section>
  );
}
