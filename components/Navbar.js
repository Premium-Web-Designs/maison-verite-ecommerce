'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isProduct = pathname.startsWith('/product');

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-6 md:px-12 transition-all duration-[600ms] ease-out-expo ${
        scrolled
          ? 'bg-white/40 backdrop-blur-xl py-4'
          : 'py-6'
      }`}
    >
      

      <ul className="hidden md:flex gap-10 list-none">
        <li>
          <Link
            href="/"
            className={`nav-link text-xs font-medium tracking-[2px] uppercase text-maison-muted no-underline py-1 transition-colors duration-[400ms] hover:text-maison-text ${
              pathname === '/' ? 'active text-maison-text' : ''
            }`}
          >
            Collection
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className={`nav-link text-xs font-medium tracking-[2px] uppercase text-maison-muted no-underline py-1 transition-colors duration-[400ms] hover:text-maison-text ${
              isProduct ? 'active text-maison-text' : ''
            }`}
          >
            Atelier
          </Link>
        </li>
        <li>
          <span className="nav-link text-xs font-medium tracking-[2px] uppercase text-maison-muted no-underline py-1 transition-colors duration-[400ms] hover:text-maison-text cursor-pointer">
            Journal
          </span>
        </li>
      </ul>


      <Link
        href="/"
        className="absolute top-1/2 right-4 -translate-y-1/2 font-display text-[16px] font-normal tracking-[6px] uppercase text-maison-text no-underline md:left-1/2 md:right-auto md:-translate-x-1/2 md:text-[22px]"

      >
        Maison Vérité
      </Link>




      <div className="text-xs font-medium tracking-[2px] uppercase text-maison-muted cursor-pointer transition-colors duration-[400ms] hover:text-maison-text">
        Cart (0)
      </div>
    </nav>
  );
}
