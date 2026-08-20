'use client';

import './globals.css';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import SmoothScroll from '../components/smooth-scroll';
import TileWipeOverlay from '../components/TileWipeOverlay';
import { TransitionProvider } from '../context/TransitionContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <title>Maison Vérité — Autumn / Winter 2026</title>
        <meta name="description" content="Hand-finished luxury fashion from Milan" />

        {/* Google Fonts loaded via <link> instead of CSS @import.
            This avoids the "@import rules must be at the top of the
            stylesheet" warning that Tailwind v4's own @import expansion
            can trigger, and it's also faster: the browser can start
            fetching the font in parallel with CSS parsing instead of
            waiting for the stylesheet to load first. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TransitionProvider>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <TileWipeOverlay />
            {children}
          </SmoothScroll>
        </TransitionProvider>
      </body>
    </html>
  );
}