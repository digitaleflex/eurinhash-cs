'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';

/**
 * Hook for intelligent prefetching based on user interaction (hover).
 * Optimized for Next.js App Router to reduce initial load while keeping 
 * navigation snappy.
 */
export function useHoverPrefetch(href: string) {
    const router = useRouter();
    const prefetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isPrefetchedRef = useRef(false);

    const onMouseEnter = useCallback(() => {
        // Only prefetch if it's an internal link and not already prefetched
        if (!href.startsWith('/') || isPrefetchedRef.current) return;

        // Small delay to avoid prefetching on accidental hovers
        prefetchTimeoutRef.current = setTimeout(() => {
            router.prefetch(href);
            isPrefetchedRef.current = true;
        }, 50);
    }, [href, router]);

    const onMouseLeave = useCallback(() => {
        if (prefetchTimeoutRef.current) {
            clearTimeout(prefetchTimeoutRef.current);
        }
    }, []);

    return {
        onMouseEnter,
        onMouseLeave,
    };
}
