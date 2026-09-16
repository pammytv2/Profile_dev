/* Natchaphon Thanakaew — portfolio
   Two small jobs: the mobile menu and the decorative line-number gutter.
   Everything degrades gracefully without JS: all work entries are in the
   HTML, the nav anchors still work, the gutter is simply empty. */

(function () {
  "use strict";

  /* --- mobile menu ------------------------------------------------------- */

  function initMenu() {
    var btn = document.querySelector(".menu-btn");
    var nav = document.getElementById("tabs-mobile");
    if (!btn || !nav) return;

    function close() {
      nav.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", function () {
      var open = nav.hidden;
      nav.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });
  }

  /* --- line-number gutter ------------------------------------------------ */

  function initGutter() {
    var nums = document.querySelector(".gutter__nums");
    var gutter = document.querySelector(".gutter");
    if (!nums || !gutter) return;

    var LINE_HEIGHT = 25.2; /* 12px * 2.1 */
    var TOP_OFFSET = 40;
    var rendered = 0;

    function paint() {
      if (getComputedStyle(gutter).display === "none") return;

      var needed = Math.ceil((gutter.offsetHeight - TOP_OFFSET) / LINE_HEIGHT) + 2;
      if (needed === rendered) return;

      var out = [];
      for (var i = 1; i <= needed; i++) out.push("<div>" + i + "</div>");
      nums.innerHTML = out.join("");
      rendered = needed;
    }

    paint();

    if (typeof ResizeObserver === "function") {
      new ResizeObserver(paint).observe(gutter);
    } else {
      window.addEventListener("resize", paint);
    }
  }

  function init() {
    initMenu();
    initGutter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
