'use client';

import { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const TransitionContext = createContext(null);
const CLOSE_MS = 620;      // must cover: tile duration (0.36s) + max stagger delay (~0.25s)
const MAX_WAIT_MS = 1400;  // safety fallback if route never resolves
const HOME = '/';

export function TransitionProvider({ children }) {
  const [phase, setPhase] = useState('idle'); // idle | closing | open
  const [revealKey, setRevealKey] = useState(0);
  const navigatingRef = useRef(false);
  const targetPathRef = useRef(null);
  const fallbackTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const pathname = usePathname();

  const openNow = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    setPhase('open');
    setRevealKey((k) => k + 1);
    navigatingRef.current = false;
    targetPathRef.current = null;
  }, []);

  // If the route already matches the target (navigation resolved), open.
  useEffect(() => {
    if (targetPathRef.current && pathname === targetPathRef.current) {
      requestAnimationFrame(() => requestAnimationFrame(openNow));
    }
  }, [pathname, openNow]);

  // Safety net: if a transition never resolves (stuck ref from a race,
  // slow hydration, interrupted navigation on mobile reload, etc.),
  // force-reset everything after a hard ceiling so clicks never get
  // permanently swallowed.
  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const runTransition = useCallback(
    (navigate, { toHref }) => {
      if (toHref === HOME) {
        navigate();
        return;
      }

      // If a transition is already in flight, don't stack another one —
      // but don't silently drop the click either. Just navigate directly
      // without the animated wipe, and reset state so future clicks work.
      if (navigatingRef.current) {
        navigatingRef.current = false;
        targetPathRef.current = null;
        setPhase('idle');
        navigate();
        return;
      }

      navigatingRef.current = true;
      targetPathRef.current = toHref;
      setPhase('closing');

      closeTimerRef.current = setTimeout(() => {
        navigate();
        fallbackTimerRef.current = setTimeout(() => {
          // Route never matched targetPathRef in time — force open so
          // the UI never stays stuck mid-transition and the ref clears.
          openNow();
        }, MAX_WAIT_MS);
      }, CLOSE_MS);
    },
    [openNow]
  );

  return (
    <TransitionContext.Provider value={{ phase, revealKey, runTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransition must be used inside TransitionProvider');
  return ctx;
}