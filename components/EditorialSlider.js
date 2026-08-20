'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const slides = [
  {
    src: "/images/collection-1.png",
    tag: "Polo Collection",
    title: "Textured Knit Polos",
    desc: "Relaxed silhouettes crafted from premium cotton knit."
  },
  {
    src: "/images/collection-2.png",
    tag: "Shirt Collection",
    title: "Modern Essential Shirts",
    desc: "Tailored everyday shirts with refined fabrics and clean lines."
  },
  {
    src: "/images/collection-3.png",
    tag: "Sweater Collection",
    title: "Luxury Knitwear",
    desc: "Soft merino and cotton sweaters for effortless sophistication."
  },
  {
    src: "/images/collection-4.png",
    tag: "Sweatshirt Collection",
    title: "Elevated Sweatshirts",
    desc: "Minimal premium sweatshirts designed for everyday comfort."
  },
  {
    src: "/images/collection-5.png",
    tag: "Outerwear",
    title: "Contemporary Jackets",
    desc: "Refined outerwear balancing structure, warmth, and versatility."
  },
  {
    src: "/images/collection-6.png",
    tag: "Formal Knitwear",
    title: "Fine Gauge Sweaters",
    desc: "Elegant lightweight sweaters tailored for smart occasions."
  },
];

const EASE = [0.16, 1, 0.3, 1];

// One duplicated pass, rendered immediately after the original set.
// The track animates x from 0 to -50% (the width of exactly one set),
// then snaps back to 0 with wrap: true — at that instant the duplicate
// set is pixel-identical to the original's starting position, so the
// snap is visually undetectable. This is what makes the loop "infinite"
// with no jump, unlike scrollBy on a finite scroll container.
const loopSlides = [...slides, ...slides];

// Full pass duration. Tuned so each card is on screen for a comfortable
// read — slower than the old 336px-nudge scroll, since this is now a
// continuous ambient motion rather than a discrete swipe.
const LOOP_DURATION = 40;

function Slide({ slide }) {
  return (
    <motion.div
      className="flex-none w-[280px] md:w-[320px] aspect-[4/5] relative overflow-hidden cursor-pointer"
      initial="rest"
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <Image
          src={slide.src}
          alt={slide.title}
          fill
          className="object-cover"
          sizes="320px"
        />
      </motion.div>

      <div className="absolute top-4 left-4 bg-maison-bg/70 backdrop-blur-sm px-3.5 py-1.5 text-[10px] font-semibold tracking-[2px] uppercase">
        {slide.tag}
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
        variants={{
          rest: { opacity: 0, y: 16 },
          hover: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
        }}
      >
        <h4 className="font-display text-xl font-normal mb-1 text-white/70">{slide.title}</h4>
        <p className="text-xs text-maison-muted tracking-wide text-white/70">{slide.desc}</p>
      </motion.div>
    </motion.div>
  );
}

export default function EditorialSlider() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.1 });

  return (
    <section className="py-10 md:py-8 ">
      <div className="flex-1 h-px bg-maison-border " />
        <span className="px-6 md:px-13 py-6 text-[11px] font-medium tracking-[4px] uppercase text-maison-dim">
          Editorial
        </span>
        <div className="flex-1 h-px bg-maison-border" />
      <motion.div
        ref={headerRef}
        className="px-6 md:px-12 mb-8 pt-3"
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <h3 className="font-display text-[32px] font-light">Behind the Collection</h3>
      </motion.div>

      {/* Masked viewport — overflow hidden, no scrollbar, no manual scroll.
          The inner track is what moves; this div just clips it. */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4 px-6 md:px-12 w-max "
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: LOOP_DURATION,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          {loopSlides.map((slide, i) => (
            // Index-based key is correct and necessary here: the array is
            // intentionally duplicated with repeated content, so slide.src
            // is not unique across the full list.
            <Slide key={i} slide={slide} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}