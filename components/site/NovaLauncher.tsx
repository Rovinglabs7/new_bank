"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./nova-launcher.module.css";

export function NovaLauncher() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function submit() {
    const q = query.trim();
    if (!q) return;
    router.push(`/contact-sales?q=${encodeURIComponent(q)}`);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
    if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  }

  return (
    <div className={styles.launcher} role="search" aria-label="Ask Nova">
      <div className={styles.avatarWrap} aria-hidden>
        <Image
          src="/nova-avatar.jpg"
          alt="Nova"
          width={32}
          height={32}
          className={styles.avatar}
        />
        <span className={styles.onlineDot} />
      </div>

      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        placeholder="Ask Nova anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKey}
        aria-label="Ask Nova a question"
        autoComplete="off"
      />

      <button
        className={`${styles.sendBtn} ${query.trim() ? styles.sendBtnActive : ""}`}
        onClick={submit}
        aria-label="Send"
        type="button"
        tabIndex={query.trim() ? 0 : -1}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
