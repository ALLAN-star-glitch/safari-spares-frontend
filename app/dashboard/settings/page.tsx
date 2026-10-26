// app/dashboard/settings/page.tsx

'use client';

import { useState } from 'react';
import {
  Bell,
  Globe,
  Lock,
  ShieldCheck,
  Store,
  Smartphone,
  Trash2,
  LogOut,
  ChevronRight,
  Check,
  Mail,
  MessageSquare,
  Settings as SettingsIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useAppSelector } from '@/lib/store/hooks';
import { useGetMyAccountQuery } from '@/lib/store/api/accountApi';

// ============================================================
// SECTION COMPONENT
// ============================================================

function Section({
  icon,
  title,
  description,
  children,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("p-6 rounded-2xl border border-border-subtle bg-charcoal-elevated h-full flex flex-col", className)}>
      <div className="flex items-start gap-3 mb-5 shrink-0">
        <div className="h-10 w-10 rounded-lg bg-charcoal flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        </div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

// ============================================================
// TOGGLE COMPONENT
// ============================================================

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-elevated',
        checked ? 'bg-primary' : 'bg-charcoal-higher border border-border-subtle',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 rounded-full bg-white shadow-lg transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  );
}

// ============================================================
// PAGE
// ============================================================

export default function SettingsPage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: accountData } = useGetMyAccountQuery(undefined, {
    skip: !isAuthenticated,
  });
  const isSeller = accountData?.data?.roles.includes('seller');

  // Notification preferences (dummy state)
  const [notifications, setNotifications] = useState({
    newReservations: true,
    reservationExpiring: true,
    newMessages: true,
    newReviews: false,
    marketingEmails: false,
  });

  // Privacy preferences (dummy state)
  const [privacy, setPrivacy] = useState({
    showPhoneToBuyers: true,
    showLocation: true,
    showOnlineStatus: false,
  });

  // Language & region
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('KES');

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved');
  };

  const handleSavePrivacy = () => {
    toast.success('Privacy settings saved');
  };

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
    toast.success(`Language set to ${lang === 'en' ? 'English' : 'Kiswahili'}`);
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion requires email confirmation', {
      description: 'We sent you a verification link. Check your inbox.',
    });
  };

  return (
    // FIXED: Removed max-w-6xl mx-auto. Using standard space-y-6 so it fills the container exactly like the Inventory page.
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage your account preferences, security, and privacy.
        </p>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* NOTIFICATIONS */}
          <Section
            icon={<Bell className="h-5 w-5 text-primary" />}
            title="Notifications"
            description="Choose what you want to be notified about."
          >
            <div className="divide-y divide-border-subtle/50">
              <ToggleRow
                label="New reservations"
                description="Get notified when a buyer reserves your part"
                checked={notifications.newReservations}
                onChange={(v) => setNotifications({ ...notifications, newReservations: v })}
              />
              <ToggleRow
                label="Reservation expiring soon"
                description="Reminder when a reservation is about to expire"
                checked={notifications.reservationExpiring}
                onChange={(v) => setNotifications({ ...notifications, reservationExpiring: v })}
              />
              <ToggleRow
                label="New messages"
                description="Get notified when a buyer sends you a message"
                checked={notifications.newMessages}
                onChange={(v) => setNotifications({ ...notifications, newMessages: v })}
              />
              <ToggleRow
                label="New reviews"
                description="Get notified when a buyer leaves a review"
                checked={notifications.newReviews}
                onChange={(v) => setNotifications({ ...notifications, newReviews: v })}
              />
              <ToggleRow
                label="Marketing emails"
                description="Occasional updates about new features and offers"
                checked={notifications.marketingEmails}
                onChange={(v) => setNotifications({ ...notifications, marketingEmails: v })}
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleSaveNotifications}
                className="bg-primary text-primary-foreground hover:bg-primary-600"
              >
                Save
              </Button>
            </div>
          </Section>

          {/* LANGUAGE & REGION */}
          <Section
            icon={<Globe className="h-5 w-5 text-primary" />}
            title="Language & Region"
            description="Choose your preferred language and currency."
          >
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">
                  Language
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'en', label: 'English', flag: '🇬🇧' },
                    { value: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
                  ].map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => handleChangeLanguage(lang.value)}
                      className={cn(
                        'flex items-center gap-2 h-12 px-4 rounded-xl border text-sm font-medium transition-colors',
                        language === lang.value
                          ? 'bg-primary/10 border-primary/50 text-primary'
                          : 'bg-charcoal border-border-subtle text-text-secondary hover:border-primary/30'
                      )}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.label}
                      {language === lang.value && (
                        <Check className="h-4 w-4 ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">
                  Currency
                </label>
                <div className="relative">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full h-12 px-4 bg-charcoal border border-border-subtle rounded-xl text-sm text-text-primary focus:border-primary outline-none transition-colors cursor-pointer appearance-none"
                  >
                    <option value="KES">KES — Kenyan Shilling</option>
                    <option value="USD">USD — US Dollar</option>
                    <option value="UGX">UGX — Ugandan Shilling</option>
                    <option value="TZS">TZS — Tanzanian Shilling</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted rotate-90 pointer-events-none" />
                </div>
              </div>
            </div>
          </Section>

          {/* SUPPORT */}
          <Section
            icon={<MessageSquare className="h-5 w-5 text-primary" />}
            title="Support"
            description="Get help with your account or the platform."
          >
            <div className="space-y-2">
              <SettingLink
                icon={<MessageSquare className="h-4 w-4" />}
                label="Contact support"
                description="Chat with our team"
                onClick={() => toast.info('Support chat coming soon')}
              />
              <SettingLink
                icon={<Mail className="h-4 w-4" />}
                label="Email us"
                description="support@safarispares.com"
                onClick={() => window.open('mailto:support@safarispares.com')}
              />
              <SettingLink
                icon={<SettingsIcon className="h-4 w-4" />}
                label="Help center"
                description="Browse articles and FAQs"
                onClick={() => toast.info('Help center coming soon')}
              />
            </div>
          </Section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* PRIVACY */}
          <Section
            icon={<Lock className="h-5 w-5 text-primary" />}
            title="Privacy"
            description="Control what buyers can see about you."
          >
            <div className="divide-y divide-border-subtle/50">
              <ToggleRow
                label="Show phone number to buyers"
                description="Buyers can see your phone number on chat and reservations"
                checked={privacy.showPhoneToBuyers}
                onChange={(v) => setPrivacy({ ...privacy, showPhoneToBuyers: v })}
              />
              <ToggleRow
                label="Show shop location publicly"
                description="Display your shop's address on your public shop page"
                checked={privacy.showLocation}
                onChange={(v) => setPrivacy({ ...privacy, showLocation: v })}
              />
              <ToggleRow
                label="Show online status"
                description="Let buyers see when you're online and available to chat"
                checked={privacy.showOnlineStatus}
                onChange={(v) => setPrivacy({ ...privacy, showOnlineStatus: v })}
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleSavePrivacy}
                className="bg-primary text-primary-foreground hover:bg-primary-600"
              >
                Save
              </Button>
            </div>
          </Section>

          {/* SECURITY (SELLER ONLY) */}
          {isSeller && (
            <Section
              icon={<ShieldCheck className="h-5 w-5 text-primary" />}
              title="Security"
              description="Protect your account and shop."
            >
              <div className="space-y-2">
                <SettingLink
                  icon={<Lock className="h-4 w-4" />}
                  label="Change PIN"
                  description="Update your 4-digit login PIN"
                  onClick={() => toast.info('PIN change coming soon')}
                />
                <SettingLink
                  icon={<Smartphone className="h-4 w-4" />}
                  label="Active sessions"
                  description="See where your account is logged in"
                  onClick={() => toast.info('Session management coming soon')}
                />
                <SettingLink
                  icon={<ShieldCheck className="h-4 w-4" />}
                  label="Two-factor authentication"
                  description="Add an extra layer of security"
                  onClick={() => toast.info('2FA coming soon')}
                />
              </div>
            </Section>
          )}

          {/* SHOP SETTINGS (SELLER ONLY) */}
          {isSeller && (
            <Section
              icon={<Store className="h-5 w-5 text-primary" />}
              title="Shop"
              description="Manage your shop's KYC, verification, and availability."
            >
              <div className="space-y-2">
                <SettingLink
                  icon={<ShieldCheck className="h-4 w-4" />}
                  label="Shop verification"
                  description="Submit KYC documents to get verified"
                  onClick={() => toast.info('KYC submission coming soon')}
                  badge="Pending"
                  badgeColor="secondary"
                />
                <SettingLink
                  icon={<Store className="h-4 w-4" />}
                  label="Shop details"
                  description="Update your shop's name, location, and KRA PIN"
                  onClick={() => toast.info('Shop details coming soon')}
                />
                <SettingLink
                  icon={<Bell className="h-4 w-4" />}
                  label="Shop availability"
                  description="Temporarily pause new listings and reservations"
                  onClick={() => toast.info('Shop availability coming soon')}
                />
              </div>
            </Section>
          )}
        </div>
      </div>

      {/* DANGER ZONE (FULL WIDTH) */}
      <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
        <div className="flex items-start gap-3 mb-5">
          <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
            <Trash2 className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-red-400">Danger Zone</h2>
            <p className="text-xs text-red-400/70 mt-0.5">
              These actions are permanent and cannot be undone.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-charcoal border border-red-500/20">
            <div>
              <p className="text-sm font-medium text-text-primary">Log out of all sessions</p>
              <p className="text-xs text-text-muted mt-0.5">
                Sign out of every device where you&apos;re logged in
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => toast.success('Logged out of all sessions')}
              className="border-border-subtle text-text-primary hover:bg-charcoal-higher shrink-0 ml-4"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-charcoal border border-red-500/20">
            <div>
              <p className="text-sm font-medium text-text-primary">Delete account</p>
              <p className="text-xs text-text-muted mt-0.5">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={handleDeleteAccount}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 shrink-0 ml-4"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        <p className="text-xs text-text-muted mt-0.5">{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function SettingLink({
  icon,
  label,
  description,
  onClick,
  badge,
  badgeColor = 'primary',
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  badge?: string;
  badgeColor?: 'primary' | 'secondary';
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-charcoal-higher/50 transition-colors group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-8 w-8 rounded-lg bg-charcoal flex items-center justify-center shrink-0 text-text-muted">
          {icon}
        </div>
        <div className="text-left min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-text-primary">{label}</p>
            {badge && (
              <span
                className={cn(
                  'text-[10px] font-bold px-1.5 py-0.5 rounded',
                  badgeColor === 'primary'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-secondary/10 text-secondary'
                )}
              >
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-text-muted mt-0.5 truncate">{description}</p>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-text-muted shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}