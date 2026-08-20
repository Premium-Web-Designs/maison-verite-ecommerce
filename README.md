# Maison Vérité — Next.js + Tailwind CSS

A concept e-commerce site built to explore luxury fashion UI patterns: layered scroll reveals, hover-swap product cards, a scroll-locked product gallery, a custom cursor, and a mosaic-tile page transition between routes.

## Features

### Collection Page
- **Hero Zoom Animation**: 4 editorial images in 4:5 ratio with staggered scale-in on page load
- **Collection Grid**: 4-column grid with hover slide-reveal (secondary image slides from left)
- **Editorial Slider**: Horizontal scroll-snap carousel with hover info reveals
- **Scroll Reveal**: IntersectionObserver-based fade-up animations

### Product Detail Page (Video-inspired layout)
- **3-Column Sticky Scroll Layout**:
  - **LEFT**: Product description, details (sticky while scrolling)
  - **CENTER**: Stack of product images that animate in on scroll (translateY + scale + opacity)
  - **RIGHT**: Price, color selector, size selector, Add to Bag, wishlist (sticky while scrolling)
- **You May Like It**: After images finish scrolling, reveals same 4-grid + editorial slider from collection page
- **Smooth Page Transitions**: Framer Motion AnimatePresence with fade + slide between pages

### Global
- **Custom Cursor**: Blend-mode cursor that expands on interactive elements
- **Sticky Navbar**: Blur backdrop on scroll
- **Responsive**: Full mobile adaptation

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 4
- Framer Motion (page transitions)

## Getting Started

```bash
cd maison-verite-next-v2
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
  layout.js              # Root layout with AnimatePresence page transitions
  page.js                # Collection page
  globals.css            # Tailwind + custom animations
  product/[id]/
    page.js              # Product detail — 3-column sticky scroll
components/
  Navbar.js              # Sticky nav with scroll blur
  CustomCursor.js        # Blend-mode custom cursor
  HeroGrid.js            # 4-image hero with zoom animations
  CollectionGrid.js      # 4-column grid with slide-reveal hover
  EditorialSlider.js     # Horizontal scroll carousel
  ProductScrollGallery.js # Center column scroll-driven images
  YouMayLike.js          # Bottom section (grid + slider)
  Footer.js              # Site footer
hooks/
  useScrollReveal.js     # IntersectionObserver hook
```

## Key Design Patterns

### 3-Column Sticky Scroll (Product Page)
```
grid grid-cols-12
├── col-span-3  [sticky top-[100px] self-start]  ← Description
├── col-span-5  [normal flow]                     ← Images (tallest)
└── col-span-4  [sticky top-[100px] self-start]  ← Actions
```

The center column contains 5 full-height images. As you scroll, each image animates in with `translateY(80px) → 0`, `scale(0.96) → 1`, `opacity 0 → 1`. The left and right columns remain sticky until the center column finishes scrolling.

---

## The Page Transition System
 
The signature feature of this build is the mosaic tile transition between the
collection grid and a product page. It's built from four pieces working
together rather than a single "page transition" component, because that
turned out to be the only way to make it reliable:
 
1. **`TransitionContext`** — a small state machine (`idle → closing → open`)
   that owns *when* things happen. Critically, it does **not** guess timing
   with a fixed `setTimeout`. It waits for Next.js's router to confirm the
   URL has actually changed (via `usePathname()`) before revealing the new
   page. Early versions used a fixed delay and would occasionally flash the
   old page or animate over a half-loaded image — this fixed both.
2. **`TransitionLink`** — a drop-in replacement for internal `<Link>` usage.
   It prefetches the target route on mount/hover (so the JS chunk is already
   warm by the time the transition finishes), then intercepts the click to
   run the transition instead of navigating immediately.
3. **`TileWipeOverlay`** — a fixed, full-viewport 8×5 grid of tiles. On
   close, each tile scales 0 → 1 with a delay based on its distance from the
   center (plus a little jitter), so the outgoing page appears to implode
   into a mosaic rather than a hard cut. On open, the same grid runs in
   reverse over the new page.
4. **`RevealImage`** — wraps just the hero/product photo (not the whole
   page) so text and layout appear instantly while the actual image
   unfolds — a horizontal scale + blur-to-sharp animation — timed to the
   moment the tile overlay finishes retreating.
The whole thing is intentionally excluded from the homepage — clicking
"Collection" or the logo always navigates instantly, since the tile effect
is reserved for the grid → product moment where it has the most impact.
 
---
 
## Showcase Disclaimer — What's Not Real
 
If you're inspecting this to learn the *techniques*, brilliant — that's the
point. But before you assume anything below is store-ready, know that:
 
- **No backend, no database.** All products, prices, sizes, and colors are
  hardcoded arrays inside `CollectionGrid.jsx` and `product/[id]/page.js`.
  There is no product database, no CMS, no admin panel.
- **No cart or checkout.** "Add to Bag" is a styled button with no click
  handler wired to any state, storage, or payment provider.
- **No real inventory or sizing logic.** Size/color selectors update local
  component state only — nothing is persisted or validated.
- **No image optimization pipeline.** Product photos are static files
  dropped into `/public/images`; there's no upload flow, no CDN, no
  responsive-crop generation.
- **No auth, no accounts, no order history.**
- **Not accessibility-audited.** Custom cursor, scroll-hijacking gallery,
  and motion-heavy transitions all need proper `prefers-reduced-motion`
  handling and keyboard-navigation passes before this could ship.
- **No SEO/metadata work.** Titles and descriptions are placeholders.
In short: this repo demonstrates *how* to build these interactions in
Next.js + Framer Motion + Tailwind. Turning it into an actual store would
mean adding a real product database, a payment provider (Stripe, etc.), auth,
and a proper CMS or admin flow for managing inventory — none of which is
here.
 
---
 
## Credits
 
Design and build: concept/showcase project. Not affiliated with any real
"Maison Vérité." Fonts via Google Fonts. Built with Next.js, Tailwind CSS,
and Framer Motion.



