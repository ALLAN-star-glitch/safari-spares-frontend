// components/layout/CategoryStrip.tsx

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PART_CATEGORIES } from '@/lib/constants';

/* Fine grain: makes the strip read as cast/machined metal, not flat CSS */
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

/* Keycap base — same physical grammar as HeroSection buttons */
const KEYCAP_BASE =
  'group relative inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-1.5 ' +
  'text-[13px] font-bold tracking-wide select-none outline-none ' +
  'transition-[transform,box-shadow,filter,color] duration-150 ease-out ' +
  'focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0C0E] ' +
  'motion-reduce:transition-none motion-reduce:transform-none';

/* Inactive: raised metal cap with a solid "underside" shadow */
const KEYCAP_IDLE =
  'text-text-secondary ' +
  'bg-[linear-gradient(180deg,#2B3035_0%,#1D2125_46%,#14171A_100%)] ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-2px_3px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.85),0_2px_0_#07080A,0_6px_10px_rgba(0,0,0,0.55)] ' +
  'hover:-translate-y-px hover:text-text-primary hover:brightness-115 ' +
  'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.24),inset_0_-2px_3px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.85),0_3px_0_#07080A,0_9px_16px_rgba(0,0,0,0.6)] ' +
  'active:translate-y-[2px] ' +
  'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_2px_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,0,0,0.85),0_1px_0_#07080A,0_3px_6px_rgba(0,0,0,0.5)]';

/* Active: pressed DOWN into the panel — inverted bevel, emerald under-glow */
const KEYCAP_ACTIVE =
  'text-primary translate-y-[2px] ' +
  'bg-[linear-gradient(180deg,#0B1512_0%,#0D1A15_50%,#0A120F_100%)] ' +
  'shadow-[inset_0_2px_4px_rgba(0,0,0,0.85),inset_0_-1px_0_rgba(20,184,122,0.28),0_0_0_1px_rgba(20,184,122,0.35),0_0_14px_rgba(20,184,122,0.18)] ' +
  'hover:brightness-110';

/* Embossed lettering: engraved text for idle, glowing inlay for active */
const TEXT_IDLE = {
  textShadow:
    '0 -1px 0 rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.5)',
};
const TEXT_ACTIVE = {
  textShadow:
    '0 -1px 0 rgba(0,0,0,0.8), 0 1px 0 rgba(20,184,122,0.35), 0 0 8px rgba(20,184,122,0.45)',
};

/* Recessed Phillips-style screw head */
function Screw({ className, angle }: { className: string; angle: number }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute z-10 h-[5px] w-[5px] rounded-full',
        className
      )}
      style={{
        background:
          'radial-gradient(circle at 35% 28%, #8a9097 0%, #4a4f55 40%, #17191c 100%)',
        boxShadow:
          '0 0 0 1px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.30), inset 0 -1px 1px rgba(0,0,0,0.7)',
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 block h-[0.5px] w-[4px] -translate-x-1/2 -translate-y-1/2 bg-black/80"
        style={{
          transform: `translate(-50%,-50%) rotate(${angle}deg)`,
          boxShadow: '0 0.5px 0 rgba(255,255,255,0.18)',
        }}
      />
    </span>
  );
}

export function CategoryStrip() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') ?? '';

  return (
    <div className="relative hidden lg:block border-t border-border-subtle/30 bg-[#0A0C0E]">
      {/* Lit rail along the top edge — same idiom as HeroSection's bottom rail */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(20,184,122,0.35) 25%, rgba(232,163,61,0.22) 60%, transparent)',
        }}
      />

      {/* Vignette: pulls the eye toward the row of switches */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* Cast-metal grain over the whole panel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: '140px 140px' }}
      />

      <div className="container relative mx-auto px-4">
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-3">
          {PART_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <Link
                key={cat.value}
                href={`/search?category=${cat.value}`}
                aria-current={isActive ? 'page' : undefined}
                className={cn(KEYCAP_BASE, isActive ? KEYCAP_ACTIVE : KEYCAP_IDLE)}
              >
                {/* Gloss on the upper half of idle caps */}
                {!isActive && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-[3px] top-[1px] h-1/2 rounded-t-md bg-gradient-to-b from-white/12 to-transparent"
                  />
                )}

                {/* Active: emerald LED strip along the bottom edge */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-3 bottom-[1px] h-[2px] rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(20,184,122,0.95), transparent)',
                      boxShadow: '0 0 10px 1px rgba(20,184,122,0.45)',
                    }}
                  />
                )}

                <span
                  className="relative z-10 inline-flex items-center gap-1.5"
                  style={isActive ? TEXT_ACTIVE : TEXT_IDLE}
                >
                  {cat.label}
                </span>

                {/* Corner screws — visible on both states, denser on active */}
                <Screw className="left-[3px] top-[3px]" angle={25} />
                <Screw className="right-[3px] top-[3px]" angle={-45} />
                <Screw className="bottom-[3px] left-[3px]" angle={70} />
                <Screw className="bottom-[3px] right-[3px]" angle={10} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}