import styles from "./who-sprout-marquee.module.css";

type MediaItem =
  | { type: "video"; src: string; alt: string }
  | { type: "image"; src: string; alt: string };

const MEDIA: MediaItem[] = [
  { type: "image", src: "/hero/woman-phone.webp", alt: "Business owner taking a call beside her laptop" },
  { type: "video", src: "/who-sprout/clip-1.mp4", alt: "Business owner at work" },
  { type: "image", src: "/hero/man-counter.png", alt: "Shop owner in an apron smiling at the counter" },
  { type: "video", src: "/who-sprout/clip-2.mp4", alt: "Team member at work" },
  { type: "image", src: "/hero/team-laptop.jpg", alt: "Small team reviewing a project together on a laptop" },
  { type: "video", src: "/who-sprout/clip-3.mp4", alt: "Business owner at work" },
  { type: "image", src: "/hero/woman-tablet.png", alt: "Founder reviewing packaging swatches on a tablet" },
  { type: "video", src: "/who-sprout/clip-4.mp4", alt: "Team member at work" },
  { type: "image", src: "/hero/woman-box.jpg", alt: "Business owner holding a packed shipping box" },
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

export function WhoSproutMarquee() {
  const loopMedia = [...MEDIA, ...MEDIA];

  return (
    <section className={styles.section} aria-label="Sprout in action">
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
