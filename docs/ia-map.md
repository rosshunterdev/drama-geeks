# Drama Geeks — Information Architecture Map

Generated: April 2026  
Routing: Static HTML, folder-based (`/classes/index.html`, etc.)

---

## Status Key

| Symbol | Meaning |
|--------|---------|
| ✅ | Page exists, structure complete |
| 🔶 | Needs owner content (placeholders present) |
| 🔍 | Needs design review |

---

## Pages

### Core

| URL | File | Status | Placeholder content |
|-----|------|--------|---------------------|
| `/` | `index.html` | ✅ 🔶 | Hero images, CTA links, class descriptions |
| `/contact/` | `contact/index.html` | ✅ 🔶 | Form endpoint, phone number, map embed, social links |
| `/thanks/` | `thanks/index.html` | ✅ 🔶 | Social media links |
| `/404` | `404.html` | ✅ | — |

---

### /classes

| URL | File | Status | Placeholder content |
|-----|------|--------|---------------------|
| `/classes/` | `classes/index.html` | ✅ 🔶 | Images, comparison table prices |
| `/classes/mini-geeks/` | `classes/mini-geeks/index.html` | ✅ 🔶 | Hero image, fee amount, 3 × parent testimonials |
| `/classes/junior-geeks/` | `classes/junior-geeks/index.html` | ✅ 🔶 | Hero image, fee amount, 3 × parent testimonials |
| `/classes/senior-geeks/` | `classes/senior-geeks/index.html` | ✅ 🔶 | Hero image, fee amount, 3 × parent testimonials |
| `/classes/elite-geeks/` | `classes/elite-geeks/index.html` | ✅ 🔶 | Hero image, fee amount, 3 × parent testimonials |

---

### /whats-on

| URL | File | Status | Placeholder content |
|-----|------|--------|---------------------|
| `/whats-on/` | `whats-on/index.html` | ✅ 🔶 | Upcoming dates (table) |
| `/whats-on/productions/` | `whats-on/productions/index.html` | ✅ 🔶 | Current show details, 3 × past production cards (title, date, image, description) |
| `/whats-on/holiday-workshops/` | `whats-on/holiday-workshops/index.html` | ✅ 🔶 | Workshop dates, price, timings |
| `/whats-on/parties/` | `whats-on/parties/index.html` | ✅ 🔶 | 3 × party packages (name, duration, price, inclusions) |
| `/whats-on/gallery/` | `whats-on/gallery/index.html` | ✅ 🔶 | 12 × real gallery photos (replacing `home_1.jpg`) |

---

### /about

| URL | File | Status | Placeholder content |
|-----|------|--------|---------------------|
| `/about/` | `about/index.html` | ✅ 🔶 | Founder photo, stats (students taught, productions staged) |
| `/about/our-story/` | `about/our-story/index.html` | ✅ 🔶 | Full founder story (Charlotte to write), founder photo, university name |
| `/about/team/` | `about/team/index.html` | ✅ 🔶 | 4 × team member cards (name, role, bio, headshot) |
| `/about/venues/` | `about/venues/index.html` | ✅ 🔶 | Full addresses, Google Map embeds (3 venues) |

---

### /parents

| URL | File | Status | Placeholder content |
|-----|------|--------|---------------------|
| `/parents/` | `parents/index.html` | ✅ | — |
| `/parents/faq/` | `parents/faq/index.html` | ✅ 🔶 | 12 × FAQ answers (marked for owner review) |
| `/parents/term-dates/` | `parents/term-dates/index.html` | ✅ 🔶 | All term dates, workshop dates, Google Calendar embed |
| `/parents/safeguarding/` | `parents/safeguarding/index.html` | ✅ 🔶 | DSL name, safeguarding renewal frequency, South Tyneside CS number, PDF policy link |
| `/parents/fees/` | `parents/fees/index.html` | ✅ 🔶 | All fee amounts, sibling discount %, payment timing, refund notice period |

---

### Legal (footer only)

| URL | File | Status | Placeholder content |
|-----|------|--------|---------------------|
| `/privacy/` | `privacy/index.html` | ✅ 🔶 | Legal entity name, retention period, third-party processors — **requires legal review** |
| `/cookies/` | `cookies/index.html` | ✅ 🔶 | Analytics tool details — **requires legal review** |
| `/terms/` | `terms/index.html` | ✅ 🔶 | Cancellation notice period, refund conditions — **requires legal review** |

---

## SEO Files

| File | Status | Notes |
|------|--------|-------|
| `robots.txt` | ✅ | Update domain if not `www.dramageeks.co.uk` |
| `sitemap.xml` | ✅ | Update domain before going live |

---

## Shared Components

| Component | File | Notes |
|-----------|------|-------|
| Navbar | `components/nav.html` + `nav-loader.js` | Fetched via JS, injected at `#nav-placeholder` |
| Footer | `components/footer.html` + `footer-loader.js` | Fetched via JS, injected at `#footer-placeholder` |
| Styles | `styles.css` | All design system tokens and component CSS |

---

## Global TODOs Before Launch

- [ ] Replace all `images/home_1.jpg` placeholder images with real photography
- [ ] Fill in all `<!-- TODO: owner content -->` placeholders (search the codebase)
- [ ] Connect the contact form (`/contact/`) to a real email/backend endpoint
- [ ] Add social media links (footer + thanks page)
- [ ] Add phone number to contact page and footer
- [ ] Add real Google Map embeds to venues page and contact page
- [ ] Embed Google Calendar on term-dates page
- [ ] Add real fee amounts throughout
- [ ] Fill in all term dates
- [ ] Legal review of `/privacy/`, `/cookies/`, `/terms/` before publishing
- [ ] Safeguarding: confirm DSL name and contact details
- [ ] Update `robots.txt` and `sitemap.xml` domain once live URL is confirmed
- [ ] Add favicon (`/favicon.ico` or `<link rel="icon">` in `<head>`)
