
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Meu Bairro',
  description: 'Sua plataforma completa para a vida no bairro.',
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body className={cn("antialiased bg-background font-sans")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
