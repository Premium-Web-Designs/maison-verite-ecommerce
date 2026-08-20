'use client';

import Link from 'next/link';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Footer() {
  const { ref, isVisible } = useScrollReveal(0.05);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[800ms] ease-out-expo ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <footer className="px-6 md:px-12 pt-20 pb-10 border-t border-maison-border grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="font-display text-2xl font-light tracking-[4px] uppercase mb-4">Maison Vérité</div>
          <p className="text-sm leading-relaxed text-maison-muted max-w-xs">
            Founded in 1987, Maison Vérité represents the pinnacle of Italian craftsmanship. Each garment is hand-finished in our Milan atelier.
          </p>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold tracking-[2px] uppercase mb-5 text-maison-text">Explore</h4>
          <div className="space-y-3">
            <Link href="/" className="block text-sm text-maison-muted no-underline transition-colors hover:text-maison-text">Collection</Link>
            <Link href="/product/silk-draped-gown" className="block text-sm text-maison-muted no-underline transition-colors hover:text-maison-text">Atelier</Link>
            <span className="block text-sm text-maison-muted cursor-pointer transition-colors hover:text-maison-text">Journal</span>
            <span className="block text-sm text-maison-muted cursor-pointer transition-colors hover:text-maison-text">Lookbook</span>
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold tracking-[2px] uppercase mb-5 text-maison-text">House</h4>
          <div className="space-y-3">
            <span className="block text-sm text-maison-muted cursor-pointer transition-colors hover:text-maison-text">Heritage</span>
            <span className="block text-sm text-maison-muted cursor-pointer transition-colors hover:text-maison-text">Craftsmanship</span>
            <span className="block text-sm text-maison-muted cursor-pointer transition-colors hover:text-maison-text">Sustainability</span>
            <span className="block text-sm text-maison-muted cursor-pointer transition-colors hover:text-maison-text">Careers</span>
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold tracking-[2px] uppercase mb-5 text-maison-text">Connect</h4>
          <div className="space-y-3">
            <span className="block text-sm text-maison-muted cursor-pointer transition-colors hover:text-maison-text">Instagram</span>
            <span className="block text-sm text-maison-muted cursor-pointer transition-colors hover:text-maison-text">Pinterest</span>
            <span className="block text-sm text-maison-muted cursor-pointer transition-colors hover:text-maison-text">Newsletter</span>
            <span className="block text-sm text-maison-muted cursor-pointer transition-colors hover:text-maison-text">Contact</span>
          </div>
        </div>
        <div className="md:col-span-4 flex flex-col md:flex-row justify-between items-center pt-10 border-t border-maison-border mt-10 text-xs text-maison-dim">
          <span>© 2026 Maison Vérité. All rights reserved.</span>
          <span className="mt-2 md:mt-0">Privacy · Terms · Shipping</span>
        </div>
      </footer>
    </div>
  );
}
