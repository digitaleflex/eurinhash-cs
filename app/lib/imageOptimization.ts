/**
 * Image optimization utilities for performance
 */

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
}

/**
 * Generate responsive image sizes for different breakpoints
 */
export const generateImageSizes = (
  baseWidth: number,
  breakpoints: { [key: string]: number } = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  }
): string => {
  const sizes = Object.entries(breakpoints)
    .map(([breakpoint, width]) => {
      const imageWidth = Math.min(baseWidth, width);
      return `(max-width: ${width}px) ${imageWidth}px`;
    })
    .join(', ');
  
  return `${sizes}, ${baseWidth}px`;
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string, as: 'image' = 'image'): void => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = src;
    document.head.appendChild(link);
  }
};

/**
 * Lazy load images with intersection observer
 */
export const createImageObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.01
  }
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, options);
};

/**
 * Convert image to WebP format if supported
 */
export const getOptimizedImageUrl = (
  src: string,
  width?: number,
  quality: number = 75
): string => {
  // For Next.js Image optimization
  if (src.startsWith('/')) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    params.set('q', quality.toString());
    return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`;
  }
  
  return src;
};

/**
 * Check if WebP is supported
 */
export const isWebPSupported = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Placeholder for loading states
 */
export const generatePlaceholder = (width: number, height: number): string => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1A1F3C"/>
      <rect width="100%" height="100%" fill="url(#gradient)" opacity="0.3"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#007CF0;stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:#00C48C;stop-opacity:0.1" />
        </linearGradient>
      </defs>
    </svg>
  `)}`;
};

/**
 * Image loading priorities based on viewport position
 */
export const getImagePriority = (position: 'above-fold' | 'below-fold' | 'lazy'): boolean => {
  return position === 'above-fold';
};

/**
 * Responsive image breakpoints for the application
 */
export const IMAGE_BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

/**
 * Default image quality settings
 */
export const IMAGE_QUALITY = {
  low: 50,
  medium: 75,
  high: 90,
  lossless: 100
} as const;