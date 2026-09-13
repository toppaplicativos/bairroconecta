'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  Bot,
  ChevronLeft,
  Command,
  MapPin,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Sparkles,
  User,
} from 'lucide-react';

import AIAssistant from '@/components/ai-assistant';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  isNavigationItemActive,
  mobileNavigation,
  navigationGroups,
} from '@/config/navigation';

type MainLayoutProps = {
  children: React.ReactNode;
  currentMode?: 'default' | 'properties' | 'events' | 'classifieds' | 'services';
  headerType?: 'home' | 'detail';
  headerTitle?: string;
};

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
        <MapPin className="h-5 w-5" strokeWidth={2.2} />
      </div>
      {!compact ? (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-[-0.02em] text-slate-950">Meu Bairro</p>
          <p className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">BairroConecta</p>
        </div>
      ) : null}
    </Link>
  );
}

function AIAssistantButton({ compact = false }: { compact?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'h-10 rounded-xl border-blue-200 bg-blue-50 text-blue-700 shadow-none hover:bg-blue-100 hover:text-blue-800',
            compact ? 'w-10 px-0' : 'gap-2 px-3'
          )}
        >
          <Sparkles className="h-4 w-4" />
          {!compact ? <span className="text-xs font-bold">Assistente IA</span> : null}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[82vh] max-w-2xl flex-col overflow-hidden rounded-2xl p-0">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle className="flex items-center gap-2 text-base">
            <Bot className="h-5 w-5 text-primary" />
            Assistente do bairro
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-6">
          <AIAssistant />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DesktopSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen shrink-0 flex-col border-r border-slate-200/80 bg-white lg:flex',
        collapsed ? 'w-[76px]' : 'w-[268px]'
      )}
    >
      <div className={cn('flex h-[72px] items-center border-b border-slate-100', collapsed ? 'justify-center px-3' : 'justify-between px-5')}>
        <BrandMark compact={collapsed} />
        {!collapsed ? (
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-slate-700" onClick={onToggle}>
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        ) : null}
      </div>

      {collapsed ? (
        <button
          onClick={onToggle}
          className="mx-auto mt-3 flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Expandir menu"
        >
          <PanelLeftOpen className="h-4 w-4" />
        </button>
      ) : null}

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {navigationGroups.map((group) => (
          <div key={group.label} className="mb-5 last:mb-0">
            {!collapsed ? (
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{group.label}</p>
            ) : null}
            <nav className="space-y-1">
              {group.items.map((item) => {
                const active = isNavigationItemActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      'group flex items-center rounded-xl text-sm transition',
                      collapsed ? 'mx-auto h-11 w-11 justify-center' : 'gap-3 px-3 py-2.5',
                      active
                        ? 'bg-slate-950 font-semibold text-white shadow-sm'
                        : 'font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                    )}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={active ? 2.2 : 1.9} />
                    {!collapsed ? (
                      <div className="min-w-0">
                        <p className="truncate leading-5">{item.label}</p>
                        <p className={cn('truncate text-[10px] font-medium', active ? 'text-slate-300' : 'text-slate-400')}>
                          {item.description}
                        </p>
                      </div>
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 p-3">
        <Link
          href="/merchant/dashboard"
          className={cn(
            'flex items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-slate-300 hover:bg-white',
            collapsed ? 'h-11 w-11 justify-center' : 'gap-3 px-3 py-3'
          )}
        >
          <User className="h-[18px] w-[18px] shrink-0" />
          {!collapsed ? (
            <div className="min-w-0">
              <p className="text-xs font-bold">Área profissional</p>
              <p className="truncate text-[10px] text-slate-400">Comerciantes e prestadores</p>
            </div>
          ) : null}
        </Link>
      </div>
    </aside>
  );
}

function MobileDrawer() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[86vw] max-w-[340px] p-0">
        <SheetTitle className="sr-only">Navegação principal</SheetTitle>
        <div className="flex h-full flex-col bg-white">
          <div className="flex h-[72px] items-center border-b border-slate-100 px-5">
            <BrandMark />
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {navigationGroups.map((group) => (
              <div key={group.label} className="mb-6">
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{group.label}</p>
                <nav className="space-y-1">
                  {group.items.map((item) => {
                    const active = isNavigationItemActive(pathname, item.href);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold',
                          active ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-100'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Topbar({ headerType, headerTitle }: Pick<MainLayoutProps, 'headerType' | 'headerTitle'>) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 flex h-[72px] items-center border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl sm:px-6 xl:px-8">
      <div className="flex w-full items-center gap-3">
        {headerType === 'detail' ? (
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl lg:hidden" onClick={() => router.back()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        ) : (
          <MobileDrawer />
        )}

        <div className="hidden min-w-0 items-center gap-3 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-primary">
            <MapPin className="h-[18px] w-[18px]" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Seu bairro</p>
            <p className="truncate text-sm font-semibold text-slate-800">{headerType === 'detail' ? headerTitle : 'Explorar região'}</p>
          </div>
        </div>

        <div className="mx-auto hidden w-full max-w-xl md:block">
          <div className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              aria-label="Buscar no Meu Bairro"
              className="h-full w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              placeholder="Buscar imóveis, lojas, serviços, eventos..."
            />
            <span className="hidden items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 xl:flex">
              <Command className="h-3 w-3" /> K
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <AIAssistantButton compact />
          <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl text-slate-500">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-blue-600 ring-2 ring-white" />
          </Button>
          <Link
            href="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-xs font-bold text-white shadow-sm"
          >
            MB
          </Link>
        </div>
      </div>
    </header>
  );
}

function MobileBottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-nav backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {mobileNavigation.map((item) => {
          const active = isNavigationItemActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-bold transition',
                active ? 'text-primary' : 'text-slate-400'
              )}
            >
              <Icon className={cn('h-5 w-5', active && 'fill-blue-50')} strokeWidth={active ? 2.4 : 1.9} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default function MainLayout({
  children,
  currentMode: _currentMode = 'default',
  headerType = 'home',
  headerTitle = 'Meu Bairro',
}: MainLayoutProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const isProviderProfile = pathname.startsWith('/services/provider/');

  if (isProviderProfile) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background lg:flex">
      <DesktopSidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      <div className="min-w-0 flex-1">
        <Topbar headerType={headerType} headerTitle={headerTitle} />
        <main className="min-h-[calc(100vh-72px)] pb-24 lg:pb-0">{children}</main>
      </div>
      <MobileBottomNavigation />
      <div className="fixed bottom-6 right-6 z-30 hidden xl:block">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-12 gap-2 rounded-2xl bg-slate-950 px-4 text-white shadow-float hover:bg-slate-800">
              <Plus className="h-4 w-4" />
              Publicar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle>O que você quer publicar?</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 pt-2">
              <Link href="/classifieds" className="rounded-xl border p-4 text-sm font-semibold hover:bg-slate-50">Criar classificado</Link>
              <Link href="/community" className="rounded-xl border p-4 text-sm font-semibold hover:bg-slate-50">Publicar na comunidade</Link>
              <Link href="/ouvidoria" className="rounded-xl border p-4 text-sm font-semibold hover:bg-slate-50">Registrar ocorrência</Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
