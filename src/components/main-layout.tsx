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
  Menu,
  Megaphone,
  Briefcase,
  Map,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { href: '/', label: 'Início', icon: LayoutGrid },
  { href: '/map', label: 'Mapa', icon: Map },
  { href: '/properties', label: 'Imóveis', icon: Building2 },
  { href: '/businesses', label: 'Comércio', icon: Store },
  { href: '/services', label: 'Serviços', icon: Briefcase },
  { href: '/forum', label: 'Fórum', icon: MessagesSquare },
  { href: '/events', label: 'Eventos', icon: CalendarDays },
  { href: '/classifieds', label: 'Classificados', icon: Tags },
  { href: '/ouvidoria', label: 'Ouvidoria', icon: Megaphone },
];

const mainNavItems = [
  { href: '/', label: 'Início', icon: LayoutGrid },
  { href: '/map', label: 'Mapa', icon: Map },
  { href: '/businesses', label: 'Comércio', icon: Store },
  { href: '/services', label: 'Serviços', icon: Briefcase },
  { href: '/forum', label: 'Fórum', icon: MessagesSquare },
];


function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid h-16 grid-cols-5">
        {mainNavItems.map(({ href, label, icon: Icon }) => (
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

function MobileSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                 <nav className="grid gap-6 text-lg font-medium p-6">
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-lg font-semibold mb-4"
                      onClick={() => setIsOpen(false)}
                    >
                      <Sparkles className="h-6 w-6 text-primary" />
                      <span className="font-headline">BairroConecta</span>
                    </Link>
                    {navItems.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                          pathname === href && 'text-foreground'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {label}
                      </Link>
                    ))}
                  </nav>
            </SheetContent>
        </Sheet>
    );
}


function DesktopSidebar() {
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

function MobileHeader() {
    const pathname = usePathname();
    const currentNavItem = navItems.find(item => item.href === pathname);
    const title = currentNavItem ? currentNavItem.label : "BairroConecta";

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
            <MobileSidebar />
            <h1 className="flex-1 text-center text-xl font-semibold font-headline">{title}</h1>
            <div className="w-8"></div>
        </header>
    );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <DesktopSidebar />
      <div className="flex flex-col flex-1">
        {isMobile && <MobileHeader />}
        <main className="flex flex-1 flex-col pb-16 md:pb-0 bg-muted/20">
          {children}
        </main>
      </div>
      {isMobile && <BottomNav />}
    </div>
  );
}
