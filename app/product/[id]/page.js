'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductScrollGallery from '../../../components/ProductScrollGallery';
import YouMayLike from '../../../components/YouMayLike';
import Footer from '../../../components/Footer';

const sizes = [
  { label: 'XS', disabled: false },
  { label: 'S', disabled: false },
  { label: 'M', disabled: false },
  { label: 'L', disabled: false },
  { label: 'XL', disabled: true },
];

const details = [
 
];

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [liked, setLiked] = useState(false);

  return (
    <main className="min-h-screen pt-20 md:pt-24">
      {/* ===== PRODUCT DETAIL — 3 COLUMN STICKY SCROLL ===== */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-0 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">

          {/* LEFT — Description (sticky) */}
          <div className="md:col-span-3 md:sticky md:top-[100px] md:self-start order-2 md:order-1">
            {/* Breadcrumb */}
            <div className="text-[11px] font-medium tracking-[2px] uppercase text-maison-dim mb-6">
              <Link href="/" className="text-maison-muted hover:text-maison-text transition-colors">
                COLLECTION
              </Link>
              {' / '}
              <span className="text-maison-muted">MEN</span>
              {' / '}
              <span>ESSENTIALS</span>
            </div>

            <h1 className="font-display text-[clamp(28px,3.5vw,44px)] font-light leading-[1.1] mb-4">
              Textured Knit Polo
            </h1>

            <p className="text-sm text-maison-muted tracking-wide mb-8">
              Autumn / Winter 2026 · Look 02
            </p>

            <div className="space-y-4 mb-10">
              <p className="text-[15px] leading-[1.7] text-maison-muted">
                Crafted from a premium cotton knit with a refined ribbed texture, delivering everyday comfort. Designed with a relaxed silhouette for understated elegance and versatile wear.
              </p>
              <p className="text-[15px] leading-[1.7] text-maison-muted">
                Features a soft open collar with tonal button fastening, dropped shoulders, finely finished ribbed hems.
              </p>
            </div>

            {/* <div className="border-t border-maison-border pt-6">
              {details.slice(0, 4).map((detail) => (
                <div key={detail.label} className="flex justify-between py-3 border-b border-maison-border text-sm">
                  <span className="text-maison-muted">{detail.label}</span>
                  <span className="font-medium">{detail.value}</span>
                </div>
              ))}
            </div> */}
          </div>

          {/* CENTER — Scroll Images */}
          <div className="md:col-span-5 order-1 md:order-2">
            <ProductScrollGallery />
          </div>

          {/* RIGHT — Actions (sticky) */}
          <div className="md:col-span-4 md:sticky md:top-[100px] md:self-start order-3">
            <div className="font-display text-[clamp(24px,3vw,36px)] font-light mb-2">
              $19.9 USD
            </div>
            <p className="text-xs text-maison-muted tracking-wide mb-8">
              Tax included. Shipping calculated at checkout.
            </p>

            {/* Color */}
            <div className="mb-6">
              <div className="text-[11px] font-semibold tracking-[2px] uppercase text-maison-text mb-3">
                Color
              </div>
              <div className="flex gap-3">
                <button className="w-8 h-8 rounded-full bg-[#4D3F33] border-2 border-maison-text ring-2 ring-maison-text ring-offset-2 ring-offset-maison-bg" />
                <button className="w-8 h-8 rounded-full bg-[#c9a96e] border border-maison-border hover:border-maison-muted transition-colors" />
                <button className="w-8 h-8 rounded-full bg-[#f5f0e8] border border-maison-border hover:border-maison-muted transition-colors" />
              </div>
            </div>

            {/* Size */}
            <div className="mb-8">
              <div className="text-[11px] font-semibold tracking-[2px] uppercase text-maison-text mb-3">
                Select Size
              </div>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => !size.disabled && setSelectedSize(size.label)}
                    className={`size-btn w-12 h-12 flex items-center justify-center border text-[13px] font-medium ${
                      size.disabled
                        ? 'border-maison-border text-maison-dim disabled'
                        : selectedSize === size.label
                        ? 'active'
                        : 'border-maison-border text-maison-muted bg-transparent'
                    }`}
                    disabled={size.disabled}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button className="flex-1 py-4 px-6 bg-maison-text text-maison-bg border-none font-body text-xs font-semibold tracking-[2px] uppercase cursor-pointer transition-all duration-[400ms] ease-out-quart hover:bg-maison-accent hover:text-maison-bg">
                Add to Bag
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`w-14 h-14  flex items-center justify-center transition-all duration-[400ms] ease-out-quart hover:border-maison-text ${
                  liked ? 'border-maison-text' : 'border-maison-border'
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className="text-maison-text">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Extra details */}
            
          </div>
        </div>
      </section>

      {/* ===== YOU MAY LIKE IT ===== */}
      <section className="border-t border-black/20 mt-12">
        <YouMayLike />
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </main>
  );
}
