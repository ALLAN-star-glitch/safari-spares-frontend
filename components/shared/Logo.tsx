// components/shared/Logo.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  asLink?: boolean;
  width?: number;
  className?: string;
}

/**
 * Safari Spares logo.
 *
 * Uses /public/logo.png if present (drop your brand asset there).
 * Falls back to the text wordmark if the file is missing.
 */
export function Logo({
  asLink = true,
  width = 120,
  className,
}: LogoProps) {
  const height = Math.round((width / 120) * 36);

  const inner = (
    <Image
      src="/logo.png"
      alt="Safari Spares"
      width={width}
      height={height}
      priority
      className={cn('w-auto h-auto object-contain', className)}
    />
  );

  if (!asLink) {
    return <span className="inline-flex items-center shrink-0">{inner}</span>;
  }

  return (
    <Link
      href="/"
      className="inline-flex items-center shrink-0 w-max h-auto pointer-events-auto"
      aria-label="Safari Spares home"
    >
      {inner}
    </Link>
  );
}