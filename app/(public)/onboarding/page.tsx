/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(public)/onboarding/page.tsx

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { User, Store } from 'lucide-react';
import { useCompleteOnboardingMutation } from '@/lib/store/api/authApi';
import { Button } from '@/components/ui/button';

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registrationToken = searchParams.get('token');
  const selectedRole = searchParams.get('role') || 'buyer';

  const [completeOnboarding, { isLoading, error }] = useCompleteOnboardingMutation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [shopName, setShopName] = useState('');

  const isSeller = selectedRole === 'seller';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationToken || !firstName || !lastName) return;
    if (isSeller && !shopName.trim()) return;

    try {
      const roles = [selectedRole];
      if (selectedRole === 'seller') {
        roles.push('buyer');
      }

      await completeOnboarding({
        registration_token: registrationToken,
        first_name: firstName,
        last_name: lastName,
        roles,
        shop_name: isSeller ? shopName : undefined,
        shop_location: isSeller ? 'Nairobi' : undefined,
      }).unwrap();

      if (isSeller || selectedRole === 'mechanic') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-charcoal pt-16 sm:pt-[72px]">
      <div className="grid lg:grid-cols-[minmax(0,560px)_1fr] xl:grid-cols-[minmax(0,640px)_1fr] min-h-[calc(100vh-72px)]">
        
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-16 w-full">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            
            <h1 className="text-4xl font-bold text-text-primary mb-3">Almost there!</h1>
            <p className="text-base text-text-secondary mb-8 max-w-sm">
              Tell us a bit about yourself to complete your profile.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-charcoal-elevated border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-primary outline-none transition-colors"
                    required
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-charcoal-elevated border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-primary outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Shop Name — only shown for sellers */}
              {isSeller && (
                <div className="relative animate-in fade-in slide-in-from-top-2">
                  <Store className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Shop Name (e.g., Juma Motors)"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-charcoal-elevated border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-primary outline-none transition-colors"
                    required={isSeller}
                  />
                </div>
              )}

              {error && (
                <p className="text-xs text-red-500 font-medium px-1">
                  {('data' in error && (error.data as any)?.error) || 'Failed to complete onboarding.'}
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading || !firstName || !lastName || (isSeller && !shopName)}
                className="w-full h-14 mt-2 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Finishing...' : 'Finish & Enter App'}
              </Button>
            </form>
          </div>
        </div>

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