// components/auth/ProtectedRoute.tsx

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/lib/store/hooks';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, checkingSession } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Only redirect after /auth/me has finished checking the session.
    // This prevents flashing the login page for a brief moment on refresh.
    if (!checkingSession && !isAuthenticated) {
      router.push(`/signin?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, checkingSession, router, pathname]);

  // While the server is verifying cookies, show a spinner.
  if (checkingSession) {
    return (
      <div className="flex h-screen items-center justify-center bg-charcoal">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // If the check finished and user is not authenticated, show
  // nothing while the redirect happens (or a spinner).
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-charcoal">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}