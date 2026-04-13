# Claude Code Prompt 2 — Information Architecture & Page Creation

## Context

The Drama Geeks site currently has a single-page design. This prompt creates the full multi-page structure so the navbar links lead somewhere real. We're building a sensible IA that matches how parents actually browse this kind of site.

## Scope

Create all pages listed below. Each page should share a common layout (navbar + footer) and the existing design system. This is structural scaffolding — use realistic placeholder content where specifics aren't known, but clearly mark placeholders with `<!-- TODO: owner content -->` comments so the user can search for them later.

## Routing

Use whatever routing approach matches the current stack. If the project is static HTML, use folder-based routing (`/classes/index.html`, `/classes/mini-geeks/index.html`, etc). If it's a framework (Next.js, Astro, etc.), use the framework's conventions. **First, inspect the project and report which approach you'll use before creating files.**

## Page structure to create

```
/                              Home (already exists)
/classes                       Classes landing (comparison of all four)
/classes/mini-geeks            Ages 4–6
/classes/junior-geeks          Ages 7–10
/classes/senior-geeks          Ages 11–14
/classes/elite-geeks           Ages 15–18
/whats-on                      What's On landing
/whats-on/productions          Current and upcoming shows
/whats-on/holiday-workshops    Holiday courses
/whats-on/parties              Party packages
/whats-on/gallery              Photo gallery
/about                         About landing
/about/our-story               Charlotte's story
/about/team                    Team page
/about/venues                  The three locations
/parents                       Parents landing
/parents/faq                   Frequently asked questions
/parents/term-dates            Term dates & calendar
/parents/safeguarding          Child safeguarding policy
/parents/fees                  Fees & payment info
/contact                       Contact page
/thanks                        Form submission confirmation
/404                           Not found page
```

Also create (footer-only, not in navbar):

```
/privacy                       Privacy policy
/cookies                       Cookie policy
/terms                         Terms & conditions
```

## Shared components

Before creating the pages, extract these into shared partials/components so you're not duplicating code:

1. **`<Navbar />`** — the existing navbar with all its state, dropdowns, mobile menu. Every page uses this.
2. **`<Footer />`** — currently hardcoded in the homepage, extract it. Include the secondary footer-only links (Privacy, Cookies, Terms) here.
3. **`<PageHeader />`** — a simple hero for inner pages: eyebrow + page title + optional subtitle + optional background colour. Much smaller than the homepage hero.
4. **`<ClassCard />`** — the image + age + name + description card used in multiple places (home, /classes landing, navbar mega-menu).
5. **`<CTABanner />`** — the "Book a Free Trial" call-to-action band used at the bottom of most inner pages.

## Per-page templates

### `/classes` (landing)

- PageHeader: "Our Classes" / "Find the right class for your child"
- Intro paragraph explaining the age-based progression
- Grid of all 4 ClassCards (large versions)
- Comparison table: age range, skills focus, duration, price, venue
- FAQ excerpt with 3 most-common class-related questions
- CTABanner

### `/classes/[age-group]` (each of the 4 class pages)

All four follow the same template:

- PageHeader with the age range as eyebrow, class name as title, short tagline
- Hero image (`images/home_1.jpg` placeholder for now)
- "What they'll learn" — 4–5 skill bullets with icons
- "A typical session" — 4-step breakdown of what a class looks like
- "Where and when" — list of venues offering this class with times
- "Pricing" — what's included, payment terms
- 2–3 testimonials from parents of kids this age
- "Meet the teacher" (placeholder)
- CTABanner specific to this class ("Book a trial for Mini Geeks")

### `/whats-on` (landing)

- PageHeader: "What's On" / "Shows, workshops, and celebrations"
- Four large cards linking to each sub-page (productions, workshops, parties, gallery)
- Upcoming dates list (placeholder)
- CTABanner

### `/whats-on/productions`, `/whats-on/holiday-workshops`, `/whats-on/parties`, `/whats-on/gallery`

Each gets a focused page:
- **Productions**: current show callout, past productions grid
- **Holiday workshops**: upcoming dates, what to expect, booking info
- **Parties**: packages comparison, what's included, enquiry form
- **Gallery**: responsive masonry-style photo grid (use `images/home_1.jpg` placeholders — 12 copies for now)

### `/about` (landing)

- PageHeader: "About Drama Geeks"
- Our story summary
- Three cards linking to Our Story, Team, Venues
- Key stats (years running, students taught, shows staged)
- CTABanner

### `/about/our-story`, `/about/team`, `/about/venues`

- **Our Story**: long-form written piece about Charlotte and how Drama Geeks started — use lorem ipsum clearly marked as placeholder
- **Team**: grid of team member cards (placeholder: 4 members)
- **Venues**: card for each of the three venues with address, map embed placeholder, which classes are held there

### `/parents` (landing)

- PageHeader: "For Parents"
- Four cards linking to FAQ, Term Dates, Safeguarding, Fees
- "Quick answers" — 3 most-important parent concerns surfaced here (no experience needed, DBS-checked teachers, free trials)
- CTABanner

### `/parents/faq`

- Accordion-style FAQ with at least 12 questions grouped by category:
  - Getting started (4 questions)
  - Classes (4 questions)
  - Payments & admin (2 questions)
  - Safety & welfare (2 questions)
- Each with placeholder answers marked for owner review

### `/parents/term-dates`

- Current term's key dates in a clear table/list
- Next term's dates
- School holiday workshops dates
- Calendar embed placeholder (Google Calendar)

### `/parents/safeguarding`

- Statement on child safeguarding commitment
- DBS check policy
- Photography consent policy
- Designated safeguarding lead (placeholder name)
- Link to full written policy (PDF placeholder)

### `/parents/fees`

- Fee structure for each class
- What's included
- Sibling discount
- Payment methods accepted
- Refund policy summary

### `/contact`

- PageHeader: "Get in Touch"
- Contact form (name, email, phone, child's age, which class, message) — `action` attribute can point to `/thanks`
- Email, phone, social links
- Map embed placeholder showing the three venues
- "Book a free trial" secondary CTA prominent at top

### `/thanks`

- Simple confirmation: "Thanks, we'll be in touch within 48 hours"
- Link back to Home
- Small social follow prompt

### `/404`

- On-brand 404 with drama/theatre metaphor ("This scene doesn't exist" or similar)
- Search suggestions: link to Home, Classes, Contact
- Keep the navbar and footer

### `/privacy`, `/cookies`, `/terms`

- Standard legal page templates with placeholder content — clearly marked `<!-- TODO: legal review -->`
- Last updated date in header
- Section headings and anchor links

## Constraints

- **Reuse the design system**. Don't invent new colours, fonts, or components. All pages should feel like the same site.
- **Every page must have the navbar and footer.** No exceptions.
- **Every page must have a unique `<title>` and `<meta name="description">`** that accurately describes its content.
- **Internal links must work.** If you link to `/classes/mini-geeks`, that page must exist.
- **Semantic HTML.** `<main>`, `<article>`, `<section>`, `<nav>` used appropriately on every page.
- **Mobile-responsive from the start.** Every page must be tested at 375px, 768px, and 1280px minimum.
- **Use `images/home_1.jpg` as the placeholder for all images** unless the current page already has a specific placeholder.

## Acceptance criteria

- [ ] All 22 pages exist and are reachable by their stated URL
- [ ] Every page shares the navbar and footer via shared components
- [ ] Navbar dropdowns link to the correct pages (e.g. Classes → `/classes`, FAQ → `/parents/faq`)
- [ ] Footer includes the secondary-only pages (Privacy, Cookies, Terms)
- [ ] Every page has unique, descriptive meta title and description
- [ ] Every page has placeholder content clearly marked with `<!-- TODO: owner content -->` or equivalent
- [ ] A `robots.txt` and basic `sitemap.xml` are generated and include all pages
- [ ] No broken internal links (run a link check before finishing)

## What not to do

- Don't write final copy. Use placeholder text the owner will replace.
- Don't add new design elements — stick to the existing design system.
- Don't skip the shared component extraction. Duplicating navbar/footer HTML across 22 pages will make future changes painful.
- Don't invent features beyond what's listed here (no blog, no member login, no booking system yet — those are separate decisions).

## Report back

After creating the pages, produce a summary markdown file at `docs/ia-map.md` listing every page, its URL, its status (complete / needs content / needs design review), and what placeholder content it contains. This will be the user's reference for filling in real content later.
