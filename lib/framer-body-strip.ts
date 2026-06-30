/**
 * Remove a top-level Framer container div by partial class name (e.g. framer-623ofv-container).
 */
export function stripContainerByClass(html: string, partialClass: string): string {
  let result = html;
  let searchFrom = 0;

  while (searchFrom < result.length) {
    const classIdx = result.indexOf(partialClass, searchFrom);
    if (classIdx === -1) break;

    const start = result.lastIndexOf("<div", classIdx);
    if (start === -1) break;

    let depth = 0;
    let i = start;
    let end = -1;

    while (i < result.length) {
      if (result.startsWith("<div", i)) depth++;
      else if (result.startsWith("</div>", i)) {
        depth--;
        if (depth === 0) {
          end = i + 6;
          break;
        }
      }
      i++;
    }

    if (end === -1) break;
    result = result.slice(0, start) + result.slice(end);
    searchFrom = start;
  }

  return result;
}

export function stripElementByFramerName(html: string, framerName: string): string {
  const needle = `data-framer-name="${framerName}"`;
  let result = html;
  let searchFrom = 0;

  while (searchFrom < result.length) {
    const nameIdx = result.indexOf(needle, searchFrom);
    if (nameIdx === -1) break;

    const start = result.lastIndexOf("<div", nameIdx);
    if (start === -1) break;

    let depth = 0;
    let i = start;
    let end = -1;

    while (i < result.length) {
      if (result.startsWith("<div", i)) depth++;
      else if (result.startsWith("</div>", i)) {
        depth--;
        if (depth === 0) {
          end = i + 6;
          break;
        }
      }
      i++;
    }

    if (end === -1) break;
    result = result.slice(0, start) + result.slice(end);
    searchFrom = start;
  }

  return result;
}

/** Hero, fixed nav, and Framer footer — replaced by React components. */
export const REACT_REPLACED_CONTAINERS = [
  "framer-16bgs19-container",
  "framer-623ofv-container",
  "framer-14hkwql-container",
] as const;

export const REACT_REPLACED_FRAMER_NAMES = ["hero-s"] as const;

export function stripReactReplacedSections(html: string): string {
  let out = html;
  for (const cls of REACT_REPLACED_CONTAINERS) {
    out = stripContainerByClass(out, cls);
  }
  for (const name of REACT_REPLACED_FRAMER_NAMES) {
    out = stripElementByFramerName(out, name);
  }
  return out;
}
