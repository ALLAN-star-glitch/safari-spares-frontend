'use client';

// components/home/ActionCards.tsx

import { useRef } from 'react';
import Link from 'next/link';
import { Cog, Store, Wrench, CarFront } from 'lucide-react';
import { cn } from '@/lib/utils';

type Accent = {
  hex: string;
  glow: string; // soft glow
  strong: string; // LED / edge light
  text: string;
  hoverText: string;
  hoverBorder: string;
};

const ACCENTS: Record<'primary' | 'secondary', Accent> = {
  primary: {
    hex: '#14B87A',
    glow: 'rgba(20,184,122,0.40)',
    strong: 'rgba(20,184,122,0.95)',
    text: 'text-primary',
    hoverText: 'group-hover:text-primary',
    hoverBorder: 'rgba(20,184,122,0.55)',
  },
  secondary: {
    hex: '#E8A33D',
    glow: 'rgba(232,163,61,0.40)',
    strong: 'rgba(232,163,61,0.95)',
    text: 'text-secondary',
    hoverText: 'group-hover:text-secondary',
    hoverBorder: 'rgba(232,163,61,0.55)',
  },
};

const ACTIONS = [
  {
    label: 'Find Parts',
    description: 'Search inventory',
    href: '/search',
    icon: Cog,
    theme: 'primary',
  },
  {
    label: 'Find Shops',
    description: 'Verified businesses',
    href: '/shops',
    icon: Store,
    theme: 'secondary',
  },
  {
    label: 'Find Mechanics',
    description: 'Trusted pros',
    href: '/mechanics',
    icon: Wrench,
    theme: 'primary',
  },
  {
    label: 'My Garage',
    description: 'Your vehicles',
    href: '/garage',
    icon: CarFront,
    theme: 'secondary',
  },
] as const;

/* Fine grain so the plate reads as cast metal */
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

/* Plate thickness: stacked copies pushed back in Z */
const DEPTH_LAYERS = 8;
const DEPTH_STEP = 1.3;

/* A recessed Phillips-style screw head with a slot at its own angle */
function Screw({ className, angle }: { className: string; angle: number }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute z-10 h-[9px] w-[9px] rounded-full',
        className
      )}
      style={{
        background:
          'radial-gradient(circle at 35% 28%, #8a9097 0%, #4a4f55 38%, #17191c 100%)',
        boxShadow:
          '0 0 0 1px rgba(0,0,0,.85), 0 1px 0 1px rgba(255,255,255,.10), inset 0 1px 1px rgba(255,255,255,.35), inset 0 -1px 2px rgba(0,0,0,.7)',
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 block h-[1.5px] w-[7px] -translate-x-1/2 -translate-y-1/2 bg-black/80"
        style={{
          transform: `translate(-50%,-50%) rotate(${angle}deg)`,
          boxShadow: '0 .5px 0 rgba(255,255,255,.18)',
        }}
      />
    </span>
  );
}

function ActionCard({ action }: { action: (typeof ACTIONS)[number] }) {
  const rootRef = useRef<HTMLAnchorElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const Icon = action.icon;
  const accent = ACCENTS[action.theme];

  const handleMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === 'touch') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const r = stage.getBoundingClientRect();
    const x = Math.min(0.5, Math.max(-0.5, (e.clientX - r.left) / r.width - 0.5));
    const y = Math.min(0.5, Math.max(-0.5, (e.clientY - r.top) / r.height - 0.5));

    stage.style.transition = 'transform 120ms ease-out';
    root.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`);
    root.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`);
    root.style.setProperty('--lx', `${((0.5 + x) * 100).toFixed(1)}%`);
    root.style.setProperty('--ly', `${((0.5 + y) * 100).toFixed(1)}%`);
    root.style.setProperty('--sx', `${(-x * 16).toFixed(1)}px`);
  };

  const handleLeave = () => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    stage.style.transition = 'transform 650ms cubic-bezier(.2,.8,.2,1)';
    root.style.setProperty('--rx', '0deg');
    root.style.setProperty('--ry', '0deg');
    root.style.setProperty('--lx', '25%');
    root.style.setProperty('--ly', '15%');
    root.style.setProperty('--sx', '0px');
  };

  return (
    <Link
      ref={rootRef}
      href={action.href}
      className={cn(
        'group relative block h-full rounded-2xl outline-none',
        'transition-transform duration-300 ease-out',
        'hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.985]',
        'focus-visible:ring-2 focus-visible:ring-white/40',
        'motion-reduce:transform-none motion-reduce:transition-none'
      )}
      style={
        {
          perspective: '900px',
          '--rx': '0deg',
          '--ry': '0deg',
          '--lx': '25%',
          '--ly': '15%',
          '--sx': '0px',
        } as React.CSSProperties
      }
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {/* Ground shadow: widens and softens as the plate lifts */}
      <div
        className="pointer-events-none absolute inset-x-3 -bottom-3 h-8 transition-all duration-300 group-hover:-bottom-4 group-hover:opacity-60"
        aria-hidden="true"
      >
        <div
          className="h-full w-full rounded-[50%] bg-black/70 blur-xl"
          style={{ transform: 'translateX(var(--sx))' }}
        />
      </div>
      {/* Tinted light cast onto the surface below on hover */}
      <div
        className="pointer-events-none absolute inset-x-6 -bottom-2 h-5 rounded-[50%] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: accent.glow }}
        aria-hidden="true"
      />

      {/* 3D stage */}
      <div
        ref={stageRef}
        className="relative h-full motion-reduce:!transform-none"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(var(--rx)) rotateY(var(--ry))',
          willChange: 'transform',
        }}
      >
        {/* Plate edge / thickness */}
        {Array.from({ length: DEPTH_LAYERS }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-2xl"
            style={{
              transform: `translateZ(${-(i + 1) * DEPTH_STEP}px)`,
              background: `color-mix(in srgb, #5b626a ${Math.max(
                5,
                36 - i * 5
              )}%, #050607)`,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Chamfered rim: catches light on top-left, falls into shadow bottom-right */}
        <div
          className="absolute inset-0 rounded-2xl transition-[box-shadow] duration-300"
          style={{
            background: `linear-gradient(145deg, #8b929a 0%, #4a5057 18%, #0d0f11 52%, #3a4046 84%, #6f767e 100%)`,
            boxShadow: '0 0 0 1px rgba(0,0,0,.7)',
          }}
          aria-hidden="true"
        />
        {/* Accent rim light that fades in on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1px ${accent.hoverBorder}`,
          }}
          aria-hidden="true"
        />

        {/* Main face */}
        <div
          className="relative m-[2px] flex h-[calc(100%-4px)] flex-col overflow-hidden rounded-[14px] p-5 sm:p-6"
          style={{
            transform: 'translateZ(0.8px)',
            background:
              'linear-gradient(150deg, #2B3035 0%, #1D2125 38%, #14171A 100%)',
            boxShadow:
              'inset 0 1px 1px rgba(255,255,255,.14), inset 1px 0 2px rgba(255,255,255,.05), inset 0 -8px 14px rgba(0,0,0,.65), inset -2px 0 6px rgba(0,0,0,.4)',
          }}
        >
          {/* Brushed streaks */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay"
            style={{
              background:
                'repeating-linear-gradient(98deg, transparent 0px, rgba(255,255,255,.16) 0.6px, transparent 1.4px, transparent 3.4px, rgba(0,0,0,.22) 4px, transparent 4.8px)',
            }}
          />
          {/* Cast grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light"
            style={{ backgroundImage: NOISE, backgroundSize: '70px 70px' }}
          />
          {/* Panel curvature: slightly brighter centre, darker low edge */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,.07), transparent 60%), linear-gradient(180deg, transparent 60%, rgba(0,0,0,.35))',
            }}
          />
          {/* Moving specular highlight (follows the pointer) */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--lx) var(--ly), rgba(255,255,255,.22) 0%, rgba(255,255,255,.06) 28%, transparent 55%)',
            }}
          />
          {/* Slow brushed-metal sheen sweep on hover */}
          <div className="pointer-events-none absolute -inset-x-full bottom-0 top-0 skew-x-12 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />

          {/* Accent edge light along the bottom (like an LED strip) */}
          <div
            className="pointer-events-none absolute inset-x-8 bottom-0 h-[2px] rounded-full opacity-40 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent.strong}, transparent)`,
              boxShadow: `0 0 10px 1px ${accent.glow}`,
            }}
            aria-hidden="true"
          />

          {/* Raised icon button: bezel > well > dome */}
          <div
            className="relative z-10 mb-5 h-14 w-14 transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
            style={{
              filter: 'drop-shadow(0 6px 5px rgba(0,0,0,.65))',
            }}
          >
            {/* Bezel ring */}
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background:
                  'linear-gradient(145deg, #8d949b 0%, #3b4147 30%, #0c0e10 58%, #4d545b 100%)',
                boxShadow: `0 0 0 1px rgba(0,0,0,.8), 0 0 0 2px ${accent.hex}33`,
              }}
            />
            {/* Recessed well */}
            <div
              className="absolute inset-[3px] rounded-[9px]"
              style={{
                background: '#08090a',
                boxShadow:
                  'inset 0 3px 5px rgba(0,0,0,.95), inset 0 -1px 1px rgba(255,255,255,.12)',
              }}
            />
            {/* Domed button face */}
            <div
              className="absolute inset-[5px] flex items-center justify-center rounded-[8px] transition-[filter] duration-300 group-hover:brightness-125"
              style={{
                background:
                  'radial-gradient(circle at 32% 24%, #4a5057 0%, #2a2e33 40%, #15181b 100%)',
                boxShadow:
                  'inset 0 1.5px 1px rgba(255,255,255,.35), inset 0 -3px 4px rgba(0,0,0,.7), inset 2px 0 3px rgba(255,255,255,.06)',
              }}
            >
              {/* Glow bleeding onto the button */}
              <div
                className="absolute inset-0 rounded-[8px] opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 55%, ${accent.glow}, transparent 70%)`,
                }}
              />
              {/* Lower-lip highlight + cavity shadow = engraved symbol */}
              <Icon
                className="absolute h-7 w-7 translate-y-[1.5px] text-white/25"
                strokeWidth={2}
                aria-hidden="true"
              />
              <Icon
                className={cn(
                  'relative h-7 w-7 transition-transform duration-500 group-hover:rotate-[8deg]',
                  accent.text
                )}
                strokeWidth={2}
                style={{
                  filter: `drop-shadow(0 0 4px ${accent.glow}) drop-shadow(0 1px 1px rgba(0,0,0,.9))`,
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="relative z-10 mt-auto">
            <h3
              className={cn(
                'mb-1 text-[16px] font-bold tracking-tight text-text-primary transition-colors',
                accent.hoverText
              )}
              style={{ textShadow: '0 -1px 0 rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.06)' }}
            >
              {action.label}
            </h3>
            <p className="text-[13px] font-medium text-text-muted">
              {action.description}
            </p>
          </div>

          {/* Corner screws */}
          <Screw className="left-2.5 top-2.5" angle={30} />
          <Screw className="right-2.5 top-2.5" angle={-50} />
          <Screw className="bottom-2.5 left-2.5" angle={75} />
          <Screw className="bottom-2.5 right-2.5" angle={10} />
        </div>
      </div>
    </Link>
  );
}

export function ActionCards() {
  return (
    <section className="bg-charcoal pb-4 pt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {ACTIONS.map((action) => (
            <ActionCard key={action.label} action={action} />
          ))}
        </div>
      </div>
    </section>
  );
}
