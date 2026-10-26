// components/auth/OTPInput.tsx

'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  autoFocus?: boolean;
}

export function OTPInput({ length = 6, value, onChange, autoFocus }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return; // Only numbers

    const newValue = [...value];
    newValue[index] = val;
    onChange(newValue);

    // Auto-advance
    if (val !== '' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length).split('');
    const newValue = [...value];
    pastedData.forEach((char, i) => {
      if (!isNaN(Number(char))) newValue[i] = char;
    });
    onChange(newValue);
    
    // Focus last filled input
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            'w-12 h-14 text-center text-2xl font-bold bg-charcoal-elevated border-2 rounded-xl outline-none transition-all',
            value[index]
              ? 'border-primary text-primary shadow-[0_0_15px_rgba(20,184,122,0.3)]'
              : 'border-border-subtle text-text-primary focus:border-primary focus:shadow-[0_0_15px_rgba(20,184,122,0.15)]'
          )}
        />
      ))}
    </div>
  );
}