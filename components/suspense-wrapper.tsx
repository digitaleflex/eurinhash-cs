'use client'

import { Suspense, ReactNode } from 'react';
import { LoadingSkeleton } from './loading-skeleton';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export function SuspenseWrapper({ 
  children, 
  fallback,
  className = ""
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

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
}

// Composant pour les images avec lazy loading
export function LazyImage({ 
  src, 
  alt, 
  className = "",
  ...props 
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Suspense fallback={<LoadingSkeleton variant="card" className={className} />}>
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