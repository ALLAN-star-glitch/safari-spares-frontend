// components/layout/Footer.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { FOOTER_LINKS } from '@/lib/constants';

export function Footer() {
  const pathname = usePathname();

  // Hide footer on dashboard pages
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <footer className="bg-charcoal-elevated border-t border-border-subtle">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center">
              <Logo width={100} />
            </Link>
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              Verified Parts. Secure Escrow. Fast Delivery.
            </p>
            <p className="text-sm text-text-secondary">
              The premium automotive marketplace for Kenya — connecting
              verified shops with everyday drivers and mechanics.
            </p>
          </div>

          {/* Marketplace Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Marketplace
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.marketplace.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@safarispares.com"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                hello@safarispares.com
              </a>
              <a
                href="tel:+254700000000"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                +254 700 000 000
              </a>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <MapPin className="h-4 w-4 shrink-0" />
                Nairobi, Kenya
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-subtle py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-secondary">
              © {new Date().getFullYear()} Safari Spares. All rights reserved.
            </p>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}