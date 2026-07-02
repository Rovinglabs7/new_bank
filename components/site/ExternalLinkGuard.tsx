"use client";

import { useEffect } from "react";

const BLOCKED_HOSTS = ["bondapp.io", "ramp.com"];

function isBlockedUrl(url: string): boolean {
  try {
    const host = new URL(url, window.location.origin).hostname.toLowerCase();
    return BLOCKED_HOSTS.some(
      (blocked) => host === blocked || host.endsWith(`.${blocked}`),
    );
  } catch {
    return false;
  }
}

/** Prevents navigation to legacy Bond / Ramp marketing sites from any stray anchor. */
export function ExternalLinkGuard() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!isBlockedUrl(anchor.href)) return;

      event.preventDefault();
      event.stopPropagation();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
