'use client';

import { Suspense, lazy, ComponentType } from 'react';
import { LoadingSkeleton } from './loading-skeleton';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function LazySection({
  children,
  fallback = <LoadingSkeleton variant="card" />,
  className = '',
}: LazySectionProps) {
  return (
    <Suspense fallback={fallback}>
      <div className={className}>{children}</div>
    </Suspense>
  );
}

// HOC pour lazy loading de composants
export function withLazyLoading<T extends object>(
  Component: ComponentType<T>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(() => Promise.resolve({ default: Component }));

  return function LazyWrapper(props: T) {
    return (
      <Suspense fallback={fallback || <LoadingSkeleton variant="card" />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
