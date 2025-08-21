'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  CalendarDays,
  LayoutGrid,
  MessagesSquare,
  Sparkles,
  Store,
  Tags,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Início', icon: LayoutGrid },
  { href: '/properties', label: 'Imóveis', icon: Building2 },
  { href: '/businesses', label: 'Comércio', icon: Store },
  { href: '/forum', label: 'Fórum', icon: MessagesSquare },
  { href: '/events', label: 'Eventos', icon: CalendarDays },
  { href: '/classifieds', label: 'Classificados', icon: Tags },
];

function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid h-16 grid-cols-6">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className={cn(
              'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
              pathname === href
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 border-r">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg">BairroConecta</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === href && 'bg-muted text-primary'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}


export default function MainLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <Sidebar />
      <main className="flex flex-1 flex-col pb-16 md:pb-0">
        {children}
      </main>
      {isMobile && <BottomNav />}
    </div>
  );
}
