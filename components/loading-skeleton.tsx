interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'avatar' | 'button' | 'form';
}

export function LoadingSkeleton({
  className = '',
  variant = 'text',
}: LoadingSkeletonProps) {
  const baseClasses = 'animate-pulse bg-muted rounded';

  const variants = {
    text: 'h-4 w-full',
    card: 'h-48 w-full',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-24',
    form: 'h-96 w-full', // Variante pour les formulaires
  };

  return <div className={`${baseClasses} ${variants[variant]} ${className}`} />;
}

export function PageLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-8 py-24 md:py-32">
      <div className="text-center mb-16">
        <LoadingSkeleton variant="text" className="h-12 w-96 mx-auto mb-6" />
        <LoadingSkeleton
          variant="text"
          className="h-6 w-full max-w-2xl mx-auto"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-6 rounded-2xl border border-foreground/10">
            <LoadingSkeleton variant="card" className="mb-4" />
            <LoadingSkeleton variant="text" className="h-6 mb-2" />
            <LoadingSkeleton variant="text" className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-8 py-24 md:py-32">
      <div className="text-center mb-20">
        <LoadingSkeleton
          variant="text"
          className="h-16 w-full max-w-4xl mx-auto mb-8"
        />
        <LoadingSkeleton
          variant="text"
          className="h-6 w-full max-w-3xl mx-auto"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="p-8 rounded-3xl border border-foreground/10">
            <LoadingSkeleton variant="text" className="h-8 w-64 mb-8" />
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <LoadingSkeleton variant="text" className="h-12" />
                <LoadingSkeleton variant="text" className="h-12" />
              </div>
              <LoadingSkeleton variant="text" className="h-12" />
              <LoadingSkeleton variant="text" className="h-32" />
              <LoadingSkeleton variant="button" className="h-12 w-48" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-6 rounded-3xl border border-foreground/10 text-center">
            <LoadingSkeleton variant="avatar" className="mx-auto mb-4" />
            <LoadingSkeleton variant="text" className="h-6 w-32 mx-auto mb-2" />
            <LoadingSkeleton variant="text" className="h-4 w-48 mx-auto" />
          </div>

          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-foreground/10"
            >
              <LoadingSkeleton variant="text" className="h-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
