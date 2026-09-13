import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Toaster } from '@/components/ui/toaster';
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
    default: 'Meu Bairro',
    template: '%s · Meu Bairro',
  },
  description:
    'A plataforma local para descobrir serviços, comércio, imóveis, comunidade, saúde e serviços públicos do seu bairro.',
  applicationName: 'Meu Bairro',
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={manrope.variable} suppressHydrationWarning>
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
