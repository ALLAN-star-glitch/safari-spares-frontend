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

  // Close search drawer when route changes
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none',
        scrolled
          ? 'bg-charcoal/95 backdrop-blur-xl border-b border-border-subtle shadow-md'
          : 'bg-gradient-to-b from-charcoal/90 via-charcoal/50 to-transparent border-b border-transparent',
      )}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col">
          {/* Top Row */}
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-[72px] gap-2">
            {/* Left: Mobile Menu + Logo */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-text-secondary hover:text-text-primary hover:bg-charcoal-higher rounded-full h-10 w-10 transition-colors focus-visible:ring-1 focus-visible:ring-primary"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="p-0 w-[85vw] max-w-[340px] flex flex-col h-full bg-charcoal border-r border-border-subtle"
                >
                  <SheetHeader className="p-4 border-b border-border-subtle flex-row items-center justify-between space-y-0 text-left shrink-0">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <div className="inline-flex items-center">
                      <Logo width={100} />
                    </div>
                  </SheetHeader>

                  {/* Scrollable Categories & Navigation */}
                  <div className="p-4 flex-1 overflow-y-auto space-y-6 touch-pan-y">
                    <div>
                      <p className="px-3 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                        Categories
                      </p>
                      <nav className="space-y-1">
                        {PART_CATEGORIES.map((cat) => (
                          <SheetClose asChild key={cat.value}>
                            <Link
                              href={`/search?category=${cat.value}`}
                              className="flex items-center min-h-[40px] px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-charcoal-elevated hover:text-text-primary active:bg-charcoal-higher transition-colors"
                            >
                              {cat.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </nav>
                    </div>
                  </div>

                  {/* Auth Actions in Drawer */}
                  <div className="p-4 border-t border-border-subtle bg-charcoal-elevated shrink-0 space-y-2 pb-safe">
                    <SheetClose asChild>
                      <Link href="/signin" className="w-full block">
                        <Button
                          variant="outline"
                          className="w-full h-11 justify-center border-border-subtle text-text-primary hover:bg-charcoal-higher font-medium"
                        >
                          Sign In
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/signup" className="w-full block">
                        <Button className="w-full h-11 justify-center bg-primary hover:bg-primary-600 text-primary-foreground font-semibold">
                          Get Started
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex items-center focus-visible:outline-none">
                <Logo width={100} className="sm:w-[110px]" />
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
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Mobile: Location Picker Toggle */}
              <div className="md:hidden flex items-center">
                <LocationPicker />
              </div>

              {/* Mobile: Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-text-secondary hover:text-text-primary hover:bg-charcoal-higher rounded-full h-10 w-10 transition-colors"
                onClick={handleSearchToggle}
                aria-label={isSearchOpen ? 'Close search' : 'Open search'}
              >
                {isSearchOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>

              {/* Desktop Auth Buttons */}
              <Link href="/signin" className="hidden sm:block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium text-text-secondary hover:text-primary transition-colors"
                >
                  Sign In
                </Button>
              </Link>

              <Link href="/signup" className="hidden sm:block">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary-600 text-primary-foreground font-semibold rounded-full px-4 h-9 shadow-sm"
                >
                  Get Started
                </Button>
              </Link>

              {/* Mobile Sign In Accent Button */}
              <Link href="/signin" className="sm:hidden">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary-600 text-primary-foreground font-semibold rounded-full px-3 h-8 text-xs"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Collapsible Search Container */}
          <div
            className={cn(
              'md:hidden transition-all duration-300 ease-in-out relative z-20 overflow-hidden',
              isSearchOpen
                ? 'max-h-20 pb-3 opacity-100'
                : 'max-h-0 opacity-0 pointer-events-none',
            )}
          >
            <div className="pt-1">
              <SearchBar autoFocus={shouldAutoFocus} />
            </div>
          </div>
        </div>
      </div>

      {/* Category strip — desktop only, always visible */}
      <CategoryStrip />
    </header>
  );
}
