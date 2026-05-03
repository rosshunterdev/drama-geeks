# Drama Geeks — Performing Arts School Website

A modern, responsive website for Drama Geeks, a performing arts school in South Shields. Built with vanilla HTML, CSS, and JavaScript, deployed live on Netlify.

**Live site:** [dramageeks.co.uk](https://dramageeks.co.uk)

---

## Overview

Drama Geeks is a full-featured website showcasing a performing arts school's classes, productions, and facilities. The site is designed for parents and prospective students, with multiple conversion paths (trial class booking, contact form, class enrollment).

This project demonstrates modern web development practices: responsive design, component-based architecture, smooth navigation, and maintainable code—all without a framework dependency.

---

## Features

### 📄 Pages & Sections

- **Home** — Hero section, NODA awards carousel, current/past productions, CTA buttons
- **About** — School history, instructor profiles, mission statement
- **Classes** — Three program tiers (Mini Geeks, Drama Geeks, DG Associates) with skill breakdowns and pricing
- **Shows & Productions** — Current and past productions with details
- **Workshops** — Holiday intensive programs (summer, half-term)
- **Gallery** — Photo showcase of classes, rehearsals, and productions
- **For Parents** — FAQ, safeguarding info, trial policies, reassurance cards
- **Contact** — Contact form with validation, email integration

### 🎨 Design & UX

- **Responsive layout** — Optimized for desktop, tablet, and mobile
- **Accessible navigation** — Clear information hierarchy, intuitive structure
- **Smooth interactions** — Hover effects, lazy-loaded images, card-based UI
- **Mobile-first approach** — Progressive enhancement from mobile to desktop

### ⚙️ Technical Features

- **Vanilla JavaScript** — No framework bloat; lightweight and performant
- **Component architecture** — Reusable HTML/CSS patterns for cards, modals, forms
- **Form validation** — Client-side validation with UX feedback
- **Netlify deployment** — Continuous deployment, redirect rules, environment-ready
- **SEO-friendly** — Semantic HTML, proper meta tags, sitemap, robots.txt
- **Cookie management** — Cookie consent banner with user preferences

---

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Hosting:** Netlify (static site deployment)
- **Build/Deploy:** Git-based CI/CD via Netlify
- **Analytics:** Ready for integration (placeholder structure)

---

## Project Structure

```
drama-geeks/
├── index.html                 # Homepage
├── styles.css                 # Main stylesheet (~80KB, modular design)
├── script.js                  # Client-side logic
├── classes/                   # Class pages (Mini Geeks, Drama Geeks, Associates)
├── about/                     # About page
├── shows/                     # Productions showcase
├── workshops/                 # Holiday workshops
├── gallery/                   # Photo gallery
├── contact/                   # Contact form
├── parents/                   # Parent resources, FAQ, policies
├── components/                # Reusable UI components
├── templates/                 # Page templates
├── images/                    # Optimized images and assets
└── netlify.toml              # Netlify configuration
```

---

## Key Development Insights

### Responsive Design Without a Framework
The entire site is built with vanilla CSS Grid and Flexbox. Mobile-first design principles ensure fast load times and smooth scaling across devices.

### Modular CSS Architecture
Styles are organized by component and page, with consistent naming conventions. This makes maintenance easy and scaling effortless—a good foundation for future framework adoption if needed.

### Form Handling
Contact forms validate client-side with real-time feedback, then post to Netlify Forms for server-side processing. No backend code required.

### Content-Driven Design
The site uses a comprehensive content brief (CONTENT-BRIEF.md) to track required information—a professional approach that keeps development and content teams aligned.

### Performance Optimization
- Lazy-loaded images for faster initial page load
- Minimalist JavaScript (no unnecessary dependencies)
- Optimized CSS with media queries for responsive breakpoints
- Static site deployment (fast CDN delivery)

---

## Getting Started

### Clone & Setup
```bash
git clone https://github.com/rosshunterdev/drama-geeks.git
cd drama-geeks
```

### Local Development
Open `index.html` in a browser, or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Visit `http://localhost:8000`

### Deploy
The site auto-deploys to Netlify on every push to `main`:
```bash
git add .
git commit -m "Update content"
git push origin main
```

---

## Highlights for Developers & Recruiters

### What This Demonstrates

✅ **Full ownership of a production site** — From concept to live deployment  
✅ **User-focused design** — Clear navigation, fast load times, mobile-first  
✅ **Professional communication** — Content brief, component documentation  
✅ **Modern CSS** — Grid, Flexbox, responsive media queries  
✅ **Practical JavaScript** — Form validation, DOM manipulation, event handling  
✅ **DevOps basics** — Git workflow, CI/CD via Netlify, environment config  
✅ **Client-ready code** — Clean, maintainable, ready for handoff or team collaboration  

### Code Quality
- Semantic HTML for accessibility
- Reusable CSS components (DRY principle)
- Clear JavaScript with comments for complex logic
- Consistent naming conventions across files

---

## Areas for Enhancement

- **CMS integration** — Migrate content to Headless CMS for non-technical updates
- **E-commerce** — Add class booking and payment processing
- **Analytics** — Integrate Google Analytics or similar for traffic insights
- **A/B testing** — Optimize conversion paths (trial class signups, contact forms)
- **Framework migration** — Upgrade to React/Vue if feature complexity grows

---

## Lessons & Takeaways

This project reinforces several key development principles:

1. **Start simple.** Vanilla tools often outperform frameworks for straightforward sites.
2. **Content is king.** The best design supports the content strategy.
3. **Responsive first.** Design for mobile, enhance for desktop.
4. **Maintainability matters.** Clean code and clear structure are worth the extra time.
5. **Deployment matters.** A live site is better than a perfect prototype.

---

## Contributing

This is a live, production site. Any changes should go through a pull request and be tested locally before merging to `main`.

---

## License

© Drama Geeks. All rights reserved.

---

**Questions?** Check the CONTENT-BRIEF.md for outstanding items or feature requests.
