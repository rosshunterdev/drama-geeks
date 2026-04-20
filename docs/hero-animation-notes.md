# Chain-of-images Hero — Notes

## Swapping placeholder images

Each polaroid has its own `<img>` tag in `index.html` inside `#chain-hero`. To swap:

```html
<div class="chain-hero__polaroid chain-hero__polaroid--1">
  <div class="chain-hero__pin"></div>
  <img src="/images/YOUR-PHOTO-1.jpg" alt="Meaningful description of photo">
</div>
```

- **Recommended image dimensions:** at least 280×320px (displayed at 140×160px, so 2× for retina)
- **Format:** JPG or WebP
- Update the `alt` attribute on each image to describe the photo content for screen readers

## Tuning animation parameters

All parameters live at the top of `js/chain-hero.js`:

```javascript
var POLAROIDS = [
  { restAngle: -6, swingRange: 12, driftPx:  0 },
  { restAngle:  3, swingRange: 12, driftPx: 14 },
  { restAngle: -2, swingRange: 12, driftPx: 28 }
];
var CHAIN_DELAY = 0.28;
```

| Parameter | Effect |
|-----------|--------|
| `restAngle` | Static rotation when not scrolling (degrees). Negative = leans left. |
| `swingRange` | How far the polaroid rotates from its rest angle during scroll (degrees). Increase for more drama. |
| `driftPx` | How many pixels the polaroid drops vertically over the full scroll range. Top card stays fixed; increase lower cards for more cascade. |
| `CHAIN_DELAY` | Fraction (0–1) of scroll progress before the next polaroid begins moving. 0.28 means the 2nd starts when the hero is 28% scrolled, the 3rd at 56%. |

## Behaviour summary

- **Desktop (≥768px):** All three polaroids animate. The animation is scroll-linked — progress is tied to how far the hero has travelled through the viewport.
- **Mobile (<768px):** Only the first polaroid is shown (static, no animation). The string is hidden. Set in CSS so it requires no JS.
- **`prefers-reduced-motion: reduce`:** JS exits early; polaroids render at slightly more exaggerated static angles for a designed composition. No scroll motion.
- **No JS / IntersectionObserver unsupported:** Polaroids render at their CSS resting angles (defined in `styles.css` via `.chain-hero__polaroid--1/2/3`).

## Known limitations

- On very short screens (viewport height < 400px), the progress calculation compresses the swing into a small scroll window. The effect still works but is faster.
- `will-change: transform` is added to polaroids only while the hero is intersecting the viewport (via `.chain-hero--animating` class). It is removed on scroll-out to free compositor memory.
- The sine-curve swing means the polaroids return to near-resting position once the hero has scrolled fully out of view — this is intentional.
