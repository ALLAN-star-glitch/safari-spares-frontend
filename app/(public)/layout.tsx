// app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import { THEME_INIT_SCRIPT } from '@/lib/theme';
import { Toaster } from 'sonner';
import StoreProvider from '../StoreProvider';

const sora = Sora({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101214',
};

// Get the base URL dynamically (Vercel provides VERCEL_URL)
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'Safari Spares — The Automotive Marketplace for Africa',
    template: '%s | Safari Spares',
  },
  description:
    'Verified Parts. Secure Escrow. Fast Delivery. The premium automotive marketplace connecting buyers, mechanics, and verified shops across Kenya and Africa.',
  keywords: [
    'spare parts Africa',
    'automotive marketplace Kenya',
    'car parts Nairobi',
    'verified spare parts shops',
    'reserve for pickup',
    'Safari Spares',
  ],
  authors: [{ name: 'Safari Spares' }],
  creator: 'Safari Spares',
  publisher: 'Safari Spares',
  
  openGraph: {
    title: 'Safari Spares — The Automotive Marketplace for Africa',
    description:
      'Verified Parts. Secure Escrow. Fast Delivery. Find verified spare parts from trusted shops across Kenya and Africa.',
    url: '/', // Uses metadataBase automatically
    siteName: 'Safari Spares',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'Safari Spares - The Automotive Marketplace for Africa',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Safari Spares — The Automotive Marketplace for Africa',
    description:
      'Verified Parts. Secure Escrow. Fast Delivery. Find verified spare parts from trusted shops across Kenya and Africa.',
    images: ['/hero.png'],
    // site: '@safarispares', // Uncomment when you have a handle
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
    canonical: '/',
  },
  category: 'automotive',
  icons: { apple: '/icon-192.png' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${sora.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <StoreProvider>{children}</StoreProvider>

        <Toaster
          position="top-right"
          richColors
          closeButton
          expand={false}
          duration={4000}
          visibleToasts={3}
          theme="dark"
          toastOptions={{ classNames: { toast: 'font-sans' } }}
        />
      </body>
    </html>
  );
}