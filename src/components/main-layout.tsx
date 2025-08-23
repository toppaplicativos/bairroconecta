
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  CalendarDays,
  LayoutGrid,
  MessagesSquare,
  Store,
  Tags,
  Menu,
  Megaphone,
  Briefcase,
  Map,
  Bot,
  Heart,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AIAssistant from './ai-assistant';
import AuthButton from './auth-button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import Image from 'next/image';


const navItems = [
  { href: '/', label: 'Início', icon: LayoutGrid },
  { href: '/map', label: 'Mapa', icon: Map },
  { href: '/properties', label: 'Imóveis', icon: Building2 },
  { href: '/businesses', label: 'Comércio', icon: Store },
  { href: '/services', label: 'Serviços', icon: Briefcase },
  { href: '/health-clinic', label: 'Posto de Saúde', icon: Heart },
  { href: '/community', label: 'Comunidade', icon: MessagesSquare },
  { href: '/events', label: 'Eventos', icon: CalendarDays },
  { href: '/classifieds', label: 'Classificados', icon: Tags },
  { href: '/ouvidoria', label: 'Ouvidoria', icon: Megaphone },
];

const mainNavItems = [
  { href: '/services', label: 'Serviços', icon: Briefcase },
  { href: '/businesses', label: 'Comércio', icon: Store },
  { href: '/community', label: 'Comunidade', icon: MessagesSquare },
  { href: '/ouvidoria', label: 'Ouvidoria', icon: Megaphone },
];


function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid grid-cols-5 h-full items-center">
          {mainNavItems.slice(0, 2).map(({ href, label, icon: Icon }) => (
          <Link
              key={label}
              href={href}
              className={cn(
              'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
              pathname.startsWith(href)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              )}
          >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
          </Link>
          ))}
          
          <Dialog>
            <DialogTrigger asChild>
                <div className="relative flex justify-center items-center">
                    <div className="absolute -top-8">
                        <Button size="icon" className="rounded-full h-16 w-16 shadow-lg bg-accent hover:bg-accent/90">
                            <Bot className="h-8 w-8 text-accent-foreground" />
                        </Button>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] h-3/4 flex flex-col">
                <DialogHeader>
                    <DialogTitle>Assistente Local de IA</DialogTitle>
                </DialogHeader>
                <AIAssistant />
            </DialogContent>
        </Dialog>


          {mainNavItems.slice(2).map(({ href, label, icon: Icon }) => (
          <Link
              key={label}
              href={href}
              className={cn(
              'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
              pathname.startsWith(href)
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
    const [isOpen, setIsOpen] = React.useState(false);
    
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
    const [user] = useAuthState(auth);
    
    let title = "Meu Bairro";
     if (pathname === '/') {
        title = user ? `Olá, ${user.displayName?.split(' ')[0]}!` : "Olá, Visitante!";
    } else {
      const currentNavItem = navItems.find(item => pathname.startsWith(item.href) && item.href !== '/');
      if (currentNavItem) {
        title = currentNavItem.label;
      }
    }
    
    let subtitle = "O que você precisa, à distância de um clique.";
    if (pathname !== '/') {
        subtitle = "Explore e conecte-se com sua comunidade.";
    }


    return (
        <header className="sticky top-0 z-40 flex h-20 items-center gap-4 border-b bg-background px-4 md:hidden">
            <MobileSidebar />
            <div className="flex-1 text-center">
                 <h1 className="text-xl font-semibold font-headline">{title}</h1>
                 <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
             <div className="w-12" />
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
        <main className="flex flex-1 flex-col pb-20 md:pb-0 bg-background">
          {children}
        </main>
      </div>
      {isMobile && <BottomNav />}
    </div>
  );
}
