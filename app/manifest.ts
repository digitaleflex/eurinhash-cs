import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/metadata';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/Icon_Logo_claire.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
