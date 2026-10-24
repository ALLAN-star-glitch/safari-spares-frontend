// components/layout/UserProfileSheet.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  CarFront,
  Bookmark,
  Heart,
  HelpCircle,
  Globe,
  Settings,
  Pencil,
  ChevronRight,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface UserProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MOCK_USER = {
  name: 'James Mwangi',
  phone: '+254 712 345 678',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  activeReservations: 2,
  garageVehicle: 'Toyota Fielder',
};

export function UserProfileSheet({ open, onOpenChange }: UserProfileSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="bg-charcoal border border-border-subtle rounded-[32px] p-0 max-h-[85vh] overflow-y-auto mb-2 mx-auto w-[calc(100%-16px)] max-w-md"
      >
        <SheetTitle className="sr-only">User Profile Menu</SheetTitle>
        
        {/* Drag handle (visual only) */}
        <div className="flex justify-center pt-3 pb-4">
          <div className="h-1.5 w-12 rounded-full bg-border-subtle" />
        </div>

        <div className="px-6 pb-8">
          {/* User Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary/20">
                <Image
                  src={MOCK_USER.avatar}
                  alt={MOCK_USER.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  {MOCK_USER.name}
                </h2>
                <p className="text-sm text-text-secondary">
                  {MOCK_USER.phone}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-text-secondary hover:text-primary">
              <Pencil className="h-5 w-5" />
            </Button>
          </div>

          {/* Primary Links */}
          <div className="space-y-1 mb-6">
            <Link href="/garage" onClick={() => onOpenChange(false)} className="flex items-center justify-between py-3 group">
              <div className="flex items-center gap-4">
                <CarFront className="h-6 w-6 text-primary" strokeWidth={1.5} />
                <div>
                  <p className="text-[15px] font-semibold text-text-primary group-hover:text-primary transition-colors">My Garage</p>
                  <p className="text-xs text-text-muted">{MOCK_USER.garageVehicle}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-text-muted" />
            </Link>

            <Link href="/reservations" onClick={() => onOpenChange(false)} className="flex items-center justify-between py-3 group">
              <div className="flex items-center gap-4">
                <Bookmark className="h-6 w-6 text-primary" strokeWidth={1.5} />
                <p className="text-[15px] font-semibold text-text-primary group-hover:text-primary transition-colors">My Reservations</p>
              </div>
              <div className="flex items-center gap-2">
                {MOCK_USER.activeReservations > 0 && (
                  <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-bold text-secondary">
                    {MOCK_USER.activeReservations} Active
                  </span>
                )}
                <ChevronRight className="h-5 w-5 text-text-muted" />
              </div>
            </Link>

            <Link href="/saved" onClick={() => onOpenChange(false)} className="flex items-center justify-between py-3 group">
              <div className="flex items-center gap-4">
                <Heart className="h-6 w-6 text-primary" strokeWidth={1.5} />
                <p className="text-[15px] font-semibold text-text-primary group-hover:text-primary transition-colors">Saved Parts</p>
              </div>
              <ChevronRight className="h-5 w-5 text-text-muted" />
            </Link>
          </div>

          <div className="h-px w-full bg-border-subtle/50 mb-6" />

          {/* Secondary Links */}
          <div className="space-y-1 mb-8">
            <Link href="/help" onClick={() => onOpenChange(false)} className="flex items-center justify-between py-3 group">
              <div className="flex items-center gap-4">
                <HelpCircle className="h-6 w-6 text-primary" strokeWidth={1.5} />
                <p className="text-[15px] font-semibold text-text-primary group-hover:text-primary transition-colors">Help & Support</p>
              </div>
              <ChevronRight className="h-5 w-5 text-text-muted" />
            </Link>

            <button className="flex w-full items-center justify-between py-3 group">
              <div className="flex items-center gap-4">
                <Globe className="h-6 w-6 text-primary" strokeWidth={1.5} />
                <p className="text-[15px] font-semibold text-text-primary group-hover:text-primary transition-colors">Language</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                English
                <ChevronRight className="h-5 w-5 text-text-muted" />
              </div>
            </button>

            <Link href="/settings" onClick={() => onOpenChange(false)} className="flex items-center justify-between py-3 group">
              <div className="flex items-center gap-4">
                <Settings className="h-6 w-6 text-primary" strokeWidth={1.5} />
                <p className="text-[15px] font-semibold text-text-primary group-hover:text-primary transition-colors">Settings</p>
              </div>
              <ChevronRight className="h-5 w-5 text-text-muted" />
            </Link>
          </div>

          <div className="h-px w-full bg-border-subtle/50 mb-6" />

          {/* Earn Section */}
          <div>
            <p className="mb-4 text-sm font-medium text-text-secondary">
              Earn with Safari Spares
            </p>
            <div className="space-y-3">
              <Link href="/apply/shop" onClick={() => onOpenChange(false)} className="block">
                <Button className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold text-[15px] hover:bg-primary-600">
                  Open a Shop
                </Button>
              </Link>
              <Link href="/apply/mechanic" onClick={() => onOpenChange(false)} className="block">
                <Button variant="outline" className="w-full h-12 rounded-full border-primary text-primary hover:bg-primary/10 font-semibold text-[15px]">
                  List as a Mechanic
                </Button>
              </Link>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-8 text-center">
            <button className="text-[15px] font-semibold text-red-500 hover:text-red-400 transition-colors">
              Log Out
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}