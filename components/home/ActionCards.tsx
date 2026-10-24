// components/home/ActionCards.tsx

import Link from 'next/link';
import { Cog, Store, Wrench, CarFront, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ACTIONS = [
  {
    label: 'Find Parts',
    description: 'Search inventory',
    href: '/search',
    icon: Cog,
    // Primary Green Accent
    border: 'border-primary/20',
    bg: 'bg-primary/5',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    hoverBorder: 'hover:border-primary/50',
    hoverShadow: 'hover:shadow-[0_8px_30px_rgba(20,184,122,0.12)]',
  },
  {
    label: 'Find Shops',
    description: 'Verified businesses',
    href: '/shops',
    icon: Store,
    // Secondary Gold Accent
    border: 'border-secondary/20',
    bg: 'bg-secondary/5',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    hoverBorder: 'hover:border-secondary/50',
    hoverShadow: 'hover:shadow-[0_8px_30px_rgba(232,163,61,0.12)]',
  },
  {
    label: 'Find Mechanics',
    description: 'Trusted pros',
    href: '/mechanics',
    icon: Wrench,
    // Primary Green Accent
    border: 'border-primary/20',
    bg: 'bg-primary/5',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    hoverBorder: 'hover:border-primary/50',
    hoverShadow: 'hover:shadow-[0_8px_30px_rgba(20,184,122,0.12)]',
  },
  {
    label: 'My Garage',
    description: 'Your vehicles',
    href: '/garage',
    icon: CarFront,
    // Secondary Gold Accent
    border: 'border-secondary/20',
    bg: 'bg-secondary/5',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    hoverBorder: 'hover:border-secondary/50',
    hoverShadow: 'hover:shadow-[0_8px_30px_rgba(232,163,61,0.12)]',
  },
];

export function ActionCards() {
  return (
    <section className="bg-charcoal pt-4 pb-2">
      <div className="container mx-auto px-4">
        {/* Mobile: 2x2 Grid / Desktop: 4-column Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[20px] border bg-charcoal-elevated p-5 transition-all duration-300 hover:-translate-y-1",
                  action.border,
                  action.hoverBorder,
                  action.hoverShadow,
                  "sm:p-6"
                )}
              >
                {/* Base background tint */}
                <div className={cn("absolute inset-0 opacity-40", action.bg)} />

                {/* Subtle top-right glow on hover */}
                <div className={cn(
                  "absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100",
                  action.bg
                )} />

                <div className="relative z-10 flex items-start justify-between mb-4 sm:mb-6">
                  {/* Icon Container */}
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm border border-border-subtle/50 transition-colors",
                    action.iconBg,
                    "sm:h-14 sm:w-14"
                  )}>
                    <Icon
                      className={cn(
                        "h-6 w-6 transition-transform duration-500 group-hover:scale-110",
                        action.iconColor
                      )}
                      strokeWidth={1.5}
                    />
                  </div>
                  
                  {/* Arrow indicator */}
                  <ArrowUpRight className={cn(
                    "h-5 w-5 opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0",
                    action.iconColor
                  )} />
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="mb-0.5 text-[15px] font-bold tracking-tight text-text-primary sm:text-[17px]">
                    {action.label}
                  </h3>
                  <p className="text-[12px] font-medium text-text-muted sm:text-[13px]">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}