'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import TransitionLink from './TransitionLink';
import { motion, useInView } from 'framer-motion';

const products = [
  {
    id: "espresso-knit-polo",
    title: "Espresso Knit Polo",
    price: "$180",
    tag: "New",
    primary: "/images/product-1.png",
    secondary: "/images/product-2.png",
    collection: "COLLECTION / MEN / ESSENTIALS",
    season: "Autumn / Winter 2026 · Look 02",
    description:
      "Crafted from a premium textured cotton knit with a relaxed silhouette for effortless everyday sophistication. Features a soft polo collar, tonal button fastening, ribbed finish, and breathable mid-weight construction.",
  },
  {
    id: "ivory-knit-polo",
    title: "Ivory Knit Polo",
    price: "$180",
    primary: "/images/product-5.png",
    secondary: "/images/product-6.png",
    collection: "COLLECTION / MEN / ESSENTIALS",
    season: "Autumn / Winter 2026 · Look 03",
    description:
      "A refined off-white knit polo designed for modern minimalism. Made from lightweight premium cotton with a clean open collar, relaxed drape, and finely ribbed texture for understated luxury.",
  },
  {
    id: "noir-knit-polo",
    title: "Noir Knit Polo",
    price: "$180",
    tag: "Best Seller",
    primary: "/images/product-7.png",
    secondary: "/images/product-8.png",
    collection: "COLLECTION / MEN / SIGNATURE",
    season: "Autumn / Winter 2026 · Look 05",
    description:
      "An elevated black knit polo with a timeless silhouette. Crafted from breathable textured cotton featuring a soft open collar, oversized fit, and clean finishes for versatile day-to-evening wear.",
  },
  {
    id: "sage-knit-polo",
    title: "Sage Knit Polo",
    price: "$180",
    primary: "/images/product-9.png",
    secondary: "/images/product-10.png",
    collection: "COLLECTION / MEN / ESSENTIALS",
    season: "Autumn / Winter 2026 · Look 06",
    description:
      "Rendered in a muted sage tone, this textured knit polo combines effortless comfort with refined tailoring. Finished with a relaxed fit, open collar, and premium ribbed construction for everyday luxury.",
  },
];
const EASE = [0.16, 1, 0.3, 1];

function useHoverSwap() {
  const [phase, setPhase] = useState('primary');
  const timeoutRef = useRef(null);

  const clearPending = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const onHoverStart = useCallback(() => {
    clearPending();
    setPhase('swapped');
    timeoutRef.current = setTimeout(() => {
      setPhase('primary');
      timeoutRef.current = null;
    }, 1000);
  }, []);

  const onHoverEnd = useCallback(() => {
    clearPending();
    setPhase('primary');
  }, []);

  return { phase, onHoverStart, onHoverEnd };
}

function GridCard({ product, delay }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.1 });
  const { phase, onHoverStart, onHoverEnd } = useHoverSwap();

  const swapped = phase === 'swapped';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: delay / 1000 }}
    >
      <TransitionLink href={`/product/${product.id}`} className="block">
        <motion.div
          className="relative aspect-[4/5] overflow-hidden bg-maison-surface cursor-pointer"
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
          initial="rest"
          whileHover="hover"
        >
          <motion.div
            className="absolute inset-0 z-[1]"
            animate={{ x: swapped ? '-100%' : '0%' }}
            transition={{ duration: 0.8, ease: EASE }}
            variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
            style={{ transformOrigin: 'center' }}
          >
            <Image
              src={product.primary}
              alt={product.title}
              fill
              className="object-cover"
              sizes="25vw"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-[2]"
            animate={{ x: swapped ? '0%' : '100%' }}
            transition={{ duration: 0.8, ease: EASE }}
            variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
            style={{ transformOrigin: 'center' }}
          >
            <Image
              src={product.secondary}
              alt={`${product.title} detail`}
              fill
              className="object-cover"
              sizes="25vw"
            />
          </motion.div>

          {product.tag && (
            <motion.div
              className="absolute top-4 left-4 z-[4] bg-maison-bg text-maison-text px-3 py-1.5 text-[10px] font-semibold tracking-[2px] uppercase"
              variants={{
                rest: { opacity: 0, y: -8 },
                hover: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
              }}
            >
              {product.tag}
            </motion.div>
          )}

          <div className="absolute inset-x-0 bottom-0 z-[3] p-6 pointer-events-none">
            <motion.div
              className="font-display text-xl font-normal mb-1 text-maison-text"
              variants={{
                rest: { opacity: 0, y: 10 },
                hover: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.05 } },
              }}
            >
              {product.title}
            </motion.div>
            <motion.div
              className="text-sm font-medium text-maison-accent tracking-wide"
              variants={{
                rest: { opacity: 0, y: 10 },
                hover: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.1 } },
              }}
            >
              {product.price}
            </motion.div>
          </div>
        </motion.div>
      </TransitionLink>
    </motion.div>
  );
}

export default function CollectionGrid() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });

  return (
    <section className="px-6 md:px-12 border-b pt-3 border-black/20 pb-12 md:pb-20">
      <motion.div
        ref={headerRef}
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <h2 className="font-display text-[clamp(28px,4vw,48px)] font-light mb-3">
          Atelier Selection
        </h2>
        <p className="text-sm text-maison-muted tracking-wide">
          Hand-finished garments from the Milan workshop
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {products.map((product, i) => (
          <GridCard key={product.id} product={product} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}