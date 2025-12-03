'use client'

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function useSmartPrefetch(href: string, options?: {
  threshold?: number;
  delay?: number;
}) {
  const router = useRouter();
  const elementRef = useRef<HTMLElement>(null);
  const prefetchedRef = useRef(false);
  const { threshold = 0.1, delay = 100 } = options || {};

  useEffect(() => {
    const element = elementRef.current;
    if (!element || prefetchedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !prefetchedRef.current) {
            setTimeout(() => {
              router.prefetch(href);
              prefetchedRef.current = true;
            }, delay);
          }
        });
      },
      { threshold, rootMargin: '100px' }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [href, router, threshold, delay]);

  return elementRef;
}

// Hook pour prefetch au hover
export function useHoverPrefetch(href: string) {
  const router = useRouter();
  const prefetchedRef = useRef(false);

  const handleMouseEnter = () => {
    if (!prefetchedRef.current) {
      router.prefetch(href);
      prefetchedRef.current = true;
    }
  };

  return { onMouseEnter: handleMouseEnter };
}