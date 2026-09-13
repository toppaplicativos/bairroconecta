import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';

import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Toaster } from '@/components/ui/toaster';
import { product } from '@/config/product';
import { cn } from '@/lib/utils';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const themeBootstrapScript = `
(function () {
  try {
    var key = 'meu-bairro-theme';
    var preference = localStorage.getItem(key) || 'system';
    var dark = preference === 'dark' || (preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.dataset.theme = dark ? 'dark' : 'light';
    root.dataset.themePreference = preference;
  } catch (_) {}
})();
`;

export const metadata: Metadata = {
  title: {
    default: product.name,
    template: `%s · ${product.name}`,
  },
  description: product.description,
  applicationName: product.name,
  colorScheme: 'light dark',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: product.name,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: product.brand.themeLight },
    { media: '(prefers-color-scheme: dark)', color: product.brand.themeDark },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={product.locale} className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className={cn('min-h-screen bg-background font-sans text-foreground antialiased')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
