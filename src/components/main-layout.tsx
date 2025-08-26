
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
  Map,
  Tags,
  CalendarDays,
  Bot,
  MessageCircle,
  LayoutGrid,
  Plus,
  Folder,
  ChevronLeft,
  Search,
  SlidersHorizontal,
  FolderOpen,
  CalendarCheck,
  Phone,
  HomeIcon,
  ShoppingBag
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
    { isAITrigger: true, label: 'AI', icon: Bot },
    { href: '/community', label: 'Comunidade', icon: MessagesSquare },
    { href: '/ouvidoria', label: 'Ouvidoria', icon: Megaphone },
  ],
  properties: [
    { href: '/properties', label: 'Início', icon: HomeIcon },
    { href: '#', label: 'Explorar', icon: Compass },
    { href: '#', label: 'Favoritos', icon: Heart },
    { href: '#', label: 'Conversas', icon: MessageCircle },
    { href: '#', label: 'Perfil', icon: User },
  ],
  events: [
    { href: '/events', label: 'Início', icon: HomeIcon },
    { href: '#', label: 'Explorar', icon: Compass },
    { href: '#', label: 'Favoritos', icon: Heart },
    { href: '#', label: 'Ingressos', icon: CalendarCheck },
    { href: '#', label: 'Perfil', icon: User },
  ],
  classifieds: [
    { href: '/classifieds', label: 'Início', icon: HomeIcon },
    { href: '#', label: 'Conversas', icon: MessageCircle },
    { isCentralButton: true, label: 'Anunciar', icon: Plus },
    { href: '#', label: 'Anúncios', icon: FolderOpen },
    { href: '#', label: 'Conta', icon: User },
  ],
  services: [
     { href: '/services', label: 'Início', icon: HomeIcon },
     { href: '#', label: 'Serviços', icon: Briefcase },
     { href: '#', label: 'Agendados', icon: CalendarCheck },
     { href: '#', label: 'Conversas', icon: MessageCircle },
     { href: '#', label: 'Perfil', icon: User },
  ]
};

type BottomNavProps = {
  mode: keyof typeof bottomNavItems;
}

const navColors = {
  default: 'text-primary',
  properties: 'text-blue-600',
  events: 'text-orange-500',
  classifieds: 'text-teal-600',
  services: 'text-amber-500',
}

function BottomNav({ mode }: BottomNavProps) {
  const pathname = usePathname();
  const navItems = bottomNavItems[mode] || bottomNavItems.default;
  const activeColor = navColors[mode] || navColors.default;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid grid-cols-5 h-full items-center">
        {navItems.map(({ href, label, icon: Icon, isAITrigger, isCentralButton }) => {
          if (isAITrigger) {
            return (
              <Dialog key={label}>
                <DialogTrigger asChild>
                    <div className="relative flex justify-center items-center">
                        <div className="absolute -top-8">
                            <Button size="icon" className={cn("rounded-full h-16 w-16 shadow-lg", activeColor.replace('text-','bg-'))}>
                                <Bot className="h-8 w-8 text-white" />
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
            )
          }

           if (isCentralButton) {
            return (
              <div key={label} className="flex justify-center">
                <Button size="icon" className={cn("w-16 h-12 rounded-2xl shadow-lg -translate-y-4", activeColor.replace('text-','bg-'))}>
                  <Icon className="h-6 w-6 text-white" />
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
                'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
                isActive ? activeColor : 'text-muted-foreground hover:text-primary'
              )}
            >
              <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
              <span>{label}</span>
            </Link>
          );
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
                <Button variant="ghost" size="icon">
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
                    {globalNavItems.map(({ href, label, icon: Icon }) => (
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
          {globalNavItems.map(({ href, label, icon: Icon }) => (
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

function MobileHeader({ type, title }: { type: 'home' | 'detail', title?: string }) {
    const router = useRouter();

    if (type === 'detail') {
        return (
             <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:hidden">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-semibold font-headline text-center">{title}</h1>
                <div className="w-10" /> 
            </header>
        )
    }

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:hidden">
            <div className="flex items-center gap-2">
                 <MapPin className="h-5 w-5 text-primary" />
                 <div>
                    <p className="text-xs text-muted-foreground">Localização</p>
                    <div className="flex items-center">
                        <span className="font-bold text-sm">São Paulo, BR</span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                 </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-6 w-6" />
                    </Button>
                    <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
                </div>
                <MobileSidebar />
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

export default function MainLayout({ children, currentMode = 'default', headerType = 'home', headerTitle = 'Meu Bairro' }: MainLayoutProps) {
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
        {isMobile && <MobileHeader type={headerType} title={headerTitle} />}
        <main className="flex flex-1 flex-col pb-20 md:pb-0 bg-background">
          {children}
        </main>
      </div>
      {isMobile && <BottomNav mode={currentMode} />}
    </div>
  );
}
