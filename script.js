/* =========================================================
   Balasubramaniam Srinivasan, personal site
   Interactivity: theme toggle, scroll reveal, stat counters,
   publications accordion, typed rotating word.
   ========================================================= */

(function () {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const html = document.documentElement;

  // ------------------------------------------------------
  // Theme toggle (initial theme is set by inline script in <head>
  // to avoid flash of wrong theme).
  // ------------------------------------------------------
  function applyTheme(t) {
    html.setAttribute("data-theme", t);
    try { localStorage.setItem("bs-theme", t); } catch (e) {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content", t === "light" ? "#faf8f3" : "#0c0b0f"
    );
  }
  const themeBtn = $("#themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
    });
  }

  // ------------------------------------------------------
  // Reading progress + sticky nav
  // ------------------------------------------------------
  const prog = $("#prog");
  const topbar = $("#topbar");
  function onScroll() {
    const y = window.scrollY;
    if (topbar) topbar.classList.toggle("stuck", y > 50);
    if (prog) {
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (dh > 0 ? (y / dh) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ------------------------------------------------------
  // Scroll reveal (.rv → .rv.on)
  // ------------------------------------------------------
  if ("IntersectionObserver" in window) {
    const rvObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("on");
          rvObs.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -36px 0px" }
    );
    $$(".rv").forEach(el => rvObs.observe(el));
  } else {
    $$(".rv").forEach(el => el.classList.add("on"));
  }

  // ------------------------------------------------------
  // Stat counters
  // ------------------------------------------------------
  function animCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (prefersReducedMotion) { el.textContent = target.toLocaleString(); return; }
    const dur = 1500, start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(ease(p) * target).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  const counters = $$("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const cObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { animCount(e.target); cObs.unobserve(e.target); }
      }),
      { threshold: 0.6 }
    );
    counters.forEach(el => cObs.observe(el));
  } else {
    counters.forEach(animCount);
  }

  // ------------------------------------------------------
  // Publications accordion
  // ------------------------------------------------------
  $$(".pub-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      const id = btn.getAttribute("aria-controls");
      const abs = id && document.getElementById(id);
      if (abs) abs.hidden = open;
    });
  });

  // ------------------------------------------------------
  // Typed.js rotating word in hero tagline
  // Loaded on demand so the rest of the page isn't blocked.
  // ------------------------------------------------------
  (function loadTyped() {
    const target = document.getElementById("rotatingWord");
    if (!target) return;
    if (prefersReducedMotion) {
      target.textContent = "agentic AI reliable.";
      return;
    }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.1.0/typed.umd.min.js";
    s.defer = true;
    s.onload = function () {
      if (!window.Typed) return;
      // eslint-disable-next-line no-new
      new window.Typed(target, {
        strings: [
          "agentic AI reliable.",
          "agents production-ready.",
          "LLMs work at scale.",
          "AI safe and aligned.",
          "agents smarter over time."
        ],
        typeSpeed: 42,
        backSpeed: 22,
        backDelay: 2200,
        startDelay: 600,
        loop: true,
        cursorChar: "|"
      });
    };
    s.onerror = function () { target.textContent = "agentic AI reliable."; };
    document.head.appendChild(s);
  })();

})();
