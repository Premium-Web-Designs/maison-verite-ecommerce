'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTransition } from '../context/TransitionContext';

const COLS = 8;
const ROWS = 5;
const easeOut = [0.16, 1, 0.3, 1];

function useTileDelays(seed) {
  return useMemo(() => {
    const cx = (COLS - 1) / 2;
    const cy = (ROWS - 1) / 2;
    const maxDist = Math.sqrt(cx * cx + cy * cy);
    return Array.from({ length: COLS * ROWS }, (_, i) => {
      const x = i % COLS;
      const y = Math.floor(i / COLS);
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const norm = dist / maxDist;
      const jitter = ((Math.sin((i + 1) * seed) + 1) / 2) * 0.07;
      return norm * 0.18 + jitter;
    });
  }, [seed]);
}

export default function TileWipeOverlay() {
  const { phase } = useTransition();

  // Both hooks run on every render, regardless of phase — the early return
  // below happens AFTER all hooks are called, never before.
  const closeDelays = useTileDelays(12.9898);
  const openDelays = useTileDelays(78.233);

  if (phase === 'idle') return null;

  const closing = phase === 'closing';
  const delays = closing ? closeDelays : openDelays;

  return (
    <div
      className="tile-wipe-overlay"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
      aria-hidden="true"
    >
      {delays.map((delay, i) => (
        <motion.div
          key={i}
          className="tile-wipe-cell"
          initial={{ scale: 0 }}
          animate={{ scale: closing ? 1 : 0 }}
          transition={{ duration: 0.36, ease: easeOut, delay }}
        />
      ))}
    </div>
  );
}