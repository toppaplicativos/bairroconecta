
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Manrope } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Meu Bairro',
  description: 'Sua plataforma completa para a vida no bairro.',
};

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable}`}>
      <body className={cn("antialiased bg-background font-sans")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
