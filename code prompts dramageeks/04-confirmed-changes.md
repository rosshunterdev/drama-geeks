# Claude Code Prompt — Confirmed Changes (Batch)

## Context

This is the Drama Geeks website — a children's performing arts school in South Shields, UK. The following changes are confirmed by the client and need implementing across the entire codebase. These are mechanical changes — don't redesign anything, just apply them cleanly.

## Scope

Every HTML file in the project. Search comprehensively — don't assume changes are only on the homepage.

---

## Copy and content changes (find and replace globally)

### Founding year
- Replace all instances of "2012" with "2017"
- Replace "12 years" or "10+ years" or any similar phrasing with "since 2017"
- The eyebrow text near the hero should read: `EST. 2017 · CLEADON | SOUTH SHIELDS`

### Class naming
- Replace all instances of "Elite Geeks" with "Drama Geeks Associates" or "DG Associates" (use the full name in headings and the short form in tight UI like badges and nav items)

### Venue corrections
- **Regular class venues are Cleadon Methodist Church and The Customs House only.**
- The Westovian Theatre is used for **summer school and productions only** — not regular weekly classes.
- If the Westovian is listed as a regular class venue anywhere, remove it from that context. It should still appear in the top contact strip and anywhere that references productions or summer school.
- Remove the hero line "As seen at: The Customs House · The Westovian Theatre · Cleadon Methodist Church" or similar. If a venues strip is needed, use: `CLEADON METHODIST · THE CUSTOMS HOUSE · THE WESTOVIAN (productions & summer school)`

### Contact email
- Replace all instances of the contact email with `charlottereid89@yahoo.co.uk`
- Ensure `mailto:` links use this address

### Parties removal
- Remove "Parties" and "Party Packages" from the What's On section, navbar dropdown, footer links, and any other references. Delete the `/whats-on/parties/` page if it exists. Remove the party card from any feature grids.

---

## Design changes

### Dark colour token
- Change the dark/navy colour tokens to near-black. Replace the `--ink` variable value (currently `#1A1A2E`) with `#111111`. Update `--ink-soft` to `#222222`.
- This affects the footer background, dark text, and any dark sections. Verify it still looks correct after the change — the contrast should improve slightly.

### Hero title size
- Make the main `h1` on the homepage larger. Increase the `clamp()` max value in the `.h-xl` class by roughly 15-20%. For example, if it's currently `clamp(2.8rem, 7vw, 5.2rem)`, change it to `clamp(3rem, 8vw, 6rem)`. Use your judgment on what looks balanced — the title should feel like the dominant element on the page.

### Secondary hero button
- The secondary button in the hero (currently "See Our Classes" or similar ghost button) should become a **yellow pill button** with the label **"See upcoming productions →"**. Use the `.btn--primary` style or create a `.btn--yellow` variant if needed. Link it to the productions page or `#productions` section.

### Tagline
- The tagline "Where confidence takes centre stage." should be **centred** within its container. If it's currently left-aligned as part of the hero text block, give it its own centred line — it should feel like a standalone statement, not part of the paragraph.

### Typography adjustment
- **Fraunces** (the serif display font) should only be used for `h1` and large display moments (hero title, pull quote text, section titles on landing pages).
- **Switch `h2`, `h3`, and card titles to Poppins** (the body font). They should use `font-family: var(--font-body)` with appropriate weight (600 or 700 for headings). This makes Fraunces feel special rather than overused.

### Productions images
- Each production in the productions section/page should have its own individual image placeholder, not a shared one. If there are currently multiple production cards sharing the same `images/home_1.jpg`, give each a distinct placeholder path:
  - `images/productions/production-1.jpg`
  - `images/productions/production-2.jpg`
  - `images/productions/production-3.jpg`
  - (and so on)
- The actual files don't need to exist yet — Charlotte will provide poster images. Just ensure the `src` attributes are unique and the paths are logical.

---

## New sections (placeholder only — awaiting client content)

### NODA Awards section
- Add a new section on the homepage between the testimonials section and the final CTA section.
- Structure: eyebrow "Recognition" → heading "NODA Award Winners" → a grid of 3–4 award cards, each with an image placeholder (`images/awards/award-1.jpg` etc), award name text, and year.
- Style it with a subtle background differentiation (cream-warm or white, whichever contrasts with the sections above and below).
- Add a `<!-- TODO: owner content — awaiting award photos and names from Charlotte -->` comment.

### Testimonials section
- If a testimonials section already exists with placeholder quotes, add a `<!-- TODO: owner content — awaiting real testimonials with permission to publish -->` comment.
- If no testimonials section exists, create one with 3 placeholder testimonial cards. Use the existing testimonial card pattern from the design system if available.

---

## Constraints

- Don't restructure the page layout or IA. This prompt is purely applying confirmed changes.
- Don't add new pages or remove pages (except the parties page).
- Don't change the navbar structure (that's a separate task).
- Keep all existing animations, interactions, and responsive behaviour intact.
- After making changes, do a text search for any remaining instances of "2012", "Elite Geeks", "party" / "parties" (case-insensitive), and the old email address to confirm nothing was missed.

## Acceptance criteria

- [ ] No instance of "2012" remains anywhere in the codebase
- [ ] No instance of "Elite Geeks" remains (all replaced with "Drama Geeks Associates" or "DG Associates")
- [ ] Westovian Theatre is not listed as a regular class venue
- [ ] All email references use charlottereid89@yahoo.co.uk
- [ ] No "Parties" or "Party Packages" references remain in nav, footer, or page content
- [ ] `--ink` is `#111111`, `--ink-soft` is `#222222`
- [ ] Hero h1 is visibly larger than before
- [ ] Secondary hero button is yellow with "See upcoming productions →"
- [ ] Tagline is centred
- [ ] h2, h3, and card titles use Poppins, not Fraunces
- [ ] Production cards have individual image paths
- [ ] NODA Awards section exists on homepage with placeholder content
- [ ] Testimonials section exists with placeholder or TODO marker
