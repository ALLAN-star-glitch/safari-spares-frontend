// components/auth/PhoneInput.tsx

'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export function PhoneInput({ value, onChange, className, autoFocus }: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip non-digits and leading zeros
    const raw = e.target.value.replace(/\D/g, '');
    const cleaned = raw.startsWith('0') ? raw.slice(1) : raw;
    onChange(cleaned);
  };

  return (
    <div
      className={cn(
        'relative flex items-center bg-charcoal rounded-xl border border-border-subtle focus-within:border-primary/50 transition-colors',
        className
      )}
    >
      {/* Country Selector */}
      <div className="flex items-center gap-1 pl-4 pr-2 border-r border-border-subtle h-12">
        <span className="text-xl">🇰🇪</span>
        <ChevronDown className="h-4 w-4 text-text-muted" />
      </div>
      
      {/* Prefix */}
      <span className="pl-3 text-sm font-medium text-text-secondary">+254</span>
      
      {/* Input */}
      <input
        type="tel"
        inputMode="numeric"
        placeholder="7XX XXX XXX"
        value={value}
        onChange={handleChange}
        autoFocus={autoFocus}
        maxLength={9} // Max 9 digits for Kenya
        className="flex-1 bg-transparent px-2 h-12 text-sm text-text-primary placeholder:text-text-muted outline-none"
      />
    </div>
  );
}