// app/(public)/layout.tsx

import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Script from 'next/script';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

export const metadata: Metadata = {
  title: {
    default: 'Safari Spares — Verified Parts. Secure Escrow. Fast Delivery.',
    template: '%s | Safari Spares',
  },
  description:
    'The premium automotive marketplace for Kenya. Find verified spare parts from trusted shops, reserve for pickup, and get back on the road faster.',
  keywords: [
    'spare parts Kenya',
    'automotive marketplace',
    'car parts Nairobi',
    'verified spare parts shops',
    'reserve for pickup',
    'Safari Spares',
  ],
  authors: [{ name: 'Safari Spares' }],
  creator: 'Safari Spares',
  publisher: 'Safari Spares',
  openGraph: {
    title: 'Safari Spares — Verified Parts. Secure Escrow. Fast Delivery.',
    description:
      'The premium automotive marketplace for Kenya. Find verified spare parts from trusted shops.',
    url: 'https://safarispares.com',
    siteName: 'Safari Spares',
    type: 'website',
    locale: 'en_KE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safari Spares — Verified Parts. Secure Escrow. Fast Delivery.',
    description:
      'The premium automotive marketplace for Kenya. Find verified spare parts from trusted shops.',
    site: '@safarispares',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://safarispares.com',
  },
  category: 'automotive',
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal">
      <Header />
      <main className="flex-1 pt-16 sm:pt-[72px] pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}