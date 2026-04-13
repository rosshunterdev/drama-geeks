# Claude Code Prompt 3 — Scroll-Linked Chain of Images (Hero Effect)

## Context

The current hero has a large image with a smaller image overlapping below-right. We're replacing that visual block with something more distinctive: a vertical chain of 3–4 polaroid-style photos, connected by a thin string, that sway and fall with a gentle pendulum physics feel as the user scrolls down the page.

This is a *progressive enhancement*. The hero must still work — and look good — without JavaScript, without the animation, and on devices where the effect is disabled.

## Scope

- Replace the existing hero image composition (big image + small image) with the chain-of-images component
- Do not touch the hero text, badge, buttons, or trust strip — those stay exactly as they are
- Do not touch anything outside the hero section

## The visual, described

- 3 polaroid-style image cards, each roughly 160×200px
- Stacked vertically with ~40px vertical gap between them
- Each card is rotated slightly differently (e.g. -6°, +3°, -2°)
- Each card has a thin white border and soft shadow (polaroid aesthetic)
- A thin vertical line (2px, semi-transparent white or cream) runs down the centre behind them — this is the "string"
- Each polaroid has a small tape/pin element at its top centre where it "hangs" from the string
- At rest (page load), they sit in a slight natural pendulum position
- As the user scrolls, the top polaroid stays anchored and the ones below swing gently — like a mobile hanging from a ceiling

## The motion, described

This is **scroll-linked** (the animation progress is tied to scroll position, not triggered once on entry):

- **Progress range**: from the moment the hero enters the viewport's top until it scrolls fully out. Use `IntersectionObserver` to know when to activate the listener, but use `getBoundingClientRect()` inside a `requestAnimationFrame` loop for the actual progress calculation.
- **Per-polaroid motion**: each polaroid's rotation changes based on scroll progress, but with a delay — the 2nd polaroid starts moving after the 1st has moved ~30%, the 3rd after the 2nd has moved ~30%. This creates the "chain reaction" feel.
- **Rotation range**: each polaroid swings between its resting angle ±12°. No more than that, or it looks chaotic.
- **Vertical drift**: each polaroid drops slightly (~20–40px over the full scroll range) to suggest gravity. Top one drops least, bottom one drops most.
- **Easing**: use a spring-like easing curve. Suggested: implement a simple critically-damped spring or use an easing approximation like `easeOutBack` with a small overshoot.
- The "string" should also subtly distort — either bend with the top polaroid's rotation or simply fade out at the bottom as polaroids drop below it.

## Technical requirements

### Performance

- **Only animate `transform` and `opacity`.** Never animate `top`, `left`, `width`, `height`, or any property that triggers layout.
- **Apply `will-change: transform` only while the hero is in view.** Remove it when the hero scrolls out — keeping it permanently on hurts compositor memory.
- **Throttle with `requestAnimationFrame`.** Never run calculations inside a raw scroll event handler.
- **Skip the animation entirely if `IntersectionObserver` isn't supported** (ancient browser fallback — just show the polaroids in their resting positions).
- **Target 60fps.** If you can't hit it, reduce the number of polaroids or simplify the math before shipping.

### Accessibility

- **Respect `prefers-reduced-motion: reduce`.** If set, show the polaroids in a static, well-composed arrangement with no scroll-linked motion. This is non-negotiable — vestibular-sensitive users get motion-sick from scroll-linked physics.
- **Images must have meaningful `alt` text.** For placeholder usage, use `alt=""` (decorative) since they're not conveying information yet. When real photos go in, the owner should update alt text to describe each photo meaningfully.
- **Keyboard users should not be affected.** The animation is purely visual — it doesn't gate any content.

### Mobile

- Below 768px, **simplify to a static polaroid arrangement** or drastically dampen the motion (reduce range by 60%+, increase easing). Scroll-linked physics on mobile fights with natural scroll momentum and kills battery.
- Consider: on mobile, just show a single rotated polaroid as the hero image. The chain effect isn't meaningful on small screens.

### Fallbacks

- **No JS**: polaroids render in their resting positions via pure CSS, no animation. Hero is still visually compelling.
- **JS loads late**: same as above — polaroids sit still until the scroll listener attaches. No FOUC (flash of unstyled content).
- **`prefers-reduced-motion: reduce`**: polaroids are rendered statically with slightly more deliberate rotation angles to create a designed composition (not the animated resting state).

## Placeholder images

Use `/images/home_1.jpg` for all 3 polaroids for now. The markup should be structured so the user can easily swap in different images per polaroid later — ideally via a small config object or clearly-labelled `src` attributes on each `<img>`.

## File structure

- HTML structure goes in the hero section of the home page
- CSS goes in the existing stylesheet (find the hero styles and add alongside)
- JS goes in a new module: `js/chain-hero.js` or wherever project conventions dictate. It should self-initialise on DOMContentLoaded and cleanly do nothing if the hero element isn't present (so it's safe to include on pages that don't have a chain hero)

## Implementation approach

1. **Build the static version first.** Get the HTML + CSS looking correct with zero JS. Three rotated polaroids on a string, all visible in the hero. Take a screenshot to confirm it looks right before moving on.
2. **Add the IntersectionObserver activation.** Log scroll progress to the console without applying any transforms, just to verify the math is correct.
3. **Add the transforms.** Start with simple linear interpolation — just rotation based on scroll progress, no delays, no spring.
4. **Layer in the per-polaroid delay.** Now each polaroid has its own progress window within the total.
5. **Add the spring easing.** This is the final polish — without it, the motion feels robotic.
6. **Test `prefers-reduced-motion`.** Toggle it in DevTools and verify the static fallback looks good.
7. **Test on a real mobile device.** Simulators lie about performance. If you can hit 60fps on a mid-range Android, ship it; if not, simplify.

## Acceptance criteria

- [ ] Three polaroid-style images arranged vertically on a string, visible in the hero
- [ ] All three are rotated at distinct angles
- [ ] The hero text on the left side of the page is unchanged
- [ ] As the user scrolls, the polaroids swing in a chain-reaction pendulum motion
- [ ] The effect respects `prefers-reduced-motion: reduce` (static layout, no animation)
- [ ] The effect is simplified or disabled on mobile (<768px)
- [ ] No layout thrashing (only `transform` and `opacity` animated)
- [ ] No JS errors in the console
- [ ] The hero still looks good with JS disabled
- [ ] Frame rate stays at or near 60fps during scroll on desktop
- [ ] `will-change: transform` is applied only when the hero is in view

## What not to do

- **Don't use a heavy animation library** like GSAP or Framer Motion for this. Vanilla JS is enough and it keeps the bundle lean.
- **Don't add parallax on a separate axis** (e.g. horizontal drift on scroll). One axis of motion is elegant; two is busy.
- **Don't add sound effects, particle effects, or any other "extras".** The motion is the feature.
- **Don't tie to `window.scrollY` directly without `requestAnimationFrame`.** That's the #1 cause of janky scroll animations.
- **Don't ship it if mobile performance is bad.** Better to have a static polaroid on mobile than a laggy chain.
- **Don't remove the existing hero fallback content.** If JS fails, the polaroids should still render as a designed static composition.

## Report back

After implementing, create a short note at `docs/hero-animation-notes.md` covering:

- How to swap placeholder images for real ones (exact location and format expected)
- How to adjust the animation parameters (rotation range, drift distance, delay between polaroids)
- Browser/device combos you tested and the measured frame rate on each
- Any known issues or limitations

This will be useful when the user wants to tune the effect later or when real photography replaces the placeholders.
