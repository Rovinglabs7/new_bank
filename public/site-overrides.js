(function () {
  "use strict";

  function applyHeroStyles() {
    document
      .querySelectorAll('.framer-7FUfC[data-framer-name="scroll element"]')
      .forEach(function (el) {
        el.style.setProperty(
          "background",
          "linear-gradient(180deg, #52402f 0%, #281e15 100%)",
          "important"
        );
      });
  }

  function hideBadgeLinks() {
    document
      .querySelectorAll('a[href*="producthunt"], a[href*="ycombinator"]')
      .forEach(function (anchor) {
        var block =
          anchor.closest("[data-framer-name]") ||
          anchor.closest(".framer-7FUfC") ||
          anchor.parentElement;
        if (block) block.style.setProperty("display", "none", "important");
      });

    document.querySelectorAll("p.framer-text, span.framer-text").forEach(function (el) {
      var text = el.textContent || "";
      if (/product\s*hunt|y\s*combinator|backed by yc/i.test(text)) {
        var block = el.closest("[data-framer-name]") || el.parentElement;
        if (block) block.style.setProperty("display", "none", "important");
      }
    });
  }

  function ensureSproutFooter() {
    var footer = document.getElementById("sprout-footer");
    if (!footer) return;

    if (footer.closest("#main")) {
      document.body.appendChild(footer);
    }

    footer.style.removeProperty("display");
    footer.style.setProperty("visibility", "visible", "important");
  }

  function applyOverrides() {
    applyHeroStyles();
    ensureSproutFooter();
    hideBadgeLinks();
  }

  applyOverrides();
  document.addEventListener("DOMContentLoaded", applyOverrides);
  window.addEventListener("load", applyOverrides);
})();
