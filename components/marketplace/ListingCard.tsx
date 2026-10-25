// components/marketplace/ListingCard.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

/* Fine grain: so the card reads as cast metal, not flat CSS */
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

export interface ListingCardProps {
  id: string;
  title: string;
  fitment: string;
  priceKes: number;
  location: string;
  imageUrl: string;
  isVerified?: boolean;
}

export function ListingCard({
  id,
  title,
  fitment,
  priceKes,
  location,
  imageUrl,
  isVerified = true,
}: ListingCardProps) {
  return (
    <Link
      href={`/listings/${id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-out",
        // 3D Cast Metal Frame
        "bg-[linear-gradient(180deg,#1C2024_0%,#141719_55%,#0D0F11_100%)]",
        // Physical Depth (Bevel + Drop Shadow)
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.9),0_8px_20px_rgba(0,0,0,0.5)]",
        "border border-black/60",
        // Hover: Lift and glow
        "hover:-translate-y-1.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.9),0_16px_32px_rgba(20,184,122,0.15)]",
        "hover:border-primary/40"
      )}
    >
      {/* Cast grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.06] mix-blend-overlay rounded-2xl"
        style={{ backgroundImage: NOISE, backgroundSize: '140px 140px' }}
        aria-hidden="true"
      />

      {/* Image Area — Recessed Bezel */}
      <div className="relative p-1.5 pb-0 z-10">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-charcoal shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          
          {/* Subtle dark gradient overlay at the bottom for depth */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal to-transparent opacity-60" />
          
          {/* Verified Badge — Physical Tag */}
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

      {/* Content Area */}
      <div className="relative z-10 flex flex-1 flex-col p-4">
        {/* Title & Fitment */}
        <div className="mb-4">
          <h3 className="mb-1 line-clamp-1 text-[16px] font-bold tracking-tight text-text-primary transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="line-clamp-1 text-[13px] font-medium text-text-muted">
            {fitment}
          </p>
        </div>
        
        {/* Price & Location (Aligned Bottom) */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-0.5">
              Price
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-secondary/80">KES</span>
              <span className="text-xl font-extrabold tracking-tight text-secondary tabular-nums drop-shadow-[0_1px_0_rgba(0,0,0,0.5)]">
                {priceKes.toLocaleString()}
              </span>
            </div>
          </div>
          
          {/* Location Badge — Engraved Plate */}
          <div className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary bg-charcoal px-2 py-1.5 rounded-md border border-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
            <MapPin className="h-3 w-3 shrink-0 text-text-muted" />
            <span className="truncate max-w-[80px]">{location.split(',')[0]}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}