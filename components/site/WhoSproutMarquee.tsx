import styles from "./who-sprout-marquee.module.css";

type MediaItem =
  | { type: "video"; src: string; alt: string }
  | { type: "image"; src: string; alt: string };

const MEDIA: MediaItem[] = [
  { type: "video", src: "/who-sprout/clip-1.mp4", alt: "Business owner at work" },
  { type: "video", src: "/who-sprout/clip-2.mp4", alt: "Team member at work" },
  { type: "video", src: "/who-sprout/clip-3.mp4", alt: "Business owner at work" },
  { type: "video", src: "/who-sprout/clip-4.mp4", alt: "Team member at work" },
  { type: "video", src: "/who-sprout/clip-5.mp4", alt: "Business owner at work" },
  { type: "image", src: "/customer-story/sarah-thompson.jpg", alt: "Emma and Ben, owners of Bean There Coffee, standing together, smiling" },
];

function MediaTile({ item }: { item: MediaItem }) {
  if (item.type === "video") {
    return (
      <video
        className={styles.mediaImage}
        src={item.src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={item.alt}
      />
    );
  }
  return (
    <img
      className={styles.mediaImage}
      src={item.src}
      alt={item.alt}
      loading="lazy"
      decoding="async"
    />
  );
}

export function WhoPraevorMarquee() {
  const loopMedia = [...MEDIA, ...MEDIA];

  return (
    <section className={styles.section} aria-label="Praevor in action">
      <div className={styles.marqueeViewport}>
        <div className={styles.marqueeTrack}>
          {loopMedia.map((item, i) => (
            <div className={styles.mediaTile} key={`${item.src}-${i}`}>
              <MediaTile item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
