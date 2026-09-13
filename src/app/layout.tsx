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

export const metadata: Metadata = {
  title: {
    default: 'Meu Bairro',
    template: '%s · Meu Bairro',
  },
  description:
    'A plataforma local para descobrir serviços, comércio, imóveis, comunidade, saúde e serviços públicos do seu bairro.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body className={cn('min-h-screen bg-background font-sans text-foreground antialiased')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
