/* eslint-disable @typescript-eslint/no-explicit-any */
// components/layout/MobileBottomNav.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, MessageSquare, User, Plus, Store, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserProfileSheet } from './UserProfileSheet';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

/* Recessed Phillips-style screw head */
function Screw({ className, angle }: { className: string; angle: number }) {
  return (
    <span
      aria-hidden="true"
      className={cn('pointer-events-none absolute z-10 h-[7px] w-[7px] rounded-full', className)}
      style={{
        background: 'radial-gradient(circle at 35% 28%, #8a9097 0%, #4a4f55 40%, #17191c 100%)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.30), inset 0 -1px 1px rgba(0,0,0,0.7)',
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 block h-[1px] w-[5px] -translate-x-1/2 -translate-y-1/2 bg-black/80"
        style={{ transform: `translate(-50%,-50%) rotate(${angle}deg)`, boxShadow: '0 0.5px 0 rgba(255,255,255,0.18)' }}
      />
    </span>
  );
}

const ENGRAVE_TEXT_SHADOW = '0 -1px 0 rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.05)';
const ACTIVE_TEXT_SHADOW = '0 -1px 0 rgba(0,0,0,0.85), 0 1px 0 rgba(20,184,122,0.35), 0 0 6px rgba(20,184,122,0.45)';
const PRIMARY_TEXT_SHADOW = '0 1px 0 rgba(255,255,255,0.28)';

const KEYCAP_PRIMARY_CIRCLE =
  'group/btn absolute -top-7 z-50 flex h-14 w-14 items-center justify-center rounded-full select-none outline-none cursor-pointer ' +
  'text-primary-foreground ' +
  'transition-[transform,box-shadow,filter] duration-150 ease-out ' +
  'bg-[linear-gradient(180deg,#3FDBA0_0%,#14B87A_46%,#0E9A64_100%)] ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.22),0_0_0_1px_rgba(5,60,40,0.9),0_4px_0_#0A6B49,0_12px_22px_rgba(20,184,122,0.35)] ' +
  'hover:-translate-y-px hover:brightness-110 ' +
  'active:translate-y-[3px] ' +
  'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_3px_rgba(0,0,0,0.25),0_0_0_1px_rgba(5,60,40,0.9),0_1px_0_#0A6B49,0_4px_8px_rgba(20,184,122,0.25)] ' +
  'focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ' +
  'motion-reduce:transition-none motion-reduce:transform-none';

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
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'group/nav relative flex flex-col items-center justify-center gap-1 w-full py-1 rounded-lg outline-none',
          'transition-[color,transform,box-shadow,background] duration-150 ease-out',
          'focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-1 focus-visible:ring-offset-charcoal motion-reduce:transition-none',
          isActive
            ? 'text-primary bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(13,20,17,0.55)_100%)] shadow-[inset_0_2px_3px_rgba(0,0,0,0.8),inset_0_-1px_0_rgba(20,184,122,0.25),0_0_0_1px_rgba(20,184,122,0.25)]'
            : 'text-text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,0,0,0.35)] hover:text-text-primary hover:bg-[rgba(255,255,255,0.03)]'
        )}
      >
        {isActive && (
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1 -translate-x-1/2 h-1 w-6 rounded-full" style={{
            background: 'radial-gradient(ellipse at center, rgba(20,184,122,0.75) 0%, rgba(20,184,122,0) 70%)',
            filter: 'blur(1px)',
          }} />
        )}
        <Icon className={cn('h-6 w-6 relative z-10 transition-[filter,transform] duration-150', isActive ? 'scale-105' : 'group-hover/nav:scale-105')} strokeWidth={isActive ? 2.5 : 2} style={{
          filter: isActive ? 'drop-shadow(0 0 4px rgba(20,184,122,0.55)) drop-shadow(0 1px 1px rgba(0,0,0,0.8))' : 'drop-shadow(0 1px 0 rgba(0,0,0,0.5))',
        }} />
        <span className="relative z-10 text-[10px] font-semibold tracking-wide" style={{ textShadow: isActive ? ACTIVE_TEXT_SHADOW : ENGRAVE_TEXT_SHADOW }}>
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div
          className={cn(
            'relative pb-safe pt-2 px-2 backdrop-blur-xl',
            'bg-[linear-gradient(180deg,#1C2024_0%,#141719_55%,#0A0C0E_100%)]'
          )}
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.9), 0 -10px 24px rgba(0,0,0,0.5)',
          }}
        >
          {/* Lit rail along the top edge */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px" style={{
            background: 'linear-gradient(90deg, transparent, rgba(20,184,122,0.45) 25%, rgba(232,163,61,0.28) 60%, transparent)',
          }} aria-hidden="true" />

          <nav className="relative flex items-center justify-between h-14">
            <div className="flex-1 flex justify-around items-center gap-1">
              {renderNavItem({ label: 'Home', href: '/', icon: Home })}
              {renderNavItem({ label: 'Explore', href: '/search', icon: Search })}
            </div>

            <div className="relative w-16 flex justify-center">
              <div aria-hidden="true" className="absolute -top-6 h-14 w-14 rounded-full blur-md" style={{ background: 'rgba(20,184,122,0.28)' }} />
              <div aria-hidden="true" className="absolute -top-2 h-6 w-12 rounded-[50%] bg-black/60 blur-md" />
              
              <button 
                onClick={() => setIsActionSheetOpen(true)} 
                className={KEYCAP_PRIMARY_CIRCLE} 
                aria-label="Open action menu"
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-[3px] top-[2px] h-1/2 rounded-t-full bg-gradient-to-b from-white/35 to-transparent" />
                <Plus className="relative h-7 w-7" strokeWidth={3} style={{
                  filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.25)) drop-shadow(0 2px 1px rgba(0,0,0,0.35))',
                }} />
              </button>
            </div>

            <div className="flex-1 flex justify-around items-center gap-1">
              {renderNavItem({ label: 'Messages', href: '/messages', icon: MessageSquare })}

              <button
                onClick={() => setIsProfileSheetOpen(true)}
                className={cn(
                  'group/nav relative flex flex-col items-center justify-center gap-1 w-full py-1 rounded-lg outline-none',
                  'transition-[color,transform,box-shadow,background] duration-150 ease-out',
                  'focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-1 focus-visible:ring-offset-charcoal',
                  isProfileSheetOpen
                    ? 'text-primary bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(13,20,17,0.55)_100%)] shadow-[inset_0_2px_3px_rgba(0,0,0,0.8),inset_0_-1px_0_rgba(20,184,122,0.25),0_0_0_1px_rgba(20,184,122,0.25)]'
                    : 'text-text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,0,0,0.35)] hover:text-text-primary hover:bg-[rgba(255,255,255,0.03)]'
                )}
              >
                {isProfileSheetOpen && (
                  <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1 -translate-x-1/2 h-1 w-6 rounded-full" style={{
                    background: 'radial-gradient(ellipse at center, rgba(20,184,122,0.75) 0%, rgba(20,184,122,0) 70%)',
                    filter: 'blur(1px)',
                  }} />
                )}
                <User className={cn('h-6 w-6 relative z-10 transition-[filter,transform] duration-150', isProfileSheetOpen ? 'scale-105' : 'group-hover/nav:scale-105')} strokeWidth={isProfileSheetOpen ? 2.5 : 2} style={{
                  filter: isProfileSheetOpen ? 'drop-shadow(0 0 4px rgba(20,184,122,0.55)) drop-shadow(0 1px 1px rgba(0,0,0,0.8))' : 'drop-shadow(0 1px 0 rgba(0,0,0,0.5))',
                }} />
                <span className="relative z-10 text-[10px] font-semibold tracking-wide" style={{ textShadow: isProfileSheetOpen ? ACTIVE_TEXT_SHADOW : ENGRAVE_TEXT_SHADOW }}>
                  Profile
                </span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Action Menu Sheet */}
      <Sheet open={isActionSheetOpen} onOpenChange={setIsActionSheetOpen}>
        <SheetContent
          side="bottom"
          className={cn(
            // Added bg-charcoal and z-[100] to ensure it's visible and opaque
            'z-[100] bg-charcoal border border-border-subtle rounded-[32px] p-6 pb-10 flex flex-col items-center mb-2 mx-auto w-[calc(100%-16px)] max-w-md',
            'shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.9),0_-12px_28px_rgba(0,0,0,0.6)]'
          )}
        >
          {/* Required by Radix for screen readers */}
          <SheetTitle className="sr-only">Seller Actions</SheetTitle>

          {/* Corner screws */}
          <Screw className="left-3 top-3" angle={30} />
          <Screw className="right-3 top-3" angle={-50} />
          <Screw className="left-3 bottom-3" angle={75} />
          <Screw className="right-3 bottom-3" angle={10} />

          {/* Machined grip bar */}
          <div className="relative mx-auto mb-6 h-1.5 w-12 rounded-full" aria-hidden="true">
            <div className="absolute inset-0 rounded-full" style={{
              background: 'linear-gradient(180deg,#3A4046_0%,#1C2024_55%,#0B0D0F_100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.04)',
            }} />
            <div className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Icon bezel */}
          <div className="relative z-10 mb-4 h-16 w-16 transition-transform duration-300 hover:scale-105" style={{ filter: 'drop-shadow(0 6px 5px rgba(0,0,0,0.65))' }}>
            <div className="absolute inset-0 rounded-2xl" style={{
              background: 'linear-gradient(145deg, #8d949b 0%, #3b4147 30%, #0c0e10 58%, #4d545b 100%)',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.8), 0 0 0 2px rgba(20,184,122,0.20)',
            }} />
            <div className="absolute inset-[3px] rounded-[13px]" style={{
              background: '#08090a',
              boxShadow: 'inset 0 3px 5px rgba(0,0,0,0.95), inset 0 -1px 1px rgba(255,255,255,0.12)',
            }} />
            <div className="absolute inset-[5px] flex items-center justify-center rounded-[11px]" style={{
              background: 'radial-gradient(circle at 32% 24%, #4a5057 0%, #2a2e33 40%, #15181b 100%)',
              boxShadow: 'inset 0 1.5px 1px rgba(255,255,255,0.35), inset 0 -3px 4px rgba(0,0,0,0.7)',
            }}>
              <div className="absolute inset-0 rounded-[11px] opacity-70" style={{
                background: 'radial-gradient(circle at 50% 55%, rgba(20,184,122,0.35), transparent 70%)',
              }} aria-hidden="true" />
              <Store className="relative h-8 w-8 text-primary" strokeWidth={1.5} style={{
                filter: 'drop-shadow(0 0 4px rgba(20,184,122,0.55)) drop-shadow(0 1px 1px rgba(0,0,0,0.9))',
              }} />
            </div>
          </div>

          <SheetHeader className="mb-6 text-center space-y-2">
            <SheetTitle className="text-xl font-bold text-text-primary" style={{ textShadow: '0 -1px 0 rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.05)' }}>
              Start Selling on Safari Spares
            </SheetTitle>
            <p className="text-sm text-text-secondary max-w-[280px] mx-auto">
              Join 100+ verified shops. Reach thousands of buyers, manage your inventory, and grow your business.
            </p>
          </SheetHeader>

          <div className="relative z-10 w-full space-y-3">
            <SheetClose asChild>
              <Link href="/apply/shop" className="w-full block">
                <span className={cn(
                  'group/btn relative inline-flex w-full items-center justify-center rounded-full h-12 px-6 select-none outline-none',
                  'text-primary-foreground font-semibold text-base transition-[transform,box-shadow,filter] duration-150 ease-out',
                  'bg-[linear-gradient(180deg,#3FDBA0_0%,#14B87A_46%,#0E9A64_100%)]',
                  'shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-3px_4px_rgba(0,0,0,0.22),0_0_0_1px_rgba(5,60,40,0.9),0_4px_0_#0A6B49,0_12px_22px_rgba(20,184,122,0.30)]',
                  'hover:-translate-y-px hover:brightness-110 active:translate-y-[3px]',
                  'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_3px_rgba(0,0,0,0.25),0_0_0_1px_rgba(5,60,40,0.9),0_1px_0_#0A6B49,0_4px_8px_rgba(20,184,122,0.25)]'
                )}>
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-[3px] top-[2px] h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent" />
                  <span className="relative" style={{ textShadow: PRIMARY_TEXT_SHADOW }}>Apply as a Shop</span>
                </span>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/apply/mechanic" className="w-full block">
                <span className={cn(
                  'group/btn relative inline-flex w-full items-center justify-center rounded-full h-12 px-6 select-none outline-none',
                  'text-primary font-semibold text-base transition-[transform,box-shadow,filter] duration-150 ease-out',
                  'bg-[linear-gradient(180deg,#23272B_0%,#181B1E_48%,#0F1113_100%)]',
                  'shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-3px_4px_rgba(0,0,0,0.5),0_0_0_1px_rgba(20,184,122,0.45),0_4px_0_#07080A,0_12px_20px_rgba(0,0,0,0.5)]',
                  'hover:-translate-y-px hover:brightness-125 active:translate-y-[3px]',
                  'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-2px_3px_rgba(0,0,0,0.55),0_0_0_1px_rgba(20,184,122,0.45),0_1px_0_#07080A,0_4px_8px_rgba(0,0,0,0.5)]'
                )}>
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-[3px] top-[2px] h-1/2 rounded-t-full bg-gradient-to-b from-white/10 to-transparent" />
                  <Wrench className="relative h-4 w-4 mr-2" style={{ filter: 'drop-shadow(0 0 4px rgba(20,184,122,0.4))' }} />
                  <span className="relative" style={{ textShadow: ENGRAVE_TEXT_SHADOW }}>Apply as a Mechanic</span>
                </span>
              </Link>
            </SheetClose>
          </div>

          <SheetClose asChild>
            <button className="relative z-10 mt-5 text-sm text-text-muted hover:text-text-primary transition-colors py-2 outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded-md px-2" style={{ textShadow: ENGRAVE_TEXT_SHADOW }}>
              Not now, just browsing.
            </button>
          </SheetClose>
        </SheetContent>
      </Sheet>

      <UserProfileSheet open={isProfileSheetOpen} onOpenChange={setIsProfileSheetOpen} />
    </>
  );
}