"use client";
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface IntelligentPrefetchProps {
  routes: string[];
  threshold?: number;
  delay?: number;
  onHover?: boolean;
  onVisible?: boolean;
}

/**
 * Intelligent prefetching component that prefetches routes based on user behavior
 */
export default function IntelligentPrefetch({
  routes,
  threshold = 0.1,
  delay = 2000,
  onHover = true,
  onVisible = true
}: IntelligentPrefetchProps) {
  const router = useRouter();
  const prefetchedRoutes = useRef(new Set<string>());
  const hoverTimeouts = useRef(new Map<string, NodeJS.Timeout>());

  useEffect(() => {
    if (!onVisible) return;

    // Prefetch routes after initial page load
    const prefetchTimer = setTimeout(() => {
      routes.forEach(route => {
        if (!prefetchedRoutes.current.has(route)) {
          router.prefetch(route);
          prefetchedRoutes.current.add(route);
        }
      });
    }, delay);

    return () => clearTimeout(prefetchTimer);
  }, [routes, delay, onVisible, router]);

  useEffect(() => {
    if (!onHover) return;

    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || !routes.includes(href)) return;

      // Delay prefetch to avoid prefetching on quick mouse movements
      const timeout = setTimeout(() => {
        if (!prefetchedRoutes.current.has(href)) {
          router.prefetch(href);
          prefetchedRoutes.current.add(href);
        }
      }, 100);

      hoverTimeouts.current.set(href, timeout);
    };

    const handleMouseLeave = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      const timeout = hoverTimeouts.current.get(href);
      if (timeout) {
        clearTimeout(timeout);
        hoverTimeouts.current.delete(href);
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      
      // Clear all timeouts
      hoverTimeouts.current.forEach(timeout => clearTimeout(timeout));
      hoverTimeouts.current.clear();
    };
  }, [routes, onHover, router]);

  // Intersection Observer for visible links
  useEffect(() => {
    if (!onVisible || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.getAttribute('href');
            
            if (href && routes.includes(href) && !prefetchedRoutes.current.has(href)) {
              // Delay prefetch slightly to ensure the link is actually visible
              setTimeout(() => {
                router.prefetch(href);
                prefetchedRoutes.current.add(href);
              }, 100);
            }
          }
        });
      },
      { threshold, rootMargin: '100px' }
    );

    // Observe all links that match our routes
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && routes.includes(href)) {
        observer.observe(link);
      }
    });

    return () => observer.disconnect();
  }, [routes, threshold, onVisible, router]);

  return null; // This component doesn't render anything
}

/**
 * Hook for intelligent prefetching
 */
export function useIntelligentPrefetch(routes: string[], options?: Partial<IntelligentPrefetchProps>) {
  const router = useRouter();
  const prefetchedRoutes = useRef(new Set<string>());

  const prefetchRoute = (route: string) => {
    if (!prefetchedRoutes.current.has(route)) {
      router.prefetch(route);
      prefetchedRoutes.current.add(route);
    }
  };

  const prefetchOnHover = (route: string) => {
    return {
      onMouseEnter: () => {
        setTimeout(() => prefetchRoute(route), 100);
      }
    };
  };

  const prefetchOnFocus = (route: string) => {
    return {
      onFocus: () => prefetchRoute(route)
    };
  };

  return {
    prefetchRoute,
    prefetchOnHover,
    prefetchOnFocus,
    prefetchedRoutes: prefetchedRoutes.current
  };
}