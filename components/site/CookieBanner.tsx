"use client";

import { useEffect, useState, useRef, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./cookie-banner.module.css";

const STORAGE_KEY = "praevor_cookie_consent";

type ConsentChoice = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
};

function readConsent(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentChoice;
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean, marketing: boolean) {
  const choice: ConsentChoice = { essential: true, analytics, marketing, ts: Date.now() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  } catch {}
  return choice;
}

// ─── Toggle ──────────────────────────────────────────────────────────────────

function Toggle({
  id,
  checked,
  onChange,
  disabled = false,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`${styles.toggle} ${checked ? styles.toggleOn : ""} ${disabled ? styles.toggleDisabled : ""}`}
      type="button"
    >
      <span className={styles.toggleThumb} />
    </button>
  );
}

// ─── Preferences Modal ───────────────────────────────────────────────────────

type ModalProps = {
  onSave: (analytics: boolean, marketing: boolean) => void;
  onClose: () => void;
  initial: { analytics: boolean; marketing: boolean };
};

function PreferencesModal({ onSave, onClose, initial }: ModalProps) {
  const [analytics, setAnalytics] = useState(initial.analytics);
  const [marketing, setMarketing] = useState(initial.marketing);
  const closeRef = useRef<HTMLButtonElement>(null);
  const analyticsId = useId();
  const marketingId = useId();

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Cookie preferences</h2>
          <button
            ref={closeRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close cookie preferences"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className={styles.modalIntro}>
          Choose which cookies you&apos;re happy for Praevor to use. You can change these settings at any time.
        </p>

        <div className={styles.cookieGroups}>
          {/* Essential */}
          <div className={styles.cookieGroup}>
            <div className={styles.cookieGroupHeader}>
              <div>
                <h3 className={styles.cookieGroupTitle}>Essential cookies</h3>
                <p className={styles.cookieGroupDesc}>
                  Required for the platform to function. These keep your session secure, remember your login, and enable core features. They cannot be disabled.
                </p>
              </div>
              <Toggle id="essential" checked disabled onChange={() => {}} />
            </div>
          </div>

          <div className={styles.divider} />

          {/* Analytics */}
          <div className={styles.cookieGroup}>
            <div className={styles.cookieGroupHeader}>
              <div>
                <h3 className={styles.cookieGroupTitle}>Analytics cookies</h3>
                <p className={styles.cookieGroupDesc}>
                  Help us understand how people use Praevor so we can improve the experience. We never share this data with third parties or use it for advertising.
                </p>
              </div>
              <Toggle id={analyticsId} checked={analytics} onChange={setAnalytics} />
            </div>
          </div>

          <div className={styles.divider} />

          {/* Marketing */}
          <div className={styles.cookieGroup}>
            <div className={styles.cookieGroupHeader}>
              <div>
                <h3 className={styles.cookieGroupTitle}>Marketing cookies</h3>
                <p className={styles.cookieGroupDesc}>
                  Allow us to show relevant content and measure campaign effectiveness. You can opt out at any time and we will stop immediately.
                </p>
              </div>
              <Toggle id={marketingId} checked={marketing} onChange={setMarketing} />
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <p className={styles.modalPolicy}>
            We never sell your personal data.{" "}
            <a href="/legal/cookies" className={styles.policyLink}>
              Cookie Policy
            </a>
          </p>
          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => onSave(false, false)}
            >
              Essential only
            </button>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={() => onSave(analytics, marketing)}
            >
              Save preferences
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Banner ───────────────────────────────────────────────────────────────────

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (readConsent()) return;
    const t = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const accept = useCallback(() => {
    saveConsent(true, true);
    setVisible(false);
  }, []);

  const essentialOnly = useCallback(() => {
    saveConsent(false, false);
    setVisible(false);
  }, []);

  const saveFromModal = useCallback((analytics: boolean, marketing: boolean) => {
    saveConsent(analytics, marketing);
    setModalOpen(false);
    setVisible(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
            className={styles.banner}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.bannerInner}>
              <div className={styles.bannerText}>
                <p className={styles.bannerTitle}>Privacy, on your terms.</p>
                <p className={styles.bannerBody}>
                  We use essential cookies to keep Praevor secure and reliable. With your permission, we&apos;ll also use analytics cookies to understand how people use our website so we can continue improving it.
                </p>
                <a href="/legal/cookies" className={styles.bannerPolicyLink}>
                  Learn more in our Cookie Policy
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3.333 8h9.334M12.667 8L8 3.333M12.667 8L8 12.667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              <div className={styles.bannerActions}>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={accept}
                  autoFocus
                >
                  Accept all
                </button>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={essentialOnly}
                >
                  Essential only
                </button>
                <button
                  type="button"
                  className={styles.btnText}
                  onClick={() => setModalOpen(true)}
                >
                  Cookie settings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && (
          <PreferencesModal
            onSave={saveFromModal}
            onClose={() => setModalOpen(false)}
            initial={{ analytics: true, marketing: false }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
