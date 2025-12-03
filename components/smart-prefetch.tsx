'use client'

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SmartPrefetchProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function SmartPrefetch({ href, children, className }: SmartPrefetchProps) {
  const router = useRouter();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const prefetchedRef = useRef(false);

  useEffect(() => {
    const link = linkRef.current;
    if (!link || prefetchedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !prefetchedRef.current) {
            // Prefetch la page quand elle devient visible
            router.prefetch(href);
            prefetchedRef.current = true;
            observer.unobserve(link);
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(link);

    return () => observer.disconnect();
  }, [href, router]);

  return (
    <a
      ref={linkRef}
      href={href}
      className={className}
      onMouseEnter={() => {
        // Prefetch au survol si pas déjà fait
        if (!prefetchedRef.current) {
          router.prefetch(href);
          prefetchedRef.current = true;
        }
      }}
    >
      {children}
    </a>
  );
}
