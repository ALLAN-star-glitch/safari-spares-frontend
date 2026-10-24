// components/marketplace/ShopCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, ShieldCheck } from 'lucide-react';

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
      className="group flex w-[260px] shrink-0 snap-center flex-col overflow-hidden rounded-[20px] border border-border-subtle bg-charcoal-elevated transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(20,184,122,0.08)] sm:w-auto"
    >
      {/* Image Area */}
      <div className="relative aspect-[16/9] w-full bg-charcoal overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-elevated/90 to-transparent opacity-80" />
        
        {isVerified && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-primary/20 bg-charcoal/70 px-2.5 py-1 backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Verified
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-1 text-[16px] font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <div className="mt-auto flex items-center justify-between text-[13px] font-medium text-text-secondary">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 text-text-muted">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{distance}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}