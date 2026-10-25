// components/marketplace/MechanicCard.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Wrench, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MechanicCardProps {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  imageUrl: string;
  isVerified?: boolean;
}

export function MechanicCard({
  id,
  name,
  specialty,
  rating,
  location,
  imageUrl,
  isVerified = true,
}: MechanicCardProps) {
  return (
    <Link
      href={`/mechanics/${id}`}
      className={cn(
        "group relative flex w-[260px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-out sm:w-auto",
        "bg-[linear-gradient(180deg,#1C2024_0%,#141719_55%,#0D0F11_100%)]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.9),0_4px_10px_rgba(0,0,0,0.5)]",
        "sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.9),0_8px_20px_rgba(0,0,0,0.5)]",
        "border border-black/60",
        "hover:-translate-y-1.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.9),0_12px_24px_rgba(20,184,122,0.15)]",
        "hover:border-primary/40"
      )}
    >
      <div className="relative z-10 flex flex-1 flex-col p-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="relative p-1 shrink-0">
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-charcoal shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] border border-white/5">
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            {isVerified && (
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[linear-gradient(180deg,#111A15_0%,#0A0F0C_100%)] border border-primary/30 shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <ShieldCheck className="h-3 w-3 text-primary drop-shadow-[0_0_3px_rgba(20,184,122,0.6)]" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="line-clamp-1 text-[16px] font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1.5 text-[13px] font-medium text-text-muted mt-0.5">
              <Wrench className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{specialty}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-3">
          <div className="flex items-center gap-1.5 bg-charcoal px-2 py-1 rounded-md border border-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
            <Star className="h-3.5 w-3.5 fill-secondary text-secondary drop-shadow-[0_0_2px_rgba(232,163,61,0.5)]" />
            <span className="text-[12px] font-bold text-text-primary tabular-nums">
              {rating.toFixed(1)}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary">
            <MapPin className="h-3 w-3 shrink-0 text-text-muted" />
            <span className="truncate max-w-[80px]">{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}