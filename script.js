/**
 * Drama Geeks — Main Script
 * Vanilla JS, no dependencies, no build step.
 *
 * Sections:
 *  1. Utilities
 *  2. Header scroll shadow
 *  3. Mobile menu toggle
 *  4. Dropdown menus (hover desktop / click mobile)
 *  5. Testimonials carousel
 *  6. Parent Portal modal (SHA-256 gate + sessionStorage)
 *  7. Smooth scroll (polyfill guard)
 *  8. Intersection Observer fade-up animation
 *  9. Footer copyright year
 * 10. Contact form (basic client-side validation)
 */

'use strict';

/* ============================================================
   1. UTILITIES
   ============================================================ */

/**
 * Hash a string with SHA-256 via the Web Crypto API.
 * Returns a lowercase hex string.
 * @param {string} message
 * @returns {Promise<string>}
 */
async function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Trap keyboard focus inside an element (for modals).
 * Returns an unbind function.
 * @param {HTMLElement} container
 * @returns {Function} cleanup
 */
function trapFocus(container) {
  const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  const focusable = Array.from(container.querySelectorAll(FOCUSABLE));
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  function handleKeydown(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  container.addEventListener('keydown', handleKeydown);
  return () => container.removeEventListener('keydown', handleKeydown);
}


/* ============================================================
   2. HEADER SCROLL SHADOW
   ============================================================ */
(function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const CLASS = 'is-scrolled';

  function onScroll() {
    if (window.scrollY > 8) {
      header.classList.add(CLASS);
    } else {
      header.classList.remove(CLASS);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ============================================================
   3. MOBILE MENU TOGGLE
   ============================================================ */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('main-nav');
  if (!hamburger || !nav) return;

  function openMenu() {
    nav.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
    // Close any open dropdowns
    nav.querySelectorAll('.nav-trigger[aria-expanded="true"]').forEach(closeDropdown);
  }

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Close when a nav link is clicked (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        closeMenu();
      }
    });
  });

  // Close if user resizes to desktop width
  const mq = window.matchMedia('(min-width: 960px)');
  function handleBreakpoint(e) {
    if (e.matches) closeMenu();
  }
  mq.addEventListener('change', handleBreakpoint);
})();


/* ============================================================
   4. DROPDOWN MENUS
   ============================================================ */
(function initDropdowns() {
  const isMobile = () => window.matchMedia('(max-width: 959px)').matches;

  /**
   * Open a dropdown.
   * @param {HTMLButtonElement} trigger
   */
  function openDropdown(trigger) {
    const dropdownId = trigger.getAttribute('data-dropdown');
    const dropdown   = document.getElementById(dropdownId);
    if (!dropdown) return;

    trigger.setAttribute('aria-expanded', 'true');
    dropdown.hidden = false;
  }

  /**
   * Close a dropdown.
   * @param {HTMLButtonElement} trigger
   */
  function closeDropdown(trigger) {
    const dropdownId = trigger.getAttribute('data-dropdown');
    const dropdown   = document.getElementById(dropdownId);
    if (!dropdown) return;

    trigger.setAttribute('aria-expanded', 'false');
    dropdown.hidden = true;
  }

  /**
   * Toggle a dropdown (used on mobile click).
   * @param {HTMLButtonElement} trigger
   */
  function toggleDropdown(trigger) {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    // Close all others first
    document.querySelectorAll('.nav-trigger[data-dropdown]').forEach(t => {
      if (t !== trigger) closeDropdown(t);
    });
    isOpen ? closeDropdown(trigger) : openDropdown(trigger);
  }

  // Attach events to each dropdown trigger
  document.querySelectorAll('.nav-trigger[data-dropdown]').forEach(trigger => {

    // Click: always toggles (mobile and desktop both support click)
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown(trigger);
    });

    // Hover: desktop only
    const item = trigger.closest('.nav-item');
    if (item) {
      item.addEventListener('mouseenter', () => {
        if (!isMobile()) openDropdown(trigger);
      });

      item.addEventListener('mouseleave', () => {
        if (!isMobile()) closeDropdown(trigger);
      });
    }

    // Keyboard: close on Tab-away
    const dropdownId = trigger.getAttribute('data-dropdown');
    const dropdown   = document.getElementById(dropdownId);
    if (dropdown) {
      const links = Array.from(dropdown.querySelectorAll('a'));
      const lastLink = links[links.length - 1];
      if (lastLink) {
        lastLink.addEventListener('keydown', (e) => {
          if (e.key === 'Tab' && !e.shiftKey) {
            closeDropdown(trigger);
          }
        });
      }
    }
  });

  // Close all dropdowns on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-trigger[data-dropdown]').forEach(closeDropdown);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-trigger[data-dropdown]').forEach(t => {
        if (t.getAttribute('aria-expanded') === 'true') {
          closeDropdown(t);
          t.focus();
        }
      });
    }
  });

  // Prevent clicks inside dropdowns from bubbling to document
  document.querySelectorAll('.dropdown').forEach(d => {
    d.addEventListener('click', e => e.stopPropagation());
  });
})();


/* ============================================================
   5. TESTIMONIALS CAROUSEL
   ============================================================ */
(function initCarousel() {
  const track   = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('testimonials-prev');
  const nextBtn = document.getElementById('testimonials-next');
  const dotsContainer = document.getElementById('testimonials-dots');
  if (!track || !prevBtn || !nextBtn) return;

  const slides      = Array.from(track.querySelectorAll('.carousel-slide'));
  const totalSlides = slides.length;
  let current       = 0;
  let isDesktop     = false;

  const DESKTOP_VISIBLE = 3;

  function getSlidesPerView() {
    return window.matchMedia('(min-width: 960px)').matches ? DESKTOP_VISIBLE : 1;
  }

  function getMaxIndex() {
    const spv = getSlidesPerView();
    return Math.max(0, totalSlides - spv);
  }

  function goTo(index) {
    const spv    = getSlidesPerView();
    const maxIdx = getMaxIndex();
    current = Math.max(0, Math.min(index, maxIdx));

    // On desktop show 3, scroll by one; on mobile show 1 and wrap
    const slideWidth = 100 / spv;
    track.style.transform = `translateX(-${current * slideWidth}%)`;

    // Update dots — always reference first 3 for simplicity
    const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.dot')) : [];
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('dot--active', active);
      dot.setAttribute('aria-selected', String(active));
    });

    // ARIA live region — announce current position
    track.setAttribute('aria-label', `Testimonial ${current + 1} of ${totalSlides}`);
  }

  function prev() {
    // Wrap around
    const newIndex = current <= 0 ? getMaxIndex() : current - 1;
    goTo(newIndex);
  }

  function next() {
    const newIndex = current >= getMaxIndex() ? 0 : current + 1;
    goTo(newIndex);
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Dot navigation
  if (dotsContainer) {
    dotsContainer.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        goTo(idx);
      });
    });
  }

  // Touch / swipe support
  let touchStartX = 0;
  let touchEndX   = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  }, { passive: true });

  // Keyboard on track container
  track.parentElement.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });

  // Re-calc on resize (desktop ↔ mobile)
  window.addEventListener('resize', () => {
    goTo(current);
  }, { passive: true });

  // Init
  goTo(0);
})();


/* ============================================================
   6. PARENT PORTAL MODAL
   ============================================================ */
(function initPortalModal() {
  const overlay   = document.getElementById('portal-modal');
  const modalBox  = document.getElementById('modal-box');
  const openBtns  = [
    document.getElementById('open-portal-btn'),
    document.getElementById('header-portal-link'),
  ].filter(Boolean);
  const closeBtn  = document.getElementById('modal-close');
  const form      = document.getElementById('portal-form');
  const pwdInput  = document.getElementById('portal-password');
  const errorMsg  = document.getElementById('portal-error');
  const portalContent = document.getElementById('portal-content');

  if (!overlay || !form) return;

  /*
   * DEMO_PASSWORD is used as the reference for hashing.
   * The SHA-256 is computed at runtime via crypto.subtle — see sha256() above.
   *
   * PRODUCTION: Replace this entire client-side gate with Netlify Identity
   * (netlifyidentity.js) or Cloudflare Access. Client-side password checks
   * are UX conveniences only — they provide no real content security because
   * the hash and protected content are both delivered to the browser.
   */
  const DEMO_PASSWORD = 'dramageeks2026';
  const SESSION_KEY   = 'dg_portal_unlocked';

  let unbindFocusTrap = null;
  let previouslyFocused = null;

  // ---- Unlock if session already active ----
  if (sessionStorage.getItem(SESSION_KEY) === '1') {
    unlockPortal(false); // silent — no modal
  }

  // ---- Open modal ----
  function openModal() {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    previouslyFocused = document.activeElement;
    // Defer so display change takes effect before focus
    requestAnimationFrame(() => {
      pwdInput.focus();
      unbindFocusTrap = trapFocus(modalBox);
    });
  }

  // ---- Close modal ----
  function closeModal() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (unbindFocusTrap) {
      unbindFocusTrap();
      unbindFocusTrap = null;
    }
    if (previouslyFocused) {
      previouslyFocused.focus();
    }
    // Clear password field and error
    pwdInput.value = '';
    errorMsg.hidden = true;
  }

  // ---- Unlock portal content ----
  function unlockPortal(withAnimation = true) {
    if (portalContent) {
      portalContent.hidden = false;
      if (withAnimation) {
        portalContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // Update portal CTA band button text
    const openBtn = document.getElementById('open-portal-btn');
    if (openBtn) openBtn.textContent = 'View Portal Content ↓';
  }

  // ---- Bind open triggers ----
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // If already unlocked, just scroll to content
      if (sessionStorage.getItem(SESSION_KEY) === '1') {
        if (portalContent) {
          portalContent.hidden = false;
          portalContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }
      openModal();
    });
  });

  // ---- Close button ----
  closeBtn.addEventListener('click', closeModal);

  // ---- Click backdrop to close ----
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // ---- Escape to close ----
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) {
      closeModal();
    }
  });

  // ---- Form submit: check password ----
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const input = pwdInput.value;
    if (!input) {
      errorMsg.hidden = false;
      pwdInput.setAttribute('aria-invalid', 'true');
      return;
    }

    // Hash both and compare
    try {
      const [inputHash, expectedHash] = await Promise.all([
        sha256(input),
        sha256(DEMO_PASSWORD),
      ]);

      if (inputHash === expectedHash) {
        // SUCCESS
        sessionStorage.setItem(SESSION_KEY, '1');
        errorMsg.hidden = true;
        pwdInput.setAttribute('aria-invalid', 'false');
        closeModal();
        unlockPortal(true);
      } else {
        // FAILURE
        errorMsg.hidden = false;
        pwdInput.setAttribute('aria-invalid', 'true');
        pwdInput.value = '';
        pwdInput.focus();
      }
    } catch (err) {
      // crypto.subtle unavailable (non-secure context)
      console.warn('Drama Geeks: SHA-256 check failed — is the page served over HTTPS?', err);
      errorMsg.textContent = 'Password check failed. Please ensure you are visiting over a secure connection.';
      errorMsg.hidden = false;
    }
  });
})();


/* ============================================================
   7. SMOOTH SCROLL (Polyfill guard)
   ============================================================ */
(function initSmoothScroll() {
  // Native smooth scroll is handled via CSS scroll-behavior.
  // This JS handler ensures it works for all anchor links,
  // accounting for the sticky header height offset.

  const HEADER_HEIGHT = 72; // matches --header-height CSS var

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href   = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });

      // Move focus to the target section for a11y
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
    });
  });
})();


/* ============================================================
   8. INTERSECTION OBSERVER — FADE-UP ANIMATION
   ============================================================ */
(function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
})();


/* ============================================================
   9. FOOTER COPYRIGHT YEAR
   ============================================================ */
(function setCopyrightYear() {
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ============================================================
   10. CONTACT FORM — CLIENT-SIDE VALIDATION
   ============================================================ */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Show native validation messages with custom styling
  form.addEventListener('submit', (e) => {
    // Remove existing error indicators
    form.querySelectorAll('.form-control').forEach(input => {
      input.removeAttribute('aria-invalid');
    });

    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.setAttribute('aria-invalid', 'true');
        field.focus();
        valid = false;
      }
    });

    const emailField = form.querySelector('#email');
    if (emailField && emailField.value && !emailField.value.includes('@')) {
      emailField.setAttribute('aria-invalid', 'true');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
      return;
    }

    /*
     * PRODUCTION: Replace this with your preferred form handler:
     *   - Netlify Forms: add netlify attribute to <form> and method="POST"
     *   - Formspree: set action="https://formspree.io/f/YOUR_ID" method="POST"
     *   - Your own backend endpoint
     */
    // For now, prevent default and show a success state
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Message sent! We\'ll be in touch soon.';
      submitBtn.disabled = true;
      submitBtn.style.background = 'var(--dg-blue)';
      submitBtn.style.color = '#fff';
      submitBtn.style.borderColor = 'var(--dg-blue)';
    }
    form.querySelectorAll('.form-control').forEach(input => {
      input.value = '';
    });
  });

  // Remove invalid indicator on input
  form.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') {
        field.removeAttribute('aria-invalid');
      }
    });
  });
})();
