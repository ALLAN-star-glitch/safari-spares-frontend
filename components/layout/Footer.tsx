// components/layout/Footer.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { FOOTER_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

/* Fine grain: so the footer reads as cast metal, not flat CSS */
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

const ENGRAVE_TEXT_SHADOW = '0 -1px 0 rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06)';

export function Footer() {
  const pathname = usePathname();

  // Hide footer on dashboard pages
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <footer className={cn(
      "relative border-t border-black/80 bg-[linear-gradient(180deg,#1C2024_0%,#0F1113_100%)]",
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    )}>
      {/* Cast grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: '160px 160px' }}
        aria-hidden="true"
      />

      {/* Lit rail along the top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 20%, rgba(20,184,122,0.2) 50%, rgba(255,255,255,0.1) 80%, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center">
              <Logo width={100} />
            </Link>
            <p 
              className="text-sm font-semibold text-text-primary max-w-xs leading-relaxed tracking-wide"
              style={{ textShadow: ENGRAVE_TEXT_SHADOW }}
            >
              Verified Parts. Secure Escrow. Fast Delivery.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              The premium automotive marketplace for Kenya — connecting
              verified shops with everyday drivers and mechanics.
            </p>
          </div>

          {/* Marketplace Links */}
          <div>
            <h3 
              className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4"
              style={{ textShadow: ENGRAVE_TEXT_SHADOW }}
            >
              Marketplace
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.marketplace.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                  >
                    <span className="mr-2 h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 
              className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4"
              style={{ textShadow: ENGRAVE_TEXT_SHADOW }}
            >
              Company
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                  >
                    <span className="mr-2 h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 
              className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4"
              style={{ textShadow: ENGRAVE_TEXT_SHADOW }}
            >
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@safarispares.com"
                className="flex items-center gap-3 text-sm text-text-secondary hover:text-primary transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-charcoal border border-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] group-hover:border-primary/30 transition-colors">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                </div>
                hello@safarispares.com
              </a>
              <a
                href="tel:+254700000000"
                className="flex items-center gap-3 text-sm text-text-secondary hover:text-primary transition-colors group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-charcoal border border-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] group-hover:border-primary/30 transition-colors">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                </div>
                +254 700 000 000
              </a>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-charcoal border border-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                </div>
                Nairobi, Kenya
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] py-6 relative">
          {/* Screws */}
          <div className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-[radial-gradient(circle_at_35%_28%,#8a9097_0%,#4a4f55_40%,#17191c_100%)] shadow-[0_0_0_1px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.30)]" />
          <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-[radial-gradient(circle_at_35%_28%,#8a9097_0%,#4a4f55_40%,#17191c_100%)] shadow-[0_0_0_1px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.30)]" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p 
              className="text-sm text-text-secondary"
              style={{ textShadow: ENGRAVE_TEXT_SHADOW }}
            >
              © {new Date().getFullYear()} Safari Spares. All rights reserved.
            </p>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}