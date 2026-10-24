// components/marketplace/MechanicCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Wrench } from 'lucide-react';

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
      className="group flex w-[260px] shrink-0 snap-center flex-col overflow-hidden rounded-[20px] border border-border-subtle bg-charcoal-elevated p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(20,184,122,0.08)] sm:w-auto"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-border-subtle group-hover:border-primary/40 transition-colors">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        
        {/* Name & Specialty */}
        <div className="flex-1 min-w-0">
          <h3 className="line-clamp-1 text-[16px] font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-text-muted">
            <Wrench className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{specialty}</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-5 flex items-center justify-between border-t border-border-subtle/50 pt-3">
        <div className="flex items-center gap-1.5">
          <Star className="h-4 w-4 fill-secondary text-secondary" />
          <span className="text-sm font-semibold text-text-primary">{rating.toFixed(1)}</span>
        </div>
        
        <div className="flex items-center gap-1 text-[12px] font-medium text-text-secondary bg-charcoal-higher px-2.5 py-1 rounded-md">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate max-w-[80px]">{location}</span>
        </div>
      </div>
    </Link>
  );
}