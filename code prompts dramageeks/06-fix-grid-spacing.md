# Claude Code Prompt — Fix 3-Item Grid Spacing

## Problem

The website was restructured from 4 class tiers to 3. Several grids still have spacing configured for 4 items, leaving awkward dead space on the right. This affects at least:

1. **The navbar Classes mega-menu dropdown** (image shows 3 items huddled left with empty space right)
2. **The `/classes` landing page** (3 class cards not filling the available width)
3. **The homepage class cards section** (if it uses the same grid)

There may be other places too — search comprehensively.

## What to fix

### 1. Find every grid that previously held 4 class items

Search CSS and inline styles for any of these patterns:
- `grid-template-columns: repeat(4, 1fr)`
- `grid-template-columns: repeat(4, ...)`  
- `grid-template-columns` with 4 explicit column values
- Any container with `max-width` sized to fit 4 cards
- Flexbox containers where `flex-basis` or `width` is set to `25%` or `calc(25% - ...)`

### 2. Update to 3 columns

Change to `grid-template-columns: repeat(3, 1fr)` or the equivalent flexbox. Ensure:
- Cards fill the full container width with even spacing
- Gap between cards stays consistent (use whatever gap value is already in the design system — likely 24px or 32px)
- The grid centres if the container is wider than needed (it shouldn't be, but check)

### 3. Navbar mega-menu specifically

The dropdown panel for "Classes" needs to:
- Shrink its width to fit 3 items naturally (not stretch to what 4 items needed)
- Keep items evenly spaced within the dropdown
- Stay properly aligned under the "Classes" nav link (centred or left-aligned, whichever it currently uses)
- Not overflow or wrap on screens down to 1024px

### 4. Responsive check

Verify the breakpoints still make sense:
- **Desktop (1024px+):** 3 columns
- **Tablet (768px–1023px):** 2 columns (with the 3rd wrapping below) or 3 narrower columns — whichever looks better. Use your judgment.
- **Mobile (<768px):** 1 column (stacked)

If the old responsive rules had a tablet breakpoint that went from 4→2, it should now go from 3→1 (skip the 2-column step) or 3→2→1 if there's enough room.

### 5. Classes landing page comparison table/section

If there's a comparison table or side-by-side section below the cards on `/classes`, verify it's also 3 columns, not 4.

## How to verify

After fixing, check these pages at 1440px, 1024px, 768px, and 375px:
- Homepage (class cards section)
- `/classes` landing page
- Navbar dropdown (open it at each width)

At every width, the 3 items should fill their row evenly with no dead fourth-column gap.

## Constraints

- Don't change the card component design — only the grid/layout that contains them
- Don't change card content, images, or typography
- Keep all existing responsive breakpoints for other sections intact

## Acceptance criteria

- [ ] Navbar Classes dropdown: 3 items fill the dropdown width evenly, no dead space
- [ ] `/classes` landing page: 3 cards span full container width
- [ ] Homepage class section: 3 cards span full container width
- [ ] No other section is accidentally affected
- [ ] Looks correct at 1440px, 1024px, 768px, 375px
