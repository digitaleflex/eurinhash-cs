'use client';

import { Suspense, ReactNode } from 'react';
import Image from 'next/image';
import { LoadingSkeleton } from './loading-skeleton';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export function SuspenseWrapper({
  children,
  fallback,
  className = '',
}: SuspenseWrapperProps) {
  const defaultFallback = (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-4">
        <LoadingSkeleton variant="text" className="h-8 w-3/4" />
        <LoadingSkeleton variant="text" className="h-4 w-full" />
        <LoadingSkeleton variant="text" className="h-4 w-2/3" />
      </div>
    </div>
  );

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>;
}

// Composant pour les images avec lazy loading
export function LazyImage({
  src,
  alt,
  className = '',
  width,
  height,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  width?: number;
  height?: number;
}) {
  // Utiliser le composant Image de Next.js pour optimiser les images
  if (width && height && src && typeof src === 'string') {
    return (
      <Suspense
        fallback={<LoadingSkeleton variant="card" className={className} />}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src={src}
          alt={alt || ''}
          className={className}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          {...props}
        />
      </Suspense>
    );
  }

  // Sinon, utiliser une image standard
  return (
    <Suspense
      fallback={<LoadingSkeleton variant="card" className={className} />}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </Suspense>
  );
}