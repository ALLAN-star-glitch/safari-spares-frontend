/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(public)/signin/verify/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useVerifyOTPMutation, useRequestOTPMutation } from '@/lib/store/api/authApi';
import { Button } from '@/components/ui/button';
import { OTPInput } from '@/components/auth/OtpInput';


export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '';
  const redirect = searchParams.get('redirect') || '/';

  const [verifyOTP, { isLoading: isVerifying, error: verifyError }] = useVerifyOTPMutation();
  const [requestOTP, { isLoading: isResending }] = useRequestOTPMutation();
  
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [timer, setTimer] = useState(45);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async () => {
    const otp = code.join('');
    if (otp.length !== 6) return;

    try {
      const res = await verifyOTP({ phone, code: otp }).unwrap();
      if (res.data?.requires_onboarding) {
        router.push(`/onboarding/role-select?token=${res.data.registration_token}`);
      } else {
        router.push(redirect);
      }
    } catch (err) {}
  };

  const handleResend = async () => {
    try {
      await requestOTP({ phone }).unwrap();
      setTimer(45);
      setCode(Array(6).fill(''));
    } catch (err) {
      alert('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal relative">
      
      {/* MOBILE BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <Image
          src="/images/auth-car.png"
          alt="Safari Spares"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/80 to-charcoal" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 pt-16 sm:pt-[72px]">
        <div className="grid lg:grid-cols-[minmax(0,560px)_1fr] xl:grid-cols-[minmax(0,640px)_1fr] min-h-[calc(100vh-72px)]">
          
          {/* LEFT: Form column */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-16 w-full">
            <div className="w-full max-w-md mx-auto lg:mx-0">
              
              {/* Back */}
              <button
                onClick={() => router.push('/signin')}
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-8 w-fit transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Enter Verification Code
              </h1>
              <p className="text-sm text-text-secondary mb-2">
                We sent a 6-digit code to <span className="font-semibold text-text-primary">{phone}</span>
              </p>
              <button
                onClick={() => router.push('/signin')}
                className="text-sm font-semibold text-primary underline underline-offset-4 mb-10 w-fit"
              >
                Edit number
              </button>

              {/* OTP Input */}
              <div className="mb-6">
                <OTPInput value={code} onChange={setCode} autoFocus />
              </div>

              {/* Error */}
              {verifyError && (
                <p className="text-sm text-red-500 font-medium mb-4">
                  {('data' in verifyError && (verifyError.data as any)?.error) || 'Invalid OTP. Please try again.'}
                </p>
              )}

              {/* Resend Timer */}
              <div className="text-sm text-text-secondary mb-8 h-6">
                {timer > 0 ? (
                  <span>
                    Didn&apos;t receive the code?{' '}
                    <span className="text-secondary font-semibold">
                      Resend in 0:{timer.toString().padStart(2, '0')}
                    </span>
                  </span>
                ) : (
                  <button 
                    onClick={handleResend} 
                    disabled={isResending} 
                    className="text-primary font-semibold underline disabled:opacity-50"
                  >
                    {isResending ? 'Sending...' : 'Resend Code'}
                  </button>
                )}
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isVerifying || code.join('').length !== 6}
                className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary-600 transition-colors disabled:opacity-50"
              >
                {isVerifying ? 'Verifying...' : 'Verify & Continue'}
              </Button>
            </div>
          </div>

          {/* RIGHT: Background image (desktop only) */}
          <div className="relative hidden lg:block overflow-hidden">
            <Image
              src="/images/auth-car.png"
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
    </div>
  );
}