'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function DashboardSearch({ placeholder }: { placeholder: string }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        defaultValue={searchParams?.get('q')?.toString() ?? ''}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10"
      />
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
