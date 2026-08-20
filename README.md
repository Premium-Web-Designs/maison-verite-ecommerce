# Maison Vérité — Next.js + Tailwind CSS

A premium fashion lifestyle website built with Next.js 15, React 19, and Tailwind CSS.

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

### Page Transitions
```jsx
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### Grid Hover Slide-Reveal
```css
.grid-card-secondary { transform: translateX(-101%); }
.grid-card:hover .grid-card-secondary { transform: translateX(0); }
.grid-card:hover .grid-card-primary   { transform: translateX(101%); }
```
