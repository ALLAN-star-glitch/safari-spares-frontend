// components/home/HeroSection.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Zap,
} from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[520px] sm:min-h-[560px] items-center overflow-hidden bg-charcoal">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Nairobi auto parts shop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Dark gradient overlay — heavier on the left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/30" />
        {/* Top fade — ensures header is always readable */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/95 via-charcoal/40 to-transparent" />
        {/* Bottom fade — blends into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />
      </div>

      {/* Glow accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-12 left-1/3 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm sm:text-sm">
            <Zap className="h-3.5 w-3.5" />
            <span>Verified Parts. Secure Escrow. Fast Delivery.</span>
          </div>

          {/* Heading */}
          <h1 className="mb-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-primary">Safari</span>
            <span className="text-foreground"> Spares</span>
            <span className="mt-2 block text-xl font-semibold text-text-secondary sm:text-2xl lg:text-3xl">
              Pata Part. Pata Pap.{' '}
              <span className="text-secondary">Pata Sasa.</span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="mb-8 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Find verified spare parts from trusted shops across Nairobi.
            Reserve for pickup, chat directly with sellers, and get your
            vehicle back on the road — without the runaround.
          </p>

          {/* CTAs */}
          <div className="mb-8 flex flex-wrap gap-3">
            <Link href="/search">
              <Button
                size="lg"
                className="rounded-full bg-primary px-7 py-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary-600 hover:shadow-primary/40 sm:text-base"
              >
                Find Parts
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link href="/shops">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-border-subtle bg-charcoal-elevated/60 px-7 py-6 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:bg-charcoal-higher sm:text-base"
              >
                Browse Shops
              </Button>
            </Link>
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-charcoal-elevated/60 px-4 py-2 backdrop-blur-sm">
              <BadgeCheck className="h-4 w-4 text-primary" />
              <span className="text-text-primary font-medium">
                KYC-Verified Shops
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-charcoal-elevated/60 px-4 py-2 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              <span className="text-text-primary font-medium">
                Reserve for Pickup
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}