/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(public)/signin/page.tsx

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck, BadgeCheck, Truck } from 'lucide-react';
import { useRequestOTPMutation } from '@/lib/store/api/authApi';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/auth/PhoneInput';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [phone, setPhone] = useState('');
  const [requestOTP, { isLoading, error }] = useRequestOTPMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 9) return;

    try {
      const formattedPhone = `+254${phone}`;
      await requestOTP({ phone: formattedPhone }).unwrap();
      router.push(
        `/signin/verify?phone=${encodeURIComponent(formattedPhone)}&redirect=${encodeURIComponent(redirect)}`
      );
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-charcoal pt-16 sm:pt-[72px]">
      <div className="grid lg:grid-cols-[minmax(0,560px)_1fr] xl:grid-cols-[minmax(0,640px)_1fr] min-h-[calc(100vh-72px)]">
        
        {/* LEFT: Form column */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-16 w-full">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            
            {/* Language toggle */}
            <div className="flex justify-end mb-8">
              <button className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors">
                EN <span className="mx-1 text-border-subtle">|</span> SW
              </button>
            </div>

            {/* Trust signals */}
            <div className="space-y-3 mb-10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-text-primary">M-Pesa Escrow Protected</span>
              </div>
              <div className="flex items-center gap-3">
                <BadgeCheck className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-text-primary">100% Verified Sellers</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-text-primary">Same-Day Delivery</span>
              </div>
            </div>

            {/* Welcome card */}
            <div className="w-full">
              <h1 className="text-4xl font-bold text-text-primary mb-3">
                Welcome Back
              </h1>
              <p className="text-base text-text-secondary mb-8">
                Enter your phone number to continue.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <PhoneInput value={phone} onChange={setPhone} autoFocus />

                {error && (
                  <p className="text-xs text-red-500 font-medium px-1">
                    {('data' in error && (error.data as any)?.error) || 'Failed to send OTP. Try again.'}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isLoading || phone.length < 9}
                  className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Continue with Phone'}
                </Button>
              </form>

              <p className="mt-8 text-center text-xs text-text-muted leading-relaxed max-w-xs mx-auto lg:mx-0">
                By continuing, you agree to our{' '}
                <a href="#" className="underline">Terms of Service</a> and{' '}
                <a href="#" className="underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Full-bleed background image */}
        <div className="relative hidden lg:block overflow-hidden">
          <Image
            src="/images/auth-car.png"
            alt="Safari Spares"
            fill
            priority
            sizes="(max-width: 1024px) 0vw, 60vw"
            className="object-cover object-center"
          />
          {/* Gradient overlay — blends image into the left column */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />
        </div>
      </div>
    </div>
  );
}