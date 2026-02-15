'use client';

import { useEffect } from 'react';

const CRITICAL_RESOURCES = [
  '/eurin-photo.webp',
  '/favicon.ico',
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/manifest.webmanifest',
];

export function ResourcePreloader() {
  useEffect(() => {
    // Vérifier que nous sommes côté client et que le DOM est prêt
    if (typeof window === 'undefined' || !document.head) {
      return;
    }

    try {
      // Précharger les ressources critiques
      CRITICAL_RESOURCES.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.endsWith('.webp') ? 'image' : 'fetch';
        link.href = resource;
        document.head.appendChild(link);
      });

      // Précharger les polices
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.as = 'font';
      fontLink.type = 'font/woff2';
      fontLink.crossOrigin = 'anonymous';
      fontLink.href =
        'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2';
      document.head.appendChild(fontLink);

      // DNS prefetch pour les domaines externes
      const dnsPrefetchDomains = ['fonts.googleapis.com', 'fonts.gstatic.com'];

      dnsPrefetchDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = `//${domain}`;
        document.head.appendChild(link);
      });
    } catch (error) {
      console.warn('Erreur lors du préchargement des ressources:', error);
    }
  }, []);

  return null;
}
