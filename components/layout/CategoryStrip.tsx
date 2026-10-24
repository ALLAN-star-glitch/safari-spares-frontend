// components/layout/CategoryStrip.tsx

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PART_CATEGORIES } from '@/lib/constants';

export function CategoryStrip() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') ?? '';

  return (
    <div className="hidden lg:block border-t border-border-subtle/40 bg-charcoal">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-center gap-6 overflow-x-auto no-scrollbar py-2.5">
          {PART_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <Link
                key={cat.value}
                href={`/search?category=${cat.value}`}
                className={cn(
                  'relative whitespace-nowrap text-[13px] font-medium tracking-wide transition-colors py-1',
                  isActive
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text-primary',
                )}
              >
                {cat.label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-[10px] h-[2px] rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}