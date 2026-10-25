// components/layout/MainHeader.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import { Logo } from '../shared/Logo';
import { SearchBar } from './SearchBar';
import { LocationPicker } from './LocationPicker';
import { CategoryStrip } from './CategoryStrip';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PART_CATEGORIES } from '@/lib/constants';
import { useEffect, useState } from 'react';

/* Fine grain: the header reads as a machined chassis, not a flat bar */
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

/* Icon-sized metal keycap — same physics as HeroSection's CTAs */
const KEYCAP_ICON =
  'group relative inline-flex items-center justify-center rounded-full h-9 w-9 sm:h-10 sm:w-10 select-none outline-none ' +
  'transition-[transform,box-shadow,filter,color] duration-150 ease-out ' +
  'bg-[linear-gradient(180deg,#3A4046_0%,#23272B_48%,#14171A_100%)] ' +
  'text-text-secondary ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-2px_3px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.85),0_2px_0_#07080A,0_6px_10px_rgba(0,0,0,0.5)] ' +
  'hover:-translate-y-px hover:text-text-primary hover:brightness-115 ' +
  'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-2px_3px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.85),0_3px_0_#07080A,0_9px_16px_rgba(0,0,0,0.55)] ' +
  'active:translate-y-[2px] ' +
  'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_2px_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,0,0,0.85),0_1px_0_#07080A,0_3px_6px_rgba(0,0,0,0.5)] ' +
  'focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ' +
  'motion-reduce:transition-none motion-reduce:transform-none';

/* Ghost keycap — "engraved label" button (Sign In on desktop) */
const KEYCAP_GHOST =
  'group relative inline-flex items-center justify-center rounded-full px-4 h-9 select-none outline-none ' +
  'text-sm font-medium text-text-secondary ' +
  'transition-[transform,box-shadow,filter,color] duration-150 ease-out ' +
  'bg-[linear-gradient(180deg,rgba(43,48,53,0.55)_0%,rgba(20,23,26,0.55)_100%)] ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-2px_3px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.65),0_2px_0_rgba(7,8,10,0.9),0_5px_10px_rgba(0,0,0,0.4)] ' +
  'hover:-translate-y-px hover:text-primary hover:brightness-115 ' +
  'active:translate-y-[1.5px] ' +
  'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_2px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.65),0_1px_0_rgba(7,8,10,0.9),0_3px_6px_rgba(0,0,0,0.4)] ' +
  'focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ' +
  'motion-reduce:transition-none motion-reduce:transform-none';

/* Primary keycap — matches HeroSection's "Find Parts" button exactly */
const KEYCAP_PRIMARY =
  'group/btn relative inline-flex items-center justify-center rounded-full px-4 h-9 select-none outline-none ' +
  'text-sm font-semibold text-primary-foreground ' +
  'transition-[transform,box-shadow,filter] duration-150 ease-out ' +
  'bg-[linear-gradient(180deg,#3FDBA0_0%,#14B87A_46%,#0E9A64_100%)] ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-3px_4px_rgba(0,0,0,0.22),0_0_0_1px_rgba(5,60,40,0.9),0_3px_0_#0A6B49,0_10px_18px_rgba(20,184,122,0.30)] ' +
  'hover:-translate-y-px hover:brightness-110 ' +
  'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.22),0_0_0_1px_rgba(5,60,40,0.9),0_4px_0_#0A6B49,0_14px_24px_rgba(20,184,122,0.42)] ' +
  'active:translate-y-[2px] ' +
  'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_3px_rgba(0,0,0,0.25),0_0_0_1px_rgba(5,60,40,0.9),0_1px_0_#0A6B49,0_4px_8px_rgba(20,184,122,0.25)] ' +
  'focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ' +
  'motion-reduce:transition-none motion-reduce:transform-none';

/* Extruded lettering on the primary cap */
const PRIMARY_TEXT_SHADOW = '0 1px 0 rgba(255,255,255,0.28)';
/* Engraved label for ghost caps */
const ENGRAVE_TEXT_SHADOW =
  '0 -1px 0 rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06)';

/* Recessed Phillips-style screw for the sheet header */
function Screw({ className, angle }: { className: string; angle: number }) {
  return (
    <span
      aria-hidden="true"
      className={cn('pointer-events-none absolute z-10 h-[7px] w-[7px] rounded-full', className)}
      style={{
        background:
          'radial-gradient(circle at 35% 28%, #8a9097 0%, #4a4f55 40%, #17191c 100%)',
        boxShadow:
          '0 0 0 1px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.30), inset 0 -1px 1px rgba(0,0,0,0.7)',
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 block h-[1px] w-[5px] -translate-x-1/2 -translate-y-1/2 bg-black/80"
        style={{
          transform: `translate(-50%,-50%) rotate(${angle}deg)`,
          boxShadow: '0 0.5px 0 rgba(255,255,255,0.18)',
        }}
      />
    </span>
  );
}

export function MainHeader() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [shouldAutoFocus, setShouldAutoFocus] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSearchOpen(false);
  }, [pathname]);

  if (pathname?.startsWith('/signin') || pathname?.startsWith('/signup')) {
    return null;
  }

  const handleSearchToggle = () => {
    const next = !isSearchOpen;
    setIsSearchOpen(next);
    if (next) {
      setShouldAutoFocus(true);
      setTimeout(() => setShouldAutoFocus(false), 100);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 select-none transition-all duration-300',
        // The chassis: brushed metal top surface with a live grain overlay
        scrolled
          ? 'bg-[linear-gradient(180deg,#1C2024_0%,#141719_55%,#0D0F11_100%)] backdrop-blur-xl border-b border-border-subtle'
          : 'bg-[linear-gradient(180deg,rgba(28,32,36,0.92)_0%,rgba(20,23,25,0.65)_55%,rgba(13,15,17,0.35)_100%)] backdrop-blur-md border-b border-white/[0.04]',
        // Physical depth: inset top highlight + heavy bottom drop
        scrolled
          ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.9),0_10px_24px_rgba(0,0,0,0.55)]'
          : 'shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_6px_16px_rgba(0,0,0,0.35)]'
      )}
    >
      {/* Cast-metal grain across the whole chassis */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: '160px 160px' }}
        aria-hidden="true"
      />

      {/* Lit rail along the bottom of the chassis — intensifies when scrolled */}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px transition-opacity duration-300',
          scrolled ? 'opacity-100' : 'opacity-40'
        )}
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(20,184,122,0.45) 25%, rgba(232,163,61,0.28) 60%, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-2 sm:px-4">
        <div className="flex flex-col">
          {/* Top Row */}
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-[72px] gap-1 sm:gap-2 min-w-0">

            {/* Left: Mobile Menu + Logo */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className={cn(KEYCAP_ICON, 'lg:hidden')}
                    aria-label="Open navigation menu"
                  >
                    {/* Gloss on the upper half of the cap */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-[3px] top-[2px] h-1/2 rounded-t-full bg-gradient-to-b from-white/14 to-transparent"
                    />
                    <Menu className="relative h-5 w-5" />
                  </button>
                </SheetTrigger>

                {/* Drawer: a machined plate that slides in */}
                <SheetContent
                  side="left"
                  className={cn(
                    'p-0 w-[85vw] max-w-[340px] flex flex-col h-full border-r border-black/60',
                    'bg-[linear-gradient(180deg,#1B1F23_0%,#111417_60%,#0A0C0E_100%)]',
                    'shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_-1px_0_0_rgba(0,0,0,0.9),8px_0_24px_rgba(0,0,0,0.6)]'
                  )}
                >
                  {/* Grain overlay for the plate */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
                    style={{ backgroundImage: NOISE, backgroundSize: '140px 140px' }}
                    aria-hidden="true"
                  />

                  <SheetHeader className="relative p-4 border-b border-white/[0.06] flex-row items-center justify-between space-y-0 text-left shrink-0">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <div className="inline-flex items-center">
                      <Logo width={100} />
                    </div>
                    {/* Corner screws — the plate is bolted to the chassis */}
                    <Screw className="right-2 top-2" angle={20} />
                    <Screw className="bottom-2 right-2" angle={-40} />
                  </SheetHeader>

                  {/* Scrollable Categories & Navigation */}
                  <div className="relative p-4 flex-1 overflow-y-auto space-y-6 touch-pan-y">
                    <div>
                      <p
                        className="px-3 text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2"
                        style={{ textShadow: ENGRAVE_TEXT_SHADOW }}
                      >
                        Categories
                      </p>
                      <nav className="space-y-1">
                        {PART_CATEGORIES.map((cat) => (
                          <SheetClose asChild key={cat.value}>
                            <Link
                              href={`/search?category=${cat.value}`}
                              className={cn(
                                // Pressed-in row: inset shadows say "recessed into the plate"
                                'group/row flex items-center min-h-[40px] px-3 py-2 rounded-md text-sm text-text-secondary',
                                'bg-[linear-gradient(180deg,rgba(10,12,14,0.7)_0%,rgba(20,23,26,0.6)_100%)]',
                                'shadow-[inset_0_1px_2px_rgba(0,0,0,0.7),inset_0_-1px_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(0,0,0,0.5)]',
                                'transition-[color,box-shadow,background] duration-200',
                                'hover:text-primary',
                                'hover:shadow-[inset_0_1px_2px_rgba(0,0,0,0.7),inset_0_-1px_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(20,184,122,0.35),0_0_10px_rgba(20,184,122,0.15)]',
                                'active:brightness-90'
                              )}
                            >
                              {/* LED bleed on hover */}
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity"
                                style={{
                                  background: 'rgba(20,184,122,0.95)',
                                  boxShadow: '0 0 8px 1px rgba(20,184,122,0.6)',
                                }}
                              />
                              <span style={{ textShadow: ENGRAVE_TEXT_SHADOW }}>
                                {cat.label}
                              </span>
                            </Link>
                          </SheetClose>
                        ))}
                      </nav>
                    </div>
                  </div>

                  {/* Auth Actions in Drawer */}
                  <div className="relative p-4 border-t border-white/[0.06] shrink-0 space-y-2 pb-safe bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_100%)]">
                    <SheetClose asChild>
                      <Link href="/signin" className="w-full block">
                        <span className={cn(KEYCAP_GHOST, 'w-full h-11 justify-center')}>
                          <span style={{ textShadow: ENGRAVE_TEXT_SHADOW }}>Sign In</span>
                        </span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/signup" className="w-full block">
                        <span className={cn(KEYCAP_PRIMARY, 'w-full h-11 justify-center')}>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-[3px] top-[2px] h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent"
                          />
                          <span className="relative" style={{ textShadow: PRIMARY_TEXT_SHADOW }}>
                            Get Started
                          </span>
                        </span>
                      </Link>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex items-center shrink-0 focus-visible:outline-none">
                <Logo width={85} className="xs:w-[100px] sm:w-[110px]" />
              </Link>
            </div>

            {/* Desktop: Location + Search */}
            <div className="hidden md:flex flex-1 items-center gap-2 mx-4 max-w-3xl">
              <LocationPicker />
              <div className="flex-1">
                <SearchBar />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Mobile: Location Picker Toggle */}
              <div className="md:hidden flex items-center shrink-0">
                <LocationPicker />
              </div>

              {/* Mobile: Search Toggle (metal keycap) */}
              <button
                type="button"
                className={cn(KEYCAP_ICON, 'md:hidden h-8 w-8 sm:h-9 sm:w-9')}
                onClick={handleSearchToggle}
                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-[3px] top-[2px] h-1/2 rounded-t-full bg-gradient-to-b from-white/14 to-transparent"
                />
                {isSearchOpen ? (
                  <X className="relative h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Search className="relative h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>

              {/* Desktop Sign In (ghost keycap) */}
              <Link href="/signin" className="hidden sm:block">
                <span className={KEYCAP_GHOST}>
                  <span style={{ textShadow: ENGRAVE_TEXT_SHADOW }}>Sign In</span>
                </span>
              </Link>

              {/* Desktop Get Started (primary keycap) */}
              <Link href="/signup" className="hidden sm:block">
                <span className={KEYCAP_PRIMARY}>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-[3px] top-[2px] h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent"
                  />
                  <span className="relative" style={{ textShadow: PRIMARY_TEXT_SHADOW }}>
                    Get Started
                  </span>
                </span>
              </Link>

              {/* Mobile Sign In (compact primary keycap) */}
              <Link href="/signin" className="sm:hidden shrink-0">
                <span className={cn(KEYCAP_PRIMARY, 'px-3 h-8 text-xs')}>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-[3px] top-[2px] h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent"
                  />
                  <span className="relative" style={{ textShadow: PRIMARY_TEXT_SHADOW }}>
                    Sign In
                  </span>
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Collapsible Search Container — slides out of the chassis */}
          <div
            className={cn(
              'md:hidden transition-all duration-300 ease-in-out relative z-20 overflow-hidden',
              isSearchOpen ? 'max-h-20 pb-3 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
            )}
          >
            <div className="pt-1">
              <SearchBar autoFocus={shouldAutoFocus} />
            </div>
          </div>
        </div>
      </div>

      {/* Category strip — desktop only (already upgraded) */}
      <CategoryStrip />
    </header>
  );
}