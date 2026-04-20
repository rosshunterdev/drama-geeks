(function () {
  'use strict';

  // Per-polaroid config: resting rotation (deg), max swing (deg), vertical drift (px)
  var POLAROIDS = [
    { restAngle: -6, swingRange: 12, driftPx:  0 },
    { restAngle:  3, swingRange: 12, driftPx: 14 },
    { restAngle: -2, swingRange: 12, driftPx: 28 }
  ];

  // Fraction of total progress before each subsequent polaroid starts moving
  var CHAIN_DELAY = 0.28;

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  function getScrollProgress(el) {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight;
    // 0 when top of element reaches bottom of viewport; 1 when bottom leaves top
    return clamp((vh - rect.top) / (rect.height + vh), 0, 1);
  }

  function applyTransforms(polaroids, progress) {
    polaroids.forEach(function (el, i) {
      var cfg = POLAROIDS[i];
      var delay = i * CHAIN_DELAY;
      var denominator = 1 - delay;
      var local = denominator > 0 ? clamp((progress - delay) / denominator, 0, 1) : 1;
      // Sine curve: neutral at 0 and 1, peak swing at midpoint
      var swing = Math.sin(local * Math.PI) * cfg.swingRange;
      var rotation = cfg.restAngle + swing;
      var drift = local * cfg.driftPx;
      el.style.transform = 'rotate(' + rotation + 'deg) translateY(' + drift + 'px)';
    });
  }

  function init() {
    var hero = document.getElementById('chain-hero');
    if (!hero) return;

    // Bail on reduced-motion or mobile — CSS handles static layout
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    // Bail if IntersectionObserver not available (old browsers see static CSS)
    if (!window.IntersectionObserver) return;

    var polaroids = Array.prototype.slice.call(
      hero.querySelectorAll('.chain-hero__polaroid')
    );
    if (!polaroids.length) return;

    var rafId = null;
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(function () {
        applyTransforms(polaroids, getScrollProgress(hero));
        ticking = false;
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          hero.classList.add('chain-hero--animating');
          window.addEventListener('scroll', onScroll, { passive: true });
          applyTransforms(polaroids, getScrollProgress(hero));
        } else {
          hero.classList.remove('chain-hero--animating');
          window.removeEventListener('scroll', onScroll);
          if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        }
      });
    }, { threshold: 0 });

    observer.observe(hero);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
