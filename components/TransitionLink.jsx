'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from '../context/TransitionContext';

export default function TransitionLink({ href, children, className, ...rest }) {
  const router = useRouter();
  const pathname = usePathname();
  const { runTransition } = useTransition();

  useEffect(() => {
    router.prefetch(href);
  }, [href, router]);

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;

    // Always prevent default for left-clicks on internal links — even
    // when href === pathname — so we never fall through to a native
    // full-page navigation if state is momentarily out of sync.
    e.preventDefault();

    if (href === pathname) return;

    runTransition(() => router.push(href), { fromHref: pathname, toHref: href });
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      onMouseEnter={() => router.prefetch(href)}
      onTouchStart={() => router.prefetch(href)}
      {...rest}
    >
      {children}
    </a>
  );
}