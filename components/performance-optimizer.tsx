'use client';

import { useEffect } from 'react';

export function PerformanceOptimizer() {
  useEffect(() => {
    // Optimisations de performance côté client

    // 1. Preload des pages importantes
    const importantPages = ['/about', '/projects', '/skills', '/contact'];

    const preloadPage = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    };

    // Preload après un délai pour ne pas bloquer le rendu initial
    const timer = setTimeout(() => {
      importantPages.forEach(preloadPage);
    }, 2000);

    // 2. Optimisation des images lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        },
        { rootMargin: '50px' }
      );

      // Observer toutes les images avec data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // 3. Preload des composants critiques au hover
    const criticalLinks = document.querySelectorAll('a[href^="/"]');
    criticalLinks.forEach(link => {
      link.addEventListener(
        'mouseenter',
        () => {
          const href = link.getAttribute('href');
          if (href && !document.querySelector(`link[href="${href}"]`)) {
            preloadPage(href);
          }
        },
        { once: true }
      );
    });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null;
}
