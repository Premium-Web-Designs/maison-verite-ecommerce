'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import RevealImage from './RevealImage';

const productImages = [
  '/images/product-1.png',
  '/images/product-2.png',
  '/images/product-3.png',
];

const NAVBAR_HEIGHT = 88;
const TRANSITION_MS = 700;
const STEP_COOLDOWN_MS = TRANSITION_MS + 100;
const WHEEL_DELTA_THRESHOLD = 4;
const SWIPE_THRESHOLD = 45;

export default function ProductScrollGallery() {
  const total = productImages.length;

  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const isSteppingRef = useRef(false);
  const lastStepAtRef = useRef(0);

  const touchStartYRef = useRef(0);
  const touchDeltaYRef = useRef(0);
  const isTouchingRef = useRef(false);

  // Use dvh (dynamic viewport height) instead of vh. On mobile browsers,
  // 100vh is measured against the "largest possible" viewport (address
  // bar collapsed), which is taller than what's actually visible on
  // first paint — especially on a fresh reload before the browser chrome
  // settles. This causes the sticky stage / absolute image containers to
  // measure incorrectly on mount, which can make next/image skip loading
  // a source until a resize event forces a relayout. dvh tracks the real
  // visible viewport continuously and avoids that whole class of bug.
  const stageHeight = `calc(100dvh - ${NAVBAR_HEIGHT}px)`;

  const step = useCallback(
    (dir) => {
      const now = Date.now();
      if (isSteppingRef.current) return false;
      if (now - lastStepAtRef.current < STEP_COOLDOWN_MS) return false;

      const next = activeIndexRef.current + dir;
      if (next < 0 || next > total - 1) return false;

      isSteppingRef.current = true;
      lastStepAtRef.current = now;
      activeIndexRef.current = next;
      setActiveIndex(next);

      window.setTimeout(() => {
        isSteppingRef.current = false;
      }, TRANSITION_MS);

      return true;
    },
    [total]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isEngaged = () => {
      const rect = section.getBoundingClientRect();
      return rect.top <= NAVBAR_HEIGHT + 1 && rect.bottom > NAVBAR_HEIGHT + window.innerHeight * 0.01;
    };

    const handleWheel = (e) => {
      if (!isEngaged()) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const atLast = activeIndexRef.current === total - 1;
      const atFirst = activeIndexRef.current === 0;

      if (dir > 0 && atLast) return;
      if (dir < 0 && atFirst) return;

      e.preventDefault();

      if (Math.abs(e.deltaY) < WHEEL_DELTA_THRESHOLD) return;

      step(dir);
    };

    const handleTouchStart = (e) => {
      if (!isEngaged()) {
        isTouchingRef.current = false;
        return;
      }
      isTouchingRef.current = true;
      touchStartYRef.current = e.touches[0].clientY;
      touchDeltaYRef.current = 0;
    };

    const handleTouchMove = (e) => {
      if (!isTouchingRef.current) return;

      const currentY = e.touches[0].clientY;
      touchDeltaYRef.current = touchStartYRef.current - currentY;

      const dir = touchDeltaYRef.current > 0 ? 1 : -1;
      const atLast = activeIndexRef.current === total - 1;
      const atFirst = activeIndexRef.current === 0;

      if ((dir > 0 && atLast) || (dir < 0 && atFirst)) return;

      e.preventDefault();
    };

    const handleTouchEnd = () => {
      if (!isTouchingRef.current) return;
      isTouchingRef.current = false;

      if (!isEngaged()) return;

      const delta = touchDeltaYRef.current;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;

      const dir = delta > 0 ? 1 : -1;
      step(dir);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [step, total]);

  // Force a reflow on resize/orientation change. This is what makes
  // "drag the DevTools panel" or "rotate the phone" fix the layout —
  // we replicate that trigger proactively so a fresh mobile reload
  // doesn't need a manual nudge to get next/image to paint correctly.
  useEffect(() => {
    const forceReflow = () => {
      if (stageRef.current) {
        // Reading offsetHeight forces the browser to recompute layout
        void stageRef.current.offsetHeight;
      }
    };

    // Run once shortly after mount to catch the "mobile chrome not yet
    // collapsed" timing window on first load.
    const initialTimer = window.setTimeout(forceReflow, 150);

    window.addEventListener('resize', forceReflow);
    window.addEventListener('orientationchange', forceReflow);

    return () => {
      window.clearTimeout(initialTimer);
      window.removeEventListener('resize', forceReflow);
      window.removeEventListener('orientationchange', forceReflow);
    };
  }, []);

  return (
    <RevealImage>
      <div
        ref={sectionRef}
        className="relative w-full delay-1000"
        style={{ height: `calc(${stageHeight} * ${total})` }}
      >
        <div
          ref={stageRef}
          className="sticky w-full overflow-hidden"
          style={{ top: NAVBAR_HEIGHT, height: stageHeight }}
        >
          {productImages.map((src, i) => {
            const isActive = i === activeIndex;
            const isPrev = i < activeIndex;
            const isNext = i > activeIndex;

            let translateY = '0%';
            if (isPrev) translateY = '-100%';
            if (isNext) translateY = '100%';

            return (
              <div
                key={src}
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateY(${translateY})`,
                  transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  zIndex: isActive ? 2 : 1,
                }}
              >
                <Image
                  src={src}
                  alt={`Product view ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority={i === 0}
                />
              </div>
            );
          })}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {productImages.map((_, i) => (
              <div
                key={i}
                className={`h-[2px] rounded-full transition-all duration-500 ${
                  i === activeIndex ? 'w-8 bg-white' : 'w-4 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </RevealImage>
  );
}