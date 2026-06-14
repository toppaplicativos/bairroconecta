
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  Home,
  Compass,
  Heart,
  User,
  Building2,
  Store,
  MessagesSquare,
  Megaphone,
  Briefcase,
  Tags,
  CalendarDays,
  Bot,
  MessageCircle,
  LayoutGrid,
  Plus,
  FolderOpen,
  CalendarCheck,
  HomeIcon,
  ShoppingBag,
  ChevronLeft,
  Bell,
  MapPin,
  ChevronDown,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import AuthButton from './auth-button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import Image from 'next/image';
import AIAssistant from './ai-assistant';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const globalNavItems = [
  { href: '/', label: 'Início', icon: LayoutGrid },
  { href: '/properties', label: 'Imobiliária', icon: Building2 },
  { href: '/businesses', label: 'Comércio', icon: Store },
  { href: '/services', label: 'Serviços', icon: Briefcase },
  { href: '/health-clinic', label: 'Posto de Saúde', icon: Heart },
  { href: '/community', label: 'Comunidade', icon: MessagesSquare },
  { href: '/events', label: 'Eventos', icon: CalendarDays },
  { href: '/classifieds', label: 'Classificados', icon: Tags },
  { href: '/ouvidoria', label: 'Ouvidoria', icon: Megaphone },
];

const bottomNavItems = {
  default: [
    { href: '/', label: 'Início', icon: HomeIcon },
    { href: '/businesses', label: 'Comércio', icon: ShoppingBag },
    { isAITrigger: true, label: 'IA', icon: Bot },
    { href: '/community', label: 'Comunidade', icon: MessagesSquare },
    { href: '/ouvidoria', label: 'Ouvidoria', icon: Megaphone },
  ],
  properties: [
    { href: '/properties', label: 'Início', icon: HomeIcon },
    { href: '/map', label: 'Explorar', icon: Compass },
    { href: '/favorites', label: 'Favoritos', icon: Heart },
    { href: '/community/forum', label: 'Conversas', icon: MessageCircle },
    { href: '/profile', label: 'Perfil', icon: User },
  ],
  events: [
    { href: '/events', label: 'Início', icon: HomeIcon },
    { href: '/map', label: 'Explorar', icon: Compass },
    { href: '/favorites', label: 'Favoritos', icon: Heart },
    { href: '#', label: 'Ingressos', icon: CalendarCheck },
    { href: '/profile', label: 'Perfil', icon: User },
  ],
  classifieds: [
    { href: '/classifieds', label: 'Início', icon: HomeIcon },
    { href: '/community/forum', label: 'Conversas', icon: MessageCircle },
    { isCentralButton: true, label: 'Anunciar', icon: Plus },
    { href: '#', label: 'Anúncios', icon: FolderOpen },
    { href: '/profile', label: 'Perfil', icon: User },
  ],
  services: [
     { href: '/services', label: 'Início', icon: HomeIcon },
     { href: '/services/register', label: 'Serviços', icon: Briefcase },
     { href: '#', label: 'Agendados', icon: CalendarCheck },
     { href: '/community/forum', label: 'Conversas', icon: MessageCircle },
     { href: '/profile', label: 'Perfil', icon: User },
  ]
};

const navColors = {
  default: 'text-primary',
  properties: 'text-blue-500',
  events: 'text-orange-500',
  classifieds: 'text-teal-600',
  services: 'text-amber-500',
};

function BottomNav({ mode }: { mode: keyof typeof bottomNavItems }) {
  const pathname = usePathname();
  const navItems = bottomNavItems[mode] || bottomNavItems.default;
  const activeColor = navColors[mode] || navColors.default;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 border-t bg-background/95 backdrop-blur-sm bottom-nav-shadow md:hidden">
      <div className="grid grid-cols-5 h-full items-center px-2">
        {navItems.map(({ href, label, icon: Icon, isAITrigger, isCentralButton }) => {
          if (isAITrigger) {
            return (
              <Dialog key={label}>
                <DialogTrigger asChild>
                    <div className="relative flex justify-center items-center">
                        <div className="absolute -top-10">
                            <Button size="icon" className={cn("rounded-full h-16 w-16 shadow-2xl transition-transform active:scale-95", activeColor.replace('text-','bg-'))}>
                                <Bot className="h-8 w-8 text-white" />
                            </Button>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] h-[80vh] flex flex-col p-0 overflow-hidden">
                    <DialogHeader className="p-6 border-b">
                        <DialogTitle>Assistente Local de IA</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto p-6">
                        <AIAssistant />
                    </div>
                </DialogContent>
              </Dialog>
            )
          }

           if (isCentralButton) {
            return (
              <div key={label} className="flex justify-center">
                <Button size="icon" className={cn("w-14 h-14 rounded-2xl shadow-xl -translate-y-6 transition-transform active:scale-95", activeColor.replace('text-','bg-'))}>
                  <Plus className="h-7 w-7 text-white" />
                </Button>
              </div>
            )
          }

          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href || '#'}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-[10px] font-bold transition-all duration-200',
                isActive ? activeColor : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className={cn("p-1 rounded-xl transition-colors", isActive && "bg-muted")}>
                <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function MobileHeader({ type, title }: { type: 'home' | 'detail', title?: string }) {
    const router = useRouter();
    const pathname = usePathname();

    if (type === 'detail') {
        return (
             <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-md px-4 md:hidden">
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-bold font-headline text-center truncate flex-1">{title}</h1>
                <div className="w-10" /> 
            </header>
        )
    }

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-md px-4 md:hidden">
            <div className="flex items-center gap-3">
                 <div className="p-2 bg-primary/10 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                 </div>
                 <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground leading-none mb-1">Localização</p>
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-sm">São Paulo, BR</span>
                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </div>
                 </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Bell className="h-6 w-6 text-slate-600" />
                    </Button>
                    <span className="absolute top-2 right-2 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background animate-pulse" />
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 flex flex-col">
                        <SheetTitle className="sr-only">Menu</SheetTitle>
                         <div className="flex h-16 items-center border-b px-6">
                            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                              <Image src="https://i.postimg.cc/N0w7jhCT/Untitled-design.png" width={32} height={32} alt="Logo" />
                              <span className="font-headline">BairroConecta</span>
                            </Link>
                        </div>
                        <nav className="grid gap-4 text-sm font-bold p-6">
                            {globalNavItems.map(({ href, label, icon: Icon }) => (
                              <Link
                                key={label}
                                href={href}
                                className={cn(
                                  'flex items-center gap-4 px-3 py-3 rounded-2xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all',
                                  (pathname.startsWith(href) && href !== '/') || pathname === href ? 'bg-primary/10 text-primary' : ''
                                )}
                              >
                                <Icon className="h-5 w-5" />
                                {label}
                              </Link>
                            ))}
                          </nav>
                          <div className="mt-auto p-6 border-t flex flex-col gap-4">
                             <Link href="/merchant/dashboard" className="flex items-center gap-4 px-3 py-3 rounded-2xl text-muted-foreground hover:bg-muted transition-all">
                                <User className="h-5 w-5" />
                                Área do Comerciante
                            </Link>
                            <AuthButton />
                          </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

type MainLayoutProps = {
  children: React.ReactNode;
  currentMode?: keyof typeof bottomNavItems;
  headerType?: 'home' | 'detail';
  headerTitle?: string;
}

export default function MainLayout({ children, currentMode = 'default', headerType = 'home', headerTitle = 'BairroConecta' }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const isProviderProfile = pathname.startsWith('/services/provider/');

  if (isProviderProfile) {
      return <div className="bg-background">{children}</div>;
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 border-r bg-card sticky top-0 h-screen">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
             <Image src="https://i.postimg.cc/N0w7jhCT/Untitled-design.png" width={32} height={32} alt="Logo" />
            <span className="font-headline text-lg tracking-tight">BairroConecta</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {globalNavItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-muted-foreground transition-all hover:bg-muted hover:text-primary',
                (pathname.startsWith(href) && href !== '/') || pathname === href ? 'bg-primary/10 text-primary' : ''
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </div>
        <div className="p-4 border-t space-y-4">
            <Link href="/merchant/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-muted-foreground hover:bg-muted transition-all">
                <User className="h-5 w-5" />
                Comerciante
            </Link>
            <AuthButton />
        </div>
      </aside>

      <div className="flex flex-col flex-1">
        {isMobile && <MobileHeader type={headerType} title={headerTitle} />}
        <main className="flex flex-1 flex-col pb-24 md:pb-6">
          {children}
        </main>
      </div>
      {isMobile && <BottomNav mode={currentMode} />}
    </div>
  );
}
