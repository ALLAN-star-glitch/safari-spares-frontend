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
import { cn } from '@/lib/utils';
import { KENYA_COUNTIES } from '@/lib/constants';

// Engraved text shadow used across the header components
const ENGRAVE_TEXT_SHADOW = '0 -1px 0 rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06)';

interface LocationPickerProps {
  className?: string;
}

export function LocationPicker({ className }: LocationPickerProps) {
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
        <button
          type="button"
          className={cn(
            // Base metal toggle switch
            'group relative inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 sm:px-3 h-9 sm:h-10 select-none outline-none',
            'bg-[linear-gradient(180deg,#23272B_0%,#181B1E_48%,#0F1113_100%)]',
            'text-text-secondary transition-all duration-150 ease-out',
            // Physical bevel + drop shadow
            'shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-2px_3px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.85),0_2px_4px_rgba(0,0,0,0.4)]',
            'hover:-translate-y-px hover:text-text-primary hover:brightness-115',
            'active:translate-y-[1px]',
            'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_2px_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,0,0,0.85),0_1px_2px_rgba(0,0,0,0.4)]',
            'focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal',
            open && 'text-primary',
            className
          )}
        >
          {/* Gloss on the upper half of the cap */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[2px] top-[1.5px] h-1/2 rounded-t-md bg-gradient-to-b from-white/15 to-transparent"
          />
          
          <MapPin className={cn(
            "relative h-4 w-4 shrink-0 transition-colors",
            open ? "text-primary drop-shadow-[0_0_4px_rgba(20,184,122,0.4)]" : "text-primary/70"
          )} />
          
          <span
            className="relative hidden md:inline max-w-[100px] truncate text-xs sm:text-sm font-semibold tracking-wide"
            style={{ textShadow: ENGRAVE_TEXT_SHADOW }}
          >
            {currentLocation || 'All Kenya'}
          </span>
          
          <ChevronDown className={cn(
            "relative h-3.5 w-3.5 shrink-0 opacity-60 transition-transform duration-300",
            open && "rotate-180"
          )} />
        </button>
      </DropdownMenuTrigger>

      {/* Dropdown Panel — styled like a digital control unit */}
      <DropdownMenuContent
        align="start"
        className={cn(
          "w-60 mt-2 p-2 border border-border-subtle rounded-xl",
          "bg-[linear-gradient(180deg,#1C2024_0%,#141719_55%,#0A0C0E_100%)]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_10px_24px_rgba(0,0,0,0.8)]"
        )}
      >
        <DropdownMenuLabel
          className="px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider"
          style={{ textShadow: ENGRAVE_TEXT_SHADOW }}
        >
          Choose location
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border-subtle/50" />

        <div className="max-h-[300px] overflow-y-auto no-scrollbar py-1">
          <DropdownMenuItem
            onSelect={() => select('')}
            className="group cursor-pointer rounded-md px-3 py-2.5 mx-1 focus:bg-charcoal-higher focus:text-text-primary flex items-center justify-between transition-colors"
          >
            <span className="text-sm font-medium text-text-secondary group-focus:text-text-primary">
              All Kenya
            </span>
            {!currentLocation && <Check className="h-4 w-4 text-primary drop-shadow-[0_0_4px_rgba(20,184,122,0.4)]" />}
          </DropdownMenuItem>

          {KENYA_COUNTIES.map((county) => {
            const isSelected = currentLocation === county;
            return (
              <DropdownMenuItem
                key={county}
                onSelect={() => select(county)}
                className="group cursor-pointer rounded-md px-3 py-2.5 mx-1 focus:bg-charcoal-higher focus:text-text-primary flex items-center justify-between transition-colors"
              >
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  isSelected ? "text-primary" : "text-text-secondary group-focus:text-text-primary"
                )}>
                  {county}
                </span>
                {isSelected && <Check className="h-4 w-4 text-primary drop-shadow-[0_0_4px_rgba(20,184,122,0.4)]" />}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}