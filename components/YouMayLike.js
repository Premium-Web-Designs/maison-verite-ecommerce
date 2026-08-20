'use client';

import CollectionGrid from './CollectionGrid';
import EditorialSlider from './EditorialSlider';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function YouMayLike() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div ref={ref} className="pt-20">
      <div
        className={`px-6 md:px-12 mb-12 transition-all duration-[800ms] ease-out-expo ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h3 className="font-display text-[clamp(24px,3vw,40px)] font-light">
          You may like it
        </h3>
      </div>
      <CollectionGrid />
      <div className="mt-10">
        <EditorialSlider />
      </div>
    </div>
  );
}
