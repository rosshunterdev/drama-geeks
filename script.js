// Drama Geeks — main script
// Nav initialisation (scroll-shrink, hamburger, dropdowns, scroll-spy,
// progress bar) is handled by /components/nav-loader.js.
// This file contains page-level behaviour only.

// ── Photo reveal strip (homepage) ──
(function () {
  var photoRevealSection = document.querySelector('.photo-reveal');
  if (!photoRevealSection) return;

  var photoRevealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.reveal-photo').forEach(function (photo) {
          photo.classList.add('is-visible');
        });
        photoRevealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0,
    rootMargin: '140px 0px -40px 0px'
  });

  photoRevealObserver.observe(photoRevealSection);
})();

// ── FAQ accordion ──
(function () {
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn    = item.querySelector('.faq-item__question');
    var answer = item.querySelector('.faq-item__answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // Close all siblings in the same group
      var group = item.closest('.faq-group') || item.closest('.faq-accordion') || item.parentElement;
      if (group) {
        group.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove('is-open');
            var siblingBtn    = openItem.querySelector('.faq-item__question');
            var siblingAnswer = openItem.querySelector('.faq-item__answer');
            if (siblingBtn)    siblingBtn.setAttribute('aria-expanded', 'false');
            if (siblingAnswer) siblingAnswer.hidden = true;
          }
        });
      }

      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.hidden = isOpen;
    });
  });
})();
