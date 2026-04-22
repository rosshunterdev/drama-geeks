# Claude Code Prompt — Class Structure Restructure

## Context

The Drama Geeks website currently presents classes in four age-based groups (Mini Geeks, Junior Geeks, Senior Geeks, Elite Geeks). This is wrong — it doesn't match how the school actually runs. This prompt restructures classes into three tiers that reflect reality.

## How the school actually works

There are three types of class:

1. **Mini Geeks** — Ages 2–5. Its own dedicated class for the youngest children. Saturday only.
2. **Drama Geeks** — Ages 4–15. Mixed-age classes. What differentiates one session from another is the **production** (show) they're working towards, plus the day and venue. Not separated by age.
3. **Drama Geeks Associates** (formerly "Elite Geeks") — Ages 11–18. The advanced programme.

Classes run on **Saturdays and Thursdays** at two venues: **Cleadon Methodist Church** and **The Customs House**. The Westovian Theatre is NOT a regular class venue (productions and summer school only).

All booking goes through **Class Manager** (a third-party system Charlotte already uses).

---

## What to build

### 1. Update the navbar Classes dropdown

Replace the current 4-item dropdown with:

```
Classes ▼
├── Mini Geeks (Ages 2–5)
├── Drama Geeks (Ages 4–15)
└── DG Associates (Ages 11–18)
```

Each links to its respective page. "Classes" itself (the top-level link) should navigate to `/classes` (the comparison landing page). The dropdown items are shortcuts.

If the navbar currently has a mega-menu with images, keep that format but with 3 items instead of 4. Use `images/home_1.jpg` as placeholder for all three.

### 2. Rebuild the `/classes` landing page

The landing page should present the three tiers as large cards. Layout (desktop):

```
Three cards in a row, equal width:

┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
│ [Image placeholder] │ │ [Image placeholder] │ │ [Image placeholder] │
│                     │ │                     │ │                     │
│ AGES 2–5            │ │ AGES 4–15           │ │ AGES 11–18          │
│ Mini Geeks          │ │ Drama Geeks         │ │ DG Associates       │
│                     │ │                     │ │                     │
│ First steps in      │ │ Where the magic     │ │ The advanced        │
│ drama. Play,        │ │ happens. Mixed-age  │ │ track for serious   │
│ storytelling, and   │ │ classes working     │ │ young performers    │
│ creative fun.       │ │ towards termly      │ │ ready to take it    │
│                     │ │ productions.        │ │ further.            │
│ Saturdays only      │ │ Saturdays &         │ │                     │
│                     │ │ Thursdays           │ │ Explore →           │
│ Explore →           │ │                     │ │                     │
│                     │ │ Explore →           │ │                     │
└─────────────────────┘ └─────────────────────┘ └─────────────────────┘
```

Below the cards, add:

- A short paragraph: "Not sure which class is right for your child? Get in touch and we'll help you find the perfect fit."
- A comparison section showing all three tiers side by side:
  - Age range
  - Days available
  - Venues
  - What to expect
  - Link to explore

At the bottom: CTA banner ("Book a free trial").

### 3. Create/rebuild individual class pages

#### `/classes/mini-geeks`

- PageHeader: eyebrow "AGES 2–5" → title "Mini Geeks" → subtitle "First steps in drama"
- Hero image placeholder
- "What your child will experience" — 4 bullet points (play-based learning, storytelling, creative movement, first performances)
- Schedule section:
  ```
  SATURDAY
  🏛 [Venue TBC] · [Time TBC]
  ```
  Mark times and venue with `<!-- TODO: owner content — confirm Mini Geeks venue and time -->`
- "What to bring" — comfortable clothes, snack, water bottle
- Pricing: `<!-- TODO: owner content — confirm Mini Geeks pricing -->` with a note: "Sibling and loyalty discounts available — applied automatically through Class Manager."
- Parent FAQ (3 questions): "Can I stay and watch?", "What if my child is shy?", "What age should they move up to Drama Geeks?"
- CTA: "Book a Mini Geeks trial → " linking to Class Manager or contact form
- Testimonial placeholder (1 slot)

#### `/classes/drama-geeks`

This is the most important class page. It needs to handle the complexity of multiple sessions across days and venues, differentiated by production.

- PageHeader: eyebrow "AGES 4–15" → title "Drama Geeks" → subtitle "Where the magic happens"
- Hero image placeholder
- Intro paragraph explaining the mixed-age model: something like "Our Drama Geeks classes bring together children aged 4 to 15 in a creative, supportive environment. Each class works towards its own production — so every term, your child is part of building something amazing from scratch to spotlight."
- **"This term's classes" section** — this is the key piece. Structured as a schedule grid:

```
┌──────────────────────────────────────────────────────────────┐
│  SATURDAY                                                    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 🏛 Cleadon Methodist Church                            │  │
│  │ [Time TBC]                                             │  │
│  │ Currently working on: [Production Name TBC]            │  │
│  │ Book via Class Manager →                               │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 🏛 The Customs House                                   │  │
│  │ [Time TBC]                                             │  │
│  │ Currently working on: [Production Name TBC]            │  │
│  │ Book via Class Manager →                               │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  THURSDAY                                                    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ 🏛 Cleadon Methodist Church                            │  │
│  │ [Time TBC]                                             │  │
│  │ Currently working on: [Production Name TBC]            │  │
│  │ Book via Class Manager →                               │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Each session card should have:
- Venue name with a small location icon
- Time (placeholder with TODO comment)
- "Currently working on: [Production Name]" — this is the key differentiator. Placeholder with TODO comment. This line is what makes each session feel unique even though they're all "Drama Geeks".
- A "Book via Class Manager →" button/link. For now, link to `#` with a `<!-- TODO: replace with Class Manager deep link -->` comment.

- "What they'll learn" — 5 bullet points (acting techniques, devising, script work, stagecraft, teamwork & confidence)
- "A typical session" — 4-step breakdown
- Testimonial placeholder (2 slots)
- CTA: "Find a class that fits your schedule →"

#### `/classes/associates` (or `/classes/dg-associates`)

- PageHeader: eyebrow "AGES 11–18" → title "Drama Geeks Associates" → subtitle "The advanced track"
- Hero image placeholder
- Intro: "For young performers who want to go further. Associates is our advanced programme for ages 11–18, where students develop deeper skills in acting, directing, and production."
- Schedule section (same format as Drama Geeks but likely fewer sessions)
- "What makes Associates different" — 4 points (more intensive, student-led projects, performance opportunities, pathway to further training)
- "Entry" — a note that Associates is for students who've progressed through Drama Geeks or who audition. Mark with `<!-- TODO: confirm Associates entry criteria with Charlotte -->`
- Testimonial placeholder (1 slot)
- CTA: "Enquire about Associates →"

### 4. Remove old class pages

Delete these pages (they no longer match reality):
- `/classes/junior-geeks/` (if it exists)
- `/classes/senior-geeks/` (if it exists)
- `/classes/elite-geeks/` (if it exists — content has moved to `/classes/associates/`)

### 5. Update all references throughout the site

Search the entire codebase for references to the old four-tier structure and update:
- Homepage class cards (should show 3, not 4)
- Any "Find the right class" grids
- Footer class links
- Timetable section (if it has the old structure)
- Any "Our Classes" overview text
- The "Beyond the classroom" / features section if it references specific class names

### 6. Update the timetable section

If the homepage or any page has a timetable preview, restructure it to match:

```
Saturday
├── Mini Geeks · [Venue TBC] · [Time TBC]
├── Drama Geeks · Cleadon Methodist · [Time TBC]
└── Drama Geeks · The Customs House · [Time TBC]

Thursday
└── Drama Geeks · Cleadon Methodist · [Time TBC]
```

Mark all times with `<!-- TODO: owner content -->`. The structure is more important than the specific times right now.

---

## Placeholder and TODO conventions

- All unconfirmed times: `<!-- TODO: owner content — confirm class times -->`
- All unconfirmed prices: `<!-- TODO: owner content — confirm pricing -->`
- All production names: `<!-- TODO: owner content — current production name -->`
- All Class Manager links: `<!-- TODO: replace with Class Manager booking URL -->`
- Mini Geeks venue: `<!-- TODO: owner content — confirm Mini Geeks venue -->`

---

## Design notes

- Use the existing card component styles for the three class cards on the landing page
- The schedule grid on the Drama Geeks page should use the existing timetable card pattern if one exists, or create a clean schedule-card component. Each session should be a distinct visual block — don't use a traditional HTML table.
- Day headings (SATURDAY, THURSDAY) should be prominent — large, bold, uppercase. They act as visual anchors.
- The "Currently working on: [Production Name]" line should feel special — consider making it italic or using the Fraunces font for just this line, since it's the emotional hook.
- Add a subtle visual distinction between the three tiers (e.g. Mini Geeks cards have a warm yellow-light accent, Drama Geeks have a blue-light accent, Associates have a darker ink accent)

---

## Constraints

- Don't touch the navbar code beyond updating the dropdown items (the navbar has its own separate enhancement prompt)
- Don't change the global design system (colours, fonts, spacing)
- Don't add booking system functionality — just link placeholders to Class Manager
- Don't invent session times or production names — use placeholders
- Do ensure all internal links to class pages still work (no broken links)

## Acceptance criteria

- [ ] Classes dropdown has 3 items: Mini Geeks, Drama Geeks, DG Associates
- [ ] `/classes` landing page shows 3 tier cards with comparison info
- [ ] `/classes/mini-geeks` exists with complete template
- [ ] `/classes/drama-geeks` exists with schedule grid showing Saturday (2 venues) and Thursday (1 venue)
- [ ] `/classes/associates` exists with complete template
- [ ] Old pages (`junior-geeks`, `senior-geeks`, `elite-geeks`) are deleted
- [ ] Homepage class cards show 3 tiers, not 4
- [ ] Timetable section (if present) reflects the new structure
- [ ] Footer class links updated to 3 items
- [ ] No broken internal links (search for old page URLs and verify they're all updated)
- [ ] All placeholder content is clearly marked with TODO comments
- [ ] Each session in the Drama Geeks schedule has a "Currently working on" production placeholder
- [ ] "Book via Class Manager →" buttons exist on every session card

## Report back

After completing, update `docs/ia-map.md` to reflect the new class structure. List every class page, its URL, and what content is still needed from the client.
