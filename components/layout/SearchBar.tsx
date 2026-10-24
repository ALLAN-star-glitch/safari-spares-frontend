// components/layout/SearchBar.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  autoFocus?: boolean;
  className?: string;
}

export function SearchBar({ autoFocus = false, className }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const clear = () => {
    setQuery('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('relative w-full', className)}
    >
      <div className="relative flex items-center rounded-full border border-border-subtle bg-charcoal-elevated/60 backdrop-blur-sm transition-colors focus-within:border-primary/50">
        <Search className="ml-4 h-4 w-4 shrink-0 text-text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search parts, makes, or models..."
          autoFocus={autoFocus}
          className="flex-1 bg-transparent px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted placeholder:text-[13px] outline-none"
          aria-label="Search parts"
        />
        {query && (
          <button
            type="button"
            onClick={clear}
            className="mr-2 flex h-6 w-6 items-center justify-center rounded-full text-text-muted hover:bg-charcoal-higher hover:text-text-primary"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          type="submit"
          className="mr-1 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-600"
        >
          Search
        </button>
      </div>
    </form>
  );
}