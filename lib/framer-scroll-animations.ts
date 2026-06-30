/**
 * Framer middle sections are static HTML — keep them visible.
 * (Hiding with opacity:0 + inView left the page blank when observers did not fire.)
 */
export function initFramerScrollAnimations(_root: HTMLElement): () => void {
  return () => {};
}
