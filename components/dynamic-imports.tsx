'use client'

import dynamic from 'next/dynamic';
import { LoadingSkeleton } from './loading-skeleton';

// Import dynamique pour les composants lourds
export const DynamicVisionPage = dynamic(() => import('../app/vision/page'), {
  loading: () => <LoadingSkeleton variant="page" />,
  ssr: false
});

export const DynamicStartProjectPage = dynamic(() => import('../app/start-project/page'), {
  loading: () => <LoadingSkeleton variant="form" />,
  ssr: false
});

// Import dynamique pour les composants avec animations
export const DynamicCommunityProjects = dynamic(() => import('./community-projects'), {
  loading: () => <LoadingSkeleton variant="card" />,
  ssr: false
});

// Import dynamique pour les composants de formulaire
export const DynamicContactForm = dynamic(() => import('./contact-form'), {
  loading: () => <LoadingSkeleton variant="form" />,
  ssr: false
});

// Import dynamique pour les composants de navigation mobile
export const DynamicMobileMenu = dynamic(() => import('./mobile-menu'), {
  loading: () => <LoadingSkeleton variant="button" />,
  ssr: false
});
