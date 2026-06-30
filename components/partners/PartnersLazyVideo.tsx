"use client";

import { useEffect, useRef, useState } from "react";

type PartnersLazyVideoProps = {
  src: string;
  wrapperClassName?: string;
  videoClassName?: string;
  ariaLabel?: string;
};

/**
 * Loads and plays a video only once it scrolls into the viewport. Used for the
 * second, heavier ambient video on the page so both large files don't fight
 * for bandwidth on initial paint.
 */
export function PartnersLazyVideo({
  src,
  wrapperClassName,
  videoClassName,
  ariaLabel,
}: PartnersLazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={wrapperClassName}>
      {shouldLoad ? (
        <video
          className={videoClassName}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          aria-label={ariaLabel}
        />
      ) : null}
    </div>
  );
}
