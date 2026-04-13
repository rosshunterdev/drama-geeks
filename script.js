// Drama Geeks — main script

// ── Scroll-shrink: topbar hides, nav compacts ──
// requestAnimationFrame + ticking flag prevents running on every scroll pixel.
const topbarEl = document.querySelector('.topbar');
const navEl    = document.querySelector('nav');
const SCROLL_THRESHOLD = 80; // px before effects kick in

let ticking = false;

function applyScrollState() {
  const scrolled = window.scrollY > SCROLL_THRESHOLD;
  topbarEl?.classList.toggle('topbar--hidden', scrolled);
  navEl?.classList.toggle('nav--scrolled',    scrolled);
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(applyScrollState);
    ticking = true;
  }
}, { passive: true });

// Run once on load in case page is already scrolled (e.g. back-button restore)
applyScrollState();

// ── Mobile nav toggle ──
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.classList.toggle('is-open', !isOpen);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
      navToggle.focus();
    }
  });

  // Close when a link inside the panel is tapped
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
    });
  });
}

// ── Nav pill hover effect ──
// Only initialise on desktop where .nav-links is visible (> 900px breakpoint).
(function () {
  const navLinks = document.querySelector('.nav-links');
  const navInner = document.querySelector('.nav-inner');
  if (!navLinks || !navInner) return;
  if (window.innerWidth <= 900) return;

  const pill = document.createElement('div');
  pill.className = 'nav-pill';
  pill.setAttribute('aria-hidden', 'true');
  navInner.appendChild(pill);

  navLinks.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      // offsetLeft is relative to .nav-inner (its offsetParent, now position:relative)
      pill.style.left    = item.offsetLeft + 'px';
      pill.style.width   = item.offsetWidth + 'px';
      pill.style.opacity = '1';
    });
  });

  navLinks.addEventListener('mouseleave', () => {
    pill.style.opacity = '0';
  });
})();

const photoRevealSection = document.querySelector('.photo-reveal');

// Single observer on the section — fires for all .reveal-photo children at once.
// rootMargin top of 140px accounts for rp-1's -120px margin-top so the
// animation triggers before the browser reaches the section's own top edge.
const photoRevealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.reveal-photo').forEach(photo => {
        photo.classList.add('is-visible');
      });
      photoRevealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0,
  rootMargin: '140px 0px -40px 0px'
});

if (photoRevealSection) {
  photoRevealObserver.observe(photoRevealSection);
}
