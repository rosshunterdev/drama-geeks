// Fetches components/nav.html, injects it in place of #nav-placeholder,
// then re-initialises all nav behaviour (scroll-shrink, hamburger, mobile
// accordion, hover pill) that needs the DOM elements to exist first.
(function () {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  fetch('/components/nav.html')
    .then(function (r) {
      if (!r.ok) throw new Error('nav-loader: HTTP ' + r.status);
      return r.text();
    })
    .then(function (html) {
      // Replace the placeholder div with the fetched markup.
      // insertAdjacentHTML keeps sibling order; remove() cleans up the div.
      placeholder.insertAdjacentHTML('afterend', html);
      placeholder.remove();
      initNav();
    })
    .catch(function (err) {
      console.error('nav-loader: could not load components/nav.html', err);
    });

  function initNav() {
    // ── Scroll-shrink: topbar hides, nav compacts ──
    var topbarEl = document.querySelector('.topbar');
    var navEl    = document.querySelector('nav');
    var SCROLL_THRESHOLD = 80;
    var ticking = false;

    function applyScrollState() {
      var scrolled = window.scrollY > SCROLL_THRESHOLD;
      if (topbarEl) topbarEl.classList.toggle('topbar--hidden', scrolled);
      if (navEl)    navEl.classList.toggle('nav--scrolled',    scrolled);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(applyScrollState);
        ticking = true;
      }
    }, { passive: true });

    applyScrollState();

    // ── Mobile nav toggle (hamburger) ──
    var navToggle = document.querySelector('.nav-toggle');
    var mobileNav = document.getElementById('mobile-nav');

    if (navToggle && mobileNav) {
      navToggle.addEventListener('click', function () {
        var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isOpen));
        mobileNav.classList.toggle('is-open', !isOpen);
      });

      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
          navToggle.setAttribute('aria-expanded', 'false');
          mobileNav.classList.remove('is-open');
          navToggle.focus();
        }
      });

      // Close when a link inside the panel is tapped
      mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navToggle.setAttribute('aria-expanded', 'false');
          mobileNav.classList.remove('is-open');
        });
      });
    }

    // ── Mobile accordion (sub-menu parent buttons) ──
    document.querySelectorAll('.mobile-nav-parent').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isOpen   = btn.getAttribute('aria-expanded') === 'true';
        var targetId = btn.getAttribute('aria-controls');
        var target   = targetId ? document.getElementById(targetId) : null;

        btn.setAttribute('aria-expanded', String(!isOpen));
        if (target) target.hidden = isOpen;
      });
    });

    // ── Nav pill hover effect ──
    // Only on desktop where .nav-links is visible (> 900 px breakpoint).
    var navLinks = document.querySelector('.nav-links');
    var navInner = document.querySelector('.nav-inner');
    if (navLinks && navInner && window.innerWidth > 900) {
      var pill = document.createElement('div');
      pill.className = 'nav-pill';
      pill.setAttribute('aria-hidden', 'true');
      navInner.appendChild(pill);

      navLinks.querySelectorAll('.nav-item').forEach(function (item) {
        item.addEventListener('mouseenter', function () {
          pill.style.left    = item.offsetLeft + 'px';
          pill.style.width   = item.offsetWidth + 'px';
          pill.style.opacity = '1';
        });
      });

      navLinks.addEventListener('mouseleave', function () {
        pill.style.opacity = '0';
      });
    }

    // ──────────────────────────────────────────────────────────────────────────
    // ── Scroll progress bar ──
    // A 2px yellow bar fixed at the very top of the viewport that fills from
    // 0% → 100% as the user scrolls from page top to bottom.
    // Uses the same requestAnimationFrame-throttled scroll listener pattern.
    // ──────────────────────────────────────────────────────────────────────────
    (function initProgressBar() {
      var bar = document.createElement('div');
      bar.id = 'scroll-progress';
      bar.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(bar, document.body.firstChild);

      var progressTicking = false;

      function updateProgress() {
        var scrollTop  = window.scrollY;
        var docHeight  = document.documentElement.scrollHeight - window.innerHeight;
        var pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
        progressTicking = false;
      }

      window.addEventListener('scroll', function () {
        if (!progressTicking) {
          requestAnimationFrame(updateProgress);
          progressTicking = true;
        }
      }, { passive: true });

      updateProgress(); // set initial state
    })();

    // ──────────────────────────────────────────────────────────────────────────
    // ── Desktop dropdown behaviour ──
    // Replaces pure-CSS :hover with JS-managed .is-open class so that:
    //   • mouseenter / mouseleave keep the familiar hover-open feel
    //   • aria-expanded is updated on the trigger <a>
    //   • Escape key closes the open dropdown and refocuses the trigger
    //   • Clicking outside any open dropdown closes it
    //   • Clicking a link inside a dropdown closes it
    // ──────────────────────────────────────────────────────────────────────────
    (function initDropdowns() {
      var dropdownItems = document.querySelectorAll('.nav-links .nav-item.has-dropdown');

      function openDropdown(item) {
        closeAllDropdowns();
        item.classList.add('is-open');
        var trigger = item.querySelector(':scope > a[aria-expanded]');
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
      }

      function closeDropdown(item) {
        item.classList.remove('is-open');
        var trigger = item.querySelector(':scope > a[aria-expanded]');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }

      function closeAllDropdowns() {
        dropdownItems.forEach(closeDropdown);
      }

      dropdownItems.forEach(function (item) {
        var trigger = item.querySelector(':scope > a');

        // Hover-open (mouse users): open on enter, close on leave
        item.addEventListener('mouseenter', function () {
          openDropdown(item);
        });
        item.addEventListener('mouseleave', function () {
          closeDropdown(item);
        });

        // Click-to-toggle (keyboard / touch users)
        if (trigger) {
          trigger.addEventListener('click', function (e) {
            var isOpen = item.classList.contains('is-open');
            if (isOpen) {
              // If already open, let the href navigate; just close the menu
              closeDropdown(item);
            } else {
              // Prevent navigation; open the dropdown instead
              e.preventDefault();
              openDropdown(item);
            }
          });
        }

        // Clicking any link inside the dropdown closes it
        var dropdownLinks = item.querySelectorAll('.nav-dropdown a, .nav-mega a');
        dropdownLinks.forEach(function (link) {
          link.addEventListener('click', function () {
            closeDropdown(item);
          });
        });
      });

      // Escape key: close any open dropdown, return focus to its trigger
      document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        dropdownItems.forEach(function (item) {
          if (item.classList.contains('is-open')) {
            closeDropdown(item);
            var trigger = item.querySelector(':scope > a');
            if (trigger) trigger.focus();
          }
        });
      });

      // Click outside: close all open dropdowns
      document.addEventListener('click', function (e) {
        var clickedInsideNav = e.target.closest('.nav-links');
        if (!clickedInsideNav) closeAllDropdowns();
      });
    })();

    // ──────────────────────────────────────────────────────────────────────────
    // ── Scroll-spy active state ──
    // Uses IntersectionObserver to detect which page section is currently in
    // the upper portion of the viewport and applies .active to the matching
    // top-level nav link.
    //
    // rootMargin '-80px 0px -60% 0px':
    //   • -80px top  → shrinks the observation area down by 80px to account
    //                  for the sticky navbar height, so a section only becomes
    //                  "active" once its content is actually visible below nav.
    //   • -60% bottom → only the top 40% of the viewport triggers activation;
    //                   prevents premature activation of sections just entering
    //                   from the bottom.
    // ──────────────────────────────────────────────────────────────────────────
    (function initScrollSpy() {
      var navLinkEls = document.querySelectorAll('.nav-links .nav-item > a');

      // Build a map of section-id → nav <a> element
      var sectionMap = {};
      navLinkEls.forEach(function (link) {
        var href = link.getAttribute('href') || '';
        if (href.startsWith('#') && href.length > 1) {
          var id = href.slice(1);
          var section = document.getElementById(id);
          if (section) sectionMap[id] = link;
        }
      });

      var sectionIds = Object.keys(sectionMap);
      if (sectionIds.length === 0) return; // no matching sections on this page

      function setActive(id) {
        // Remove .active from all nav links, then add to matched one
        navLinkEls.forEach(function (l) { l.classList.remove('active'); });
        if (id && sectionMap[id]) sectionMap[id].classList.add('active');
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      }, {
        rootMargin: '-80px 0px -60% 0px'
      });

      sectionIds.forEach(function (id) {
        observer.observe(document.getElementById(id));
      });
    })();
  }
})();
