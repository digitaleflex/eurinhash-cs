/**
 * Performance monitoring utilities
 */

export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

/**
 * Measure and report Core Web Vitals
 */
export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observer: PerformanceObserver | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObserver();
      this.measureTTFB();
    }
  }

  private initializeObserver(): void {
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.handlePerformanceEntry(entry);
        }
      });

      // Observe different types of performance entries
      try {
        this.observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (e) {
        // Fallback for browsers that don't support all entry types
        console.warn('Some performance metrics may not be available:', e);
      }
    }
  }

  private handlePerformanceEntry(entry: PerformanceEntry): void {
    switch (entry.entryType) {
      case 'paint':
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
        }
        break;
      
      case 'largest-contentful-paint':
        this.metrics.lcp = entry.startTime;
        break;
      
      case 'first-input':
        this.metrics.fid = (entry as any).processingStart - entry.startTime;
        break;
      
      case 'layout-shift':
        if (!(entry as any).hadRecentInput) {
          this.metrics.cls = (this.metrics.cls || 0) + (entry as any).value;
        }
        break;
    }
  }

  private measureTTFB(): void {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const entry = navigationEntries[0];
        this.metrics.ttfb = entry.responseStart - entry.requestStart;
      }
    }
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Report metrics to analytics service
   */
  reportMetrics(endpoint?: string): void {
    const metrics = this.getMetrics();
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.table(metrics);
    }

    // Send to analytics endpoint if provided
    if (endpoint && Object.keys(metrics).length > 0) {
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
          metrics
        })
      }).catch(error => {
        console.warn('Failed to report performance metrics:', error);
      });
    }
  }

  /**
   * Cleanup observer
   */
  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

/**
 * Measure component render time
 */
export const measureRenderTime = (componentName: string) => {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
    }
    
    return renderTime;
  };
};

/**
 * Measure bundle size impact
 */
export const measureBundleSize = async (moduleName: string, importFn: () => Promise<any>) => {
  const startTime = performance.now();
  
  try {
    const module = await importFn();
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${moduleName} load time: ${loadTime.toFixed(2)}ms`);
    }
    
    return { module, loadTime };
  } catch (error) {
    console.error(`Failed to load ${moduleName}:`, error);
    throw error;
  }
};

/**
 * Performance budget checker
 */
export const checkPerformanceBudget = (metrics: PerformanceMetrics) => {
  const budgets = {
    fcp: 1800, // 1.8s
    lcp: 2500, // 2.5s
    fid: 100,  // 100ms
    cls: 0.1,  // 0.1
    ttfb: 600  // 600ms
  };

  const violations: string[] = [];

  Object.entries(budgets).forEach(([metric, budget]) => {
    const value = metrics[metric as keyof PerformanceMetrics];
    if (value !== undefined && value > budget) {
      violations.push(`${metric.toUpperCase()}: ${value} > ${budget}`);
    }
  });

  if (violations.length > 0 && process.env.NODE_ENV === 'development') {
    console.warn('Performance budget violations:', violations);
  }

  return violations;
};

/**
 * Resource loading performance
 */
export const measureResourceLoading = () => {
  if (typeof window === 'undefined') return;

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  const resourceMetrics = resources.map(resource => ({
    name: resource.name,
    type: resource.initiatorType,
    size: resource.transferSize,
    duration: resource.duration,
    startTime: resource.startTime
  }));

  // Group by type
  const byType = resourceMetrics.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {} as Record<string, typeof resourceMetrics>);

  if (process.env.NODE_ENV === 'development') {
    console.log('Resource loading metrics:', byType);
  }

  return byType;
};

/**
 * Memory usage monitoring
 */
export const getMemoryUsage = () => {
  if (typeof window === 'undefined' || !('memory' in performance)) {
    return null;
  }

  const memory = (performance as any).memory;
  return {
    used: Math.round(memory.usedJSHeapSize / 1048576), // MB
    total: Math.round(memory.totalJSHeapSize / 1048576), // MB
    limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
  };
};

// Global performance monitor instance
export const performanceMonitor = typeof window !== 'undefined' ? new PerformanceMonitor() : null;