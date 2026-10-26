// components/auth/SignInRequiredDialog.tsx

'use client';

import { Lock, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface SignInRequiredDialogProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
}

export function SignInRequiredDialog({ isOpen, onClose, redirectUrl }: SignInRequiredDialogProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSignIn = () => {
    // Routes to your existing /signin page and preserves the intended destination
    const url = redirectUrl ? `/signin?redirect=${encodeURIComponent(redirectUrl)}` : '/signin';
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={onClose} 
      />
      
      {/* Dialog Box */}
      <div className="relative w-full max-w-sm bg-charcoal-elevated border border-border-subtle rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1.5 text-text-muted hover:text-text-primary bg-charcoal rounded-full transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          
          <h2 className="text-xl font-bold text-text-primary mb-2">Sign in required</h2>
          <p className="text-sm text-text-secondary mb-6 leading-relaxed">
            You need to be signed in to access this page. Join Safari Spares to manage your garage, track reservations, and message sellers.
          </p>

          <div className="w-full space-y-3">
            <Button 
              onClick={handleSignIn}
              className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary-600 font-semibold"
            >
              Sign In / Create Account
            </Button>
            <button 
              onClick={onClose}
              className="w-full h-11 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}