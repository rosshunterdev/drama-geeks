# Claude Code Prompt 1 — Navbar Enhancements

## Context

This is the Drama Geeks website — a Saturday drama school for ages 4–18 based in South Shields. The navbar currently has a top contact strip (venues + email), a logo, 5 nav items (Classes, What's On, About, Parents, Contact) with dropdowns on 4 of them, and nothing else. This prompt upgrades it with specific UX improvements.

## Scope boundary

**Only modify the navbar and its direct dependencies.** Do not touch hero, page sections, or any other component. If you need to share state with the page (e.g. for active-section detection), add it as a minimal addition without refactoring existing code.

## Tasks (do all of these)

### 1. Add a scroll progress bar

A 2px horizontal bar fixed to the very top of the viewport that fills from 0% to 100% as the user scrolls from the top of the page to the bottom. Use the brand yellow (`--yellow`). It should sit above the navbar (higher z-index). Use a single `requestAnimationFrame`-throttled scroll listener — do not update on every scroll event unthrottled.

### 2. Add a "Book a Free Trial" CTA button to the navbar

Place it as the rightmost element, after the Contact link. Use the existing `.btn.btn--primary` style (yellow pill, ink text). Link it to `/contact#book` for now. It must be visible on desktop. On mobile it should appear inside the mobile menu as the last item, styled slightly larger than the text links.

### 3. Make the "Classes" dropdown into a mega-menu with images

The Classes dropdown currently lists 4 items. Restructure it so each item has:

- A thumbnail image on the left (square, ~80×80px, rounded corners)
- The age range as an eyebrow label (e.g. "AGES 4–6")
- The class name as a bold title (e.g. "Mini Geeks")
- A one-line description (e.g. "First steps in drama")

For placeholder images, use `/images/home_1.jpg` for all four items for now (the user will replace them individually later). Use `loading="lazy"` on the images. The dropdown width should expand to accommodate the grid layout (4 columns on desktop, 2 columns on tablet, 1 column on mobile or inside the mobile menu).

### 4. Add scroll-spy active state

When the user scrolls through the page, the navbar link corresponding to the currently-visible section should get an `.active` class. Use an `IntersectionObserver` with `rootMargin: '-80px 0px -60% 0px'` (accounts for the fixed navbar and only activates when the section is in the upper portion of the viewport). Apply this to the top-level nav items that map to sections on the current page. For pages without matching sections, simply don't activate anything.

### 5. Close dropdowns on outside click and Escape key

Currently dropdowns may only close on hover-out or another click on the trigger. Add:
- Click anywhere outside an open dropdown → close it
- Press Escape while a dropdown is open → close it and return focus to the trigger
- Clicking a link inside the dropdown → close it (so the user sees the navigation has happened)

### 6. Stagger-fade dropdown items on open

When a dropdown opens, its items should fade in from `opacity: 0; transform: translateY(-4px)` to `opacity: 1; transform: translateY(0)` with a 40ms stagger between each item. Use CSS `animation-delay` calculated from `:nth-child(n)` — do not use JS for this.

## Constraints

- **Vanilla JS only.** No new libraries.
- **Respect `prefers-reduced-motion: reduce`** for the stagger-fade animation — users who have it enabled should see items appear instantly.
- **Don't break the mobile menu.** The hamburger and slide-in panel must still work exactly as before. Test that the new CTA button and any restructured dropdowns render correctly inside it.
- **Don't change the existing visual design language** — colours, fonts, border radii, spacing scale stay identical. These are additions and refinements, not a redesign.
- **Keep the HTML semantic.** The nav should still be a `<nav>`, dropdowns should still be button-triggered for accessibility, and ARIA attributes (`aria-expanded`, `aria-haspopup`) must be updated correctly when dropdowns open/close.

## Acceptance criteria

After your changes, a user should be able to:

- [ ] See a yellow progress bar at the top of the page that fills as they scroll
- [ ] Click a prominent yellow "Book a Free Trial" button in the top-right of the navbar on desktop
- [ ] Hover or click "Classes" and see a 4-column grid of image-backed class cards
- [ ] Scroll the page and see the navbar's active indicator follow the current section
- [ ] Press Escape to close any open dropdown
- [ ] Click outside a dropdown to close it
- [ ] See dropdown items fade in with a subtle stagger when they open
- [ ] Have all of the above work on mobile (with animations disabled if `prefers-reduced-motion`)

## What not to do

- Don't auto-hide the navbar on scroll down. The CTA must always be reachable.
- Don't add cursor-following effects, magnetic buttons, or liquid hover states.
- Don't animate the logo on scroll.
- Don't refactor unrelated code. Keep the diff focused.
- Don't introduce any third-party JS libraries.

## Deliverable

A single commit (or a small series of logically-grouped commits) containing only the navbar changes. Update any existing JS in a clean, readable way — don't create a separate file for each feature, but do group logically (one IIFE or module for scroll-spy, one for dropdown behaviour, one for the progress bar). Add brief comments explaining any non-obvious logic, especially the IntersectionObserver rootMargin calculation.
