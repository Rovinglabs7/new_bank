import Link from "next/link";
import { partners } from "@/config/partners";
import styles from "./partners-add-payments.module.css";

export function PartnersAddPayments() {
  const { addPayments } = partners;

  return (
    <section className={styles.section} aria-label={addPayments.heading}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{addPayments.heading}</h2>
        <p className={styles.body}>{addPayments.body}</p>

        <div className={styles.groups}>
          {addPayments.groups.map((group) => (
            <div className={styles.group} key={group.heading}>
              <h3 className={styles.groupHeading}>{group.heading}</h3>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={styles.link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
