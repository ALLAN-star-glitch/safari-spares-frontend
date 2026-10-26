// app/(public)/onboarding/role-select/page.tsx

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ShoppingBag, Store, Wrench } from 'lucide-react';

export default function RoleSelectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSelect = (role: 'buyer' | 'seller' | 'mechanic') => {
    if (!token) return;
    // Pass the chosen role to the profile completion screen
    router.push(`/onboarding?token=${token}&role=${role}`);
  };

  return (
    <div className="min-h-screen bg-charcoal pt-16 sm:pt-[72px]">
      <div className="grid lg:grid-cols-[minmax(0,560px)_1fr] xl:grid-cols-[minmax(0,640px)_1fr] min-h-[calc(100vh-72px)]">
        
        {/* LEFT: Form column */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-16 w-full">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            
            <h1 className="text-4xl font-bold text-text-primary mb-3">
              How do you want to use Safari Spares?
            </h1>
            <p className="text-base text-text-secondary mb-10 max-w-sm">
              You can change this later in your profile settings.
            </p>

            <div className="space-y-4">
              {/* Buyer Option */}
              <button
                onClick={() => handleSelect('buyer')}
                className="group w-full flex items-center gap-4 p-5 rounded-2xl border border-border-subtle bg-charcoal-elevated hover:border-primary/50 hover:bg-charcoal-higher transition-all text-left"
              >
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <ShoppingBag className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary">Just Browsing</h3>
                  <p className="text-sm text-text-secondary mt-0.5">
                    I want to find parts and reserve them for pickup.
                  </p>
                </div>
              </button>

              {/* Seller Option */}
              <button
                onClick={() => handleSelect('seller')}
                className="group w-full flex items-center gap-4 p-5 rounded-2xl border border-border-subtle bg-charcoal-elevated hover:border-secondary/50 hover:bg-charcoal-higher transition-all text-left"
              >
                <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors">
                  <Store className="h-7 w-7 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary">I Own a Shop</h3>
                  <p className="text-sm text-text-secondary mt-0.5">
                    I want to list inventory and manage reservations.
                  </p>
                </div>
              </button>

              {/* Mechanic Option */}
              <button
                onClick={() => handleSelect('mechanic')}
                className="group w-full flex items-center gap-4 p-5 rounded-2xl border border-border-subtle bg-charcoal-elevated hover:border-primary/50 hover:bg-charcoal-higher transition-all text-left"
              >
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Wrench className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary">I am a Mechanic</h3>
                  <p className="text-sm text-text-secondary mt-0.5">
                    I source parts for clients and need a professional profile.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Background image (desktop only) */}
        <div className="relative hidden lg:block overflow-hidden">
          <Image
            src="/images/onboarding-car.png"
            alt="Safari Spares"
            fill
            priority
            sizes="(max-width: 1024px) 0vw, 60vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />
        </div>
      </div>
    </div>
  );
}