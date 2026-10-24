/* eslint-disable @typescript-eslint/no-explicit-any */
// components/layout/MobileBottomNav.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, MessageSquare, User, Plus, Store, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserProfileSheet } from './UserProfileSheet';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

export function MobileBottomNav() {
  const pathname = usePathname();
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);

  if (pathname?.startsWith('/signin') || pathname?.startsWith('/signup')) {
    return null;
  }

  const renderNavItem = (item: { label: string; href: string; icon: any }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;
    return (
      <Link
        key={item.label}
        href={item.href}
        className="flex flex-col items-center justify-center gap-1 w-full py-1"
      >
        <Icon
          className={cn('h-6 w-6 transition-colors', isActive ? 'text-primary' : 'text-text-muted')}
          strokeWidth={isActive ? 2.5 : 2}
        />
        <span className={cn('text-[10px] font-medium transition-colors', isActive ? 'text-primary' : 'text-text-muted')}>
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div className="relative bg-charcoal/95 backdrop-blur-xl border-t border-border-subtle pb-safe pt-2 px-2">
          <nav className="flex items-center justify-between relative h-14">
            <div className="flex-1 flex justify-around items-center">
              {renderNavItem({ label: 'Home', href: '/', icon: Home })}
              {renderNavItem({ label: 'Explore', href: '/search', icon: Search })}
            </div>

            <div className="relative w-16 flex justify-center">
              <div className="absolute -top-6 h-14 w-14 rounded-full bg-primary/20 blur-md" />
              <button
                onClick={() => setIsActionSheetOpen(true)}
                className="absolute -top-7 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform active:scale-95 cursor-pointer"
                aria-label="Open action menu"
              >
                <Plus className="h-7 w-7" strokeWidth={3} />
              </button>
            </div>

            <div className="flex-1 flex justify-around items-center">
              {renderNavItem({ label: 'Messages', href: '/messages', icon: MessageSquare })}
              
              <button
                onClick={() => setIsProfileSheetOpen(true)}
                className="flex flex-col items-center justify-center gap-1 w-full py-1"
              >
                <User
                  className={cn('h-6 w-6 transition-colors', isProfileSheetOpen ? 'text-primary' : 'text-text-muted')}
                  strokeWidth={isProfileSheetOpen ? 2.5 : 2}
                />
                <span className={cn('text-[10px] font-medium transition-colors', isProfileSheetOpen ? 'text-primary' : 'text-text-muted')}>
                  Profile
                </span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Action Menu Sheet - Floating Card Style */}
      <Sheet open={isActionSheetOpen} onOpenChange={setIsActionSheetOpen}>
        <SheetContent
          side="bottom"
          className="bg-charcoal-elevated border border-border-subtle rounded-[32px] p-6 pb-10 flex flex-col items-center mb-2 mx-auto w-[calc(100%-16px)] max-w-md"
        >
          {/* Swipe Handle */}
          <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-border-subtle" />

          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-charcoal border border-border-subtle shadow-inner">
            <Store className="h-8 w-8 text-primary" strokeWidth={1.5} />
          </div>

          <SheetHeader className="mb-6 text-center space-y-2">
            <SheetTitle className="text-xl font-bold text-text-primary">
              Start Selling on Safari Spares
            </SheetTitle>
            <p className="text-sm text-text-secondary max-w-[280px] mx-auto">
              Join 100+ verified shops. Reach thousands of buyers, manage your inventory, and grow your business.
            </p>
          </SheetHeader>

          <div className="w-full space-y-3">
            <SheetClose asChild>
              <Link href="/apply/shop" className="w-full block">
                <Button className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary-600 transition-colors">
                  Apply as a Shop
                </Button>
              </Link>
            </SheetClose>
            
            <SheetClose asChild>
              <Link href="/apply/mechanic" className="w-full block">
                <Button variant="outline" className="w-full h-12 rounded-full border-primary text-primary hover:bg-primary/10 font-semibold text-base transition-colors">
                  <Wrench className="h-4 w-4 mr-2" />
                  Apply as a Mechanic
                </Button>
              </Link>
            </SheetClose>
          </div>

          <SheetClose asChild>
            <button className="mt-5 text-sm text-text-muted hover:text-text-primary transition-colors py-2">
              Not now, just browsing.
            </button>
          </SheetClose>
        </SheetContent>
      </Sheet>

      {/* User Profile Sheet */}
      <UserProfileSheet 
        open={isProfileSheetOpen} 
        onOpenChange={setIsProfileSheetOpen} 
      />
    </>
  );
}