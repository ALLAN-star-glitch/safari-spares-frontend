/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(public)/page.tsx

import Link from 'next/link';
import { ArrowRight, Cog, Disc, Zap, CarFront, CircleDashed, Settings2, Store } from 'lucide-react';
import { ListingCard } from '@/components/marketplace/ListingCard';
import { ShopCard } from '@/components/marketplace/ShopCard';
import { MechanicCard } from '@/components/marketplace/MechanicCard';
import { PART_CATEGORIES } from '@/lib/constants';
import { CategoryCard } from '@/components/home/category-card';
import { ActionCards } from '@/components/home/ActionCards';
import { HeroSection } from '@/components/home/HeroSection';
import { cn } from '@/lib/utils';

// Reusing the exact noise from the other components
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

const PRIMARY_TEXT_SHADOW = '0 1px 0 rgba(255,255,255,0.28)';

// Icon map for circular categories
const CATEGORY_ICONS: Record<string, any> = {
  'engine-drivetrain': Cog,
  'brakes-suspension': Disc,
  'electrical-lighting': Zap,
  'body-exterior': CarFront,
  'filters-fluids': CircleDashed,
  'tyres-wheels': Settings2,
  'interior-accessories': CarFront,
  'tools-equipment': Settings2,
};

// Mock data for featured listings
const MOCK_FEATURED = [
  {
    id: '1',
    title: 'Headlights (Pair)',
    fitment: 'Toyota Fielder 2012-2018',
    priceKes: 12500,
    location: 'Nairobi, Kirinyaga Rd',
    imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Brake Discs & Pads (Front)',
    fitment: 'Toyota Axio 2012-2018',
    priceKes: 9800,
    location: 'Nairobi, Kirinyaga Rd',
    imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Side Mirror Assembly',
    fitment: 'Nissan Note 2014-2020',
    priceKes: 4500,
    location: 'Mombasa Rd',
    imageUrl: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Alternator 12V',
    fitment: 'Subaru Forester 2010-2015',
    priceKes: 18500,
    location: 'Nairobi, Industrial Area',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop',
  },
];

// Mock data for shops
const MOCK_SHOPS = [
  {
    id: '1',
    name: 'AutoSpare Kenya',
    rating: 4.6,
    distance: '2.3 km',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Kipra Motors',
    rating: 4.4,
    distance: '2.3 km',
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Juma Auto Spares',
    rating: 4.7,
    distance: '2.3 km',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Nairobi Motor Hub',
    rating: 4.5,
    distance: '3.1 km',
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop',
  },
];

// Mock data for verified mechanics
const MOCK_MECHANICS = [
  {
    id: '1',
    name: 'David Ochieng',
    specialty: 'Engine Specialist',
    rating: 4.9,
    location: 'Nairobi',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Grace Wanjiku',
    specialty: 'Electrical Systems',
    rating: 4.8,
    location: 'Nairobi',
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Samuel Kiprop',
    specialty: 'Suspension & Brakes',
    rating: 4.7,
    location: 'Mombasa Rd',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Amina Hassan',
    specialty: 'Diagnostics',
    rating: 4.9,
    location: 'Nairobi',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  },
];

export default function HomePage() {
  return (
    <div className="bg-charcoal min-h-screen pb-20">
      <HeroSection />
      
      <ActionCards />

       {/* Browse Categories */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text-primary">
              Browse Categories
            </h2>
            <Link
              href="/search"
              className="text-sm font-semibold text-primary hover:text-primary-600 transition-colors"
            >
              See All
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {PART_CATEGORIES.map((cat) => (
              <CategoryCard key={cat.value} cat={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text-primary">
              Featured Listings
            </h2>
            <Link
              href="/search"
              className="text-sm font-semibold text-primary hover:text-primary-600 transition-colors"
            >
              See All
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_FEATURED.map((listing) => (
              <ListingCard key={listing.id} {...listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Shops Near You */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text-primary">
              Shops Near You
            </h2>
            <Link
              href="/shops"
              className="text-sm font-semibold text-primary hover:text-primary-600 transition-colors"
            >
              See All
            </Link>
          </div>

          {/* Mobile: Horizontal scroll / Desktop: Grid */}
          <div className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-4 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {MOCK_SHOPS.map((shop) => (
              <ShopCard key={shop.id} {...shop} />
            ))}
          </div>
        </div>
      </section>

      {/* Verified Mechanics */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-text-primary">
              Verified Mechanics
            </h2>
            <Link
              href="/mechanics"
              className="text-sm font-semibold text-primary hover:text-primary-600 transition-colors"
            >
              See All
            </Link>
          </div>

          {/* Mobile: Horizontal scroll / Desktop: Grid */}
          <div className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-4 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {MOCK_MECHANICS.map((mechanic) => (
              <MechanicCard key={mechanic.id} {...mechanic} />
            ))}
          </div>
        </div>
      </section>

      {/* Open a Shop CTA — Now with Cast-Metal Texture */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className={cn(
            "relative overflow-hidden rounded-3xl p-8 sm:p-12",
            // 3D Cast Metal Frame
            "bg-[linear-gradient(180deg,#1C2024_0%,#141719_55%,#0D0F11_100%)]",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.9),0_12px_30px_rgba(0,0,0,0.6)]",
            "border border-black/80"
          )}>
            {/* Cast grain texture overlay - Hidden on mobile to save GPU */}
            <div
              className="hidden sm:block pointer-events-none absolute inset-0 z-0 opacity-[0.08] mix-blend-overlay"
              style={{ backgroundImage: NOISE, backgroundSize: '140px 140px' }}
              aria-hidden="true"
            />

            {/* Lit rail along the top edge */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 20%, rgba(232,163,61,0.3) 50%, rgba(255,255,255,0.15) 80%, transparent)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 md:w-2/3">
              {/* Icon Bezel */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#2A2E33,#141619)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.6),0_4px_8px_rgba(0,0,0,0.5)] border border-white/5">
                <Store className="h-8 w-8 text-secondary drop-shadow-[0_0_8px_rgba(232,163,61,0.4)]" strokeWidth={1.5} />
              </div>

              <h2 
                className="mb-3 text-2xl font-bold text-text-primary sm:text-3xl tracking-tight"
                style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.05)' }}
              >
                Turn your shop into a digital storefront
              </h2>
              <p className="mb-8 max-w-lg text-text-secondary">
                Reach thousands of buyers. Get a verified badge, manage inventory, 
                and grow your business with Safari Spares.
              </p>
              
              {/* Primary Keycap CTA */}
              <Link
                href="/for-sellers"
                className={cn(
                  'group/btn relative inline-flex items-center justify-center rounded-full px-6 h-12 select-none outline-none',
                  'text-secondary-foreground font-semibold text-base',
                  'transition-[transform,box-shadow,filter] duration-150 ease-out',
                  'bg-[linear-gradient(180deg,#F6C77A_0%,#E8A33D_46%,#C4852A_100%)]',
                  'shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-3px_4px_rgba(0,0,0,0.22),0_0_0_1px_rgba(80,40,5,0.9),0_4px_0_#9C671E,0_12px_22px_rgba(232,163,61,0.30)]',
                  'hover:-translate-y-px hover:brightness-110',
                  'active:translate-y-[3px]',
                  'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_3px_rgba(0,0,0,0.25),0_0_0_1px_rgba(80,40,5,0.9),0_1px_0_#9C671E,0_4px_8px_rgba(232,163,61,0.25)]'
                )}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-[3px] top-[2px] h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent"
                />
                <span className="relative" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3)' }}>
                  Learn More
                </span>
                <ArrowRight className="relative ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}