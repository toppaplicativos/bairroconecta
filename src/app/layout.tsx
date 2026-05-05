import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import 'mapbox-gl/dist/mapbox-gl.css';
import { PT_Sans } from 'next/font/google';

export const metadata: Metadata = {
  title: 'BairroConecta',
  description: 'Sua plataforma completa para a vida no bairro - Imóveis, Comércio, Ouvidoria e Saúde.',
};

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${ptSans.variable}`}>
      <body className={cn("antialiased bg-background font-sans")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
