import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Poppins, Lora } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Meu Bairro',
  description: 'Sua plataforma completa para a vida no bairro.',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-headline',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${lora.variable}`}>
      <body className={cn("antialiased bg-background")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
