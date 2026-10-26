/* eslint-disable react/no-unescaped-entities */
// app/(app)/garage/page.tsx

'use client';

import { useState } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { SignInRequiredDialog } from '@/components/auth/SignInRequiredDialog';
import { 
  ArrowLeft, Plus, Settings, Car, MapPin, 
  Clock, Heart, Wrench, CalendarClock
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

// --- Mock Data ---
const MOCK_VEHICLES = [
  { id: '1', make: 'Toyota', model: 'Fielder', year: '2015', plate: 'KDJ 432X', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800', active: true },
  { id: '2', make: 'Subaru', model: 'Forester', year: '2018', plate: 'KCX 891Y', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800', active: false },
];

const MOCK_RESERVATIONS = [
  { id: '1', part: 'Brake Pads (Front)', price: 9800, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400', expiresIn: '2 hours', shop: 'Kings Auto Parts' },
  { id: '2', part: 'Oil Filter', price: 1500, image: 'https://images.unsplash.com/photo-1555626906-fcf10d6851b4?auto=format&fit=crop&q=80&w=400', expiresIn: '23 hours', shop: 'Motor City Spares' },
];

const MOCK_SAVED = [
  { id: '1', title: 'Headlights (Pair)', fitment: 'Toyota Fielder 2012-2018', price: 12500, location: 'Nairobi', image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=400' },
  { id: '2', title: 'Alternator 12V', fitment: 'Toyota Fielder 2012-2018', price: 8500, location: 'Nairobi', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=400' },
];

export default function GaragePage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(!isAuthenticated);
  const [activeVehicleId, setActiveVehicleId] = useState(MOCK_VEHICLES[0].id);

  const router = useRouter();
  
  const activeVehicle = MOCK_VEHICLES.find(v => v.id === activeVehicleId) || MOCK_VEHICLES[0];

  // --- Unauthenticated View (Blurred background + Dialog) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal relative overflow-hidden">
        
        {/* Dimmed/Blurred Background Placeholder */}
        <div className="pointer-events-none opacity-30 blur-sm grayscale select-none">
          <div className="sticky top-0 z-40 bg-charcoal border-b border-border-subtle/50 h-24" />
          <div className="container mx-auto px-4 py-8">
            <div className="h-64 bg-charcoal-elevated rounded-2xl mb-8" />
            <div className="grid grid-cols-3 gap-6">
              <div className="h-48 bg-charcoal-elevated rounded-2xl" />
              <div className="h-48 bg-charcoal-elevated rounded-2xl" />
              <div className="h-48 bg-charcoal-elevated rounded-2xl" />
            </div>
          </div>
        </div>

        {/* The Dialog */}
        <SignInRequiredDialog 
        isOpen={isSignInDialogOpen} 
        onClose={() => {
            setIsSignInDialogOpen(false);
            router.push('/'); // Send them home instead of leaving them on the blurred page
        }} 
        redirectUrl="/garage" 
        />
      </div>
    );
  }

  // --- Authenticated View ---
  return (
    <div className="bg-charcoal min-h-screen pb-32 lg:pb-20">
      
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-charcoal border-b border-border-subtle/50">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-start justify-between gap-4">
            
            <div className="flex items-start gap-4">
              <Link href="/" className="p-2 bg-charcoal-elevated rounded-full hover:bg-charcoal-higher transition-colors mt-0.5 shrink-0">
                <ArrowLeft className="h-5 w-5 text-text-primary" />
              </Link>
              <div>
                <h1 className="text-xl lg:text-3xl font-bold text-text-primary">My Garage</h1>
                <p className="text-xs lg:text-sm text-text-secondary mt-1 max-w-md leading-relaxed">
                  Manage your vehicles, track active reservations, and save parts you're interested in.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0 mt-1">
              <button className="p-2 bg-charcoal-elevated rounded-full text-text-secondary hover:text-text-primary transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary-600 transition-colors">
                <Plus className="h-4 w-4" />
                <span className="hidden lg:inline">Add Vehicle</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN */}
          <div className="flex-1 space-y-8">
            
            {/* Active Vehicle Hero */}
            <div className="bg-charcoal-elevated rounded-2xl border border-border-subtle overflow-hidden">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full">
                <img src={activeVehicle.image} alt={activeVehicle.model} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex items-end justify-between">
                  <div>
                    <p className="text-primary font-semibold text-sm mb-1">{activeVehicle.year} Model</p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{activeVehicle.make} {activeVehicle.model}</h2>
                    <p className="text-text-secondary font-mono mt-1">{activeVehicle.plate}</p>
                  </div>
                  
                  {MOCK_VEHICLES.length > 1 && (
                    <div className="hidden sm:flex gap-2">
                      {MOCK_VEHICLES.map(v => (
                        <button
                          key={v.id}
                          onClick={() => setActiveVehicleId(v.id)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md transition-colors",
                            v.id === activeVehicleId ? "bg-primary text-primary-foreground" : "bg-white/10 text-white hover:bg-white/20"
                          )}
                        >
                          {v.make} {v.model}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 divide-x divide-border-subtle border-t border-border-subtle">
                <button className="flex flex-col items-center justify-center py-4 hover:bg-charcoal-higher transition-colors group">
                  <Car className="h-5 w-5 text-text-muted mb-1.5 group-hover:text-primary transition-colors" />
                  <span className="text-xs font-medium text-text-primary">Details</span>
                </button>
                <Link href={`/search?fitment=${activeVehicle.make}`} className="flex flex-col items-center justify-center py-4 hover:bg-charcoal-higher transition-colors group">
                  <Wrench className="h-5 w-5 text-text-muted mb-1.5 group-hover:text-primary transition-colors" />
                  <span className="text-xs font-medium text-text-primary">Find Parts</span>
                </Link>
                <button className="flex flex-col items-center justify-center py-4 hover:bg-charcoal-higher transition-colors group">
                  <CalendarClock className="h-5 w-5 text-text-muted mb-1.5 group-hover:text-primary transition-colors" />
                  <span className="text-xs font-medium text-text-primary">Service Log</span>
                </button>
              </div>
            </div>

            {/* Active Reservations */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-text-primary">Active Reservations</h3>
                <Link href="/reservations" className="text-sm font-semibold text-primary hover:underline">See All</Link>
              </div>
              
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {MOCK_RESERVATIONS.map(res => (
                  <div key={res.id} className="min-w-[280px] max-w-[320px] bg-charcoal-elevated border border-border-subtle rounded-2xl overflow-hidden shrink-0">
                    <div className="flex gap-3 p-3">
                      <img src={res.image} alt={res.part} className="h-20 w-20 rounded-xl object-cover shrink-0" />
                      <div className="flex flex-col justify-center min-w-0">
                        <h4 className="font-bold text-text-primary text-sm truncate">{res.part}</h4>
                        <p className="text-xs text-text-muted truncate">From {res.shop}</p>
                        <p className="text-sm font-bold text-secondary mt-1">KES {res.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="bg-secondary/10 border-t border-secondary/20 px-3 py-2 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-secondary" />
                      <span className="text-xs font-semibold text-secondary">Expires in {res.expiresIn}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:w-80 xl:w-96 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-text-primary">Saved Items</h3>
              <Link href="/saved" className="text-sm font-semibold text-primary hover:underline">See All</Link>
            </div>
            
            <div className="space-y-3">
              {MOCK_SAVED.map(item => (
                <Link 
                  key={item.id} 
                  href={`/listings/${item.id}`}
                  className="flex gap-3 p-3 bg-charcoal-elevated border border-border-subtle rounded-2xl hover:border-primary/30 transition-colors group"
                >
                  <div className="h-20 w-20 rounded-xl overflow-hidden shrink-0 relative">
                    <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-text-primary text-sm truncate">{item.title}</h4>
                      <Heart className="h-4 w-4 text-primary fill-primary shrink-0" />
                    </div>
                    <p className="text-xs text-text-muted truncate mt-0.5">{item.fitment}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-bold text-secondary">KES {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {MOCK_SAVED.length === 0 && (
              <div className="p-8 text-center border-2 border-dashed border-border-subtle rounded-2xl">
                <Heart className="h-8 w-8 text-text-muted mx-auto mb-2" />
                <p className="text-sm text-text-secondary">No saved items yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FLOATING ADD BUTTON */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 flex items-center justify-center active:scale-95 transition-transform">
          <Plus className="h-6 w-6" />
        </button>
      </div>

    </div>
  );
}