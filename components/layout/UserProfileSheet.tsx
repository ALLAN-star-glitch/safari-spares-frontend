// components/layout/UserProfileSheet.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  CarFront,
  Bookmark,
  Heart,
  HelpCircle,
  Globe,
  Settings,
  ChevronRight,
  LayoutDashboard,
  Store,
  LogOut,
  Loader2,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { useGetMyProfileQuery } from '@/lib/store/api/userApi';
import { useGetMyAccountQuery } from '@/lib/store/api/accountApi';
import { useLogoutMutation } from '@/lib/store/api/authApi';
import { clearAuth } from '@/lib/store/slices/authSlice';
import { toast } from 'sonner';
import { LogoutDialog } from './LogoutDialog';

interface UserProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserProfileSheet({ open, onOpenChange }: UserProfileSheetProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: profileData, isLoading: loadingProfile } = useGetMyProfileQuery(undefined, {
    skip: !isAuthenticated || !open,
  });

  const { data: accountData, isLoading: loadingAccount } = useGetMyAccountQuery(undefined, {
    skip: !isAuthenticated || !open,
  });

  const user = profileData?.data;
  const account = accountData?.data;

  const isSeller = account?.roles.includes('seller');
  const isMechanic = account?.roles.includes('mechanic');
  const showDashboard = isSeller || isMechanic;

  const initials = `${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`.toUpperCase();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearAuth());
      setShowLogoutDialog(false);
      onOpenChange(false);
      toast.success('Logged out');
      router.push('/');
    } catch (err) {
      toast.error('Failed to log out');
    }
  };

  const navigateTo = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const isLoading = loadingProfile || loadingAccount;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="bg-charcoal border border-border-subtle rounded-[32px] p-0 max-h-[85vh] overflow-y-auto mb-2 mx-auto w-[calc(100%-16px)] max-w-md"
        >
          <SheetTitle className="sr-only">User Profile Menu</SheetTitle>

          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-4">
            <div className="h-1.5 w-12 rounded-full bg-border-subtle" />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : !isAuthenticated ? (
            <div className="px-6 pb-10 text-center">
              <h2 className="text-xl font-bold text-text-primary mb-2">Sign in to continue</h2>
              <p className="text-sm text-text-secondary mb-6">
                Access your garage, reservations, and messages.
              </p>
              <Button
                onClick={() => navigateTo('/signin')}
                className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary-600"
              >
                Sign In
              </Button>
            </div>
          ) : (
            <div className="px-6 pb-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/20 bg-charcoal-elevated flex items-center justify-center">
                    {user?.avatar_url ? (
                      <Image
                        src={user.avatar_url}
                        alt={user?.first_name || 'Profile'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-primary">{initials || '?'}</span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-text-primary leading-tight">
                      {user?.first_name} {user?.last_name}
                    </h2>
                    <p className="text-xs text-text-muted capitalize mt-0.5">
                      {account?.roles.join(' • ').replace(/_/g, ' ')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('/dashboard/profile')}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Edit
                </button>
              </div>

              {/* Dashboard shortcut */}
              {showDashboard && (
                <button
                  onClick={() => navigateTo('/dashboard')}
                  className="w-full flex items-center justify-between py-3 px-4 mb-4 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">Go to Dashboard</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}

              {/* Primary links */}
              <div className="space-y-1 mb-6">
                <MenuLink
                  icon={<CarFront className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                  label="My Garage"
                  onClick={() => navigateTo('/garage')}
                />
                <MenuLink
                  icon={<Bookmark className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                  label="My Reservations"
                  onClick={() => navigateTo('/reservations')}
                  badge="0 Active"
                />
                <MenuLink
                  icon={<Heart className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                  label="Saved Parts"
                  onClick={() => navigateTo('/saved')}
                />
              </div>

              <div className="h-px w-full bg-border-subtle/50 mb-4" />

              {/* Secondary links */}
              <div className="space-y-1 mb-6">
                <MenuLink
                  icon={<HelpCircle className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                  label="Help & Support"
                  onClick={() => navigateTo('/help')}
                />
                <MenuLink
                  icon={<Globe className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                  label="Language"
                  onClick={() => {}}
                  trailing="English"
                />
                <MenuLink
                  icon={<Settings className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                  label="Settings"
                  onClick={() => navigateTo('/dashboard/settings')}
                />
              </div>

              <div className="h-px w-full bg-border-subtle/50 mb-4" />

              {/* Earn — only for non-sellers */}
              {!isSeller && (
                <div className="mb-6">
                  <p className="mb-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Earn with Safari Spares
                  </p>
                  <div className="space-y-2">
                    <Button
                      onClick={() => navigateTo('/apply/shop')}
                      className="w-full h-11 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-600"
                    >
                      <Store className="h-4 w-4 mr-2" />
                      Open a Shop
                    </Button>
                  </div>
                </div>
              )}

              {/* Logout — opens confirmation dialog */}
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-red-500 hover:text-red-400 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={confirmLogout}
      />
    </>
  );
}

function MenuLink({
  icon,
  label,
  onClick,
  badge,
  trailing,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  badge?: string;
  trailing?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 group hover:bg-charcoal-higher/50 -mx-2 px-2 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[15px] font-medium text-text-primary">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-bold text-secondary">
            {badge}
          </span>
        )}
        {trailing && <span className="text-sm text-text-secondary">{trailing}</span>}
        <ChevronRight className="h-4 w-4 text-text-muted group-hover:translate-x-0.5 transition-transform" />
      </div>
    </button>
  );
}