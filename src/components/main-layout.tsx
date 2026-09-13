'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  Bot,
  ChevronLeft,
  Command,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Sparkles,
  User,
} from 'lucide-react';

import AIAssistant from '@/components/ai-assistant';
import { MeuBairroMark } from '@/components/brand/meu-bairro-mark';
import { ThemeToggle } from '@/components/system/theme-toggle';
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
    <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Meu Bairro — início">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background shadow-sm [--brand-mark-cutout:hsl(var(--foreground))]">
        <MeuBairroMark className="h-6 w-6" />
      </div>
      {!compact ? (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-[-0.02em] text-foreground">Meu Bairro</p>
          <p className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">BairroConecta</p>
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
            'h-10 rounded-xl border-primary/20 bg-primary/10 text-primary shadow-none hover:bg-primary/15 hover:text-primary',
            compact ? 'w-10 px-0' : 'gap-2 px-3'
          )}
        >
          <Sparkles className="h-4 w-4" />
          {!compact ? <span className="text-xs font-bold">Assistente IA</span> : null}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[82vh] max-w-2xl flex-col overflow-hidden rounded-2xl border-border bg-card p-0">
        <DialogHeader className="border-b border-border px-6 py-5">
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
        'sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border/80 bg-card lg:flex',
        collapsed ? 'w-[76px]' : 'w-[268px]'
      )}
    >
      <div className={cn('flex h-[72px] items-center border-b border-border/70', collapsed ? 'justify-center px-3' : 'justify-between px-5')}>
        <BrandMark compact={collapsed} />
        {!collapsed ? (
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground" onClick={onToggle}>
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        ) : null}
      </div>

      {collapsed ? (
        <button
          onClick={onToggle}
          className="mx-auto mt-3 flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label="Expandir menu"
        >
          <PanelLeftOpen className="h-4 w-4" />
        </button>
      ) : null}

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {navigationGroups.map((group) => (
          <div key={group.label} className="mb-5 last:mb-0">
            {!collapsed ? (
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{group.label}</p>
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
                        ? 'bg-foreground font-semibold text-background shadow-sm'
                        : 'font-medium text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={active ? 2.2 : 1.9} />
                    {!collapsed ? (
                      <div className="min-w-0">
                        <p className="truncate leading-5">{item.label}</p>
                        <p className={cn('truncate text-[10px] font-medium', active ? 'text-background/60' : 'text-muted-foreground')}>
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

      <div className="border-t border-border/70 p-3">
        <Link
          href="/merchant/dashboard"
          className={cn(
            'flex items-center rounded-xl border border-border bg-muted/50 text-foreground transition hover:bg-muted',
            collapsed ? 'h-11 w-11 justify-center' : 'gap-3 px-3 py-3'
          )}
        >
          <User className="h-[18px] w-[18px] shrink-0" />
          {!collapsed ? (
            <div className="min-w-0">
              <p className="text-xs font-bold">Área profissional</p>
              <p className="truncate text-[10px] text-muted-foreground">Comerciantes e prestadores</p>
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
      <SheetContent side="left" className="w-[86vw] max-w-[340px] border-border bg-card p-0">
        <SheetTitle className="sr-only">Navegação principal</SheetTitle>
        <div className="flex h-full flex-col bg-card">
          <div className="flex h-[72px] items-center border-b border-border/70 px-5">
            <BrandMark />
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {navigationGroups.map((group) => (
              <div key={group.label} className="mb-6">
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{group.label}</p>
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
                          active ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
    <header className="sticky top-0 z-40 flex h-[72px] items-center border-b border-border/80 bg-card/90 px-4 backdrop-blur-xl sm:px-6 xl:px-8">
      <div className="flex w-full items-center gap-3">
        {headerType === 'detail' ? (
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl lg:hidden" onClick={() => router.back()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        ) : (
          <MobileDrawer />
        )}

        <div className="hidden min-w-0 items-center gap-3 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary [--brand-mark-cutout:hsl(var(--card))]">
            <MeuBairroMark className="h-[19px] w-[19px]" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Seu bairro</p>
            <p className="truncate text-sm font-semibold text-foreground">{headerType === 'detail' ? headerTitle : 'Explorar região'}</p>
          </div>
        </div>

        <div className="mx-auto hidden w-full max-w-xl md:block">
          <div className="flex h-10 items-center gap-2 rounded-xl border border-border bg-muted/60 px-3 transition focus-within:border-primary/30 focus-within:bg-card focus-within:ring-4 focus-within:ring-primary/10">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              aria-label="Buscar no Meu Bairro"
              className="h-full w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              placeholder="Buscar imóveis, lojas, serviços, eventos..."
            />
            <span className="hidden items-center gap-1 rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground xl:flex">
              <Command className="h-3 w-3" /> K
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <AIAssistantButton compact />
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Notificações">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-card" />
          </Button>
          <Link
            href="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-xs font-bold text-background shadow-sm"
            aria-label="Abrir perfil"
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
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-nav backdrop-blur-xl lg:hidden">
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
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.9} />
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
            <Button className="h-12 gap-2 rounded-2xl bg-foreground px-4 text-background shadow-float hover:bg-foreground/90">
              <Plus className="h-4 w-4" />
              Publicar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-2xl border-border bg-card">
            <DialogHeader>
              <DialogTitle>O que você quer publicar?</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 pt-2">
              <Link href="/classifieds" className="rounded-xl border border-border p-4 text-sm font-semibold hover:bg-muted">Criar classificado</Link>
              <Link href="/community" className="rounded-xl border border-border p-4 text-sm font-semibold hover:bg-muted">Publicar na comunidade</Link>
              <Link href="/ouvidoria" className="rounded-xl border border-border p-4 text-sm font-semibold hover:bg-muted">Registrar ocorrência</Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
