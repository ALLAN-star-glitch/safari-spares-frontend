// components/marketplace/ListingCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ShieldCheck } from 'lucide-react';

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
      className="group relative flex flex-col overflow-hidden rounded-[20px] border border-border-subtle bg-charcoal-elevated transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(20,184,122,0.08)]"
    >
      {/* Image Area — Large and bleeding */}
      <div className="relative aspect-[4/3] w-full bg-charcoal overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Subtle dark gradient overlay at the bottom for depth */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal-elevated to-transparent opacity-80" />
        
        {/* Verified Badge — Premium Glow */}
        {isVerified && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-primary/20 bg-charcoal/70 px-3 py-1.5 backdrop-blur-md shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              Verified
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5 pt-2">
        {/* Title & Fitment */}
        <div className="mb-4">
          <h3 className="mb-1 line-clamp-1 text-[17px] font-bold tracking-tight text-text-primary transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="line-clamp-1 text-[13px] font-medium text-text-muted">
            {fitment}
          </p>
        </div>
        
        {/* Price & Location (Aligned Bottom) */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-0.5">
              Price
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-secondary/80">KES</span>
              <span className="text-xl font-extrabold tracking-tight text-secondary tabular-nums">
                {priceKes.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-[12px] font-medium text-text-secondary bg-charcoal-higher px-2.5 py-1.5 rounded-lg">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate max-w-[90px]">{location.split(',')[0]}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}