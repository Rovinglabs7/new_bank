"use client";

import { useRef, useState } from "react";
import styles from "./ambient-music-toggle.module.css";

export function AmbientMusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.35;
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/midday-palm-loop.mp3" loop preload="none" />
      <button
        type="button"
        className={styles.toggle}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause background music" : "Play background music"}
        title={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.icon} aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={styles.icon} aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4z" />
            <path d="M16 9l5 6M21 9l-5 6" />
          </svg>
        )}
      </button>
    </>
  );
}
