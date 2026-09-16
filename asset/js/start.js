/* Natchaphon Thanakaew — portfolio
   Three small jobs: the work filter, the mobile menu, and the decorative
   line-number gutter. Everything degrades gracefully without JS: all rows
   render, the nav anchors still work, the gutter is simply empty. */

(function () {
  "use strict";

  /* --- work filter ------------------------------------------------------- */

  function initFilter() {
    var list = document.querySelector("[data-list]");
    var chips = document.querySelectorAll(".chip[data-filter]");
    if (!list || !chips.length) return;

    var rows = Array.prototype.slice.call(list.querySelectorAll(".row"));
    var shownEls = document.querySelectorAll("[data-shown]");
    var totalEls = document.querySelectorAll("[data-total]");

    var empty = document.createElement("li");
    empty.className = "empty";
    empty.hidden = true;
    empty.textContent = "No entries match that filter.";
    list.appendChild(empty);

    function setText(nodes, value) {
      Array.prototype.forEach.call(nodes, function (n) { n.textContent = value; });
    }

    setText(totalEls, String(rows.length));

    function apply(filter) {
      var shown = 0;

      rows.forEach(function (row) {
        var match = filter === "all" || row.getAttribute("data-type") === filter;
        row.hidden = !match;
        if (match) shown++;
      });

      empty.hidden = shown !== 0;
      setText(shownEls, String(shown));

      Array.prototype.forEach.call(chips, function (chip) {
        var on = chip.getAttribute("data-filter") === filter;
        chip.classList.toggle("chip--on", on);
        chip.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }

    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener("click", function () {
        apply(chip.getAttribute("data-filter"));
      });
    });

    apply("all");
  }

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
    initFilter();
    initMenu();
    initGutter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
