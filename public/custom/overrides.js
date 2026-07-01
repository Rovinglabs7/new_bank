(function () {
  "use strict";

  /**
   * Praevor customizations — edit this file for future changes.
   * Framer animations stay enabled; this re-applies after hydration.
   */
  var CONFIG = {
    heroBackground: "linear-gradient(180deg, #52402f 0%, #281e15 100%)",
    hideSelectors: ['a[href*="producthunt"]', 'a[href*="ycombinator"]'],
    hideTextPatterns: [/product\s*hunt/i, /y\s*combinator/i, /backed by yc/i],
    textReplacements: [
      // Example: { from: "Get Bond today", to: "Get Praevor today" },
    ],
  };

  function applyHero() {
    document
      .querySelectorAll('.framer-7FUfC[data-framer-name="scroll element"]')
      .forEach(function (el) {
        el.style.setProperty("background", CONFIG.heroBackground, "important");
      });
  }

  function hideBadges() {
    CONFIG.hideSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (anchor) {
        var block =
          anchor.closest("[data-framer-name]") ||
          anchor.closest(".framer-7FUfC") ||
          anchor.parentElement;
        if (block) block.style.setProperty("display", "none", "important");
      });
    });

    CONFIG.hideTextPatterns.forEach(function (pattern) {
      document
        .querySelectorAll("p.framer-text, span.framer-text, a.framer-text")
        .forEach(function (el) {
          if (pattern.test(el.textContent || "")) {
            var block = el.closest("[data-framer-name]") || el.parentElement;
            if (block) block.style.setProperty("display", "none", "important");
          }
        });
    });
  }

  function applyTextReplacements() {
    CONFIG.textReplacements.forEach(function (pair) {
      document
        .querySelectorAll("p.framer-text, span.framer-text, h1, h2, h3")
        .forEach(function (el) {
          if (el.textContent && el.textContent.indexOf(pair.from) !== -1) {
            el.textContent = el.textContent.replace(pair.from, pair.to);
          }
        });
    });
  }

  function hideFramerFooter() {
    var main = document.getElementById("main");
    if (!main) return;

    main.querySelectorAll(".framer-14hkwql-container").forEach(function (el) {
      el.style.setProperty("display", "none", "important");
    });

    // Fallback if Framer re-exports with different class names
    main.querySelectorAll('[data-framer-name="inner"]').forEach(function (el) {
      var text = el.textContent || "";
      if (/ALL RIGHTS RESERVED/i.test(text) && /NAVIGATION/i.test(text)) {
        var block =
          el.closest(".framer-14hkwql-container") ||
          el.closest("[class*='framer-8AwnG']") ||
          el.parentElement;
        if (block) block.style.setProperty("display", "none", "important");
      }
    });
  }

  function ensureFooter() {
    var footer = document.getElementById("sprout-footer");
    if (!footer) return;
    if (footer.closest("#main")) {
      document.body.appendChild(footer);
    }
    footer.style.setProperty("visibility", "visible", "important");
    footer.style.removeProperty("display");
  }

  function apply() {
    applyHero();
    hideBadges();
    hideFramerFooter();
    applyTextReplacements();
    ensureFooter();
  }

  function scheduleApply() {
    apply();
    [16, 50, 100, 200, 400, 800, 1500, 3000].forEach(function (ms) {
      setTimeout(apply, ms);
    });
  }

  document.addEventListener("framer:pageview", scheduleApply);
  document.addEventListener("DOMContentLoaded", scheduleApply);
  if (document.readyState !== "loading") scheduleApply();

  var main = document.getElementById("main");
  if (main && typeof MutationObserver !== "undefined") {
    var timer;
    new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(apply, 50);
    }).observe(main, { childList: true, subtree: true, attributes: true });
  }
})();
