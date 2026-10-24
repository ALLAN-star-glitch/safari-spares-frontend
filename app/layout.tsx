// app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';
import { THEME_INIT_SCRIPT } from '@/lib/theme';
import { Toaster } from 'sonner';

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

export const metadata: Metadata = {
  title: {
    default: 'Safari Spares',
    template: '%s | Safari Spares',
  },
  description:
    'Verified Parts. Secure Escrow. Fast Delivery. The premium automotive marketplace for Kenya.',
  robots: 'index, follow',
  alternates: { canonical: 'https://safarispares.com/' },
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