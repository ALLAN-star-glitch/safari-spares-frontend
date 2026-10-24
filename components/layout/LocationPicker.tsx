// components/layout/LocationPicker.tsx

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MapPin, ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { KENYA_COUNTIES } from '@/lib/constants';

export function LocationPicker({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLocation = searchParams.get('county') ?? '';

  const [open, setOpen] = useState(false);

  const select = (county: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (county) {
      params.set('county', county);
    } else {
      params.delete('county');
    }
    setOpen(false);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'gap-2 text-text-primary hover:text-primary hover:bg-charcoal-higher rounded-lg px-3 h-10 text-sm font-medium',
            className,
          )}
        >
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="hidden md:inline max-w-[110px] truncate">
            {currentLocation || 'All Kenya'}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-60 bg-charcoal-elevated border-border-subtle"
      >
        <DropdownMenuLabel className="text-text-secondary text-sm font-semibold">
          Choose location
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border-subtle" />

        <DropdownMenuItem
          onSelect={() => select('')}
          className="cursor-pointer text-sm text-text-secondary focus:bg-charcoal-higher focus:text-text-primary flex justify-between py-2.5"
        >
          <span>All Kenya</span>
          {!currentLocation && <Check className="h-4 w-4 text-primary" />}
        </DropdownMenuItem>

        {KENYA_COUNTIES.map((county) => {
          const isSelected = currentLocation === county;
          return (
            <DropdownMenuItem
              key={county}
              onSelect={() => select(county)}
              className="cursor-pointer text-sm text-text-secondary focus:bg-charcoal-higher focus:text-text-primary flex justify-between py-2.5"
            >
              <span>{county}</span>
              {isSelected && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}