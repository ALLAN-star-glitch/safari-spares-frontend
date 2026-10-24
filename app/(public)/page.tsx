/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(public)/page.tsx

import Link from 'next/link';
import { ArrowRight, Cog, Disc, Zap, CarFront, CircleDashed, Settings2 } from 'lucide-react';
import { HeroSection } from '@/components/home/HeroSection';
import { ActionCards } from '@/components/home/ActionCards';
import { ListingCard } from '@/components/marketplace/ListingCard';
import { ShopCard } from '@/components/marketplace/ShopCard';
import { MechanicCard } from '@/components/marketplace/MechanicCard';
import { PART_CATEGORIES } from '@/lib/constants';

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
            {PART_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.value] || Cog;
              return (
                <Link
                  key={cat.value}
                  href={`/search?category=${cat.value}`}
                  className="group flex flex-col items-center gap-3"
                >
                  {/* Elegant Category Circle */}
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-charcoal-elevated transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(20,184,122,0.15)] sm:h-20 sm:w-20">
                    {/* Subtle inner border */}
                    <div className="absolute inset-0 rounded-full border border-border-subtle transition-colors duration-300 group-hover:border-primary/30" />
                    
                    {/* Glowing outer ring on hover */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent transition-colors duration-300 group-hover:border-primary/20 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100" />

                    {/* Subtle radial gradient background */}
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-charcoal to-charcoal-higher" />

                    {/* Icon */}
                    <Icon
                      className="relative z-10 h-7 w-7 text-text-secondary transition-colors duration-300 group-hover:text-primary sm:h-8 sm:w-8"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-center text-[12px] font-semibold tracking-tight text-text-secondary group-hover:text-text-primary transition-colors sm:text-[13px]">
                    {cat.label.split(' & ')[0]}
                  </span>
                </Link>
              );
            })}
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

      {/* Open a Shop CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-charcoal-elevated to-charcoal-elevated p-8 sm:p-12 border border-border-subtle">
            <div className="relative z-10 md:w-2/3">
              <h2 className="mb-3 text-2xl font-bold text-text-primary sm:text-3xl">
                Turn your shop into a digital storefront
              </h2>
              <p className="mb-6 max-w-lg text-text-secondary">
                Reach thousands of buyers. Get a verified badge, manage inventory, 
                and grow your business with Safari Spares.
              </p>
              <Link
                href="/for-sellers"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary-600"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}