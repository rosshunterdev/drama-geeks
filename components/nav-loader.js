// Fetches /components/nav.html and /components/footer.html, injects them
// in place of #nav-placeholder and #footer-placeholder, then re-initialises
// all nav behaviour (scroll-shrink, hamburger, mobile accordion, hover pill,
// dropdowns, scroll-spy) that needs the DOM elements to exist first.
//
// Root-relative paths (/components/…) mean this file works correctly from any
// page depth without modification.
(function () {
  var NAV_PATH    = '/components/nav.html';
  var FOOTER_PATH = '/components/footer.html';

  var navPlaceholder    = document.getElementById('nav-placeholder');
  var footerPlaceholder = document.getElementById('footer-placeholder');

  var navLoaded    = false;
  var footerLoaded = false;

  function checkAllLoaded() {
    if (navLoaded && footerLoaded) {
      initNav();
      initActiveLink();
    }
  }

  // ── Load nav ──
  if (navPlaceholder) {
    fetch(NAV_PATH)
      .then(function (r) {
        if (!r.ok) throw new Error('nav-loader: HTTP ' + r.status + ' for ' + NAV_PATH);
        return r.text();
      })
      .then(function (html) {
        navPlaceholder.insertAdjacentHTML('afterend', html);
        navPlaceholder.remove();
        navLoaded = true;
        checkAllLoaded();
      })
      .catch(function (err) {
        console.error('nav-loader: could not load nav.html', err);
        navLoaded = true; // still attempt footer init
        checkAllLoaded();
      });
  } else {
    navLoaded = true;
  }

  // ── Load footer ──
  if (footerPlaceholder) {
    fetch(FOOTER_PATH)
      .then(function (r) {
        if (!r.ok) throw new Error('nav-loader: HTTP ' + r.status + ' for ' + FOOTER_PATH);
        return r.text();
      })
      .then(function (html) {
        footerPlaceholder.insertAdjacentHTML('afterend', html);
        footerPlaceholder.remove();
        footerLoaded = true;
        checkAllLoaded();
      })
      .catch(function (err) {
        console.error('nav-loader: could not load footer.html', err);
        footerLoaded = true;
        checkAllLoaded();
      });
  } else {
    footerLoaded = true;
  }

  // If no placeholders exist at all, still init nav if elements are already in DOM
  if (!navPlaceholder && !footerPlaceholder) {
    initNav();
    initActiveLink();
  }

  // ── Marks the correct top-level nav link as active based on current URL ──
  function initActiveLink() {
    var path = window.location.pathname;
    var links = document.querySelectorAll('.nav-links .nav-item > a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      // Exact match for home, prefix match for sections
      if (href === '/' && path === '/') {
        link.classList.add('active');
      } else if (href !== '/' && path.startsWith(href)) {
        link.classList.add('active');
      }
    });
  }

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

    // ── Scroll progress bar ──
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

      updateProgress();
    })();

    // ── Desktop dropdown behaviour ──
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

        item.addEventListener('mouseenter', function () { openDropdown(item); });
        item.addEventListener('mouseleave', function () { closeDropdown(item); });

        if (trigger) {
          trigger.addEventListener('click', function (e) {
            var isOpen = item.classList.contains('is-open');
            if (isOpen) {
              closeDropdown(item);
            } else {
              e.preventDefault();
              openDropdown(item);
            }
          });
        }

        var dropdownLinks = item.querySelectorAll('.nav-dropdown a, .nav-mega a');
        dropdownLinks.forEach(function (link) {
          link.addEventListener('click', function () { closeDropdown(item); });
        });
      });

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

      document.addEventListener('click', function (e) {
        var clickedInsideNav = e.target.closest('.nav-links');
        if (!clickedInsideNav) closeAllDropdowns();
      });
    })();

    // ── Scroll-spy active state (hash-based, for homepage sections) ──
    (function initScrollSpy() {
      var navLinkEls = document.querySelectorAll('.nav-links .nav-item > a');
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
      if (sectionIds.length === 0) return;

      function setActive(id) {
        navLinkEls.forEach(function (l) { l.classList.remove('active'); });
        if (id && sectionMap[id]) sectionMap[id].classList.add('active');
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { rootMargin: '-80px 0px -60% 0px' });

      sectionIds.forEach(function (id) {
        observer.observe(document.getElementById(id));
      });
    })();
  }
})();
