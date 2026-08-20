'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTransition } from '../context/TransitionContext';

const easeOut = [0.16, 1, 0.3, 1];

export default function RevealImage({ children, className, style }) {
  const { revealKey } = useTransition();
  const mountedRevealKey = useRef(revealKey);
  const [skipAnimation] = useState(() => mountedRevealKey.current === 0);

  return (
    <motion.div
      className={className}
      style={{ transformOrigin: 'center', ...style }}
      initial={skipAnimation ? false : { scaleX: 0.05, filter: 'blur(10px)', opacity: 0.4 }}
      animate={{ scaleX: 1, filter: 'blur(0px)', opacity: 1 }}
      transition={{ duration: 0.42, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}