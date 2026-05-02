# Drama Geeks - Project Brief

## Project Overview
A theatrical, high-energy landing page for a youth drama school (ages 11-17). Focuses on visual impact, social proof (NODA awards), and easy booking via Class Manager.

## Technical Stack
- HTML5 / CSS3 (Fluid design using clamp and CSS variables)
- Hosting: Netlify (GitHub integrated)
- Integrations: Formspree (Contact), Curator.io (Social Feed)

## Development Standards
- **Styling:** Use design tokens defined in `styles.css` (e.g., `var(--font-body)`, `var(--pink)`).
- **Naming:** Follow the established BEM-lite naming convention (e.g., `.hero-venues`, `.class-card`).
- **Git Protocol:** Always append `[skip ci]` to commit messages to avoid unnecessary Netlify build costs.

## Recent Refactors
- Replaced hardcoded fonts/colors with CSS variables.
- Updated marquee to use `aspect-ratio: var(--ar)`.
- Rebuilt Hero Venues as an absolute-positioned card.