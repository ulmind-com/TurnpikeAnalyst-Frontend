## Goal

Make the public site feel alive — animated stats, a Fortmindz-style services experience, a fully animated navbar, and real pages behind every link/card — without changing the existing emerald / sky / white glass theme.

## 1. Animated stats band (the three-card strip)

Replace the static tiles with a motion version:
- Staggered entrance (fade + rise + slight blur) as the band scrolls into view.
- Numbers count up from 0 with an easing spring; recount is not repeated.
- Gradient border light sweeps around the card on hover; card lifts and its glow deepens.
- Subtle continuous float offset per card so the row is never fully static.
- Pointer-driven 3D tilt on desktop, disabled on touch and for reduced-motion users.

## 2. Services section — Fortmindz treatment

New section component used on the home page and `/services`:

```text
┌───────────────┬───────────────────────────────────────┐
│ 1. Consulting │  [Our Services]  eyebrow chip         │
│ 2. Migration  │  Which service does your business     │
│ 3. Automation │  need right now?                      │
│ 4. Enablement │  ── Group heading ──────────────────  │
│  (sticky rail)│  icon │ icon │ icon   (3-col, rules)  │
│               │  title│ title│ title                  │
└───────────────┴───────────────────────────────────────┘
```

- Left rail: numbered category list, sticky on desktop. The active item highlights automatically as you scroll through groups, and clicking scrolls smoothly to that group.
- Right: service categories grouped from the live API data, each group rendered as bordered columns with hairline dividers (Fortmindz layout) instead of only cards.
- Effects: heading reveals word-by-word, each column fades up in sequence, hover fills the column with a soft emerald/sky mesh, lifts the icon and slides an arrow in, dividers draw in on scroll.
- Mobile falls back to a horizontal scrollable category chip row plus stacked items.

## 3. Navbar — animated pill header

- Floating rounded capsule header with a curved bottom notch, glass blur and a shadow that grows on scroll.
- Active route indicator is a sliding pill that animates between links (shared layout animation).
- Links have an underline/arrow micro-interaction on hover.
- "Book a discovery call" becomes an animated pill CTA with a rotating arrow disc.
- Hides on scroll-down, reappears on scroll-up; home keeps its existing reveal-after-hero behaviour.
- Mobile drawer: staggered link entrance, animated close, full-width CTA.

## 4. Every link and card opens a real page

Nav already routes to `/services`, `/products`, `/training`, `/blog`, `/about`, `/contact`. The gap is cards — most currently scroll to the contact form. Add real detail routes fed by the live API:
- `/services/$slug`, `/products/$slug`, `/training/$slug`, `/blog/$slug`
- Each with its own hero, detail body, related items, CTA, and its own page metadata (title/description/OG).
- Cards and CTAs link to these pages instead of scrolling.

## 5. Site-wide motion pass

- Route transition wrapper: pages fade/rise in on navigation, scroll resets to top.
- Consistent scroll reveals for every section on every page (about, contact, list pages included).
- Parallax on wave dividers and spotlight visuals; marquee and testimonial motion retained.
- Magnetic hover on primary buttons; animated form field focus states.
- All new motion respects `prefers-reduced-motion`.

## Technical notes

- Motion via `motion/react` (already installed) with shared-layout indicators; Lenis smooth scroll stays as-is.
- New components under `src/components/site/`: `services-explorer.tsx`, `animated-stat-band.tsx`, plus updates to `site-header.tsx` and `premium-card.tsx` (adds an optional `to`/`params` link mode).
- Detail routes use TanStack file routes with `$slug` params and existing API hooks; a small per-slug fetch hook is added to `use-public-api.ts` where the API supports it, otherwise the item is resolved from the list query.
- Zero new colors: everything uses existing `--primary`, `--brand-cyan` and white glass tokens.
