// components/marketplace/ShopCard.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ShopCardProps {
  id: string;
  name: string;
  rating: number;
  distance: string;
  imageUrl: string;
  isVerified?: boolean;
}

export function ShopCard({
  id,
  name,
  rating,
  distance,
  imageUrl,
  isVerified = true,
}: ShopCardProps) {
  return (
    <Link
      href={`/shops/${id}`}
      className={cn(
        "group flex w-[260px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-out sm:w-auto",
        "bg-[linear-gradient(180deg,#1C2024_0%,#141719_55%,#0D0F11_100%)]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.9),0_4px_10px_rgba(0,0,0,0.5)]",
        "sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.9),0_8px_20px_rgba(0,0,0,0.5)]",
        "border border-black/60",
        "hover:-translate-y-1.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.9),0_12px_24px_rgba(20,184,122,0.15)]",
        "hover:border-primary/40"
      )}
    >
      <div className="relative p-1.5 pb-0 z-10">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-charcoal shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal to-transparent opacity-80" />
          
          {isVerified && (
            <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-md border border-primary/30 bg-[linear-gradient(180deg,#111A15_0%,#0A0F0C_100%)] px-2 py-1 shadow-[0_2px_4px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(20,184,122,0.2)] backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5 text-primary drop-shadow-[0_0_3px_rgba(20,184,122,0.6)]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary drop-shadow-[0_1px_0_rgba(0,0,0,0.8)]">
                Verified
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-4">
        <h3 className="mb-3 line-clamp-1 text-[16px] font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-charcoal px-2 py-1 rounded-md border border-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
            <Star className="h-3.5 w-3.5 fill-secondary text-secondary drop-shadow-[0_0_2px_rgba(232,163,61,0.5)]" />
            <span className="text-[12px] font-bold text-text-primary tabular-nums">
              {rating.toFixed(1)}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary">
            <MapPin className="h-3 w-3 shrink-0 text-text-muted" />
            <span>{distance}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}