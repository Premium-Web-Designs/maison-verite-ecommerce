'use client';

import Image from 'next/image';
import "../app/globals.css";
import { motion } from 'framer-motion';

const heroImages = [
  { src: "/images/hero-4.png", label: 'Signature Look' },
  { src: "/images/hero-2.png", label: 'Front Profile' },
  { src: "/images/hero-1.png", label: 'Editorial Pose' },
  { src: "/images/hero-3.png", label: 'Final Look' },
];

const headingVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HeroGrid() {
  return (
    <section className="px-6 md:px-12 pt-2 pb-12 b-bottom border-b border-black/20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2 mb-4">
        {heroImages.map((item, i) => (
          <div key={i} className="relative aspect-[4/5] overflow-hidden cursor-pointer group">
            <Image
              src={item.src}
              alt={item.label}
              fill
              className="object-cover opacity-0.9 animate-hero-zoom"
              style={{ animationDelay: `${0.2 + i * 0.2}s` }}
              sizes="(max-width: 768px) 50vw, 25vw"
              priority={i < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-out-quart" />
            <div className="absolute bottom-6 left-6 z-10 font-display text-xl font-light italic text-maison-text opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out-expo text-white/60">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <motion.div
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={headingVariants}
      >
        <h1 className="font-display text-[22px] md:text-[42px] font-normal tracking-[6px] uppercase text-maison-text no-underline mb-4">
          Autumn / Winter 2026
        </h1>
        <p className="text-xs font-medium tracking-[4px] uppercase text-maison-muted">
          The Collection
        </p>
      </motion.div>

    </section>
  );
}
