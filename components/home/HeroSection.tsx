'use client';

// components/home/HeroSection.tsx

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, BadgeCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

/* Fine grain: gives the whole hero a photographic, tactile surface */
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

/* Keycap buttons: a solid "underside" shadow is the physical thickness.
   Hover lifts, press pushes the cap down into it. */
const KEYCAP_BASE =
  'group/btn relative inline-flex items-center justify-center rounded-full px-7 py-[17px] text-sm font-semibold sm:text-base ' +
  'transition-[transform,box-shadow,filter] duration-150 ease-out select-none outline-none ' +
  'hover:-translate-y-px active:translate-y-[3px] ' +
  'focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ' +
  'motion-reduce:transition-none';

const KEYCAP_PRIMARY =
  'text-primary-foreground ' +
  'bg-[linear-gradient(180deg,#3FDBA0_0%,#14B87A_46%,#0E9A64_100%)] ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-3px_4px_rgba(0,0,0,0.22),0_0_0_1px_rgba(5,60,40,0.9),0_4px_0_#0A6B49,0_12px_22px_rgba(20,184,122,0.30)] ' +
  'hover:brightness-110 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.22),0_0_0_1px_rgba(5,60,40,0.9),0_5px_0_#0A6B49,0_16px_28px_rgba(20,184,122,0.42)] ' +
  'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_3px_rgba(0,0,0,0.25),0_0_0_1px_rgba(5,60,40,0.9),0_1px_0_#0A6B49,0_4px_8px_rgba(20,184,122,0.25)]';

const KEYCAP_METAL =
  'text-foreground ' +
  'bg-[linear-gradient(180deg,#434A51_0%,#2A2F34_48%,#1B1E22_100%)] ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-3px_4px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.85),0_4px_0_#07080A,0_12px_20px_rgba(0,0,0,0.5)] ' +
  'hover:brightness-125 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-3px_4px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.85),0_5px_0_#07080A,0_16px_26px_rgba(0,0,0,0.55)] ' +
  'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-2px_3px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.85),0_1px_0_#07080A,0_4px_8px_rgba(0,0,0,0.5)]';

/* Machined tag used for the trust chips */
const PLAQUE =
  'flex items-center gap-2.5 rounded-full py-2 pl-2.5 pr-4 backdrop-blur-sm ' +
  'bg-[linear-gradient(180deg,rgba(60,66,72,0.75)_0%,rgba(28,31,35,0.85)_100%)] ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-2px_3px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.6),0_6px_12px_rgba(0,0,0,0.4)]';

/* Extruded lettering: a stack of 1px shadows reads as solid depth */
const EXTRUDE_EMERALD = [
  '0 1px 0 #0E8F5F',
  '0 2px 0 #0B7A4F',
  '0 3px 0 #096843',
  '0 4px 0 #07563A',
  '0 5px 0 #054530',
  '0 6px 0 #043625',
  '0 12px 14px rgba(0,0,0,0.55)',
  '0 0 38px rgba(20,184,122,0.28)',
].join(',');

const EXTRUDE_STEEL = [
  '0 1px 0 #B9BEC4',
  '0 2px 0 #8E949B',
  '0 3px 0 #6C7279',
  '0 4px 0 #50555B',
  '0 5px 0 #3A3E43',
  '0 6px 0 #26292D',
  '0 12px 14px rgba(0,0,0,0.55)',
].join(',');

function IconLED({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: 'primary' | 'secondary';
}) {
  const glow =
    tone === 'primary' ? 'rgba(20,184,122,0.45)' : 'rgba(232,163,61,0.45)';
  return (
    <span
      className="flex h-6 w-6 items-center justify-center rounded-full"
      style={{
        background:
          'radial-gradient(circle at 35% 28%, #3c4249 0%, #1b1e22 70%)',
        boxShadow: `inset 0 1px 1px rgba(255,255,255,.3), inset 0 -2px 3px rgba(0,0,0,.7), 0 0 0 1px rgba(0,0,0,.75), 0 0 10px ${glow}`,
      }}
    >
      {children}
    </span>
  );
}

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  /* Pointer parallax: the photo, glows and light shift at different rates,
     so the layers feel like they sit at different distances. */
  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--px', x.toFixed(3));
    el.style.setProperty('--py', y.toFixed(3));
  };

  const handleLeave = () => {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty('--px', '0');
    el.style.setProperty('--py', '0');
  };

  return (
    <section
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative flex min-h-[520px] items-center overflow-hidden bg-charcoal sm:min-h-[560px]"
      style={{ '--px': '0', '--py': '0' } as React.CSSProperties}
    >
      {/* Background photo (furthest layer, moves least) */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out motion-reduce:!transform-none"
        style={{
          transform:
            'translate3d(calc(var(--px) * -16px), calc(var(--py) * -10px), 0) scale(1.06)',
        }}
      >
        <Image
          src="/hero.png"
          alt="Nairobi auto parts shop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Legibility gradients */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/30" />
      <div className="absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-charcoal/95 via-charcoal/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />

      {/* Vignette: pulls the eye to the centre and adds lens-like depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 90% at 35% 45%, transparent 45%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Glow accents (mid layer, move more than the photo) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-transform duration-300 ease-out motion-reduce:!transform-none"
        style={{
          transform:
            'translate3d(calc(var(--px) * 30px), calc(var(--py) * 20px), 0)',
        }}
      >
        <div className="absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-12 left-1/3 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Key light: soft diagonal beam from the top-left, like a workshop lamp */}
      <div
        className="pointer-events-none absolute inset-0 z-0 mix-blend-soft-light"
        style={{
          background:
            'linear-gradient(115deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 28%, transparent 52%)',
        }}
      />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.14] mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: '160px 160px' }}
      />

      {/* Lit rail along the bottom edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(20,184,122,0.55) 25%, rgba(232,163,61,0.35) 60%, transparent)',
        }}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          {/* Badge: engraved plaque with a lit icon */}
          <div
            className="mb-6 inline-flex items-center gap-2.5 rounded-full py-1 pl-1.5 pr-4 text-xs font-medium text-primary backdrop-blur-sm sm:text-sm"
            style={{
              background:
                'linear-gradient(180deg, rgba(20,184,122,0.18) 0%, rgba(20,184,122,0.06) 100%)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 3px rgba(0,0,0,0.35), 0 0 0 1px rgba(20,184,122,0.35), 0 6px 14px rgba(0,0,0,0.35)',
            }}
          >
            <IconLED tone="primary">
              <Zap className="h-3 w-3 text-primary" />
            </IconLED>
            <span>Verified Parts. Secure Escrow. Fast Delivery.</span>
          </div>

          {/* Heading: solid extruded lettering */}
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span
              className="text-primary"
              style={{ textShadow: EXTRUDE_EMERALD }}
            >
              Safari
            </span>
            <span className="text-[#EEF1F3]" style={{ textShadow: EXTRUDE_STEEL }}>
              {' '}
              Spares
            </span>
            <span
              className="mt-4 block text-xl font-semibold text-text-secondary sm:text-2xl lg:text-3xl"
              style={{
                textShadow:
                  '0 -1px 0 rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.08), 0 4px 10px rgba(0,0,0,0.5)',
              }}
            >
              Pata Part. Pata Pap.{' '}
              <span className="text-secondary">Pata Sasa.</span>
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="mb-9 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            Find verified spare parts from trusted shops across Nairobi.
            Reserve for pickup, chat directly with sellers, and get your
            vehicle back on the road, without the runaround.
          </p>

          {/* CTAs: physical keycaps */}
          <div className="mb-10 flex flex-wrap gap-4">
            <Link href="/search" className={cn(KEYCAP_BASE, KEYCAP_PRIMARY)}>
              {/* Gloss on the upper half of the cap */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[3px] top-[2px] h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent"
              />
              <span
                className="relative inline-flex items-center"
                style={{ textShadow: '0 1px 0 rgba(255,255,255,0.28)' }}
              >
                Find Parts
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 sm:h-5 sm:w-5" />
              </span>
            </Link>
            <Link href="/shops" className={cn(KEYCAP_BASE, KEYCAP_METAL)}>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[3px] top-[2px] h-1/2 rounded-t-full bg-gradient-to-b from-white/10 to-transparent"
              />
              <span
                className="relative"
                style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.7)' }}
              >
                Browse Shops
              </span>
            </Link>
          </div>

          {/* Trust chips: machined tags with lit icons */}
          <div className="flex flex-wrap gap-3 text-sm">
            <div className={PLAQUE}>
              <IconLED tone="primary">
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              </IconLED>
              <span className="font-medium text-text-primary">
                KYC-Verified Shops
              </span>
            </div>
            <div className={PLAQUE}>
              <IconLED tone="secondary">
                <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
              </IconLED>
              <span className="font-medium text-text-primary">
                Reserve for Pickup
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
