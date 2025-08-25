
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Home,
  Compass,
  Heart,
  Ticket,
  User
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import AuthButton from './auth-button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import Image from 'next/image';
import { Bell, MapPin, ChevronDown } from 'lucide-react';


const navItems = [
  { href: '/events', label: 'Eventos', icon: Compass },
  // Keep other old nav items for the sidebar for now
  { href: '/', label: 'Início', icon: Home },
  { href: '/food', label: 'Alimentação', icon: Compass }, // Placeholder icon
  { href: '/businesses', label: 'Comércio', icon: Compass }, // Placeholder icon
  { href: '/community', label: 'Comunidade', icon: Compass }, // Placeholder icon
  { href: '/ouvidoria', label: 'Ouvidoria', icon: Compass }, // Placeholder icon
];

const bottomNavItems = [
  { href: '#', label: 'Home', icon: Home },
  { href: '/events', label: 'Explore', icon: Compass },
  { href: '#', label: 'Favorite', icon: Heart },
  { href: '#', label: 'Ticket', icon: Ticket },
  { href: '#', label: 'Profile', icon: User },
];


function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid grid-cols-5 h-full items-center">
          {bottomNavItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href) && href !== '#';
              return (
                 <Link
                    key={label}
                    href={href}
                    className={cn(
                    'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
                    isActive
                        ? 'text-orange-500'
                        : 'text-muted-foreground hover:text-orange-500'
                    )}
                >
                    <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
                    <span>{label}</span>
                </Link>
              )
          })}
      </div>
    </nav>
  );
}

function MobileSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);
    const [user] = useAuthState(auth);
    
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex flex-col">
                <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
                 <div className="flex h-16 items-center border-b px-6">
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-lg font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image src="https://i.postimg.cc/N0w7jhCT/Untitled-design.png" width={36} height={36} alt="Meu Bairro Logo" />
                      <span className="font-headline">Meu Bairro</span>
                    </Link>
                </div>
                <nav className="grid gap-6 text-lg font-medium p-6">
                    {navItems.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                          (pathname.startsWith(href) && href !== '/') || pathname === href ? 'text-foreground' : ''
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {label}
                      </Link>
                    ))}
                    {user && (
                         <Link
                            href="/merchant/dashboard"
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                                pathname.startsWith('/merchant') ? 'text-foreground' : ''
                            )}
                         >
                            <User className="h-5 w-5" />
                            Área do Comerciante
                        </Link>
                    )}
                  </nav>
                  <div className="mt-auto p-4 border-t">
                    <AuthButton />
                  </div>
            </SheetContent>
        </Sheet>
    );
}


function DesktopSidebar() {
  const pathname = usePathname();
  const [user] = useAuthState(auth);

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 border-r">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
           <Image src="https://i.postimg.cc/N0w7jhCT/Untitled-design.png" width={36} height={36} alt="Meu Bairro Logo" />
          <span className="font-headline text-lg">Meu Bairro</span>
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
                (pathname.startsWith(href) && href !== '/') || pathname === href ? 'bg-muted text-primary' : ''
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
            {user && (
                <Link
                    href="/merchant/dashboard"
                    className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        pathname.startsWith('/merchant') ? 'bg-muted text-primary' : ''
                    )}
                >
                    <User className="h-4 w-4" />
                    Área do Comerciante
                </Link>
            )}
        </nav>
      </div>
       <div className="mt-auto p-4 border-t">
          <AuthButton />
        </div>
    </aside>
  );
}

function MobileHeader() {
    const pathname = usePathname();
    const isProviderProfile = pathname.startsWith('/services/provider/');
    if (isProviderProfile) return null;

    // The new header for the events page design
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:hidden">
            <div className="flex items-center gap-2">
                 <MapPin className="h-5 w-5 text-orange-500" />
                 <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <div className="flex items-center">
                        <span className="font-bold text-sm">New York, USA</span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                 </div>
            </div>
            <div className="relative">
                <Button variant="ghost" size="icon">
                    <Bell className="h-6 w-6" />
                </Button>
                <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
            </div>
        </header>
    );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const isProviderProfile = pathname.startsWith('/services/provider/');

  if (isProviderProfile) {
      return <div className="bg-background">{children}</div>;
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <DesktopSidebar />
      <div className="flex flex-col flex-1">
        {isMobile && <MobileHeader />}
        <main className="flex flex-1 flex-col pb-20 md:pb-0 bg-background">
          {children}
        </main>
      </div>
      {isMobile && <BottomNav />}
    </div>
  );
}
