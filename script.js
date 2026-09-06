/* Subtle reveal-on-scroll: sections fade in with a small slide-up, once. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var targets = Array.prototype.slice.call(document.querySelectorAll('section, footer'));
  if (!targets.length) return;

  function hide(el, i) {
    el.style.transition = 'opacity 700ms cubic-bezier(0.22,0.61,0.36,1), transform 700ms cubic-bezier(0.22,0.61,0.36,1)';
    el.style.transitionDelay = (i % 3) * 70 + 'ms';
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
  }
  function show(el) { el.style.opacity = '1'; el.style.transform = 'none'; }
  function revealAll() { targets.forEach(show); }

  targets.forEach(function (el, i) {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    hide(el, i);
  });

  if (!('IntersectionObserver' in window)) { revealAll(); return; }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) show(e.target); });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  targets.forEach(function (el) { io.observe(el); });

  setTimeout(revealAll, 2500);
  window.addEventListener('visibilitychange', revealAll);
  window.addEventListener('resize', revealAll);
})();
