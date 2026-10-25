'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef } from 'react';
import Link from 'next/link';
import {
  Cog,
  Zap,
  Wrench,
  CarFront,
  CircleDashed,
  Settings2,
  Disc,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const CATEGORY_ICONS: Record<string, any> = {
  'engine-drivetrain': Cog,
  'brakes-suspension': Disc,
  'electrical-lighting': Zap,
  'body-exterior': CarFront,
  'filters-fluids': CircleDashed,
  'tyres-wheels': Settings2,
  'interior-accessories': CarFront,
  'tools-equipment': Wrench,
};

type CategoryTheme = {
  shape: string;
  material: string;
  convexity: 'convex' | 'concave';
  borderColor: string;
  iconColor: string;
  iconHex: string;
  glow: string;
};

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  'engine-drivetrain': {
    shape: 'polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)',
    material:
      'bg-[linear-gradient(145deg,#656C74_0%,#343A41_18%,#171B20_58%,#41474D_100%)]',
    convexity: 'convex',
    borderColor: '#777F87',
    iconColor: 'text-[#14B87A]',
    iconHex: '#14B87A',
    glow: 'rgba(20,184,122,0.35)',
  },
  'brakes-suspension': {
    shape: 'circle(48% at 50% 50%)',
    material:
      'bg-[conic-gradient(from_20deg,#858B90,#292D31,#62686D,#171A1D,#777D82,#25292D,#858B90)]',
    convexity: 'concave',
    borderColor: '#858B90',
    iconColor: 'text-[#E8A33D]',
    iconHex: '#E8A33D',
    glow: 'rgba(232,163,61,0.35)',
  },
  'electrical-lighting': {
    shape: 'polygon(50% 0%,90% 20%,90% 80%,50% 100%,10% 80%,10% 20%)',
    material:
      'bg-[linear-gradient(135deg,#706044_0%,#30291D_25%,#15130F_70%,#51432C_100%)]',
    convexity: 'convex',
    borderColor: '#81704B',
    iconColor: 'text-[#FACC15]',
    iconHex: '#FACC15',
    glow: 'rgba(250,204,21,0.35)',
  },
  'body-exterior': {
    shape: 'polygon(10% 10%,90% 10%,90% 80%,50% 100%,10% 80%)',
    material:
      'bg-[linear-gradient(145deg,#747C85_0%,#353C44_20%,#171A1F_65%,#414852_100%)]',
    convexity: 'convex',
    borderColor: '#727A84',
    iconColor: 'text-[#F2F2F2]',
    iconHex: '#F2F2F2',
    glow: 'rgba(255,255,255,0.25)',
  },
  'filters-fluids': {
    shape: 'polygon(20% 0%,80% 0%,90% 100%,10% 100%)',
    material:
      'bg-[linear-gradient(90deg,#14191D_0%,#53646C_20%,#202C32_48%,#101519_78%,#4B5A62_100%)]',
    convexity: 'convex',
    borderColor: '#66777F',
    iconColor: 'text-[#60A5FA]',
    iconHex: '#60A5FA',
    glow: 'rgba(96,165,250,0.35)',
  },
  'tyres-wheels': {
    shape: 'circle(50% at 50% 50%)',
    material:
      'bg-[radial-gradient(circle_at_35%_28%,#747A7F_0%,#353A3F_18%,#111315_48%,#282C30_63%,#070809_76%,#52575B_83%,#141618_100%)]',
    convexity: 'concave',
    borderColor: '#696F74',
    iconColor: 'text-[#D9DEE2]',
    iconHex: '#D9DEE2',
    glow: 'rgba(255,255,255,0.22)',
  },
  'interior-accessories': {
    shape: 'polygon(20% 0%,80% 0%,100% 100%,0% 100%)',
    material:
      'bg-[linear-gradient(130deg,#71554D_0%,#3D2B28_25%,#191514_68%,#574039_100%)]',
    convexity: 'convex',
    borderColor: '#806056',
    iconColor: 'text-[#FDBA74]',
    iconHex: '#FDBA74',
    glow: 'rgba(253,186,116,0.32)',
  },
  'tools-equipment': {
    shape:
      'polygon(35% 0%,65% 0%,65% 35%,100% 35%,100% 65%,65% 65%,65% 100%,35% 100%,35% 65%,0% 65%,0% 35%,35% 35%)',
    material:
      'bg-[linear-gradient(135deg,#92918B_0%,#4D4C48_18%,#242422_52%,#111211_76%,#64635E_100%)]',
    convexity: 'convex',
    borderColor: '#898781',
    iconColor: 'text-[#D4D4D8]',
    iconHex: '#D4D4D8',
    glow: 'rgba(212,212,216,0.28)',
  },
};

/* Fine grain so the surface reads as cast / machined metal, not flat CSS */
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

/* Real thickness: stacked copies of the shape pushed back in Z */
const DEPTH_LAYERS = 9;
const DEPTH_STEP = 1.15; // px per layer

interface CategoryCardProps {
  cat: {
    label: string;
    value: string;
  };
}

export function CategoryCard({ cat }: CategoryCardProps) {
  const rootRef = useRef<HTMLAnchorElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const Icon = CATEGORY_ICONS[cat.value] || Cog;
  const theme =
    CATEGORY_THEMES[cat.value] || CATEGORY_THEMES['engine-drivetrain'];
  const isConvex = theme.convexity === 'convex';

  const lighter = `color-mix(in srgb, ${theme.borderColor} 55%, white)`;
  const darker = `color-mix(in srgb, ${theme.borderColor} 25%, #050607)`;

  /* ---- pointer-driven tilt + moving light (no re-renders) ---- */
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
    root.style.setProperty('--rx', `${(-y * 22).toFixed(2)}deg`);
    root.style.setProperty('--ry', `${(x * 22).toFixed(2)}deg`);
    root.style.setProperty('--lx', `${((0.5 + x) * 100).toFixed(1)}%`);
    root.style.setProperty('--ly', `${((0.5 + y) * 100).toFixed(1)}%`);
    root.style.setProperty('--sx', `${(-x * 14).toFixed(1)}px`);
  };

  const handleLeave = () => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    stage.style.transition = 'transform 650ms cubic-bezier(.2,.8,.2,1)';
    root.style.setProperty('--rx', '0deg');
    root.style.setProperty('--ry', '0deg');
    root.style.setProperty('--lx', '30%');
    root.style.setProperty('--ly', '20%');
    root.style.setProperty('--sx', '0px');
  };

  const rimGradient = isConvex
    ? `linear-gradient(145deg, ${lighter} 0%, ${theme.borderColor} 20%, #0b0c0e 52%, ${theme.borderColor} 82%, ${lighter} 100%)`
    : `linear-gradient(325deg, ${lighter} 0%, ${theme.borderColor} 20%, #0b0c0e 52%, ${theme.borderColor} 82%, ${lighter} 100%)`;

  return (
    <Link
      ref={rootRef}
      href={`/search?category=${cat.value}`}
      className="group flex flex-col items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label={`Browse ${cat.label}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={
        {
          '--rx': '0deg',
          '--ry': '0deg',
          '--lx': '30%',
          '--ly': '20%',
          '--sx': '0px',
        } as React.CSSProperties
      }
    >
      {/* Lift wrapper (hover raise / press) */}
      <div
        className={cn(
          'relative h-20 w-20 sm:h-24 sm:w-24',
          'transition-transform duration-300 ease-out',
          'group-hover:-translate-y-2 group-active:translate-y-0 group-active:scale-[0.96]',
          'motion-reduce:transform-none motion-reduce:transition-none'
        )}
        style={{ perspective: '520px' }}
      >
        {/* Ground shadows: ambient + contact. Shrink and soften as the object lifts */}
        <div
          className="absolute inset-x-0 bottom-0 flex justify-center transition-all duration-300 group-hover:translate-y-2 group-hover:scale-[0.82] group-hover:opacity-70"
          aria-hidden="true"
        >
          <div
            className="h-[16%] w-[84%] rounded-[50%] bg-black/55 blur-[10px]"
            style={{ transform: 'translateX(var(--sx))' }}
          />
        </div>
        <div
          className="absolute inset-x-0 bottom-[3%] flex justify-center transition-all duration-300 group-hover:scale-[0.7] group-hover:opacity-50"
          aria-hidden="true"
        >
          <div
            className="h-[9%] w-[58%] rounded-[50%] bg-black/90 blur-[3px]"
            style={{ transform: 'translateX(var(--sx))' }}
          />
        </div>

        {/* 3D stage */}
        <div
          ref={stageRef}
          className="absolute inset-0 motion-reduce:!transform-none"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(var(--rx)) rotateY(var(--ry))',
            willChange: 'transform',
          }}
        >
          {/* Extruded side walls: real thickness visible when tilted */}
          {Array.from({ length: DEPTH_LAYERS }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-[5%]"
              style={{
                clipPath: theme.shape,
                transform: `translateZ(${-(i + 1) * DEPTH_STEP}px)`,
                background: `color-mix(in srgb, ${theme.borderColor} ${Math.max(
                  6,
                  42 - i * 5
                )}%, #050607)`,
              }}
              aria-hidden="true"
            />
          ))}

          {/* Rim: machined, light-catching bevel */}
          <div
            className="absolute inset-[2%]"
            style={{
              clipPath: theme.shape,
              background: rimGradient,
              transform: 'translateZ(0px)',
            }}
            aria-hidden="true"
          />

          {/* Bevel shadow ring: separates rim from face */}
          <div
            className="absolute inset-[4.2%]"
            style={{
              clipPath: theme.shape,
              background: isConvex
                ? `linear-gradient(145deg, ${darker}, #050607 60%, ${darker})`
                : `linear-gradient(325deg, ${darker}, #050607 60%, ${darker})`,
              transform: 'translateZ(0.3px)',
            }}
            aria-hidden="true"
          />

          {/* Main face */}
          <div
            className={cn(
              'absolute inset-[5.5%] overflow-hidden',
              theme.material,
              'transition-[filter] duration-300 group-hover:brightness-110'
            )}
            style={{
              clipPath: theme.shape,
              transform: `translateZ(${isConvex ? 0.8 : -0.4}px)`,
              boxShadow: isConvex
                ? 'inset 0 2px 2px rgba(255,255,255,.6), inset 2px 0 4px rgba(255,255,255,.12), inset 0 -6px 9px rgba(0,0,0,.9), inset -3px 0 6px rgba(0,0,0,.5)'
                : 'inset 0 7px 11px rgba(0,0,0,.95), inset 4px 0 8px rgba(0,0,0,.5), inset 0 -2px 2px rgba(255,255,255,.25)',
            }}
            aria-hidden="true"
          >
            {/* Dome shading: sells convex / concave curvature */}
            <div
              className="absolute inset-0"
              style={{
                background: isConvex
                  ? 'radial-gradient(circle at 50% 38%, rgba(255,255,255,.14), transparent 55%), radial-gradient(circle at 50% 100%, rgba(0,0,0,.55), transparent 60%)'
                  : 'radial-gradient(circle at 50% 62%, rgba(255,255,255,.10), transparent 50%), radial-gradient(circle at 50% 0%, rgba(0,0,0,.65), transparent 62%)',
              }}
            />

            {/* Brushed anisotropic streaks */}
            <div
              className="absolute inset-0 opacity-40 mix-blend-overlay"
              style={{
                background:
                  'repeating-linear-gradient(100deg, transparent 0px, rgba(255,255,255,.22) 0.6px, transparent 1.4px, transparent 3.2px, rgba(0,0,0,.2) 3.8px, transparent 4.6px)',
              }}
            />

            {/* Cast-metal grain */}
            <div
              className="absolute inset-0 opacity-[0.22] mix-blend-soft-light"
              style={{ backgroundImage: NOISE, backgroundSize: '70px 70px' }}
            />

            {/* Coloured light bleeding in from the icon on hover */}
            <div
              className="absolute -inset-3 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 50% 55%, ${theme.glow}, transparent 68%)`,
              }}
            />
          </div>

          {/* Recessed seat the icon sits in */}
          <div
            className="absolute inset-[17%]"
            style={{
              clipPath: theme.shape,
              transform: 'translateZ(1.2px)',
              background: isConvex
                ? 'linear-gradient(145deg, rgba(0,0,0,.45), rgba(255,255,255,.04))'
                : 'linear-gradient(145deg, rgba(0,0,0,.55), rgba(255,255,255,.06))',
              boxShadow:
                'inset 0 3px 5px rgba(0,0,0,.8), inset 0 -1px 1px rgba(255,255,255,.18)',
            }}
            aria-hidden="true"
          />

          {/* Moving specular highlight: follows the pointer, brightens on hover */}
          <div
            className="pointer-events-none absolute inset-[5.5%] opacity-60 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
            style={{
              clipPath: theme.shape,
              transform: 'translateZ(1.6px)',
              background:
                'radial-gradient(circle at var(--lx) var(--ly), rgba(255,255,255,.55) 0%, rgba(255,255,255,.14) 22%, transparent 48%)',
            }}
            aria-hidden="true"
          />

          {/* Sharp top-edge catch-light + bottom bounce light */}
          <div
            className="pointer-events-none absolute inset-[5.5%] opacity-50 transition-opacity duration-300 group-hover:opacity-90"
            style={{
              clipPath: theme.shape,
              transform: 'translateZ(1.8px)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,.5), transparent 9%, transparent 88%, rgba(255,255,255,.12) 100%)',
            }}
            aria-hidden="true"
          />

          {/* Icon floats above the face for parallax; engraved + softly lit */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: 'translateZ(9px)' }}
            aria-hidden="true"
          >
            {/* Lower lip highlight (the bevel of the engraving) */}
            <Icon
              className="absolute h-8 w-8 translate-y-[1.5px] text-white/30 sm:h-10 sm:w-10"
              strokeWidth={1.7}
            />
            {/* Cavity shadow */}
            <Icon
              className="absolute h-8 w-8 -translate-y-[1px] text-black/70 sm:h-10 sm:w-10"
              strokeWidth={1.9}
              style={{ filter: 'blur(0.6px)' }}
            />
            {/* Lit inlay */}
            <Icon
              className={cn(
                'relative h-8 w-8 sm:h-10 sm:w-10',
                'transition-[filter,transform] duration-300 group-hover:scale-110',
                theme.iconColor
              )}
              strokeWidth={1.7}
              style={{
                filter: `drop-shadow(0 0 3px ${theme.glow}) drop-shadow(0 2px 2px rgba(0,0,0,.8))`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Category label */}
      <span className="max-w-full text-center text-[12px] font-semibold tracking-wide text-text-secondary transition-colors duration-200 group-hover:text-text-primary sm:text-[14px]">
        {cat.label.split(' & ')[0]}
      </span>
    </Link>
  );
}
