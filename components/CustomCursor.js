'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Skip entirely on touch/no-hover devices. Previously this component
    // still mounted its rAF loop, mousemove listener, and a setInterval
    // that re-queried the DOM every 2s on mobile — wasted work that could
    // contend with the transition/scroll logic during a fresh mobile load.
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!supportsHover) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX - 4 + 'px';
      cursor.style.top = cursorY - 4 + 'px';
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    const raf = requestAnimationFrame(animate);

    const addHoverListeners = () => {
      const hoverElements = document.querySelectorAll(
        'a, button, .grid-card, .hero-item, .slide, .product-thumb, .size-btn, .nav-link, .scroll-image-wrap'
      );
      hoverElements.forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
      });
    };

    setTimeout(addHoverListeners, 500);
    const interval = setInterval(addHoverListeners, 2000);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, []);

  return <div ref={cursorRef} className="cursor-dot hidden md:block" />;
}